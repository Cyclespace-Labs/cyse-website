import { Metadata } from "next";
import Navbar from "@/components/news/navbar";
import TokenDisplay from "@/components/news/tokenDisplay";

const VALID_TOPICS = ["beginners", "guides", "tutorials", "glossary"] as const;
type Topic = typeof VALID_TOPICS[number];

function normalizeTopic(topic: string): Topic {
  const normalized = topic.toLowerCase();
  if (VALID_TOPICS.includes(normalized as Topic)) {
    return normalized as Topic;
  }
  return "beginners" as Topic;
}

export async function generateStaticParams() {
  return VALID_TOPICS.map((topic) => ({
    topic,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const normalized = normalizeTopic(topic);
  
  return {
    title: `${normalized.charAt(0).toUpperCase() + normalized.slice(1)} | Learn | Cyclespace`,
    description: `Learn about ${normalized} with Cyclespace educational resources`,
  };
}

export default async function LearnTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const normalized = normalizeTopic(topic);
  
  if (!VALID_TOPICS.includes(normalized as Topic)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Learn topic not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <TokenDisplay />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          {normalized.charAt(0).toUpperCase() + normalized.slice(1)}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Learn about {normalized} with our comprehensive resources.
        </p>
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-8 border border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400">
            Educational content for {normalized} will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}
