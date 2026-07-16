'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { LogoLoop } from '../LogoLoop';
import { Globe, Loader2 } from 'lucide-react';
import * as motion from "motion/react-client";
import { motionValue } from 'motion';

interface PredictionOption {
  name: string;
  probability: number;
}

interface PredictionCard {
  id: string;
  category: string;
  title: string;
  options: PredictionOption[];
  volume?: string;
  isLive?: boolean;
  isNew?: boolean;
  endDate?: string;
  image?: string;
  chartData?: number[];
}

const PredictionCardComponent = React.memo(({ card }: { card: PredictionCard }) => {
  const getCategoryColor = () => {
    switch (card.category) {
      case 'Sports': return 'text-emerald-600 dark:text-emerald-400';
      case 'Crypto': return 'text-orange-600 dark:text-orange-400';
      case 'Politics': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-zinc-600 dark:text-zinc-400';
    }
  };

  const x = motionValue(0);

  useEffect(() => {
    const timeout = setTimeout(() => x.set(100), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div 
      viewport={{ amount: 0.3 }} 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1, transition: { type:"spring", duration: 1 } }} 
      exit={{ scale: 1 }}
    >
      <Card className={`w-[300px] lg:w-[180px] lg:h-[180px] xl:w-[260px] h-[200px] xl:h-[200px] py-2 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
        <CardContent className="p-4 h-full flex flex-col justify-between">
          {/* Title and Category */}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`flex gap-1 items-center lg:text-[9px] xl:text-[13px] font-semibold uppercase tracking-wide mb-1 ${getCategoryColor()}`}>
                {/* Replaced standard Lucide icon with API image, fallback to Globe */}
                {card.image ? (
                  <img src={card.image} alt={card.category} className=" sm:w-5 sm:h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 rounded-full object-cover shadow-sm" />
                ) : (
                  <Globe className="w-3 h-3" />
                )}
                {card.category}
              </span>
              {card.isLive && (
                <span className="flex items-center gap-0.5 lg:text-[9px] xl:text-[10px] text-red-500 font-medium">
                  <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                  LIVE
                </span>
              )}
            </div>
            <h3 className="lg:text-xs xl:text-sm font-bold text-zinc-900 dark:text-white leading-tight line-clamp-2 mb-2">
              {card.title} 
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {card.options.map((option, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="lg:text-[9px] xl:text-[12px] font-semibold text-zinc-900 dark:text-white">
                      {option.name}
                    </span>
                    <span className="lg:text-[10px] text-[12px] font-bold text-zinc-900 dark:text-white">
                      {option.probability}%
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <span className="lg:text-[9px] xl:text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded">Yes</span>
                  <span className="lg:text-[9px] xl:text-[9px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 px-2 py-1 rounded">No</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-2 border-t border-zinc-100 dark:border-slate-800 flex items-center justify-between text-[8px] text-zinc-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              {card.endDate && <span>{card.endDate}</span>}
              {card.volume && <span>{card.volume}</span>}
            </div>
            <div className="flex items-center gap-1">
              <button className="p-0.5 hover:bg-zinc-100 dark:hover:bg-slate-800 rounded">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <button className="p-0.5 hover:bg-zinc-100 dark:hover:bg-slate-800 rounded">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

PredictionCardComponent.displayName = 'PredictionCardComponent';

const PredictionMarkets = React.memo(() => {
  const [predictionData, setPredictionData] = useState<PredictionCard[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real Polymarket API Data
  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        const res = await fetch('/api/predictions');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setPredictionData(data);
      } catch (error) {
        console.error("Failed to fetch local prediction data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocalData();
  }, []);

  // Memoize column items dynamically based on the fetched array
  const column1Items = useMemo(() => 
    predictionData.slice(0, 4).map((card) => ({ node: <PredictionCardComponent card={card} />, ariaLabel: card.title })),
    [predictionData]
  );
  const column2Items = useMemo(() => 
    predictionData.slice(4, 8).map((card) => ({ node: <PredictionCardComponent card={card} />, ariaLabel: card.title })),
    [predictionData]
  );
  const column3Items = useMemo(() => 
    predictionData.slice(8, 12).map((card) => ({ node: <PredictionCardComponent card={card} />, ariaLabel: card.title })),
    [predictionData]
  );
  const column4Items = useMemo(() => 
    predictionData.slice(12, 16).map((card) => ({ node: <PredictionCardComponent card={card} />, ariaLabel: card.title })),
    [predictionData]
  );

  const header = useMemo(() => (
    <div className="mb-12 text-center">
      <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-b from-black via-slate-800 to-slate-700 
        dark:from-white dark:via-slate-200 dark:to-slate-400 max-w-3xl mx-auto">
          Bet on the outcome of real-world events. Sports, crypto, politics, and more.
        </h2>
      </motion.div>
    </div>
  ), []);

  if (loading) {
    return (
      <div className="w-full py-24 flex justify-center items-center h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="w-full py-16 md:py-24 font-sans justify-center">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {header}

        {/* Prediction Cards Grid with LogoLoop */}
        <div className="flex justify-center relative items-center">
          {/* Top fade gradient */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-white via-white/80 to-transparent z-10 pointer-events-none
              dark:from-black dark:via-black/80 dark:to-transparent" />
          {/* Bottom fade gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white via-white/80 to-transparent z-10 pointer-events-none
              dark:from-black dark:via-black/80 dark:to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-fit h-[500px] md:h-[600px] items-center overflow-hidden">
            {/* Column 1 - scrolls down */}
            <div className="h-full w-full">
              <LogoLoop
                logos={column1Items}
                direction="down"
                speed={30}
                logoHeight={200}
                gap={-120}
                pauseOnHover={false}
                className="h-full"
                ariaLabel="Prediction markets column 1"
              />
            </div>

            {/* Column 2 - scrolls up */}
            <div className="h-full hidden md:block">
              <LogoLoop
                logos={column2Items}
                direction="up"
                speed={35}
                logoHeight={200}
                gap={-120}
                pauseOnHover={false}
                className="h-full"
                ariaLabel="Prediction markets column 2"
              />
            </div>

            {/* Column 3 - scrolls down */}
            <div className="h-full hidden md:block">
              <LogoLoop
                logos={column3Items}
                direction="down"
                speed={40}
                logoHeight={200}
                gap={-120}
                pauseOnHover={false}
                className="h-full"
                ariaLabel="Prediction markets column 3"
              />
            </div>

            {/* Column 4 - scrolls up */}
            <div className="h-full hidden md:block">
              <LogoLoop
                logos={column4Items}
                direction="up"
                speed={30}
                logoHeight={200}
                gap={-120}
                pauseOnHover={false}
                className="h-full"
                ariaLabel="Prediction markets column 4"
              />
            </div>

            {/* Column 5 - scrolls up (Reuse column 1 data to fill the grid as per mockup) */}
            <div className="h-full hidden md:block">
              <LogoLoop
                logos={column1Items}
                direction="up"
                speed={60}
                logoHeight={200}
                gap={-120}
                pauseOnHover={false}
                className="h-full"
                ariaLabel="Prediction markets column 5"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-2xl lg:text-xs xl:text-sm font-medium">
            Explore All Markets
          </Button>
        </div>
      </div>
    </div>
  );
});

PredictionMarkets.displayName = 'PredictionMarkets';

export default PredictionMarkets;