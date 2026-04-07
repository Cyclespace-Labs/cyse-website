'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PriceItem {
  symbol: string;
  name: string;
  price: string;
  change: number;
}

const topMovers: PriceItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: '$69,420.50', change: 2.34 },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,890.25', change: 1.85 },
  { symbol: 'SOL', name: 'Solana', price: '$145.80', change: 5.67 },
  { symbol: 'AVAX', name: 'Avalanche', price: '$42.15', change: -1.23 },
  { symbol: 'LINK', name: 'Chainlink', price: '$18.90', change: 3.45 },
];

export default function PriceWidget() {
  return (
    <div className='flex flex-col h-full w-full bg-white dark:bg-zinc-950'>
      {/* Header */}
      <header className='flex flex-row gap-1 items-center justify-between px-3 py-3 border-b border-zinc-200 dark:border-zinc-800'>
        <h1 className='font-semibold text-sm flex flex-row gap-2 items-center'> 
          <span className="text-xs">📈</span>
          <span>Top Movers</span>
        </h1>
        <span className='text-[10px] text-zinc-500'>24h</span>
      </header>

      {/* Price Grid */}
      <div className="grid grid-cols-1 gap-px bg-zinc-100 dark:bg-zinc-800">
        {topMovers.map((item) => {
          const isPositive = item.change >= 0;
          const Icon = isPositive ? TrendingUp : TrendingDown;
          
          return (
            <div
              key={item.symbol}
              className='flex items-center justify-between px-3 py-2.5 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer'
            >
              <div className='flex items-center gap-2'>
                <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                  {item.symbol[0]}
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.symbol}
                  </p>
                  <p className="text-[9px] text-zinc-500 dark:text-zinc-400">
                    {item.name}
                  </p>
                </div>
              </div>
              
              <div className='text-right'>
                <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {item.price}
                </p>
                <p className={cn(
                  "text-[9px] flex items-center justify-end gap-0.5",
                  isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}>
                  <Icon className="w-2.5 h-2.5" />
                  {isPositive ? '+' : ''}{item.change}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
