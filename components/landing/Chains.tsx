import { Button } from '../ui/button'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { Badge } from '../ui/badge'
import * as motion from "motion/react-client"

interface ChainToken {
  name: string;
  icon: string;
  soon?: boolean;
}

interface ChainButtonProps {
  token: ChainToken;
}

const ChainButton = ({ token }: ChainButtonProps) => (
  <motion.div viewport={{ amount: 0.8 }} initial={{ opacity: 0, scaleX: 0.8, }}
    whileInView={{ opacity: 1, scaleX: 1, transition: { type: "spring", bounce: 0.4, duration: 1, } }}
  >
    <Button className='group w-full rounded-4xl text-sm sm:text-base md:text-lg text-black dark:text-white justify-start p-3 py-5 
    md:p-7 lg:p-6 xl:p-7 md:px-5 bg-zinc-200 dark:bg-slate-900 hover:bg-primary dark:hover:bg-primary hover:text-white'>
      <Image
        src={token.icon}
        alt={token.name}
        quality={100}
        width={27}
        height={27}
        className="object-cover rounded-full shadow-2xl"
        priority
        referrerPolicy="no-referrer"
      />
      <span className="inline-flex items-center gap-1.5 md:text-sm lg:text-sm xl:text-sm">
        {token.name}
        {token.soon && (
          <Badge
            variant="outline"
            className="md:text-[7px] lg:text-[7px] xl:text-[10px] px-1.5 py-0 h-4 rounded-full bg-primary/30 text-primary dark:bg-primary/30 dark:text-primary border-none
              group-hover:bg-white/40 dark:group-hover:bg-white/40 group-hover:text-white dark:group-hover:text-white transition-colors duration-200"
          >
            soon
          </Badge>
        )}
      </span>
      <div className='w-full justify-end flex'>
        <ChevronRight className='text-right text-zinc-400 group-hover:text-white' />
      </div>
    </Button>
  </motion.div>
);

const chainTokens: ChainToken[] = [
  { name: 'Ethereum', icon: '/tokens/Ethereum ETH.svg' },
  { name: 'Arbitrum', icon: '/tokens/arbitrum-arb-logo.svg' },
  { name: 'Avalanche', icon: '/tokens/Avalanche.svg', soon: true },
  { name: 'Solana', icon: '/tokens/Solana sol.svg', soon: true },
  { name: 'Base', icon: '/tokens/base-logo-in-blue.svg', soon: true },
  { name: 'BNB', icon: '/tokens/BNB.svg', soon: true },
];

export default function Chains() {
  return (
    <div className='mx-auto h-full w-full py-30 sm:py-30 md:py-30 lg:py-70 font-sans'>
        <main className='justify-center px-4 sm:px-8 md:px-20 lg:px-13 xl:px-[clamp(10rem,15vw,17.5rem)]'>
            <div className='w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
              <div className='gap-3 sm:gap-4 md:gap-5 flex flex-col'>
                <motion.div viewport={{ amount: 0.9 }} initial={{ opacity: 0, x: -20 }} 
                  whileInView={{ opacity: 1, x: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }}
                >
                  <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-left font-bold max-w-xl
                      bg-linear-to-b from-black via-slate-800 to-slate-700
                      dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400
                      leading-tight  bg-clip-text text-transparent'
                  >
                      Access Multiple Chains. swap tokens with Ease.
                  </h1>
                </motion.div>

                <motion.div viewport={{ amount: 0.8 }} initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0, transition: {type: "spring", bounce: 0.4, duration: 1,} }}
                >
                  <h2 className='text-xs sm:text-sm md:text-base max-w-md'>Trade Directly from Your Wallet. Execute Trades. Retain Ownership.</h2>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4, duration: 0.5, } }}
                  viewport={{ amount: 0.5 }}
                >
                  <Button className='w-fit bg-primary hover:bg-primary/70 rounded-3xl px-3.5 text-white dark:text-white text-xs sm:text-sm
                   hover:scale-110 transition-transform duration-300'>
                    Explore Chains
                  </Button>
                </motion.div>
              </div>
                
              <div className='grid grid-cols-2 w-full h-full gap-2 sm:gap-3'>
                  <div className='w-full h-full gap-2 sm:gap-3 space-y-2 grid grid-rows-3'>
                      {chainTokens.slice(0, 3).map((token) => (
                          <ChainButton key={token.name} token={token} />
                      ))}
                  </div>

                  <div className='w-full h-full gap-2 sm:gap-3 space-y-2 grid grid-rows-3'>
                      {chainTokens.slice(3, 6).map((token) => (
                          <ChainButton key={token.name} token={token} />
                      ))}
                  </div>
              </div>
            </div>
        </main>
    </div>
  )
}
