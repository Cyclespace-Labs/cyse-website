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
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full mx-auto px-6 md:px-8 lg:px-20 xl:px-50 py-8 sm:py-12 md:py-16 font-sans pt-20 sm:pt-32 md:pt-40 gap-6 lg:gap-0 z-10">
      <h2 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl text-center lg:text-left font-bold mb-6 sm:mb-8 md:mb-10 bg-linear-to-b from-white via-slate-200 to-slate-400 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
        Frequently asked questions
      </h2>

      <div className="space-y-3 sm:space-y-4 px-0 sm:px-8 md:px-16 lg:px-10 xl:px-10 w-full">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleItem(idx)}
              className="w-full flex gap-2 sm:gap-3 items-center p-3 sm:p-4 md:p-5 text-left hover:bg-blue-400/30 dark:hover:bg-slate-800 transition-colors group w-full"
            >                
                {/* Morphing Icon with Circle Background */}
                <div className="relative w-6 h-6 sm:w-8 sm:h-8 shrink-0">
                    <div className="absolute inset-0 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                    {/* Horizontal line (always visible) */}
                    <motion.div
                        className="absolute w-3 h-0.5 sm:w-4 sm:h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                        initial={false}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                    />
                    {/* Vertical line (morphs) */}
                    <motion.div
                        className="absolute w-0.5 h-3 sm:w-0.5 sm:h-4 bg-blue-600 dark:bg-blue-400 rounded-full"
                        initial={false}
                        animate={{
                        scaleY: openIndex === idx ? 0 : 1,
                        }}
                        transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1],
                        }}
                    />
                    </div>
                </div>
                <span className="text-base sm:text-lg md:text-xl font-medium text-slate-100 dark:text-slate-100">
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
                  <div className="p-3 sm:p-4 md:p-5 pt-0 text-slate-200 dark:text-slate-200 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-sm sm:text-base leading-relaxed">{item.answer}</p>
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
