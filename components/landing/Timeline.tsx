// components/HorizontalTimeline.tsx
"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useInView, AnimatePresence } from "framer-motion";
import * as motion from "motion/react-client"
import Image from "next/image";
// ─────────────────────────────────────
// Types
// ─────────────────────────────────────
interface TimelineMilestone {
  id: string;
  date: string;
  label: string;
  title: string;
  description: string;
  status: "completed" | "active" | "upcoming";
  icon: string;
}

interface TimelineProps {
  milestones: TimelineMilestone[];
  className?: string;
}

// ─────────────────────────────────────
// Demo Page with Sample Data
// ─────────────────────────────────────

const sampleMilestones: TimelineMilestone[] = [
  {
    id: "genesis",
    date: "Q1 2024",
    label: "Protocol",
    title: "Genesis Block",
    description:
      "Layer-1 blockchain initialized with institutional-grade validator set and zero-knowledge primitives.",
    status: "completed",
    icon: "/icons/icon1.svg",
  },
  {
    id: "contracts",
    date: "Q2 2024",
    label: "Execution",
    title: "Smart Contracts",
    description:
      "Turing-complete contract engine deployed with formal verification framework and gas abstraction.",
    status: "completed",
    icon: "/icons/icon2.svg",
  },
  {
    id: "defi",
    date: "Q3 2024",
    label: "Ecosystem",
    title: "DeFi Launch",
    description:
      "Cross-chain liquidity protocol with automated market making and institutional custody integration.",
    status: "active",
    icon: "/icons/icon3.svg",
  },
  {
    id: "security",
    date: "Q4 2024",
    label: "Compliance",
    title: "Security Audit",
    description:
      "SOC 2 Type II certification and multi-party computation for institutional key management.",
    status: "upcoming",
    icon: "/icons/icon4.svg",
  },
  {
    id: "scaling",
    date: "Q1 2025",
    label: "Infrastructure",
    title: "Network Scaling",
    description:
      "Layer-2 rollup deployment with sub-second finality and 100k transactions per second throughput.",
    status: "upcoming",
    icon: "/icons/icon5.svg",
  },
  {
    id: "global",
    date: "Q2 2025",
    label: "Adoption",
    title: "Global Markets",
    description:
      "Multi-jurisdiction regulatory approval across APAC, EMEA, and Americas for institutional access.",
    status: "upcoming",
    icon: "/icons/icon6.svg",
  },
];


// ─────────────────────────────────────
// Timeline Item Component
// ─────────────────────────────────────

