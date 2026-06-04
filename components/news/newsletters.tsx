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
        <ScrollArea.Viewport className="w-full max-h-[380px]">
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
                    className='group flex items-start gap-3 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all'
                  >
                    {/* Frequency icon */}
                    <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${config.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Text */}
                    <div className='flex-1 min-w-0'>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100  group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                          {item.title}
                        </h4>
                        {item.issueNumber && (
                          <span className="text-[9px] font-medium text-zinc-400 dark:text-zinc-500 shrink-0">#{item.issueNumber}</span>
                        )}
                      </div>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[9px] text-zinc-400 dark:text-zinc-500">
                        <span>{config.label}</span>
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
