// scripts/scrapers/newsScraper.js
import axios from 'axios';
import * as cheerio from 'cheerio';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const websitesConfig = require('../../websites.json');

const HEADERS = { 'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)' };
const TIMEOUT = 12000;

async function scrapeArticleContent(url) {
  try {
    const { data } = await axios.get(url, { headers: HEADERS, timeout: TIMEOUT });
    const $ = cheerio.load(data);

    // Extract title from common selectors
    const title =
      $('h1').first().text().trim() ||
      $('meta[property="og:title"]').attr('content')?.trim() ||
      $('title').text().trim() ||
      '';

    // Extract body content from article/main tags
    const contentSelectors = ['article', 'main', '.article-body', '.post-content', '.entry-content', '.article-content', '[class*="article"]', '[class*="content"]'];
    let bodyText = '';
    for (const sel of contentSelectors) {
      const el = $(sel).first();
      if (el.length) {
        bodyText = el.find('p').map((_, p) => $(p).text().trim()).get().filter(t => t.length > 40).join('\n\n');
        if (bodyText.length > 200) break;
      }
    }

    // Fallback: grab all paragraphs
    if (!bodyText) {
      bodyText = $('p').map((_, p) => $(p).text().trim()).get().filter(t => t.length > 40).join('\n\n');
    }

    if (!title || bodyText.length < 100) return null;

    return { title, content: bodyText, url, source: url };
  } catch (err) {
    console.warn(`   ⚠️  Failed to scrape article ${url}:`, err.message);
    return null;
  }
}

async function scrapeLinksFromSite(siteUrl) {
  try {
    const { data } = await axios.get(siteUrl, { headers: HEADERS, timeout: TIMEOUT });
    const $ = cheerio.load(data);
    const links = [];

    $('a').each((_, el) => {
      const title = $(el).text().trim();
      const href = $(el).attr('href') || '';
      if (!title || title.length < 20) return;
      const url = href.startsWith('http') ? href : (() => { try { return new URL(href, siteUrl).href; } catch { return null; } })();
      if (url) links.push({ title, url, source: siteUrl });
    });

    return links;
  } catch (err) {
    console.warn(`   ⚠️  Failed to crawl site ${siteUrl}:`, err.message);
    return [];
  }
}

function isSimilar(titleA, titleB) {
  const normalize = t => t.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3);
  const wordsA = new Set(normalize(titleA));
  const wordsB = normalize(titleB);
  if (!wordsA.size || !wordsB.length) return false;
  const overlap = wordsB.filter(w => wordsA.has(w)).length;
  const similarity = overlap / Math.max(wordsA.size, wordsB.length);
  return similarity > 0.5; // >50% keyword overlap = similar
}

function deduplicateArticles(articles) {
  const unique = [];
  for (const article of articles) {
    const isDup = unique.some(existing => isSimilar(existing.title, article.title));
    if (!isDup) {
      unique.push(article);
    } else {
      console.log(`   🔄 Skipping duplicate: "${article.title.substring(0, 60)}..."`);
    }
  }
  return unique;
}

export async function scrapeNewsSources() {
  const { directArticle = [], websites = [] } = websitesConfig;
  const allResults = [];

  // ── Step 1: Scrape direct article URLs (full content) ──────────────────
  if (directArticle.length > 0) {
    console.log(`   📎 Scraping ${directArticle.length} direct article(s)...`);
    for (const url of directArticle) {
      console.log(`      → ${url}`);
      const article = await scrapeArticleContent(url);
      if (article) {
        console.log(`      ✓ "${article.title.substring(0, 60)}"`);
        allResults.push(article);
      }
    }
  }

  // ── Step 2: Crawl websites for links then fetch each article ──────────
  if (websites.length > 0) {
    console.log(`   🌐 Crawling ${websites.length} website(s) for article links...`);
    for (const siteUrl of websites) {
      console.log(`      → ${siteUrl}`);
      const links = await scrapeLinksFromSite(siteUrl);
      console.log(`         Found ${links.length} links`);

      // Fetch content for up to 2 articles per site
      let fetched = 0;
      for (const link of links) {
        if (fetched >= 2) break;
        const article = await scrapeArticleContent(link.url);
        if (article) {
          allResults.push(article);
          fetched++;
        }
      }
    }
  }

  // ── Step 3: Deduplicate by title similarity ────────────────────────────
  console.log(`   🔍 Deduplicating ${allResults.length} total articles...`);
  const unique = deduplicateArticles(allResults);
  console.log(`   ✅ ${unique.length} unique articles after deduplication`);

  return unique.slice(0, 8);
}