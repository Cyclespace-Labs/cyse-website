// scripts/runPipeline.js

import * as dotenv from 'dotenv';
import * as readline from 'readline';
import { scrapeNewsSources } from './scrapers/news-scraper.js';
import { generateFreshArticle, listPromptTypes } from './ai/article-generator.js';
import { uploadArticleToSanity, uploadResearchToSanity, uploadNewsletterToSanity, uploadImageToSanity } from './uploader/sanity-uploader.js';
import { generateImage, checkConnection } from './ai/image-generator.js';
import { CATEGORIES, TAGS } from './news-constants.js';

dotenv.config();

// Constants for report types
const REPORT_TYPES = [
  { label: 'Quarterly Review',    value: 'quarterly'      },
  { label: 'Annual Report',       value: 'annual'         },
  { label: 'Market Report',       value: 'market'         },
  { label: 'Adoption Index',      value: 'adoption'       },
  { label: 'Exchange Report',     value: 'exchange'       },
  { label: 'Stablecoin Report',   value: 'stablecoin'     },
  { label: 'Tokenization Report', value: 'tokenization'   },
  { label: 'Network Report',      value: 'network'        },
  { label: 'Regulatory Report',   value: 'regulatory'     },
  { label: 'Ecosystem Report',    value: 'ecosystem'      },
  { label: 'Whitepaper',          value: 'whitepaper'     },
  { label: 'Case Study',          value: 'case-study'     },
  { label: 'Deep Dive',           value: 'deep-dive'      },
  { label: 'Market Analysis',     value: 'market-analysis'},
];

const W = 51; // box width (inner)

// Utility function to print a box around text
function box(lines) {
  const bar = '─'.repeat(W);
  console.log(`┌${bar}┐`);
  for (const line of lines) {
    const truncated = line.length > W - 1 ? line.substring(0, W - 2) + '…' : line;
    const pad = W - 1 - truncated.length;
    console.log(`│ ${truncated}${' '.repeat(Math.max(0, pad))}│`);
  }
  console.log(`└${bar}┘`);
}

