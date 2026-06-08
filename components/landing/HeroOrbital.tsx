"use client";

import { motion, useMotionValue, useTransform, useAnimationFrame, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ------------------------------------------------------------------
// Constants & configuration
// ------------------------------------------------------------------
const ASSETS = [
  { name: "BTC", icon: "₿", color: "#F7931A", speed: 0.45, radiusX: 280, radiusY: 160 },
  { name: "ETH", icon: "Ξ", color: "#627EEA", speed: 0.6, radiusX: 340, radiusY: 200 },
  { name: "SOL", icon: "◎", color: "#00FFA3", speed: 0.8, radiusX: 400, radiusY: 240 },
  { name: "CYSE", icon: "🌀", color: "#FFD966", speed: 0.3, radiusX: 200, radiusY: 120 }, // core token itself orbiting
];

const CENTER_X = 0;   // relative to container center, we'll use absolute positioning
const CENTER_Y = 0;

// ------------------------------------------------------------------
// Helper: generate random floating particles
// ------------------------------------------------------------------
const generateParticles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // vw %
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));
};

// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
export default function HeroOrbital() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles] = useState(() => generateParticles(60));

  // Motion value for global animation time (used for orbiting)
  const time = useMotionValue(0);
  const startTimeRef = useRef<number | null>(null);

  // Spring smooth mouse values for parallax tilt
  const springConfig = { damping: 25, stiffness: 180 };
  const mouseXSpring = useSpring(0, springConfig);
  const mouseYSpring = useSpring(0, springConfig);

  // Tilt transform values (range: -10deg to 10deg)
  const rotateY = useTransform(mouseXSpring, [0, 1], [-8, 8]);
  const rotateX = useTransform(mouseYSpring, [0, 1], [6, -6]);

  // Animated gradient background – cycles between green and red
  const [gradientColor, setGradientColor] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientColor((prev) => (prev + 0.01) % 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  const bgGradient = useTransform(
    useMotionValue(gradientColor),
    (t) => {
      // Interpolate between greenish (bull) and reddish (bear)
      const r = Math.sin(t * Math.PI * 2) * 0.5 + 0.5; // 0..1
      const g = Math.sin((t + 0.33) * Math.PI * 2) * 0.5 + 0.5;
      const b = Math.sin((t + 0.67) * Math.PI * 2) * 0.5 + 0.5;
      // Dominant channel based on market cycle (red->green)
      const intensity = Math.sin(t * Math.PI * 2);
      const color1 = `rgba(30, 130, 90, ${0.3 + intensity * 0.2})`;   // greenish
      const color2 = `rgba(180, 50, 50, ${0.3 - intensity * 0.2})`;    // reddish
      return `radial-gradient(circle at 50% 50%, ${color1}, ${color2}, #03050b)`;
    }
  );

  // Update time for orbiting animations
  useAnimationFrame((timestamp) => {
    if (startTimeRef.current === null) startTimeRef.current = timestamp;
    const elapsed = (timestamp - startTimeRef.current) / 1000;
    time.set(elapsed);
  });

  // Mouse move handler for parallax effect (relative to container)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0..1 from left to right
    const y = (e.clientY - rect.top) / rect.height;    // 0..1 from top to bottom
    setMousePosition({ x, y });
    mouseXSpring.set(x);
    mouseYSpring.set(y);
  };

  // Compute orbital positions for each asset based on current time
  const getOrbitalStyle = (asset: typeof ASSETS[0], angleOffset: number) => {
    const angle = time.get() * asset.speed + angleOffset;
    const x = Math.cos(angle) * asset.radiusX;
    const y = Math.sin(angle) * asset.radiusY;
    return { x, y };
  };

  // For the central "CYSE" core we also pulse – but it's static at center.
  // We'll add a pulsing ring and floating token icon.

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        mouseXSpring.set(0.5);
        mouseYSpring.set(0.5);
      }}
      style={{
        background: bgGradient,
      }}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Floating Particles Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/20"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main 3D Orbital Container with mouse parallax */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-full max-w-5xl aspect-square flex items-center justify-center"
      >
        {/* Central Core: CYSE token with pulsing glow */}
        <div className="absolute z-20 flex flex-col items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                "0 0 20px rgba(255, 220, 100, 0.5)",
                "0 0 50px rgba(255, 220, 100, 0.9)",
                "0 0 20px rgba(255, 220, 100, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-2xl"
          >
            <span className="text-5xl font-bold text-white drop-shadow-lg">🌀</span>
          </motion.div>
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-amber-400 blur-xl -z-10"
            style={{ width: "7rem", height: "7rem" }}
          />
        </div>

        {/* Orbiting Assets */}
        {ASSETS.map((asset, idx) => {
          const { x, y } = getOrbitalStyle(asset, idx * 1.2);
          return (
            <motion.div
              key={asset.name}
              className="absolute z-10 flex flex-col items-center"
              style={{
                x,
                y,
                left: "50%",
                top: "50%",
                marginLeft: -24,   // half of width (approx)
                marginTop: -24,
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2 + idx,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${asset.color}, ${asset.color}99)`,
                  border: `1px solid ${asset.color}cc`,
                }}
              >
                <span className="text-white text-xl font-bold drop-shadow-md">
                  {asset.icon}
                </span>
              </div>
              <span className="text-white/80 text-xs mt-1 font-mono">{asset.name}</span>
            </motion.div>
          );
        })}

        {/* Elliptical orbit trails (SVG paths) – decorative */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {ASSETS.map((asset, idx) => (
            <ellipse
              key={`orbit-${asset.name}`}
              cx="50%"
              cy="50%"
              rx={asset.radiusX}
              ry={asset.radiusY}
              fill="none"
              stroke={`${asset.color}30`}
              strokeWidth="1"
              strokeDasharray="6 8"
              className="opacity-50"
            />
          ))}
        </svg>
      </motion.div>

      {/* Headline & CTA Buttons – placed at bottom center, overlapping the orbital */}
      <div className="absolute bottom-1/4 left-0 right-0 text-center z-30">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg"
        >
          Trade Perpetuals.<br />
          Predict Markets.<br />
          Earn Cycles.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-6 justify-center mt-8"
        >
          {/* Launch App Button with ripple effect */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-lg overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-white/30 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 0.5 }}
              transition={{ duration: 0.4 }}
              style={{ left: "50%", top: "50%", width: "100%", height: "100%", borderRadius: "inherit" }}
            />
            Launch App
          </motion.button>

          {/* Litepaper Button with ripple effect */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold text-lg shadow-lg overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-white/20 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 0.4 }}
              transition={{ duration: 0.4 }}
            />
            Litepaper
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </motion.section>
  );
}