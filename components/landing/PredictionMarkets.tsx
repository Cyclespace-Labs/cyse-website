'use client';

import React, { useMemo } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { LogoLoop } from '../LogoLoop';
import Image from 'next/image';
import { Activity, Trophy, TrendingUp, Globe, Zap } from 'lucide-react';

interface PredictionOption {
  name: string;
  probability: number;
}

interface PredictionCard {
  id: string;
  category: string;
  categoryIcon: React.ReactNode;
  categoryColor?: string;
  title: string;
  options: PredictionOption[];
  volume?: string;
  isLive?: boolean;
  isNew?: boolean;
  endDate?: string;
  image?: string;
  chartData?: number[];
}

const predictionData: PredictionCard[] = [
  {
    id: '1',
    category: 'Sports',
    categoryIcon: <Trophy className="w-3 h-3" />,
    title: 'The Masters - Winner',
    options: [
      { name: 'Rory McIlroy', probability: 24 },
      { name: 'Scottie Scheffler', probability: 20 },
    ],
    volume: '$102M Vol.',
  },
  {
    id: '2',
    category: 'Crypto',
    categoryIcon: <TrendingUp className="w-3 h-3" />,
    categoryColor: '#F7931A',
    title: 'BTC 5 Minute Up or Down',
    options: [
      { name: 'Up', probability: 47 },
    ],
    isLive: true,
    volume: '$2.1M Vol.',
    image: '/tokens/Bitcoin.svg',
    chartData: [40, 45, 42, 48, 47, 50, 47],
  },
  {
    id: '3',
    category: 'Politics',
    categoryIcon: <Globe className="w-3 h-3" />,
    title: 'Peru Presidential Election Winner',
    options: [
      { name: 'Keiko Fujimori', probability: 31 },
      { name: 'Ricardo Belmont', probability: 21 },
    ],
    volume: '$11M Vol.',
  },
  {
    id: '4',
    category: 'Sports',
    categoryIcon: <Trophy className="w-3 h-3" />,
    title: 'Hanwha Life Esports vs BNK FEARX',
    options: [
      { name: 'Hanwha Life', probability: 66 },
      { name: 'BNK FEARX', probability: 35 },
    ],
    isLive: true,
    volume: '$2M Vol.',
  },
  {
    id: '5',
    category: 'Sports',
    categoryIcon: <Trophy className="w-3 h-3" />,
    title: 'LNG Esports vs EDward Gaming',
    options: [
      { name: 'LNG Esports', probability: 60 },
      { name: 'EDward Gaming', probability: 41 },
    ],
    isLive: true,
    volume: '$2M Vol.',
  },
  {
    id: '6',
    category: 'Sports',
    categoryIcon: <Trophy className="w-3 h-3" />,
    title: 'Joao Fonseca vs Alexander Zverev',
    options: [
      { name: 'Joao', probability: 31 },
      { name: 'Alexander', probability: 70 },
    ],
    volume: '$1M Vol.',
  },
  {
    id: '7',
    category: 'Sports',
    categoryIcon: <Trophy className="w-3 h-3" />,
    title: 'Nigma Galaxy vs Team Liquid',
    options: [
      { name: 'Nigma', probability: 35 },
      { name: 'Team Liquid', probability: 66 },
    ],
    volume: '$477K Vol.',
  },
  {
    id: '8',
    category: 'Sports',
    categoryIcon: <Trophy className="w-3 h-3" />,
    title: '3DMAX vs Astralis',
    options: [
      { name: '3DMAX', probability: 30 },
      { name: 'Astralis', probability: 71 },
    ],
    volume: '$165K Vol.',
  },
  {
    id: '9',
    category: 'Politics',
    categoryIcon: <Globe className="w-3 h-3" />,
    title: 'Next Prime Minister of Hungary',
    options: [
      { name: 'Péter Magyar', probability: 71 },
      { name: 'Viktor Orbán', probability: 30 },
    ],
    volume: '$58M Vol.',
  },
  {
    id: '10',
    category: 'Politics',
    categoryIcon: <Globe className="w-3 h-3" />,
    title: 'Hungary Parliamentary Election Winner',
    options: [
      { name: 'TISZA', probability: 77 },
      { name: 'Fidesz-KDNP', probability: 24 },
    ],
    volume: '$59M Vol.',
  },
  {
    id: '11',
    category: 'Sports',
    categoryIcon: <Trophy className="w-3 h-3" />,
    title: '2026 FIFA World Cup Winner',
    options: [
      { name: 'Spain', probability: 15 },
      { name: 'France', probability: 15 },
    ],
    volume: '$559M Vol.',
  },
  {
    id: '12',
    category: 'Politics',
    categoryIcon: <Globe className="w-3 h-3" />,
    title: 'Will US withdraw from NATO by...',
    options: [
      { name: 'Yes', probability: 13 },
      { name: 'No', probability: 88 },
    ],
    endDate: 'December 31',
    volume: '$3M Vol.',
  },
  {
    id: '13',
    category: 'Crypto',
    categoryIcon: <Zap className="w-3 h-3" />,
    title: 'Strait of Hormuz traffic returns...',
    options: [
      { name: 'Yes', probability: 21 },
    ],
    volume: '$6M Vol.',
  },
  {
    id: '14',
    category: 'Politics',
    categoryIcon: <Globe className="w-3 h-3" />,
    title: 'Iran x Israel/US conflict ends by...',
    options: [
      { name: 'Yes', probability: 94 },
      { name: 'No', probability: 86 },
    ],
    endDate: 'December 31',
    volume: '$32M Vol.',
  },
  {
    id: '15',
    category: 'Crypto',
    categoryIcon: <Activity className="w-3 h-3" />,
    title: 'WTI Crude Oil price in April 2026?',
    options: [
      { name: '$100', probability: 100 },
      { name: '$95', probability: 90 },
    ],
    volume: '$21M Vol.',
  },
  {
    id: '16',
    category: 'Politics',
    categoryIcon: <Globe className="w-3 h-3" />,
    title: 'US x Iran permanent peace deal by...',
    options: [
      { name: 'May 31', probability: 35 },
      { name: 'April 30', probability: 20 },
    ],
    isNew: true,
    volume: '$455K Vol.',
  },
];

