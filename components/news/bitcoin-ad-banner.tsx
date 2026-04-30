"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingUp, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function BitcoinAdBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set end date to 30 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Link href="/trade/btc" className="block w-full">
      <div className="relative w-full h-24 rounded-lg overflow-hidden bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 hover:from-orange-600 hover:via-orange-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl transform translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-200 rounded-full blur-2xl transform -translate-x-8 translate-y-8" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 grid grid-cols-2 items-center w-full justify-between h-full px-50">
          {/* Left Section - Bitcoin Info */}
          <div className="flex items-center justify-center gap-4">
            {/* Bitcoin Logo */}
            <div className="w-12 h-12 relative shrink-0">
              <Image
                src="/tokens/Bitcoin.svg"
                alt="Bitcoin"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Text Content */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">Bitcoin</span>
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-white/90 font-medium">
                Trade Now • Low Fees
              </span>
            </div>
          </div>
          

          
          {/* Right Section - CTA Button */}
          <div className="flex items-center justify-center">
          {/* Center Section - Digital Timer */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20">
              <Clock className="w-4 h-4 text-white/80" />
              <div className="flex items-center gap-1.5">
                <div className="bg-black/40 border border-white/30 rounded px-2 py-1.5 flex flex-col items-center min-w-[32px]">
                  <span className="text-lg font-mono font-bold text-white leading-none">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] text-white/60 uppercase tracking-wider">Days</span>
                </div>
                <span className="text-lg font-mono font-bold text-white/50">:</span>
                <div className="bg-black/40 border border-white/30 rounded px-2 py-1.5 flex flex-col items-center min-w-[32px]">
                  <span className="text-lg font-mono font-bold text-white leading-none">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] text-white/60 uppercase tracking-wider">Hrs</span>
                </div>
                <span className="text-lg font-mono font-bold text-white/50">:</span>
                <div className="bg-black/40 border border-white/30 rounded px-2 py-1.5 flex flex-col items-center min-w-[32px]">
                  <span className="text-lg font-mono font-bold text-white leading-none">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] text-white/60 uppercase tracking-wider">Min</span>
                </div>
                <span className="text-lg font-mono font-bold text-white/50">:</span>
                <div className="bg-black/40 border border-white/30 rounded px-2 py-1.5 flex flex-col items-center min-w-[32px]">
                  <span className="text-lg font-mono font-bold text-white leading-none">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] text-white/60 uppercase tracking-wider">Sec</span>
                </div>
              </div>
            </div>
          </div>

            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300">
              <span className="text-sm font-semibold text-white">Purchase</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
