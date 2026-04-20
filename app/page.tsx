import Chains from "@/components/landing/Chains";
import CommunityPosts from "@/components/landing/CommunityPosts";
import Description from "@/components/landing/description";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import LatestNews from "@/components/landing/LatestNews";
import Performance from "@/components/landing/Performance";
import PredictionMarkets from "@/components/landing/PredictionMarkets";
import Rewards from "@/components/landing/Rewards";
import Showcase from "@/components/landing/Showcase";
import Stats from "@/components/landing/Stats";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Image from "next/image";


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
        <div className="absolute left-1/100">
          <Image
            src="/assets/glass1.png"
            alt="cyclespace exchange vault"
            height={230}
            width={230}
            quality={100}
            className="object-cover rounded-full w-10 h-10 md:w-40 md:h-40 lg:w-60 lg:h-60 
            z-10 rounded-full  hover:scale-110 transition-transform duration-300"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        <Description text="Experience lightning-fast trades with zero custody risk and complete control over your assets." />
      </div>

      <div className="">
        <Features />
      </div>

      <div className="">
        <div className="absolute right-1/100  ">
          <Image
            src="/assets/glass5.png"
            alt="cyclespace exchange vault"
            height={230}
            width={230}
            quality={100}
            className="object-cover rounded-full w-10 h-10 md:w-40 md:h-40 lg:w-60 lg:h-60 
            z-10 rounded-full  hover:scale-110 transition-transform duration-300"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        <Chains />
      </div>
      
      <div className="">
        <Rewards />
      </div>

      <div>
        <div className="absolute left-1/100">
          <Image
            src="/assets/glass4.png"
            alt="cyclespace exchange vault"
            height={230}
            width={230}
            quality={100}
            className="object-cover rounded-full w-10 h-10 md:w-40 md:h-40 lg:w-60 lg:h-60 
            z-10 rounded-full  hover:scale-110 transition-transform duration-300"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        <Description text="Join thousands of traders who trust our platform for secure, transparent, and efficient decentralized trading." />
      </div>

      <div className="">
        <Performance />
      </div>

      <div className=" ">
        <div className="absolute right-1/100  ">
          <Image
            src="/assets/glass6.png"
            alt="cyclespace exchange vault"
            height={230}
            width={230}
            quality={100}
            className="object-cover filter hue-rotate-20 saturate-200 rounded-full w-10 h-10 md:w-40 md:h-40 lg:w-60 lg:h-60 
            z-10 rounded-full  hover:scale-110 transition-transform duration-300"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        <PredictionMarkets />
      </div>

      <div className="">
        <LatestNews/>
      </div>

      <div className="">
        <Footer />
      </div>
    </main>
  );
}

