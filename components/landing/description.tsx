'use client'

import ScrollFloat from '../ScrollFloat'

interface DescriptionProps {
  text: string;
}

export default function Description({ text }: DescriptionProps) {
  return (
    <div className='font-sans mx-auto'>
        <main className='w-full h-full px-10 md:px-60 lg:px-[clamp(15rem,25vw,30rem)] py-10 md:py-40'>
            <div className='text-xs text-center leading-tight md:text-xl font-bold justify-center flex'>
                <ScrollFloat
                    animationDuration={1}
                    ease='back.inOut(2)'
                    scrollStart='center bottom+=50%'
                    scrollEnd='bottom bottom-=40%'
                    stagger={0.03}
                >
                    {text}
                </ScrollFloat>
            </div>
        </main>
    </div>
  )
}
