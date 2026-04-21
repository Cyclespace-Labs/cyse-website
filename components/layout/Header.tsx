"use client";

import { useState } from "react";
import Link from "next/link";
import {
  X,
  MenuIcon,
  ArrowUpDownIcon,
  Bot,
  Newspaper,
  ClipboardCheck,
  LucideNewspaper,
  Link2Off,
  ExternalLinkIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tourney } from "next/font/google";
import { Menu, MenuItem } from "../ui/navbar-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge"; 
import { ThemeToggle } from "../themeToggle";


const tourney = Tourney({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Reusable animated link with underline
const AnimatedNavLink = ({
  href,
  children,
  soon = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  soon?: boolean;
  className?: string;
}) => {
  return (
    <motion.div
      className="relative group text-sm"
      initial={false}
      whileHover="hover"
    >
      <Link href={href} className={`${className}`}>
        <span className="inline-flex items-center hover:text-primary gap-1.5">
          {children}
          {soon && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-4 relative bottom-2 right-1 rounded-full bg-blue-500/30 text-blue-500 dark:bg-blue-500/30 dark:text-blue-500 border-none"
            >
              soon
            </Badge>
          )}
        </span>
      </Link>
      <motion.span
        className="absolute -bottom-1 left-0 h-[2px] bg-primary dark:bg-secondary rounded-full"
        variants={{
          hover: { width: "100%" },
          rest: { width: "0%" }
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

// Animated dropdown item (color + scale)
const DropdownItem = ({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="text-xs flex flex-row gap-2 items-center dark:text-zinc-200 text-zinc-700 hover:text-primary dark:hover:text-secondary transition-colors duration-200 group"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>
      <motion.span
        whileHover={{ x: 3 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </Link>
  );
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  return (
    <header className="sticky z-50 bg-transparent w-full inset-x-0 inset-y-7 dark:bg-transparent font-sans rounded-4xl">
      <div className="w-full mx-auto px-3 sm:px-3 md:px-3 lg:max-w-fit lg:mx-auto lg:px-8">
        <Menu setActive={setActive}>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 items-center h-16 w-full gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center justify-start space-x-1 md:space-x-2">
              <div className="p-0 rounded-lg transition-all duration-100 font-sans">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                  className="dark:hidden h-5 w-5 md:h-7 md:w-7 fill-blue-500 stroke-blue-500"
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
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                  className="hidden dark:block fill-blue-500 stroke-blue-500"
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
                className={`${tourney.className} antialiased text-md sm:text-md md:text-2xl font-semibold bg-black dark:bg-white text-transparent bg-clip-text`}
              >
                CYCLESPACE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:hidden lg:flex justify-center gap-6">
              
              <AnimatedNavLink href="/spot">Spot</AnimatedNavLink>
              <AnimatedNavLink href="/futures" soon>Futures</AnimatedNavLink>
              <AnimatedNavLink href="/predictions" soon>Predictions</AnimatedNavLink>
              <AnimatedNavLink href="/vault">Vault</AnimatedNavLink>

              <MenuItem setActive={setActive} active={active} item="More">
                <div className="gap-4 flex flex-col p-2">
                  <DropdownItem href="/news" icon={<LucideNewspaper className="h-4 w-4 text-primary dark:text-primary" />}>
                    News
                  </DropdownItem>
                  <DropdownItem href="/swap-exchange" icon={<ArrowUpDownIcon className="h-4 w-4 text-primary dark:text-primary" />}>
                    Swap
                  </DropdownItem>
                  <DropdownItem href="/trading" icon={<Bot className="h-4 w-4 text-primary dark:text-primary" />}>
                    Stake
                  </DropdownItem>
                  <DropdownItem href="/Dashboard" icon={<Newspaper className="h-4 w-4 text-primary dark:text-primary" />}>
                    Docs
                  </DropdownItem>
                  <DropdownItem href="/Edge" icon={<ClipboardCheck className="h-4 w-4 text-primary dark:text-primary" />}>
                    Whitepaper
                  </DropdownItem>
                </div>
              </MenuItem>
            </div>

            {/* Right side: CTA button + mobile menu button */}
            <div className="flex items-center justify-end gap-4 md:justify-end lg:justify-end">
              <Button className="hidden md:hidden lg:flex text-xs rounded-lg bg-primary text-white hover:bg-black hover:text-white 
                dark:hover:bg-slate-800 dark:hover:text-white transition-colors duration-200">
                Launch app
                <ExternalLinkIcon className="h-3 w-3 text-white" />
              </Button>
              <div className="hidden w-fit h-fit md:hidden lg:flex">
                <ThemeToggle/>
              </div>


              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:flex lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </Menu>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:flex lg:hidden absolute border-t mt-2 px-3 left-0 right-0 bg-transparent border-none"
              >
                <div className="flex flex-col p-8 w-full space-y-4 bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden drop-shadow-2xl">
                  {/* Main links */}
                  <div className="space-y-3 flex flex-col w-full">
                    <Link
                      href="/spot"
                      className="block text-base w-full font-medium dark:text-zinc-200 text-zinc-800 hover:text-primary dark:hover:text-secondary transition-colors"
                    >
                      Spot
                    </Link>
                    <Link
                      href="/futures"
                      className="block text-base font-medium dark:text-zinc-200 text-zinc-800 hover:text-primary dark:hover:text-secondary transition-colors inline-flex items-center gap-1.5"
                    >
                      Futures
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 h-4 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary border-none"
                      >
                        soon
                      </Badge>
                    </Link>
                    <Link
                      href="/predictions"
                      className="block text-base font-medium dark:text-zinc-200 text-zinc-800 hover:text-primary dark:hover:text-primary transition-colors inline-flex items-center gap-1.5"
                    >
                      Predictions
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 h-4 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary border-none"
                      >
                        soon
                      </Badge>
                    </Link>
                    <Link
                      href="/vault"
                      className="block text-base font-medium dark:text-zinc-200 text-zinc-800 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      Vault
                    </Link>
                  </div>

                  {/* More links (same as desktop dropdown) */}
                  <div className="space-y-3 w-full">
                    <Link
                      href="/News"
                      className="flex items-center gap-2 text-sm dark:text-zinc-300 text-zinc-700 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      <LucideNewspaper className="h-4 w-4 text-primary dark:text-primary" />
                      Markets
                    </Link>
                    <Link
                      href="/swap-exchange"
                      className="flex items-center gap-2 text-sm dark:text-zinc-300 text-zinc-700 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      <ArrowUpDownIcon className="h-4 w-4 text-primary dark:text-primary" />
                      Swap
                    </Link>
                    <Link
                      href="/trading"
                      className="flex items-center gap-2 text-sm dark:text-zinc-300 text-zinc-700 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      <Bot className="h-4 w-4 text-primary dark:text-primary" />
                      Stake
                    </Link>
                    <Link
                      href="/Dashboard"
                      className="flex items-center gap-2 text-sm dark:text-zinc-300 text-zinc-700 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      <Newspaper className="h-4 w-4 text-primary dark:text-primary" />
                      Docs
                    </Link>
                    <Link
                      href="/Edge"
                      className="flex items-center gap-2 text-sm dark:text-zinc-300 text-zinc-700 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      <ClipboardCheck className="h-4 w-4 text-primary dark:text-primary" />
                      Whitepaper
                    </Link>
                  </div>

                  {/* CTA button at the bottom */}
                  <div className="flex flex-row items-center gap-3">
                    <div>
                      <ThemeToggle/>
                    </div>
                    <Button className="w-fit bg-primary text-white hover:bg-primary/80 transition-colors rounded-lg">
                      Launch app
                      <ExternalLinkIcon className="h-3 w-3 text-white" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </header>
  );
}