"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface TokenPrice {
  symbol: string;
  price: number;
  change: number;
  confidence: number;
  publishTime: number;
}

const TOKEN_CONFIGS = [
  { symbol: "BTC", name: "Bitcoin", logo: "/tokens/Bitcoin.svg" },
  { symbol: "ETH", name: "Ethereum", logo: "/tokens/Ethereum ETH.svg" },
  { symbol: "BNB", name: "BNB", logo: "/tokens/Binance.svg" },
  { symbol: "TRX", name: "Tron", logo: "/tokens/Tron.svg" },
  { symbol: "XRP", name: "XRP", logo: "/tokens/XRP.svg" },
];

function formatPrice(price: number): string {
  if (price >= 1000) {
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } else if (price >= 1) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price.toFixed(4)}`;
  }
}

export default function TokenDisplay() {
  const [prices, setPrices] = useState<TokenPrice[]>([]);
  const [displayPrices, setDisplayPrices] = useState<TokenPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await fetch("/api/token-prices");
        const data = await response.json();
        if (data.prices) {
          setPrices(data.prices);
          setDisplayPrices(data.prices);
        }
      } catch (error) {
        console.error("Failed to fetch prices:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate live fluctuations between API updates
  useEffect(() => {
    if (prices.length === 0) return;

    const fluctuationInterval = setInterval(() => {
      setDisplayPrices((prev) =>
        prev.map((tokenPrice) => {
          const basePrice = prices.find((p) => p.symbol === tokenPrice.symbol)?.price || tokenPrice.price;
          // Add small random fluctuation (-0.05% to +0.05%)
          const fluctuation = basePrice * (Math.random() * 0.001 - 0.0005);
          return {
            ...tokenPrice,
            price: basePrice + fluctuation,
          };
        })
      );
    }, 500); // Update every 500ms for live effect

    return () => clearInterval(fluctuationInterval);
  }, [prices]);

  return (
    <div className="w-full flex items-center justify-center gap-6 px-4 py-2 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      {TOKEN_CONFIGS.map((token) => {
        const tokenPrice = displayPrices.find((p) => p.symbol === token.symbol);

        return (
          <div key={token.symbol} className="flex items-center gap-2">
            <div className="w-6 h-6 relative">
              <Image
                src={token.logo}
                alt={token.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {token.symbol}
              </span>
              {loading ? (
                <span className="text-[10px] text-zinc-400">Loading...</span>
              ) : tokenPrice ? (
                <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-mono">
                  {formatPrice(tokenPrice.price)}
                </span>
              ) : (
                <span className="text-[10px] text-zinc-400">--</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
