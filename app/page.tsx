import Chains from "@/components/landing/Chains";
import CommunityPosts from "@/components/landing/CommunityPosts";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import LatestNews from "@/components/landing/LatestNews";
import Performance from "@/components/landing/Performance";
import Rewards from "@/components/landing/Rewards";
import Showcase from "@/components/landing/Showcase";
import Stats from "@/components/landing/Stats";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";


export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      
      <Header />
      <Hero />

      <div className="justify-center flex">
        <Stats />
      </div>

      <div>
        <Showcase />
      </div>

      <div className="">
        <Features />
      </div>

      <div className="">
        <Chains />
      </div>
      
      <div className="">
        <Rewards />
      </div>

      <div className="">
        <Performance />
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
