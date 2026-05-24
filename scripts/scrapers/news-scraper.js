// scripts/scrapers/newsScraper.js
import axios from 'axios';
import * as cheerio from 'cheerio';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { websites } = require('../../websites.json');

export async function scrapeNewsSources() {
  const results = [];

  for (const siteUrl of websites) {
    try {
      const { data } = await axios.get(siteUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)' },
        timeout: 10000,
      });
      const $ = cheerio.load(data);

      $('a').each((_, element) => {
        const title = $(element).text().trim();
        const href = $(element).attr('href') || '';
        if (!title || title.length < 20) return;

        const url = href.startsWith('http') ? href : new URL(href, siteUrl).href;
        results.push({
          title,
          content: `Full content from ${url} would be fetched here.`,
          url,
          source: siteUrl,
        });
      });
    } catch (err) {
      console.warn(`⚠️  Failed to scrape ${siteUrl}:`, err.message);
    }
  }

  return results.slice(0, 5);
}