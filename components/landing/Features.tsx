"use client"

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Image from 'next/image'
import { Check, Cpu, Ticket } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import LogoLoop from '../LogoLoop'


const firstLogoList = [
    { src: "/tokens/Bitcoin.svg", alt: "Bitcoin BTC", href: "#"},
    { src: "/tokens/Tether.svg", alt: "Tether USDT", href: "#"},
    { src: "/tokens/Uniswap UNI.svg", alt: "Uniswap UNI", href: "#"},
    { src: "/tokens/Binance.svg", alt: "Binance", href: "#"},
    { src: "/tokens/XRP.svg", alt: "XRP", href: "#"},
    { src: "/tokens/Cardano ADA.svg", alt: "Cardano ADA", href: "#"},
    { src: "/tokens/Stellar.svg", alt: "Stellar", href: "#"},
]

const secondLogoList = [
    { src: "/tokens/Solana SOL.svg", alt: "Solana Sol", href: "#"},
    { src: "/tokens/Polkadot.svg", alt: "Polkadot", href: "#"},
    { src: "/tokens/USD Coin.svg", alt: "USD Coin", href: "#"},
    { src: "/tokens/Polygon.svg", alt: "Polygon", href: "#"},
    { src: "/tokens/Dai.svg", alt: "Dai", href: "#"},
    { src: "/tokens/Shiba Inu SHIB.svg", alt: "Shiba Inu SHIB", href: "#"},
    { src: "/tokens/Tron.svg", alt: "Tron", href: "#"},
]

const thirdLogoList = [
    { src: "/tokens/The Graph.svg", alt: "The Graph", href: "#"},
    { src: "/tokens/PancakeSwap.svg", alt: "PancakeSwap", href: "#"},
    { src: "/tokens/Avalanche.svg", alt: "Avalanche", href: "#"},
    { src: "/tokens/Near Protocol.svg", alt: "Near Protocol", href: "#"},
    { src: "/tokens/Neo.svg", alt: "Neo", href: "#"},
    { src: "/tokens/Eos.svg", alt: "Eos", href: "#"},
    { src: "/tokens/BNB.svg", alt: "BNB", href: "#"},
]

export default function Features() {
  return (
    <div className='w-full h-full mx-auto justify-center flex py-20 pb-30'>
        <main className='justify-center flex flex-col w-7xl h-full'>
            <div className='w-full h-full justify-center items-center flex pb-5'>
                <h1 className='text-3xl md:text-4xl font-bold text-center w-xl
                    bg-linear-to-b from-black via-zinc-800 to-zinc-500
                    dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400
                    leading-tight mb-6 bg-clip-text text-transparent'
                >
                    Decentralized. Borderless. Permissionless. Trade.
                </h1>
            </div>

            <div className='flex flex-row w-full h-full justify-center gap-5'>

                <div className='flex flex-col gap-5 w-300 h-full'>
                    <Card className='h-full w-full gap-1 bg-linear-to-tr from-blue-500 via-blue-900 to-blue-950 leading-tight'>
                        <CardHeader>
                            <Image
                                src="/assets/Vault.png"
                                alt="cyclespace exchange vault"
                                height={230}
                                width={230}
                                quality={100}
                                className="object-cover relative left-35 -top-10"
                                priority
                                referrerPolicy="no-referrer"
                            />
                        </CardHeader>

                        <CardFooter className='w-full text-left mt-5 px-6 space-y-2 flex flex-col'>
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
                    <Card className='h-full w-full bg-zinc-200 border border-zinc-200 ' >
                        <CardHeader className='flex items-center gap-2 w-full'>
                            <div className='gap-0 space-y-0 flex flex-col w-sm'>
                                <h2 className='text-xl font-bold bg-clip-text text-transparent
                                    bg-linear-to-b from-black via-zinc-800 to-zinc-500
                                    dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400'>
                                    Decentralized. Borderless. Permissionless. Trade.
                                </h2>
                            </div>
                        </CardHeader>
                        <CardContent className='text-xs justify-between w-full flex gap-15'>
                            <span>Trade Directly from Your Wallet. Execute Trades. Retain Ownership.</span>
                            <div>
                                <Button className='text-xs bg-blue-500'>Trade Now</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className='h-full w-full p-0 bg-zinc-200
                        leading-tight'
                    >
                        <CardHeader className='p-8 w-md'>
                            <h2 className='text-black text-xl font-bold'>Decentralized. Borderless. Permissionless. Trade.</h2>
                            <h3 className='text-sm text-slate-600'>Trade Directly from Your Wallet. Execute Trades. Retain Ownership.</h3>
                        </CardHeader>

                        <CardContent className='h-full w-fit mt-5 justify-center p-0 overflow-clip'>
                            <div className='overflow-clip w-lg justify-center'>
                                {/* Basic horizontal loop */}
                                <LogoLoop
                                    logos={firstLogoList}
                                    speed={45}
                                    direction="left"
                                    logoHeight={50}
                                    gap={20}
                                    hoverSpeed={0}
                                    scaleOnHover
                                    fadeOut
                                    fadeOutColor="slate-500"
                                    ariaLabel="Technology partners"
                                />

                                <LogoLoop
                                    logos={secondLogoList}
                                    speed={50}
                                    direction="right"
                                    logoHeight={50}
                                    gap={20}
                                    hoverSpeed={0}
                                    scaleOnHover
                                    fadeOut
                                    fadeOutColor="slate-500"
                                    ariaLabel="Technology partners"
                                />

                                <LogoLoop
                                    logos={thirdLogoList}
                                    speed={55}
                                    direction="left"
                                    logoHeight={50}
                                    gap={20}
                                    hoverSpeed={0}
                                    scaleOnHover
                                    fadeOut
                                    fadeOutColor="slate-500"
                                    ariaLabel="Technology partners"
                                />
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
                    <Card className='h-full w-full bg-zinc-200 border border-zinc-200 justify-center'>
                        <CardHeader className='flex items-center gap-2 w-full'>
                            <h2 className='text-lg font-bold'>Decentralized. Borderless. </h2>
                        </CardHeader>
                        <CardContent className='space-x-2 space-y-2  w-full'>
                            <Badge className='bg-white text-xs text-black gap-1'> <Check strokeWidth={3} className='text-blue-500'/> deposits required</Badge>
                            <Badge className='bg-white text-xs text-black gap-1'> <Check strokeWidth={3} className='text-blue-500'/> Trade from your wallet</Badge>
                            <Badge className='bg-white text-xs text-black gap-1'> <Check strokeWidth={3} className='text-blue-500'/> No loss of fund ownership</Badge>
                        </CardContent>
                        <CardFooter className='justify-center overflow-clip relative'>
                            <Image
                                src="/assets/candlesticks.svg"
                                alt="cyclespace exchange vault"
                                height={250}
                                width={250}
                                quality={100}
                                className="object-cover relative"
                                priority
                                referrerPolicy="no-referrer"
                            />
                            {/* Linear gradient overlay */}
                            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-zinc-200" />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </main>
    </div>
  )
}
