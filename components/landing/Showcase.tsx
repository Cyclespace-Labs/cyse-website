"use client";

import Image from "next/image";
import React, { lazy, Suspense } from "react";

// Lazy load the heavy PulsingPath component (it contains many SVGs and animations)
const PulsingPath = lazy(() => import("../ui/pulsingPath"));

export default function Showcase() {
  return (
    <div className="w-full h-full mx-auto pt-10 font-sans">
      <main className="h-full w-full justify-center items-center px-20 md:px-25 lg:px-40">

        <div className="w-full h-full justify-center items-center flex pb-5">
          <h1
            className="text-xl md:text-4xl font-bold text-center w-xl
              bg-linear-to-b from-black via-slate-800 to-slate-700
              dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400
              leading-tight mb-6 bg-clip-text text-transparent"
          >
            Decentralized. Borderless. Permissionless. Trade.
          </h1>
        </div>

        <div className="flex justify-center">
          <Suspense
            fallback={
              <div className="h-40 w-full animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl" />
            }
          >
            <div className="z-30">
              <PulsingPath />
            </div>
          </Suspense>
        </div>

        {/* Desktop card stack - hidden on mobile/tablet, only visible on large screens */}
        <div className="justify-between hidden lg:flex relative items-center w-full flex-row pt-10 h-fit -top-130">
          {/* Left column */}
          <div className="h-fit flex flex-col">
            <Image
              src="/cards/sell_light.png"
              alt="Sell interface"
              width={250}
              height={420}
              quality={100}
              className="object-fit h-80 w-40 relative left-15 z-10 rounded-lg shadow-2xl hover:scale-110 transition-transform duration-300 dark:hidden"
              loading="lazy"
            />
            <Image
              src="/cards/sell_dark.png"
              alt="Sell interface dark"
              width={250}
              height={420}
              quality={100}
              className="object-fit h-80 w-40 h-70 w-35 relative left-15 z-10 rounded-lg shadow-2xl hover:scale-110 transition-transform duration-300 hidden dark:flex"
              loading="lazy"
            />
            <Image
              src="/cards/buy_light.png"
              alt="Buy interface"
              width={250}
              height={420}
              quality={100}
              className="object-fit h-80 w-40 relative -top-20 rounded-lg shadow-2xl hover:scale-110 transition-transform duration-300 dark:hidden"
              loading="lazy"
            />
            <Image
              src="/cards/buy_dark.png"
              alt="Buy interface dark"
              width={250}
              height={420}
              quality={100}
              className="object-fit h-80 w-40 relative -top-20 rounded-lg shadow-2xl hover:scale-110 transition-transform duration-300 hidden dark:flex"
              loading="lazy"
            />
          </div>

          {/* Middle column */}
          <div className="h-fit flex flex-col">
            <Image
              src="/cards/swap_light.png"
              alt="Swap interface"
              width={250}
              height={420}
              quality={100}
              className="object-fit h-80 w-40 rounded-lg shadow-2xl hover:scale-110 transition-transform duration-300 dark:hidden"
              loading="lazy"
            />
            <Image
              src="/cards/swap_dark.png"
              alt="Swap interface dark"
              width={250}
              height={420}
              quality={100}
              className="object-fit h-80 w-40 rounded-sm shadow-2xl hover:scale-110 transition-transform duration-300 hidden dark:flex"
              loading="lazy"
            />
            <Image
              src="/cards/order_light.png"
              alt="Order interface"
              width={250}
              height={400}
              quality={100}
              className="object-fit h-67 w-42 relative left-8 md:left-15 -top-10 z-10 rounded-sm shadow-2xl hover:scale-110 transition-transform duration-300 dark:hidden"
              loading="lazy"
            />
            <Image
              src="/cards/order_dark.png"
              alt="Order interface dark"
              width={250}
              height={400}
              quality={100}
              className="object-fit h-67 w-42 relative left-8 md:left-15 -top-10 z-10 rounded-sm shadow-2xl hover:scale-110 transition-transform duration-300 hidden dark:flex"
              loading="lazy"
            />
          </div>
        </div>

        {/* Main dashboard image - visible on all screens */}
        <div className="">
          <Image
            src="/cards/light_dash.png"
            alt="Dashboard light"
            width={1877}
            height={967}
            quality={100}
            className="object-fit w-full h-auto relative left-1/2 transform -translate-x-1/2 -translate-y-1 md:-translate-y-60 z-40 rounded-sm shadow-2xl hover:scale-110 transition-transform duration-300 dark:hidden"
            loading="lazy"
          />
          <Image
            src="/cards/dark_dash.png"
            alt="Dashboard dark"
            width={1877}
            height={967}
            quality={100}
            className="object-fit w-full h-auto relative left-1/2 transform -translate-x-1/2 -translate-y-1 md:-translate-y-60 z-40 rounded-sm shadow-2xl hover:scale-110 transition-transform duration-300 hidden dark:flex"
            loading="lazy"
          />
        </div>
      </main>
    </div>
  );
}