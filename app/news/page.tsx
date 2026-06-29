import NewsSection from "@/components/news/news-section";
import RelatedNews from "@/components/news/latest-news";
import ResearchHub from "@/components/news/research-hub";
import Newsletters from "@/components/news/newsletters";
import PressReleases from "@/components/news/press-releases";
import PriceWidget from "@/components/news/price-widget";
import TokenTicker from "@/components/TokenTicker";
import { simpleNewsCard } from "@/lib/interface";
import Navbar from "@/components/news/navbar";
import LatestNews from "@/components/news/latest-news";
import ExploreSection from "@/components/news/explore-section";
import Footer from "@/components/layout/Footer";
import CategoriesSection from "@/components/news/categories-section";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(): Promise<simpleNewsCard[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/news`, {
    next: { revalidate: 30 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch news data');
  }

  return res.json();
}

export default async function News() {
  const data: simpleNewsCard[] = await getData();

  console.log(data);

  return (
    <div className="w-full min-h-screen dark:bg-black bg-slate-100 flex gap-1 flex-col">

      {/* nav */}
      <div className="w-full sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="px-6 overflow-hidden">
        <TokenTicker />
      </div>

      {/* Main content with reordered sections for mobile */}
      <div className="flex flex-col lg:flex-row justify-center mt-1 lg:mt-0 pb-1 gap-1 w-full px-1 sm:px-6 flex-1">

        {/* Left-Section - Stacked Widgets (order-2 on mobile, order-1 on desktop) */}
        <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-2 order-2 lg:order-1">
          {/* Price Widget */}
          <div className="hidden border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            <PriceWidget />
          </div>
          {/* Latest News List */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            <LatestNews />
          </div>
          {/* Press Releases */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            <PressReleases />
          </div>
        </div>

        {/* Middle-Section - Main News (order-1 on mobile, order-2 on desktop) */}
        <div className="w-full lg:flex-1 flex-col px-0 lg:px-2 flex-1 order-1 lg:order-2">
          <NewsSection data={data} />
        </div>

        {/* Right-Section - Stacked Widgets (order-3 always) */}
        <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-2 order-3 lg:order-3">
          {/* Research Hub */}
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <ResearchHub />
          </div>
          {/* Newsletters */}
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <Newsletters />
          </div>
          {/* Mobile: Show RelatedNews */}
          <div className="lg:hidden border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <RelatedNews />
          </div>
        </div>
      </div>

      {/* Additional sections (hidden/disabled) */}
      <div className="py-2 px-6 hidden">
        <div className="hidden">
          <ExploreSection />
        </div>
        <div>
          <CategoriesSection data={data} />
        </div>
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
}