import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { Mail, Calendar, Hash, Newspaper, TrendingUp, CalendarRange, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/date-utils";
import Navbar from "@/components/news/navbar";
import Footer from "@/components/layout/Footer";
import TokenTicker from "@/components/TokenTicker";

export const revalidate = 30;

interface NewsletterItem {
  _id: string;
  title: string;
  description?: string;
  currentSlug: string;
  publishedAt: string;
  issueNumber?: number;
  frequency?: string;
}

const frequencyLabels: Record<string, string> = {
  daily: "Daily",
  weekly: "Weekly",
  "bi-weekly": "Bi-Weekly",
  monthly: "Monthly",
  special: "Special Edition",
};

const frequencyIcons: Record<string, typeof Newspaper> = {
  daily: Newspaper,
  weekly: TrendingUp,
  "bi-weekly": CalendarRange,
  monthly: Calendar,
  special: Sparkles,
};

async function getData(): Promise<NewsletterItem[]> {
  const query = `
    *[_type == 'newsletter'] | order(publishedAt desc) [0...50] {
      _id,
      title,
      description,
      "currentSlug": slug.current,
      publishedAt,
      issueNumber,
      frequency
    }
  `;
  return client.fetch(query);
}

export default async function NewslettersPage() {
  const newsletters = await getData();

  return (
    <div className="w-full min-h-screen bg-zinc-100 dark:bg-black flex flex-col">
      <div className="w-full sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="px-6 overflow-hidden">
        <TokenTicker />
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-widest">Digest</span>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Newsletters</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
            Curated crypto insights delivered to your inbox.
          </p>
        </div>

        {newsletters.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Mail className="w-10 h-10 text-zinc-300 dark:text-zinc-600 mb-4" />
            <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 mb-1">No newsletters yet</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {newsletters.map((item) => (
              <Link
                key={item._id}
                href={`/newsletters/${item.currentSlug}`}
                className="group flex flex-col bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
              >
                {/* Meta */}
                <div className="flex items-center gap-2 flex-wrap mb-3 text-[10px] text-zinc-500 dark:text-zinc-400">
                  {item.frequency && (() => {
                    const FreqIcon = frequencyIcons[item.frequency] || Mail;
                    return (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-normal gap-1">
                        <FreqIcon className="w-3 h-3" />
                        {frequencyLabels[item.frequency] || item.frequency}
                      </Badge>
                    );
                  })()}
                  {item.issueNumber && (
                    <span className="flex items-center gap-0.5">
                      <Hash className="w-3 h-3" />
                      {item.issueNumber}
                    </span>
                  )}
                  <span className="flex items-center gap-0.5 ml-auto">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.publishedAt)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white leading-snug group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-2 mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                {item.description && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
