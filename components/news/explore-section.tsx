
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Tourney } from "next/font/google";
import { Button } from "../ui/button";
import Image from "next/image";

const tourney = Tourney({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function ExploreSection() {
  return (
    <div>
      <div className="grid grid-cols-4 gap-2 px-1">
        
        <Card className="md:gap-6 gap-4 bg-linear-to-b from-primary via-primary to-slate-50">
            <CardHeader className="w-full justify-center flex mt-4 md:mt-6">
                <CardTitle className="w-fit">          
                    <Link href="/" className="flex items-center w-fit justify-start space-x-1 md:space-x-2">
                        <div className="p-0 rounded-lg transition-all duration-100 font-sans">

                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 256 256" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 md:h-8 md:w-8  fill-black stroke-black"
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
                        className={`${tourney.className} antialiased text-md md:text-2xl font-semibold bg-black dark:bg-white text-transparent bg-clip-text`}
                        >
                        CYCLESPACE
                        </span>
                    </Link>
                </CardTitle>
            </CardHeader>
            <CardDescription className="text-xl text-black font-semibold font-sans justify-center flex">Never miss a market move</CardDescription>
            <CardContent className="gap-2 flex flex-row justify-center">
                <Button>Subscribe</Button>
                <Button variant="outline">Explore</Button>
            </CardContent>
            <CardFooter className="mt-6 justify-center flex gap-4">
                <Image
                    src="/cards/swap.png"
                    alt="Cryptocurrency background"
                    height={2000}
                    width={2000}
                    quality={100}
                    className="object-cover relative rounded-sm md:rounded-xl shadow-2xl w-70 h-full hover:scale-110 transition-transform duration-300"
                    priority
                    referrerPolicy="no-referrer"
                />
                <div className="absolute space-y-3">
                    <div className="z-30 w-60 h-15 bg-black rounded-xl">

                    </div>
                    <div className="z-30 w-60 h-15 bg-black rounded-xl">

                    </div>
                </div>
            </CardFooter>
        </Card>
        <Card>
            <CardDescription>Explore</CardDescription>
        </Card>
        <Card>
            <CardDescription>Explore</CardDescription>
        </Card>
        <Card>
            <CardDescription>Explore</CardDescription>
        </Card>
      </div>
    </div>
  );
}