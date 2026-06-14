import dynamic from 'next/dynamic';
import { Suspense, lazy } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Components that are immediately visible – loaded normally
import Hero from '@/components/landing/Hero';
import Stats from '@/components/landing/Stats';
import Showcase from '@/components/landing/Showcase';
import Description from '@/components/landing/description';

// Lazy load components that appear below the fold
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
    <main className="min-h-screen bg-white dark:bg-black h-full">
      <Header />
      <Hero />

      <div className="justify-center flex">
        <Stats />
      </div>

      <div>
        <Showcase />
      </div>

      <div>
        <Description text="Experience lightning-fast trades with zero custody risk and complete control over your assets." />
      </div>

      <Suspense fallback={<div className="h-40 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <Features />
      </Suspense>

      <Suspense fallback={<div className="h-60 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <Chains />
      </Suspense>

      <Suspense fallback={<div className="h-80 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <Rewards />
      </Suspense>

      <div>
        <Description text="Join thousands of traders who trust our platform for secure, transparent, and efficient decentralized trading." />
      </div>

      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <Coverage />
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <PredictionMarkets />
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <Timeline />
      </Suspense>

      <Suspense fallback={<div className="h-80 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <LatestNews />
      </Suspense>

      <Footer />
    </main>
  );
}