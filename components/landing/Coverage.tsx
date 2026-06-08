"use client"

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Image from 'next/image'
import { CandlestickChartIcon, Check, CoinsIcon, Cpu} from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import LogoLoop from '../LogoLoop'
import Silk from '../Silk'
import Orbit from './Orbit'


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
];

const orbitingTokens = [
  // First 7 tokens – small orbits, fast
  ...firstLogoList.map((token, i) => ({
    src: token.src,
    alt: token.alt,
    orbitRadius: 90 + i * 50,
    tokenSize: 64,
    speed: 1.2 - i * 0.1,
    startAngle: i * 0.8,
  }))
];

export default function Coverage() {
  return (
    <div className='w-full h-full mx-auto justify-center flex py-20 pb-30'>
        <main className='justify-center flex flex-col w-7xl h-full'>
            <div className='w-full h-full justify-center items-center flex pb-5'>
                <h1 className='text-xl md:text-4xl font-bold text-center w-xs md:w-4xl
                    bg-linear-to-b from-black via-zinc-800 to-zinc-500
                    dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400
                    leading-tight mb-6 bg-clip-text text-transparent'
                >
                    Power Your Trading Journey: Advanced Perpetuals, Smart Staking & Vault Rewards
                </h1>
            </div>

            <div className='flex flex-col md:flex-row w-full h-full justify-center gap-5 px-20 sm:px-10 md:px-0 '>


                <div className='flex flex-col gap-5 w-full h-full'>

                    <Card className='h-fit w-full bg-zinc-200 dark:bg-slate-900 gap-3 dark:border-slate-800 border border-zinc-200 hover:scale-105 transition-transform duration-300' >
                        <CardHeader className='flex items-center gap-2 w-full'>
                            <div className='bg-primary p-2 rounded-lg w-fit h-fit'><CoinsIcon className='text-white w-5 h-5' /></div>
                            <div className='gap-0 space-y-0 flex flex-col w-full'>
                                <h2 className='text-lg font-bold'>Earn From Fees</h2>
                                <h3 className='text-xs '>Vault stakers earn 70% of protocol revenue</h3>
                            </div>
                        </CardHeader>
                        <CardContent className='text-xs justify-between w-full flex gap-15'>
                            <span>Deposit to the vault once, earn trading fees forever. Auto-compounding yields.</span>
                        </CardContent>
                    </Card>

                    <Card className='h-full w-full bg-zinc-200 dark:bg-slate-900 dark:border-slate-800 border border-zinc-200 justify-center hover:scale-105 transition-transform duration-300'>
                        <CardHeader className='flex items-center gap-2 w-full'>
                            <h2 className='text-lg font-bold'>Leverage Without Limits.</h2>
                        </CardHeader>
                        <CardContent className='space-x-2 space-y-2  w-full'>
                            <Badge className='bg-white dark:bg-slate-700 text-xs text-black dark:text-slate-200 gap-1'> <Check strokeWidth={3} className='text-blue-500'/> Up to 50x leverage</Badge>
                            <Badge className='bg-white dark:bg-slate-700 text-xs text-black dark:text-slate-200 gap-1'> <Check strokeWidth={3} className='text-blue-500'/> Zero funding fees</Badge>
                            <Badge className='bg-white dark:bg-slate-700 text-xs text-black dark:text-slate-200 gap-1'> <Check strokeWidth={3} className='text-blue-500'/> Earn from the vault</Badge>
                        </CardContent>
                        <CardFooter className='justify-center overflow-clip relative'>
                            <Image
                                src="/assets/candlesticks.svg"
                                alt="cyclespace exchange vault"
                                height={250}
                                width={250}
                                quality={100}
                                className="object-cover relative w-auto h-auto"
                                priority
                                referrerPolicy="no-referrer"
                            />
                            {/* Linear gradient overlay */}
                            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-zinc-200
                            dark:bg-linear-to-b dark:from-transparent dark:via-transparent dark:to-slate-900" />
                        </CardFooter>
                    </Card>

                </div>

                <div className='flex flex-col gap-5 w-full h-full'>
                    
                    <Card className='h-full w-full p-0 bg-zinc-200
                        leading-tight dark:bg-slate-900 dark:border-slate-800 border hover:scale-105 transition-transform duration-300'
                    >
                        <CardHeader className='px-8 pt-8 w-sm md:w-md'>
                            <h2 className='text-black dark:text-white text-xl font-bold'>Perpetuals. No Limits.</h2>
                            <h3 className='text-sm text-slate-600 dark:text-slate-200'>Trade BTC, ETH, SOL perpetuals with up to 50x leverage and zero funding fees.</h3>
                        </CardHeader>

                        <CardContent className='h-full justify-center p-0 overflow-visible m-0'>
                            <div className='overflow-visible justify-center flex flex-col relative  -translate-y-3 z-0'>
                                {/* Basic horizontal loop */}
                                <Orbit tokens={orbitingTokens} />
                            </div>
                            
                        </CardContent>
                    </Card>

                    <Card className='h-full w-full bg-zinc-200 dark:bg-slate-900 dark:border-slate-800 border border-zinc-200 relative hover:scale-105 transition-transform duration-300'>
                        <CardHeader className='flex items-center gap-2 w-full'>
                            <div className='gap-0 space-y-0 flex flex-col w-xs md:w-sm'>
                                <h2 className='text-sm md:text-xl font-bold bg-clip-text text-transparent
                                    bg-linear-to-b from-black via-zinc-800 to-zinc-500
                                    dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400'>
                                    Vault Yield. Real Returns.
                                </h2>
                            </div>
                        </CardHeader>
                        <CardContent className='text-xs justify-between w-full flex gap-15 relative z-10'>
                            <span>Stake your assets and earn a share of all trading fees. Passive income while you sleep.</span>
                            <div>
                                <Button className='text-xs bg-primary hover:bg-black text-white'>Buy Now</Button>
                            </div>
                        </CardContent>
                        <Image
                            src="/assets/coins.png"
                            alt="cyclespace exchange vault"
                            height={230}
                            width={230}
                            quality={100}
                            className="object-contain absolute right-0 bottom-0 w-auto h-auto max-h-[230px] max-w-[230px]"
                            priority
                            referrerPolicy="no-referrer"
                        />
                    </Card>

                </div>

                <div className='flex flex-col gap-5 w-full md:w-300 h-full justify-center'>

                    <Card className="relative h-full w-full gap-1 overflow-hidden leading-tight hover:scale-105 transition-transform duration-300">
                        {/* Background layer */}
                        <div className="absolute inset-0 z-0">
                            <Silk
                                speed={15}
                                scale={1}
                                color="#0E76FD"
                                noiseIntensity={2}
                                rotation={0}
                            />
                            <div className="absolute inset-0 bg-black/60" />
                            <div className="absolute inset-0 bg-linear-to-l from-[#0E76FD] via-[#0E76FD]/50 to-transparent" />
                            <div className="absolute inset-0 bg-linear-to-bl from-black via-[#0E76FD]/50 to-transparent" />
                        </div>

                        {/* Foreground content */}
                        <div className="relative z-10 flex h-full flex-col">
                            <CardHeader>
                                <Image
                                    src="/assets/Vault.png"
                                    alt="cyclespace exchange vault"
                                    height={230}
                                    width={230}
                                    quality={100}
                                    className="relative left-35 -top-10 object-cover drop-shadow-2xl drop-shadow-black w-auto h-auto hover:scale-110 transition-transform duration-300"
                                    priority
                                    referrerPolicy="no-referrer"
                                />
                            </CardHeader>

                            <CardFooter className="mt-5 flex w-full flex-col space-y-2 px-6 text-left">
                                <h2 className="text-sm md:text-lg text-left w-full font-bold text-white">
                                    Stake. Earn. Grow Your Stack.
                                </h2>
                                <h3 className=" text-xs md:text-sm text-slate-200">
                                    Deposit assets into the vault and earn yield from trading fees.
                                </h3>
                            </CardFooter>
                        </div>
                    </Card>


                    <Card className='h-full w-full bg-zinc-200 dark:bg-slate-900 dark:border-slate-800 border border-zinc-200 gap-5 hover:scale-105 transition-transform duration-300' >
                        <CardHeader className='flex items-center gap-2'>
                            <div className='bg-primary p-2 rounded-lg w-fit h-fit'><CandlestickChartIcon className='text-white w-5 h-5' /></div>
                            <div className='gap-0 space-y-0 flex flex-col'>
                                <h2 className='text-lg font-bold w-fit h-fit'>Perps With No Expiry</h2>
                                <h3 className='text-xs w-fit h-fit'>Leverage up to 50x on BTC, ETH, SOL</h3>
                            </div>
                        </CardHeader>
                        <CardContent className='text-xs'>
                            Trade perpetual futures with deep liquidity. No funding fees. No expiration dates. Pure leverage.
                        </CardContent>
                    </Card>

                </div>

            </div>
        </main>
    </div>
  )
}
