'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Button } from '../ui/button';

export default function Hero() {
  return (
    <section className="relative w-full -top-17 min-h-screen overflow-hidden flex font-sans items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/render.png"
          alt="Cryptocurrency background"
          fill
          quality={100}
          className="object-cover object-center hidden md:flex" // Centered on all devices for consistent framing
          priority
          referrerPolicy="no-referrer"
        />
        <Image
          src="/render-mobile.png"
          alt="Cryptocurrency background"
          fill
          quality={100}
          className="object-cover object-center flex sm:flex md:hidden" // Centered on all devices for consistent framing
          priority
          referrerPolicy="no-referrer"
        />

        {/* Gradient overlay to ensure text readability across all backgrounds */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-transparent to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-8 h-fit sm:px-10 md:px-12 relative z-10 pt-5 md:pt-30">
        <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-blue-600 text-xs font-bold tracking-wider uppercase mb-4 sm:mb-6">
              Next-Gen Asset Management
            </span>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold
              bg-linear-to-b from-black via-slate-800 to-slate-700
              dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400
              leading-tight mb-4 sm:mb-6 bg-clip-text text-transparent"
            >
              Unstoppable Markets.
              <br />
              Total Transparency.
            </h1>

            <p className="text-base sm:text-lg md:text-lg lg:text-xl text-slate-700 dark:text-slate-300 mb-6 sm:mb-10 leading-relaxed max-w-lg">
              Trade Directly from Your Wallet. Execute Trades. Retain Ownership.
            </p>

            <div className="flex flex-row justify-between px-5 md:px-0 md:justify-start md:flex-row gap-3 sm:gap-4">
              <Button
                className="px-5 sm:px-6 py-3 sm:py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700
                transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 border-none group"
              >
                Trade on Cyclespace
              </Button>

              <Button
                className="px-5 sm:px-6 py-3 sm:py-4 bg-black text-white border-none rounded-lg
                font-medium hover:bg-slate-800 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                Build on CYSE
              </Button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator - hidden on mobile, visible on desktop */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-slate-300 dark:bg-slate-600 rounded-full" />
        </div>
      </div>
    </section>
  );
}