import { Metadata } from "next";
import Navbar from "@/components/news/navbar";
import TokenDisplay from "@/components/news/tokenDisplay";

const VALID_TOPICS = ["crypto", "deFi", "nft", "web3"] as const;
type Topic = typeof VALID_TOPICS[number];

function normalizeTopic(topic: string): Topic {
  const normalized = topic.toLowerCase();
  if (VALID_TOPICS.includes(normalized as Topic)) {
    return normalized as Topic;
  }
  return "crypto" as Topic; // Default fallback
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
    title: `${normalized.charAt(0).toUpperCase() + normalized.slice(1)} Research | Cyclespace`,
    description: `Explore ${normalized} research and insights from Cyclespace`,
  };
}

export default async function ResearchTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const normalized = normalizeTopic(topic);
  
  if (!VALID_TOPICS.includes(normalized as Topic)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Topic not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <TokenDisplay />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          {normalized.charAt(0).toUpperCase() + normalized.slice(1)} Research
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Explore our latest research and insights on {normalized}.
        </p>
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-8 border border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400">
            Research content for {normalized} will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}
