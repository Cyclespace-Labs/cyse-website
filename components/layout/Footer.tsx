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

        <div className="absolute inset-0 bg-linear-to-l from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0E76FD] via-[#0E76FD]/50 to-transparent" />
      </div>

      {/* Foreground content – all interactive and visible elements */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <FAQ items={faqItems} />

        <div className="mt-10 flex w-full justify-center px-30">
          <div className="flex w-full flex-row justify-center">
            <div className="flex w-full flex-col gap-5 text-center">
              <Link href="/about" className="text-white">
                About Us
              </Link>
              <Link href="/about" className="text-white">
                About Us
              </Link>
              <Link href="/about" className="text-white">
                About Us
              </Link>
              <Link href="/about" className="text-white">
                About Us
              </Link>
              <Link href="/about" className="text-white">
                About Us
              </Link>
            </div>
            <div className="flex w-full flex-col gap-5 text-center">
              <Link href="/about" className="text-white">
                About Us
              </Link>
              <Link href="/about" className="text-white">
                About Us
              </Link>
              <Link href="/about" className="text-white">
                About Us
              </Link>
              <Link href="/about" className="text-white">
                About Us
              </Link>
              <Link href="/about" className="text-white">
                About Us
              </Link>
            </div>
            <div className="flex w-full flex-col gap-5 text-center">
              <Link href="/about" className="text-white">
                About Us
              </Link>
              <Link href="/about" className="text-white">
                About Us
              </Link>
              <Link href="/about" className="text-white">
                About Us
              </Link>
              <Link href="/about" className="text-white">
                About Us
              </Link>
            </div>
            <div className="flex w-full flex-col gap-5 text-center">
              <Link href="/about" className="text-white">
                About Us
              </Link>
              <Link href="/about" className="text-white">
                About Us
              </Link>
              <Link href="/about" className="text-white">
                About Us
              </Link>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <h3
            className={`${tourney.className} text-[280px] font-bold text-white `}
          >
            CYCLESPACE
          </h3>
        </div>
      </div>
    </div>
  );
}