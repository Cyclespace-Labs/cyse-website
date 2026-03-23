import Image from 'next/image'
import React from 'react'
import PulsingPath from '../ui/pulsingPath'

export default function Showcase() {
  return (
    <div className='w-full h-full mx-auto py-10'>

        <main className='h-full w-full justify-center items-center px-50'>

           <div>
            <PulsingPath />
           </div>

            <div className='justify-between relative items-center flex flex-row pt-10 h-fit  -top-130'>
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
                        height={350}
                        width={150}
                        quality={100}
                        className="object-cover relative rounded-xl shadow-2xl "
                        priority
                        referrerPolicy="no-referrer"
                    />
                    <Image 
                        src="/cards/wallet.png"
                        alt="Cryptocurrency background"
                        height={150}
                        width={150}
                        quality={100}
                        className="object-cover relative left-15 -top-10 z-10 rounded-xl shadow-2xl"
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
                    className="object-cover relative left-1/2 transform -translate-x-1/2 -translate-y-50  z-10 rounded-xl shadow-2xl"
                    priority
                    referrerPolicy="no-referrer"
                />
            </div>

        </main>

    </div>
  )
}
