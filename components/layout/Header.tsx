'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, MenuIcon, Tag, ArrowUpDownIcon, Bot, Newspaper, ClipboardCheck, LucideNewspaper } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {Tourney } from 'next/font/google'
import { Menu, MenuItem, ProductItem } from '../ui/navbar-menu'


const tourney = Tourney({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [primaryColor, setPrimaryColor] = useState('#0e76fd');
  const [secondaryColor, setSecondaryColor] = useState('#0e76fdD');
  const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
      const getCSSVariable = (variableName: string) => {
        if (typeof window !== 'undefined') {
          const root = document.documentElement;
          const computedStyle = getComputedStyle(root);
          return computedStyle.getPropertyValue(variableName).trim();
        }
        return '';
      };
  
      const updateColors = () => {
        const primary = getCSSVariable('--primary');
        const secondary = getCSSVariable('--secondary');
        
        // Use CSS variables if available, otherwise fallback to defaults
        setPrimaryColor(primary || '#0E76FD');
        setSecondaryColor(secondary || '#0E76FD');
      };
  
      updateColors();
      
      // Update colors when theme changes (dark/light mode)
      const observer = new MutationObserver(updateColors);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme']
      });
  
      return () => observer.disconnect();
    }, []);

  return (
    <header className="sticky top-10 z-50 bg-transparent mx-auto inset-x-0 dark:bg-transparent rounded-4xl">
      <div className="max-w-fit mx-auto px-4 sm:px-6 lg:px-8">
        <Menu setActive={setActive}>
        <div className="flex items-center justify-between gap-30 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center space-x-2">
            <div className="p-0  rounded-lg">
        
              <svg width="30" height="30" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:hidden">
                <path d="M105 76H38.8466C38.8466 76 33.5426 87.8169 32.5112 92.1876C27.8222 112.059 26.8737 128.971 29.2698 149.33C31.4799 168.107 38.6993 183 38.6993 183H101.759C101.759 183 89.4948 164.979 86.2884 155.157C81.4264 140.265 81.6222 128.124 84.3731 111.613C87.4302 93.2635 105 76 105 76Z" fill={primaryColor}/>
                <path d="M125.807 21.3854C108.841 22.5059 89 33.4938 89 33.4938C89 33.4938 110.862 35.6524 122.776 41.1486C135.785 47.1503 144.604 53.1327 152.654 64.6696C159.034 73.8123 160.737 90 160.737 90H228C228 90 225.957 79.1846 219.484 68.2883C212.123 53.3962 197.111 40.3233 183.254 32.5196C164.979 22.2275 147.371 19.9612 125.807 21.3854Z" fill={primaryColor} stroke={primaryColor}/>
                <path d="M125.807 235.615C108.841 234.494 89 223.506 89 223.506C89 223.506 110.862 221.348 122.776 215.851C135.785 209.85 144.604 203.867 152.654 192.33C159.034 183.188 160.737 167 160.737 167H228C228 167 225.957 177.815 219.484 188.712C212.123 203.604 197.111 216.677 183.254 224.48C164.979 234.773 147.371 237.039 125.807 235.615Z" fill={primaryColor} stroke={primaryColor}/>
              </svg>

              <svg width="30" height="30" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden dark:block">
                <path d="M105 76H38.8466C38.8466 76 33.5426 87.8169 32.5112 92.1876C27.8222 112.059 26.8737 128.971 29.2698 149.33C31.4799 168.107 38.6993 183 38.6993 183H101.759C101.759 183 89.4948 164.979 86.2884 155.157C81.4264 140.265 81.6222 128.124 84.3731 111.613C87.4302 93.2635 105 76 105 76Z" fill={secondaryColor}/>
                <path d="M125.807 21.3854C108.841 22.5059 89 33.4938 89 33.4938C89 33.4938 110.862 35.6524 122.776 41.1486C135.785 47.1503 144.604 53.1327 152.654 64.6696C159.034 73.8123 160.737 90 160.737 90H228C228 90 225.957 79.1846 219.484 68.2883C212.123 53.3962 197.111 40.3233 183.254 32.5196C164.979 22.2275 147.371 19.9612 125.807 21.3854Z" fill={secondaryColor} stroke={secondaryColor}/>
                <path d="M125.807 235.615C108.841 234.494 89 223.506 89 223.506C89 223.506 110.862 221.348 122.776 215.851C135.785 209.85 144.604 203.867 152.654 192.33C159.034 183.188 160.737 167 160.737 167H228C228 167 225.957 177.815 219.484 188.712C212.123 203.604 197.111 216.677 183.254 224.48C164.979 234.773 147.371 237.039 125.807 235.615Z" fill={secondaryColor} stroke={secondaryColor}/>
              </svg>

            </div>
            <span className={`${tourney.className} antialiased text-lg sm:text-xl md:text-2xl font-semibold bg-black dark:bg-white text-transparent bg-clip-text`}>CYCLESPACE</span>
            <span className="dark:text-secondary hidden text-primary font-mono">DEX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center text-sm space-x-4 w-full">
            <MenuItem setActive={setActive} active={active} item="Services">
              <div className='gap-4 flex flex-col'>
                <Link href="/swap-exchange" className="text-sm flex flex-row gap-2 items-center dark:text-zinc-200 text-zinc-700 hover:text-primary dark:hover:text-secondary transition-colors">
                  <ArrowUpDownIcon className='h-4 w-4  text-primary dark:text-secondary'/>
                  <span className="text-sm">Spot Trading</span>
                </Link>
                <Link href="/trading" className="text-sm flex flex-row gap-2 items-center dark:text-zinc-200 text-zinc-700 hover:text-primary dark:hover:text-secondary transition-colors">
                  <Bot className='h-4 w-4  text-primary dark:text-secondary'/>
                  <span className="text-sm">Automated Trading Agents</span>
                </Link>
                <Link href="/Dashboard" className="text-sm flex flex-row gap-2 items-center dark:text-zinc-200 text-zinc-700 hover:text-primary dark:hover:text-secondary transition-colors">
                  <Newspaper className='h-4 w-4  text-primary dark:text-secondary'/>
                  <span className="text-sm">Research Terminal</span>
                </Link>
                <Link href="/Edge" className="text-sm flex flex-row gap-2 items-center dark:text-zinc-200 text-zinc-700 hover:text-primary dark:hover:text-secondary transition-colors">
                  <ClipboardCheck className='h-4 w-4  text-primary dark:text-secondary'/>
                  <span className="text-sm">Smart AI signals</span>
                </Link>
                <Link href="/News" className="text-sm flex flex-row gap-2 items-center dark:text-zinc-200 text-zinc-700 hover:text-primary dark:hover:text-secondary transition-colors">
                  <LucideNewspaper className='h-4 w-4  text-primary dark:text-secondary'/>
                  <span className="text-sm">News Platform</span>
                </Link>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Product">
              <div className="  text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                title="Trading Dashboard"
                href="/Dashboard"
                src="/assets/light_dashboard.png"
                description="Trade and Swap over 1000+ tokens on Ethereum."
              />
              <ProductItem
                title="AI Analysis Agent"
                href="/Edge"
                src="/assets/light_dashboard.png"
                description="Smart AI Analysis Agent for market context and signals"
              />
              <ProductItem
                title="Smart AI Signals"
                href="/Edge"
                src="/assets/light_dashboard.png"
                description="Smart AI Signals with high accuracy"
              />
              <ProductItem
                title="Market Sentiment"
                href="/News"
                src="/assets/light_dashboard.png"
                description="Daily market news and analysis"
              />
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Pricing">
              <Link href="/pricing" className="flex flex-row gap-2 items-center dark:text-zinc-200 text-zinc-700 hover:text-primary dark:hover:text-secondary transition-colors">
                <Tag className='h-4 w-4  text-primary dark:text-zsecondary'/>
                <span className="text-sm">Pricing</span>
              </Link>
            </MenuItem>
          </div>

          {/* CTA Button */}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        </Menu>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t mt-2 mx-1 bg-white dark:bg-black  py-4"
            >
              <div className="space-y-4 p-2">
                <Link
                  href="/Dashboard"
                  className="block text-zinc-200 hover:text-white transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/news"
                  className="block text-zinc-200 hover:text-white transition-colors"
                >
                  News Dashboard
                </Link>
                <Link
                  href="/Edge"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  AI Trading Signals
                </Link>
                <Link
                  href="/pricing"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}