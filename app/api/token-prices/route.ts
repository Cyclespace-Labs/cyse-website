import { NextResponse } from "next/server";
import axios from "axios";
import { PYTH_FEED_IDS, HERMES_URL } from "@/lib/token-constants";

export const revalidate = 10; // Revalidate every 10 seconds

export async function GET() {
  try {
    const feedIds = Object.values(PYTH_FEED_IDS);
    const response = await axios.get(`${HERMES_URL}?ids[]=${feedIds.join("&ids[]=")}`);

    const data = response.data;
    
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
