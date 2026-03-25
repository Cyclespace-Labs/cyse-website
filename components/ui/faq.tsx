"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  items: FaqItem[];
}

export default function FAQ({ items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="grid grid-cols-2 mx-auto px-4 sm:px-6 py-12 font-sans">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-linear-to-b from-white via-slate-200 to-slate-400 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
        Frequently asked questions
      </h2>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleItem(idx)}
              className="w-full flex gap-3 items-center p-5 text-left hover:bg-blue-400/30 dark:hover:bg-slate-800 transition-colors group"
            >                
                {/* Morphing Icon with Circle Background */}
                <div className="relative w-8 h-8 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                    {/* Horizontal line (always visible) */}
                    <motion.div
                        className="absolute w-4 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                        initial={false}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                    />
                    {/* Vertical line (morphs) */}
                    <motion.div
                        className="absolute w-0.5 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"
                        initial={false}
                        animate={{
                        scaleY: openIndex === idx ? 0 : 1,
                        }}
                        transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1], // custom easing for a snappy feel
                        }}
                    />
                    </div>
                </div>
                <span className="text-lg sm:text-xl font-medium text-slate-100 dark:text-slate-900">
                    {item.question}
                </span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 text-slate-200 dark:text-slate-700 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-base leading-relaxed">{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
