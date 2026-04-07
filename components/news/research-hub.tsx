'use client';

import { ArrowRight, FileText, Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ResearchItem {
  id: string;
  title: string;
  sponsor: string;
  category: string;
  thumbnail: string;
}

const mockResearch: ResearchItem[] = [
  {
    id: '1',
    title: 'Encryption Supremacy: Zcash and Privacy in the Age of Scale',
    sponsor: 'CoinSe7en',
    category: 'Research',
    thumbnail: '',
  },
  {
    id: '2',
    title: 'The Definitive Stablecoin Landscape Series: North America',
    sponsor: 'Ripple',
    category: 'Report',
    thumbnail: '',
  },
  {
    id: '3',
    title: 'Crypto Custody: Institutional Security Framework',
    sponsor: 'Fireblocks',
    category: 'Whitepaper',
    thumbnail: '',
  },
];

export default function ResearchHub() {
  return (
    <div className='flex flex-col h-full w-full bg-white dark:bg-zinc-950'>
      {/* Yellow Banner Header */}
      <div className='bg-yellow-400 dark:bg-yellow-500 px-3 py-2'>
        <p className='text-[10px] font-semibold text-black uppercase tracking-wide'>
          Discover what&apos;s new in our Research Hub!
        </p>
      </div>

      {/* Header */}
      <header className='flex flex-row gap-1 items-center justify-between px-3 py-3 border-b border-zinc-200 dark:border-zinc-800'>
        <h1 className='font-semibold text-sm flex flex-row gap-2 items-center'> 
          <FileText className="w-4 h-4 text-zinc-500" />
          <span>Research</span>
        </h1>
        <a href="#" className='text-xs text-zinc-500 hover:text-primary dark:hover:text-secondary transition-colors flex items-center gap-1'>
          See all <ArrowRight className="w-3 h-3" />
        </a>
      </header>

      {/* Research Articles */}
      <div className="flex flex-col">
        {mockResearch.map((item) => (
          <a
            key={item.id}
            href="#"
            className='group flex items-start gap-3 px-3 py-3 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors'
          >
            {/* Thumbnail with gradient placeholder */}
            <div className="relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200 dark:from-yellow-900/40 dark:via-orange-900/40 dark:to-pink-900/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-yellow-700/50 dark:text-yellow-400/50" />
              </div>
            </div>
            
            <div className='flex-1 min-w-0'>
              <Badge variant="secondary" className='text-[9px] px-1.5 py-0 h-4 mb-1.5'>
                {item.category}
              </Badge>
              <h4 className="text-xs font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                {item.title}
              </h4>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                Commissioned by {item.sponsor}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
