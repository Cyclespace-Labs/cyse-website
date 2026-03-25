import React from 'react'
import { Card, CardFooter, CardHeader } from '../ui/card'
import Image from 'next/image'

export default function Rewards() {
  return (
    <div className='mx-auto w-full h-full py-10'>
        <main className='px-70'>
            <div className='w-full h-full justify-center items-center flex '>
                <h1 className='text-3xl md:text-4xl font-bold text-center w-xl
                    bg-linear-to-b from-black via-slate-800 to-slate-700
                    dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400
                    leading-tight mb-6 bg-clip-text text-transparent'
                >
                    Decentralized. Borderless. Permissionless. Trade.
                </h1>
            </div>

            <div className=' justify-center gap-5 flex items-center py-20'>
                <Card className='h-full w-full gap-1 bg-linear-to-tr from-blue-500 via-blue-900 to-blue-950 leading-tight'>
                    <CardHeader className='w-full h-full justify-center items-center'>
                        <div className='flex -space-x-20 translate-x-30 justify-center items-center'>
                            <Image 
                                src="/assets/cyse-coin.png"
                                alt="cyclespace exchange vault"
                                height={150}
                                width={150}
                                quality={100}
                                className="object-cover relative z-4 left-0 "
                                priority
                                referrerPolicy="no-referrer"
                            />
                            <Image 
                                src="/assets/cyse-coin.png"
                                alt="cyclespace exchange vault"
                                height={150}
                                width={150}
                                quality={100}
                                className="object-cover relative z-3 left-0 "
                                priority
                                referrerPolicy="no-referrer"
                            />
                            <Image 
                                src="/assets/cyse-coin.png"
                                alt="cyclespace exchange vault"
                                height={150}
                                width={150}
                                quality={100}
                                className="object-cover relative z-2 left-0 "
                                priority
                                referrerPolicy="no-referrer"
                            />
                            <Image 
                                src="/assets/cyse-coin.png"
                                alt="cyclespace exchange vault"
                                height={150}
                                width={150}
                                quality={100}
                                className="object-cover relative z-1 left-0 "
                                priority
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    </CardHeader>

                    <CardFooter className='w-full text-left mt-5 px-6 space-y-2 flex flex-col'>
                        <h2 className='text-white text-lg font-bold'>Decentralized. Borderless. Permissionless. Trade.</h2>
                        <h3 className='text-sm text-slate-200'>Trade Directly from Your Wallet. Execute Trades. Retain Ownership.</h3>
                    </CardFooter>
                </Card>
                <Card className='h-full w-full gap-1 bg-linear-to-tr from-blue-500 via-blue-900 to-blue-950 leading-tight'>
                    <CardHeader className='w-full h-full justify-center items-center'>
                        <div className='flex -space-x-20 translate-x-30 justify-center items-center'>
                            <Image 
                                src="/assets/cyse-coin.png"
                                alt="cyclespace exchange vault"
                                height={150}
                                width={150}
                                quality={100}
                                className="object-cover relative z-4 left-0 "
                                priority
                                referrerPolicy="no-referrer"
                            />
                            <Image 
                                src="/assets/cyse-coin.png"
                                alt="cyclespace exchange vault"
                                height={150}
                                width={150}
                                quality={100}
                                className="object-cover relative z-3 left-0 "
                                priority
                                referrerPolicy="no-referrer"
                            />
                            <Image 
                                src="/assets/cyse-coin.png"
                                alt="cyclespace exchange vault"
                                height={150}
                                width={150}
                                quality={100}
                                className="object-cover relative z-2 left-0 "
                                priority
                                referrerPolicy="no-referrer"
                            />
                            <Image 
                                src="/assets/cyse-coin.png"
                                alt="cyclespace exchange vault"
                                height={150}
                                width={150}
                                quality={100}
                                className="object-cover relative z-1 left-0 "
                                priority
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    </CardHeader>

                    <CardFooter className='w-full text-left mt-5 px-6 space-y-2 flex flex-col'>
                        <h2 className='text-white text-lg font-bold'>Decentralized. Borderless. Permissionless. Trade.</h2>
                        <h3 className='text-sm text-slate-200'>Trade Directly from Your Wallet. Execute Trades. Retain Ownership.</h3>
                    </CardFooter>
                </Card>
                <Card className='h-full w-full gap-1 bg-linear-to-tr from-blue-500 via-blue-900 to-blue-950 leading-tight'>
                    <CardHeader className='w-full h-full justify-center items-center'>
                        <div className='flex -space-x-20 translate-x-30 justify-center items-center'>
                            <Image 
                                src="/assets/cyse-coin.png"
                                alt="cyclespace exchange vault"
                                height={150}
                                width={150}
                                quality={100}
                                className="object-cover relative z-4 left-0 "
                                priority
                                referrerPolicy="no-referrer"
                            />
                            <Image 
                                src="/assets/cyse-coin.png"
                                alt="cyclespace exchange vault"
                                height={150}
                                width={150}
                                quality={100}
                                className="object-cover relative z-3 left-0 "
                                priority
                                referrerPolicy="no-referrer"
                            />
                            <Image 
                                src="/assets/cyse-coin.png"
                                alt="cyclespace exchange vault"
                                height={150}
                                width={150}
                                quality={100}
                                className="object-cover relative z-2 left-0 "
                                priority
                                referrerPolicy="no-referrer"
                            />
                            <Image 
                                src="/assets/cyse-coin.png"
                                alt="cyclespace exchange vault"
                                height={150}
                                width={150}
                                quality={100}
                                className="object-cover relative z-1 left-0 "
                                priority
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    </CardHeader>

                    <CardFooter className='w-full text-left mt-5 px-6 space-y-2 flex flex-col'>
                        <h2 className='text-white text-lg font-bold'>Decentralized. Borderless. Permissionless. Trade.</h2>
                        <h3 className='text-sm text-slate-200'>Trade Directly from Your Wallet. Execute Trades. Retain Ownership.</h3>
                    </CardFooter>
                </Card>
            </div>
        </main>
    </div>
  )
}
