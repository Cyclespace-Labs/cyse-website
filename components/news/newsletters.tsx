import { ArrowRight, Mail, Newspaper, TrendingUp, Calendar, CalendarRange, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/date-utils';
import * as ScrollArea from '@radix-ui/react-scroll-area';

interface NewsletterItem {
  _id: string;
  title: string;
  description: string;
  frequency: string;
  issueNumber?: number;
  currentSlug: string;
  publishedAt: string;
}

const frequencyConfig: Record<string, { color: string; icon: typeof Newspaper; label: string }> = {
  daily:      { color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400', icon: Newspaper, label: 'Daily' },
  weekly:     { color: 'bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400', icon: TrendingUp, label: 'Weekly' },
  'bi-weekly':{ color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400', icon: CalendarRange, label: 'Bi-Weekly' },
  monthly:    { color: 'bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400', icon: Calendar, label: 'Monthly' },
  special:    { color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-950/50 dark:text-yellow-400', icon: Sparkles, label: 'Special' },
};

async function getData(): Promise<NewsletterItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/newsletters`, {
    next: { revalidate: 30 },
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function Newsletters() {
  const data = await getData();

  return (
    <div className='flex flex-col w-full bg-white dark:bg-slate-950'>
      {/* Header */}
      <header className='flex flex-row items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800'>
        <h1 className='font-semibold text-sm tracking-tight'>Newsletters</h1>
        <Link href="/newsletters" className='text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-secondary transition-colors flex items-center gap-1'>
          View all <ArrowRight className='h-3.5 w-3.5' />
        </Link>
      </header>

      {/* Content */}
      <ScrollArea.Root className="w-full" type="auto">
        <ScrollArea.Viewport className="w-full max-h-96">
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <Mail className="w-6 h-6 text-zinc-300 dark:text-zinc-600 mb-2" />
              <p className="text-xs text-zinc-500 dark:text-zinc-400">No newsletters available</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 p-3">
              {data.slice(0, 10).map((item) => {
                const config = frequencyConfig[item.frequency] || frequencyConfig.special;
                const Icon = config.icon;

                return (
                  <Link
                    key={item._id}
                    href={`/newsletters/${item.currentSlug}`}
                    className='group flex items-start gap-4 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:shadow-lg hover:ring-2 hover:ring-primary/50 dark:hover:ring-secondary transition-all duration-300 cursor-pointer'
                  >
                    {/* Frequency icon */}
                    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${config.color} shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Text Content */}
                    <div className='flex-1 min-w-0'>
                      <div className="mb-1">
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        {item.issueNumber && (
                          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 ml-2">
                            Issue #{item.issueNumber}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-1 mb-2">
                        {item.description}
                      </p>
                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800 mt-2">
                        <span className="flex items-center gap-1.5 font-medium">{config.label}</span>
                        <span>•</span>
                        <span>{formatDate(item.publishedAt, { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="w-1.5 p-0.5 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="bg-zinc-300 dark:bg-zinc-700 rounded-full" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </div>
  );
}
