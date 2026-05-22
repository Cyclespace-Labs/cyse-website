// scripts/ai/articleGenerator.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { TAGS, CATEGORIES } from '../news-constants.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function extractTagsAndCategory(text) {
  const lowerText = text.toLowerCase();
  
  // Extract tags - find matching tags from TAGS array
  const matchedTags = TAGS.filter(tag => 
    lowerText.includes(tag.name.toLowerCase()) || 
    lowerText.includes(tag.slug)
  ).slice(0, 5); // Limit to 5 tags
  
  // Extract category - find matching category from CATEGORIES array
  const matchedCategory = CATEGORIES.find(cat => 
    cat.contentType === 'news' && (
      lowerText.includes(cat.name.toLowerCase()) || 
      lowerText.includes(cat.slug)
    )
  ) || CATEGORIES.find(cat => cat.name === 'Markets'); // Default to Markets if no match
  
  return {
    tags: matchedTags.map(tag => ({ name: tag.name, slug: tag.slug, color: tag.color })),
    category: matchedCategory.slug
  };
}

export async function generateFreshArticle(sourceArticles) {
  const res = await axios.post('http://localhost:11434/api/generate', { 
    model: process.env.OLLAMA_MODEL || 'llama3',
    prompt: `
# Role: Professional News Journalist & Editor

You are a specialized journalist and professional editor. Write comprehensive, credible, and engaging news articles based on the source articles provided.

## IMPORTANT: Generate SEPARATE fields matching the CMS schema

Each JSON field should contain ONLY its designated content:

1. **title field:** Just the headline text (10-15 words), no emoji, no markdown
2. **smallDescription field:** One-sentence summary answering the 5 Ws (15-20 words)
3. **keyPoints field:** Array of 5 objects, each with "point" (bold term) and "description" fields
4. **content field:** Main article body ONLY - lede with bold location, then body sections with ### headings (150-160 words). NO disclaimer, NO headline, NO key points section
5. **research field:** Supporting data and analysis with ### headings (180-200 words)
6. **conclusion field:** Final thoughts with ### heading (60-80 words)

## Content Field Structure (for the "content" field only)
- Start with: **LOCATION —** lede paragraph answering 5 Ws (Who, What, When, Where, Why)
- CRITICAL: Leave a BLANK LINE after the lede paragraph
- Then: Body sections with ### **Section Name** headings
- CRITICAL: Leave a BLANK LINE before and after each ### heading
- CRITICAL: Leave a BLANK LINE between all paragraphs
- For subsections: MUST use ### **Subsection Name:** format (example: ### The Workforce Paradox)
- CRITICAL: NEVER use just bold text like **The Workforce Paradox** for subsections - ALWAYS use ### heading
- For bullet points: MUST use * **Bold term:** description format (example: * **Productivity Metrics:** description)
- CRITICAL: NEVER use just **Bold:** for bullet points - ALWAYS start with asterisk
- Use 1. **Bold term:** description for numbered lists
- Use > **"Quote"** for blockquotes
- For standout quotes: Use > > "Quote text" (double blockquote) for pull quotes
- For important insights: Use > ! Callout text (blockquote with !) for callout boxes
- For first paragraph of each section: Use [[L]]etter format for drop cap (example: [[T]]he President...)
- Keep paragraphs short (2-3 sentences)
- Bold ONLY key terms, company names, bill names, metrics - NEVER bold entire paragraphs

## Research Field Structure (for the "research" field only)
- Start with: ### **Section Name** heading
- CRITICAL: Leave a BLANK LINE after the heading
- Then: Normal paragraphs (NOT bold)
- CRITICAL: Leave a BLANK LINE between all paragraphs
- For subsections: MUST use ### **Subsection Name:** format (example: ### Industry Analysis)
- CRITICAL: NEVER use just bold text like **Industry Analysis** for subsections - ALWAYS use ### heading
- For bullet points: MUST use * **Bold term:** description format (example: * **Productivity Metrics:** description)
- CRITICAL: NEVER use just **Bold:** for bullet points - ALWAYS start with asterisk
- For numbered lists: Use 1. **Bold term:** description format
- Use > **"Quote"** for blockquotes
- For statistics/metrics: Use > * **Metric:** value format for stat cards
- For first paragraph of each section: Use [[L]]etter format for drop cap (example: [[T]]he correlation...)
- CRITICAL: NEVER bold entire paragraphs - only bold specific terms within

## Conclusion Field Structure (for the "conclusion" field only)
- Start with: ### **Section Name** heading
- CRITICAL: Leave a BLANK LINE after the heading
- Then: Normal paragraphs (NOT bold)
- CRITICAL: Leave a BLANK LINE between all paragraphs
- For bullet points: MUST use * **Bold term:** description format (example: * **Key Point:** description)
- CRITICAL: NEVER use just **Bold:** for bullet points - ALWAYS start with asterisk
- For first paragraph: Use [[L]]etter format for drop cap (example: [[T]]he evidence...)
- CRITICAL: NEVER bold entire paragraphs - only bold specific terms within

## Editorial Guidelines
- Professional, objective tone like top-tier financial journalism
- No hype or superlatives ("amazing," "revolutionary")
- Explain technical jargon briefly
- Balanced perspectives on controversial topics
- Use em dashes (—) for breaks in sentences
- Use proper date formatting (January 21, 2026)

## Source Articles
${sourceArticles.map((a, i) => `[${i+1}] ${a.title}\n${a.content.substring(0, 500)}...`).join('\n\n')}

## Required JSON Output
{
  "title": "just the headline text, no emoji, no markdown (10-15 words)",
  "smallDescription": "one-sentence summary answering the 5 Ws (15-20 words)",
  "keyPoints": [
    {"point": "Bold term", "description": "description text"},
    {"point": "Bold term", "description": "description text"},
    {"point": "Bold term", "description": "description text"},
    {"point": "Bold term", "description": "description text"},
    {"point": "Bold term", "description": "description text"}
  ],
  "content": "main article body with lede (bold location) and body sections with ### headings - NO disclaimer, NO headline, NO key points section",
  "research": "supporting data and analysis with ### headings (250-260 words)",
  "conclusion": "final thoughts with ### heading (80-100 words)",
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6", "keyword7", "keyword8"]
}
  `,
    stream: false,
    format: 'json',
  });

  const responseText = res.data.response;
  console.log('Raw AI response length:', responseText.length);
  
  // Clean possible markdown code fences
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error('AI response did not contain valid JSON');
    console.error('Response preview:', responseText.substring(0, 500));
    throw new Error('AI response not JSON');
  }
  
  // Sanitize JSON string to remove control characters
  let sanitizedJson = jsonMatch[0]
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
    .replace(/\\n/g, '\\\\n') // Escape newlines for JSON
    .replace(/\\r/g, '\\\\r') // Escape carriage returns for JSON
    .replace(/\\t/g, '\\\\t'); // Escape tabs for JSON
  
  // Fix common JSON issues: trailing commas in arrays/objects
  sanitizedJson = sanitizedJson
    .replace(/,\s*]/g, ']') // Remove trailing commas in arrays
    .replace(/,\s*}/g, '}'); // Remove trailing commas in objects
  
  // Fix unescaped quotes in JSON string values
  // Replace unescaped quotes inside string values with escaped quotes
  // This is a complex issue - we need to be careful not to break valid JSON
  // The AI sometimes generates: "text "quoted" text" instead of "text \"quoted\" text"
  sanitizedJson = sanitizedJson.replace(/"([^"]*)"([^"]*)"([^"]*)"/g, (match, p1, p2, p3) => {
    // Check if this looks like an unescaped quote pattern
    // If p2 doesn't contain structural JSON characters, it's likely text
    if (!p2.includes(',') && !p2.includes(':') && !p2.includes('{') && !p2.includes('}') && !p2.includes('[') && !p2.includes(']')) {
      return `"${p1}\\"${p2}\\"${p3}"`;
    }
    return match;
  });
  
  // Fix truncated JSON by finding the last complete structure
  // If JSON is cut off mid-string, try to close it properly
  const lastOpenBrace = sanitizedJson.lastIndexOf('{');
  const lastCloseBrace = sanitizedJson.lastIndexOf('}');
  const lastOpenBracket = sanitizedJson.lastIndexOf('[');
  const lastCloseBracket = sanitizedJson.lastIndexOf(']');
  
  // If we have unbalanced braces/brackets, the JSON is truncated
  if (lastOpenBrace > lastCloseBrace || lastOpenBracket > lastCloseBracket) {
    console.warn('⚠️  JSON appears truncated, attempting to fix...');
    // Find the last complete property and close the object
    const lastComma = sanitizedJson.lastIndexOf(',');
    if (lastComma > lastCloseBrace) {
      // Remove trailing comma and close the object
      sanitizedJson = sanitizedJson.substring(0, lastComma) + '\n  }\n}';
    }
  }
  
  console.log('Sanitized JSON length:', sanitizedJson.length);
  
  let article;
  try {
    article = JSON.parse(sanitizedJson);
  } catch (parseError) {
    console.error('JSON parse error:', parseError.message);
    console.error('Problematic JSON around error position:');
    const errorPos = parseInt(parseError.message.match(/position (\d+)/)?.[1] || '0');
    const start = Math.max(0, errorPos - 300);
    const end = Math.min(sanitizedJson.length, errorPos + 300);
    console.error(sanitizedJson.substring(start, end));
    console.error('Full JSON length:', sanitizedJson.length);
    
    // Try to extract and log the full JSON for debugging
    console.error('Attempting to show full JSON (first 1000 chars):');
    console.error(sanitizedJson.substring(0, 1000));
    
    throw parseError;
  }
  
  // Extract tags and category from the generated content
  const fullText = `${article.title} ${article.smallDescription} ${article.content} ${article.research} ${article.conclusion}`;
  const { tags, category } = extractTagsAndCategory(fullText);
  
  return {
    ...article,
    tags,
    category,
    seoKeywords: article.seoKeywords || []
  };
}