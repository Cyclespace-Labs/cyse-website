'use client';

import { ArrowRight, Megaphone, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PressRelease {
  id: string;
  title: string;
  company: string;
  time: string;
  isSponsored?: boolean;
}

const pressReleases: PressRelease[] = [
  {
    id: '1',
    title: 'Solana Foundation Announces $100M Ecosystem Fund',
    company: 'Solana Foundation',
    time: '2h ago',
    isSponsored: true,
  },
  {
    id: '2',
    title: 'Coinbase Expands Institutional Custody Services to Europe',
    company: 'Coinbase',
    time: '4h ago',
  },
  {
    id: '3',
    title: 'Polygon Partners with Major Gaming Studio for Web3 Integration',
    company: 'Polygon Labs',
    time: '6h ago',
    isSponsored: true,
  },
];

export default function PressReleases() {
  return (
    <div className='flex flex-col h-full w-full bg-white dark:bg-zinc-950'>
      {/* Header */}
      <header className='flex flex-row gap-1 items-center justify-between px-3 py-3 border-b border-zinc-200 dark:border-zinc-800'>
        <h1 className='font-semibold text-sm flex flex-row gap-2 items-center'> 
          <Megaphone className="w-4 h-4 text-zinc-500" />
          <span>Press Releases</span>
        </h1>
        <a href="#" className='text-xs text-zinc-500 hover:text-primary dark:hover:text-secondary transition-colors flex items-center gap-1'>
          See all <ArrowRight className="w-3 h-3" />
        </a>
      </header>

      {/* Press Releases List */}
      <div className="flex flex-col">
        {pressReleases.map((item) => (
          <a
            key={item.id}
            href="#"
            className='group flex items-start gap-2 px-3 py-3 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors'
          >
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2 mb-1'>
                {item.isSponsored && (
                  <Badge variant="outline" className='text-[8px] px-1 py-0 h-3.5 border-yellow-400 text-yellow-600 dark:text-yellow-400'>
                    Sponsored
                  </Badge>
                )}
                <span className='text-[10px] text-zinc-400 dark:text-zinc-500'>{item.time}</span>
              </div>
              <h4 className="text-xs font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                {item.title}
              </h4>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1">
                {item.company}
                <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
