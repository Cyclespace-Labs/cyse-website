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
  const [baselinePrices, setBaselinePrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await fetch("/api/token-prices");
        const data = await response.json();
        if (data.prices) {
          // Set baseline prices on first load
          setBaselinePrices((prev) => {
            const newBaseline: Record<string, number> = { ...prev };
            data.prices.forEach((price: TokenPrice) => {
              if (!newBaseline[price.symbol]) {
                newBaseline[price.symbol] = price.price;
              }
            });
            return newBaseline;
          });
          setPrices(data.prices);
        }
      } catch (error) {
        console.error("Failed to fetch prices:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, 1000); // Refresh every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full grid grid-cols-5 items-center justify-between gap-6 px-2 py-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
      {TOKEN_CONFIGS.map((token) => {
        const tokenPrice = prices.find((p: TokenPrice) => p.symbol === token.symbol);
        const baselinePrice = baselinePrices[token.symbol];
        
        // Calculate percentage change from baseline price
        let percentChange = 0;
        if (baselinePrice && tokenPrice) {
          percentChange = ((tokenPrice.price - baselinePrice) / baselinePrice) * 100;
        }
        const isPositive = percentChange >= 0;

        return (
          <div key={token.symbol} className="flex items-center gap-2 min-w-[100px]">
            <div className="w-6 h-6 relative shrink-0">
              <Image
                src={token.logo}
                alt={token.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 w-8 shrink-0">
                {token.symbol}
              </span>
              {loading ? (
                <span className="text-[10px] text-zinc-400">Loading...</span>
              ) : tokenPrice ? (
                <div className="flex items-center gap-1 min-w-[70px]">
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 font-sans font-semibold transition-all duration-300 ease-out">
                    {formatPrice(tokenPrice.price)}
                  </span>
                  {Math.abs(percentChange) > 0.001 && (
                    <span
                      className={`text-xs font-mono transition-all duration-300 ease-out ${
                        isPositive
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {percentChange.toFixed(3)}%
                    </span>
                  )}
                </div>
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
