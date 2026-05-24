// scripts/runPipeline.js

import * as dotenv from 'dotenv';
import * as readline from 'readline';
import { scrapeNewsSources } from './scrapers/news-scraper.js';
import { generateFreshArticle, listPromptTypes } from './ai/article-generator.js';
import { uploadArticleToSanity, uploadResearchToSanity, uploadNewsletterToSanity, uploadImageToSanity } from './uploader/sanity-uploader.js';
import { generateImage, checkConnection } from './ai/image-generator.js';

dotenv.config();

function askQuestion(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function selectPromptType() {
  const types = listPromptTypes();

  console.log('');
  console.log('┌─────────────────────────────────────────────┐');
  console.log('│       � Cyclespace Content Pipeline         │');
  console.log('├─────────────────────────────────────────────┤');
  console.log('│  Which content type do you want to generate? │');
  console.log('├─────────────────────────────────────────────┤');
  types.forEach((t, i) => {
    console.log(`│  ${i + 1}) ${t.label.padEnd(41)}│`);
    console.log(`│     ${t.description.substring(0, 39).padEnd(40)}│`);
    if (i < types.length - 1) console.log('│                                             │');
  });
  console.log('└─────────────────────────────────────────────┘');
  console.log('');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  let selection;
  while (true) {
    const answer = await askQuestion(rl, `Enter choice (1-${types.length}): `);
    const num = parseInt(answer.trim());
    if (num >= 1 && num <= types.length) {
      selection = types[num - 1];
      break;
    }
    console.log(`   ⚠️  Please enter a number between 1 and ${types.length}`);
  }

  rl.close();
  console.log(`\n✅ Selected: ${selection.label}\n`);
  return selection.type;
}

async function uploadByType(promptType, fresh, titleImage, sourceUrls) {
  if (promptType === 'news') {
    return await uploadArticleToSanity({
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
  } else if (promptType === 'research') {
    return await uploadResearchToSanity({
      title: fresh.title,
      smallDescription: fresh.smallDescription,
      keyFindings: fresh.keyFindings,
      content: fresh.content,
      conclusion: fresh.conclusion,
      reportType: fresh.reportType,
      tags: fresh.tags,
      category: fresh.category,
      seoKeywords: fresh.seoKeywords,
      sourceUrls,
    }, titleImage);
  } else if (promptType === 'newsletter') {
    return await uploadNewsletterToSanity({
      title: fresh.title,
      description: fresh.description,
      content: fresh.content,
      frequency: fresh.frequency,
      tags: fresh.tags,
      seoKeywords: fresh.seoKeywords,
    });
  }
}

export async function runPipeline(promptType = null) {
  console.log('�🚀 Starting news automation pipeline...');
  console.log('📋 Environment check:');
  console.log(`   - SANITY_PROJECT_ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? '✓' : '✗'}`);
  console.log(`   - SANITY_DATASET: ${process.env.NEXT_PUBLIC_SANITY_DATASET ? '✓' : '✗'}`);
  console.log(`   - SANITY_WRITE_TOKEN: ${process.env.SANITY_API_WRITE_TOKEN ? '✓' : '✗'}`);
  console.log(`   - OLLAMA_MODEL: ${process.env.OLLAMA_MODEL || 'llama3 (default)'}`);
  console.log(`   - AUTOMATIC1111_URL: ${process.env.AUTOMATIC1111_URL || 'http://127.0.0.1:7860 (default)'}`);

  try {
    // If promptType not passed (e.g. from API/cron), ask interactively
    const selectedType = promptType || await selectPromptType();

    const startTime = Date.now();

    console.log('📍 Step 1/4: Scraping news sources...');
    const scraped = await scrapeNewsSources();
    const scrapeTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Scraped ${scraped.length} articles in ${scrapeTime}s`);
    console.log(`   Articles: ${scraped.map(a => a.title).join(', ')}`);
    console.log('');

    if (scraped.length === 0) throw new Error('No articles scraped');

    console.log(`📍 Step 2/4: Generating ${selectedType} with AI...`);
    const aiStartTime = Date.now();
    const fresh = await generateFreshArticle(scraped, selectedType);
    const aiTime = ((Date.now() - aiStartTime) / 1000).toFixed(2);
    console.log(`✅ Content generated in ${aiTime}s`);
    console.log(`   Title: "${fresh.title}"`);
    if (fresh.smallDescription) console.log(`   Description: "${fresh.smallDescription}"`);
    if (fresh.description) console.log(`   Description: "${fresh.description}"`);
    if (fresh.keyPoints) console.log(`   Key Points: ${fresh.keyPoints.length} items`);
    if (fresh.keyFindings) console.log(`   Key Findings: ${fresh.keyFindings.length} items`);
    if (fresh.content) console.log(`   Content: ${fresh.content.length} characters`);
    if (fresh.research) console.log(`   Research: ${fresh.research.length} characters`);
    if (fresh.conclusion) console.log(`   Conclusion: ${fresh.conclusion.length} characters`);
    if (fresh.reportType) console.log(`   Report Type: "${fresh.reportType}"`);
    if (fresh.frequency) console.log(`   Frequency: "${fresh.frequency}"`);
    if (fresh.tags) console.log(`   Tags: ${fresh.tags.length} matched`);
    if (fresh.category) console.log(`   Category: "${fresh.category}"`);
    if (fresh.seoKeywords) console.log(`   SEO Keywords: ${fresh.seoKeywords.length} items`);
    console.log('');

    console.log('📍 Step 3/4: Generating hero image...');
    const imageStartTime = Date.now();
    let titleImage = null;
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
      console.warn('⚠️  Image API not available or no image prompt, skipping');
    }
    console.log(`   Image step completed in ${((Date.now() - imageStartTime) / 1000).toFixed(2)}s`);
    console.log('');

    console.log(`📍 Step 4/4: Uploading ${selectedType} to Sanity...`);
    const uploadStartTime = Date.now();
    const sourceUrls = scraped.map(s => s.url);
    const result = await uploadByType(selectedType, fresh, titleImage, sourceUrls);
    console.log(`✅ Uploaded in ${((Date.now() - uploadStartTime) / 1000).toFixed(2)}s`);
    console.log(`   Document ID: ${result._id}`);
    console.log('');

    console.log('🎉 Pipeline finished successfully');
    console.log(`⏱️  Total time: ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
  } catch (error) {
    console.error('❌ Pipeline failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Allow running as script directly
runPipeline();