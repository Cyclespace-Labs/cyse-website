import { fullNews, Article } from "@/lib/interface";
import { client, urlFor } from "@/sanity/lib/client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Badge } from '@/components/ui/badge';
import { BackButton } from '@/components/ui/backButton';

import ResearchDisplay from "@/components/news/research-display";
import RelatedNews from "@/components/news/latest-news";
import VideoDisplay from "@/components/news/video-display";
import ResearchHub from "@/components/news/research-hub";
import Newsletters from "@/components/news/newsletters";
import PriceWidget from "@/components/news/price-widget";
import TokenTicker from "@/components/TokenTicker";
import { formatDate } from "@/lib/date-utils";

import { KeyPoints } from "@/components/news/KeyPoints";
import { portableTextComponents } from "@/components/news/PortableTextComponents";
import SEOHead from "@/components/news/SEOHead";
import Header from "@/components/layout/Header";
import { notFound } from 'next/navigation';
import Navbar from "@/components/news/navbar";

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
export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getData(slug);

  if (!article) notFound();

  // Use article as fullNews type for compatibility

    const data: fullNews = {
    currentSlug: article.slug?.current || slug, // Use article.slug.current or fallback to slug from params
    _id: article._id,
    title: article.title,
    smallDescription: article.smallDescription,
    content: article.content,
    titleImage: article.titleImage,
    headImage: article.headImage,
    research: article.research,
    conclusion: article.conclusion,
    contentImage: article.contentImage,
    publishedAt: article.publishedAt,
    categoryName: article.categoryName,
    category: null, // You might need to fetch this if needed
    impacts: [], // You might need to fetch this if needed
    tags: [], // You might need to fetch this if needed
    author: article.author ?? null,
    keyPoints: article.keyPoints,
    seo: article.seo // Add seo to fullNews
  };

  return (
    <>
      {/* SEO Head component */}
      <SEOHead 
        seo={article.seo} 
        siteUrl={process.env.NEXT_PUBLIC_SITE_URL}
        defaultImage={article.titleImage ? urlFor(article.titleImage).url() : undefined}
        title={article.title}
        description={article.smallDescription}
        publishedAt={article.publishedAt}
      />

      {/* nav */}
      <div>
        <Navbar />
      </div>
      
      <div className="bg-white dark:bg-black min-h-screen">
        {/* Token Ticker */}
        <div className="w-full flex justify-center items-center py-2 px-2 sm:px-4 lg:px-6">
          <TokenTicker speed={40} />
        </div>

        <div className="flex flex-col lg:flex-row justify-center mt-1 lg:mt-0 pb-1 gap-2 w-full px-2 sm:px-4 lg:px-6">
          {/* Left-Section - Stacked Widgets */}
          <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-2 min-h-[300px] lg:min-h-0 order-2 lg:order-1">
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
              <PriceWidget/>
            </div>
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden flex-1">
              <RelatedNews/>
            </div>
          </div>

          {/* Middle-Section - Article Content */}
          <div className="w-full lg:flex-1 flex-col lg:px-2 flex-1 order-1 lg:order-2">
            <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
              <div className="w-full h-full overflow-y-auto">
                <div className="w-full px-4 sm:px-8 mt-4">
                  <BackButton />
                </div>
                <div className="w-full flex flex-col lg:px-10 md:px-10 sm:px-6 pb-8">
                  <div className="w-full">
                    <div className="mt-6 px-4 sm:px-8 flex justify-between items-center">
                      <h1 className="flex gap-1 font-semibold text-lg">
                        <span className="font-bold text-primary dark:text-secondary">Todays</span>
                        <span>Headlines</span>
                      </h1>
                      <Badge className="bg-primary/10 dark:bg-secondary/20 text-primary dark:text-secondary border border-primary dark:border-secondary text-xs">
                        {data.categoryName}
                      </Badge>
                    </div>
                    <h1 className="mt-4 px-4 sm:px-8 text-xl sm:text-2xl font-semibold">
                      {article.title}
                    </h1>
                    
                    {/* Title Image - Conditional */}
                    {data.titleImage && (
                      <div className="w-full px-4 sm:px-8 mt-6 flex justify-center">
                        <Image
                          src={urlFor(data.titleImage).url()}
                          width={1000}
                          height={500}
                          alt={article.seo?.openGraph?.title || article.title}
                          quality={100}
                          priority
                          className="rounded-lg border w-full max-w-4xl"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 max-w-6xl px-4 sm:px-8 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {data.author?.avatar && (
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={urlFor(data.author.avatar).url()}
                            width={32}
                            height={32}
                            quality={100}
                            alt={data.author.name || 'Author'}
                            className="w-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {data.author?.name || 'Anonymous'}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {formatDate(data.publishedAt, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {data.keyPoints && data.keyPoints.length > 0 && (
                    <div className="px-4 sm:px-8 w-full mt-8">
                      <KeyPoints 
                        points={data.keyPoints} 
                        title="Key Takeaways"
                        className="max-w-6xl mx-auto text-sm text-black dark:text-white"
                      />
                    </div>
                  )}

                  {data.content && (
                    <article className="sm:mt-8 mt-6 mb-8 px-4 sm:px-8 max-w-6xl mx-auto text-sm">
                      <div className="prose-content">
                        <PortableText 
                          value={data.content} 
                          components={portableTextComponents}
                        />
                      </div>
                    </article>
                  )}

                  {/* Head Image - Conditional */}
                  {data.headImage && (
                    <div className="w-full px-4 sm:px-8 mt-6 flex justify-center">
                      <Image
                        src={urlFor(data.headImage).url()}
                        width={1000}
                        height={400}
                        quality={100}
                        alt="Head Image"
                        priority
                        className="rounded-lg border w-full max-w-4xl"
                      />
                    </div>
                  )}

                  {data.research && (
                    <article className="mt-8 mb-8 px-4 sm:px-8 max-w-6xl mx-auto">
                      <div className="mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                          <span className="text-primary dark:text-secondary">📊</span>
                          Deep Dive Analysis
                        </h2>
                      </div>
                      <div className="prose-content text-sm">
                        <PortableText 
                          value={data.research} 
                          components={portableTextComponents}
                        />
                      </div>
                    </article>
                  )}

                  {/* Content Image - Conditional */}
                  {data.contentImage && (
                    <div className="w-full px-4 sm:px-8 mt-6 flex justify-center">
                      <Image
                        src={urlFor(data.contentImage).url()}
                        width={1000}
                        height={400}
                        alt="Content Image"
                        priority
                        className="rounded-lg border w-full max-w-4xl"
                      />
                    </div>
                  )}

                  {data.conclusion && (
                    <article className="mt-8 mb-12 px-4 sm:px-8 max-w-6xl mx-auto">
                      <div className="mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                          <span className="text-primary dark:text-secondary">📊</span>
                          Conclusion
                        </h2>
                      </div>
                      <div className="prose-content text-sm">
                        <PortableText 
                          value={data.conclusion} 
                          components={portableTextComponents}
                        />
                      </div>
                    </article>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right-Section - Stacked Widgets */}
          <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-2 min-h-[300px] lg:min-h-0 order-3 lg:order-3">
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
              <VideoDisplay/>
            </div>
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
              <ResearchHub/>
            </div>
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
              <Newsletters/>
            </div>
            <div className='hidden lg:block border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden'>
              <ResearchDisplay/>
            </div>
            {/* Mobile: Show RelatedNews */}
            <div className="lg:hidden border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
              <RelatedNews/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Generate static paths
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