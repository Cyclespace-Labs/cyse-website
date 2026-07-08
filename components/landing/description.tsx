'use client'

import ScrollFloat from '../ScrollFloat'

interface DescriptionProps {
  text: string;
}

export default function Description({ text }: DescriptionProps) {
  return (
    <div className='font-sans mx-auto px-auto'>
        <main className='w-full h-full px-8 md:px-30 lg:px-30 xl:px-80 mx-auto md:pt-20 lg:pt-0 xl:pt-0 
        md:pb-10 lg:pb-40 xl:pb-50'>
            <div className='text-xs text-center justify-center flex'>
                <ScrollFloat
                    animationDuration={1}
                    ease='back.inOut(2)'
                    scrollStart='center bottom+=80%'
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
