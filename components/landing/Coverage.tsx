"use client"

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Image from 'next/image'
import { CandlestickChartIcon, Check, CoinsIcon, Cpu} from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import Orbit from './Orbit'
import LetterGlitch from '../LetterGlitch'
import * as motion from "motion/react-client"

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
    <div className='w-full h-full mx-auto justify-center flex py-10 pb-20'>
        <main className='justify-center flex flex-col w-7xl h-full'>
            <div className='w-full h-full justify-center items-center flex pb-5'>
                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }}
                >
                    <h1 className='sm:max-w-4xl lg:max-w-3xl xl:max-w-4xl text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center w-xs md:w-5xl bg-linear-to-b from-black via-zinc-800 to-zinc-500
                        dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400 leading-tight mb-6 bg-clip-text text-transparent'>
                        Predict the Future: Decentralized Prediction Markets, Real-Time Odds & High-Stakes Rewards
                    </h1>
                </motion.div>
            </div>

            <div className='flex flex-col md:flex-row w-full h-full justify-center gap-5 px-10 md:px-0 lg:px-10 xl:px-0 '>

                {/* left section*/}
                <div className='flex flex-col gap-5 w-full h-full'>
                    <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }}
                    >
                        <Card className='h-fit w-full bg-zinc-200 dark:bg-slate-900 gap-3 dark:border-slate-800 border border-zinc-200 hover:scale-105 transition-transform duration-300' >
                            <CardHeader className='flex items-center gap-2 w-full'>
                                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, scale: 0.1 }}
                                    whileInView={{ opacity: 1, scale: 1, transition: { type:"spring", bounce: 0.4, duration: 1, delay: 0.3 } }}
                                >
                                    <div className='bg-primary lg:p-1.5 xl:p-2 lg:rounded-md xl:rounded-lg w-fit h-fit'><CoinsIcon className='text-white lg:w-4 lg:h-4 xl:w-5 xl:h-5' /></div>
                                </motion.div>

                                <div className='gap-0 space-y-0 flex flex-col w-full'>
                                    <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: -40 }}
                                        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                    >
                                        <h2 className='lg:text-[12px] xl:text-lg font-bold'>Earn From Accurate Predictions</h2>
                                    </motion.div>
                                    <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: -40 }}
                                        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                    >
                                        <h3 className='lg:text-[9px] xl:text-xs text-slate-700 dark:text-slate-300'>Predictors earn 70% of market fees</h3>
                                    </motion.div>
                                </div>
                            </CardHeader>
                            <CardContent className='text-xs justify-between w-full flex gap-15'>
                                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                > 
                                    <span className='text-slate-700 dark:text-slate-300 lg:text-[11px] xl:text-xs'>
                                        Participate in prediction markets, stake on outcomes, and earn rewards from market volume. Your edge, your profit.
                                    </span>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div viewport={{ amount: 0.3 }} initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }}
                    >
                        <Card className='h-full w-full bg-zinc-200 dark:bg-slate-900 dark:border-slate-800 border border-zinc-200 justify-center hover:scale-105 transition-transform duration-300'>
                            <CardHeader className='flex items-center gap-2 w-full'>
                                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                >
                                    <h2 className='lg:text-md xl:text-lg font-bold'>Unlimited Market Categories</h2>
                                </motion.div>
                            </CardHeader>
                            <CardContent className='space-x-2 space-y-2 lg:text-[11px] xl:text-xs w-full'>
                                <Badge className='bg-white dark:bg-slate-700 text-slate-700 lg:text-[11px] xl:text-xs dark:text-slate-300 gap-1'> <Check strokeWidth={3} className='text-blue-500'/> Up to 100x Payouts</Badge>
                                <Badge className='bg-white dark:bg-slate-700 text-slate-700 lg:text-[11px] xl:text-xs dark:text-slate-300 gap-1'> <Check strokeWidth={3} className='text-blue-500'/> Zero Platform Fees</Badge>
                                <Badge className='bg-white dark:bg-slate-700 text-slate-700 lg:text-[11px] xl:text-xs dark:text-slate-300 gap-1'> <Check strokeWidth={3} className='text-blue-500'/> Earn from Market Volume</Badge>
                            </CardContent>
                            <CardFooter className='justify-center overflow-clip relative gap-0 h-fit lg:-my-5 xl:my-0'>
                                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, scale: 0.1 }}
                                    whileInView={{ opacity: 1, scale: 1, transition: { type:"spring", bounce: 0.4, duration: 1, delay: 0.3 } }}
                                >
                                    <Image
                                        src="/assets/glass_logo.png"
                                        alt="cyclespace prediction markets"
                                        height={1000}
                                        width={1000}
                                        quality={100}
                                        className="object-cover relative lg:w-30 lg:h-30 xl:w-40 xl:h-40 my-10"
                                        priority
                                        referrerPolicy="no-referrer"
                                    />

                                </motion.div>

                                {/* Linear gradient overlay */}
                                <div className="absolute inset-0 hidden bg-linear-to-b from-transparent via-transparent to-zinc-200
                                dark:bg-linear-to-b dark:from-transparent dark:via-transparent dark:to-slate-900" />
                            </CardFooter>
                        </Card>
                    </motion.div>

                </div>

                {/* middle section*/}
                <div className='flex flex-col gap-5 sm:w-full lg:w-100 xl:w-full h-full'>
                    <motion.div viewport={{ amount: 0. }} initial={{ opacity: 0, y: -40 }}
                        whileInView={{ opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }}
                    >
                        <Card className='h-full w-full p-0 bg-zinc-200 leading-tight dark:bg-slate-900 dark:border-slate-800 
                        border hover:scale-105 transition-transform duration-300'>
                            <CardHeader className='px-8 pt-8 w-sm md:w-md'>
                                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, y: -30 }}
                                    whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
                                >
                                    <h2 className='text-black dark:text-white lg:text-lg xl:text-xl font-bold'>Prediction Markets. Any Event.</h2>
                                </motion.div>
                                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, y: -30 }}
                                    whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
                                >
                                    <h3 className='lg:text-xs xl:text-sm text-slate-700 dark:text-slate-300 lg:w-80'>Predict outcomes on crypto prices, sports, elections, and more with up to 50x potential returns.</h3>
                                </motion.div>
                            </CardHeader>

                            <CardContent className='h-full justify-center p-0 overflow-visible m-0'>
                                <div className='overflow-visible justify-center flex flex-col relative -translate-y-3 z-0'>
                                    <motion.div viewport={{ amount: 0.3 }} initial={{ opacity: 0, scale: 0.1 }}
                                        whileInView={{ opacity: 1, scale: 1, transition: { type:"spring", bounce: 0.4, duration: 1, delay: 0.3 } }}
                                    >
                                        <Orbit tokens={orbitingTokens} />
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div viewport={{ amount: 0.5 }} initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }}
                    >
                        <Card className='h-full w-full bg-zinc-200 dark:bg-slate-900 dark:border-slate-800 border border-zinc-200 relative hover:scale-105 transition-transform duration-300'>
                            <CardHeader className='flex items-center gap-2 w-full'>
                                <div className='gap-0 space-y-0 flex flex-col w-xs md:w-sm z-20'>
                                    <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0, transition: { type:"spring", bounce: 0.4, duration: 1, delay: 0.3 } }}
                                    >
                                        <h2 className='text-sm lg:text-lg drop-shadow-xl drop-shadow-black xl:text-xl font-bold bg-clip-text text-transparent bg-linear-to-b from-black via-zinc-800 to-zinc-500
                                            dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400 z-30'>
                                            Limit Orders. Real Rewards.
                                        </h2>
                                    </motion.div>
                                </div>
                            </CardHeader>
                            <motion.div viewport={{ amount: 0.3 }} initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0, transition: { type:"spring", bounce: 0.4, duration: 1, delay: 0.3 } }}
                                className='z-20'
                            >
                                <CardContent className='text-xs justify-between w-full flex gap-15 relative'>
                                    <span className='text-slate-700 dark:text-slate-300'>
                                        Place limit orders to provide liquidity and earn a share of all market fees.
                                    </span>
                                    <div>
                                        <Button className='lg:text-[11px] xl:text-xs bg-primary hover:bg-black text-white '>Start Predicting</Button>
                                    </div>
                                </CardContent>
                            </motion.div>
                            <Image
                                src="/assets/coins.png"
                                alt="cyclespace prediction markets"
                                height={230}
                                width={230}
                                quality={100}
                                className="object-contain z-10 absolute right-0 bottom-0"
                                priority
                                referrerPolicy="no-referrer"
                            />
                        </Card>
                    </motion.div>

                </div>

                {/* right section*/}
                <div className='flex flex-col gap-5 w-full md:w-300 lg:w-full xl:w-300 h-full justify-center'>
                    <motion.div viewport={{ amount: 0.4 }} initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }}
                    >
                        <Card className="relative h-full w-full gap-1 overflow-hidden leading-tight hover:scale-105 transition-transform duration-300">
                            {/* Background layer */}
                            <div className="absolute inset-0 z-0">
                                <LetterGlitch 
                                    glitchSpeed={50}
                                    centerVignette={true}
                                    outerVignette={false}
                                    smooth
                                    glitchColors={["#2b4539", "#61dca3", "#61b3dc"]} characters={'0x0123456789X'}
                                />

                                <div className="absolute inset-0 bg-black/50" />
                                <div className="absolute inset-0 bg-linear-to-t from-[#0E76FD] via-[#0E76FD]/30 to-transparent" />
                                <div className="absolute inset-0 bg-linear-to-bl from-black via-[#0E76FD]/40 to-transparent" />
                            </div>

                            {/* Foreground content */}
                            <div className="relative z-10 flex h-full flex-col">
                                <CardHeader>
                                    <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: 40 }}
                                        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                    >
                                        <Image
                                            src="/assets/token_blue1.png"
                                            alt="cyclespace prediction markets"
                                            height={1000}
                                            width={1000}
                                            quality={100}
                                            className="relative lg:left-27 lg:top-0 xl:left-45 xl:top-0 object-contain drop-shadow-2xl drop-shadow-black lg:w-40 lg:h-40 xl:w-50 xl:h-50 mb-11 hover:scale-110 transition-transform duration-300"
                                            priority
                                            referrerPolicy="no-referrer"
                                        />
                                    </motion.div>
                                </CardHeader>

                                <CardFooter className="mt-5 flex w-full flex-col space-y-2 px-6 text-left">
                                    <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: 40 }}
                                        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                        className='w-full'
                                    >
                                        <h2 className="text-sm lg:text-md xl::text-lg text-left w-full font-bold text-white">
                                            Predict. Win. Grow Your Stack.
                                        </h2>
                                    </motion.div>
                                    <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: 40 }}
                                        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                    >
                                        <h3 className="lg:text-[11px] xl:text-xs md:text-sm text-slate-200">
                                            Lock in your predictions on future events and earn massive rewards from correct forecasts. No limits, just winning.
                                        </h3>
                                    </motion.div>
                                </CardFooter>
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div viewport={{ amount: 0.8 }} initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }}
                    >
                        <Card className='h-full w-full bg-zinc-200 dark:bg-slate-900 dark:border-slate-800 border border-zinc-200 gap-5 hover:scale-105 transition-transform duration-300' >
                            <CardHeader className='flex items-center gap-2'>
                                <motion.div viewport={{ amount: 0.1 }} initial={{ opacity: 0, scale: 0.1 }}
                                    whileInView={{ opacity: 1, scale: 1, transition: { type:"spring", bounce: 0.4, duration: 1, delay: 0.3 } }}
                                >
                                    <div className='bg-primary p-2 rounded-lg w-fit h-fit'><CandlestickChartIcon className='text-white w-5 h-5' /></div>
                                </motion.div>
                                <div className='gap-0 space-y-0 flex flex-col gap-0'>
                                    <motion.div viewport={{ amount: 0.1 }} initial={{ opacity: 0, x: 40 }}
                                        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                    >
                                        <h2 className='lg:text-md xl:text-lg font-bold w-fit h-fit'>Any Event. Any Time.</h2>
                                    </motion.div>
                                    <motion.div viewport={{ amount: 0.1 }} initial={{ opacity: 0, x: 40 }}
                                        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                                    >
                                        <h3 className='lg:text-[9px] xl:text-xs w-fit h-fit'>Predict on crypto, sports, politics, and more</h3>
                                    </motion.div>
                                </div>
                            </CardHeader>
                            <CardContent className='lg:text-[11px] xl:text-xs'>
                                Get instant payouts on correct predictions. Deep liquidity, real-time odds, and no hidden fees.
                            </CardContent>
                        </Card>
                    </motion.div>

                </div>

            </div>
        </main>
    </div>
  )
}