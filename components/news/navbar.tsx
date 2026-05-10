"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tourney } from "next/font/google";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ExternalLinkIcon, ChevronDown } from "lucide-react";
import { ThemeToggle } from "../themeToggle";
import SearchDialog from "./search-dialog";
import DropdownContent from "./DropdownContent";
import { useState, useEffect } from "react";


const tourney = Tourney({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Navbar() {
  const pathname = usePathname();
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingResearch, setLoadingResearch] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingLearn, setLoadingLearn] = useState(false);

  // Handle hover to trigger loading for specific sections
  const handleNewsHover = () => {
    if (!loadingNews && newsData.length === 0) {
      setLoadingNews(true);
      setTimeout(() => setLoadingNews(false), 500);
    }
  };

  const handleResearchHover = () => {
    if (!loadingResearch) {
      setLoadingResearch(true);
      setTimeout(() => setLoadingResearch(false), 500);
    }
  };

  const handleAnalysisHover = () => {
    if (!loadingAnalysis) {
      setLoadingAnalysis(true);
      setTimeout(() => setLoadingAnalysis(false), 500);
    }
  };

  const handleEventsHover = () => {
    if (!loadingEvents) {
      setLoadingEvents(true);
      setTimeout(() => setLoadingEvents(false), 500);
    }
  };

  const handleLearnHover = () => {
    if (!loadingLearn) {
      setLoadingLearn(true);
      setTimeout(() => setLoadingLearn(false), 500);
    }
  };

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  // Fetch news data
  useEffect(() => {
    async function fetchNews() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/news`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setNewsData(data);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoadingNews(false);
      }
    }
    fetchNews();
  }, []);

  // Filter news by categories
  const newsCards = newsData
    .filter(post => ['Markets', 'Tech', 'Policy'].includes(post.categoryName))
    .slice(0, 5)
    .map(post => ({
      title: post.title,
      description: post.smallDescription,
      href: `/news/${post.slug}`,
      category: post.categoryName,
      image: post.titleImage
    }));

  const researchCards: any[] = [];
  const analysisCards: any[] = [];
  const eventsCards: any[] = [];
  const learnCards: any[] = [];

  return (
    <header className="w-full">
      <main className="w-full bg-white dark:bg-slate-950 items-center flex flex-row justify-between p-3 px-6
            border border-slate-200 dark:border-slate-800">
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
            <div className="relative group" onMouseEnter={handleNewsHover}>
              <Link href="/news" className={`flex items-center gap-1 px-3 py-2 rounded-sm transition-colors ${
                isActive("/news") 
                  ? "text-primary dark:text-primary bg-slate-100 dark:bg-slate-900" 
                  : "hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100"
              }`}>
                News
              </Link>
              <DropdownContent 
                cards={newsCards}
                loading={loadingNews}
                sectionLinks={[
                  { label: "Markets", href: "/news/markets" },
                  { label: "Finance", href: "/news/finance" },
                  { label: "Tech", href: "/news/tech" },
                  { label: "Policy", href: "/news/policy" },
                ]}
                featuredSections={[]}
              />
            </div>
            <div className="relative group" onMouseEnter={handleResearchHover}>
              <Link href="/research" className={`flex items-center gap-1 px-3 py-2 rounded-sm transition-colors ${
                isActive("/research") 
                  ? "text-primary dark:text-primary bg-slate-100 dark:bg-slate-800" 
                  : "hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100"
              }`}>
                <span className="inline-flex items-center gap-1.5">
                  Research
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-4 relative bottom-2 right-1 rounded-full bg-blue-500/30 text-blue-500 dark:bg-blue-500/30 dark:text-blue-500 border-none"
                  >
                    soon
                  </Badge>
                </span>
              </Link>
              <DropdownContent 
                cards={researchCards}
                loading={loadingResearch}
                comingSoon={true}
                sectionLinks={[
                  { label: "Crypto", href: "/research/crypto" },
                  { label: "DeFi", href: "/research/deFi" },
                  { label: "NFT", href: "/research/nft" },
                  { label: "Web3", href: "/research/web3" },
                ]}
                featuredSections={[]}
              />
            </div>
            <div className="relative group" onMouseEnter={handleAnalysisHover}>
              <Link href="/analysis" className={`flex items-center gap-1 px-3 py-2 rounded-sm transition-colors ${
                isActive("/analysis") 
                  ? "text-primary dark:text-primary bg-slate-100 dark:bg-slate-800" 
                  : "hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100"
              }`}>
                <span className="inline-flex items-center gap-1.5">
                  Analysis
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-4 relative bottom-2 right-1 rounded-full bg-blue-500/30 text-blue-500 dark:bg-blue-500/30 dark:text-blue-500 border-none"
                  >
                    soon
                  </Badge>
                </span>
              </Link>
              <DropdownContent 
                cards={analysisCards}
                loading={loadingAnalysis}
                comingSoon={true}
                sectionLinks={[
                  { label: "Market", href: "/analysis/market" },
                  { label: "Technical", href: "/analysis/technical" },
                  { label: "On-Chain", href: "/analysis/on-chain" },
                  { label: "Sentiment", href: "/analysis/sentiment" },
                ]}
                featuredSections={[]}
              />
            </div>
            <div className="relative group" onMouseEnter={handleEventsHover}>
              <Link href="/events" className={`flex items-center gap-1 px-3 py-2 rounded-sm transition-colors ${
                isActive("/events") 
                  ? "text-primary dark:text-primary bg-slate-100 dark:bg-slate-800" 
                  : "hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100"
              }`}>
                <span className="inline-flex items-center gap-1.5">
                  Events
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-4 relative bottom-2 right-1 rounded-full bg-blue-500/30 text-blue-500 dark:bg-blue-500/30 dark:text-blue-500 border-none"
                  >
                    soon
                  </Badge>
                </span>
              </Link>
              <DropdownContent 
                cards={eventsCards}
                loading={loadingEvents}
                comingSoon={true}
                sectionLinks={[
                  { label: "Upcoming", href: "/events/upcoming" },
                  { label: "Past Events", href: "/events/past" },
                  { label: "Webinars", href: "/events/webinars" },
                  { label: "Conferences", href: "/events/conferences" },
                ]}
                featuredSections={[]}
              />
            </div>
            <div className="relative group" onMouseEnter={handleLearnHover}>
              <Link href="/learn" className={`flex items-center gap-1 px-3 py-2 rounded-sm transition-colors ${
                isActive("/learn") 
                  ? "text-primary dark:text-primary bg-slate-100 dark:bg-slate-800" 
                  : "hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100"
              }`}>
                <span className="inline-flex items-center gap-1.5">
                  Learn
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-4 relative bottom-2 right-1 rounded-full bg-blue-500/30 text-blue-500 dark:bg-blue-500/30 dark:text-blue-500 border-none"
                  >
                    soon
                  </Badge>
                </span>
              </Link>
              <DropdownContent 
                cards={learnCards}
                loading={loadingLearn}
                comingSoon={true}
                sectionLinks={[
                  { label: "Beginners", href: "/learn/beginners" },
                  { label: "Guides", href: "/learn/guides" },
                  { label: "Tutorials", href: "/learn/tutorials" },
                  { label: "Glossary", href: "/learn/glossary" },
                ]}
                featuredSections={[]}
              />
            </div>
          </div>

        </div>

        <div className="flex gap-2 items-center">
          <div className="hidden md:flex w-48 lg:w-56">
            <SearchDialog />
          </div>
          <div className="hidden w-fit h-fit md:hidden lg:flex">
            <ThemeToggle/>
          </div>
          <Button className="hidden md:hidden lg:flex text-xs rounded-lg bg-primary text-white hover:bg-black hover:text-white
                    dark:hover:bg-slate-800 dark:hover:text-white transition-colors duration-200">
            Launch app
            <ExternalLinkIcon className="h-3 w-3 text-white" />
          </Button>
        </div>
      </main>
    </header>
  );
}