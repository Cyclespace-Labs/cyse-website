"use client";

import { useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import * as motion from "motion/react-client"

// Token orbit data: each token gets a unique orbit radius, speed, and icon size
interface OrbitingToken {
  src: string;
  alt: string;
  orbitRadius: number;   // pixels from center
  tokenSize: number;     // width/height in pixels
  speed: number;         // radians per second
  startAngle?: number;   // optional initial offset
}

// SVG viewBox dimensions – responsive container
const SVG_WIDTH = 800;
const SVG_HEIGHT = 600;
const CENTER_X = SVG_WIDTH / 2;
const CENTER_Y = SVG_HEIGHT / 2;

// Helper to generate a circular SVG path for an orbit
const getOrbitPath = (radius: number): string => {
  const leftX = CENTER_X - radius;
  const rightX = CENTER_X + radius;
  return `M ${leftX},${CENTER_Y} A ${radius},${radius} 0 1,1 ${rightX},${CENTER_Y} A ${radius},${radius} 0 1,1 ${leftX},${CENTER_Y}`;
};

interface OrbitProps {
  tokens: OrbitingToken[];
}

export default function Orbit({ tokens }: OrbitProps) {
  const time = useMotionValue(0);
  const startTimeRef = useRef<number | null>(null);

  useAnimationFrame((timestamp) => {
    if (startTimeRef.current === null) startTimeRef.current = timestamp;
    const elapsedSeconds = (timestamp - startTimeRef.current) / 1000;
    time.set(elapsedSeconds);
  });

  // Pre‑compute motion values for each token
  const tokenMotionValues = tokens.map((token, idx) => {
    const angle = useTransform(time, (t) => (token.speed * t) + (token.startAngle || idx * 0.5));
    const cx = useTransform(angle, (rad) => CENTER_X + token.orbitRadius * Math.cos(rad));
    const cy = useTransform(angle, (rad) => CENTER_Y + token.orbitRadius * Math.sin(rad));
    return { cx, cy, token };
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="h-68 w-68 overflow-visible relative inset-0 justify-center"
      >
        {/* Background stars (light/dark adapt via opacity) */}
        <g className="fill-black hidden dark:fill-white" opacity="0.4">
          {Array.from({ length: 150 }).map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * SVG_WIDTH}
              cy={Math.random() * SVG_HEIGHT}
              r={Math.random() * 1.5 + 0.5}
              opacity={Math.random() * 0.5 + 0.2}
            />
          ))}
        </g>

        {/* Orbit paths – stroke adapts to theme */}
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

        {/* Orbiting tokens as animated SVG images */}
        {tokenMotionValues.map(({ cx, cy, token }, idx) => (
          <g key={`token-${token.alt}`}>
              <motion.image
                href={token.src}
                width={token.tokenSize}
                height={token.tokenSize}
                viewport={{ amount: 0.9 }}
                style={{ x: useTransform(cx, (val) => val - token.tokenSize / 2),
                        y: useTransform(cy, (val) => val - token.tokenSize / 2) }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.1 }}
                whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                whileInView={{ opacity: 1, scale: 1, transition: { type:"spring", bounce: 0.4, duration: 1.5, delay: 0.5 } }}
                className="drop-shadow-lg"
              />
            {/* Optional glow ring – uncomment if desired */}
            {/* <motion.circle
              cx={cx}
              cy={cy}
              r={token.tokenSize / 2 + 2}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-cyan-400/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
            /> */}
          </g>
        ))}

        {/* Central decorative sun (optional, but keeps the "solar system" feel) */}
        <g className="hidden"> 
          <circle cx={CENTER_X} cy={CENTER_Y} r={28} fill="#ffaa33" opacity="0.2" />
          <circle cx={CENTER_X} cy={CENTER_Y} r={22} fill="#ffcc44" opacity="0.5" />
          <circle cx={CENTER_X} cy={CENTER_Y} r={16} fill="#ffdd77" />
          <motion.circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={32}
            fill="#ffaa33"
            opacity={0.15}
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />


        </g>
      </svg>

      <div className="bg-blue-500 p-1.5 hover:scale-110 transition-transform duration-300 z-50 flex items-center justify-center absolute rounded-xl">
        <Image
          src="/logo_white.svg"
          alt="cyclespace exchange vault"
          height={1000}
          width={1000}
          quality={100}
          className="object-cover w-4 h-4 flex "
          priority
          referrerPolicy="no-referrer"
        />
      </div>

    </div>
  );
}