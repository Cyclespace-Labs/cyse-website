"use client"

import Image from 'next/image'
import React from 'react'
import PulsingPath from '../ui/pulsingPath'
import PulsingPath2 from '../ui/pulsingPath2'

export default function Showcase() {
  return (
    <div className='w-full h-full mx-auto py-10 font-sans'>

        <main className='h-full w-full justify-center items-center px-10 md:px-25 lg:px-40'>

            <div className='w-full h-full justify-center items-center flex pb-5'>
                <h1 className='text-xl md:text-4xl font-bold text-center w-xl
                    bg-linear-to-b from-black via-slate-800 to-slate-700
                    dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400
                    leading-tight mb-6 bg-clip-text text-transparent'
                >
                    Decentralized. Borderless. Permissionless. Trade.
                </h1>
            </div>

           <div className=''>
            <PulsingPath />
           </div>

            <div className='justify-between hidden md:hidden lg:flex relative items-center w-full flex-row pt-10 h-fit -top-130  md:-top-130 lg:-top-130'>
                <div className='h-fit flex flex-col'>

                    <Image 
                        src="/cards/sell_light.png"
                        alt="Cryptocurrency background"
                        height={420}
                        width={250}
                        quality={100}
                        className="object-contain h-70 w-35 relative dark:hidden flex left-15 z-10 rounded-lg shadow-2xl hover:scale-110 transition-transform duration-300"
                        priority
                        referrerPolicy="no-referrer"
                    />

                    <Image 
                        src="/cards/sell_dark.png"
                        alt="Cryptocurrency background"
                        height={420}
                        width={250}
                        quality={100}
                        className="object-contain h-70 w-35 dark:flex hidden relative left-15 z-10 rounded-lg shadow-2xl hover:scale-110 transition-transform duration-300"
                        priority
                        referrerPolicy="no-referrer"
                    />

                    <Image
                        src="/cards/buy_light.png"
                        alt="Cryptocurrency background"
                        height={420}
                        width={250}
                        quality={100}
                        className="object-contain h-70 w-35 dark:hidden flex relative -top-20 rounded-lg shadow-2xl hover:scale-110 transition-transform duration-300"
                        priority
                        referrerPolicy="no-referrer"
                    />

                    <Image
                        src="/cards/buy_dark.png"
                        alt="Cryptocurrency background"
                        height={420}
                        width={250}
                        quality={100}
                        className="object-contain h-70 w-35 dark:flex hidden relative -top-20 rounded-lg shadow-2xl hover:scale-110 transition-transform duration-300"
                        priority
                        referrerPolicy="no-referrer"
                    />

                </div>
                <div className='h-fit flex flex-col'>
                    <Image
                        src="/cards/swap_light.png"
                        alt="Cryptocurrency background"
                        height={420}
                        width={250}
                        quality={100}
                        className="object-contain h-70 w-35 dark:hidden flex relative rounded-lg shadow-2xl hover:scale-110 transition-transform duration-300"
                        priority
                        referrerPolicy="no-referrer"
                    />

                    <Image
                        src="/cards/swap_dark.png"
                        alt="Cryptocurrency background"
                        height={420}
                        width={250}
                        quality={100}
                        className="object-contain h-70 w-35 dark:flex hidden relative rounded-sm shadow-2xl hover:scale-110 transition-transform duration-300"
                        priority
                        referrerPolicy="no-referrer"
                    />

                    <Image 
                        src="/cards/order_light.png"
                        alt="Cryptocurrency background"
                        height={1000}
                        width={1000}
                        quality={100}
                        className="object-fit h-60 w-35 dark:hidden flex relative left-8 md:left-15 lg:left-15 -top-10 z-10 rounded-sm shadow-2xl hover:scale-110 transition-transform duration-300"
                        priority
                        referrerPolicy="no-referrer"
                    />

                    <Image 
                        src="/cards/order_dark.png"
                        alt="Cryptocurrency background"
                        height={1080}
                        width={1920}
                        quality={100}
                        className="object-fit h-60 w-35 relative dark:flex hidden left-8 md:left-15 lg:left-15 -top-10 z-10 rounded-sm shadow-2xl hover:scale-110 transition-transform duration-300"
                        priority
                        referrerPolicy="no-referrer"
                    />
                </div>
            </div>

            <div>
                <Image 
                    src="/cards/light_dash.png"
                    alt="Cryptocurrency background"
                    height={967}
                    width={1877}
                    quality={100}
                    className="object-fit w-250 h-125 dark:hidden flex relative left-1/2 transform -translate-x-1/2 -translate-y-1 md:-translate-y-60  z-10 rounded-sm shadow-2xl hover:scale-110 transition-transform duration-300"
                    priority
                    referrerPolicy="no-referrer"
                />

                <Image 
                    src="/cards/dark_dash.png"
                    alt="Cryptocurrency background"
                    height={967}
                    width={1877}
                    quality={100}
                    className="object-fit w-250 h-125  dark:flex hidden relative left-1/2 transform -translate-x-1/2 -translate-y-1 md:-translate-y-60  z-10 rounded-sm shadow-2xl hover:scale-110 transition-transform duration-300"
                    priority
                    referrerPolicy="no-referrer"
                />
            </div>

        </main>

    </div>
  )
}
