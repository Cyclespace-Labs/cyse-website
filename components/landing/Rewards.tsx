"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import Silk from "../Silk";
import { ArrowUpRight } from "lucide-react";
import * as motion from "motion/react-client"

// Define the shape of each card's data
interface CardData {
  id: number;
  headerTitle: string;
  headerSubtitle: string;
  imageSrc: string;
  footerTitle: string;
  footerSubtitle: string;
  // Optional: you can also pass custom icons
  headerIcon?: React.ReactNode;
  footerIcon?: React.ReactNode;
}

// Sample data – replace with your own
const cardsData: CardData[] = [
  {
    id: 1,
    headerTitle: "Accumulating",
    headerSubtitle: "Reward",
    imageSrc: "/assets/cyse-coin.png",
    footerTitle: "CYSE",
    footerSubtitle: "Stake for rewards and governance rights.",
  },
  {
    id: 2,
    headerTitle: "Trading",
    headerSubtitle: "Bonuses",
    imageSrc: "/assets/cyse-coin.png",
    footerTitle: "BONUS",
    footerSubtitle: "Earn extra rewards on every trade.",
  },
  {
    id: 3,
    headerTitle: "Referral",
    headerSubtitle: "Program",
    imageSrc: "/assets/cyse-coin.png",
    footerTitle: "REFER",
    footerSubtitle: "Invite friends and earn commissions.",
  },
];

export default function Rewards() {
  return (
    <div className="mx-auto h-full w-full py-8 md:py-10 lg:py-10">
      <main className="px-4 sm:px-8 md:px-16 lg:px-[clamp(15rem,15vw,20rem)]">
        <div className="flex h-full w-full items-center justify-center">
          <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: {type: "spring", bounce: 0.4, duration: 1,} }}
          >
            <h1
              className="max-w-4xl text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight
                bg-linear-to-b from-black via-slate-800 to-slate-700
                dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400
                bg-clip-text text-transparent"
            >
              Maximize Your Returns: Multi-Layered Rewards & Trading Incentives
            </h1>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-5 py-8 sm:py-12 md:py-16 lg:py-20">
          {cardsData.map((card) => (
            <motion.div viewport={{ amount: 0.5 }} initial={{ opacity: 0, scaleX: 0.9, }}
              whileInView={{ opacity: 1, scaleX: 1, transition: {type: "spring", bounce: 0.2, duration: 1,} }}
              className="w-full flex relative"
            >
            <Card
              key={card.id}
              className="relative h-full w-full gap-1 overflow-hidden leading-tight hover:scale-105 transition-transform duration-300"
            >
              {/* Header with icon */}
              <CardHeader className="z-1 flex w-full flex-row items-center justify-between gap-2 px-4 sm:px-5 md:px-6 text-left">
                <div className="flex flex-col gap-0 space-y-0">
                  <motion.div viewport={{ amount: 0.5 }} initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0, transition: {type: "spring", bounce: 0.2, duration: 1.2} }}
                  >
                    <h2 className="w-fit text-base sm:text-lg font-bold text-white">
                      {card.headerTitle}
                    </h2>
                  </motion.div>
                  <motion.div viewport={{ amount: 0.5 }} initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0, transition: {type: "spring", bounce: 0.2, duration: 1.2} }}
                  >
                    <h3 className="w-fit text-xs sm:text-sm text-white">
                      {card.headerSubtitle}
                    </h3>
                  </motion.div>
                </div>
                <div className="h-fit w-fit rounded-lg bg-blue-950 p-1.5 sm:p-2 hover:scale-120 transition-transform duration-300">
                  {card.headerIcon || <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" />}
                </div>
              </CardHeader>

              {/* Content with image */}
              <CardContent className="flex h-full w-full items-center justify-center">
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

                <div className="flex items-center justify-center ">
                  <motion.div viewport={{ amount: 0.5 }} initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0, transition: {type: "spring", bounce: 0.2, duration: 1.2, delay: 0.3,} }}
                    className="flex items-center justify-center"
                  >
                    <Image
                      src={card.imageSrc}
                      alt={card.headerTitle}
                      height={2000}
                      width={2000}
                      quality={100}
                      className="relative left-50 top-7 md:left-60 md:top-7 z-3 h-25 w-25  md:h-40 md:w-40 z-30
                        object-cover drop-shadow-2xl drop-shadow-black hover:scale-90 transition-transform duration-300"
                      priority
                      referrerPolicy="no-referrer"
                    />
                    <Image
                      src={card.imageSrc}
                      alt={card.headerTitle}
                      height={2000}
                      width={2000}
                      quality={100}
                      className="relative left-35 top-15 md:left-35 md:top-18 z-2 h-30 w-30  md:h-45 md:w-45 z-20
                        object-cover drop-shadow-2xl drop-shadow-black hover:scale-90 transition-transform duration-300"
                      priority
                      referrerPolicy="no-referrer"
                    />
                    <Image
                      src={card.imageSrc}
                      alt={card.headerTitle}
                      height={2000}
                      width={2000}
                      quality={100}
                      className="relative left-15 top-25 md:left-5 md:top-30 z-1 h-35 w-35 md:h-50 md:w-50 z-10
                        object-cover drop-shadow-2xl drop-shadow-black hover"
                      priority
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </div>
              </CardContent>

              {/* Footer with icon */}
              <motion.div viewport={{ amount: 0.1 }} initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0, transition: {type: "spring", bounce: 0.2, duration: 0.8, delay: 0.3,} }}
              >
              </motion.div>
                <CardFooter className="z-40 mt-3 sm:mt-4 md:mt-5 flex w-full flex-row items-center gap-2 px-4 sm:px-5 md:px-6 text-left">
                  <motion.div viewport={{ amount: 0.1 }} initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0, transition: {type: "spring", bounce: 0.2, duration: 0.8, delay: 0.3,} }}
                    className="z-40 mt-3 sm:mt-4 md:mt-5 flex w-full flex-row items-center gap-2 text-left"
                  >
                  <div className="h-fit w-fit rounded-lg bg-blue-500 p-1.5 sm:p-2">
                      <Image
                        src="/logo_white.svg"
                        alt="Cryptocurrency background"
                        height={500}
                        width={500}
                        quality={100}
                        className="relative h-5 w-5 sm:h-6 sm:w-6 rounded-xl object-cover shadow-2xl"
                        priority
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col gap-0 space-y-0">
                      <h2 className="w-fit text-lg sm:text-xl font-semibold text-white">
                        {card.footerTitle}
                      </h2>
                      <h3 className="w-fit text-sm sm:text-md text-white">
                        {card.footerSubtitle}
                      </h3>
                    </div>
                  </motion.div>
                </CardFooter>
            </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}