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
                    <div className="bg-blue-500 p-4 rounded-3xl">
                        <svg width="70" height="70" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36 27H15.3808C15.3808 27 13.7276 30.6445 13.4061 31.9924C11.9446 38.1209 11.6489 43.3369 12.3958 49.6157C13.0846 55.407 15.3348 60 15.3348 60H34.9897C34.9897 60 31.1672 54.442 30.1678 51.413C28.6524 46.82 28.7134 43.0756 29.5708 37.9834C30.5237 32.3243 36 27 36 27Z" fill="white"/>
                        <path d="M42.1215 10.1117C36.995 10.4365 31 13.6214 31 13.6214C31 13.6214 37.6059 14.2471 41.2056 15.8402C45.1363 17.5798 47.8011 19.3138 50.2336 22.6579C52.1614 25.3079 52.676 30 52.676 30H73C73 30 72.3827 26.8651 70.4268 23.7067C68.2025 19.3902 63.6667 15.601 59.4797 13.339C53.9577 10.3558 48.6372 9.69891 42.1215 10.1117Z" fill="white" stroke="white"/>
                        <path d="M42.1215 75.8883C36.995 75.5635 31 72.3786 31 72.3786C31 72.3786 37.6059 71.7529 41.2056 70.1598C45.1363 68.4202 47.8011 66.6862 50.2336 63.3421C52.1614 60.6921 52.676 56 52.676 56H73C73 56 72.3827 59.1349 70.4268 62.2933C68.2025 66.6098 63.6667 70.399 59.4797 72.661C53.9577 75.6442 48.6372 76.3011 42.1215 75.8883Z" fill="white" stroke="white"/>
                        </svg>
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