import { fullNews, Article } from "@/lib/interface";
import { client, urlFor } from "@/sanity/lib/client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Badge } from '@/components/ui/badge';
import { BackButton } from '@/components/ui/backButton';

import ResearchDisplay from "@/components/news/research-display";
import RelatedNews from "@/components/news/related-news";
import { formatDate } from "@/lib/date-utils";

import * as ScrollArea from '@radix-ui/react-scroll-area';


import { notFound } from 'next/navigation';
import { KeyPoints } from "@/components/news/KeyPoints";
import { portableTextComponents } from "@/components/news/PortableTextComponents";
import SEOHead from "@/components/news/SEOHead";
import Header from "@/components/layout/Header";

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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cyclespace.exchange/News';
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
      
      <div className="bg-white dark:bg-black h-full">
        {/* Ticker */}
        <div className="w-full h-fit flex justify-center items-center py-1 px-1 md:py-1">
          <div className="border border-px dark:border-zinc-700 border-zinc-200 w-full">
            <Header />
          </div>
        </div>

        <div className="flex-col-reverse flex md:flex-row lg:flex-row justify-center sm:mt-1 gap-2 w-full">
          {/* Left-Section */}
          <div className="h-full w-[500px] hidden lg:block border border-zinc-300 dark:border-zinc-700">
            <RelatedNews />
          </div>

          {/* Middle-Section */}
          <div className="w-full h-full flex flex-col justify-center items-center mb-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700">
            <ScrollArea.Root className="h-[calc(100vh-171px)] w-full rounded-none" type="auto">
              <ScrollArea.Viewport className="w-full h-full">
                <div className="w-full px-4 sm:px-8 mt-6">
                  <BackButton />
                </div>
                <div className="w-full flex flex-col lg:px-10 md:px-10 sm:px-20">
                  <div className="w-full">
                    <div className="mt-8 px-8 flex justify-between items-center">
                      <h1 className="flex gap-1 font-semibold text-2xl">
                        <span className="font-bold text-primary dark:text-secondary">Todays</span>
                        <span>Headlines</span>
                      </h1>
                      <Badge className="bg-primary/10 dark:bg-secondary/20 text-primary dark:text-secondary border border-primary dark:border-secondary">
                        {data.categoryName}
                      </Badge>
                    </div>
                    <h1 className="mt-5 px-8 text-3xl font-semibold sm:text-4xl">
                      {article.title}
                    </h1>
                    
                    {/* Title Image - Conditional */}
                    {data.titleImage && (
                      <div className="w-full px-4 sm:px-0 mt-8 flex justify-center">
                        <Image
                          src={urlFor(data.titleImage).url()}
                          width={1000}
                          height={500}
                          alt={article.seo?.openGraph?.title || article.title}
                          quality={100}
                          priority
                          className="rounded-lg border"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-5 max-w-6xl px-3 sm:px-20 flex justify-between items-center">
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
                    <div className="px-5 w-full mt-12">
                      <KeyPoints 
                        points={data.keyPoints} 
                        title="Key Takeaways"
                        className="max-w-6xl mx-auto text-lg text-black dark:text-white"
                      />
                    </div>
                  )}

                  {data.content && (
                    <article className="sm:mt-16 mt-8 mb-12 px-5 sm:px-5 max-w-6xl mx-auto text-lg">
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
                    <div className="w-full px-4 sm:px-0 mt-8 flex justify-center">
                      <Image
                        src={urlFor(data.headImage).url()}
                        width={1000}
                        height={400}
                        quality={100}
                        alt="Head Image"
                        priority
                        className="rounded-lg border"
                      />
                    </div>
                  )}

                  {data.research && (
                    <article className="mt-16 mb-12 px-6 sm:px-20 max-w-6xl mx-auto">
                      <div className="mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                          <span className="text-primary dark:text-secondary">📊</span>
                          Deep Dive Analysis
                        </h2>
                      </div>
                      <div className="prose-content text-lg">
                        <PortableText 
                          value={data.research} 
                          components={portableTextComponents}
                        />
                      </div>
                    </article>
                  )}

                  {/* Content Image - Conditional */}
                  {data.contentImage && (
                    <div className="w-full px-4 sm:px-0 mt-8 flex justify-center">
                      <Image
                        src={urlFor(data.contentImage).url()}
                        width={1000}
                        height={400}
                        alt="Content Image"
                        priority
                        className="rounded-lg border"
                      />
                    </div>
                  )}

                  {data.conclusion && (
                    <article className="mt-16 mb-12 px-6 sm:px-20 max-w-6xl mx-auto">
                      <div className="mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                          <span className="text-primary dark:text-secondary">📊</span>
                          Conclusion
                        </h2>
                      </div>
                      <div className="prose-content text-lg">
                        <PortableText 
                          value={data.conclusion} 
                          components={portableTextComponents}
                        />
                      </div>
                    </article>
                  )}
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar 
                className="w-1.5 p-0.5 bg-zinc-100 hidden dark:bg-zinc-900 transition-colors duration-150 ease-out hover:bg-zinc-200 dark:hover:bg-zinc-800" 
                orientation="vertical"
              >
                <ScrollArea.Thumb className="flex-1 bg-zinc-300 hidden dark:bg-zinc-600 rounded-full relative" />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner />
            </ScrollArea.Root>
          </div>

          {/* Right-Section */}
          <div className="bg-white lg:block md:block hidden dark:bg-zinc-950 h-full w-[500px] border border-zinc-200 dark:border-zinc-700">
            <div className="hidden">
              <ResearchDisplay />
            </div>
            <div>

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