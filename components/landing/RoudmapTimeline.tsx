"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from "framer-motion";

// ------------------------------------------------------------------
// Types & Data
// ------------------------------------------------------------------
type MilestoneStatus = "completed" | "live" | "upcoming";

interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  status: MilestoneStatus;
  icon: string;
  previewComponent: JSX.Element;
}

// Enhanced preview components with theme-aware colors
const MainnetLaunchPreview = () => (
  <div className="flex items-center gap-2 text-xs font-mono">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 shadow-lg shadow-green-500/50"
    />
    <span className="text-green-700 dark:text-green-300">Mainnet active</span>
    <motion.span
      animate={{ x: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      🚀
    </motion.span>
    <span className="text-gray-400 dark:text-white/40">|</span>
    <motion.span
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    >
      💧
    </motion.span>
    <span className="text-cyan-700 dark:text-cyan-300">Liquidity mining</span>
  </div>
);

const PredictionV2Preview = () => (
  <div className="flex items-center gap-2 text-xs font-mono">
    <span className="text-purple-700 dark:text-purple-300">Up/Down</span>
    <motion.div
      animate={{ rotateY: [0, 180, 360], scale: [1, 1.2, 1] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    >
      🪙
    </motion.div>
    <span>+</span>
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 0.6, repeat: Infinity }}
    >
      📈
    </motion.div>
    <motion.div
      animate={{ y: [0, 4, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
    >
      📉
    </motion.div>
    <span className="text-gray-400 dark:text-white/40">|</span>
    <motion.span
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="text-amber-700 dark:text-amber-300"
    >
      Real-world events
    </motion.span>
  </div>
);

const CrossChainPerpsPreview = () => (
  <div className="flex items-center gap-2 text-xs font-mono">
    <motion.div
      animate={{ x: [-3, 3, -3] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    >
      ⛓️
    </motion.div>
    <span>⟷</span>
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 0.7, repeat: Infinity }}
    >
      🔁
    </motion.div>
    <div className="flex gap-1">
      <motion.span whileHover={{ scale: 1.1 }} className="cursor-default">ETH</motion.span>
      <span>/</span>
      <motion.span whileHover={{ scale: 1.1 }} className="cursor-default">SOL</motion.span>
      <span>/</span>
      <motion.span whileHover={{ scale: 1.1 }} className="cursor-default">AVAX</motion.span>
    </div>
  </div>
);

const MobileAppPreview = () => (
  <div className="flex items-center gap-2 text-xs font-mono">
    <motion.div
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      📱
    </motion.div>
    <span>iOS + Android</span>
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    >
      👆
    </motion.div>
    <span className="text-gray-400 dark:text-white/40">|</span>
    <motion.span
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1, repeat: Infinity }}
      className="text-emerald-700 dark:text-emerald-300"
    >
      Biometric login
    </motion.span>
  </div>
);

const milestones: Milestone[] = [
  {
    id: "mainnet",
    title: "Mainnet Launch",
    description: "Perpetual swaps go live with BTC, ETH, SOL markets. Liquidity mining begins.",
    date: "Q2 2025",
    status: "completed",
    icon: "🌐",
    previewComponent: <MainnetLaunchPreview />,
  },
  {
    id: "prediction-v2",
    title: "Prediction Markets V2",
    description: "Add crypto price predictions, election markets, and event-based binary options.",
    date: "Q3 2025",
    status: "live",
    icon: "🔮",
    previewComponent: <PredictionV2Preview />,
  },
  {
    id: "cross-chain",
    title: "Cross-chain Perpetuals",
    description: "Trade perps from any chain: Ethereum, Solana, Avalanche. Unified margin accounts.",
    date: "Q4 2025",
    status: "upcoming",
    icon: "⛓️",
    previewComponent: <CrossChainPerpsPreview />,
  },
  {
    id: "mobile",
    title: "Mobile App",
    description: "Native iOS/Android app with biometric login and push notifications.",
    date: "Q1 2026",
    status: "upcoming",
    icon: "📱",
    previewComponent: <MobileAppPreview />,
  },
];

// ------------------------------------------------------------------
// Timeline Item Component (theme‑aware)
// ------------------------------------------------------------------
const TimelineItem = ({ milestone, index, onItemReady }: { milestone: Milestone; index: number; onItemReady?: (id: string, yPosition: number) => void }) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px 0px" });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (iconRef.current && onItemReady) {
      const rect = iconRef.current.getBoundingClientRect();
      const containerRect = itemRef.current?.parentElement?.parentElement?.getBoundingClientRect();
      if (containerRect) {
        const y = rect.top + window.scrollY - containerRect.top - window.scrollY;
        onItemReady(milestone.id, y);
      }
    }
  }, [milestone.id, onItemReady]);

  const itemVariants = {
    hidden: { opacity: 0, x: -40, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 80, damping: 15, delay: index * 0.12 },
    },
  };

  const checkmarkVariants = {
    hidden: { rotate: -180, scale: 0, opacity: 0 },
    visible: {
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.25 },
    },
  };

  return (
    <motion.li
      ref={itemRef}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative pl-8 pb-12 last:pb-0 group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        ref={iconRef}
        className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 dark:from-cyan-500/20 dark:to-blue-600/20 border-2 border-cyan-500/50 dark:border-cyan-400/50 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400"
      >
        <span className="text-xl">{milestone.icon}</span>
      </div>

      <div className="ml-8 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:border-white/10 transition-all duration-500 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-cyan-800 dark:from-white dark:to-cyan-300 bg-clip-text text-transparent">
            {milestone.title}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-gray-500 dark:text-white/40">{milestone.date}</span>
            {milestone.status === "completed" && (
              <motion.div
                variants={checkmarkVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center shadow-md shadow-green-500/20"
              >
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
            {milestone.status === "live" && (
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/30 text-cyan-800 dark:text-cyan-300 shadow-sm shadow-cyan-500/20 animate-pulse">
                LIVE
              </span>
            )}
          </div>
        </div>
        <p className="text-gray-700 dark:text-white/70 text-sm mt-3 leading-relaxed">{milestone.description}</p>

        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mt-4 pt-4 border-t border-gray-200 dark:border-white/15"
          >
            {milestone.previewComponent}
          </motion.div>
        )}
      </div>
    </motion.li>
  );
};

