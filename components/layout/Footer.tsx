"use client"

import FAQ from '../ui/faq';
import Link from 'next/link';
import { Tourney } from 'next/font/google';
import Silk from '../Silk';

const tourney = Tourney({subsets:['latin'],variable:'--font-sans'});


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
    <div className='bg-blue-500 w-full h-full justify-center items-center mx-auto'>
        <main className='justify-center w-full h-full'>

            <div className='absolute inset-0 z-0 '>
              <Silk
                speed={5}
                scale={1}
                color="#7B7481"
                noiseIntensity={1.5}
                rotation={0}
              />
            </div>
            <FAQ items={faqItems} />

            <div className='justify-center mt-10 flex w-full px-30'>
                <div className='flex flex-row w-full h-full justify-center'>
                    <div className='gap-5 flex text-center flex-col w-full'>
                        <Link href="/about" className="text-white">About Us</Link>
                        <Link href="/about" className="text-white">About Us</Link>
                        <Link href="/about" className="text-white">About Us</Link>
                        <Link href="/about" className="text-white">About Us</Link>
                        <Link href="/about" className="text-white">About Us</Link>
                    </div>
                    <div className='gap-5 text-center flex flex-col  w-full'>
                        <Link href="/about" className="text-white">About Us</Link>
                        <Link href="/about" className="text-white">About Us</Link>
                        <Link href="/about" className="text-white">About Us</Link>
                        <Link href="/about" className="text-white">About Us</Link>
                        <Link href="/about" className="text-white">About Us</Link>
                    </div>
                    <div className='gap-5 text-center flex flex-col  w-full'>
                        <Link href="/about" className="text-white">About Us</Link>
                        <Link href="/about" className="text-white">About Us</Link>
                        <Link href="/about" className="text-white">About Us</Link>
                        <Link href="/about" className="text-white">About Us</Link>
                    </div>
                    <div className='gap-5 text-center flex flex-col  w-full'>
                        <Link href="/about" className="text-white">About Us</Link>
                        <Link href="/about" className="text-white">About Us</Link>
                        <Link href="/about" className="text-white">About Us</Link>
                    </div>
                </div>
            </div>

            <div className='w-full h-full justify-center items-center flex'>
                <h3 className={`${tourney.className} font-bold text-[280px] text-blue-800 opacity-30`}>CYCLESPACE</h3>
            </div>

        </main>
    </div>
  )
}
