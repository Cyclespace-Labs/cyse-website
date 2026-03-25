"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PulsingPath() {

    const pathData = "M4.00069 4.00073C5.60069 6.80073 43.7043 65.3007 57.7043 82.3007C57.7043 82.3007 70.2043 96.3007 83.2043 102.801C92.2043 107.301 109.704 107.301 109.704 107.301H258.704";
    const straightLinePath = "M4 4H322"; // Straight horizontal line for highlights  
    const verticalLinePath = "M4 4V607"

    // dashLength + gapLength must equal the total path length for a seamless loop.
    const dashLength = 80;
    const gapLength = 345;
    const totalLength = 425; // actual path length (dashLength + gapLength)

    // The straight line path "M4 4H322" has a length of 425px.
    const stDashLength = 80;
    const stGapLength = 300;
    const stTotalLength = 380; // actual path length (dashLength + gapLength)

    //Color theme
    const backgroundColor = "#D7DDE0";
    const dashColor = "#0E76FD";

    return (
    <div className="p-10 h-fit">
        <div className="grid w-full  justify-center items-center gap-6 space-y-0 h-fit">

            {/* left design*/}
            <div className="flex justify-center items-center gap-0 space-y-0 h-fit">

                <div className="relative">

                    <div className="w-20 h-20 relative right-12 top-6 z-10 items-start justify-start rounded-full">
                        <Image
                            src="/tokens/Bitcoin.svg"
                            alt="cyclespace exchange vault"
                            height={230}
                            width={230}
                            quality={100}
                            className="object-cover rounded-full relative"
                            priority
                            referrerPolicy="no-referrer"
                        />
                    </div>
                    
                    <svg width="263" height="112" viewBox="0 0 263 112" fill="none" xmlns="http://www.w3.org" style={{ transform: "scaleY(1)" }}>
                        <defs>
                        {/* Blue Glow Filter */}
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
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
                        />
                        
                        {/* Animated Blue Pulse */}
                        <motion.path
                            d={pathData}
                            stroke={dashColor} // Vibrant Blue
                            strokeWidth="8"
                            strokeLinecap="round"
                            filter="url(#glow)" // Applying the glow filter
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

                    <div className=" w-20 h-20 relative top-6 z-10 left-55 items-end justify-end rounded-3xl">
                        <Image
                            src="/tokens/USD Coin.svg"
                            alt="cyclespace exchange vault"
                            height={230}
                            width={230}
                            quality={100}
                            className="object-cover rounded-full relative"
                            priority
                            referrerPolicy="no-referrer"
                        />
                    </div>

                    <svg width="263" height="112" viewBox="0 0 263 112" fill="none" xmlns="http://www.w3.org" style={{ transform: "scaleX(-1)" }}>
                        <defs>
                        {/* Blue Glow Filter */}
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
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
                        />
                        
                        {/* Animated Blue Pulse */}
                        <motion.path
                            d={pathData}
                            stroke={dashColor} // Vibrant Blue
                            strokeWidth="8"
                            strokeLinecap="round"
                            filter="url(#glow)" // Applying the glow filter
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
            <div className="relative items-center justify-center bottom-15 ">
                <div className="absolute flex left-1/2 transform -translate-x-1/2 z-10 justify-center items-center rounded-4xl w-30 h-30">
                    <div className="bg-blue-500 p-5 rounded-3xl">
                        <Image
                            src="/logo_white.svg"
                            alt="cyclespace exchange vault"
                            height={500}
                            width={500}
                            quality={100}
                            className="object-cover w-15 h-15"
                            priority
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </div>
            </div>

  

            {/* middle design*/} 
            <div className="absolute left-1/2 transform -translate-x-1/2 justify-center items-center w-full">
                {/* Left Horizontal Line — dash starts from right, travels left (negative offset → 0) */}
                <div className="w-full h-fit flex flex-row items-center justify-center gap-10">

                    <div className="flex relative flex-row items-center  space-x-0">

                        <div className="w-20 h-20 relative left-2 z-10 items-start justify-start rounded-3xl ">
                            <div className=" p-1 w-full h-full rounded-2xl justify-center items-center flex">
                                <Image
                                    src="/tokens/Solana Sol.svg"
                                    alt="cyclespace exchange vault"
                                    height={230}
                                    width={230}
                                    quality={100}
                                    className="object-cover rounded-full relative"
                                    priority
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>

                        <svg width="318" height="8" viewBox="0 0 318 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform:"scaleX(-1)", overflow: "visible" }}>
                            <defs>
                                {/* Blue Glow Filter */}
                                <filter 
                                    id="glow" 
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
                            />
                            
                            {/* Animated Blue Pulse */}
                            <motion.path
                                d={straightLinePath}
                                stroke={dashColor}
                                strokeWidth="8"
                                strokeLinecap="round"
                                filter="url(#glow)"
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
                        <svg width="318" height="8" viewBox="0 0 318 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                {/* Blue Glow Filter */}
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
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
                            />
                            
                            {/* Animated Blue Pulse */}
                            <motion.path
                            d={straightLinePath}
                            stroke={dashColor}
                            strokeWidth="8"
                            strokeLinecap="round"
                            filter="url(#glow)"
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

                        <div className="w-20 h-20 relative right-2  z-10 items-start justify-start rounded-3xl">
                            <div className=" p-1 w-full h-full rounded-2xl justify-center items-center flex">
                                <Image
                                    src="/tokens/Polygon.svg"
                                    alt="cyclespace exchange vault"
                                    height={230}
                                    width={230}
                                    quality={100}
                                    className="object-cover rounded-full relative"
                                    priority
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* right design*/}
            <div className="flex justify-center items-center gap-5 h-fit">
                <div className="relative">

                    <svg width="263" height="112" viewBox="0 0 263 112" fill="none" xmlns="http://www.w3.org" style={{ transform: "scaleY(-1)" }}>
                        <defs>
                        {/* Blue Glow Filter */}
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%" className="">
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
                        />
                        
                        {/* Animated Blue Pulse */}
                        <motion.path
                            d={pathData}
                            stroke={dashColor} // Vibrant Blue
                            strokeWidth="8"
                            strokeLinecap="round"
                            filter="url(#glow)" // Applying the glow filter
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

                    <div className=" w-20 h-20 bottom-6 z-10 relative right-14 items-end justify-end rounded-3xl">
                        <Image
                            src="/tokens/XRP.svg"
                            alt="cyclespace exchange vault"
                            height={230}
                            width={230}
                            quality={100}
                            className="object-cover rounded-full relative"
                            priority
                            referrerPolicy="no-referrer"
                        />
                    </div>

                </div>s

                <div className="relative">
                    <svg width="263" height="112" viewBox="0 0 263 112" fill="none" xmlns="http://www.w3.org" style={{ transform: "scaleX(-1) scaleY(-1)" }}>
                        <defs>
                        {/* Blue Glow Filter */}
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
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
                        />
                        
                        {/* Animated Blue Pulse */}
                        <motion.path
                        d={pathData}
                            stroke={dashColor} // Vibrant Blue
                            strokeWidth="8"
                            strokeLinecap="round"
                            filter="url(#glow)" // Applying the glow filter
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

                    <div className=" w-20 h-20 relative bottom-6 z-10 left-60 items-end justify-end rounded-3xl">
                        <Image
                            src="/tokens/Avalanche.svg"
                            alt="cyclespace exchange vault"
                            height={230}
                            width={230}
                            quality={100}
                            className="object-cover rounded-full relative"
                            priority
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </div>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 justify-center space-x-3 items-center flex">
                <div className="w-full h-full">
                    <svg width="8" height="611" viewBox="0 0 8 611" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform:""  }}>
                        <defs>
                            {/* Blue Glow Filter */}
                            <filter id="glow" x="20%" y="20%" width="140%" height="140%">
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
                        />
                        
                        {/* Animated Blue Pulse */}
                        <motion.path
                            d={verticalLinePath}
                            stroke={dashColor}
                            strokeWidth="8"
                            strokeLinecap="round"
                            filter="url(#glow)"
                            style={{
                                strokeDasharray: `${stDashLength} ${stGapLength}`,
                            }}
                            initial={{ strokeDashoffset: stTotalLength }}
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
                    <svg width="8" height="611" viewBox="0 0 8 611" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform:""  }}>
                        <defs>
                            {/* Blue Glow Filter */}
                            <filter id="glow" x="20%" y="20%" width="140%" height="140%">
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
                        />
                        
                        {/* Animated Blue Pulse */}
                        <motion.path
                            d={verticalLinePath}
                            stroke={dashColor}
                            strokeWidth="8"
                            strokeLinecap="round"
                            filter="url(#glow)"
                            style={{
                                strokeDasharray: `${stDashLength} ${stGapLength}`,
                            }}
                            initial={{ strokeDashoffset: stTotalLength }}
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
                    <svg width="8" height="611" viewBox="0 0 8 611" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform:""  }}>
                        <defs>
                            {/* Blue Glow Filter */}
                            <filter id="glow" x="20%" y="20%" width="140%" height="140%">
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
                        />
                        
                        {/* Animated Blue Pulse */}
                        <motion.path
                            d={verticalLinePath}
                            stroke={dashColor}
                            strokeWidth="8"
                            strokeLinecap="round"
                            filter="url(#glow)"
                            style={{
                                strokeDasharray: `${stDashLength} ${stGapLength}`,
                            }}
                            initial={{ strokeDashoffset: stTotalLength }}
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