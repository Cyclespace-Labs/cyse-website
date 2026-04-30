"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TokenPrice {
  symbol: string;
  name: string;
  price: number;
  confidence: number;
  publishTime: number;
  feedId: string;
}

const TOKEN_CONFIG: Record<string, { color: string }> = {
  BTC: { color: "#F7931A" },
  ETH: { color: "#627EEA" },
  BNB: { color: "#F3BA2F" },
  TRX: { color: "#FF060A" },
  XRP: { color: "#23292F" },
};

function TokenIcon({ symbol }: { symbol: string }) {
  switch (symbol) {
    case "BTC":
      return (
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
          <circle cx="16" cy="16" r="16" fill="#F7931A" />
          <path
            d="M22.7 14.2c.4-2.7-1.6-4.1-4.4-5.1l.9-3.6-2.2-.6-.9 3.4c-.6-.1-1.2-.3-1.8-.4l.9-3.5-2.2-.6-.9 3.6c-.5-.1-1-.2-1.5-.3l.1-.1-3.1-.8-.6 2.4s1.7.4 1.6.4c.9.2 1.1.8.1 1.8l-.5.2.1.1-.5.2-.4 1.5c-.1 0-.3-.1-.5-.2l-1.6.4 1.1 3.6s-1.2.3-2 .5l-1 4 3.1.7c.5.1 1 .2 1.5.3l-.9 3.7 2.2.6.9-3.6c.6.2 1.2.3 1.8.5l-.9 3.5 2.2.6.9-3.7c3.8.7 6.6-.5 7.8-3.4 1-2.4 0-3.8-1.8-4.7 1.3-.3 2.3-1.2 2.6-3zm-4.6 6.6c-.7 2.8-5.2 1.3-6.7.9l1.2-4.8c1.5.4 6.3 1.1 5.5 3.9zm.7-6.6c-.6 2.5-4.5 1.2-5.7.9l1.1-4.5c1.2.3 5.2 1 4.6 3.6z"
            fill="white"
          />
        </svg>
      );
    case "ETH":
      return (
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
          <circle cx="16" cy="16" r="16" fill="#627EEA" />
          <path d="M16 4L15.5 5.5V20.2L16 20.7L23.2 16.1L16 4Z" fill="white" fillOpacity="0.6" />
          <path d="M16 4L8.8 16.1L16 20.7V12.9V4Z" fill="white" />
          <path d="M16 22.1L15.7 22.5V27.4L16 28L23.2 17.7L16 22.1Z" fill="white" fillOpacity="0.6" />
          <path d="M16 28V22.1L8.8 17.7L16 28Z" fill="white" />
          <path d="M16 20.7L23.2 16.1L16 12.9V20.7Z" fill="white" fillOpacity="0.2" />
          <path d="M8.8 16.1L16 20.7V12.9L8.8 16.1Z" fill="white" fillOpacity="0.6" />
        </svg>
      );
    case "BNB":
      return (
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
          <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
          <path d="M12.6 14.3L16 10.9l3.4 3.4 2-2L16 6.9l-5.4 5.4 2 2z" fill="white" />
          <path d="M6.9 16l2-2 2 2-2 2-2-2z" fill="white" />
          <path d="M12.6 17.7l3.4 3.4 3.4-3.4 2 2L16 25.1l-5.4-5.4 2-2z" fill="white" />
          <path d="M21.1 16l2-2 2 2-2 2-2-2z" fill="white" />
          <path d="M18.4 16L16 13.6l-2 2L16 17.7l2.4-2.4z" fill="white" />
        </svg>
      );
    case "TRX":
      return (
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
          <circle cx="16" cy="16" r="16" fill="#FF060A" />
          <path d="M9.5 10.5L22.5 7L19 22.5L9.5 10.5Z" fill="white" />
          <path d="M9.5 10.5L13 18L22.5 7L9.5 10.5Z" fill="white" fillOpacity="0.6" />
        </svg>
      );
    case "XRP":
      return (
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
          <circle cx="16" cy="16" r="16" fill="#23292F" />
          <path
            d="M22.5 10.5h-2.2L16 15.2l-4.3-4.7H9.5l5.7 6.2-5.7 6.2h2.2l4.3-4.7 4.3 4.7h2.2l-5.7-6.2 5.7-6.2z"
            fill="white"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
          <circle cx="16" cy="16" r="16" fill="#94a3b8" />
          <text x="16" y="21" textAnchor="middle" fontSize="12" fill="white">
            {symbol[0]}
          </text>
        </svg>
      );
  }
}

function formatPrice(price: number): string {
  if (price >= 1000) return price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price >= 1) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return price.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 6 });
}

export default function TokenDisplay() {
  const [prices, setPrices] = useState<TokenPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchPrices() {
    try {
      const res = await fetch("/api/pyth/prices", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed");
      const data = (await res.json()) as { prices: TokenPrice[] };
      setPrices(data.prices ?? []);
      setError(null);
    } catch {
      setError("offline");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading && prices.length === 0) {
    return (
      <div className="flex items-center gap-4 px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
        {Object.keys(TOKEN_CONFIG).map((sym) => (
          <div key={sym} className="flex items-center gap-1.5 animate-pulse">
            <div className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="w-12 h-3 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-x-auto">
      {prices.map((token) => {
        const config = TOKEN_CONFIG[token.symbol];
        return (
          <div key={token.symbol} className="flex items-center gap-1.5 shrink-0">
            <TokenIcon symbol={token.symbol} />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100">{token.symbol}</span>
              <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 tabular-nums">
                ${formatPrice(token.price)}
              </span>
            </div>
            {error ? (
              <TrendingDown className="w-3 h-3 text-red-500" />
            ) : (
              <TrendingUp className="w-3 h-3 text-emerald-500" />
            )}
          </div>
        );
      })}
      {prices.length === 0 && (
        <span className="text-xs text-zinc-500">Loading prices…</span>
      )}
    </div>
  );
}
