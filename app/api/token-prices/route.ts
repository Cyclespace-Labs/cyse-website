import { NextResponse } from "next/server";

// Pyth Network Hermes feed IDs for the 5 tokens
const PYTH_FEED_IDS = {
  BTC: "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  ETH: "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  BNB: "2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f",
  TRX: "67aed5a24fdad045475e7195c98a98aea119c763f272d4523f5bac93a4f33c2b",
  XRP: "ec5d399846a9209f3fe5881d70aae9268c94339ff9817e8d18ff19fa05eea1c8",
};

const HERMES_URL = "https://hermes.pyth.network/v2/updates/price/latest";

export const revalidate = 10; // Revalidate every 10 seconds

export async function GET() {
  try {
    const feedIds = Object.values(PYTH_FEED_IDS);
    const response = await fetch(`${HERMES_URL}?ids[]=${feedIds.join("&ids[]=")}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Hermes API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Parse the prices
    const prices = feedIds.map((feedId) => {
      const parsed = data.parsed?.find((p: any) => p.id === feedId || p.id === `0x${feedId}`);
      if (!parsed) return null;

      const price = Number(parsed.price.price) * Math.pow(10, parsed.price.expo);
      const confidence = Number(parsed.price.conf) * Math.pow(10, parsed.price.expo);

      // Find which token this feed ID belongs to
      const token = Object.keys(PYTH_FEED_IDS).find(
        (key) => PYTH_FEED_IDS[key as keyof typeof PYTH_FEED_IDS] === feedId
      );

      return {
        symbol: token,
        price,
        change: 0, // Pyth doesn't provide 24h change in this endpoint
        confidence,
        publishTime: parsed.price.publish_time,
      };
    }).filter(Boolean);

    return NextResponse.json({ prices });
  } catch (error) {
    console.error("Error fetching Pyth prices:", error);
    return NextResponse.json(
      { error: "Failed to fetch prices", prices: [] },
      { status: 500 }
    );
  }
}
