import { Article } from "@/lib/interface";
import { urlFor } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
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
import PressReleases from "./press-releases";
import LatestNews from "./latest-news";

interface ArticlePageProps {
  article: Article;
}

export default function ArticlePage({ article }: ArticlePageProps) {
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

      {/* nav */}
      <div className="w-full sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="bg-zinc-100 dark:bg-black min-h-screen">
        <div className="w-full flex justify-center items-center py-2 px-2 sm:px-4 lg:px-6">
          <TokenTicker speed={40} />
        </div>

        <div className="flex flex-col lg:flex-row justify-center mt-1 lg:mt-0 pb-4 gap-2 w-full px-2 sm:px-4 lg:px-6">
          {/* Left sidebar */}
        {/*Left-Section - Stacked Widgets */}
        <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-2 min-h-[300px] lg:min-h-0 order-2 lg:order-1 lg:sticky lg:top-16 lg:self-start">
          {/* Latest News List */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden ">
            <LatestNews/>
          </div>
          {/* Press Releases */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            <PressReleases/>
          </div>
        </div>
          {/* Center article */}
          <div className="w-full lg:flex-1 order-1 lg:order-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg">
            <div className="w-full  overflow-hidden max-w-5xl mx-auto w-full px-4 sm:px-6 py-4 ">
              <div className="w-full px-5 sm:px-10 pt-6 pb-1">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-secondary transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to News
                </Link>
              </div>

              <div className="px-5 sm:px-10 pb-10">
                {/* Header */}
                <header className="mt-5 mb-6">
                  {article.categoryName && (
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5 font-medium mb-3">
                      {article.categoryName}
                    </Badge>
                  )}

                  <h1 className="text-xl sm:text-3xl font-bold text-zinc-900 dark:text-white leading-tight tracking-tight mb-3">
                    {article.title}
                  </h1>

                  {article.smallDescription && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                      {article.smallDescription}
                    </p>
                  )}

                  <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                    {article.author && (
                      <span className="flex items-center gap-1.5">
                        {article.author.avatar ? (
                          <Image
                            src={urlFor(article.author.avatar).width(24).height(24).url()}
                            width={20}
                            height={20}
                            alt={article.author.name || 'Author'}
                            className="rounded-full"
                          />
                        ) : (
                          <User className="w-3.5 h-3.5" />
                        )}
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">
                          {article.author.name}
                        </span>
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(article.publishedAt, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </header>

                {/* Title Image */}
                {article.titleImage && (
                  <figure className="mb-8">
                    <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                      <Image
                        src={urlFor(article.titleImage).url()}
                        width={1000}
                        height={520}
                        alt={article.seo?.openGraph?.title || article.title}
                        quality={90}
                        priority
                        className="w-full h-auto"
                      />
                    </div>
                  </figure>
                )}

                {/* Key Points */}
                {article.keyPoints && article.keyPoints.length > 0 && (
                  <KeyPoints points={article.keyPoints} />
                )}

                {/* Main Content */}
                {article.content && (
                  <article className="mt-6">
                    <PortableText
                      value={article.content}
                      components={portableTextComponents}
                    />
                  </article>
                )}

                {/* Head Image */}
                {article.headImage && (
                  <figure className="my-8">
                    <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                      <Image
                        src={urlFor(article.headImage).url()}
                        width={1000}
                        height={400}
                        quality={90}
                        alt="Article illustration"
                        className="w-full h-auto"
                      />
                    </div>
                  </figure>
                )}

                {/* Research / Deep Dive */}
                {article.research && (
                  <section className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight mb-4">
                      Deep Dive Analysis
                    </h2>
                    <PortableText
                      value={article.research}
                      components={portableTextComponents}
                    />
                  </section>
                )}

                {/* Content Image */}
                {article.contentImage && (
                  <figure className="my-8">
                    <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                      <Image
                        src={urlFor(article.contentImage).url()}
                        width={1000}
                        height={400}
                        alt="Supporting illustration"
                        quality={90}
                        className="w-full h-auto"
                      />
                    </div>
                  </figure>
                )}

                {/* Conclusion */}
                {article.conclusion && (
                  <section className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight mb-4">
                      Conclusion
                    </h2>
                    <PortableText
                      value={article.conclusion}
                      components={portableTextComponents}
                    />
                  </section>
                )}
              </div>
            </div>
          </div>

          {/*Right-Section - Stacked Widgets */}
          <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-2 min-h-[300px] lg:min-h-0 order-3 lg:order-3 lg:sticky lg:top-16 lg:self-start">
            {/* Research Hub */}
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
              <ResearchHub/>
            </div>
            {/* Newsletters */}
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
              <Newsletters/>
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
