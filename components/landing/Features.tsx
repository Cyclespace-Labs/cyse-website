"use client"

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Image from 'next/image'
import { CandlestickChartIcon, Check, CoinsIcon, Cpu} from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import LogoLoop from '../LogoLoop'
import Silk from '../Silk'
import * as motion from "motion/react-client"
import { useEffect, useRef, useState } from 'react'
import { useInView } from "framer-motion";


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
    <div className='w-full h-full mx-auto justify-center flex py-10 pb-10'>
        <main className='justify-center flex flex-col w-7xl h-full'>
            <div className='w-full h-full justify-center items-center flex pb-5'>
                <motion.div viewport={{ amount: 0.1, once: true }} initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.5 } }}
                    className='transform-gpu'
                >
                    <h1 className='text-xl md:text-4xl font-bold text-center w-xs md:w-4xl
                        bg-linear-to-b from-black via-zinc-800 to-zinc-500
                        dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400
                        leading-tight mb-6 bg-clip-text text-transparent transform-gpu'
                    >
                        Power Your Trading Journey: Advanced Perpetuals, Smart Staking & Vault Rewards
                    </h1>
                </motion.div>
            </div>

            <div className='flex flex-col md:flex-row w-full h-full justify-center gap-5 px-20 sm:px-10 md:px-0 '>

                <div className='flex flex-col gap-5 w-full md:w-300 h-full justify-center'>
                    {/* Vault Animated Card */}
                    <motion.div viewport={{ amount: 0.1 }} initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }}
                    >
                        <Card className="relative h-full w-full gap-1 overflow-hidden leading-tight hover:scale-105
                            transition-transform duration-500">

                            {/* Background layer */}
                            <div className="absolute inset-0 z-0">
                                <Silk
                                    speed={15}
                                    scale={1}
                                    color="#0E76FD"
                                    noiseIntensity={2}
                                    rotation={0}
                                />
                                <motion.div viewport={{ amount: 0.1 }} initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1, transition: { duration: 2 } }}
                                    className='absolute inset-0'
                                >
                                    <div className="absolute inset-0 bg-black/60" />
                                    <div className="absolute inset-0 bg-linear-to-l from-[#0E76FD] via-[#0E76FD]/30 to-transparent" />
                                    <div className="absolute inset-0 bg-linear-to-bl from-black via-[#0E76FD]/30 to-transparent" />
                                </motion.div>
                            </div>

                            {/* Foreground content */}
                            <div className="relative z-10 flex h-full flex-col">
                                <CardHeader>
                                     <motion.div viewport={{ amount: 0.1 }} initial={{ opacity: 0, x: -40 }}
                                        whileInView={{ opacity: 1, x: 0, transition: { type:"spring", bounce: 0.4, duration: 1 } }}
                                    >
                                        <Image
                                            src="/assets/Vault.png"
                                            alt="cyclespace exchange vault"
                                            height={230}
                                            width={230}
                                            quality={100}
                                            priority
                                            referrerPolicy="no-referrer"
                                            className="relative left-35 -top-10 object-cover drop-shadow-2xl drop-shadow-black w-auto 
                                                h-auto hover:scale-110 transition-transform duration-500"
                                        />
                                    </motion.div>
                                </CardHeader>

                                <CardFooter className="mt-5 flex w-full flex-col space-y-2 px-6 text-left">

                                    <motion.div viewport={{ amount: 0.1 }} initial={{ opacity: 0, x: -40 }}
                                        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                        className='text-left w-full'
                                    >
                                        <h2 className="text-sm md:text-lg text-left w-full font-bold text-white">
                                            Stake. Earn. Grow Your Stack.
                                        </h2>
                                    </motion.div>

                                    <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: -40 }}
                                        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                        className='text-left w-full'
                                    >
                                        <h3 className=" text-xs md:text-sm text-slate-200">
                                            Deposit assets into the vault and earn yield from trading fees.
                                        </h3>
                                    </motion.div>
                                        
                                </CardFooter>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Perps Animated Card */}
                    <motion.div viewport={{ amount: 0.6 }} initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }}
                    >
                        <Card className='h-full w-full  bg-zinc-200 dark:bg-slate-900 dark:border-slate-800 border 
                            border-zinc-200 gap-5 hover:scale-105 transition-transform duration-500' >
                                
                            <CardHeader className='flex items-center gap-2'>

                                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, scale: 0.1 }}
                                    whileInView={{ opacity: 1, scale: 1, transition: { type:"spring", bounce: 0.4, duration: 1, delay: 0.3 } }}
                                >
                                    <div className='bg-primary p-2 rounded-lg w-fit h-fit'><CandlestickChartIcon className='text-white w-5 h-5' /></div>
                                </motion.div>

                                <div className='gap-0 space-y-0 flex flex-col'>

                                    <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: -40 }}
                                        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                    >
                                        <h2 className='text-lg font-bold w-fit h-fit'>Perps With No Expiry</h2>
                                    </motion.div>

                                    <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: -40 }}
                                        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                    >
                                        <h3 className='text-xs w-fit h-fit'>Leverage up to 50x on BTC, ETH, SOL</h3>
                                    </motion.div>
                                </div>
                                
                            </CardHeader>
                            <CardContent className='text-xs'>
                                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                > 
                                    <p>Trade perpetual futures with deep liquidity. No funding fees. No expiration dates. Pure leverage.</p>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <div className='flex flex-col gap-5 w-full h-full'>
                    {/* Yield Animated Card */}
                    <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, y: -40 }} 
                        whileInView={{ opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }}
                    >
                        <Card className='h-full w-full  bg-zinc-200 dark:bg-slate-900 dark:border-slate-800 border border-zinc-200 
                            relative hover:scale-105 transition-transform duration-500'>

                            <CardHeader className='flex items-center gap-2 w-full'>
                                <div className='gap-0 space-y-0 flex flex-col w-xs md:w-sm'>
                                    <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, y: -20 }}
                                        whileInView={{ opacity: 1, y: 0, transition: { duration: 2, type: "spring", bounce: 0.4 } }}
                                    > 
                                        <h2 className='text-sm md:text-xl font-bold bg-clip-text text-transparent
                                            bg-linear-to-b from-black via-zinc-800 to-zinc-500
                                            dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400'>
                                            Vault Yield. Real Returns.
                                        </h2>
                                    </motion.div>
                                </div>
                            </CardHeader>

                            <CardContent className='text-xs justify-between w-full flex gap-15 relative z-10'>

                                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0, transition: { duration: 2, type: "spring", bounce: 0.4 } }}
                                > 
                                    <span>Stake your assets and earn a share of all trading fees. Passive income while you sleep.</span>
                                </motion.div>
                                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0, transition: { duration: 2, type: "spring", bounce: 0.4 } }}
                                > 
                                    <div>
                                        <Button className='text-xs bg-primary hover:bg-black text-white rounded-2xl px-3'>Buy Now</Button>
                                    </div>
                                </motion.div>

                            </CardContent> 
                                <Image
                                    src="/assets/coins.png"
                                    alt="cyclespace exchange vault"
                                    height={1000}
                                    width={1000}
                                    quality={100}
                                    className="object-contain absolute right-0 bottom-0 w-auto h-auto max-h-[230px] max-w-[230px]"
                                    priority
                                    referrerPolicy="no-referrer"
                                />
                        </Card>
                    </motion.div>
                    
                    {/* Loop Animated Ticker Card */}
                    <motion.div viewport={{ amount: 0.5 }} initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0, transition: {type: "spring", bounce: 0.4, duration: 1} }}
                    >
                        <Card className='h-full w-full p-0 bg-zinc-200 
                            leading-tight dark:bg-slate-900 dark:border-slate-800 border hover:scale-105 transition-transform duration-500'
                        >
                            <CardHeader className='p-8 w-sm md:w-md'>

                                <motion.div viewport={{ amount: 0.5 }} initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0, transition: { duration: 1.1 } }}
                                >
                                    <h2 className='text-black dark:text-white text-xl font-bold'>Perpetuals. No Limits.</h2>
                                </motion.div>
                                <motion.div viewport={{ amount: 0.5 }} initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0, transition: { duration: 1.1 } }}
                                >
                                    <h3 className='text-sm text-slate-600 dark:text-slate-200'>Trade BTC, ETH, SOL perpetuals with up to 50x leverage and zero funding fees.</h3>
                                </motion.div>

                            </CardHeader>

                            <CardContent className='h-full w-fit my-6 justify-center p-0 overflow-clip'>
                                {/* Basic horizontal loop */}
                                <div className='overflow-clip w-sm md:w-lg justify-center flex flex-col '>
                                    <motion.div viewport={{ amount: 0.5 }} initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0, transition: { duration: 1.1 } }}
                                    >
                                        <LogoLoop
                                            logos={firstLogoList} speed={20} direction="left"
                                            logoHeight={50} gap={20} hoverSpeed={0} scaleOnHover
                                            fadeOut fadeOutColor="slate-500" ariaLabel="Technology partners"
                                        />
                                    </motion.div>
                                    
                                    <motion.div viewport={{ amount: 0.5 }} initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0, transition: { duration: 1.1 } }}
                                    >
                                        <LogoLoop
                                            logos={secondLogoList} speed={25} direction="right"
                                            logoHeight={50} gap={20} hoverSpeed={0} scaleOnHover
                                            fadeOut fadeOutColor="slate-500" ariaLabel="Technology partners"
                                        />
                                    </motion.div>

                                    <motion.div viewport={{ amount: 0.5 }} initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0, transition: { duration: 1.1 } }}
                                    >
                                        <LogoLoop
                                            logos={thirdLogoList} speed={30} direction="left"
                                            logoHeight={50} gap={20} hoverSpeed={0} scaleOnHover
                                            fadeOut fadeOutColor="slate-500" ariaLabel="Technology partners"
                                        />
                                    </motion.div>
                                </div>
                                
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <div className='flex flex-col gap-5 w-full h-full'>
                    {/* Earn Fees Animated Card */}
                    <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0, transition: { type: "spring", bounce: 0.4, duration: 1, } }}
                    >
                        <Card className='h-fit w-full bg-zinc-200 dark:bg-slate-900 gap-3 dark:border-slate-800 border border-zinc-200 hover:scale-105 transition-transform duration-500' >
                            <CardHeader className='flex items-center gap-2 w-full'>
                                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, scale: 0.1 }}
                                    whileInView={{ opacity: 1, scale: 1, transition: { type:"spring", bounce: 0.4, duration: 1, delay: 0.3 } }}
                                >
                                    <div className='bg-primary p-2 rounded-lg w-fit h-fit'><CoinsIcon className='text-white w-5 h-5' /></div>
                                </motion.div>
                                <div className='gap-0 space-y-0 flex flex-col w-full'>
                                    <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: 40 }}
                                        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                    >
                                        <h2 className='text-lg font-bold'>Earn From Fees</h2>
                                    </motion.div>
                                    <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: 40 }}
                                        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                    >
                                        <h3 className='text-xs '>Vault stakers earn 70% of protocol revenue</h3>
                                    </motion.div>
                                </div>
                            </CardHeader>
                            <CardContent className='text-xs justify-between w-full flex gap-15'>
                                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                >
                                    <span>Deposit to the vault once, earn trading fees forever. Auto-compounding yields.</span>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Leverage Animated Card */}
                    <motion.div viewport={{ amount: 0.6 }} initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }}
                    >
                        <Card className='h-full w-full bg-zinc-200 dark:bg-slate-900 dark:border-slate-800 border border-zinc-200 justify-center hover:scale-105 transition-transform duration-500'>
                            <CardHeader className='flex items-center gap-2 w-full'>
                                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                >
                                    <h2 className='text-lg font-bold'>Leverage Without Limits.</h2>
                                </motion.div>
                            </CardHeader>
                            <CardContent className='space-x-2 space-y-2 w-full'>
                                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, scale: 0.1 }}
                                    whileInView={{ opacity: 1, scale: 1, transition: { type:"spring", bounce: 0.4, duration: 1 } }}
                                    className='space-x-1 space-y-1 w-full'
                                >
                                    <Badge className='bg-white dark:bg-slate-700 text-xs text-black dark:text-slate-200 gap-1'> <Check strokeWidth={3} className='text-blue-500'/> Up to 50x leverage</Badge>
                                    <Badge className='bg-white dark:bg-slate-700 text-xs text-black dark:text-slate-200 gap-1'> <Check strokeWidth={3} className='text-blue-500'/> Zero funding fees</Badge>
                                    <Badge className='bg-white dark:bg-slate-700 text-xs text-black dark:text-slate-200 gap-1'> <Check strokeWidth={3} className='text-blue-500'/> Earn from the vault</Badge>
                                </motion.div>
                            </CardContent>
                            <CardFooter className='justify-center overflow-clip relative'>
                                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, scale: 0.1 }}
                                    whileInView={{ opacity: 1, scale: 1, transition: { type:"spring", bounce: 0.4, duration: 1 } }}
                                    className=''
                                >
                                    <Image
                                        src="/assets/candlesticks.svg"
                                        alt="cyclespace exchange vault"
                                        height={250}
                                        width={250}
                                        quality={100}
                                        className="object-cover flex dark:hidden relative w-auto h-auto"
                                        priority
                                        referrerPolicy="no-referrer"
                                    />

                                    <Image
                                        src="/assets/candles_dark.svg"
                                        alt="cyclespace exchange vault"
                                        height={250}
                                        width={250}
                                        quality={100}
                                        className="object-cover hidden dark:flex relative w-auto h-auto mb-4"
                                        priority
                                        referrerPolicy="no-referrer"
                                    />
                                </motion.div>
                                {/* Linear gradient overlay */}
                                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-zinc-200
                                dark:bg-linear-to-b dark:from-transparent dark:via-transparent dark:to-slate-900" />
                            </CardFooter>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </main>
    </div>
  )
}
