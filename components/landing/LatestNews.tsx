"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TweetCard {
  id: number;
  username: string;
  handle: string;
  content: string;
  imageUrl?: string;
  tag?: string;
  stats: { hearts: number; retweets: number; comments: number };
}

const CARDS: TweetCard[] = [
  {
    id: 1,
    username: "Cyclespace Exchange",
    handle: "cyclespace_dex",
    tag: "Partnership",
    content:
      "@GMX_IO enters into a Data Partnership with Token Terminal. GMX is a leading permissionless perpetual exchange built on @Arbitrum and @Avax. The protocol serves as a foundational liquidity baselayer for multichain DeFi.",
    imageUrl: "https://placehold.co/600x300/e0f2fe/0369a1?text=GMX+×+Token+Terminal",
    stats: { hearts: 248, retweets: 91, comments: 34 },
  },
  {
    id: 2,
    username: "Cyclespace Exchange",
    handle: "cyclespace_dex",
    tag: "Protocol",
    content:
      "Arbitrum's ecosystem continues to grow rapidly with new integrations across DeFi infrastructure. Liquidity routing improvements signal a new era of capital efficiency for on-chain traders.",
    imageUrl: "https://placehold.co/600x300/dbeafe/3b82f6?text=Arbitrum+Ecosystem",
    stats: { hearts: 512, retweets: 178, comments: 62 },
  },
  {
    id: 3,
    username: "Cyclespace Exchange",
    handle: "cyclespace_dex",
    tag: "Analytics",
    content:
      "Token Terminal releases its Q2 DeFi report showing record-breaking metrics across perpetual DEXes. Volume, fees, and active traders all hit all-time highs in the same quarter.",
    imageUrl: "https://placehold.co/600x300/dcfce7/15803d?text=Q2+DeFi+Report",
    stats: { hearts: 391, retweets: 143, comments: 47 },
  },
  {
    id: 4,
    username: "Cyclespace Exchange",
    handle: "cyclespace_dex",
    tag: "Markets",
    content:
      "Multichain liquidity fragmentation is being solved through novel routing layers. The next generation of DEX aggregators is already live and processing billions in monthly volume.",
    imageUrl: "https://placehold.co/600x300/fef3c7/b45309?text=Liquidity+Markets",
    stats: { hearts: 187, retweets: 64, comments: 28 },
  },
  {
    id: 5,
    username: "Cyclespace Exchange",
    handle: "cyclespace_dex",
    tag: "Research",
    content:
      "On-chain stakeholder reporting reaches maturity as institutional players demand verifiable, real-time data feeds. Transparency becomes the new competitive moat for protocols.",
    imageUrl: "https://placehold.co/600x300/fce7f3/be185d?text=On-chain+Research",
    stats: { hearts: 329, retweets: 112, comments: 55 },
  },
  {
    id: 6,
    username: "Cyclespace Exchange",
    handle: "cyclespace_dex",
    tag: "Infrastructure",
    content:
      "A new cross-chain bridge architecture cuts latency by 60% while improving security guarantees. The Avax-Arbitrum corridor is now the fastest settlement path in DeFi.",
    imageUrl: "https://placehold.co/600x300/ede9fe/6d28d9?text=Bridge+Infrastructure",
    stats: { hearts: 445, retweets: 201, comments: 73 },
  },
];

const CARD_W = 316;
const CARD_GAP = 18;
const STEP = CARD_W + CARD_GAP;

function TagPill({ label }: { label: string }) {
  return (
    <span className="inline-block shrink-0 rounded-full bg-gray-200 dark:bg-slate-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
      {label}
    </span>
  );
}

function Avatar() {
  return <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-200 dark:bg-slate-700" />;
}

