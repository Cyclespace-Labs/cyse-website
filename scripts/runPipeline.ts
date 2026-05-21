// scripts/runPipeline.ts

import * as dotenv from 'dotenv';
import { scrapeNewsSources } from './scrapers/news-scraper';
import { generateFreshArticle } from './ai/ai-generator';
import { uploadArticleToSanity } from './uploader/sanity-uploader';

dotenv.config({ path: '.env.local' });

export async function runPipeline() {
  try {
    console.log('🔍 Scraping news sources...');
    const scraped = await scrapeNewsSources();
    if (scraped.length === 0) throw new Error('No articles scraped');

    console.log('🤖 Generating fresh article with AI...');
    const fresh = await generateFreshArticle(scraped);

    console.log('📤 Uploading to Sanity...');
    const sourceUrls = scraped.map(s => s.url);
    await uploadArticleToSanity({
      title: fresh.title,
      excerpt: fresh.excerpt,
      body: fresh.body,
      sourceUrls,
    });

    console.log('🎉 Pipeline finished successfully');
  } catch (error) {
    console.error('❌ Pipeline failed:', error);
    process.exit(1);
  }
}

// Allow running as script directly
if (require.main === module) {
  runPipeline();
}