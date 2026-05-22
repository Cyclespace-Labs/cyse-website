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
    You are an expert news writer. Below are excerpts from several news articles.
    Write a **brand new, original news article** following this exact structure:
    
    - Title: 10-15 words max (catchy and informative)
    - Small Description: 15-20 words max (one-sentence summary)
    - Key Points: 4-6 bullet points (key takeaways)
    - Content: 200-210 words max (main article body)
    - Research: 250-260 words max (supporting data and analysis)
    - Conclusion: 80-100 words max (final thoughts and implications)

    Do NOT copy sentences directly. Synthesize the key themes, add new insights,
    and write in a neutral, journalistic tone.

    Source articles:
    ${sourceArticles.map((a, i) => `[${i+1}] ${a.title}\n${a.content.substring(0, 500)}...`).join('\n\n')}

    Respond with valid JSON only:
    {
      "title": "catchy and informative headline (10-15 words)",
      "smallDescription": "one-sentence summary (15-20 words)",
      "keyPoints": ["key point 1", "key point 2", "key point 3", "key point 4", "key point 5"],
      "content": "main article body (200-210 words)",
      "research": "supporting data and analysis (250-260 words)",
      "conclusion": "final thoughts and implications (80-100 words)",
      "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6", "keyword7", "keyword8"]
    }
  `,
    stream: false,
    format: 'json',
  });

  const responseText = res.data.response;
  // Clean possible markdown code fences
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AI response not JSON');
  
  // Sanitize JSON string to remove control characters
  const sanitizedJson = jsonMatch[0]
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
    .replace(/\\n/g, '\\\\n') // Escape newlines
    .replace(/\\r/g, '\\\\r') // Escape carriage returns
    .replace(/\\t/g, '\\\\t'); // Escape tabs
  
  const article = JSON.parse(sanitizedJson);
  
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