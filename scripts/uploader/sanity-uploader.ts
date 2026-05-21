// scripts/uploader/sanityUploader.ts
import { createClient } from '@sanity/client';
import { toPlainText } from '@portabletext/toolkit';

// Sanity client (use environment variables)
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,   // write token – keep secret
  apiVersion: '2023-05-03',
  useCdn: false,
});

function plainTextToPortableText(text: string) {
  return text.split('\n\n').map((paragraph) => ({
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: paragraph, marks: [] }],
  }));
}

export async function uploadArticleToSanity(article: {
  title: string;
  excerpt: string;
  body: string;
  sourceUrls: string[];
}) {
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