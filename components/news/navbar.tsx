import Link from "next/link";
import { Tourney } from "next/font/google";
import { Button } from "../ui/button";
import { ExternalLinkIcon, ChevronDown } from "lucide-react";
import { ThemeToggle } from "../themeToggle";
import SearchDialog from "./search-dialog";


const tourney = Tourney({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Navbar() {
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
                            <Link href="/news" className="flex items-center gap-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 px-3 py-2 rounded-sm">
                                News
                                <ChevronDown className="h-3 w-3 opacity-60 transition-transform group-hover:rotate-180" />
                            </Link>
                            <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50">
                                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg py-1 min-w-[160px]">
                                    <Link href="/news/markets" className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">Markets</Link>
                                    <Link href="/news/finance" className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">Finance</Link>
                                    <Link href="/news/tech" className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">Tech</Link>
                                    <Link href="/news/policy" className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">Policy</Link>
                                </div>
                            </div>
                        </div>
                        <Link href="/research" className="hover:bg-zinc-200 dark:hover:bg-zinc-800 px-3 py-2 rounded-sm">Research</Link>
                        <Link href="/analysis" className="hover:bg-zinc-200 dark:hover:bg-zinc-800 px-3 py-2 rounded-sm">Analysis</Link>
                        <Link href="/events" className="hover:bg-zinc-200 dark:hover:bg-zinc-800 px-3 py-2 rounded-sm">Events</Link>
                        <Link href="/opinion" className="hover:bg-zinc-200 dark:hover:bg-zinc-800 px-3 py-2 rounded-sm">Opinion</Link>
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