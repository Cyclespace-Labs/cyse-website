// scripts/ai/articleGenerator.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ScrapedArticle } from '@/scripts/scrapers/news-scraper';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateFreshArticle(
  sourceArticles: ScrapedArticle[]
): Promise<{ title: string; excerpt: string; body: string }> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
    You are an expert news writer. Below are excerpts from several news articles.
    Write a **brand new, original news article** of 300–500 words.
    Do NOT copy sentences directly. Synthesize the key themes, add new insights,
    and write in a neutral, journalistic tone.

    Source articles:
    ${sourceArticles.map((a, i) => `[${i+1}] ${a.title}\n${a.content.substring(0, 500)}...`).join('\n\n')}

    Respond with valid JSON only:
    {
      "title": "catchy and informative headline",
      "excerpt": "one-sentence summary of the article (max 160 chars)",
      "body": "full article text in plain text (will be converted to Sanity block content later)"
    }
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  // Clean possible markdown code fences
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AI response not JSON');
  return JSON.parse(jsonMatch[0]);
}