// ------------------------------------------------------------------
// Main Timeline Component (theme‑aware)
// ------------------------------------------------------------------
export default function RoadmapTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLUListElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [linePoints, setLinePoints] = useState<number[]>([]);
  const [lineLength, setLineLength] = useState(0);

  const handleItemReady = useCallback((id: string, y: number) => {
    setLinePoints(prev => {
      const index = milestones.findIndex(m => m.id === id);
      const newPoints = [...prev];
      newPoints[index] = y + 24;
      return newPoints;
    });
  }, []);

  useEffect(() => {
    if (linePoints.length === milestones.length && linePoints.every(p => p !== undefined)) {
      const pathData = linePoints.map((y, i) => `${i === 0 ? 'M' : 'L'} 24 ${y}`).join(' ');
      if (svgRef.current) {
        const path = svgRef.current.querySelector('path');
        if (path) {
          path.setAttribute('d', pathData);
          setLineLength(path.getTotalLength());
        }
      }
    }
  }, [linePoints]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 80%"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const dashOffset = useTransform(smoothProgress, [0, 1], [lineLength, 0]);

  const rotateRing = useTransform(smoothProgress, [0, 1], [0, 360]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ringRotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const ringRotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-950 dark:to-black overflow-hidden"
    >
      {/* Orbital ring background – theme‑aware */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          style={{
            rotate: rotateRing,
            rotateX: ringRotateX,
            rotateY: ringRotateY,
            transformStyle: "preserve-3d",
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="relative w-[1000px] h-[1000px] md:w-[1400px] md:h-[1400px] rounded-full"
        >
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 dark:border-cyan-500/20 shadow-[0_0_50px_rgba(0,255,255,0.1)]" />
          <div className="absolute inset-[10%] rounded-full border border-purple-500/40 dark:border-purple-500/30 animate-spin-slow" style={{ animationDirection: "reverse" }} />
          <div className="absolute inset-[25%] rounded-full border border-pink-500/30 dark:border-pink-500/20 animate-spin-slower" />
          <div className="absolute inset-[40%] rounded-full border border-amber-500/20 dark:border-amber-500/10" />

          {/* Orbiting particles – adapt to light mode */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400 shadow-lg shadow-cyan-500/50"
              animate={{
                x: [0, Math.sin(i) * 300, 0],
                y: [0, Math.cos(i) * 300, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 15 + i,
                repeat: Infinity,
                ease: "linear",
                delay: i,
              }}
              style={{
                left: "50%",
                top: "50%",
                marginLeft: -4,
                marginTop: -4,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-500 bg-clip-text text-transparent">
            Cycle Phases
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 dark:text-white/60 mt-4 max-w-2xl mx-auto">
            Our journey to decentralize perpetuals & predictions — one milestone at a time.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical connector line with theme‑aware dash */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-white/10 md:left-7">
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full"
              style={{ overflow: "visible" }}
            >
              <path
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray={lineLength}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" /> {/* cyan-500 */}
                  <stop offset="50%" stopColor="#a855f7" /> {/* purple-500 */}
                  <stop offset="100%" stopColor="#ec4899" /> {/* pink-500 */}
                </linearGradient>
              </defs>
            </svg>
          </div>

          <ul ref={timelineRef} className="relative">
            {milestones.map((milestone, idx) => (
              <TimelineItem
                key={milestone.id}
                milestone={milestone}
                index={idx}
                onItemReady={handleItemReady}
              />
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slower {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 40s linear infinite;
        }
      `}</style>
    </section>
  );
}