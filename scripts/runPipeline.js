// scripts/runPipeline.js

import * as dotenv from 'dotenv';
import { scrapeNewsSources } from './scrapers/news-scraper.js';
import { generateFreshArticle } from './ai/article-generator.js';
import { uploadArticleToSanity, uploadImageToSanity } from './uploader/sanity-uploader.js';
import { generateImage, checkConnection } from './ai/image-generator.js';

dotenv.config();

console.log('🚀 Starting news automation pipeline...');
console.log('📋 Environment check:');
console.log(`   - SANITY_PROJECT_ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? '✓' : '✗'}`);
console.log(`   - SANITY_DATASET: ${process.env.NEXT_PUBLIC_SANITY_DATASET ? '✓' : '✗'}`);
console.log(`   - SANITY_WRITE_TOKEN: ${process.env.SANITY_API_WRITE_TOKEN ? '✓' : '✗'}`);
console.log(`   - OLLAMA_MODEL: ${process.env.OLLAMA_MODEL || 'llama3 (default)'}`);
console.log(`   - AUTOMATIC1111_URL: ${process.env.AUTOMATIC1111_URL || 'http://127.0.0.1:7860 (default)'}`);
console.log(`   - COMFYUI_URL: ${process.env.COMFYUI_URL || 'http://127.0.0.1:8188 (default)'}`);
console.log(`   - USE_COMFYUI: ${process.env.USE_COMFYUI || 'false'}`);
console.log('');

export async function runPipeline() {
  try {
    console.log('� Step 1/4: Scraping news sources...');
    const startTime = Date.now();
    const scraped = await scrapeNewsSources();
    const scrapeTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Scraped ${scraped.length} articles in ${scrapeTime}s`);
    console.log(`   Articles: ${scraped.map(a => a.title).join(', ')}`);
    console.log('');

    if (scraped.length === 0) throw new Error('No articles scraped');

    console.log('📍 Step 2/4: Generating fresh article with AI...');
    const aiStartTime = Date.now();
    const fresh = await generateFreshArticle(scraped);
    const aiTime = ((Date.now() - aiStartTime) / 1000).toFixed(2);
    console.log(`✅ Article generated in ${aiTime}s`);
    console.log('');
    console.log('📝 Article Content:');
    console.log(`   Title: "${fresh.title}"`);
    console.log(`   Small Description: "${fresh.smallDescription}"`);
    console.log(`   Key Points: ${fresh.keyPoints?.length || 0} items`);
    fresh.keyPoints?.forEach((kp, i) => console.log(`      ${i + 1}. ${kp}`));
    console.log(`   Content: ${fresh.content?.length || 0} characters`);
    console.log(`   Research: ${fresh.research?.length || 0} characters`);
    console.log(`   Conclusion: ${fresh.conclusion?.length || 0} characters`);
    console.log(`   Image Prompt: "${fresh.imagePrompt?.substring(0, 100)}..."`);
    console.log('');
    console.log('🏷️  Tags & Category:');
    console.log(`   Category: "${fresh.category}"`);
    console.log(`   Tags: ${fresh.tags?.length || 0} items`);
    fresh.tags?.forEach((tag, i) => console.log(`      ${i + 1}. ${tag.name} (${tag.color})`));
    console.log('');
    console.log('🔍 SEO Keywords:');
    console.log(`   Keywords: ${fresh.seoKeywords?.length || 0} items`);
    fresh.seoKeywords?.forEach((kw, i) => console.log(`      ${i + 1}. ${kw}`));
    console.log('');

    console.log('📍 Step 3/4: Generating hero image with SDXL...');
    const imageStartTime = Date.now();
    let titleImage = null;
    
    // Check if Automatic1111 is available
    const isApiAvailable = await checkConnection();
    if (isApiAvailable && fresh.imagePrompt) {
      try {
        const base64Image = await generateImage(fresh.imagePrompt);
        titleImage = await uploadImageToSanity(base64Image, fresh.title);
        console.log('✅ Hero image generated and uploaded');
      } catch (imageError) {
        console.warn('⚠️  Image generation failed, continuing without image:', imageError.message);
      }
    } else {
      console.warn('⚠️  API not available or no image prompt, skipping image generation');
    }
    const imageTime = ((Date.now() - imageStartTime) / 1000).toFixed(2);
    console.log(`   Image step completed in ${imageTime}s`);
    console.log('');

    console.log('📍 Step 4/4: Uploading to Sanity...');
    const uploadStartTime = Date.now();
    const sourceUrls = scraped.map(s => s.url);
    console.log('📦 Upload Payload:');
    console.log(`   Author: Fetched from Sanity CMS`);
    console.log(`   Category: "${fresh.category}"`);
    console.log(`   Tags: ${fresh.tags?.length || 0} references`);
    console.log(`   Impact: medium (default)`);
    console.log(`   Title Image: ${titleImage ? 'Generated and uploaded' : 'None'}`);
    console.log(`   SEO Metadata: auto-generated`);
    console.log(`      - Meta Title: "${fresh.title?.substring(0, 60)}"`);
    console.log(`      - Meta Description: "${fresh.smallDescription?.substring(0, 160)}"`);
    console.log(`      - Keywords: ${fresh.seoKeywords?.length || 0} items`);
    console.log(`      - Canonical URL: auto-generated from slug`);
    console.log(`      - Open Graph: title, description, url, site_name configured`);
    console.log(`      - Twitter: card, site, creator, title, description configured`);
    console.log(`      - Robots: index, follow (allow search engines)`);
    console.log('');
    const result = await uploadArticleToSanity({
      title: fresh.title,
      smallDescription: fresh.smallDescription,
      keyPoints: fresh.keyPoints,
      content: fresh.content,
      research: fresh.research,
      conclusion: fresh.conclusion,
      tags: fresh.tags,
      category: fresh.category,
      seoKeywords: fresh.seoKeywords,
      sourceUrls,
    }, titleImage);
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