"use client"

import { memo } from 'react';
import CountUp from '../ui/countUp'
import { motion } from 'framer-motion'
import { div } from 'motion/react-client';


  // Memoized stats component to prevent re-renders
  const SuccessStats = memo(() => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="mt-1 grid grid-cols-2 md:grid-cols-4 gap-20 md:gap-40 justify-between w-full max-w-full lg:px-0 md:px-10 sm:px-10 px-10 mx-auto"
    >
      <div className="text-center">
        <div className="lg:text-3xl md:text-2xl sm:text-2xl text-3xl font-bold text-black dark:text-white">
          <CountUp
            from={0}
            to={50}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text"
            startCounting={false}
          />K+
        </div>
        <div className="text-sm dark:text-zinc-300 text-zinc-500">Active Tokens</div>
      </div>

      <div className="text-center">
        <div className="lg:text-3xl md:text-2xl sm:text-2xl text-2xl font-bold text-black dark:text-white">
          $<CountUp
            from={0.0}
            to={2.5}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text"
            startCounting={false}
          />B+</div>
        <div className="text-sm dark:text-zinc-300 text-zinc-500">Trading Volume</div>
      </div>
      <div className="text-center">
        <div className="lg:text-3xl md:text-2xl sm:text-2xl text-2xl font-bold text-black dark:text-white">
          $<CountUp
            from={0}
            to={75}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text"
            startCounting={false}
          />M</div>
        <div className="text-sm dark:text-zinc-300 text-zinc-500">Total TVL</div>
      </div>
      <div className="text-center">
        <div className="lg:text-3xl md:text-2xl sm:text-2xl text-2xl font-bold text-black dark:text-white">
          <CountUp
            from={0}
            to={3000}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text"
            startCounting={false}
          />+</div>
        <div className="text-sm dark:text-zinc-300 text-zinc-500">Active Traders</div>
      </div>
    </motion.div>
  ));
  SuccessStats.displayName = 'SuccessStats';


export default function Stats() {
  return (

    
    <div className='w-fit h-full'>
      {/* Success Stats */}
        <div className='h-fit pb-20 md:py-30  w-full flex justify-center items-center '>
          <SuccessStats />
        </div>
    </div>

  )
}
