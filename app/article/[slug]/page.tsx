import { Article } from "@/lib/interface";
import { client, urlFor } from "@/sanity/lib/client";
import { notFound } from 'next/navigation';
import ArticlePage from "@/components/news/article-page";

// Fix: GenerateMetadata needs to handle Promise params
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const article = await getData(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cyclespace.exchange/news';
  const articleUrl = `${baseUrl}/news/article/${slug}`;
  
  const titleImageUrl = article.titleImage 
    ? urlFor(article.titleImage).url()
    : '/default-og-image.jpg';

  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.smallDescription || article.title,
    keywords: article.seo?.keywords,
    openGraph: {
      title: article.seo?.openGraph?.title || article.title,
      description: article.seo?.openGraph?.description || article.smallDescription || article.title,
      images: [{ 
        url: titleImageUrl,
        width: 1200,
        height: 630,
        alt: article.seo?.openGraph?.title || article.title 
      }],
      url: article.seo?.openGraph?.url || articleUrl,
      type: 'article',
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: article.seo?.twitter?.card || 'summary_large_image',
      title: article.seo?.twitter?.title || article.title,
      description: article.seo?.twitter?.description || article.smallDescription || article.title,
      images: [titleImageUrl],
      site: article.seo?.twitter?.site,
      creator: article.seo?.twitter?.creator,
    },
    robots: {
      index: !article.seo?.robots?.noIndex,
      follow: !article.seo?.robots?.noFollow,
    },
    alternates: {
      canonical: article.seo?.canonicalUrl || articleUrl,
    },
  };
}

async function getData(slug: string): Promise<Article | null> {
  const query = `
    *[_type == "news" && slug.current == $slug] {
        "currentSlug": slug.current,
        _id,
        title,
        smallDescription,
        content,
        titleImage,
        headImage,
        research,
        conclusion,
        contentImage,
        publishedAt,
        "categoryName": category->name,
        "author": author->{
          name,
          avatar
        },
        "keyPoints": keyPoints[]{
          _key,
          point,
          description
        },
        // SEO Fields
        seo {
          title,
          description,
          keywords,
          canonicalUrl,
          openGraph {
            title,
            description,
            url,
            image,
            siteName,
            type
          },
          twitter {
            card,
            site,
            creator,
            title,
            description,
            image
          },
          robots {
            noIndex,
            noFollow
          },
          metaAttributes[] {
            key,
            value
          }
        }
      }[0]`;

  const data = await client.fetch(query, { slug });
  return data;
}

export const revalidate = 30;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getData(slug);

  if (!article) notFound();

  return <ArticlePage article={article} />;
}

export async function generateStaticParams() {
  const articles = await client.fetch(`
    *[_type == "news"] {
      "slug": slug.current
    }
  `);

  return articles.map((article: { slug: string }) => ({
    slug: article.slug,
  }));
}