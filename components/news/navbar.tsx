"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tourney } from "next/font/google";
import { Button } from "../ui/button";
import { ExternalLinkIcon, ChevronDown } from "lucide-react";
import { ThemeToggle } from "../themeToggle";
import SearchDialog from "./search-dialog";
import DropdownContent from "./DropdownContent";


const tourney = Tourney({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Navbar() {
  const pathname = usePathname();

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  // Sample data for dropdowns - in production, this would come from an API
  const newsCards = [
    { title: "Bitcoin Surges Past $70,000", description: "BTC reaches new all-time high amid institutional demand", href: "/news/bitcoin-surges", category: "Markets", image: "" },
    { title: "Ethereum 2.0 Update Complete", description: "Major network upgrade improves scalability and security", href: "/news/ethereum-update", category: "Tech", image: "" },
    { title: "Regulatory Framework Proposed", description: "New crypto regulations could reshape the industry", href: "/news/regulations", category: "Policy", image: "" },
    { title: "DeFi TVL Hits $100 Billion", description: "Total value locked in decentralized finance reaches milestone", href: "/news/defi-tvl", category: "Finance", image: "" },
    { title: "NFT Market Recovery", description: "Digital collectibles see renewed interest from collectors", href: "/news/nft-recovery", category: "Tech", image: "" },
  ];

  const researchCards = [
    { title: "Crypto Market Analysis Q4", description: "Comprehensive analysis of cryptocurrency market trends", href: "/research/crypto-analysis", category: "Crypto" },
    { title: "DeFi Protocol Security", description: "Deep dive into decentralized finance security measures", href: "/research/defi-security", category: "DeFi" },
    { title: "NFT Utility Evolution", description: "Exploring new use cases for non-fungible tokens", href: "/research/nft-utility", category: "NFT" },
    { title: "Web3 Infrastructure", description: "Building the decentralized web infrastructure", href: "/research/web3-infra", category: "Web3" },
    { title: "Blockchain Scalability", description: "Solutions for scaling blockchain networks", href: "/research/scalability", category: "Web3" },
  ];

  const analysisCards = [
    { title: "Market Trend Analysis", description: "Current market movements and technical indicators", href: "/analysis/market-trend", category: "Market" },
    { title: "Technical Indicators Guide", description: "Essential technical analysis tools for traders", href: "/analysis/technical-guide", category: "Technical" },
    { title: "On-Chain Data Insights", description: "Analyzing blockchain transaction patterns", href: "/analysis/onchain-insights", category: "On-Chain" },
    { title: "Sentiment Analysis Report", description: "Market sentiment indicators and social metrics", href: "/analysis/sentiment-report", category: "Sentiment" },
    { title: "Trading Volume Analysis", description: "Volume trends and liquidity analysis", href: "/analysis/volume", category: "Market" },
  ];

  const eventsCards = [
    { title: "Blockchain Summit 2026", description: "Annual conference bringing together industry leaders", href: "/events/summit-2026", category: "Conferences" },
    { title: "DeFi Workshop Series", description: "Learn about decentralized finance from experts", href: "/events/defi-workshop", category: "Webinars" },
    { title: "Crypto Trading Bootcamp", description: "Intensive training for cryptocurrency traders", href: "/events/trading-bootcamp", category: "Upcoming" },
    { title: "Web3 Developer Meetup", description: "Networking event for blockchain developers", href: "/events/web3-meetup", category: "Upcoming" },
    { title: "NFT Art Exhibition", description: "Showcase of digital art from top creators", href: "/events/nft-exhibition", category: "Past Events" },
  ];

  const learnCards = [
    { title: "Crypto for Beginners", description: "Introduction to cryptocurrency basics", href: "/learn/crypto-basics", category: "Beginners" },
    { title: "Trading Strategies Guide", description: "Essential trading strategies for newcomers", href: "/learn/trading-guide", category: "Guides" },
    { title: "Wallet Security Tutorial", description: "How to secure your digital assets", href: "/learn/wallet-security", category: "Tutorials" },
    { title: "Blockchain Glossary", description: "Key terms and definitions in blockchain", href: "/learn/glossary", category: "Glossary" },
    { title: "Smart Contract Basics", description: "Understanding smart contract fundamentals", href: "/learn/smart-contracts", category: "Tutorials" },
  ];

  return (
    <header className="w-full">
      <main className="w-full bg-white dark:bg-zinc-950 items-center flex flex-row justify-between p-3 px-6
            border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-row gap-16">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-start space-x-1 md:space-x-2">
            <div className="p-0 rounded-lg transition-all duration-100 font-sans">

              <svg
                width="30"
                height="30"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6  fill-blue-500 stroke-blue-500"
              >
                <path
                  d="M105 76H38.8466C38.8466 76 33.5426 87.8169 32.5112 92.1876C27.8222 112.059 26.8737 128.971 29.2698 149.33C31.4799 168.107 38.6993 183 38.6993 183H101.759C101.759 183 89.4948 164.979 86.2884 155.157C81.4264 140.265 81.6222 128.124 84.3731 111.613C87.4302 93.2635 105 76 105 76Z"
                />
                <path
                  d="M125.807 21.3854C108.841 22.5059 89 33.4938 89 33.4938C89 33.4938 110.862 35.6524 122.776 41.1486C135.785 47.1503 144.604 53.1327 152.654 64.6696C159.034 73.8123 160.737 90 160.737 90H228C228 90 225.957 79.1846 219.484 68.2883C212.123 53.3962 197.111 40.3233 183.254 32.5196C164.979 22.2275 147.371 19.9612 125.807 21.3854Z"
                />
                <path
                  d="M125.807 235.615C108.841 234.494 89 223.506 89 223.506C89 223.506 110.862 221.348 122.776 215.851C135.785 209.85 144.604 203.867 152.654 192.33C159.034 183.188 160.737 167 160.737 167H228C228 167 225.957 177.815 219.484 188.712C212.123 203.604 197.111 216.677 183.254 224.48C164.979 234.773 147.371 237.039 125.807 235.615Z"
                />
              </svg>

            </div>
            <span
              className={`${tourney.className} antialiased text-md md:text-xl font-semibold bg-black dark:bg-white text-transparent bg-clip-text`}
            >
              CYCLESPACE
            </span>
          </Link>
          <div className="flex gap-5 items-center text-sm font-semibold tracking-tight ">
            <div className="relative group">
              <Link href="/news" className={`flex items-center gap-1 px-3 py-2 rounded-sm border-b-2 transition-colors ${
                isActive("/news") 
                  ? "border-primary text-primary dark:text-primary bg-zinc-100 dark:bg-zinc-800" 
                  : "border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              }`}>
                News
                <ChevronDown className="h-3 w-3 opacity-60 transition-transform group-hover:rotate-180" />
              </Link>
              <DropdownContent 
                cards={newsCards}
                sectionLinks={[
                  { label: "Markets", href: "/news/markets" },
                  { label: "Finance", href: "/news/finance" },
                  { label: "Tech", href: "/news/tech" },
                  { label: "Policy", href: "/news/policy" },
                ]}
                featuredSections={[
                  { 
                    title: "Trending", 
                    href: "/news/trending",
                    card: { title: "Bitcoin Reaches $70K", description: "BTC hits new milestone", href: "/news/btc-70k", category: "Markets" }
                  },
                  { 
                    title: "Editor's Pick", 
                    href: "/news/editors-pick",
                    card: { title: "DeFi Evolution", description: "The future of decentralized finance", href: "/news/defi-evolution", category: "Finance" }
                  },
                ]}
              />
            </div>
            <div className="relative group">
              <Link href="/research" className={`flex items-center gap-1 px-3 py-2 rounded-sm border-b-2 transition-colors ${
                isActive("/research") 
                  ? "border-primary text-primary dark:text-primary bg-zinc-100 dark:bg-zinc-800" 
                  : "border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              }`}>
                Research
                <ChevronDown className="h-3 w-3 opacity-60 transition-transform group-hover:rotate-180" />
              </Link>
              <DropdownContent 
                cards={researchCards}
                sectionLinks={[
                  { label: "Crypto", href: "/research/crypto" },
                  { label: "DeFi", href: "/research/deFi" },
                  { label: "NFT", href: "/research/nft" },
                  { label: "Web3", href: "/research/web3" },
                ]}
                featuredSections={[
                  { 
                    title: "Latest Research", 
                    href: "/research/latest",
                    card: { title: "Q4 Market Analysis", description: "Comprehensive crypto market trends", href: "/research/q4-analysis", category: "Crypto" }
                  },
                  { 
                    title: "Popular", 
                    href: "/research/popular",
                    card: { title: "DeFi Security Guide", description: "Best practices for DeFi safety", href: "/research/defi-security", category: "DeFi" }
                  },
                ]}
              />
            </div>
            <div className="relative group">
              <Link href="/analysis" className={`flex items-center gap-1 px-3 py-2 rounded-sm border-b-2 transition-colors ${
                isActive("/analysis") 
                  ? "border-primary text-primary dark:text-primary bg-zinc-100 dark:bg-zinc-800" 
                  : "border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              }`}>
                Analysis
                <ChevronDown className="h-3 w-3 opacity-60 transition-transform group-hover:rotate-180" />
              </Link>
              <DropdownContent 
                cards={analysisCards}
                sectionLinks={[
                  { label: "Market", href: "/analysis/market" },
                  { label: "Technical", href: "/analysis/technical" },
                  { label: "On-Chain", href: "/analysis/on-chain" },
                  { label: "Sentiment", href: "/analysis/sentiment" },
                ]}
                featuredSections={[
                  { 
                    title: "Daily Analysis", 
                    href: "/analysis/daily",
                    card: { title: "Market Trend Today", description: "Current market movements", href: "/analysis/daily-trend", category: "Market" }
                  },
                  { 
                    title: "Weekly Report", 
                    href: "/analysis/weekly",
                    card: { title: "On-Chain Insights", description: "Blockchain transaction patterns", href: "/analysis/weekly-onchain", category: "On-Chain" }
                  },
                ]}
              />
            </div>
            <div className="relative group">
              <Link href="/events" className={`flex items-center gap-1 px-3 py-2 rounded-sm border-b-2 transition-colors ${
                isActive("/events") 
                  ? "border-primary text-primary dark:text-primary bg-zinc-100 dark:bg-zinc-800" 
                  : "border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              }`}>
                Events
                <ChevronDown className="h-3 w-3 opacity-60 transition-transform group-hover:rotate-180" />
              </Link>
              <DropdownContent 
                cards={eventsCards}
                sectionLinks={[
                  { label: "Upcoming", href: "/events/upcoming" },
                  { label: "Past Events", href: "/events/past" },
                  { label: "Webinars", href: "/events/webinars" },
                  { label: "Conferences", href: "/events/conferences" },
                ]}
                featuredSections={[
                  { 
                    title: "Featured Event", 
                    href: "/events/featured",
                    card: { title: "Blockchain Summit 2026", description: "Annual industry conference", href: "/events/summit-2026", category: "Conferences" }
                  },
                  { 
                    title: "This Week", 
                    href: "/events/this-week",
                    card: { title: "DeFi Workshop", description: "Learn DeFi from experts", href: "/events/defi-workshop", category: "Webinars" }
                  },
                ]}
              />
            </div>
            <div className="relative group">
              <Link href="/learn" className={`flex items-center gap-1 px-3 py-2 rounded-sm border-b-2 transition-colors ${
                isActive("/learn") 
                  ? "border-primary text-primary dark:text-primary bg-zinc-100 dark:bg-zinc-800" 
                  : "border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              }`}>
                Learn
                <ChevronDown className="h-3 w-3 opacity-60 transition-transform group-hover:rotate-180" />
              </Link>
              <DropdownContent 
                cards={learnCards}
                sectionLinks={[
                  { label: "Beginners", href: "/learn/beginners" },
                  { label: "Guides", href: "/learn/guides" },
                  { label: "Tutorials", href: "/learn/tutorials" },
                  { label: "Glossary", href: "/learn/glossary" },
                ]}
                featuredSections={[
                  { 
                    title: "Start Here", 
                    href: "/learn/start",
                    card: { title: "Crypto Basics", description: "Introduction to cryptocurrency", href: "/learn/crypto-basics", category: "Beginners" }
                  },
                  { 
                    title: "Recommended", 
                    href: "/learn/recommended",
                    card: { title: "Wallet Security", description: "How to secure your assets", href: "/learn/wallet-security", category: "Tutorials" }
                  },
                ]}
              />
            </div>
          </div>

        </div>

        <div className="flex gap-2 items-center">
          <div className="hidden md:flex w-48 lg:w-56">
            <SearchDialog />
          </div>
          <Button className="hidden md:hidden lg:flex text-xs rounded-lg bg-primary text-white hover:bg-black hover:text-white
                    dark:hover:bg-slate-800 dark:hover:text-white transition-colors duration-200">
            Launch app
            <ExternalLinkIcon className="h-3 w-3 text-white" />
          </Button>
          <div className="hidden w-fit h-fit md:hidden lg:flex">
            <ThemeToggle/>
          </div>
        </div>
      </main>
    </header>
  );
}