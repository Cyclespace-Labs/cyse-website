'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import ScrambledText from '../ui/scrambled-text';
import * as motion from "motion/react-client"
import type { Variants } from "motion/react"

  const cardVariants: Variants = {
    offscreen: {
        y: 20,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
  }

export default function Hero() {
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const darkVideoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop to avoid loading video on mobile (where it's hidden anyway)
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  useEffect(() => {
    if (!isDesktop) return; // Don't attempt video playback on mobile

    const video = lightVideoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn('Autoplay failed, trying muted:', err);
        video.muted = true;
        try {
          await video.play();
        } catch {
          console.error('Video playback failed entirely');
          setVideoFailed(true);
        }
      }
    };

    video.addEventListener('canplaythrough', playVideo, { once: true });
    video.addEventListener('error', () => setVideoFailed(true), { once: true });

    return () => {
      video.removeEventListener('canplaythrough', playVideo);
    };
  }, [isDesktop]);

  return (
    <section className="relative w-full h-fit md:h-screen -top-17 h-full overflow-hidden flex font-sans items-center">
      {/* Background layer */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlays for text readability */}
        <div className="absolute hidden inset-0 bg-linear-to-r from-white via-transparent to-transparent
          dark:bg-linear-to-r dark:from-black dark:via-transparent dark:to-transparent z-10" />
        <div className="absolute hidden inset-0 bg-linear-to-t from-white via-transparent to-transparent
          dark:bg-linear-to-t dark:from-black dark:via-transparent dark:to-transparent z-10" />

        {/* Desktop background (video or fallback) */}
        {isDesktop && (
          <>
            {videoFailed ? (
              <>
                <Image
                  src="/new_hero.png"
                  alt="Background"
                  fill
                  sizes="100vw"
                  className="object-cover dark:hidden object-center z-10"
                  priority
                />
                <Image
                  src="/new_hero_dark.png"
                  alt="Cryptocurrency background"
                  fill
                  sizes="100vw"
                  className="object-cover object-center z-10 hidden dark:flex"
                  priority
                />
              </>
            ) : (
              <>
                {/* Light mode video */}
                <video
                  ref={lightVideoRef}
                  className="w-full h-full dark:hidden flex object-cover object-center z-10"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="/new_hero.png"
                  disablePictureInPicture
                  disableRemotePlayback
                >
                  <source src="/render.mp4" type="video/mp4" />
                  <source src="/video.webm" type="video/webm" />
                </video>

                {/* Dark mode video */}
                <video
                  ref={darkVideoRef}
                  className="w-full h-full object-cover hidden dark:flex object-center z-10"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="/new_hero_dark.png"
                  disablePictureInPicture
                  disableRemotePlayback
                >
                  <source src="/render_dark.mp4" type="video/mp4" />
                  <source src="/video_dark.webm" type="video/webm" />
                </video>
              </>
            )}
          </>
        )}

        {/* Mobile static image (always visible on mobile) */}
        <Image
          src="/render-mobile.png"
          alt="Cryptocurrency background"
          fill
          sizes="(max-width: 767px) 100vw"
          className="object-cover object-center z-10 hidden md:hidden"
          priority
        />

        <>
          {/* mobile Light mode video */}
          <div className="absolute flex sm:hidden inset-0 bg-linear-to-r from-white via-white/50 to-transparent
            dark:bg-linear-to-r dark:from-black dark:via-black/50 dark:to-transparent transition-all 
            duration-500 z-20 overlay"
          />
          <div className="absolute flex sm:hidden inset-0 bg-linear-to-t from-white via-white/20 to-transparent
            dark:bg-linear-to-t dark:from-black dark:via-transparent dark:to-transparent transition-all 
            duration-500 z-20" 
          />

          <video
            ref={lightVideoRef}
            className=" w-full h-full overflow-visible -translate-x-30 relative dark:hidden lg:hidden md:hidden object-cover object-center z-10"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/new_hero.png"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src="/render.mp4" type="video/mp4" />
            <source src="/video.webm" type="video/webm" />
          </video>

          {/* Dark mode video */}
          <video
            ref={darkVideoRef}
            className="w-full h-full overflow-visible -translate-x-30 relative lg:hidden md:hidden object-cover hidden dark:flex object-center z-10"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/new_hero_dark.png"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src="/render_dark.mp4" type="video/mp4" />
            <source src="/video_dark.webm" type="video/webm" />
          </video>
        </>

      </div>

      {/* Hero content */}
      <div className="container mx-auto px-8 flex pb-20 sm:pb-70 sm:px-10 md:px-12 relative z-10 pt-0 md:pt-10 lg:pt-100">
        <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 1, }}}
            viewport={{ amount: 0.9 }}
            className='h-fit'
          >

            {/* Desktop animated text */}
            <div className="mb-4 sm:mb-6 hidden md:block text-black dark:text-white">
              <ScrambledText
                className="scrambled-text-demo text-black dark:text-white w-full py-0 my-0 pl-0 ml-0 text-5xl sm:text-4xl md:text-4xl lg:text-5xl font-bold"
                radius={100}
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
              >
                Unstoppable Markets.
                <br />
                Total Transparency.
              </ScrambledText>
            </div>

            {/* Mobile static heading */}
            <h1 className="text-4xl flex mt-70 md:hidden font-bold
              text-black dark:text-white leading-tight mb-4 sm:mb-6 z-30">
              Unstoppable Markets.
              <br />
              Total Transparency.
            </h1>

            <p className="text-base sm:text-lg md:text-lg lg:text-lg text-slate-700 dark:text-slate-300 mb-6 sm:mb-10 leading-relaxed max-w-lg">
              Trade Directly from Your Wallet. Execute Trades. Retain Ownership.
            </p>

            <div className="flex flex-row justify-between md:px-0 md:justify-start md:flex-row gap-3 sm:gap-4">
              <Button className="px-4 sm:px-5 py-3 sm:py-5 bg-primary text-white rounded-3xl font-medium hover:bg-primary/80 dark:shadow-primary/50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-400 border-none group hover:scale-105">
                Trade on Cyclespace
              </Button>

              <Button className="px-4 sm:px-5 py-3 sm:py-5 bg-black dark:bg-slate-900 text-white border-none rounded-3xl font-medium hover:bg-slate-800 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-400/50 dark:shadow-slate-950 hover:scale-105">
                Build on CYSE
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-slate-300 dark:bg-slate-600 rounded-full" />
        </div>
      </div>
    </section>
  );
}