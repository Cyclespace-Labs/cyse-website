import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';


// Components that are immediately visible – loaded normally
import Hero from '@/components/landing/Hero';
import Stats from '@/components/landing/Stats';


// Lazy load components that appear below the fold

const Showcase = dynamic(() => import('@/components/landing/Showcase'), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />,
  ssr:true,
})

const Description = dynamic(() => import('@/components/landing/description'), {
  loading: () => <div className="h-40 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />,
  ssr:true,
});

const Features = dynamic(() => import('@/components/landing/Features'), {
  loading: () => <div className="h-40 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />,
  ssr: true, // Keep SSR for SEO
});

const Chains = dynamic(() => import('@/components/landing/Chains'), {
  loading: () => <div className="h-60 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />,
  ssr: true,
});

const Rewards = dynamic(() => import('@/components/landing/Rewards'), {
  loading: () => <div className="h-80 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />,
  ssr: true,
});

const Coverage = dynamic(() => import('@/components/landing/Coverage'), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />,
  ssr: true,
});

const PredictionMarkets = dynamic(() => import('@/components/landing/PredictionMarkets'), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />,
  ssr: true,
});

const Timeline = dynamic(() => import('@/components/landing/Timeline'), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />,
  ssr: true,
});

const LatestNews = dynamic(() => import('@/components/landing/LatestNews'), {
  loading: () => <div className="h-80 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />,
  ssr: true,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black h-full transform-gpu">
      <Header />
      <Hero />
      
      <div className="justify-center flex h-fit hidden">
        <Stats />
      </div>

      <Suspense fallback={<div className="h-60 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <div className='hidden'>
          <Showcase />
        </div>
      </Suspense>

      <Suspense fallback={<div className="h-40 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <div className='hidden'>
          <Description text="Experience lightning-fast trades with zero custody risk and complete control over your assets." />
        </div>
      </Suspense>

      <Suspense fallback={<div className="h-40 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <div className='hidden'>
          <Features />
        </div>
      </Suspense>

      <Suspense fallback={<div className="h-60 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <div className='hidden'>
          <Chains />
        </div>
      </Suspense>

      <Suspense fallback={<div className="h-80 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <div className='hidden'>
          <Rewards />
        </div>
      </Suspense>

      <Suspense fallback={<div className="h-40 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <div className='hidden'>
          <Description text="Join thousands of traders who trust our platform for secure, transparent, and efficient decentralized trading." />
        </div>
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <div className='hidden'>
          <Coverage />
        </div>
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <div className='hidden'>
          <PredictionMarkets />
        </div>
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <div className='hidden'>
          <Timeline />
        </div>
      </Suspense>

      <Suspense fallback={<div className="h-80 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <div className='hidden'>
          <LatestNews />
        </div>
      </Suspense>

      <Footer />
    </main>
  );
}