const TimelineItem: React.FC<{
  milestone: TimelineMilestone;
  index: number;
  isLast: boolean;
}> = ({ milestone, index, isLast }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  const IconComponent = milestone.icon;

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center flex-shrink-0 w-[260px] group"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* ── Date Marker (above track) ── */}
      <div className="mb-5 text-center">
        <span
          className="
            font-mono text-[11px] tracking-[0.2em] uppercase
            text-slate-400 dark:text-slate-500
            font-medium
          "
        >
          {milestone.date}
        </span>
      </div>

      {/* ── Status Indicator Dot ── */}
      <div className="relative z-10 mb-5">
        <motion.div
          className={`
            w-3.5 h-3.5 rounded-full border-2
            ${
              milestone.status === "completed"
                ? "bg-slate-800 dark:bg-slate-200 border-slate-800 dark:border-slate-200"
                : milestone.status === "active"
                  ? "bg-white dark:bg-slate-900 border-slate-800 dark:border-slate-300"
                  : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
            }
          `}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.12 + 0.15,
            ease: "easeOut",
          }}
        />
        {/* Active pulse ring */}
        {milestone.status === "active" && (
          <motion.div
            className="absolute inset-0 rounded-full border border-slate-400 dark:border-slate-500"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}
      </div>

      {/* ── SVG Icon Card ── */}
      <motion.div
        className={`
          relative mb-4 p-4 rounded-xl
          bg-white dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          shadow-sm
          group-hover:shadow-md
          transition-shadow duration-300
          ${milestone.status === "active" ? "ring-1 ring-slate-300 dark:ring-slate-600" : ""}
        `}
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{
          duration: 0.45,
          delay: index * 0.12 + 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <Image src={milestone.icon} alt={milestone.title} width={40} height={40} />
      </motion.div>

      {/* ── Content ── */}
      <motion.div
        className="text-center px-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 0.4,
          delay: index * 0.12 + 0.3,
        }}
      >
        {/* Label */}
        <p
          className="
            font-sans text-[10px] tracking-[0.25em] uppercase
            text-slate-500 dark:text-slate-400
            mb-1.5 font-semibold
          "
        >
          {milestone.label}
        </p>

        {/* Title */}
        <h4
          className="
            font-sans text-base font-bold leading-tight
            text-slate-900 dark:text-slate-100
            mb-1.5 tracking-tight
          "
        >
          {milestone.title}
        </h4>

        {/* Description */}
        <p
          className="
            font-sans text-xs leading-relaxed
            text-slate-500 dark:text-slate-400
            max-w-[200px] mx-auto
          "
        >
          {milestone.description}
        </p>
      </motion.div>

      {/* ── Connector line segment (visual only, between items) ── */}
      {!isLast && (
        <div
          className="
            absolute top-[68px] left-[calc(50%+20px)]
            w-[calc(100%-40px)] h-px
            bg-slate-200 dark:bg-slate-700
            -z-0
          "
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
};

// ─────────────────────────────────────
// Main Timeline Component
// ─────────────────────────────────────

const HorizontalTimeline: React.FC<TimelineProps> = ({
  milestones,
  className = "",
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Check scroll position to toggle arrow visibility
  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Scroll handlers
  const scrollBy = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const amount = 320;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* ── Left Scroll Arrow ── */}
      <AnimatePresence>
        {canScrollLeft && isHovering && (
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            onClick={() => scrollBy("left")}
            className="
              absolute left-0 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 rounded-full
              bg-white dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              shadow-lg
              flex items-center justify-center
              cursor-pointer
              hover:bg-slate-50 dark:hover:bg-slate-700
              transition-colors duration-200
              -ml-5
            "
            aria-label="Scroll timeline left"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-slate-600 dark:text-slate-300"
            >
              <path
                d="M10 3L5 8L10 13"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Scrollable Timeline Track ── */}
      <div
        ref={scrollContainerRef}
        className="
          overflow-x-auto scrollbar-hide
          pb-4
          scroll-smooth
        "
      >
        {/* Continuous track line */}
        <div className="relative min-w-max px-12">
          {/* The horizontal track */}
          <div
            className="
              absolute top-[68px] left-12 right-12 h-px
              bg-slate-200 dark:bg-slate-700
            "
            aria-hidden="true"
          />

          {/* Timeline items */}
          <div className="flex gap-0">
            {milestones.map((milestone, index) => (
              <TimelineItem
                key={milestone.id}
                milestone={milestone}
                index={index}
                isLast={index === milestones.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Scroll Arrow ── */}
      <AnimatePresence>
        {canScrollRight && isHovering && (
          <motion.button
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            onClick={() => scrollBy("right")}
            className="
              absolute right-0 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 rounded-full
              bg-white dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              shadow-lg
              flex items-center justify-center
              cursor-pointer
              hover:bg-slate-50 dark:hover:bg-slate-700
              transition-colors duration-200
              -mr-5
            "
            aria-label="Scroll timeline right"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-slate-600 dark:text-slate-300"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>


    </div>
  );
};

export default function Timeline() {
  return (
    <div
      className="
        min-h-screen
        bg-white dark:bg-black
        flex flex-col items-center justify-center
        px-4 py-16
        transition-colors duration-300
      "
    >
      {/* ── Section Header ── */}
      <motion.div
        className="text-center mb-14 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p
          className="
            font-mono text-xs tracking-[0.3em] uppercase
            text-slate-400 dark:text-slate-500
            mb-3 font-medium
          "
        >
          Development Roadmap
        </p>
        <h2
          className="
            text-3xl sm:text-4xl lg:text-5xl
            font-bold tracking-tight leading-tight
            text-slate-900 dark:text-slate-100 font-sans 
            mb-4
          "
        >
          Building the future of{" "}
          <span className="">institutional finance</span>
        </h2>
        <p
          className="
            font-sans text-sm leading-relaxed
            text-slate-500 dark:text-slate-400
            max-w-xl mx-auto hidden
          "
        >
          A chronological overview of our protocol&apos;s evolution — from
          genesis to global adoption, each milestone represents a critical phase
          in our infrastructure development.
        </p>
      </motion.div>

      {/* ── Timeline ── */}
      <HorizontalTimeline milestones={sampleMilestones} className="w-full max-w-6xl" />

      {/* ── Legend ── */}
      <motion.div
        className="mt-12 flex items-center gap-6 text-xs font-sans text-slate-500 dark:text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-slate-200" />
          Completed
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-slate-800 dark:border-slate-300 bg-white dark:bg-slate-900" />
          Active
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900" />
          Upcoming
        </span>
      </motion.div>
    </div>
  );
}