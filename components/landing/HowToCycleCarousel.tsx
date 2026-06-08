"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring, useAnimationFrame, PanInfo } from "framer-motion";

// ------------------------------------------------------------------
// Types & Data
// ------------------------------------------------------------------
type FeatureId = "perps" | "predictions" | "yield";

interface Feature {
  id: FeatureId;
  title: string;
  description: string;
  diagram: (isCentered: boolean) => JSX.Element;
}

// ------------------------------------------------------------------
// Diagram Components (each receives `isCentered` to optionally enhance animation)
// ------------------------------------------------------------------

// 1. Perps: moving leverage slider + liquidation simulation
const PerpsDiagram = ({ isCentered }: { isCentered: boolean }) => {
  const [leverage, setLeverage] = useState(1);
  const time = useMotionValue(0);
  const startTime = useRef<number | null>(null);

  useAnimationFrame((timestamp) => {
    if (!startTime.current) startTime.current = timestamp;
    const elapsed = (timestamp - startTime.current) / 1000;
    time.set(elapsed);
  });

  const rawLeverage = useTransform(time, (t) => (Math.sin(t * 0.8) + 1) / 2); // 0..1
  useEffect(() => {
    const unsubscribe = rawLeverage.onChange((v) => {
      setLeverage(Math.floor(v * 100) + 1); // 1..100x
    });
    return unsubscribe;
  }, [rawLeverage]);

  // Simulated liquidation distance (inverse relationship with leverage)
  const liquidationDistance = (100 / leverage).toFixed(1);

  return (
    <div className="w-full mt-4 space-y-3">
      <div className="flex justify-between text-xs text-white/70">
        <span>Leverage</span>
        <span className="text-cyan-300 font-mono">{leverage}x</span>
      </div>
      <div className="relative h-1.5 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
          style={{ width: useTransform(rawLeverage, (v) => `${v * 100}%`) }}
        />
        <motion.div
          className="absolute top-0 w-3 h-3 bg-white rounded-full -mt-0.5"
          style={{ left: useTransform(rawLeverage, (v) => `${v * 100}%`) }}
        />
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-white/50">Liquidation at</span>
        <span className="text-red-400 font-mono">-{liquidationDistance}%</span>
      </div>
      <motion.div
        animate={{ scale: isCentered ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 0.5, repeat: isCentered ? Infinity : 0 }}
        className="text-[10px] text-center text-cyan-300/80 mt-2"
      >
        {isCentered ? "⚡ High risk, high reward" : "Adjustable leverage"}
      </motion.div>
    </div>
  );
};

