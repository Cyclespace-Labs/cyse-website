'use client';

import { motion } from 'motion/react';
import {Shield, Zap, Globe } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex font-sans items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/render.png"
          alt="Cryptocurrency background"
          fill
          quality={100}
          className="object-cover object-right  md:object-center"
          priority
          referrerPolicy="no-referrer"
        />

        {/* Subtle overlay to ensure text readability if needed, though the image is light on the left */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white md:from-transparent" />
        
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 top-15">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-blue-600 text-xs font-bold tracking-wider uppercase mb-6">
              Next-Gen Asset Management
            </span>

            <h1 className="text-5xl md:text-6xl w-xl font-bold 
              bg-linear-to-b from-black via-slate-800 to-slate-700
              dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400
              leading-tight mb-6 bg-clip-text text-transparent"
            >
              Unstoppable Markets. 
              Total Transparency.
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
              Trade Directly from Your Wallet. Execute Trades. Retain Ownership.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">

              <Button className="px-4 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 
              transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 border-none group"
              >
                Trade on Cyclespace
              </Button>

              <Button className="px-4 py-4 bg-black text-white border-none rounded-lg 
              font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                Build on CYSE
              </Button>

            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-16 grid grid-cols-3 hidden gap-8 border-t border-slate-100 pt-8"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Shield className="w-4 h-4 text-indigo-600" />
                <span>Secure</span>
              </div>
              <p className="text-xs text-slate-500">Military-grade encryption</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Zap className="w-4 h-4 text-indigo-600" />
                <span>Fast</span>
              </div>
              <p className="text-xs text-slate-500">Instant settlements</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Globe className="w-4 h-4 text-indigo-600" />
                <span>Global</span>
              </div>
              <p className="text-xs text-slate-500">Available worldwide</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating decorative elements or scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-slate-300 rounded-full" />
        </div>
      </div>
    </section>
  );
}
