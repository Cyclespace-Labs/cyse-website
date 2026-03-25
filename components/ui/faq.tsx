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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 font-sans">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-b from-black via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
        Frequently asked questions
      </h2>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm"
          >
            {/* Question Button */}
            <button
              onClick={() => toggleItem(idx)}
              className="w-full flex justify-between items-center p-5 text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="text-lg sm:text-xl font-medium text-slate-900 dark:text-slate-100">
                {item.question}
              </span>

              {/* Morphing Icon */}
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                {/* Vertical line */}
                <motion.div
                  className="absolute inset-0 w-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                  animate={{
                    rotate: openIndex === idx ? 90 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                {/* Horizontal line */}
                <motion.div
                  className="absolute inset-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                  animate={{
                    rotate: openIndex === idx ? 0 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>

            {/* Answer Panel with AnimatePresence */}
            <AnimatePresence initial={false}>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700">
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