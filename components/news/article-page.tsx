import { fullNews, Article } from "@/lib/interface";
import { urlFor } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Badge } from '@/components/ui/badge';
import { BackButton } from '@/components/ui/backButton';
import ResearchDisplay from "./research-display";
import RelatedNews from "./latest-news";
import VideoDisplay from "./video-display";
import ResearchHub from "./research-hub";
import Newsletters from "./newsletters";
import PriceWidget from "./price-widget";
import TokenTicker from "@/components/TokenTicker";
import { formatDate } from "@/lib/date-utils";
import { KeyPoints } from "./KeyPoints";
import { portableTextComponents } from "./PortableTextComponents";
import SEOHead from "./SEOHead";
import Navbar from "./navbar";

interface ArticlePageProps {
  article: Article;
}

export default function ArticlePage({ article }: ArticlePageProps) {
  const data: fullNews = {
    currentSlug: article.slug?.current || article.currentSlug || "",
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
    category: null,
    impacts: [],
    tags: [],
    author: article.author ?? null,
    keyPoints: article.keyPoints,
    seo: article.seo,
  };

  return (
    <>
      <SEOHead
        seo={article.seo}
        siteUrl={process.env.NEXT_PUBLIC_SITE_URL}
        defaultImage={article.titleImage ? urlFor(article.titleImage).url() : undefined}
        title={article.title}
        description={article.smallDescription}
        publishedAt={article.publishedAt}
      />

      <div>
        <Navbar />
      </div>

      <div className="bg-slate-100 dark:bg-black min-h-screen">
        <div className="w-full flex justify-center items-center py-2 px-2 sm:px-4 lg:px-6">
          <TokenTicker speed={40} />
        </div>

        <div className="flex flex-col lg:flex-row justify-center mt-1 lg:mt-0 pb-1 gap-2 w-full px-2 sm:px-4 lg:px-6">
          <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-2 min-h-[300px] lg:min-h-0 order-2 lg:order-1">
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
              <PriceWidget/>
            </div>
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden flex-1">
              <RelatedNews/>
            </div>
          </div>

          <div className="w-full lg:flex-1 flex-col lg:px-2 flex-1 order-1 lg:order-2">
            <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
              <div className="w-full h-full overflow-y-auto">
                <div className="w-full px-4 sm:px-10 mt-6">
                  <BackButton />
                </div>
                <div className="w-full flex flex-col sm:px-18 px-6 pb-8">
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
                    <h1 className="mt-4 px-4 sm:px-8 text-xl sm:text-3xl font-semibold">
                      {article.title}
                    </h1>

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
                        className="max-w-6xl mx-auto text-xs text-black dark:text-white"
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
                          Deep Dive Analysis
                        </h2>
                      </div>
                      <div className="prose-content text-xs">
                        <PortableText
                          value={data.research}
                          components={portableTextComponents}
                        />
                      </div>
                    </article>
                  )}

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
            <div className="lg:hidden border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
              <RelatedNews/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
