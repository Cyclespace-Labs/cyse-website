import { client, urlFor } from "@/sanity/lib/client";
import { simpleNewsCard } from "@/lib/interface";
import Navbar from "@/components/news/navbar";
import TokenTicker from "@/components/TokenTicker";
import LatestNews from "@/components/news/latest-news";
import ResearchHub from "@/components/news/research-hub";
import Newsletters from "@/components/news/newsletters";
import ResearchDisplay from "@/components/news/research-display";
import PriceWidget from "@/components/news/price-widget";
import PressReleases from "@/components/news/press-releases";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getArticleUrl } from "@/lib/article-url";
import { notFound } from "next/navigation";

const VALID_CATEGORIES = ["markets", "finance", "tech", "policy", "press-release", "web3", "opinion", "learn", "news-analysis", "layer-2", "indices", "daybook", "sponsored"];

function normalizeCategory(category: string): string {
  return category.toLowerCase().trim();
}

function formatCategoryTitle(category: string): string {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function getCategoryNews(category: string): Promise<simpleNewsCard[]> {
  const query = `
    *[_type == 'news' && defined(category) && category->slug.current == $category] | order(publishedAt desc) {
      title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      publishedAt,
      "categoryName": category->name,
      category,
      "tags": tags[]->{
        name,
        color
      },
      "impacts": impacts[]->{
        name,
        color
      },
      "author": author->{
        name,
        avatar,
        role
      }
    }
  `;

  const data = await client.fetch(query, { category: normalizeCategory(category) });
  return data;
}

export const revalidate = 30;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const normalized = normalizeCategory(category);
  const data = await getCategoryNews(normalized);

  const mockArticles: simpleNewsCard[] =
    !data || data.length === 0
      ? Array.from({ length: 7 }).map((_, i) => ({
          title:
            i === 0
              ? `Bitcoin Faces $80,000 Resistance as Derivatives Show Signs of Risk Aversion`
              : i === 1
                ? `XRP Hits FOMO Zone as Rakuten Pay Partnership Drives Social Chatter to Greed Levels`
                : i === 2
                  ? `Dogecoin Zooms 10%, Breaking Away From Bitcoin as Open Interest Hits Yearly Peak`
                  : i === 3
                    ? `The Green Beret Was Just the Start: New Data Suggests Military Insider Trading Crisis on Polymarket`
                    : i === 4
                      ? `From Cathie Wood to Cantor Fitzgerald, the Big Money Is Betting That Robinhood's Crypto Slump Is Just a Temporary Speed Bump`
                      : i === 5
                        ? `Trump-Backed World Liberty Financial Races Toward $2 Billion Token Unlock With Near-Unanimous Vote`
                        : `Ouch. The U.S. 30-Year Treasury Yield Just Hit 5% and Bitcoin May Pay the Price`,
          smallDescription:
            `This is placeholder content for layout preview. Article descriptions will appear here once real content is published in the ${formatCategoryTitle(normalized)} category.`,
          currentSlug: `preview-article-${i + 1}`,
          titleImage: null,
          publishedAt: new Date(Date.now() - i * 3600000 * 3).toISOString(),
          categoryName: formatCategoryTitle(normalized),
          category: null,
          impacts: [],
          tags: [],
          author: null,
        }))
      : data;

  const articles = mockArticles;
  const featured = articles[0];
  const sidebar = articles.slice(1, 4);
  const moreNews = articles.slice(4, 10);

  return (
    <div className="w-full min-h-screen dark:bg-black bg-zinc-100 flex flex-col">
      <Navbar />
      <div className="w-full flex justify-center items-center py-1">
        <TokenTicker speed={40} />
      </div>

      <div className="flex flex-col lg:flex-row justify-center mt-1 lg:mt-0 pb-1 gap-1 w-full px-2 sm:px-4 lg:px-3 flex-1">
        {/* Left sidebar */}
        <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-2 min-h-[300px] lg:min-h-0 order-2 lg:order-1">
          <div className="hidden lg:block border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
            <PriceWidget />
          </div>
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
            <LatestNews />
          </div>
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
            <PressReleases />
          </div>
        </div>

        {/* Main content */}
        <div className="w-full lg:flex-1 flex-col lg:px-2 flex-1 order-1 lg:order-2">
          {/* Category label */}
          <div className="mb-3 px-1">
            <h1 className="text-xs font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 border-b border-zinc-300 dark:border-zinc-700 pb-1">
              {formatCategoryTitle(normalized)}
            </h1>
          </div>

          {/* Hero + sidebar layout like CoinDesk */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Hero article */}
            <div className="w-full lg:w-[58%] flex flex-col">
              <Link href={getArticleUrl(featured)} className="block mb-3">
                <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-800">
                  {featured.titleImage ? (
                    <Image
                      src={urlFor(featured.titleImage).url()}
                      alt={featured.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 dark:text-zinc-600 text-xs">
                      Image placeholder
                    </div>
                  )}
                </div>
              </Link>
              <Link href={getArticleUrl(featured)} className="group">
                <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold leading-tight text-zinc-900 dark:text-zinc-100 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                  {featured.title}
                </h2>
              </Link>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                {featured.smallDescription}
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                {featured.author?.name && <span>{featured.author.name}</span>}
                {featured.author?.name && <span>•</span>}
                <span>{new Date(featured.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Right sidebar articles */}
            <div className="w-full lg:w-[42%] flex flex-col gap-3 lg:pl-4 lg:border-l border-zinc-200 dark:border-zinc-800">
              {sidebar.map((post, idx) => (
                <div key={post.currentSlug} className={`flex gap-3 ${idx < sidebar.length - 1 ? 'pb-3 border-b border-zinc-200 dark:border-zinc-800' : ''}`}>
                  <Link href={getArticleUrl(post)} className="shrink-0">
                    <div className="relative w-24 h-16 sm:w-28 sm:h-[72px] overflow-hidden rounded-md bg-zinc-200 dark:bg-zinc-800">
                      {post.titleImage ? (
                        <Image
                          src={urlFor(post.titleImage).url()}
                          alt={post.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="112px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-400 dark:text-zinc-600">
                          IMG
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="flex flex-col justify-center min-w-0">
                    <Link href={getArticleUrl(post)} className="group">
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 hidden sm:block">
                      {post.smallDescription}
                    </p>
                    <span className="mt-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* More news grid */}
          {moreNews.length > 0 && (
            <div className="mt-2">
              <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 border-b border-zinc-300 dark:border-zinc-700 pb-1 mb-3">
                More in {formatCategoryTitle(normalized)}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {moreNews.map((post) => (
                  <div key={post.currentSlug} className="flex flex-col">
                    <Link href={getArticleUrl(post)} className="block mb-2">
                      <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-800">
                        {post.titleImage ? (
                          <Image
                            src={urlFor(post.titleImage).url()}
                            alt={post.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-600">
                            Image placeholder
                          </div>
                        )}
                      </div>
                    </Link>
                    <Link href={getArticleUrl(post)} className="group">
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </Link>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                      {post.smallDescription}
                    </p>
                    <span className="mt-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-2 min-h-[300px] lg:min-h-0 order-3 lg:order-3">
          <div className="hidden lg:block border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <ResearchHub />
          </div>
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <Newsletters />
          </div>
          <div className="hidden lg:block border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <ResearchDisplay />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const normalized = normalizeCategory(category);
  const title = formatCategoryTitle(normalized);
  return {
    title: `${title} News | Cyclespace`,
    description: `Latest ${title.toLowerCase()} news and analysis from Cyclespace.`,
  };
}
