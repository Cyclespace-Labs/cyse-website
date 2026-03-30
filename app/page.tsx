import Chains from "@/components/landing/Chains";
import CommunityPosts from "@/components/landing/CommunityPosts";
import Description from "@/components/landing/description";
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
    <main className="min-h-screen bg-white dark:bg-black scroll-smooth">
      
      <Header />
      <Hero />

      <div className="justify-center flex">
        <Stats />
      </div>

      <Showcase />

      <Description text="Experience lightning-fast trades with zero custody risk and complete control over your assets." />

      <Features />

      <Chains />
  
      <Rewards />

      <Description text="Join thousands of traders who trust our platform for secure, transparent, and efficient decentralized trading." />

      <Performance />

      <LatestNews/>

      <Footer />

      
    </main>
  );
}

