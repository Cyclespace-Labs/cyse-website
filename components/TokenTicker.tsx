"use client";

import React, { useEffect, useRef, memo, useState } from 'react';
import { LogoLoop, LogoItem } from './LogoLoop';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HermesClient } from '@pythnetwork/hermes-client';
import { PYTH_FEED_IDS, HERMES_SSE_URL } from '@/lib/token-constants';

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
  { symbol: 'SHIB', name: 'Shiba Inu', logo: '/tokens/Shiba Inu SHIB.svg' },
  { symbol: 'TRX', name: 'Tron', logo: '/tokens/Tron.svg' },
  { symbol: 'AVAX', name: 'Avalanche', logo: '/tokens/Avalanche.svg' },
  { symbol: 'UNI', name: 'Uniswap', logo: '/tokens/Uniswap UNI.svg' },
];

// Global price store for all TokenCard instances (module-level variable, not a hook)
const priceStore: Record<string, { price: number; change24h: number }> = {};

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
    const updateFromStore = () => {
      const storedData = priceStore[token.symbol];
      if (!storedData) return;

      const newPrice = storedData.price;
      const newChange24h = storedData.change24h;
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
    };

    // Update immediately from store
    updateFromStore();

    // Poll for updates from store
    const interval = setInterval(updateFromStore, 100);

    return () => clearInterval(interval);
  }, [token.symbol]);

  const isPositive = token.change24h >= 0;

  return (
    <div 
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-zinc-950 border over border-zinc-200 dark:border-zinc-800 min-w-fit shadow-sm"
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
  // Initialize prices from store or defaults
  const defaultPrices: Record<string, number> = {
    BTC: 67234.56, ETH: 3456.78, USDT: 1.00, BNB: 567.89,
    XRP: 0.6234, ADA: 0.4567, SOL: 145.67, DOT: 7.89,
    USDC: 1.00, MATIC: 0.89, SHIB: 0.00002345,
    TRX: 0.1234, AVAX: 34.56, UNI: 8.90,
  };

  // SSE refs - must be at component level, not inside useEffect
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const baselinePricesRef = useRef<Record<string, number>>({});

  // Triple the tokens for seamless looping - more content = smoother transitions
  const tokens = useRef<TokenData[]>(
    [...TOKEN_CONFIGS, ...TOKEN_CONFIGS, ...TOKEN_CONFIGS].map((t, i) => ({
      ...t,
      symbol: t.symbol,
      name: t.name,
      logo: t.logo,
      price: defaultPrices[t.symbol] || 0,
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

  // SSE Connection Logic
  useEffect(() => {
    async function connectSSE() {
      const feedIds = Object.values(PYTH_FEED_IDS);

      try {
        const client = new HermesClient(HERMES_SSE_URL);
        const eventSource = await client.getPriceUpdatesStream(feedIds);
        eventSourceRef.current = eventSource;

        eventSource.onmessage = (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data);
            const parsedPrices = data.parsed;
            if (!parsedPrices) return;

            const newPrices = parsedPrices.map((parsed: any) => {
              const feedId = parsed.id.startsWith("0x") ? parsed.id.slice(2) : parsed.id;
              const token = Object.keys(PYTH_FEED_IDS).find(
                (key) => PYTH_FEED_IDS[key as keyof typeof PYTH_FEED_IDS] === feedId
              );

              if (!token) return null;

              const price = Number(parsed.price.price) * Math.pow(10, parsed.price.expo);

              return {
                symbol: token,
                price,
              };
            }).filter(Boolean);

            if (newPrices.length > 0) {
              // Update baseline prices on first update
              newPrices.forEach((price: any) => {
                if (!baselinePricesRef.current[price.symbol]) {
                  baselinePricesRef.current[price.symbol] = price.price;
                }
              });

              // Update global price store with calculated 24h change
              newPrices.forEach((price: any) => {
                const baseline = baselinePricesRef.current[price.symbol] || price.price;
                const change24h = ((price.price - baseline) / baseline) * 100;
                priceStore[price.symbol] = {
                  price: price.price,
                  change24h,
                };
              });

              reconnectAttemptsRef.current = 0;
            }
          } catch (error) {
            console.error("Error parsing SSE message:", error);
          }
        };

        eventSource.onerror = (error: Event) => {
          console.error("SSE connection error:", error);
          eventSource.close();
          reconnectWithBackoff();
        };
      } catch (error) {
        console.error("Failed to create SSE connection:", error);
        reconnectWithBackoff();
      }
    }

    function reconnectWithBackoff() {
      const maxRetries = 5;
      const initialDelay = 1000;
      const maxDelay = 30000;

      if (reconnectAttemptsRef.current >= maxRetries) {
        console.log("Max reconnection attempts reached");
        return;
      }

      const delay = Math.min(initialDelay * Math.pow(2, reconnectAttemptsRef.current), maxDelay);
      reconnectAttemptsRef.current++;

      console.log(`Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current}/${maxRetries})`);

      reconnectTimeoutRef.current = setTimeout(() => {
        connectSSE();
      }, delay);
    }

    function cleanup() {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    }

    connectSSE();

    return cleanup;
  }, []);

  return (
    <div 
      className={cn(
        "w-full overflow-hidden  ",
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
