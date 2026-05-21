'use client';

import { ArrowRight, Mail, Sparkles, Loader2, AlertCircle, Newspaper, TrendingUp, Zap, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface NewsletterItem {
  _id: string;
  title: string;
  description: string;
  frequency: string;
  issueNumber?: number;
  currentSlug: string;
}

const frequencyConfig: Record<string, { icon: any; color: string; emoji: string }> = {
  daily: { icon: Newspaper, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', emoji: '📰' },
  weekly: { icon: TrendingUp, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', emoji: '📊' },
  'bi-weekly': { icon: Calendar, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', emoji: '📅' },
  monthly: { icon: Newspaper, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300', emoji: '🗓️' },
  special: { icon: Sparkles, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300', emoji: '✨' },
};

export default function Newsletters() {
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNewsletters() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/newsletters`, {
          next: { revalidate: 30 }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch newsletters');
        }

        const data = await res.json();
        setNewsletters(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchNewsletters();
  }, []);

  return (
    <div className='flex flex-col h-full w-full bg-white dark:bg-slate-950'>
      {/* Header */}
      <header className='flex flex-row gap-1 items-center justify-between px-3 py-3 border-b border-zinc-200 dark:border-zinc-800'>
        <h1 className='font-semibold text-sm flex flex-row gap-2 items-center'> 
          <Mail className="w-4 h-4 text-zinc-500 hidden" />
          <span className='tracking-tight'>Newsletters</span>
        </h1>
        <Link href="/newsletters" className='text-xs font-medium tracking-tight text-zinc-500 hover:text-primary dark:hover:text-secondary transition-colors flex items-center gap-1'>
          See all <ArrowRight className="w-3 h-3" />
        </Link>
      </header>

      {/* Content */}
      <div className="flex flex-col flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-8 max-h-100 h-100">
            <Loader2 className="w-5 h-5 text-zinc-400 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center max-h-100 h-100">
            <AlertCircle className="w-5 h-5 text-red-500 mb-2" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Failed to load newsletters</p>
          </div>
        ) : newsletters.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center max-h-100 h-100">
            <Mail className="w-5 h-5 text-zinc-400 mb-2" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">No newsletters available</p>
          </div>
        ) : (
          <>
            {/* Newsletter List */}
            <div className="flex flex-col p-3 gap-2">
              {newsletters.map((item) => {
                const config = frequencyConfig[item.frequency] || frequencyConfig.special;
                const Icon = config.icon;
                
                return (
                  <Link
                    key={item._id}
                    href={`/newsletters/${item.currentSlug}`}
                    className='group flex items-start gap-3 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer'
                  >
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg ${config.color}`}>
                      {config.emoji}
                    </div>
                    
                    <div className='flex-1 min-w-0'>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {item.title}
                        </h4>
                        {item.issueNumber && (
                          <span className="text-[9px] text-zinc-400 dark:text-zinc-500">#{item.issueNumber}</span>
                        )}
                      </div>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Subscribe CTA */}
            <div className="px-3 pb-3">
              <Button 
                variant="outline" 
                size="sm" 
                className='w-full text-xs h-8 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600'
              >
                <Sparkles className="w-3 h-3 mr-1.5" />
                Subscribe to All
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
