"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PulsingPath() {

    const pathData = "M4.00069 4.00073C5.60069 6.80073 43.7043 65.3007 57.7043 82.3007C57.7043 82.3007 70.2043 96.3007 83.2043 102.801C92.2043 107.301 109.704 107.301 109.704 107.301H258.704";
    const straightLinePath = "M4 4H322"; // Straight horizontal line: 322 - 4 = 318px
    const verticalLinePath = "M4 4V607" // Vertical line: 607 - 4 = 603px

    // dashLength + gapLength must equal the total path length for a seamless loop.
    const dashLength = 80;
    const gapLength = 345;
    const totalLength = 425; // actual curved path length (dashLength + gapLength)

    // Straight line: M4 4H322 = 318px total
    const stDashLength = 80;
    const stGapLength = 238; // 318 - 80 = 238
    const stTotalLength = 318; // actual straight path length

    // Vertical line: M4 4V607 = 603px total
    const vtDashLength = 80;
    const vtGapLength = 523; // 603 - 80 = 523
    const vtTotalLength = 603; // actual vertical path length

    //Color theme
    const backgroundColor = "#D7DDE0";
    const dashColor = "#0E76FD";

    return (
    <div className="p-10 h-fit">
        <div className="grid w-full  justify-center items-center gap-2 md:gap-6 lg:gap-6 space-y-0 h-fit">
            {/* left design*/}
            <div className="flex justify-center items-center gap-0 space-y-0 h-fit">

                <div className="relative">

                    <div className="w-10 h-10 md:w-20 md:h-20 lg:w-20 lg:h-20 relative right-6 top-3 md:right-12 md:top-6 lg:right-12 lg:top-6 z-10 items-start justify-start rounded-full">
                        <Image
                            src="/tokens/Bitcoin.svg"
                            alt="cyclespace exchange vault"
                            height={230}
                            width={230}
                            quality={100}
                            className="object-cover rounded-full relative hover:scale-110 transition-transform duration-300"
                            priority
                            referrerPolicy="no-referrer"
                        />
                    </div>
                    
                    <svg className="w-32 h-fit md:w-64 md:h-fit lg:w-64 lg:h-fit" width="263" height="112" viewBox="0 0 263 112" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scaleY(1)" }}>
                        <defs>
                        {/* Blue Glow Filter */}
                        <filter id="glow1" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        </defs>

                        {/* Static Background Path */}
                        <path 
                            d={pathData} 
                            stroke={backgroundColor} // Light grey background
                            strokeWidth="8" 
                            strokeLinecap="round"
                            className="dark:stroke-slate-900 stroke-[#D7DDE0]"
                        />
                        
                        {/* Animated Blue Pulse */}
                        <motion.path
                            className="dark:stroke-[#0E76FD] stroke-[#0E76FD]"
                            d={pathData}
                            stroke={dashColor} // Vibrant Blue
                            strokeWidth="8"
                            strokeLinecap="round"
                            filter="url(#glow1)"
                            style={{
                                strokeDasharray: `${dashLength} ${gapLength}`,
                        }}
                            initial={{ strokeDashoffset: 0 }}
                            animate={{ strokeDashoffset: totalLength }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                repeatType: "loop",
                        }}
                        
                        />
                    </svg>
                </div>

                <div className="relative">

                    <div className="w-10 h-10 md:w-20 md:h-20 lg:w-20 lg:h-20 relative top-3 left-25 md:top-6 md:left-55 lg:top-6 z-10 lg:left-55 items-end justify-end rounded-3xl">
                        <Image
                            src="/tokens/USD Coin.svg"
                            alt="cyclespace exchange vault"
                            height={230}
                            width={230}
                            quality={100}
                            className="object-cover rounded-full relative hover:scale-110 transition-transform duration-300"
                            priority
                            referrerPolicy="no-referrer"
                        />
                    </div>

                    <svg className="w-32 h-fit md:w-64 md:h-fit lg:w-64 lg:h-fit" width="263" height="112" viewBox="0 0 263 112" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scaleX(-1)" }}>
                        <defs>
                        {/* Blue Glow Filter */}
                        <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        </defs>

                        {/* Static Background Path */}
                        <path 
                            d={pathData} 
                            stroke={backgroundColor} // Light grey background
                            strokeWidth="8" 
                            strokeLinecap="round"
                            className="dark:stroke-slate-900 stroke-[#D7DDE0]"
                        />
                        
                        {/* Animated Blue Pulse */}
                        <motion.path
                            className="dark:stroke-[#0E76FD] stroke-[#0E76FD]"
                            d={pathData}
                            stroke={dashColor} // Vibrant Blue
                            strokeWidth="8"
                            strokeLinecap="round"
                            filter="url(#glow2)"
                            style={{
                                strokeDasharray: `${dashLength} ${gapLength}`,
                        }}
                            initial={{ strokeDashoffset: 0 }}
                            animate={{ strokeDashoffset: totalLength }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                repeatType: "loop",
                        }}
                        />
                    </svg>
                </div>
            </div>

            {/* middle logo*/}
            <div className="relative items-center justify-center bottom-12 md:bottom-15 ">
                <div className="absolute flex left-1/2 transform -translate-x-1/2 z-10 justify-center items-center rounded-2xl md:rounded-4xl lg:rounded-4xl w-23 h-23 md:w-30 md:h-30 lg:w-30 lg:h-30">
                    <div className="bg-blue-500 p-2.5  md:p-5 lg:p-5 rounded-xl md:rounded-3xl lg:rounded-3xl hover:scale-110 transition-transform duration-300">
                        <Image
                            src="/logo_white.svg"
                            alt="cyclespace exchange vault"
                            height={500}
                            width={500}
                            quality={100}
                            className="object-cover w-8 h-8 md:w-15 md:h-15 lg:w-15 lg:h-15 "
                            priority
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </div>
            </div>

  

            {/* middle design*/} 
            <div className="absolute left-1/2 transform -translate-x-1/2 justify-center items-center w-full">
                {/* Left Horizontal Line — dash starts from right, travels left (negative offset → 0) */}
                <div className="w-full h-fit flex flex-row items-center justify-center gap-0 md:gap-20">

                    <div className="flex relative flex-row items-center  space-x-0">

                        <div className="relative left-2 z-10 items-start justify-start ">
                            <div className="w-12 h-12 md:w-22 md:h-22 lg:w-22 lg:h-22 p-1 rounded-2xl justify-center items-center flex">
                                <Image
                                    src="/tokens/Solana Sol.svg"
                                    alt="cyclespace exchange vault"
                                    height={230}
                                    width={230}
                                    quality={100}
                                    className="object-cover rounded-full relative hover:scale-110 transition-transform duration-300"
                                    priority
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>

                        <svg className="w-32 md:w-80"  width="318" height="8" viewBox="0 0 318 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform:"scaleX(-1)", overflow: "visible" }}>
                            <defs>
                                {/* Blue Glow Filter */}
                                <filter 
                                    id="glow3" 
                                    x="-100%" y="-100%" width="300%" height="300%"
                                    colorInterpolationFilters="sRGB"    
                                >
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* Static Background Path */}
                            <path 
                                d={straightLinePath} 
                                stroke={backgroundColor}
                                strokeWidth="8" 
                                strokeLinecap="round"
                                className="dark:stroke-slate-900 stroke-[#D7DDE0]"
                            />
                            
                            {/* Animated Blue Pulse */}
                            <motion.path
                                className="dark:stroke-[#0E76FD] stroke-[#0E76FD]"
                                d={straightLinePath}
                                stroke={dashColor}
                                strokeWidth="8"
                                strokeLinecap="round"
                                filter="url(#glow3)"
                                style={{
                                    strokeDasharray: `${stDashLength} ${stGapLength}`,
                                }}
                                initial={{ strokeDashoffset: stTotalLength }}
                                animate={{ strokeDashoffset: 0 }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                    repeatType: "loop",
                                }}
                            />
                            
                        </svg>

                    </div>


                    {/* Right Horizontal Line — dash starts from left, travels right (positive offset → 0) */}
                    <div className="flex relative flex-row items-center  space-x-0">
                        <svg className="w-32 md:w-80" width="318" height="8" viewBox="0 0 318 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                {/* Blue Glow Filter */}
                                <filter id="glow4" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* Static Background Path */}
                            <path 
                            d={straightLinePath} 
                            stroke={backgroundColor}
                            strokeWidth="8" 
                            strokeLinecap="round"
                            className="dark:stroke-slate-900 stroke-[#D7DDE0]"
                            />
                            
                            {/* Animated Blue Pulse */}
                            <motion.path
                                className="dark:stroke-[#0E76FD] stroke-[#0E76FD]"
                                d={straightLinePath}
                                stroke={dashColor}
                                strokeWidth="8"
                                strokeLinecap="round"
                                filter="url(#glow4)"
                                style={{
                                    strokeDasharray: `${stDashLength} ${stGapLength}`,
                                }}
                                initial={{ strokeDashoffset: stTotalLength }}
                                animate={{ strokeDashoffset: 0 }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                    repeatType: "loop",
                                }}
                            />
                        </svg>

                        <div className="relative right-3 md:right-2  z-10 items-start justify-start">
                            <div className="w-12 h-12 md:w-22 md:h-22 lg:w-22 lg:h-22 p-1 rounded-2xl justify-center items-center flex">
                                <Image
                                    src="/tokens/Polygon.svg"
                                    alt="cyclespace exchange vault"
                                    height={230}
                                    width={230}
                                    quality={100}
                                    className="object-cover rounded-full relative hover:scale-110 transition-transform duration-300"
                                    priority
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* right design*/}
            <div className="flex justify-center items-center gap-0 md:gap-0 h-fit">
                <div className="relative">

                    <svg className="w-32 h-fit md:w-64 md:h-fit lg:w-64 lg:h-fit" width="263" height="112" viewBox="0 0 263 112" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scaleY(-1)" }}>
                        <defs>
                        {/* Blue Glow Filter */}
                        <filter id="glow5" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        </defs>

                        {/* Static Background Path */}
                        <path 
                            d={pathData} 
                            stroke={backgroundColor} // Light grey background
                            strokeWidth="8" 
                            strokeLinecap="round"
                            className="dark:stroke-slate-900 stroke-[#D7DDE0]"
                        />
                        
                        {/* Animated Blue Pulse */}
                        <motion.path
                            className="dark:stroke-[#0E76FD] stroke-[#0E76FD]"
                            d={pathData}
                            stroke={dashColor} // Vibrant Blue
                            strokeWidth="8"
                            strokeLinecap="round"
                            filter="url(#glow5)"
                            style={{
                                strokeDasharray: `${dashLength} ${gapLength}`,
                        }}
                            initial={{ strokeDashoffset: 0 }}
                            animate={{ strokeDashoffset: totalLength }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                repeatType: "loop",
                            }}
                        />
                    </svg>

                    <div className="w-10 h-10 md:w-20 md:h-20 lg:w-20 lg:h-20 bottom-5 z-10 relative right-6 md:right-14 items-end justify-end rounded-3xl">
                        <Image
                            src="/tokens/XRP.svg"
                            alt="cyclespace exchange vault"
                            height={230}
                            width={230}
                            quality={100}
                            className="object-cover rounded-full relative hover:scale-110 transition-transform duration-300"
                            priority
                            referrerPolicy="no-referrer"
                        />
                    </div>

                </div>

                <div className="relative">
                    <svg className="w-32 h-fit md:w-64 md:h-fit lg:w-64 lg:h-fit" width="263" height="112" viewBox="0 0 263 112" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scaleX(-1) scaleY(-1)" }}>
                        <defs>
                        {/* Blue Glow Filter */}
                        <filter id="glow6" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        </defs>

                        {/* Static Background Path */}
                        <path 
                        d={pathData} 
                        stroke={backgroundColor} // Light grey background
                        strokeWidth="8" 
                        strokeLinecap="round"
                        className="dark:stroke-slate-900 stroke-[#D7DDE0]"
                        />
                        
                        {/* Animated Blue Pulse */}
                        <motion.path
                            className="dark:stroke-[#0E76FD] stroke-[#0E76FD]"
                            d={pathData}
                            stroke={dashColor} // Vibrant Blue
                            strokeWidth="8"
                            strokeLinecap="round"
                            filter="url(#glow6)"
                            style={{
                                strokeDasharray: `${dashLength} ${gapLength}`,
                        }}
                            initial={{ strokeDashoffset: 0 }}
                            animate={{ strokeDashoffset: totalLength }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                repeatType: "loop",
                            }}
                        />
                    </svg>

                    <div className="w-10 h-10 md:w-20 md:h-20 lg:w-20 lg:h-20 relative bottom-6 z-10 left-25 md:left-60 items-end justify-end rounded-3xl">
                        <Image
                            src="/tokens/Avalanche.svg"
                            alt="cyclespace exchange vault"
                            height={230}
                            width={230}
                            quality={100}
                            className="object-cover rounded-full relative hover:scale-110 transition-transform duration-300"
                            priority
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </div>
            </div>

            <div className="absolute h-[300px] md:h-auto  left-1/2 transform -translate-x-1/2 translate-y-1/2 justify-center space-x-1 md:space-x-3 items-center flex overflow-hidden">
                <div className="w-full h-full">
                    <svg className="h-80 md:h-160"  width="8" height="611" viewBox="0 0 8 611" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform:""  }}>
                        <defs>
                            {/* Blue Glow Filter */}
                            <filter id="glow7" x="20%" y="20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Static Background Path */}
                        <path
                            d={verticalLinePath}
                            stroke={backgroundColor}
                            strokeWidth="8"
                            strokeLinecap="round"
                            className="dark:stroke-slate-900 stroke-[#D7DDE0]"
                        />

                        {/* Animated Blue Pulse */}
                        <motion.path
                            className="dark:stroke-[#0E76FD] stroke-[#0E76FD]"
                            d={verticalLinePath}
                            stroke={dashColor}
                            strokeWidth="8"
                            strokeLinecap="round"
                            filter="url(#glow7)"
                            style={{
                                strokeDasharray: `${vtDashLength} ${vtGapLength}`,
                            }}
                            initial={{ strokeDashoffset: vtTotalLength }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{
                                duration: 3,
                                delay: 0.2,
                                repeat: Infinity,
                                ease: "linear",
                                repeatType: "loop",
                            }}
                        />
                        
                    </svg>
                </div>

                <div className="w-full h-full">
                    <svg className="h-80 md:h-160" width="8" height="611" viewBox="0 0 8 611" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform:""  }}>
                        <defs>
                            {/* Blue Glow Filter */}
                            <filter id="glow8" x="20%" y="20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Static Background Path */}
                        <path
                            d={verticalLinePath}
                            stroke={backgroundColor}
                            strokeWidth="8"
                            strokeLinecap="round"
                            className="dark:stroke-slate-900 stroke-[#D7DDE0]"
                        />

                        {/* Animated Blue Pulse */}
                        <motion.path
                            className="dark:stroke-[#0E76FD] stroke-[#0E76FD]"
                            d={verticalLinePath}
                            stroke={dashColor}
                            strokeWidth="8"
                            strokeLinecap="round"
                            filter="url(#glow8)"
                            style={{
                                strokeDasharray: `${vtDashLength} ${vtGapLength}`,
                            }}
                            initial={{ strokeDashoffset: vtTotalLength }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{
                                duration: 3,
                                delay: 0.4,
                                repeat: Infinity,
                                ease: "linear",
                                repeatType: "loop",
                            }}
                        />
                        
                    </svg>
                </div>

                <div className="w-full h-full">
                    <svg className="h-80 md:h-160" width="8" height="611" viewBox="0 0 8 611" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform:""  }}>
                        <defs>
                            {/* Blue Glow Filter */}
                            <filter id="glow9" x="20%" y="20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Static Background Path */}
                        <path
                            d={verticalLinePath}
                            stroke={backgroundColor}
                            strokeWidth="8"
                            strokeLinecap="round"
                            className="dark:stroke-slate-900 stroke-[#D7DDE0]"
                        />

                        {/* Animated Blue Pulse */}
                        <motion.path
                            className="dark:stroke-[#0E76FD] stroke-[#0E76FD]"
                            d={verticalLinePath}
                            stroke={dashColor}
                            strokeWidth="8"
                            strokeLinecap="round"
                            filter="url(#glow9)"
                            style={{
                                strokeDasharray: `${vtDashLength} ${vtGapLength}`,
                            }}
                            initial={{ strokeDashoffset: vtTotalLength }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{
                                duration: 3,
                                delay: 0.6,
                                repeat: Infinity,
                                ease: "linear",
                                repeatType: "loop",
                            }}
                        />
                        
                    </svg>
                </div>
            </div>
            


        </div>
    </div>
  );
}