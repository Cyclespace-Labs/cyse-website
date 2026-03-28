import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { ArrowLeft, ArrowLeftIcon, ArrowRightIcon, ChevronRight } from 'lucide-react'

export default function Chains() {
  return (
    <div className='mx-auto h-full w-full py-30 font-sans'>
        <main className='justify-center py-20 px-20 md:px-70'>
            <div className='w-full h-full grid grid-cols-2'>
                <div className='gap-5 flex flex-col'>
                    <h1 className='text-2xl text-left md:text-4xl font-bold w-xl
                        bg-linear-to-b from-black via-slate-800 to-slate-700
                        dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400
                        leading-tight  bg-clip-text text-transparent'
                    >
                        Decentralized. Borderless. Permissionless. Trade.
                    </h1>
                    <h2 className='text-xs md:text-sm w-md'>Trade Directly from Your Wallet. Execute Trades. Retain Ownership.</h2>
                    <Button className='w-fit bg-blue-500'>Explore Markets</Button>
                </div>
                
                <div className='grid grid-cols-2 w-full h-full gap-3'>
                    <div className='w-full h-full text- gap-3 space-y-2 grid grid-rows-3 '>
                        <Button className=' rounded-xl text-lg text-black justify-start p-6  bg-zinc-200'>
                            <Image
                                src='/tokens/Ethereum ETH.svg' 
                                alt=''
                                quality={100}
                                width={20}
                                height={20}
                                className="object-cover rounded-full shadow-2xl"
                                priority
                                referrerPolicy="no-referrer"
                            /> 
                            Ethereum
                            <div className='w-full justify-end flex'> 
                                <ChevronRight className='text-right text-zinc-400' />
                            </div>
                        </Button>
                        <Button className=' rounded-xl text-lg text-black justify-start p-6  bg-zinc-200'>
                            <Image
                                src='/tokens/Avalanche.svg' 
                                alt=''
                                quality={100}
                                width={20}
                                height={20}
                                className="object-cover rounded-full shadow-2xl"
                                priority
                                referrerPolicy="no-referrer"
                            /> 
                            Avalanche
                            <div className='w-full justify-end flex'>
                               <ChevronRight className='text-right text-zinc-400' />
                            </div>
                        </Button>
                        <Button className=' rounded-xl text-lg text-black justify-start p-6  bg-zinc-200'>
                            <Image
                                src='/tokens/arbitrum-arb-logo.svg' 
                                alt=''
                                quality={100}
                                width={20}
                                height={20}
                                className="object-cover rounded-full shadow-2xl"
                                priority
                                referrerPolicy="no-referrer"
                            /> 
                            Arbitrum
                            <div className='w-full justify-end flex'>
                                <ChevronRight className='text-right text-zinc-400' />
                            </div>
                        </Button>
                    </div>

                    <div className='w-full h-full text- gap-3 space-y-2 grid grid-rows-3 '>
                        <Button className=' rounded-xl text-lg text-black justify-start p-6  bg-zinc-200'>
                            <Image
                                src='/tokens/Solana sol.svg' 
                                alt=''
                                quality={100}
                                width={20}
                                height={20}
                                className="object-cover rounded-full shadow-2xl"
                                priority
                                referrerPolicy="no-referrer"
                            /> 
                            Solana
                            <div className='w-full justify-end flex'>
                                <ChevronRight className='text-right text-zinc-400' />
                            </div>
                        </Button>
                        <Button className=' rounded-xl text-lg text-black justify-start p-6  bg-zinc-200'>
                            <Image
                                src='/tokens/base-logo-in-blue.svg' 
                                alt=''
                                quality={100}
                                width={20}
                                height={20}
                                className="object-cover rounded-full shadow-2xl"
                                priority
                                referrerPolicy="no-referrer"
                            /> 
                            Base
                            <div className='w-full justify-end flex'>
                                <ChevronRight className='text-right text-zinc-400' />
                            </div>
                        </Button>
                        <Button className=' rounded-xl text-lg text-black justify-start p-6  bg-zinc-200'>
                            <Image
                                src='/tokens/BNB.svg' 
                                alt=''
                                quality={100}
                                width={20}
                                height={20}
                                className="object-cover rounded-full shadow-2xl"
                                priority
                                referrerPolicy="no-referrer"
                            /> 
                            BNB
                            <div className='w-full justify-end flex'>
                                <ChevronRight className='text-right text-zinc-400' />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}
