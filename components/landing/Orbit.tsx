"use client";

import {
  useMotionValue,
  useTransform,
  useAnimationFrame,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import * as motion from "motion/react-client";

// ---- Deterministic seeded random for stars ----
const SEED = 42;
function seededRandom(seed: number) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}
const rng = seededRandom(SEED);

const SVG_WIDTH = 800;
const SVG_HEIGHT = 600;
const STAR_COUNT = 150;
const starData = Array.from({ length: STAR_COUNT }, () => ({
  cx: rng() * SVG_WIDTH,
  cy: rng() * SVG_HEIGHT,
  r: rng() * 1.5 + 0.5,
  opacity: rng() * 0.5 + 0.2,
}));

// ---- Types ----
interface OrbitingToken {
  src: string;
  alt: string;
  orbitRadius: number;
  tokenSize: number;
  speed: number;
  startAngle?: number;
}

interface OrbitProps {
  tokens: OrbitingToken[];
}

const CENTER_X = SVG_WIDTH / 2;
const CENTER_Y = SVG_HEIGHT / 2;

const getOrbitPath = (radius: number): string => {
  const leftX = CENTER_X - radius;
  const rightX = CENTER_X + radius;
  return `M ${leftX},${CENTER_Y} A ${radius},${radius} 0 1,1 ${rightX},${CENTER_Y} A ${radius},${radius} 0 1,1 ${leftX},${CENTER_Y}`;
};

// ---- Sub‑component for a single orbiting token ----
function OrbitingTokenItem({
  token,
  time,
  index,
}: {
  token: OrbitingToken;
  time: MotionValue<number>; // explicit type
  index: number;
}) {
  const angle = useTransform(
    time,
    (t) => token.speed * t + (token.startAngle ?? index * 0.5)
  );
  const cx = useTransform(angle, (rad) => CENTER_X + token.orbitRadius * Math.cos(rad));
  const cy = useTransform(angle, (rad) => CENTER_Y + token.orbitRadius * Math.sin(rad));

  return (
    <motion.image
      href={token.src}
      width={token.tokenSize}
      height={token.tokenSize}
      viewport={{ amount: 0.9 }}
      style={{
        x: useTransform(cx, (val) => val - token.tokenSize / 2),
        y: useTransform(cy, (val) => val - token.tokenSize / 2),
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 }}
      whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
      whileInView={{ opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4, duration: 1.5, delay: 0.5 } }}
      className="drop-shadow-lg"
    />
  );
}

// ---- Main component ----
export default function Orbit({ tokens }: OrbitProps) {
  const time = useMotionValue(0);
  const startTimeRef = useRef<number | null>(null);

  useAnimationFrame((timestamp) => {
    if (startTimeRef.current === null) startTimeRef.current = timestamp;
    const elapsedSeconds = (timestamp - startTimeRef.current) / 1000;
    time.set(elapsedSeconds);
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="h-68 w-68 overflow-visible relative inset-0 justify-center"
      >
        {/* Background stars – deterministic, no hydration mismatch */}
        <g className="fill-black hidden dark:fill-white" opacity="0.4">
          {starData.map((star, i) => (
            <circle
              key={i}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              opacity={star.opacity}
            />
          ))}
        </g>

        {/* Orbit paths */}
        {tokens.map((token, idx) => (
          <path
            key={`orbit-${idx}`}
            d={getOrbitPath(token.orbitRadius)}
            fill="none"
            strokeWidth="5"
            strokeDasharray="4 6"
            className="stroke-black/20 dark:stroke-white/20"
          />
        ))}

        {/* Orbiting tokens */}
        {tokens.map((token, idx) => (
          <g key={`token-${token.alt}`}>
            <OrbitingTokenItem token={token} time={time} index={idx} />
          </g>
        ))}
      </svg>

      <div className="bg-blue-500 p-1.5 hover:scale-110 transition-transform duration-300 z-50 flex items-center justify-center absolute rounded-xl">
        <Image
          src="/logo_white.svg"
          alt="cyclespace exchange vault"
          height={1000}
          width={1000}
          quality={100}
          className="object-cover w-4 h-4 flex"
          priority
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}