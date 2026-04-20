// Component must be re-designed to use the twitter api to fetch posts.

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
interface CommunityCard {
  id: number;
  username: string;
  handle: string;
  content: string;
  imageUrl?: string;
  tag?: string;
  stats: { hearts: number; retweets: number; comments: number };
}

/* ─── Data ─── */
const CARDS: CommunityCard[] = [
  {
    id: 1,
    username: "Cyclespace Exchange",
    handle: "cyclespace_dex",
    tag: "Partnership",
    content:
      "@GMX_IO enters into a Data Partnership with Token Terminal. GMX is a leading permissionless perpetual exchange built on @Arbitrum and @Avax. The protocol serves as a foundational liquidity baselayer for multichain DeFi. With ~$280 billion in notional trading volume and counting, GMX recognized the need for reliable and data-driven stakeholder reporting.",
    imageUrl: "https://placehold.co/600x300/1e3a5f/60a5fa?text=GMX+×+Token+Terminal",
    stats: { hearts: 382, retweets: 141, comments: 56 },
  },
  {
    id: 2,
    username: "Cyclespace Exchange",
    handle: "cyclespace_dex",
    tag: "Protocol",
    content:
      "Arbitrum's ecosystem continues to grow rapidly with new integrations across DeFi infrastructure. Liquidity routing improvements signal a new era of capital efficiency for on-chain traders seeking speed and reliability.",
    imageUrl: "https://placehold.co/600x300/1e2a4a/818cf8?text=Arbitrum+Ecosystem",
    stats: { hearts: 519, retweets: 198, comments: 77 },
  },
  {
    id: 3,
    username: "Cyclespace Exchange",
    handle: "cyclespace_dex",
    tag: "Analytics",
    content:
      "Token Terminal releases its Q2 DeFi report showing record-breaking metrics across perpetual DEXes. Volume, fees, and active traders all hit all-time highs simultaneously in the same quarter.",
    imageUrl: "https://placehold.co/600x300/1a3a2e/4ade80?text=Q2+DeFi+Report",
    stats: { hearts: 294, retweets: 108, comments: 41 },
  },
  {
    id: 4,
    username: "Cyclespace Exchange",
    handle: "cyclespace_dex",
    tag: "Markets",
    content:
      "Multichain liquidity fragmentation is being solved through novel routing layers. The next generation of DEX aggregators is already live, processing billions in monthly volume across multiple chains.",
    imageUrl: "https://placehold.co/600x300/3a2a14/fbbf24?text=Liquidity+Markets",
    stats: { hearts: 167, retweets: 59, comments: 23 },
  },
  {
    id: 5,
    username: "Cyclespace Exchange",
    handle: "cyclespace_dex",
    tag: "Research",
    content:
      "On-chain stakeholder reporting reaches maturity as institutional players demand verifiable, real-time data feeds. Transparency becomes the new competitive moat for DeFi protocols.",
    imageUrl: "https://placehold.co/600x300/3a1a2e/f472b6?text=On-chain+Research",
    stats: { hearts: 441, retweets: 177, comments: 68 },
  },
  {
    id: 6,
    username: "Cyclespace Exchange",
    handle: "cyclespace_dex",
    tag: "Infrastructure",
    content:
      "A new cross-chain bridge architecture cuts latency by 60% while improving security guarantees. The Avax-Arbitrum corridor is now the fastest settlement path in all of DeFi.",
    imageUrl: "https://placehold.co/600x300/2a1a3a/a78bfa?text=Bridge+Infrastructure",
    stats: { hearts: 603, retweets: 248, comments: 94 },
  },
];

const CARD_W = 320;
const CARD_GAP = 16;
const STEP = CARD_W + CARD_GAP;

/* ─── Tag pill (dark-friendly) ─── */
const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Partnership:    { bg: "rgba(96,165,250,0.15)", color: "#60a5fa" },
  Protocol:       { bg: "rgba(129,140,248,0.15)", color: "#818cf8" },
  Analytics:      { bg: "rgba(74,222,128,0.15)", color: "#4ade80" },
  Markets:        { bg: "rgba(251,191,36,0.15)", color: "#fbbf24" },
  Research:       { bg: "rgba(244,114,182,0.15)", color: "#f472b6" },
  Infrastructure: { bg: "rgba(167,139,250,0.15)", color: "#a78bfa" },
};

