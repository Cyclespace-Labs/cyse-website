"use client";

import React, { useEffect, useRef, memo } from 'react';
import { LogoLoop, LogoItem } from './LogoLoop';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TokenData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  logo: string;
}

interface TokenTickerProps {
  className?: string;
  speed?: number;
}

const TOKEN_CONFIGS = [
  { symbol: 'BTC', name: 'Bitcoin', logo: '/tokens/Bitcoin.svg' },
  { symbol: 'ETH', name: 'Ethereum', logo: '/tokens/Ethereum ETH.svg' },
  { symbol: 'USDT', name: 'Tether', logo: '/tokens/Tether.svg' },
  { symbol: 'BNB', name: 'BNB', logo: '/tokens/Binance.svg' },
  { symbol: 'XRP', name: 'XRP', logo: '/tokens/XRP.svg' },
  { symbol: 'ADA', name: 'Cardano', logo: '/tokens/Cardano ADA.svg' },
  { symbol: 'SOL', name: 'Solana', logo: '/tokens/Solana SOL.svg' },
  { symbol: 'DOT', name: 'Polkadot', logo: '/tokens/Polkadot.svg' },
  { symbol: 'USDC', name: 'USD Coin', logo: '/tokens/USD Coin.svg' },
  { symbol: 'MATIC', name: 'Polygon', logo: '/tokens/Polygon.svg' },
  { symbol: 'DAI', name: 'Dai', logo: '/tokens/Dai.svg' },
  { symbol: 'SHIB', name: 'Shiba Inu', logo: '/tokens/Shiba Inu SHIB.svg' },
  { symbol: 'TRX', name: 'Tron', logo: '/tokens/Tron.svg' },
  { symbol: 'AVAX', name: 'Avalanche', logo: '/tokens/Avalanche.svg' },
  { symbol: 'UNI', name: 'Uniswap', logo: '/tokens/Uniswap UNI.svg' },
];

const basePrices: Record<string, number> = {
  BTC: 67234.56, ETH: 3456.78, USDT: 1.00, BNB: 567.89,
  XRP: 0.6234, ADA: 0.4567, SOL: 145.67, DOT: 7.89,
  USDC: 1.00, MATIC: 0.89, DAI: 1.00, SHIB: 0.00002345,
  TRX: 0.1234, AVAX: 34.56, UNI: 8.90,
};

function formatPrice(price: number): string {
  if (price < 0.01) return price.toFixed(6);
  if (price < 1) return price.toFixed(4);
  if (price < 1000) return price.toFixed(2);
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// DOM-based token card - zero React re-renders during animation
const TokenCard = memo(function TokenCard({ token }: { token: TokenData }) {
  const priceRef = useRef<HTMLSpanElement>(null);
  const changeRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const currentPrice = useRef(token.price);
  const currentChange = useRef(token.change24h);

  useEffect(() => {
    const interval = setInterval(() => {
      const volatility = currentPrice.current > 100 ? 0.002 : 0.01;
      const change = (Math.random() - 0.5) * volatility;
      const newPrice = Math.max(0.000001, currentPrice.current * (1 + change));
      const newChange24h = currentChange.current + (Math.random() - 0.5) * 0.05;
      const isUp = newPrice > currentPrice.current;
      
      currentPrice.current = newPrice;
      currentChange.current = newChange24h;
      
      // Direct DOM manipulation - no React re-render
      if (priceRef.current) {
        priceRef.current.textContent = `$${formatPrice(newPrice)}`;
        priceRef.current.style.color = isUp ? '#22c55e' : '#ef4444';
      }
      
      if (changeRef.current) {
        const isPositive = newChange24h >= 0;
        changeRef.current.textContent = `${isPositive ? '+' : ''}${newChange24h.toFixed(2)}%`;
        changeRef.current.className = cn(
          "tabular-nums",
          isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
        );
      }

      if (iconRef.current) {
        iconRef.current.style.transform = newChange24h >= 0 ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const isPositive = token.change24h >= 0;

  return (
    <div 
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 min-w-fit shadow-sm"
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
    >
      <img
        src={token.logo}
        alt={token.name}
        className="w-5 h-5 object-contain flex-shrink-0"
        loading="lazy"
        decoding="async"
        style={{ transform: 'translateZ(0)' }}
      />
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 uppercase">
            {token.symbol}
          </span>
          <span 
            ref={priceRef}
            className="text-xs font-semibold tabular-nums transition-colors duration-200"
            style={{ color: isPositive ? '#16a34a' : '#dc2626' }}
          >
            ${formatPrice(token.price)}
          </span>
        </div>
        <div className={cn(
          "flex items-center gap-0.5 text-[10px] font-medium"
        )}>
          {isPositive ? (
            <TrendingUp ref={iconRef} className="w-3 h-3 transition-transform duration-200" />
          ) : (
            <TrendingDown ref={iconRef} className="w-3 h-3 transition-transform duration-200" style={{ transform: 'rotate(180deg)' }} />
          )}
          <span ref={changeRef} className={cn("tabular-nums", isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
            {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
});

export function TokenTicker({ className, speed = 40 }: TokenTickerProps) {
  // Triple the tokens for seamless looping - more content = smoother transitions
  const tokens = useRef<TokenData[]>(
    [...TOKEN_CONFIGS, ...TOKEN_CONFIGS, ...TOKEN_CONFIGS].map((t, i) => ({
      ...t,
      // Unique key for each duplicated token
      symbol: t.symbol,
      name: t.name,
      logo: t.logo,
      price: basePrices[t.symbol] * (1 + (Math.random() - 0.5) * 0.001), // Slight price variation
      change24h: (Math.random() - 0.5) * 10,
    }))
  ).current;

  // Create logo items once - never changes
  const logoItems: LogoItem[] = useRef(
    tokens.map((token, i) => ({
      node: <TokenCard key={`${token.symbol}-${i}`} token={token} />,
      title: token.name,
    }))
  ).current;

  return (
    <div 
      className={cn(
        "w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800",
        className
      )}
      style={{ contain: 'layout style paint' }}
    >
      <LogoLoop
        logos={logoItems}
        speed={speed}
        direction="left"
        pauseOnHover={true}
        hoverSpeed={8}
        gap={8}
        logoHeight={38}
        ariaLabel="Live token price ticker"
        fadeOut={true}
      />
    </div>
  );
}

export default TokenTicker;
