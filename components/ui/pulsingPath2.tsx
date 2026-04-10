"use client";

//this is just GSAP animation example code

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function PulsingPath2() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Path data
    const pathData = "M4.00069 4.00073C5.60069 6.80073 43.7043 65.3007 57.7043 82.3007C57.7043 82.3007 70.2043 96.3007 83.2043 102.801C92.2043 107.301 109.704 107.301 109.704 107.301H258.704";
    const straightLinePath = "M4 4H322";
    const verticalLinePath = "M4 4V607";

    // Path lengths (must match actual SVG path lengths)
    const dashLength = 80;
    const gapLength = 345;
    const totalLength = 425;

    const stTotalLength = 318;
    const stDashLength = 80;
    const stGapLength = 238;

    const vtTotalLength = 603;
    const vtDashLength = 80;
    const vtGapLength = 523;

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Curved paths (scaleY and scaleX variants)
            const curvedPaths = [
                { id: "curve1", offset: 0, reverse: false },
                { id: "curve2", offset: 0, reverse: true, scaleX: -1 },
                { id: "curve3", offset: 0, reverse: false, scaleY: -1 },
                { id: "curve4", offset: 0, reverse: true, scaleX: -1, scaleY: -1 },
            ];

            curvedPaths.forEach((config) => {
                const element = document.querySelector(`[data-path="${config.id}"]`);
                if (element) {
                    gsap.fromTo(
                        element,
                        { strokeDashoffset: config.reverse ? totalLength : 0 },
                        {
                            strokeDashoffset: config.reverse ? 0 : totalLength,
                            duration: 3,
                            repeat: -1,
                            ease: "none",
                        }
                    );
                }
            });

            // Straight horizontal lines
            const straightPaths = [
                { id: "straight1", delay: 0, reverse: true },
                { id: "straight2", delay: 0, reverse: false },
            ];

            straightPaths.forEach((config) => {
                const element = document.querySelector(`[data-path="${config.id}"]`);
                if (element) {
                    gsap.fromTo(
                        element,
                        { strokeDashoffset: config.reverse ? stTotalLength : 0 },
                        {
                            strokeDashoffset: config.reverse ? 0 : stTotalLength,
                            duration: 3,
                            delay: config.delay,
                            repeat: -1,
                            ease: "none",
                        }
                    );
                }
            });

            // Vertical lines
            const verticalPaths = [
                { id: "vertical1", delay: 0.2 },
                { id: "vertical2", delay: 0.4 },
                { id: "vertical3", delay: 0.6 },
            ];

            verticalPaths.forEach((config) => {
                const element = document.querySelector(`[data-path="${config.id}"]`);
                if (element) {
                    gsap.fromTo(
                        element,
                        { strokeDashoffset: vtTotalLength },
                        {
                            strokeDashoffset: 0,
                            duration: 3,
                            delay: config.delay,
                            repeat: -1,
                            ease: "none",
                        }
                    );
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="p-10 h-fit">
            <div className="grid w-full justify-center items-center gap-2 md:gap-6 lg:gap-6 space-y-0 h-fit">
                {/* Left design */}
                <div className="flex justify-center items-center gap-0 space-y-0 h-fit">
                    <div className="relative">
                        <div className="w-10 h-10 md:w-20 md:h-20 lg:w-20 lg:h-20 relative right-6 top-3 md:right-12 md:top-6 lg:right-12 lg:top-6 z-10 items-start justify-start rounded-full">
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

                        <svg
                            className="w-32 h-fit md:w-64 md:h-fit lg:w-64 lg:h-fit"
                            width="263"
                            height="112"
                            viewBox="0 0 263 112"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <filter
                                    id="glow1"
                                    x="-50%"
                                    y="-50%"
                                    width="200%"
                                    height="200%"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* Static Background Path */}
                            <path
                                d={pathData}
                                stroke="#D7DDE0"
                                strokeWidth="8"
                                strokeLinecap="round"
                                className="dark:stroke-slate-900"
                            />

                            {/* Animated Blue Pulse */}
                            <path
                                data-path="curve1"
                                d={pathData}
                                stroke="#0E76FD"
                                strokeWidth="8"
                                strokeLinecap="round"
                                filter="url(#glow1)"
                                strokeDasharray={`${dashLength} ${gapLength}`}
                                pathLength={totalLength}
                                fill="none"
                                style={{ overflow: 'visible' }}
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
                                className="object-cover rounded-full relative"
                                priority
                                referrerPolicy="no-referrer"
                            />
                        </div>

                        <svg
                            className="w-32 h-fit md:w-64 md:h-fit lg:w-64 lg:h-fit"
                            width="263"
                            height="112"
                            viewBox="0 0 263 112"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ transform: "scaleX(-1)" }}
                        >
                            <defs>
                                <filter
                                    id="glow2"
                                    x="-20%"
                                    y="-20%"
                                    width="140%"
                                    height="140%"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            <path
                                d={pathData}
                                stroke="#D7DDE0"
                                strokeWidth="8"
                                strokeLinecap="round"
                                className="dark:stroke-slate-900"
                            />

                            <path
                                data-path="curve2"
                                d={pathData}
                                stroke="#0E76FD"
                                strokeWidth="8"
                                strokeLinecap="round"
                                filter="url(#glow2)"
                                strokeDasharray={`${dashLength} ${gapLength}`}
                                pathLength={totalLength}
                                fill="none"
                                style={{ overflow: 'visible' }}
                            />
                        </svg>
                    </div>
                </div>

                {/* Middle logo */}
                <div className="relative items-center justify-center bottom-12 md:bottom-15">
                    <div className="absolute flex left-1/2 transform -translate-x-1/2 z-10 justify-center items-center rounded-2xl md:rounded-4xl lg:rounded-4xl w-23 h-23 md:w-30 md:h-30 lg:w-30 lg:h-30">
                        <div className="bg-blue-500 p-2.5 md:p-5 lg:p-5 rounded-xl md:rounded-3xl lg:rounded-3xl">
                            <Image
                                src="/logo_white.svg"
                                alt="cyclespace exchange vault"
                                height={500}
                                width={500}
                                quality={100}
                                className="object-cover w-8 h-8 md:w-15 md:h-15 lg:w-15 lg:h-15"
                                priority
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    </div>
                </div>

                {/* Middle design */}
                <div className="absolute left-1/2 transform -translate-x-1/2 justify-center items-center w-full">
                    <div className="w-full h-fit flex flex-row items-center justify-center gap-0 md:gap-20">
                        {/* Left Horizontal Line */}
                        <div className="flex relative flex-row items-center space-x-0">
                            <div className="relative left-2 z-10 items-start justify-start">
                                <div className="w-12 h-12 md:w-22 md:h-22 lg:w-22 lg:h-22 p-1 rounded-2xl justify-center items-center flex">
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

                            <svg
                                className="w-32 md:w-80 overflow-visible"
                                width="326"
                                height="16"
                                viewBox="-4 -4 326 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ transform: "scaleX(-1)" }}
                            >
                                <defs>
                                    <filter
                                        id="glow3"
                                        x="-50%"
                                        y="-50%"
                                        width="200%"
                                        height="200%"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feGaussianBlur stdDeviation="4" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                <path
                                    d={straightLinePath}
                                    stroke="#D7DDE0"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    className="dark:stroke-slate-900"
                                />

                                <path
                                    data-path="straight1"
                                    d={straightLinePath}
                                    stroke="#0E76FD"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    filter="url(#glow3)"
                                    strokeDasharray={`${stDashLength} ${stGapLength}`}
                                    pathLength={stTotalLength}
                                    fill="none"
                                />
                            </svg>
                        </div>

                        {/* Right Horizontal Line */}
                        <div className="flex relative flex-row items-center space-x-0">
                            <svg
                                className="w-32 md:w-80 overflow-visible"
                                width="326"
                                height="16"
                                viewBox="-4 -4 326 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <filter
                                        id="glow4"
                                        x="-50%"
                                        y="-50%"
                                        width="200%"
                                        height="200%"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feGaussianBlur stdDeviation="4" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                <path
                                    d={straightLinePath}
                                    stroke="#D7DDE0"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    className="dark:stroke-slate-900"
                                />

                                <path
                                    data-path="straight2"
                                    d={straightLinePath}
                                    stroke="#0E76FD"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    filter="url(#glow4)"
                                    strokeDasharray={`${stDashLength} ${stGapLength}`}
                                    pathLength={stTotalLength}
                                    fill="none"
                                />
                            </svg>

                            <div className="relative right-3 md:right-2 z-10 items-start justify-start">
                                <div className="w-12 h-12 md:w-22 md:h-22 lg:w-22 lg:h-22 p-1 rounded-2xl justify-center items-center flex">
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

                {/* Right design */}
                <div className="flex justify-center items-center gap-0 md:gap-0 h-fit">
                    <div className="relative">
                        <svg
                            className="w-32 h-fit md:w-64 md:h-fit lg:w-64 lg:h-fit"
                            width="263"
                            height="112"
                            viewBox="0 0 263 112"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ transform: "scaleY(-1)" }}
                        >
                            <defs>
                                <filter
                                    id="glow5"
                                    x="-20%"
                                    y="-20%"
                                    width="140%"
                                    height="140%"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            <path
                                d={pathData}
                                stroke="#D7DDE0"
                                strokeWidth="8"
                                strokeLinecap="round"
                                className="dark:stroke-slate-900"
                            />

                            <path
                                data-path="curve3"
                                d={pathData}
                                stroke="#0E76FD"
                                strokeWidth="8"
                                strokeLinecap="round"
                                filter="url(#glow5)"
                                strokeDasharray={`${dashLength} ${gapLength}`}
                                pathLength={totalLength}
                                fill="none"
                                style={{ overflow: 'visible' }}
                            />
                        </svg>

                        <div className="w-10 h-10 md:w-20 md:h-20 lg:w-20 lg:h-20 bottom-5 z-10 relative right-6 md:right-14 items-end justify-end rounded-3xl">
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
                    </div>

                    <div className="relative">
                        <svg
                            className="w-32 h-fit md:w-64 md:h-fit lg:w-64 lg:h-fit"
                            width="263"
                            height="112"
                            viewBox="0 0 263 112"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ transform: "scaleX(-1) scaleY(-1)" }}
                        >
                            <defs>
                                <filter
                                    id="glow6"
                                    x="-20%"
                                    y="-20%"
                                    width="140%"
                                    height="140%"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            <path
                                d={pathData}
                                stroke="#D7DDE0"
                                strokeWidth="8"
                                strokeLinecap="round"
                                className="dark:stroke-slate-900"
                            />

                            <path
                                data-path="curve4"
                                d={pathData}
                                stroke="#0E76FD"
                                strokeWidth="8"
                                strokeLinecap="round"
                                filter="url(#glow6)"
                                strokeDasharray={`${dashLength} ${gapLength}`}
                                pathLength={totalLength}
                                fill="none"
                                style={{ overflow: 'visible' }}
                            />
                        </svg>

                        <div className="w-10 h-10 md:w-20 md:h-20 lg:w-20 lg:h-20 relative bottom-6 z-10 left-25 md:left-60 items-end justify-end rounded-3xl">
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

                {/* Bottom vertical lines */}
                <div className="absolute h-[300px] md:h-auto left-1/2 transform -translate-x-1/2 translate-y-1/2 justify-center space-x-1 md:space-x-3 items-center flex overflow-hidden">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-full h-full">
                            <svg
                                className="h-80 md:h-160 overflow-visible"
                                width="16"
                                height="619"
                                viewBox="-4 -4 16 619"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <filter
                                        id={`glow${6 + i}`}
                                        x="-50%"
                                        y="-20%"
                                        width="200%"
                                        height="140%"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feGaussianBlur stdDeviation="4" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                <path
                                    d={verticalLinePath}
                                    stroke="#D7DDE0"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    className="dark:stroke-slate-900"
                                />

                                <path
                                    data-path={`vertical${i}`}
                                    d={verticalLinePath}
                                    stroke="#0E76FD"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    filter={`url(#glow${6 + i})`}
                                    strokeDasharray={`${vtDashLength} ${vtGapLength}`}
                                    pathLength={vtTotalLength}
                                    fill="none"
                                />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
