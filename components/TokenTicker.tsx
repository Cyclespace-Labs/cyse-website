"use client";

import React, { useEffect, useRef, memo, useState } from 'react';
import { LogoLoop, LogoItem } from './LogoLoop';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
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

// Token-specific decimal places for accurate price formatting
const TOKEN_DECIMALS: Record<string, number> = {
  BTC: 2,
  ETH: 2,
  USDT: 2,
  USDC: 2,
  BNB: 2,
  XRP: 4,
  ADA: 4,
  SOL: 2,
  DOT: 4,
  MATIC: 4,
  SHIB: 8,
  TRX: 4,
  AVAX: 2,
  UNI: 2,
};

function formatPrice(price: number, symbol: string): string {
  const decimals = TOKEN_DECIMALS[symbol] || 2;
  if (price >= 1000) {
    return price.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }
  return price.toFixed(decimals);
}

// React state-based token card for reliable price updates
const TokenCard = memo(function TokenCard({ token }: { token: TokenData }) {
  const [price, setPrice] = useState(token.price);
  const [change24h, setChange24h] = useState(token.change24h);

  useEffect(() => {
    const updateFromStore = () => {
      const storedData = priceStore[token.symbol];
      if (!storedData) return;

      setPrice(storedData.price);
      setChange24h(storedData.change24h);
    };

    // Update immediately from store
    updateFromStore();

    // Poll for updates from store
    const interval = setInterval(updateFromStore, 100);

    return () => clearInterval(interval);
  }, [token.symbol]);

  const isPositive = change24h >= 0;

  return (
    <div 
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 min-w-fit shadow-sm"
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
          <span className="font-bold text-xs text-slate-900 dark:text-slate-100 uppercase">
            {token.symbol}
          </span>
          <span 
            className="text-xs font-semibold tabular-nums transition-colors duration-200"
            style={{ color: isPositive ? '#16a34a' : '#dc2626' }}
          >
            ${formatPrice(price, token.symbol)}
          </span>
        </div>
        <div className={cn(
          "flex items-center gap-0.5 text-[10px] font-medium"
        )}>
          {isPositive ? (
            <TrendingUp className="w-3 h-3 transition-transform duration-200" />
          ) : (
            <TrendingDown className="w-3 h-3 transition-transform duration-200" style={{ transform: 'rotate(180deg)' }} />
          )}
          <span className={cn("tabular-nums", isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
            {isPositive ? '+' : ''}{change24h.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
});

export function TokenTicker({ className, speed = 40 }: TokenTickerProps) {
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
      price: 0, // Will be populated by SSE
      change24h: 0, // Will be populated by SSE
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
        // Use direct EventSource with Pyth SSE endpoint as per documentation
        const idsParam = feedIds.map(id => `ids[]=0x${id}`).join('&');
        const sseUrl = `${HERMES_SSE_URL}/v2/updates/price/stream?${idsParam}`;

        const eventSource = new EventSource(sseUrl);
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
        "w-full overflow-hidde py-1  ",
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
