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
  if (!text) return [];
  
  // Convert any escaped newline sequences to actual newlines
  let processedText = text
    .replace(/\\n\\n/g, '\n\n') // Handle double-escaped newlines
    .replace(/\\n/g, '\n') // Handle single-escaped newlines
    .replace(/\\r/g, '\r') // Handle escaped carriage returns
    .replace(/\\t/g, '\t'); // Handle escaped tabs
  
  const blocks = [];
  const lines = processedText.split('\n');
  let currentBlock = null;
  let blockIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Empty lines create paragraph breaks
    if (!trimmed) {
      if (currentBlock) {
        currentBlock._key = `block-${blockIndex++}`;
        blocks.push(currentBlock);
        currentBlock = null;
      }
      continue;
    }
    
    // Skip horizontal rules
    if (trimmed === '---') {
      if (currentBlock) {
        currentBlock._key = `block-${blockIndex++}`;
        blocks.push(currentBlock);
        currentBlock = null;
      }
      continue;
    }
    
    // Handle disclaimer (bold brackets)
    if (trimmed.startsWith('**[') && trimmed.endsWith(']**')) {
      if (currentBlock) {
        currentBlock._key = `block-${blockIndex++}`;
        blocks.push(currentBlock);
        currentBlock = null;
      }
      blocks.push({
        _key: `block-${blockIndex++}`,
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: trimmed, marks: ['strong'] }],
      });
      continue;
    }
    
    // Handle headings
    if (trimmed.startsWith('### ')) {
      if (currentBlock) {
        currentBlock._key = `block-${blockIndex++}`;
        blocks.push(currentBlock);
        currentBlock = null;
      }
      blocks.push({
        _key: `block-${blockIndex++}`,
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: trimmed.slice(4), marks: [] }],
      });
      continue;
    }
    
    if (trimmed.startsWith('## ')) {
      if (currentBlock) {
        currentBlock._key = `block-${blockIndex++}`;
        blocks.push(currentBlock);
        currentBlock = null;
      }
      blocks.push({
        _key: `block-${blockIndex++}`,
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: trimmed.slice(3), marks: [] }],
      });
      continue;
    }
    
    // Handle blockquotes
    if (trimmed.startsWith('> ')) {
      if (currentBlock) {
        currentBlock._key = `block-${blockIndex++}`;
        blocks.push(currentBlock);
        currentBlock = null;
      }
      blocks.push({
        _key: `block-${blockIndex++}`,
        _type: 'block',
        style: 'blockquote',
        children: [{ _type: 'span', text: trimmed.slice(2), marks: [] }],
      });
      continue;
    }
    
    // Handle numbered lists (1., 2., 3., etc.)
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numberedMatch) {
      if (currentBlock) {
        currentBlock._key = `block-${blockIndex++}`;
        blocks.push(currentBlock);
        currentBlock = null;
      }
      blocks.push({
        _key: `block-${blockIndex++}`,
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        level: 1,
        children: [{ _type: 'span', text: numberedMatch[2], marks: [] }],
      });
      continue;
    }
    
    // Handle bullet points
    if (trimmed.startsWith('- ')) {
      if (currentBlock) {
        currentBlock._key = `block-${blockIndex++}`;
        blocks.push(currentBlock);
        currentBlock = null;
      }
      blocks.push({
        _key: `block-${blockIndex++}`,
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [{ _type: 'span', text: trimmed.slice(2), marks: [] }],
      });
      continue;
    }
    
    // Handle bullet points with * (alternative format)
    if (trimmed.startsWith('* ')) {
      if (currentBlock) {
        currentBlock._key = `block-${blockIndex++}`;
        blocks.push(currentBlock);
        currentBlock = null;
      }
      blocks.push({
        _key: `block-${blockIndex++}`,
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [{ _type: 'span', text: trimmed.slice(2), marks: [] }],
      });
      continue;
    }
    
    // Handle bold text with **
    // First, check if the entire line is wrapped in ** ** and strip it
    let processedLine = line;
    // Check if line starts with ** and ends with ** but doesn't have ** in the middle
    const innerContent = trimmed.slice(2, -2);
    if (trimmed.startsWith('**') && trimmed.endsWith('**') && !innerContent.includes('**')) {
      // Entire line is bold - strip the marks
      processedLine = line.replace(/^\*\*/, '').replace(/\*\*$/, '');
    }
    
    const parts = [];
    let remaining = processedLine;
    let boldRegex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;
    
    while ((match = boldRegex.exec(remaining)) !== null) {
      // Add text before bold
      if (match.index > lastIndex) {
        parts.push({ text: remaining.slice(lastIndex, match.index), marks: [] });
      }
      // Add bold text
      parts.push({ text: match[1], marks: ['strong'] });
      lastIndex = match.index + match[0].length;
    }
    // Add remaining text
    if (lastIndex < remaining.length) {
      parts.push({ text: remaining.slice(lastIndex), marks: [] });
    }
    
    if (currentBlock && parts.length > 0) {
      // Append to current block
      currentBlock.children.push(...parts.map(p => ({ _type: 'span', text: p.text, marks: p.marks })));
    } else if (parts.length > 0) {
      // Start new block
      currentBlock = {
        _type: 'block',
        style: 'normal',
        children: parts.map(p => ({ _type: 'span', text: p.text, marks: p.marks })),
      };
    }
  }
  
  // Push last block if exists
  if (currentBlock) {
    currentBlock._key = `block-${blockIndex++}`;
    blocks.push(currentBlock);
  }
  
  return blocks;
}

function keyPointsToPortableText(keyPoints) {
  // keyPoints now come as objects with "point" and "description" fields from AI
  return keyPoints.map((kp) => ({
    _key: `key-${Math.random().toString(36).substr(2, 9)}`,
    point: kp.point || '',
    description: kp.description || ''
  }));
}

function generateSEOMetadata(article, slug, category, publishedAt) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // Format date as YYYY/MM/DD
  const date = new Date(publishedAt || Date.now());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}/${month}/${day}`;
  
  // Format date for meta attributes (ISO 8601)
  const isoDate = date.toISOString();
  
  // Generate canonical URL with new format: /news/[category]/[date]/[slug]
  const canonicalUrl = `${siteUrl}/news/${category}/${formattedDate}/${slug}`;
  
  // Combine AI-generated keywords with extracted tag names
  const tagKeywords = article.tags?.map(tag => tag.name) || [];
  const aiKeywords = article.seoKeywords || [];
  const combinedKeywords = [...new Set([...tagKeywords, ...aiKeywords])].slice(0, 10);
  
  // Generate custom meta attributes for article-specific SEO
  const metaAttributes = [
    { key: 'article:published_time', value: isoDate },
    { key: 'article:section', value: category },
    ...(article.tags?.map(tag => ({ key: 'article:tag', value: tag.name })) || [])
  ];
  
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
    },
    metaAttributes: metaAttributes
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
      tagIds.push({ 
        _key: `tag-${Math.random().toString(36).substr(2, 9)}`,
        _type: 'reference', 
        _ref: tagId 
      });
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
  const publishedAt = new Date().toISOString();
  const seoMetadata = generateSEOMetadata(article, slug, article.category, publishedAt);
  
  const doc = {
    _type: 'news',
    title: article.title,
    slug: {
      _type: 'slug',
      current: slug,
    },
    smallDescription: article.smallDescription,
    keyPoints: keyPointsToPortableText(article.keyPoints || []),
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