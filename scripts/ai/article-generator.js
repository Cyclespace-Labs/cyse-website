// scripts/ai/articleGenerator.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { createRequire } from 'module';
import { TAGS, CATEGORIES } from '../news-constants.js';

const require = createRequire(import.meta.url);

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

export function listPromptTypes() {
  const types = ['news', 'research', 'newsletter'];
  return types.map(type => {
    const config = require(`../prompts/${type}-prompt.json`);
    return { type, label: config.label, description: config.description };
  });
}

export async function generateFreshArticle(sourceArticles, promptType = 'news') {
  const promptConfig = require(`../prompts/${promptType}-prompt.json`);
  
  const sourceArticlesText = sourceArticles
    .map((a, i) => `[${i+1}] ${a.title}\n${a.content.substring(0, 500)}...`)
    .join('\n\n');
  
  const prompt = promptConfig.prompt.replace('{{SOURCE_ARTICLES}}', sourceArticlesText);
  
  console.log(`   Using prompt: "${promptConfig.label}" (${promptType}-prompt.json)`);
  
  const res = await axios.post('http://localhost:11434/api/generate', { 
    model: process.env.OLLAMA_MODEL || 'llama3',
    prompt,
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

  // Fix missing array close bracket: AI sometimes omits ] when transitioning from an
  // array of objects to the next root-level key.
  // Pattern: ...},  "content": ...  →  ...}],  "content": ...
  const rootLevelKeys = ['content', 'research', 'conclusion', 'imagePrompt', 'seoKeywords', 'description', 'frequency', 'reportType', 'title', 'smallDescription', 'keyFindings'];
  const missingBracketPattern = new RegExp(`}(\\s*,\\s*"(?:${rootLevelKeys.join('|')})"\\s*:)`, 'g');
  sanitizedJson = sanitizedJson.replace(missingBracketPattern, (match, rest, offset) => {
    // Count unbalanced [ brackets up to this point (outside of strings)
    const before = sanitizedJson.substring(0, offset + 1);
    let depth = 0;
    let inStr = false;
    let esc = false;
    for (const ch of before) {
      if (esc) { esc = false; continue; }
      if (ch === '\\' && inStr) { esc = true; continue; }
      if (ch === '"') { inStr = !inStr; continue; }
      if (inStr) continue;
      if (ch === '[') depth++;
      if (ch === ']') depth--;
    }
    // If there's an unclosed [ bracket, insert ] to close the array
    if (depth > 0) return `}]${rest}`;
    return match;
  });

  // Fix unescaped quotes in JSON string values
  // The AI sometimes generates: "text "quoted" text" instead of "text \"quoted\" text"
  // This is a more robust approach to fix unescaped quotes
  sanitizedJson = sanitizedJson.replace(/"([^"]*)"([^"]*)"([^"]*)"/g, (match, p1, p2, p3) => {
    // Check if this looks like an unescaped quote pattern
    // If p2 doesn't contain structural JSON characters, it's likely text
    if (!p2.includes(',') && !p2.includes(':') && !p2.includes('{') && !p2.includes('}') && !p2.includes('[') && !p2.includes(']')) {
      return `"${p1}\\"${p2}\\"${p3}"`;
    }
    return match;
  });
  
  // Additional fix: handle quotes after colons (common in description fields)
  // Pattern: "description":"text with "quotes" here"
  sanitizedJson = sanitizedJson.replace(/:\s*"([^"]*)"([^"]*)"([^"]*)"/g, (match, p1, p2, p3) => {
    // If the middle part doesn't have JSON structural chars, escape the quotes
    if (!p2.includes(',') && !p2.includes(':') && !p2.includes('{') && !p2.includes('}') && !p2.includes('[') && !p2.includes(']')) {
      return `: "${p1}\\"${p2}\\"${p3}"`;
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