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

async function getFirstAuthor() {
  const client = getSanityClient();
  const authors = await client.fetch(`
    *[_type == "author"][0] {
      _id
    }
  `);
  return authors?._id;
}

async function getCategoryBySlug(slug) {
  const client = getSanityClient();
  const category = await client.fetch(`
    *[_type == "category" && slug.current == $slug][0] {
      _id
    }
  `, { slug });
  return category?._id;
}

async function getTagBySlug(slug) {
  const client = getSanityClient();
  const tag = await client.fetch(`
    *[_type == "tag" && slug.current == $slug][0] {
      _id
    }
  `, { slug });
  return tag?._id;
}

async function getImpactBySlug(slug) {
  const client = getSanityClient();
  const impact = await client.fetch(`
    *[_type == "impact" && slug.current == $slug][0] {
      _id
    }
  `, { slug });
  return impact?._id;
}

function plainTextToPortableText(text) {
  return text.split('\n\n').map((paragraph) => ({
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: paragraph, marks: [] }],
  }));
}

function keyPointsToPortableText(keyPoints) {
  return keyPoints.map((point) => ({
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: point, marks: [] }],
  }));
}

function generateSEOMetadata(article, slug) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const canonicalUrl = `${siteUrl}/news/${slug}`;
  
  // Combine AI-generated keywords with extracted tag names
  const tagKeywords = article.tags?.map(tag => tag.name) || [];
  const aiKeywords = article.seoKeywords || [];
  const combinedKeywords = [...new Set([...tagKeywords, ...aiKeywords])].slice(0, 10);
  
  return {
    title: article.title?.substring(0, 60) || article.title,
    description: article.smallDescription?.substring(0, 160) || article.smallDescription,
    keywords: combinedKeywords,
    canonicalUrl: canonicalUrl,
    openGraph: {
      title: article.title,
      description: article.smallDescription,
      url: canonicalUrl,
      siteName: process.env.SITE_NAME || 'Cyclespace Exchange',
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      site: process.env.TWITTER_SITE_HANDLE || '@cyclespace',
      creator: process.env.TWITTER_CREATOR_HANDLE || '@cyclespace',
      title: article.title,
      description: article.smallDescription
    },
    robots: {
      noIndex: false,
      noFollow: false
    }
  };
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function uploadArticleToSanity(article) {
  const sanityClient = getSanityClient();
  
  // Fetch first available author from Sanity
  const authorId = await getFirstAuthor();
  if (!authorId) {
    throw new Error('No authors found in Sanity CMS. Please create at least one author.');
  }
  
  // Fetch category ID by slug
  const categoryId = await getCategoryBySlug(article.category || 'markets');
  if (!categoryId) {
    console.warn(`⚠️  Category "${article.category}" not found in Sanity, defaulting to "markets"`);
    const fallbackId = await getCategoryBySlug('markets');
    if (!fallbackId) {
      throw new Error('Default category "markets" not found in Sanity CMS. Please create at least one category.');
    }
  }
  
  // Fetch tag IDs by slugs
  const tagIds = [];
  for (const tag of article.tags || []) {
    const tagId = await getTagBySlug(tag.slug);
    if (tagId) {
      tagIds.push({ _type: 'reference', _ref: tagId });
    } else {
      console.warn(`⚠️  Tag "${tag.name}" (slug: ${tag.slug}) not found in Sanity, skipping`);
    }
  }
  
  // Fetch impact ID by slug
  const impactId = await getImpactBySlug('medium');
  if (!impactId) {
    console.warn('⚠️  Impact "medium" not found in Sanity, skipping impact field');
  }
  
  const slug = generateSlug(article.title);
  const seoMetadata = generateSEOMetadata(article, slug);
  
  const doc = {
    _type: 'news',
    title: article.title,
    slug: {
      _type: 'slug',
      current: slug,
    },
    smallDescription: article.smallDescription,
    keyPoints: article.keyPoints?.map((point, index) => ({
      _key: `key-${index}`,
      point: point,
      description: ''
    })) || [],
    content: plainTextToPortableText(article.content),
    research: plainTextToPortableText(article.research),
    conclusion: plainTextToPortableText(article.conclusion),
    publishedAt: new Date().toISOString(),
    // Set author from Sanity query
    author: {
      _type: 'reference',
      _ref: authorId
    },
    // Set category from Sanity query
    category: {
      _type: 'reference',
      _ref: categoryId || (await getCategoryBySlug('markets'))
    },
    // Set tags from Sanity queries
    tags: tagIds,
    // Set impact from Sanity query
    impacts: impactId ? [{ _type: 'reference', _ref: impactId }] : [],
    // Set SEO metadata
    seo: seoMetadata
  };

  const result = await sanityClient.create(doc);
  console.log(`✅ Article published: ${result._id} – ${result.title}`);
  return result;
}