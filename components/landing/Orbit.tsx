"use client";

import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

// Planet data: name, orbit radius (px), planet radius (px), color, angular speed (radians per second)
const planetsData = [
  { name: "Mercury", orbitRadius: 70, planetRadius: 4, color: "#d8c2a3", speed: 2.2 },
  { name: "Venus",   orbitRadius: 100, planetRadius: 5, color: "#e6b800", speed: 1.5 },
  { name: "Earth",   orbitRadius: 130, planetRadius: 6, color: "#4c8fcf", speed: 1.2 },
  { name: "Mars",    orbitRadius: 160, planetRadius: 5, color: "#c4553a", speed: 0.95 },
  { name: "Jupiter", orbitRadius: 210, planetRadius: 12, color: "#d8a27a", speed: 0.5 },
  { name: "Saturn",  orbitRadius: 260, planetRadius: 10, color: "#e8cfab", speed: 0.38, hasRing: true },
  { name: "Uranus",  orbitRadius: 310, planetRadius: 8, color: "#b0e0e6", speed: 0.27 },
  { name: "Neptune", orbitRadius: 360, planetRadius: 8, color: "#4169e1", speed: 0.22 },
];

// SVG viewBox dimensions
const SVG_WIDTH = 1000;
const SVG_HEIGHT = 800;
const CENTER_X = SVG_WIDTH / 2;
const CENTER_Y = SVG_HEIGHT / 2;

// Helper to generate a circular SVG path (full circle) for each orbit
const getOrbitPath = (radius: number): string => {
  const leftX = CENTER_X - radius;
  const rightX = CENTER_X + radius;
  // Two arc commands to form a full circle: top half and bottom half
  return `M ${leftX},${CENTER_Y} A ${radius},${radius} 0 1,1 ${rightX},${CENTER_Y} A ${radius},${radius} 0 1,1 ${leftX},${CENTER_Y}`;
};

export default function Orbit() {
  // Motion value that tracks the global animation time in seconds
  const time = useMotionValue(0);
  
  // Store the start timestamp for consistent animation speed
  const startTimeRef = useRef<number | null>(null);

  // Animation loop: update time value on every frame
  useAnimationFrame((timestamp) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
    }
    // Convert elapsed milliseconds to seconds
    const elapsedSeconds = (timestamp - startTimeRef.current) / 1000;
    time.set(elapsedSeconds);
  });

  // For each planet, derive its angle from the global time and specific speed,
  // then compute the x and y coordinates of its position on the orbit.
  // We store the resulting motion values to directly animate the SVG circles.
  const planetMotionValues = planetsData.map((planet) => {
    // angle = speed * time (in seconds)
    const angle = useTransform(time, (t) => planet.speed * t);
    
    // x = centerX + orbitRadius * cos(angle)
    const cx = useTransform(angle, (rad) => CENTER_X + planet.orbitRadius * Math.cos(rad));
    
    // y = centerY + orbitRadius * sin(angle)
    const cy = useTransform(angle, (rad) => CENTER_Y + planet.orbitRadius * Math.sin(rad));
    
    return { cx, cy, planet };
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="bg-black/40 rounded-2xl p-4 backdrop-blur-sm shadow-2xl border border-white/10">
        <svg
          width={SVG_WIDTH}
          height={SVG_HEIGHT}
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="rounded-lg shadow-lg"
          style={{ background: "radial-gradient(circle at center, #0a0f2a, #03050b)" }}
        >
          {/* Starfield effect: tiny random stars */}
          <g fill="white" opacity="0.6">
            {Array.from({ length: 200 }).map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * SVG_WIDTH}
                cy={Math.random() * SVG_HEIGHT}
                r={Math.random() * 1.5}
                opacity={Math.random() * 0.6 + 0.2}
              />
            ))}
          </g>

          {/* Orbit Paths (SVG paths) - each planet follows its corresponding path geometrically */}
          {planetsData.map((planet, idx) => (
            <path
              key={`orbit-${planet.name}`}
              d={getOrbitPath(planet.orbitRadius)}
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              className="orbit-path"
            />
          ))}

          {/* Planets: animated using motion.circle with motion values for cx and cy */}
          {planetMotionValues.map(({ cx, cy, planet }, idx) => (
            <g key={`planet-group-${planet.name}`}>
              {/* Saturn's ring (if applicable) */}
              {planet.hasRing && (
                <motion.ellipse
                  rx={planet.planetRadius + 5}
                  ry={planet.planetRadius * 0.6}
                  fill="none"
                  stroke="rgba(210, 180, 140, 0.7)"
                  strokeWidth="2"
                  style={{ cx, cy }}
                />
              )}
              {/* Planet body */}
              <motion.circle
                r={planet.planetRadius}
                fill={planet.color}
                style={{ cx, cy }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.1 }}
                whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                className="cursor-pointer drop-shadow-lg"
              />
              {/* Glow effect on planets */}
              <motion.circle
                r={planet.planetRadius + 2}
                fill={planet.color}
                style={{ cx, cy }}
                opacity={0.25}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              />
            </g>
          ))}

          {/* Sun (static at the center) */}
          <g>
            {/* Outer glow */}
            <circle cx={CENTER_X} cy={CENTER_Y} r={38} fill="#ffaa33" opacity="0.3" />
            <circle cx={CENTER_X} cy={CENTER_Y} r={32} fill="#ffcc44" opacity="0.6" />
            {/* Sun core */}
            <circle cx={CENTER_X} cy={CENTER_Y} r={24} fill="#ffdd77" />
            <circle cx={CENTER_X} cy={CENTER_Y} r={20} fill="#ffaa22" />
            {/* Sun highlight */}
            <circle cx={CENTER_X - 5} cy={CENTER_Y - 5} r={6} fill="#fff5cc" opacity="0.9" />
            {/* Pulsing animation using motion */}
            <motion.circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r={28}
              fill="#ffaa33"
              opacity={0.2}
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>

          {/* Optional: Labels for orbits (small text near each orbit radius) */}
          {planetsData.map((planet) => (
            <text
              key={`label-${planet.name}`}
              x={CENTER_X + planet.orbitRadius + 10}
              y={CENTER_Y - 8}
              fill="rgba(255,255,255,0.5)"
              fontSize="10"
              fontFamily="monospace"
              textAnchor="start"
              className="select-none"
            >
              {planet.name}
            </text>
          ))}

          {/* Title text inside SVG */}
          <text
            x={CENTER_X}
            y={40}
            fill="white"
            fontSize="20"
            fontFamily="system-ui, sans-serif"
            fontWeight="bold"
            textAnchor="middle"
            letterSpacing="2"
            className="drop-shadow-md"
          >
            SOLAR SYSTEM — TOP VIEW
          </text>
        </svg>
      </div>
      <div className="mt-4 text-center text-white/60 text-sm font-mono">
        Planets orbit along SVG paths • Animated with Framer Motion
      </div>
    </div>
  );
}