function DarkTag({ label }: { label: string }) {
  const { bg, color } = TAG_COLORS[label] ?? { bg: "rgba(148,163,184,0.15)", color: "#94a3b8" };
  return (
    <span
      className="inline-block shrink-0 rounded-full px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-[0.07em]"
      style={{ background: bg, color, border: `1px solid ${color}30` }}
    >
      {label}
    </span>
  );
}

/* ─── Dark Avatar ─── */
function DarkAvatar({ tag }: { tag?: string }) {
  const { color } = TAG_COLORS[tag ?? ""] ?? { color: "#3b82f6" };
  return (
    <div
      className="h-[42px] w-[42px] shrink-0 rounded-xl"
      style={{ background: `linear-gradient(135deg,${color}55,${color}22)`, border: `1px solid ${color}44` }}
    />
  );
}

/* ─── Card ─── */
function DarkCard({ card, index, inView }: { card: CommunityCard; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const accentColor = TAG_COLORS[card.tag ?? ""]?.color ?? "#3b82f6";

  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7, scale: 1.015 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex min-w-[320px] max-w-[320px] shrink-0 cursor-pointer flex-col gap-3 overflow-hidden rounded-[22px] p-5 pb-4 transition-all duration-[220ms]"
      style={{
        background: hovered ? "#131f35" : "#0f1929",
        border: `1.5px solid ${hovered ? `${accentColor}50` : "#1e2d45"}`,
        boxShadow: hovered
          ? `0 24px 56px ${accentColor}20, 0 4px 20px rgba(0,0,0,0.4)`
          : "0 4px 20px rgba(0,0,0,0.25)",
        transition: "background .22s, border-color .22s, box-shadow .28s",
      }}
    >
      {/* Glow top bar */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 right-0 z-[2] h-0.5"
            style={{ background: `linear-gradient(90deg,transparent,${accentColor},transparent)` }}
          />
        )}
      </AnimatePresence>

      {/* Shimmer sweep */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ x: "-110%", opacity: 0 }}
            animate={{ x: "210%", opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 z-[1] w-2/5 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center gap-3">
        <DarkAvatar tag={card.tag} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-sans text-[13.5px] font-bold text-slate-100">
            {card.username}
          </p>
          <p className="font-sans text-[11.5px] text-slate-500">@{card.handle}</p>
        </div>
        {card.tag && <DarkTag label={card.tag} />}
      </div>

      {/* Divider */}
      <div
        className="h-px transition-colors duration-300"
        style={{ background: hovered ? `linear-gradient(90deg,${accentColor}40,transparent)` : "#1e2d45" }}
      />

      {/* Text */}
      <p className="flex-1 font-sans text-[12.5px] leading-relaxed text-slate-400">
        {card.content}
      </p>

      {/* Media */}
      {card.imageUrl && (
        <motion.div
          animate={{ scale: hovered ? 1.025 : 1 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
          className="h-[145px] overflow-hidden rounded-xl bg-slate-800"
        >
          <img src={card.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
        </motion.div>
      )}

      {/* Stats */}
      <div className="flex gap-4 pt-0.5">
        {[
          { icon: "♥", val: card.stats.hearts },
          { icon: "↻", val: card.stats.retweets },
          { icon: "✦", val: card.stats.comments },
        ].map(({ icon, val }) => (
          <span key={icon} className="flex items-center gap-1 font-sans text-[11px] text-slate-500">
            <span style={{ color: hovered ? accentColor : "#475569", transition: "color .2s" }}>
              {icon}
            </span>
            {val}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

/* ─── Dark Scroll Button ─── */
function DarkScrollBtn({ dir, onClick, disabled }: { dir: "left" | "right"; onClick: () => void; disabled: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.12, backgroundColor: "#3b82f6", borderColor: "#3b82f6", color: "#fff" } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      className={`
        flex h-11 w-11 shrink-0 items-center justify-center rounded-full
        border-[1.5px] transition-all duration-200
        ${disabled
          ? "border-slate-800 bg-slate-900 text-slate-700"
          : "border-slate-800 bg-slate-900 text-slate-400 hover:bg-blue-500 hover:border-blue-500 hover:text-white"}
      `}
      style={{
        boxShadow: disabled ? "none" : "0 4px 14px rgba(0,0,0,0.35)",
      }}
    >
      {dir === "left" ? "←" : "→"}
    </motion.button>
  );
}

/* ─── Dark Progress Dots ─── */
function DarkDots({ total, active, onDot }: { total: number; active: number; onDot: (i: number) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onDot(i)}
          animate={{ width: i === active ? 26 : 8, background: i === active ? "#3b82f6" : "#1e2d45" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-2 rounded-full border-0 p-0"
          aria-label={`Go to card ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ─── Main ─── */
export default function CommunityPosts() {
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
      <motion.section
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full overflow-hidden bg-black font-sans bg-transparent"
        style={{ paddingTop: "clamp(40px,7vw,88px)", paddingBottom: "clamp(48px,8vw,100px)" }}
      >
        {/* Ambient background glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute hidden -top-32 -right-24 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_65%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute hidden -bottom-24 -left-20 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,transparent_65%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute hidden left-1/2 top-2/5 h-[300px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(14,165,233,0.04)_0%,transparent_70%)]"
        />

        {/* Header */}
        <div className="mb-[clamp(28px,4vw,52px)] px-[clamp(20px,5vw,64px)]">
          <div className="flex flex-wrap items-start justify-between gap-5">
            {/* Title block */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3.5 py-1"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.07em] text-blue-400">
                  Community feed
                </span>
                <span className="inline-block h-1.5 w-1.5 animate-[pulseglow_2.2s_infinite] rounded-full bg-blue-500" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="m-0 text-[clamp(28px,5vw,56px)] font-extrabold leading-[1.06] tracking-[-0.03em]"
              >
                <span className="block text-slate-100">Driven by</span>
                <span className="block text-slate-500">our community</span>
              </motion.h2>
            </div>

            {/* Right: CTA + controls */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex shrink-0 flex-col items-end gap-5"
            >
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: "0 8px 32px rgba(59,130,246,0.45)" }}
                whileTap={{ scale: 0.96 }}
                className="cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-3 font-sans text-sm font-bold tracking-[-0.01em] text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)]"
              >
                Open App ↗
              </motion.button>

              <div className="flex items-center gap-3.5">
                <DarkDots total={CARDS.length} active={activeIndex} onDot={scrollTo} />
                <div className="flex gap-2">
                  <DarkScrollBtn dir="left" onClick={() => scrollTo(activeIndex - 1)} disabled={!canLeft} />
                  <DarkScrollBtn dir="right" onClick={() => scrollTo(activeIndex + 1)} disabled={!canRight} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden pb-1">
          {/* Edge fades */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 bottom-0 z-[3] w-[clamp(32px,4vw,72px)] bg-gradient-to-r from-black to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 bottom-0 z-[3] w-[clamp(32px,4vw,72px)] bg-gradient-to-l from-black to-transparent"
          />

          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ right: 0, left: -maxDrag }}
            dragTransition={{ bounceStiffness: 360, bounceDamping: 38 }}
            dragElastic={0.06}
            whileDrag={{ cursor: "grabbing" }}
            onDragEnd={(_, info) => {
              const newX = Math.max(-maxDrag, Math.min(0, rawX.get() + info.offset.x));
              const snapped = Math.round(-newX / STEP);
              scrollTo(Math.max(0, Math.min(snapped, CARDS.length - 1)));
            }}
            className="flex w-max cursor-grab gap-4 px-[clamp(20px,5vw,64px)]"
            style={{ x: animX }}
          >
            {CARDS.map((card, i) => (
              <DarkCard key={card.id} card={card} index={i} inView={isInView} />
            ))}
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}