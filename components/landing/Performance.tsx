import { Button } from '../ui/button'
import Image from 'next/image'

interface PerformanceToken {
  name: string;
  icon: string;
  value: string;
}

interface PerformanceButtonProps {
  token: PerformanceToken;
}

const PerformanceButton = ({ token }: PerformanceButtonProps) => (
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
    <div className='w-full text-xs sm:text-sm gap-1 sm:gap-2 justify-end flex'>
      <span>{token.name}</span>
      <span className='text-blue-500'>{token.value}</span>
    </div>
  </Button>
);

const performanceTokens: PerformanceToken[] = [
  { name: 'Ethereum', icon: '/tokens/Ethereum ETH.svg', value: '$632K' },
  { name: 'Avalanche', icon: '/tokens/Avalanche.svg', value: '$632K' },
  { name: 'Arbitrum', icon: '/tokens/arbitrum-arb-logo.svg', value: '$632K' },
  { name: 'Solana', icon: '/tokens/Solana sol.svg', value: '$632K' },
  { name: 'Base', icon: '/tokens/base-logo-in-blue.svg', value: '$632K' },
  { name: 'BNB', icon: '/tokens/BNB.svg', value: '$632K' },
];

export default function Performance() {
  return (
    <div className='mx-auto h-full w-full py-8 sm:py-12 md:py-16 lg:py-20 font-sans'>
        <main className='justify-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-70'>
            <div className='w-full h-full grid grid-rows-1 gap-8 lg:gap-12'>

                <div className='w-full gap-3 sm:gap-4 md:gap-5 flex flex-col lg:flex-row'>
                    <div className='w-full'>
                        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-left font-bold max-w-xl
                            bg-linear-to-b from-black via-slate-800 to-slate-700
                            dark:bg-linear-to-b dark:from-white dark:via-slate-200 dark:to-slate-400
                            leading-tight  bg-clip-text text-transparent'
                        >
                            Decentralized. Borderless. Permissionless. Trade.
                        </h1>
                        <h2 className='text-xs sm:text-sm md:text-base max-w-md mt-2'>Trade Directly from Your Wallet. Execute Trades. Retain Ownership.</h2>
                    </div>
                    <div className='w-full justify-start lg:justify-end flex'>
                        <Button className='w-fit bg-blue-500 text-xs sm:text-sm'>Explore Markets</Button>
                    </div>
                </div>
                
                <div className='grid grid-cols-2 w-full h-full gap-2 sm:gap-3 mt-6 sm:mt-8'>
                    <div className='w-full h-full gap-2 sm:gap-3 space-y-2 grid grid-rows-3'>
                        {performanceTokens.slice(0, 3).map((token) => (
                            <PerformanceButton key={token.name} token={token} />
                        ))}
                    </div>

                    <div className='w-full h-full gap-2 sm:gap-3 space-y-2 grid grid-rows-3'>
                        {performanceTokens.slice(3, 6).map((token) => (
                            <PerformanceButton key={token.name} token={token} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}
