"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";

/* ─── Types ─── */
interface TweetCard {
  id: number;
  username: string;
  handle: string;
  content: string;
  imageUrl?: string;
  tag?: string;
  stats: { hearts: number; retweets: number; comments: number };
}

/* ─── Data ─── */
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

/* ─── Tag pill ─── */
function TagPill({ label }: { label: string }) {
  const palette: Record<string, { bg: string; color: string }> = {
    Partnership: { bg: "#e0f2fe", color: "#0369a1" },
    Protocol:    { bg: "#dbeafe", color: "#1d4ed8" },
    Analytics:   { bg: "#dcfce7", color: "#15803d" },
    Markets:     { bg: "#fef3c7", color: "#b45309" },
    Research:    { bg: "#fce7f3", color: "#be185d" },
    Infrastructure: { bg: "#ede9fe", color: "#6d28d9" },
  };
  const { bg, color } = palette[label] ?? { bg: "#f1f5f9", color: "#475569" };
  return (
    <span
      style={{
        display: "inline-block",
        background: bg,
        color,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        padding: "3px 9px",
        borderRadius: 99,
        fontFamily: "'Sora',sans-serif",
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  );
}

/* ─── Avatar ─── */
function Avatar() {
  return (
    <div className="h-[42px] w-[42px] shrink-0 rounded-xl bg-gradient-to-br from-slate-300 to-slate-400" />
  );
}

/* ─── Card ─── */
function TweetCardItem({
  card,
  index,
  inView,
}: {
  card: TweetCard;
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, y: 44, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.015 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`
        relative min-w-[316px] max-w-[316px] shrink-0
        flex flex-col gap-3
        rounded-[22px] p-5 pb-4
        transition-all duration-[220ms]
        ${hovered
          ? "bg-white border-sky-200 shadow-[0_24px_56px_rgba(14,165,233,0.13),0_4px_16px_rgba(0,0,0,0.05)]"
          : "bg-slate-50 border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"}
        border-[1.5px]
        cursor-pointer
      `}
    >
      {/* Shimmer */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ x: "-110%", opacity: 0 }}
            animate={{ x: "210%", opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 z-10 w-[45%] bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center gap-3">
        <Avatar />
        <div className="min-w-0 flex-1">
          <p className="truncate font-sans text-[13.5px] font-bold text-slate-900">
            {card.username}
          </p>
          <p className="font-sans text-[11.5px] text-slate-400">
            @{card.handle}
          </p>
        </div>
        {card.tag && <TagPill label={card.tag} />}
      </div>

      {/* Divider */}
      <div className={`
        h-px transition-colors duration-300
        ${hovered ? "bg-gradient-to-r from-sky-200 to-transparent" : "bg-slate-100"}
      `} />

      {/* Text */}
      <p className="flex-1 font-sans text-[12.5px] leading-relaxed text-slate-600">
        {card.content}
      </p>

      {/* Media */}
      {card.imageUrl && (
        <motion.div
          animate={{ scale: hovered ? 1.025 : 1 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
          className="h-[145px] overflow-hidden rounded-xl bg-slate-200"
        >
          <img
            src={card.imageUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>
      )}

      {/* Stats */}
      <div className="flex gap-4 pt-0.5">
        {[
          { icon: "♥", val: card.stats.hearts },
          { icon: "↻", val: card.stats.retweets },
          { icon: "✦", val: card.stats.comments },
        ].map(({ icon, val }) => (
          <span
            key={icon}
            className="flex items-center gap-1 font-sans text-[11px] text-slate-400"
          >
            <span>{icon}</span>{val}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

/* ─── Scroll Button ─── */
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
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.12, backgroundColor: "#0f172a", color: "#fff" } : {}}
      whileTap={!disabled ? { scale: 0.92 } : {}}
      className={`
        flex h-11 w-11 shrink-0 items-center justify-center rounded-full
        border-[1.5px] transition-all duration-200
        ${disabled
          ? "border-slate-200 bg-slate-50 text-slate-200"
          : "border-slate-200 bg-white text-slate-900 shadow-[0_2px_10px_rgba(0,0,0,0.07)] hover:bg-slate-900 hover:text-white hover:shadow-none"
        }
      `}
    >
      {dir === "left" ? "←" : "→"}
    </motion.button>
  );
}

/* ─── Progress Dots ─── */
function Dots({ total, active, onDot }: { total: number; active: number; onDot: (i: number) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onDot(i)}
          animate={{ width: i === active ? 26 : 8, background: i === active ? "#0ea5e9" : "#e2e8f0" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-2 rounded-full border-0 p-0"
          aria-label={`Go to card ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ─── Main ─── */
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        @keyframes softpulse {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:.5;transform:scale(1.5)}
        }
        .animate-softpulse {
          animation: softpulse 2s infinite;
        }
      `}</style>

      <motion.section
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full overflow-hidden bg-white font-sans"
        style={{ paddingTop: "clamp(40px,7vw,88px)", paddingBottom: "clamp(48px,8vw,100px)" }}
      >
        {/* Decorative ambient blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.07)_0%,transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-16 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_70%)]"
        />

        {/* Header */}
        <div className="mb-[clamp(24px,4vw,48px)] px-[clamp(20px,5vw,64px)]">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3.5 hidden items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.07em] text-sky-700">
              Latest updates
            </span>
            <span className="inline-block h-1.5 w-1.5 animate-softpulse rounded-full bg-sky-500" />
          </motion.div>

          {/* Title + controls */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="m-0 text-[clamp(28px,5vw,54px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-slate-900"
            >
              <h1
                className="w-xl text-center text-3xl font-bold leading-tight
                  bg-linear-to-b from-black via-slate-800 to-slate-700
                  dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400
                  bg-clip-text text-transparent md:text-4xl"
              >
                Weekly headlines
              </h1>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="flex shrink-0 items-center gap-3.5"
            >
              <Dots total={CARDS.length} active={activeIndex} onDot={scrollTo} />
              <div className="flex gap-2">
                <ScrollBtn dir="left" onClick={() => scrollTo(activeIndex - 1)} disabled={!canLeft} />
                <ScrollBtn dir="right" onClick={() => scrollTo(activeIndex + 1)} disabled={!canRight} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden pb-1">
          {/* Fade edges */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 bottom-0 z-[3] w-[clamp(32px,4vw,72px)] bg-gradient-to-r from-white to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 bottom-0 z-[3] w-[clamp(32px,4vw,72px)] bg-gradient-to-l from-white to-transparent"
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
            className="flex w-max cursor-grab gap-[18px] px-[clamp(20px,5vw,64px)]"
            style={{ x: animX }}
          >
            {CARDS.map((card, i) => (
              <TweetCardItem key={card.id} card={card} index={i} inView={isInView} />
            ))}
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}