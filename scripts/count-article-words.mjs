import { createClient } from 'next-sanity';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
});

function countWords(text) {
  if (!text) return 0;
  if (typeof text === 'string') {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }
  if (Array.isArray(text)) {
    // Handle PortableText blocks
    let wordCount = 0;
    text.forEach(block => {
      if (block.children) {
        block.children.forEach(child => {
          if (child.text) {
            wordCount += countWords(child.text);
          }
        });
      }
    });
    return wordCount;
  }
  return 0;
}

async function getArticleWordCounts() {
  const query = `
    *[_type == "news" && slug.current == "volatility-watch-usd-2.2-billion-in-bitcoin-and-ethereum-options-expire-today"] {
      title,
      smallDescription,
      keyPoints,
      content,
      research,
      conclusion
    }[0]
  `;
  
  const article = await client.fetch(query);
  
  if (!article) {
    console.log('Article not found');
    return;
  }

  const counts = {
    title: countWords(article.title),
    smallDescription: countWords(article.smallDescription),
    keyPoints: article.keyPoints ? article.keyPoints.length : 0,
    content: countWords(article.content),
    research: countWords(article.research),
    conclusion: countWords(article.conclusion),
  };

  console.log('Article:', article.title);
  console.log('\nWord Counts:');
  console.log('Title:', counts.title);
  console.log('Small Description:', counts.smallDescription);
  console.log('Key Points (count):', counts.keyPoints);
  console.log('Content:', counts.content);
  console.log('Research:', counts.research);
  console.log('Conclusion:', counts.conclusion);
  console.log('\nTotal Content Words:', counts.content + counts.research + counts.conclusion);
}

getArticleWordCounts().catch(console.error);