function askQuestion(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function selectPromptType() {
  const types = listPromptTypes();

  console.log('');
  const lines = [
    '  Cyclespace Content Pipeline  ',
    '',
    '  Which content type do you want to generate?',
    '',
    ...types.flatMap((t, i) => [
      `  ${i + 1}) ${t.label}`,
      `     ${t.description.substring(0, 44)}`,
      ...(i < types.length - 1 ? [''] : []),
    ]),
  ];
  box(lines);
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

async function selectCategory(rl) {
  console.log('');
  box([
    '  Select Category',
    '',
    ...CATEGORIES.map((c, i) => `  ${String(i + 1).padStart(2)}) ${c.name.padEnd(16)} ${c.description.substring(0, 26)}`),
    '',
    '  Press Enter to let AI decide',
  ]);
  console.log('');

  while (true) {
    const answer = await askQuestion(rl, `Category (1-${CATEGORIES.length}, or Enter to skip): `);
    if (answer.trim() === '') return null;
    const num = parseInt(answer.trim());
    if (num >= 1 && num <= CATEGORIES.length) {
      const cat = CATEGORIES[num - 1];
      console.log(`   ✅ Category: ${cat.name}`);
      return cat.slug;
    }
    console.log(`   ⚠️  Enter a number between 1 and ${CATEGORIES.length}, or press Enter`);
  }
}

async function selectTags(rl) {
  const groups = [...new Set(TAGS.map(t => t.group))];
  const accumulated = [];

  while (true) {
    const pickedLine = accumulated.length
      ? `  ✓ ${accumulated.map(t => t.name).join(', ')}`
      : '  None selected yet';

    console.log('');
    box([
      '  Tags — Select Group or Search',
      '',
      ...groups.map((g, i) => {
        const count = TAGS.filter(t => t.group === g).length;
        return `  ${String(i + 1).padStart(2)}) ${g.padEnd(20)} (${count})`;
      }),
      '',
      '  s) Search by name',
      '',
      pickedLine,
      '',
      '  Enter to finish',
    ]);
    console.log('');

    const input = await askQuestion(rl, `Choice (1-${groups.length} / s / Enter to finish): `);
    const trimmed = input.trim().toLowerCase();

    if (trimmed === '') break;

    // Search mode
    if (trimmed === 's') {
      const query = await askQuestion(rl, `  Search tags: `);
      if (!query.trim()) continue;
      const results = TAGS.filter(t =>
        t.name.toLowerCase().includes(query.trim().toLowerCase())
      );
      if (results.length === 0) {
        console.log('   ⚠️  No tags matched.');
        continue;
      }
      console.log('');
      box([
        `  Results for "${query.trim()}"`,
        '',
        ...results.map((t, i) => `  ${String(i + 1).padStart(2)}) ${t.name.padEnd(24)} [${t.group}]`),
        '',
        '  Enter numbers separated by commas',
        '  Press Enter to go back',
      ]);
      console.log('');
      const tagAnswer = await askQuestion(rl, `Select: `);
      if (tagAnswer.trim() === '') continue;
      const picked = tagAnswer.split(',')
        .map(s => parseInt(s.trim()))
        .filter(n => n >= 1 && n <= results.length)
        .map(n => results[n - 1])
        .filter(t => !accumulated.find(a => a.slug === t.slug))
        .map(t => ({ name: t.name, slug: t.slug, color: t.color }));
      accumulated.push(...picked);
      if (picked.length) console.log(`   ✅ Added: ${picked.map(t => t.name).join(', ')}`);
      continue;
    }

    // Group mode
    const groupNum = parseInt(trimmed);
    if (isNaN(groupNum) || groupNum < 1 || groupNum > groups.length) {
      console.log(`   ⚠️  Enter a number 1-${groups.length}, 's' to search, or Enter to finish`);
      continue;
    }

    const selectedGroup = groups[groupNum - 1];
    const groupTags = TAGS.filter(t => t.group === selectedGroup);

    console.log('');
    box([
      `  Tags — ${selectedGroup}`,
      '',
      ...groupTags.map((t, i) => {
        const already = accumulated.find(a => a.slug === t.slug) ? ' ✓' : '';
        return `  ${String(i + 1).padStart(2)}) ${t.name}${already}`;
      }),
      '',
      '  Enter numbers separated by commas (e.g. 1,3,5)',
      '  Press Enter to go back',
    ]);
    console.log('');

    const tagAnswer = await askQuestion(rl, `Tags: `);
    if (tagAnswer.trim() === '') continue;

    const picked = tagAnswer.split(',')
      .map(s => parseInt(s.trim()))
      .filter(n => n >= 1 && n <= groupTags.length)
      .map(n => groupTags[n - 1])
      .filter(t => !accumulated.find(a => a.slug === t.slug))
      .map(t => ({ name: t.name, slug: t.slug, color: t.color }));

    accumulated.push(...picked);
    if (picked.length) console.log(`   ✅ Added: ${picked.map(t => t.name).join(', ')}`);
  }

  if (accumulated.length) console.log(`   ✅ Final tags (${accumulated.length}): ${accumulated.map(t => t.name).join(', ')}`);
  return accumulated;
}

async function selectReportType(rl) {
  console.log('');
  box([
    '  Select Report Type',
    '',
    ...REPORT_TYPES.map((r, i) => `  ${String(i + 1).padStart(2)}) ${r.label}`),
    '',
    '  Press Enter to let AI decide',
  ]);
  console.log('');

  while (true) {
    const answer = await askQuestion(rl, `Report type (1-${REPORT_TYPES.length}, or Enter to skip): `);
    if (answer.trim() === '') return null;
    const num = parseInt(answer.trim());
    if (num >= 1 && num <= REPORT_TYPES.length) {
      const rt = REPORT_TYPES[num - 1];
      console.log(`   ✅ Report Type: ${rt.label}`);
      return rt.value;
    }
    console.log(`   ⚠️  Enter a number between 1 and ${REPORT_TYPES.length}, or press Enter`);
  }
}

async function selectMetadata(promptType) {
  if (promptType === 'newsletter') return {};

  console.log('');
  console.log('─'.repeat(53));
  console.log('  Configure metadata (press Enter on any to let AI decide)');
  console.log('─'.repeat(53));

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const overrides = {};

  const category = await selectCategory(rl);
  if (category) overrides.category = category;

  const tags = await selectTags(rl);
  if (tags.length > 0) overrides.tags = tags;

  if (promptType === 'research') {
    const reportType = await selectReportType(rl);
    if (reportType) overrides.reportType = reportType;
  }

  rl.close();
  // Pause stdin so no further input interferes with pipeline output
  process.stdin.pause();
  console.log('');
  return overrides;
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

    // Ask for metadata overrides (category, tags, report type)
    const metadataOverrides = promptType ? {} : await selectMetadata(selectedType);

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
    const aiOutput = await generateFreshArticle(scraped, selectedType);
    const fresh = { ...aiOutput, ...metadataOverrides };
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