function TweetCardItem({ card, index, inView }: { card: TweetCard; index: number; inView: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 44, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-[316px] shrink-0 flex-col gap-3 rounded-2xl border border-zinc-200 dark:border-slate-700 bg-zinc-100 dark:bg-slate-900 p-5 pb-4"
    >
      <div className="flex items-center gap-3">
        <Avatar />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-gray-900 dark:text-white">{card.username}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">@{card.handle}</p>
        </div>
        {card.tag && <TagPill label={card.tag} />}
      </div>

      <div className="h-px bg-gray-300 dark:bg-slate-700" />

      <p className="flex-1 text-xs leading-relaxed text-gray-700 dark:text-gray-300">{card.content}</p>

      {card.imageUrl && (
        <div className="h-[145px] overflow-hidden rounded-lg bg-gray-300 dark:bg-slate-700">
          <img src={card.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
        </div>
      )}

      <div className="flex gap-4 pt-0.5">
        {[
          { icon: "♥", val: card.stats.hearts },
          { icon: "↻", val: card.stats.retweets },
          { icon: "✦", val: card.stats.comments },
        ].map(({ icon, val }) => (
          <span key={icon} className="flex items-center gap-1 text-xs text-gray-500">
            {icon} {val}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

function ScrollBtn({
  dir,
  onClick,
  disabled,
}: {
  dir: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 transition hover:bg-gray-100 dark:hover:bg-slate-700 ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {dir === "left" ? <ChevronLeft className=""/> : <ChevronRight className="" />}
    </button>
  );
}

function Dots({ total, active, onDot }: { total: number; active: number; onDot: (i: number) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDot(i)}
          className={`h-2 rounded-full transition-all ${
            i === active ? "w-6 bg-blue-500" : "w-2 bg-gray-300"
          }`}
          aria-label={`Go to card ${i + 1}`}
        />
      ))}
    </div>
  );
}

export default function LatestNews() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [activeIndex, setActiveIndex] = useState(0);
  const [maxDrag, setMaxDrag] = useState(0);

  const rawX = useMotionValue(0);
  const animX = useSpring(rawX, { stiffness: 300, damping: 34, mass: 0.9 });

  const calcMax = useCallback(() => {
    const cw = trackRef.current?.parentElement?.clientWidth ?? 1200;
    return Math.max(0, CARDS.length * STEP - cw + 80);
  }, []);

  useEffect(() => {
    const update = () => setMaxDrag(calcMax());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [calcMax]);

  useEffect(() => {
    return animX.on("change", (v) => {
      const idx = Math.round(-v / STEP);
      setActiveIndex(Math.max(0, Math.min(idx, CARDS.length - 1)));
    });
  }, [animX]);

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, CARDS.length - 1));
    const offset = Math.min(clamped * STEP, maxDrag);
    rawX.set(-offset);
    setActiveIndex(clamped);
  };

  const canLeft = activeIndex > 0;
  const canRight = activeIndex < CARDS.length - 1;

  return (
    <section ref={sectionRef} className="w-full bg-white dark:bg-black py-20">
      <div className="mb-10 px-6 md:px-70 justify-center w-full">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">Weekly headlines</h2>

          <div className="flex shrink-0 items-center gap-3">
            <div className="flex gap-2">
              <ScrollBtn dir="left" onClick={() => scrollTo(activeIndex - 1)} disabled={!canLeft} />
              <ScrollBtn dir="right" onClick={() => scrollTo(activeIndex + 1)} disabled={!canRight} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 bg-linear-to-r from-white to-transparent dark:bg-linear-to-r dark:from-black dark:to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 bg-linear-to-l from-white to-transparent dark:bg-linear-to-l dark:from-black dark:to-transparent"
          aria-hidden
        />

        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ right: 0, left: -maxDrag }}
          dragTransition={{ bounceStiffness: 360, bounceDamping: 38 }}
          dragElastic={0.07}
          whileDrag={{ cursor: "grabbing" }}
          onDragEnd={(_, info) => {
            const newX = Math.max(-maxDrag, Math.min(0, rawX.get() + info.offset.x));
            const snapped = Math.round(-newX / STEP); 
            scrollTo(Math.max(0, Math.min(snapped, CARDS.length - 1)));
          }}
          className="flex w-max cursor-grab gap-[18px] px-6 md:px-12"
          style={{ x: animX }}
        >
          {CARDS.map((card, i) => (
            <TweetCardItem key={card.id} card={card} index={i} inView={isInView} />
          ))}
        </motion.div>

        <div className=" w-full h-full justify-center flex mt-6">
          <Dots total={CARDS.length} active={activeIndex} onDot={scrollTo} />
        </div>

      </div>
    </section>
  );
}