const PredictionCardComponent = React.memo(({ card }: { card: PredictionCard }) => {
  const getCategoryColor = () => {
    switch (card.category) {
      case 'Sports': return 'text-emerald-600 dark:text-emerald-400';
      case 'Crypto': return 'text-orange-600 dark:text-orange-400';
      case 'Politics': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-zinc-600 dark:text-zinc-400';
    }
  };

  const getCategoryBg = () => {
    switch (card.category) {
      case 'Sports': return 'bg-emerald-50 dark:bg-emerald-950';
      case 'Crypto': return 'bg-orange-50 dark:bg-orange-950';
      case 'Politics': return 'bg-blue-50 dark:bg-blue-950';
      default: return 'bg-zinc-50 dark:bg-slate-800';
    }
  };

  return (
    <Card className={`w-[300px] md:w-[260px] h-[200px] py-2 bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
      <CardContent className="p-4 h-full flex flex-col justify-between">
        {/* Title and Category */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-block text-[10px] font-semibold uppercase tracking-wide ${getCategoryColor()}`}>
              {card.category}
            </span>
            {card.isLive && (
              <span className="flex items-center gap-0.5 text-[10px] text-red-500 font-medium">
                <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                LIVE
              </span>
            )}
            {card.isNew && (
              <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">NEW</span>
            )}
          </div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight line-clamp-2 mb-2">
            {card.title}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {card.options.map((option, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold text-zinc-900 dark:text-white">
                    {option.name}
                  </span>
                  <span className="text-[12px] font-bold text-zinc-900 dark:text-white">
                    {option.probability}%
                  </span>
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded">Yes</span>
                <span className="text-[9px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 px-2 py-1 rounded">No</span>
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
  );
});

PredictionCardComponent.displayName = 'PredictionCardComponent';

const PredictionMarkets = React.memo(() => {
  // Memoize column splits to prevent re-creation
  const { column1, column2, column3, column4 } = useMemo(() => ({
    column1: predictionData.slice(0, 4),
    column2: predictionData.slice(4, 8),
    column3: predictionData.slice(8, 12),
    column4: predictionData.slice(12, 16),
  }), []);

  // Memoize column items for each LogoLoop - critical for performance
  const column1Items = useMemo(() => 
    column1.map((card) => ({ node: <PredictionCardComponent card={card} />, ariaLabel: card.title })),
    [column1]
  );
  const column2Items = useMemo(() => 
    column2.map((card) => ({ node: <PredictionCardComponent card={card} />, ariaLabel: card.title })),
    [column2]
  );
  const column3Items = useMemo(() => 
    column3.map((card) => ({ node: <PredictionCardComponent card={card} />, ariaLabel: card.title })),
    [column3]
  );
  const column4Items = useMemo(() => 
    column4.map((card) => ({ node: <PredictionCardComponent card={card} />, ariaLabel: card.title })),
    [column4]
  );

  // Memoize header
  const header = useMemo(() => (
    <div className="mb-12 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-b from-black via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400">
        Prediction Markets
      </h2>
      <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-slate-400 max-w-2xl mx-auto">
        Bet on the outcome of real-world events. Sports, crypto, politics, and more.
      </p>
    </div>
  ), []);

  return (
    <div className="w-full py-16 md:py-24 font-sans justify-center">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-fit h-[500px] md:h-[600px] items-center overflow-hidden">
            {/* Column 1 - scrolls down */}
            <div className="h-full w-full ">
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
                speed={45}
                logoHeight={200}
                gap={-120}
                pauseOnHover={false}
                className="h-full"
                ariaLabel="Prediction markets column 4"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium">
            Explore All Markets
          </Button>
        </div>
      </div>
    </div>
  );
});

PredictionMarkets.displayName = 'PredictionMarkets';

export default PredictionMarkets;
