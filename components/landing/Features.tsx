import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Image from 'next/image'
import { Cpu } from 'lucide-react'
import { Button } from '../ui/button'

export default function Features() {
  return (
    <div className='w-full h-full mx-auto justify-center flex py-20 pb-30'>
        <main className='justify-center flex flex-col w-7xl h-full'>
            <div className='w-full h-full justify-center items-center flex pb-5'>
                <h1 className='text-3xl md:text-4xl font-bold text-center w-xl
                    bg-linear-to-b from-black via-slate-800 to-slate-700
                    dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400
                    leading-tight mb-6 bg-clip-text text-transparent'
                >
                    Decentralized. Borderless. Permissionless. Trade.
                </h1>
            </div>

            <div className='flex flex-row w-full h-full justify-center items-center gap-5'>
                <div className='flex flex-col gap-5 w-full h-full'>

                    <Card className='h-fit w-full bg-linear-to-tr from-blue-500 via-blue-900 to-blue-950
                        leading-tight'
                    >
                        <CardHeader>
                            <Image
                                src="/assets/Vault.png"
                                alt="cyclespace exchange vault"
                                height={230}
                                width={230}
                                quality={100}
                                className="object-cover relative left-56 -top-10 "
                                priority
                                referrerPolicy="no-referrer"
                            />
                        </CardHeader>

                        <CardFooter className='w-full text-left px-6 space-y-2 flex flex-col'>
                            <h2 className='text-white text-lg font-bold'>Decentralized. Borderless. Permissionless. Trade.</h2>
                            <h3 className='text-sm text-slate-200'>Trade Directly from Your Wallet. Execute Trades. Retain Ownership.</h3>
                        </CardFooter>

                    </Card>

                    <Card className='h-full w-full bg-zinc-200 border border-zinc-200 ' >
                        <CardHeader className='flex items-center gap-2'>
                            <div className='bg-blue-500 p-2 rounded-lg w-fit h-fit'><Cpu className='text-white w-5 h-5' /></div>
                            <div className='gap-0 space-y-0 flex flex-col'>
                                <h2 className='text-lg font-bold w-fit h-fit'>Decentralized. Borderless. </h2>
                                <h3 className='text-xs w-fit h-fit'>Trade Directly from Your Wallet.</h3>
                            </div>
                        </CardHeader>
                        <CardContent className='text-xs'>
                            Trade Directly from Your Wallet. Execute Trades. Retain Ownership.
                            Trade Directly from Your Wallet. Execute Trades. Retain Ownership.
                        </CardContent>
                    </Card>
                </div>

                <div className='flex flex-col gap-5 w-full h-full'>
                    <Card className='h-full w-120 bg-zinc-200 border border-zinc-200 ' >
                        <CardHeader className='flex items-center gap-2 w-full'>
                            <div className='bg-blue-500 p-2 rounded-lg w-fit h-fit'><Cpu className='text-white w-5 h-5' /></div>
                            <div className='gap-0 space-y-0 flex flex-col w-full'>
                                <h2 className='text-lg font-bold'>Decentralized. Borderless. </h2>
                                <h3 className='text-xs '>Trade Directly from Your Wallet.</h3>
                            </div>
                        </CardHeader>
                        <CardContent className='text-xs justify-between w-full flex gap-15'>
                            <span>Trade Directly from Your Wallet. Execute Trades. Retain Ownership.</span>
                            <div>
                                <Button className='text-xs bg-blue-500'>Trade Now</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className='h-full w-full bg-linear-to-tr from-blue-500 via-blue-900 to-blue-950
                        leading-tight'
                    >
                        <CardHeader className='pt-3'>
                            <h2 className='text-white text-lg font-bold'>Decentralized. Borderless. Permissionless. Trade.</h2>
                            <h3 className='text-sm text-slate-200'>Trade Directly from Your Wallet. Execute Trades. Retain Ownership.</h3>
                        </CardHeader>

                        <CardContent className='w-full h-60 text-left px-6 space-y-2 flex flex-col'>
                            <div>
                                
                            </div>
                            <div>

                            </div>
                        </CardContent>

                    </Card>
                </div>
                <div className='flex flex-col gap-5 w-full h-full'>
                    <Card className='h-full w-full bg-zinc-200 border border-zinc-200 ' >
                        <CardHeader className='flex items-center gap-2 w-full'>
                            <div className='bg-blue-500 p-2 rounded-lg w-fit h-fit'><Cpu className='text-white w-5 h-5' /></div>
                            <div className='gap-0 space-y-0 flex flex-col w-full'>
                                <h2 className='text-lg font-bold'>Decentralized. Borderless. </h2>
                                <h3 className='text-xs '>Trade Directly from Your Wallet.</h3>
                            </div>
                        </CardHeader>
                        <CardContent className='text-xs justify-between w-full flex gap-15'>
                            <span>Trade Directly from Your Wallet. Execute Trades. Retain Ownership.</span>
                        </CardContent>
                    </Card>
                    <Card className='h-full w-full bg-zinc-200 border border-zinc-200'>

                    </Card>
                </div>
            </div>
        </main>
    </div>
  )
}
