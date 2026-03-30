"use client";

import FAQ from "../ui/faq";
import Link from "next/link";
import { Tourney } from "next/font/google";
import Silk from "../Silk";
import GradientBlinds from "../GradientBlinds";

const tourney = Tourney({ subsets: ["latin"], variable: "--font-sans" });

const faqItems = [
  {
    question: "What is the purpose of this website?",
    answer:
      "This website is a place to help you find the best products and services in the world.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team by emailing support@example.com or using the live chat feature in the bottom right corner.",
  },
  {
    question: "How do I find the best products?",
    answer:
      "Browse our curated collections, read reviews, and use the filter tools to narrow down your search.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Yes, we offer a 30-day return policy for most items. Please check the product page for details.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "We ship to over 100 countries. Shipping costs and delivery times vary by destination.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking link via email. You can also track it in your account dashboard.",
  },
];

export default function Footer() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Silk – fills the entire footer */}
      <div className="absolute hidden inset-0 z-0">
        <Silk
          speed={5}
          scale={1}
          color="#0E76FD"
          noiseIntensity={1.5}
          rotation={0}
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#0E76FD] via-[#0E76FD]/50 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0E76FD] via-[#0E76FD]/50 to-transparent" />
      </div>

      <div className="absolute inset-0 z-0">

        {/*         
          <GradientBlinds
            gradientColors={["#0E76FD", "#0E76FD"]}
            angle={0}
            noise={0.3}
            blindCount={12}
            blindMinWidth={50}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={1}
            mouseDampening={0.15}
            distortAmount={10}
            shineDirection="right"
            mixBlendMode="darken"
          /> 
        */}


        <div style={{ width: '100%', height: '1400px', position: 'relative' }}>
          <GradientBlinds
            gradientColors={["#0E76FD", "#0E76FD"]}
            angle={0}
            noise={0.3}
            blindCount={12}
            blindMinWidth={50}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={1}
            mouseDampening={0.15}
            distortAmount={10}
            shineDirection="right"
            mixBlendMode="darken"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-l from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0E76FD] via-[#0E76FD]/50 to-transparent" />
      </div>

      {/* Foreground content – all interactive and visible elements */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <FAQ items={faqItems} />

        <div className="mt-6 md:mt-10 flex w-full justify-center px-6 sm:px-8 md:px-16 lg:px-30">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3 md:gap-4 w-full max-w-4xl">
            <Link href="/spot" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              Spot
            </Link>
            <Link href="/futures" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              Futures
            </Link>
            <Link href="/predictions" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              Predictions
            </Link>
            <Link href="/vault" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              Vault
            </Link>
            <Link href="/News" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              Markets
            </Link>
            <Link href="/swap-exchange" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              Swap
            </Link>
            <Link href="/trading" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              Stake
            </Link>
            <Link href="/Dashboard" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              Docs
            </Link>
            <Link href="/Edge" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              Whitepaper
            </Link>
            <Link href="/about" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              About Us
            </Link>
            <Link href="/contact" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              Contact
            </Link>
            <Link href="/careers" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              Careers
            </Link>
            <Link href="/blog" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              Blog
            </Link>
            <Link href="/terms" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              Terms
            </Link>
            <Link href="/privacy" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              Privacy
            </Link>
            <Link href="/support" className="text-white dark:text-white text-xs sm:text-sm md:text-base hover:text-blue-300 transition-colors text-center">
              Support
            </Link>
          </div>
        </div>

        <div className="flex w-full items-center justify-center px-4 py-8 sm:py-12 md:py-16">
          <h3
            className={`${tourney.className} text-[60px] sm:text-[100px] md:text-[160px] lg:text-[220px] xl:text-[280px] font-bold text-white dark:text-white`}
          >
            CYCLESPACE
          </h3>
        </div>
      </div>
    </div>
  );
}