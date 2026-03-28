import Image from 'next/image'
import React from 'react'
import PulsingPath from '../ui/pulsingPath'

export default function Showcase() {
  return (
    <div className='w-full h-full mx-auto py-10 font-sans'>

        <main className='h-full w-full justify-center items-center px-10 md:px-25 lg:px-50'>

            <div className='w-full h-full justify-center items-center flex pb-5'>
                <h1 className='text-2xl md:text-4xl font-bold text-center w-xl
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

            <div className='justify-between hidden md:flex lg:flex relative items-center  flex-row pt-10 h-fit -top-130  md:-top-130 lg:-top-130'>
                <div className='h-fit flex flex-col'>
                    <Image 
                        src="/cards/stats.png"
                        alt="Cryptocurrency background"
                        height={150}
                        width={150}
                        quality={100}
                        className="object-cover relative left-15 z-10 rounded-xl shadow-2xl"
                        priority
                        referrerPolicy="no-referrer"
                    />

                    <Image
                        src="/cards/orders.png"
                        alt="Cryptocu rrency background"
                        height={350}
                        width={150}
                        quality={100}
                        className="object-cover relative -top-20 rounded-xl shadow-2xl"
                        priority
                        referrerPolicy="no-referrer"
                    />
                </div>
                <div className='h-fit flex flex-col'>
                    <Image
                        src="/cards/swap.png"
                        alt="Cryptocu rrency background"
                        height={1000}
                        width={1000}
                        quality={100}
                        className="object-cover relative rounded-sm md:rounded-xl shadow-2xl h-25 w-15  md:h-65 md:w-38 lg:h-65 lg:w-38  "
                        priority
                        referrerPolicy="no-referrer"
                    />
                    <Image 
                        src="/cards/wallet.png"
                        alt="Cryptocurrency background"
                        height={1000}
                        width={1000}
                        quality={100}
                        className="object-cover relative left-8 md:left-15 lg:left-15 -top-10 z-10 rounded-sm md:rounded-xl lg:rounded-xl shadow-2xl h-15 w-20  md:h-65 md:w-38 lg:h-25 lg:w-38"
                        priority
                        referrerPolicy="no-referrer"
                    />
                </div>
            </div>

            <div>
                <Image 
                    src="/white_dashboard.png"
                    alt="Cryptocurrency background"
                    height={600}
                    width={1200}
                    quality={100}
                    className="object-cover relative left-1/2 transform -translate-x-1/2 -translate-y-1 md:-translate-y-60  z-10 rounded-xl shadow-2xl"
                    priority
                    referrerPolicy="no-referrer"
                />
            </div>

        </main>

    </div>
  )
}
