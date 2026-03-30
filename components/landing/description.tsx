'use client'

import ScrollFloat from '../ScrollFloat'

interface DescriptionProps {
  text: string;
}

export default function Description({ text }: DescriptionProps) {
  return (
    <div className='font-sans mx-auto'>
        <main className='w-full h-full px-120 py-50 text-center leading-tight'>
            <h1 className='text-xl font-bold justify-center flex'>
                <ScrollFloat
                    animationDuration={1}
                    ease='back.inOut(2)'
                    scrollStart='center bottom+=50%'
                    scrollEnd='bottom bottom-=40%'
                    stagger={0.03}
                >
                    {text}
                </ScrollFloat>
            </h1>
        </main>
    </div>
  )
}
