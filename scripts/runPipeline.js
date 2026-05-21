// scripts/runPipeline.js

import * as dotenv from 'dotenv';
import { scrapeNewsSources } from './scrapers/news-scraper.js';
import { generateFreshArticle } from './ai/article-generator.js';
import { uploadArticleToSanity } from './uploader/sanity-uploader.js';

dotenv.config();

console.log('🚀 Starting news automation pipeline...');
console.log('📋 Environment check:');
console.log(`   - SANITY_PROJECT_ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? '✓' : '✗'}`);
console.log(`   - SANITY_DATASET: ${process.env.NEXT_PUBLIC_SANITY_DATASET ? '✓' : '✗'}`);
console.log(`   - SANITY_WRITE_TOKEN: ${process.env.SANITY_API_WRITE_TOKEN ? '✓' : '✗'}`);
console.log(`   - OLLAMA_MODEL: ${process.env.OLLAMA_MODEL || 'llama3 (default)'}`);
console.log('');

export async function runPipeline() {
  try {
    console.log('� Step 1/3: Scraping news sources...');
    const startTime = Date.now();
    const scraped = await scrapeNewsSources();
    const scrapeTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Scraped ${scraped.length} articles in ${scrapeTime}s`);
    console.log(`   Articles: ${scraped.map(a => a.title).join(', ')}`);
    console.log('');

    if (scraped.length === 0) throw new Error('No articles scraped');

    console.log('📍 Step 2/3: Generating fresh article with AI...');
    const aiStartTime = Date.now();
    const fresh = await generateFreshArticle(scraped);
    const aiTime = ((Date.now() - aiStartTime) / 1000).toFixed(2);
    console.log(`✅ Article generated in ${aiTime}s`);
    console.log(`   Title: "${fresh.title}"`);
    console.log(`   Excerpt: "${fresh.excerpt}"`);
    console.log(`   Body length: ${fresh.body.length} characters`);
    console.log('');

    console.log('� Step 3/3: Uploading to Sanity...');
    const uploadStartTime = Date.now();
    const sourceUrls = scraped.map(s => s.url);
    const result = await uploadArticleToSanity({
      title: fresh.title,
      excerpt: fresh.excerpt,
      body: fresh.body,
      sourceUrls,
    });
    const uploadTime = ((Date.now() - uploadStartTime) / 1000).toFixed(2);
    console.log(`✅ Article uploaded in ${uploadTime}s`);
    console.log(`   Document ID: ${result._id}`);
    console.log('');

    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('🎉 Pipeline finished successfully');
    console.log(`⏱️  Total time: ${totalTime}s`);
  } catch (error) {
    console.error('❌ Pipeline failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Allow running as script directly
runPipeline();