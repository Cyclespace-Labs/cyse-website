"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tourney } from "next/font/google";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ExternalLinkIcon, Menu, X } from "lucide-react";
import { ThemeToggle } from "../themeToggle";
import SearchDialog from "./search-dialog";
import DropdownContent from "./DropdownContent";
import { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/client";

const tourney = Tourney({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [researchData, setResearchData] = useState<any[]>([]);
  const [loadingResearch, setLoadingResearch] = useState(true);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingLearn, setLoadingLearn] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Handle hover to trigger loading for specific sections
  const handleNewsHover = () => {
    if (!loadingNews && newsData.length === 0) {
      setLoadingNews(true);
      setTimeout(() => setLoadingNews(false), 500);
    }
  };

  const handleResearchHover = () => {};

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

  // Fetch research data
  useEffect(() => {
    async function fetchResearch() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/research`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setResearchData(data);
        }
      } catch (error) {
        console.error("Failed to fetch research:", error);
      } finally {
        setLoadingResearch(false);
      }
    }
    fetchResearch();
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
      image: post.titleImage?.asset ? urlFor(post.titleImage).width(400).url() : undefined
    }));

  const reportTypeLabels: Record<string, string> = {
    quarterly: 'Quarterly Review', annual: 'Annual Report', market: 'Market Report',
    adoption: 'Adoption Index', exchange: 'Exchange Report', stablecoin: 'Stablecoin Report',
    tokenization: 'Tokenization Report', network: 'Network Report', regulatory: 'Regulatory Report',
    ecosystem: 'Ecosystem Report', whitepaper: 'Whitepaper', 'case-study': 'Case Study',
    'deep-dive': 'Deep Dive',
  };

  const researchCards = researchData.slice(0, 3).map(item => ({
    title: item.title,
    description: item.authorName || '',
    href: `/research/${item.currentSlug}`,
    category: item.reportType ? (reportTypeLabels[item.reportType] || item.reportType) : undefined,
    image: item.titleImage?.asset ? urlFor(item.titleImage).width(400).url() : undefined
  }));
  const analysisCards: any[] = [];
  const eventsCards: any[] = [];
  const learnCards: any[] = [];

  // Navigation items with their sub-links (reused for mobile)
  const navItems = [
    {
      label: 'News',
      href: '/news',
      sectionLinks: [
        { label: 'Markets', href: '/news/markets' },
        { label: 'Finance', href: '/news/finance' },
        { label: 'Tech', href: '/news/tech' },
        { label: 'Policy', href: '/news/policy' },
      ],
      soon: false,
    },
    {
      label: 'Research',
      href: '/research',
      sectionLinks: [
        { label: 'Case Study', href: '/research/case-study' },
        { label: 'Deep Dive', href: '/research/deep-dive' },
        { label: 'Ecosystem Report', href: '/research/ecosystem' },
        { label: 'Market Analysis', href: '/research/market' },
      ],
      soon: true,
    },
    {
      label: 'Analysis',
      href: '/analysis',
      sectionLinks: [
        { label: 'Market', href: '/analysis/market' },
        { label: 'Technical', href: '/analysis/technical' },
        { label: 'On-Chain', href: '/analysis/on-chain' },
        { label: 'Sentiment', href: '/analysis/sentiment' },
      ],
      soon: true,
    },
    {
      label: 'Events',
      href: '/events',
      sectionLinks: [
        { label: 'Upcoming', href: '/events/upcoming' },
        { label: 'Past Events', href: '/events/past' },
        { label: 'Webinars', href: '/events/webinars' },
        { label: 'Conferences', href: '/events/conferences' },
      ],
      soon: true,
    },
    {
      label: 'Learn',
      href: '/learn',
      sectionLinks: [
        { label: 'Beginners', href: '/learn/beginners' },
        { label: 'Guides', href: '/learn/guides' },
        { label: 'Tutorials', href: '/learn/tutorials' },
        { label: 'Glossary', href: '/learn/glossary' },
      ],
      soon: true,
    },
  ];

  return (
    <header className="w-full">
      <main className="w-full bg-white dark:bg-slate-950 items-center flex flex-row justify-between p-3 px-6 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-row gap-4 md:gap-16 items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-start space-x-1 md:space-x-2 w-full">
            <div className="p-0 rounded-lg transition-all duration-100 font-sans">
              <svg
                width="30"
                height="30"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 fill-blue-500 stroke-blue-500"
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

          {/* Hamburger Menu Button (Mobile) */}
          <div className="flex md:hidden items-center w-full">
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-900 dark:text-slate-100" />
              ) : (
                <Menu className="h-6 w-6 text-slate-900 dark:text-slate-100" />
              )}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-5 items-center text-sm font-semibold justify-start tracking-tight">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={
                  item.label === 'News' ? handleNewsHover :
                  item.label === 'Research' ? handleResearchHover :
                  item.label === 'Analysis' ? handleAnalysisHover :
                  item.label === 'Events' ? handleEventsHover :
                  item.label === 'Learn' ? handleLearnHover : undefined
                }
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-sm transition-colors ${
                    isActive(item.href)
                      ? "text-primary dark:text-primary bg-slate-100 dark:bg-slate-900"
                      : "hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {item.label}
                    {item.soon && (
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 h-4 relative bottom-2 right-1 rounded-full bg-blue-500/30 text-blue-500 dark:bg-blue-500/30 dark:text-blue-500 border-none"
                      >
                        soon
                      </Badge>
                    )}
                  </span>
                </Link>
                <DropdownContent
                  cards={
                    item.label === 'News' ? newsCards :
                    item.label === 'Research' ? researchCards :
                    item.label === 'Analysis' ? analysisCards :
                    item.label === 'Events' ? eventsCards :
                    item.label === 'Learn' ? learnCards : []
                  }
                  loading={
                    item.label === 'News' ? loadingNews :
                    item.label === 'Research' ? loadingResearch :
                    item.label === 'Analysis' ? loadingAnalysis :
                    item.label === 'Events' ? loadingEvents :
                    item.label === 'Learn' ? loadingLearn : false
                  }
                  comingSoon={item.soon}
                  sectionLinks={item.sectionLinks}
                  featuredSections={[]}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Right Actions */}
        <div className="flex gap-2 items-center">
          <div className="hidden md:flex w-48 lg:w-56">
            <SearchDialog />
          </div>
          <div className="hidden w-fit h-fit md:hidden lg:flex">
            <ThemeToggle />
          </div>
          <Button className="hidden md:hidden lg:flex text-xs rounded-lg bg-primary text-white hover:bg-black hover:text-white dark:hover:bg-slate-800 dark:hover:text-white transition-colors duration-200">
            Launch app
            <ExternalLinkIcon className="h-3 w-3 text-white" />
          </Button>
        </div>
      </main>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white dark:bg-slate-950 shadow-xl p-6 overflow-y-auto transition-transform duration-300 ease-in-out transform translate-x-0">
            <div className="flex justify-between items-center mb-6">
              <span className={`${tourney.className} text-xl font-semibold bg-black dark:bg-white text-transparent bg-clip-text`}>
                CYCLESPACE
              </span>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-slate-900 dark:text-slate-100" />
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-slate-200 dark:border-slate-800 pb-2">
                  <Link
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className={`flex items-center justify-between px-3 py-2 rounded-sm transition-colors ${
                      isActive(item.href)
                        ? "text-primary dark:text-primary bg-slate-100 dark:bg-slate-900"
                        : "hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {item.label}
                      {item.soon && (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 h-4 rounded-full bg-blue-500/30 text-blue-500 dark:bg-blue-500/30 dark:text-blue-500 border-none"
                        >
                          soon
                        </Badge>
                      )}
                    </span>
                  </Link>
                  {/* Sub-links (optional) – uncomment if you want to show them on mobile */}
                  {/* <div className="ml-4 mt-1 flex flex-col space-y-1">
                    {item.sectionLinks.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={toggleMobileMenu}
                        className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-sm transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div> */}
                </div>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col space-y-4">
              <SearchDialog />
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Theme</span>
                <ThemeToggle />
              </div>
              <Button className="w-full text-xs rounded-lg bg-primary text-white hover:bg-black hover:text-white dark:hover:bg-slate-800 dark:hover:text-white transition-colors duration-200">
                Launch app
                <ExternalLinkIcon className="h-3 w-3 text-white ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}