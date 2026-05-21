// scripts/uploader/sanityUploader.js
import { createClient } from '@sanity/client';

function getSanityClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET,
    token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
    apiVersion: '2026-04-07',
    useCdn: false,
  });
}

function plainTextToPortableText(text) {
  return text.split('\n\n').map((paragraph) => ({
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: paragraph, marks: [] }],
  }));
}

export async function uploadArticleToSanity(article) {
  const sanityClient = getSanityClient();
  const doc = {
    _type: 'article',
    title: article.title,
    excerpt: article.excerpt,
    body: plainTextToPortableText(article.body),
    sourceUrls: article.sourceUrls,
    publishDate: new Date().toISOString(),
  };

  const result = await sanityClient.create(doc);
  console.log(`✅ Article published: ${result._id} – ${result.title}`);
  return result;
}