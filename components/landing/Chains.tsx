import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

interface ChainToken {
  name: string;
  icon: string;
}

interface ChainButtonProps {
  token: ChainToken;
}

const ChainButton = ({ token }: ChainButtonProps) => (
  <Button className='rounded-xl text-sm sm:text-base md:text-lg text-black dark:text-white justify-start p-3 sm:p-4 md:p-6 bg-zinc-200 dark:bg-slate-900'>
    <Image
      src={token.icon}
      alt={token.name}
      quality={100}
      width={16}
      height={16}
      className="object-cover rounded-full shadow-2xl"
      priority
      referrerPolicy="no-referrer"
    />
    {token.name}
    <div className='w-full justify-end flex'>
      <ChevronRight className='text-right text-zinc-400' />
    </div>
  </Button>
);

const chainTokens: ChainToken[] = [
  { name: 'Ethereum', icon: '/tokens/Ethereum ETH.svg' },
  { name: 'Avalanche', icon: '/tokens/Avalanche.svg' },
  { name: 'Arbitrum', icon: '/tokens/arbitrum-arb-logo.svg' },
  { name: 'Solana', icon: '/tokens/Solana sol.svg' },
  { name: 'Base', icon: '/tokens/base-logo-in-blue.svg' },
  { name: 'BNB', icon: '/tokens/BNB.svg' },
];

export default function Chains() {
  return (
    <div className='mx-auto h-full w-full py-10 sm:py-16 md:py-20 lg:py-30 font-sans'>
        <main className='justify-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-70'>
            <div className='w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
                <div className='gap-3 sm:gap-4 md:gap-5 flex flex-col'>
                    <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-left font-bold max-w-xl
                        bg-linear-to-b from-black via-slate-800 to-slate-700
                        dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400
                        leading-tight  bg-clip-text text-transparent'
                    >
                        Decentralized. Borderless. Permissionless. Trade.
                    </h1>
                    <h2 className='text-xs sm:text-sm md:text-base max-w-md'>Trade Directly from Your Wallet. Execute Trades. Retain Ownership.</h2>
                    <Button className='w-fit bg-blue-500 text-white dark:text-white text-xs sm:text-sm'>Explore Markets</Button>
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
