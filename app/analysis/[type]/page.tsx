import { Metadata } from "next";
import Navbar from "@/components/news/navbar";
import TokenDisplay from "@/components/news/tokenDisplay";

const VALID_TYPES = ["market", "technical", "on-chain", "sentiment"] as const;
type Type = typeof VALID_TYPES[number];

function normalizeType(type: string): Type {
  const normalized = type.toLowerCase();
  if (VALID_TYPES.includes(normalized as Type)) {
    return normalized as Type;
  }
  return "market" as Type;
}

export async function generateStaticParams() {
  return VALID_TYPES.map((type) => ({
    type,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const normalized = normalizeType(type);
  
  return {
    title: `${normalized.charAt(0).toUpperCase() + normalized.slice(1)} Analysis | Cyclespace`,
    description: `Explore ${normalized} analysis and insights from Cyclespace`,
  };
}

export default async function AnalysisTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const normalized = normalizeType(type);
  
  if (!VALID_TYPES.includes(normalized as Type)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Analysis type not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <TokenDisplay />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          {normalized.charAt(0).toUpperCase() + normalized.slice(1)} Analysis
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Explore our latest {normalized} analysis and insights.
        </p>
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-8 border border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400">
            Analysis content for {normalized} will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}
