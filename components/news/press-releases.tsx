'use client';

import { ArrowRight, Megaphone, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PressRelease {
  _id: string;
  title: string;
  company: string;
  publishedAt: string;
  currentSlug: string;
}

function getRelativeTime(date: string): string {
  const now = new Date();
  const published = new Date(date);
  const diff = now.getTime() - published.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return published.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function PressReleases() {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPressReleases() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/news/press-releases`, {
          next: { revalidate: 30 }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch press releases');
        }

        const data = await res.json();
        setPressReleases(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchPressReleases();
  }, []);

  return (
    <div className='flex flex-col h-full w-full bg-white dark:bg-slate-950'>
      {/* Header */}
      <header className='flex flex-row gap-1 items-center justify-between px-3 py-3 border-b border-slate-200 dark:border-slate-800'>
        <h1 className='font-semibold text-sm flex flex-row gap-2 items-center'> 
          <Megaphone className="w-4 h-4 text-primary hidden" />
          <span>Press Releases</span>
        </h1>
        <Link href="/news?category=press-releases" className='text-xs text-slate-500 hover:text-primary dark:hover:text-secondary transition-colors flex items-center gap-1'>
          See all <ArrowRight className="w-3 h-3" />
        </Link>
      </header>

      {/* Content */}
      <div className="flex flex-col flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <AlertCircle className="w-5 h-5 text-red-500 mb-2" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Failed to load press releases</p>
          </div>
        ) : pressReleases.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <Megaphone className="w-5 h-5 text-slate-400 mb-2" />
            <p className="text-xs text-slate-500 dark:text-slate-400">No press releases available</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {pressReleases.map((item) => (
              <Link
                key={item._id}
                href={`/news/${item.currentSlug}`}
                className='group flex items-start gap-2 px-3 py-3 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors'
              >
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 mb-1'>
                    <span className='text-[10px] text-slate-400 dark:text-slate-500'>{getRelativeTime(item.publishedAt)}</span>
                  </div>
                  <h4 className="text-xs font-medium text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                    {item.company}
                    <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
