'use client';

import { ArrowRight, FileText, Building2, Loader2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ResearchItem {
  _id: string;
  title: string;
  authorName: string;
  authorType: string;
  reportType: string;
  titleImage?: any;
  currentSlug: string;
}

const reportTypeLabels: Record<string, string> = {
  quarterly: 'Quarterly Review',
  annual: 'Annual Report',
  market: 'Market Report',
  adoption: 'Adoption Index',
  exchange: 'Exchange Report',
  stablecoin: 'Stablecoin Report',
  tokenization: 'Tokenization Report',
  network: 'Network Report',
  regulatory: 'Regulatory Report',
  ecosystem: 'Ecosystem Report',
  whitepaper: 'Whitepaper',
  'case-study': 'Case Study',
  'deep-dive': 'Deep Dive',
};

export default function ResearchHub() {
  const [researchItems, setResearchItems] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResearch() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/research`, {
          next: { revalidate: 30 }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch research');
        }

        const data = await res.json();
        setResearchItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchResearch();
  }, []);

  return (
    <div className='flex flex-col h-full w-full bg-white dark:bg-slate-950'>
      {/* Yellow Banner Header */}
      <div className='bg-yellow-400 dark:bg-yellow-500 px-3 py-1'>
        <p className='text-[10px] font-semibold text-black uppercase tracking-wide'>
          Discover what&apos;s new in our Research Hub!
        </p>
      </div>

      {/* Header */}
      <header className='flex flex-row gap-1 items-center justify-between px-3 py-3 border-b border-zinc-200 dark:border-zinc-800'>
        <h1 className='font-semibold text-sm flex flex-row gap-2 items-center'> 
          <FileText className="w-4 h-4 text-zinc-500 hidden" />
          <span className='tracking-tight'>Research</span>
        </h1>
        <Link href="/research" className='text-xs font-medium tracking-tight text-zinc-500 hover:text-primary dark:hover:text-secondary transition-colors flex items-center gap-1'>
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
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Failed to load research</p>
          </div>
        ) : researchItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center max-h-100 h-100">
            <FileText className="w-5 h-5 text-zinc-400 mb-2" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">No research available</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {researchItems.map((item) => (
              <Link
                key={item._id}
                href={`/research/${item.currentSlug}`}
                className='group flex items-start gap-3 px-3 py-3 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors'
              >
                {/* Thumbnail */}
                <div className="relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden">
                  {item.titleImage ? (
                    <Image
                      src={item.titleImage}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200 dark:from-yellow-900/40 dark:via-orange-900/40 dark:to-pink-900/40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-yellow-700/50 dark:text-yellow-400/50" />
                      </div>
                    </>
                  )}
                </div>
                
                <div className='flex-1 min-w-0'>
                  <Badge variant="secondary" className='text-[9px] px-1.5 py-0 h-4 mb-1.5'>
                    {reportTypeLabels[item.reportType] || item.reportType}
                  </Badge>
                  <h4 className="text-xs font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                    {item.authorType === 'analystProfile' ? 'Analyst' : 'Author'}: {item.authorName}
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