// 2. Predictions: up/down arrows flipping a coin / bar chart
const PredictionsDiagram = ({ isCentered }: { isCentered: boolean }) => {
  const [flip, setFlip] = useState(false);
  const [outcome, setOutcome] = useState<"UP" | "DOWN">("UP");

  useEffect(() => {
    if (!isCentered) return;
    const interval = setInterval(() => {
      setFlip(true);
      setTimeout(() => {
        setOutcome(Math.random() > 0.5 ? "UP" : "DOWN");
        setFlip(false);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, [isCentered]);

  return (
    <div className="w-full mt-4">
      <div className="flex justify-center items-center gap-6">
        <div className="text-center">
          <motion.div
            animate={{ rotateY: flip ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ transformStyle: "preserve-3d" }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/30 to-green-500/10 border border-green-400/50 flex items-center justify-center text-2xl"
          >
            {outcome === "UP" ? "🔼" : "🔽"}
          </motion.div>
          <div className="text-xs mt-1 text-white/60">Binary outcome</div>
        </div>
        <div className="flex-1 h-16 flex items-end gap-1">
          {[40, 65, 30, 85, 55, 70, 45].map((height, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-cyan-400/60 rounded-t"
              animate={{
                height: isCentered ? [height, height + 10, height] : height,
              }}
              transition={{ duration: 1, repeat: isCentered ? Infinity : 0, delay: i * 0.1 }}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
      <div className="text-[10px] text-center text-purple-300/80 mt-3">
        {isCentered ? "Live price prediction" : "Up/Down markets"}
      </div>
    </div>
  );
};

// 3. Yield: staking pool progress ring filling up
const YieldDiagram = ({ isCentered }: { isCentered: boolean }) => {
  const [progress, setProgress] = useState(0);
  const time = useMotionValue(0);
  const startTime = useRef<number | null>(null);

  useAnimationFrame((timestamp) => {
    if (!startTime.current) startTime.current = timestamp;
    const elapsed = (timestamp - startTime.current) / 1000;
    time.set(elapsed);
  });

  const rawProgress = useTransform(time, (t) => (Math.sin(t * 0.3) + 1) / 2);
  useEffect(() => {
    const unsubscribe = rawProgress.onChange((v) => setProgress(v));
    return unsubscribe;
  }, [rawProgress]);

  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = useTransform(rawProgress, (v) => circumference * (1 - v));

  return (
    <div className="w-full mt-4 flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="white/20"
            strokeWidth="6"
            fill="none"
          />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke="url(#yieldGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            style={{ strokeDashoffset, strokeDasharray: circumference }}
          />
          <defs>
            <linearGradient id="yieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-lg font-bold text-amber-300"
            animate={{ scale: isCentered ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 1, repeat: isCentered ? Infinity : 0 }}
          >
            {Math.floor(progress * 100)}%
          </motion.span>
        </div>
      </div>
      <div className="text-[10px] text-center text-amber-300/80 mt-2">
        {isCentered ? "Compounding APR active" : "Staking pool yield"}
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// Feature Card Component
// ------------------------------------------------------------------
interface CardProps {
  feature: Feature;
  isCentered: boolean;
  onBurst: (id: FeatureId) => void;
}

const FeatureCard = ({ feature, isCentered, onBurst }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prevCentered = useRef(false);

  useEffect(() => {
    if (isCentered && !prevCentered.current) {
      onBurst(feature.id);
    }
    prevCentered.current = isCentered;
  }, [isCentered, feature.id, onBurst]);

  return (
    <motion.div
      ref={cardRef}
      className="relative w-[320px] md:w-[380px] flex-shrink-0 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/20 shadow-xl overflow-hidden"
      style={{
        boxShadow: isCentered
          ? "0 0 20px rgba(0, 255, 255, 0.4), 0 0 40px rgba(0, 255, 255, 0.2)"
          : "0 10px 30px -10px rgba(0,0,0,0.3)",
      }}
      animate={{
        borderColor: isCentered ? "rgba(0, 255, 255, 0.6)" : "rgba(255,255,255,0.2)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
          {feature.title}
        </h3>
        <p className="text-white/70 text-sm mt-2 leading-relaxed">{feature.description}</p>
        {feature.diagram(isCentered)}
        <div className="mt-4 text-xs text-white/40 text-center">
          {isCentered ? "✨ Now active" : "Slide to explore"}
        </div>
      </div>
    </motion.div>
  );
};

// ------------------------------------------------------------------
// Main Carousel Component
// ------------------------------------------------------------------
export default function HowToCycleCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [centeredId, setCenteredId] = useState<FeatureId>("perps");
  const [burstId, setBurstId] = useState<FeatureId | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const features: Feature[] = [
    {
      id: "perps",
      title: "Perpetual Swaps",
      description: "Trade BTC, ETH, SOL with up to 100x leverage. Deep liquidity, low fees, and no expiry.",
      diagram: (isCentered) => <PerpsDiagram isCentered={isCentered} />,
    },
    {
      id: "predictions",
      title: "Prediction Markets",
      description: "Bet on crypto prices, election outcomes, or any real-world event. Earn from correct forecasts.",
      diagram: (isCentered) => <PredictionsDiagram isCentered={isCentered} />,
    },
    {
      id: "yield",
      title: "Yield Vaults",
      description: "Stake LP tokens or stablecoins into automated strategies. Earn compounding yield with low risk.",
      diagram: (isCentered) => <YieldDiagram isCentered={isCentered} />,
    },
  ];

  // Drag state
  const dragX = useMotionValue(0);
  const dragXSpring = useSpring(dragX, { damping: 50, stiffness: 400 });
  const [dragOffset, setDragOffset] = useState(0);

  // Calculate card widths and gaps to determine snap points
  const getSnapPoints = useCallback(() => {
    if (!trackRef.current) return [0];
    const card = trackRef.current.children[0] as HTMLElement;
    if (!card) return [0];
    const cardWidth = card.offsetWidth;
    const gap = 24; // matches gap-6 (24px)
    const totalWidth = cardWidth + gap;
    const offsets = features.map((_, i) => -i * totalWidth);
    return offsets;
  }, [features.length]);

  // Snap to nearest card on drag end
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const snapPoints = getSnapPoints();
    let newOffset = dragOffset + info.offset.x;
    // Find closest snap point
    let closest = snapPoints.reduce((prev, curr) => {
      return Math.abs(curr - newOffset) < Math.abs(prev - newOffset) ? curr : prev;
    });
    // Clamp to valid range
    const minSnap = Math.min(...snapPoints);
    const maxSnap = Math.max(...snapPoints);
    closest = Math.min(maxSnap, Math.max(minSnap, closest));
    setDragOffset(closest);
    dragX.set(closest);
    // Update centered ID based on snap point index
    const index = snapPoints.indexOf(closest);
    if (index !== -1) setCenteredId(features[index].id);
  };

  // Update drag offset when dragX changes
  useEffect(() => {
    const unsubscribe = dragX.onChange((value) => setDragOffset(value));
    return unsubscribe;
  }, [dragX]);

  // Initialize drag offset to center the first card
  useEffect(() => {
    const snapPoints = getSnapPoints();
    if (snapPoints.length > 0) {
      // Center the first card (index 0) by setting offset to its snap point
      setDragOffset(snapPoints[0]);
      dragX.set(snapPoints[0]);
      setCenteredId(features[0].id);
    }
  }, [getSnapPoints, dragX, features]);

  // Particle burst effect
  const handleBurst = (id: FeatureId) => {
    setBurstId(id);
    // Generate random particles around the centered card
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 150,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 800);
    setTimeout(() => setBurstId(null), 500);
  };

  // 3D tilt per card based on its offset from center (using useTransform inside map)
  // We'll compute each card's offset inside the render loop

  return (
    <section className="w-full py-20 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden relative">
      {/* Section title */}
      <div className="text-center mb-16 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Trade. Predict. Earn.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/50 mt-4 max-w-2xl mx-auto"
        >
          Three powerful ways to multiply your crypto. Swipe to explore.
        </motion.p>
      </div>

      {/* Carousel container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-x-hidden cursor-grab active:cursor-grabbing"
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragElastic={0.2}
          dragMomentum={true}
          style={{ x: dragXSpring }}
          onDragEnd={handleDragEnd}
          className="flex gap-6 px-4 md:px-8 items-center"
        >
          {features.map((feature, idx) => {
            // Calculate 3D tilt and scale based on this card's distance from center
            // Since we don't have per-card motion values easily, we compute using the drag offset
            // and the card's nominal position. For simplicity, we'll create a motion value for each card.
            // But to keep code clean, we'll use a wrapper that reads the global drag offset.
            // Alternative: use useTransform for each card's style.
            // We'll compute inside a child component that uses the same dragXSpring.
            // Simpler: compute a base style based on centeredId.
            const isCentered = feature.id === centeredId;
            const tilt = isCentered ? 0 : idx < features.findIndex(f => f.id === centeredId) ? -5 : 5;
            const scale = isCentered ? 1 : 0.9;
            return (
              <motion.div
                key={feature.id}
                style={{
                  rotateY: tilt,
                  scale,
                  transformStyle: "preserve-3d",
                  transition: "all 0.3s ease-out",
                }}
              >
                <FeatureCard
                  feature={feature}
                  isCentered={isCentered}
                  onBurst={handleBurst}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Particle burst overlay */}
      {burstId && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-2 h-2 rounded-full bg-cyan-400"
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: 0,
                scale: [0, 1.5, 0],
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      {/* Subtle indicator dots */}
      <div className="flex justify-center gap-2 mt-10">
        {features.map((f) => (
          <motion.button
            key={f.id}
            className={`w-2 h-2 rounded-full transition-all ${
              centeredId === f.id ? "w-6 bg-cyan-400" : "bg-white/30"
            }`}
            onClick={() => {
              const snapPoints = getSnapPoints();
              const index = features.findIndex(feat => feat.id === f.id);
              if (index !== -1) {
                setDragOffset(snapPoints[index]);
                dragX.set(snapPoints[index]);
                setCenteredId(f.id);
              }
            }}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </section>
  );
}