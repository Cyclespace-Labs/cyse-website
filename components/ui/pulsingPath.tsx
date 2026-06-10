"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PulsingPath() {
  // Exact path lengths measured from the actual SVG paths (Firefox/Chrome)
  const curvedPathLength = 425;   // matches original pathData
  const straightPathLength = 318; // matches M4 4H322
  const verticalPathLength = 603; // matches M4 4V607

  const dashLength = 80;
  const curvedGap = curvedPathLength - dashLength;
  const straightGap = straightPathLength - dashLength;
  const verticalGap = verticalPathLength - dashLength;

  // Shared style for glow effect (CSS drop-shadow – compatible across all browsers)
  const glowStyle = {
    filter: "drop-shadow(0 0 2px #0E76FD)",
  };

  return (
    <div className="p-10 h-fit ">
      <div className="grid w-full justify-center items-center gap-2 md:gap-4 lg:gap-4 space-y-0 h-fit ">
        {/* ---------- Left curved path (top) ---------- */}
        <div className="flex justify-center items-center gap-0 space-y-0 h-fit">
          <div className="relative">
            <div className="w-10 h-10 md:w-20 md:h-20 lg:w-20 lg:h-20 relative right-6 top-3 md:right-12 md:top-6 lg:right-12 lg:top-6 z-10 items-start justify-start rounded-full">
              <Image
                src="/tokens/Bitcoin.svg"
                alt="Bitcoin"
                height={230}
                width={230}
                className="object-cover rounded-full relative hover:scale-110 transition-transform duration-300 z-10"
                loading="lazy"
              />
            </div>
            <svg
              className="w-32 h-fit md:w-64 md:h-fit lg:w-64 lg:h-fit"
              width="263"
              height="112"
              viewBox="0 0 263 112"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.00069 4.00073C5.60069 6.80073 43.7043 65.3007 57.7043 82.3007C57.7043 82.3007 70.2043 96.3007 83.2043 102.801C92.2043 107.301 109.704 107.301 109.704 107.301H258.704"
                stroke="#D7DDE0"
                strokeWidth="8"
                strokeLinecap="round"
                className="dark:stroke-slate-900 stroke-[#D7DDE0]"
              />
              <motion.path
                d="M4.00069 4.00073C5.60069 6.80073 43.7043 65.3007 57.7043 82.3007C57.7043 82.3007 70.2043 96.3007 83.2043 102.801C92.2043 107.301 109.704 107.301 109.704 107.301H258.704"
                stroke="#0E76FD"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${dashLength} ${curvedGap}`}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: curvedPathLength }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                className=""
                style={glowStyle}
              />
            </svg>
          </div>

          {/* Mirrored version (right side) */}
          <div className="relative">
            <div className="w-10 h-10 md:w-20 md:h-20 lg:w-20 lg:h-20 relative top-3 left-25 md:top-6 md:left-55 lg:top-6 lg:left-55 items-end justify-end rounded-3xl">
              <Image
                src="/tokens/USD Coin.svg"
                alt="USD Coin"
                height={230}
                width={230}
                className="object-cover rounded-full relative hover:scale-110 transition-transform duration-300 z-10"
                loading="lazy"
              />
            </div>
            <svg
              className="w-32 h-fit md:w-64 md:h-fit lg:w-64 lg:h-fit"
              width="263"
              height="112"
              viewBox="0 0 263 112"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "scaleX(-1)" }}
            >
              <path
                d="M4.00069 4.00073C5.60069 6.80073 43.7043 65.3007 57.7043 82.3007C57.7043 82.3007 70.2043 96.3007 83.2043 102.801C92.2043 107.301 109.704 107.301 109.704 107.301H258.704"
                stroke="#D7DDE0"
                strokeWidth="8"
                strokeLinecap="round"
                className="dark:stroke-slate-900 stroke-[#D7DDE0]"
              />
              <motion.path
                d="M4.00069 4.00073C5.60069 6.80073 43.7043 65.3007 57.7043 82.3007C57.7043 82.3007 70.2043 96.3007 83.2043 102.801C92.2043 107.301 109.704 107.301 109.704 107.301H258.704"
                stroke="#0E76FD"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${dashLength} ${curvedGap}`}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: curvedPathLength }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                className=""
                style={glowStyle}
              />
            </svg>
          </div>
        </div>

        {/* ---------- Middle logo ---------- */}
        <div className="relative items-center justify-center bottom-12 md:bottom-15">
          <div className="absolute flex left-1/2 transform -translate-x-1/2 z-10 justify-center items-center rounded-2xl md:rounded-4xl lg:rounded-4xl w-23 h-23 md:w-30 md:h-30 lg:w-30 lg:h-30">
            <div className="bg-blue-500 p-2.5 md:p-5 lg:p-5 rounded-xl md:rounded-3xl lg:rounded-3xl hover:scale-110 transition-transform duration-300">
              <Image
                src="/logo_white.svg"
                alt="Logo"
                height={500}
                width={500}
                className="object-cover w-8 h-8 md:w-15 md:h-15 lg:w-15 lg:h-15"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* ---------- Horizontal lines with tokens ---------- */}
        <div className="absolute left-1/2 transform -translate-x-1/2 justify-center items-center w-full">
          <div className="w-full h-fit flex flex-row items-center justify-center gap-0 md:gap-20">
            {/* Left horizontal line */}
            <div className="flex relative flex-row items-center space-x-0">
              <div className="relative left-2 z-10 items-start justify-start">
                <div className="w-12 h-12 md:w-22 md:h-22 lg:w-22 lg:h-22 p-1 rounded-2xl justify-center items-center flex">
                  <Image
                    src="/tokens/Solana Sol.svg"
                    alt="Solana"
                    height={230}
                    width={230}
                    className="object-cover rounded-full relative hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
              <svg
                className="w-32 md:w-80"
                width="318"
                height="8"
                viewBox="0 0 318 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: "scaleX(-1)", overflow: "visible" }}
              >
                <path
                  d="M4 4H322"
                  stroke="#D7DDE0"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="dark:stroke-slate-900 stroke-[#D7DDE0]"
                />
                <motion.path
                  d="M4 4H322"
                  stroke="#0E76FD"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${dashLength} ${straightGap}`}
                  initial={{ strokeDashoffset: straightPathLength }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 3,
                    delay: 1,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                  className=""
                  style={glowStyle}
                />
              </svg>
            </div>

            {/* Right horizontal line */}
            <div className="flex relative flex-row items-center space-x-0">
              <svg
                className="w-32 md:w-80"
                width="318"
                height="8"
                viewBox="0 0 318 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H322"
                  stroke="#D7DDE0"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="dark:stroke-slate-900 stroke-[#D7DDE0]"
                />
                <motion.path
                  d="M4 4H322"
                  stroke="#0E76FD"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${dashLength} ${straightGap}`}
                  initial={{ strokeDashoffset: straightPathLength }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 3,
                    delay: 1,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                  className=""
                  style={glowStyle}
                />
              </svg>
              <div className="relative right-3 md:right-2 z-10 items-start justify-start">
                <div className="w-12 h-12 md:w-22 md:h-22 lg:w-22 lg:h-22 p-1 rounded-2xl justify-center items-center flex">
                  <Image
                    src="/tokens/Polygon.svg"
                    alt="Polygon"
                    height={230}
                    width={230}
                    className="object-cover rounded-full relative hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Right curved paths (bottom) ---------- */}
        <div className="flex justify-center items-center gap-0 md:gap-0 h-fit">
          <div className="relative">
            <svg
              className="w-32 h-fit md:w-64 md:h-fit lg:w-64 lg:h-fit"
              width="263"
              height="112"
              viewBox="0 0 263 112"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "scaleY(-1)" }}
            >
              <path
                d="M4.00069 4.00073C5.60069 6.80073 43.7043 65.3007 57.7043 82.3007C57.7043 82.3007 70.2043 96.3007 83.2043 102.801C92.2043 107.301 109.704 107.301 109.704 107.301H258.704"
                stroke="#D7DDE0"
                strokeWidth="8"
                strokeLinecap="round"
                className="dark:stroke-slate-900 stroke-[#D7DDE0]"
              />
              <motion.path
                d="M4.00069 4.00073C5.60069 6.80073 43.7043 65.3007 57.7043 82.3007C57.7043 82.3007 70.2043 96.3007 83.2043 102.801C92.2043 107.301 109.704 107.301 109.704 107.301H258.704"
                stroke="#0E76FD"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${dashLength} ${curvedGap}`}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: curvedPathLength }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                className=""
                style={glowStyle}
              />
            </svg>
            <div className="w-10 h-10 md:w-20 md:h-20 lg:w-20 lg:h-20 bottom-5 z-10 relative right-6 md:right-14 items-end justify-end rounded-3xl">
              <Image
                src="/tokens/XRP.svg"
                alt="XRP"
                height={230}
                width={230}
                className="object-cover rounded-full relative hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </div>

          <div className="relative">
            <svg
              className="w-32 h-fit md:w-64 md:h-fit lg:w-64 lg:h-fit"
              width="263"
              height="112"
              viewBox="0 0 263 112"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "scaleX(-1) scaleY(-1)" }}
            >
              <path
                d="M4.00069 4.00073C5.60069 6.80073 43.7043 65.3007 57.7043 82.3007C57.7043 82.3007 70.2043 96.3007 83.2043 102.801C92.2043 107.301 109.704 107.301 109.704 107.301H258.704"
                stroke="#D7DDE0"
                strokeWidth="8"
                strokeLinecap="round"
                className="dark:stroke-slate-900 stroke-[#D7DDE0]"
              />
              <motion.path
                d="M4.00069 4.00073C5.60069 6.80073 43.7043 65.3007 57.7043 82.3007C57.7043 82.3007 70.2043 96.3007 83.2043 102.801C92.2043 107.301 109.704 107.301 109.704 107.301H258.704"
                stroke="#0E76FD"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${dashLength} ${curvedGap}`}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: curvedPathLength }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                className=""
                style={glowStyle}
              />
            </svg>
            <div className="w-10 h-10 md:w-20 md:h-20 lg:w-20 lg:h-20 relative bottom-6 z-10 left-25 md:left-60 items-end justify-end rounded-3xl">
              <Image
                src="/tokens/Avalanche.svg"
                alt="Avalanche"
                height={230}
                width={230}
                className="object-cover rounded-full relative hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* ---------- Vertical lines (center) ---------- */}
        <div className="absolute h-[300px] md:h-auto left-1/2 transform -translate-x-1/2 translate-y-1/2 justify-center space-x-1 md:space-x-3 items-center flex overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-full h-full">
              <svg
                className="h-80 md:h-160"
                width="8"
                height="611"
                viewBox="0 0 8 611"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4V607"
                  stroke="#D7DDE0"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="dark:stroke-slate-900 stroke-[#D7DDE0]"
                />
                <motion.path
                  d="M4 4V607"
                  stroke="#0E76FD"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${dashLength} ${verticalGap}`}
                  initial={{ strokeDashoffset: verticalPathLength }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 3,
                    delay: i === 1 ? 2 : i === 2 ? 1 : 0,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                  className=""
                  style={glowStyle}
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}