'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface PriceItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  logo: string;
}

const topMovers: PriceItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 69420.50, change: 2.34, logo: '/tokens/Bitcoin.svg' },
  { symbol: 'ETH', name: 'Ethereum', price: 3890.25, change: 1.85, logo: '/tokens/Ethereum ETH.svg' },
  { symbol: 'SOL', name: 'Solana', price: 145.80, change: 5.67, logo: '/tokens/Solana SOL.svg' },
  { symbol: 'AVAX', name: 'Avalanche', price: 42.15, change: -1.23, logo: '/tokens/Avalanche.svg' },
  { symbol: 'BNB', name: 'BNB', price: 567.89, change: 3.45, logo: '/tokens/Binance.svg' },
];

function formatPrice(price: number): string {
  if (price < 0.01) return price.toFixed(6);
  if (price < 1) return price.toFixed(4);
  if (price < 1000) return price.toFixed(2);
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PriceWidget() {
  return (
    <div className='flex flex-col h-full w-full bg-white dark:bg-zinc-950'>
      {/* Header */}
      <header className='flex flex-row gap-2 items-center justify-between px-4 py-4 border-b border-zinc-200 dark:border-zinc-800'>
        <h1 className='font-bold text-base flex flex-row gap-2 items-center text-zinc-900 dark:text-zinc-100'> 
          <TrendingUp className="w-5 h-5 text-primary" />
          <span>Top Movers</span>
        </h1>
        <span className='text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full'>24h</span>
      </header>

      {/* Price List */}
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {topMovers.map((item) => {
          const isPositive = item.change >= 0;
          const Icon = isPositive ? TrendingUp : TrendingDown;
          
          return (
            <div
              key={item.symbol}
              className='flex items-center justify-between px-4 py-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors duration-200 cursor-pointer group'
            >
              <div className='flex items-center gap-3 flex-1'>
                <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {item.symbol}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {item.name}
                  </p>
                </div>
              </div>
              
              <div className='text-right flex-shrink-0 ml-4'>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
                  ${formatPrice(item.price)}
                </p>
                <p className={cn(
                  "text-xs font-semibold flex items-center justify-end gap-1 mt-0.5",
                  isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}>
                  <Icon className="w-3.5 h-3.5" />
                  {isPositive ? '+' : ''}{item.change.toFixed(2)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
