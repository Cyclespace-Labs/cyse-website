import { Metadata } from "next";
import Navbar from "@/components/news/navbar";
import TokenDisplay from "@/components/news/tokenDisplay";

const VALID_CATEGORIES = ["upcoming", "past", "webinars", "conferences"] as const;
type Category = typeof VALID_CATEGORIES[number];

function normalizeCategory(category: string): Category {
  const normalized = category.toLowerCase();
  if (VALID_CATEGORIES.includes(normalized as Category)) {
    return normalized as Category;
  }
  return "upcoming" as Category;
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const normalized = normalizeCategory(category);
  
  return {
    title: `${normalized.charAt(0).toUpperCase() + normalized.slice(1)} Events | Cyclespace`,
    description: `Explore ${normalized} events from Cyclespace`,
  };
}

export default async function EventsCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const normalized = normalizeCategory(category);
  
  if (!VALID_CATEGORIES.includes(normalized as Category)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Event category not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <TokenDisplay />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          {normalized.charAt(0).toUpperCase() + normalized.slice(1)} Events
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Explore our {normalized} events and activities.
        </p>
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-8 border border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400">
            Events content for {normalized} will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}
