import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Showcase from "@/components/landing/Showcase";
import Stats from "@/components/landing/Stats";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <div className="justify-center   items-center flex">
        <Stats />
      </div>

      <div>
        <Showcase />
      </div>

      <div>
        <Features />
      </div>
      
    </main>
  );
}
