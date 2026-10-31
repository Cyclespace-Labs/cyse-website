// app/api/predictions/route.ts
import { NextResponse } from 'next/server';

// FIX: Cache the final route output (tiny size) instead of the giant raw fetch response
export const revalidate = 60; 

export async function GET() {
  try {
    // Fetch directly from Polymarket's Gamma API
    const res = await fetch(
      'https://gamma-api.polymarket.com/events?active=true&closed=false&order=volume24hr&ascending=false&limit=16',
      {
        // FIX: Bypass fetch-level caching to avoid storing the 4.7MB raw response
        cache: 'no-store', 
      }
    );

    if (!res.ok) {
      return NextResponse.json( 
        { error: `Polymarket API responded with status ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    const mappedData = data.map((event: any) => {
      const primaryMarket = event.markets?.[0];
      let options: { name: string; probability: number }[] = [];

      if (primaryMarket) {
        let outcomesArray: string[] = [];
        let pricesArray: string[] = [];
        
        try {
          outcomesArray = typeof primaryMarket.outcomes === 'string' 
            ? JSON.parse(primaryMarket.outcomes) 
            : primaryMarket.outcomes || [];
          pricesArray = typeof primaryMarket.outcomePrices === 'string' 
            ? JSON.parse(primaryMarket.outcomePrices) 
            : primaryMarket.outcomePrices || [];
        } catch (e) {
          console.error(`Error parsing outcomes/prices for event ${event.id}:`, e);
        }

        options = outcomesArray.map((name: string, index: number) => ({
          name,
          probability: Math.round(parseFloat(pricesArray[index] || '0') * 100),
        })).slice(0, 2); // Limit to top 2 options for UI consistency
      }

      // Format volume string beautifully
      const rawVolume = parseFloat(event.volume || '0');
      let volumeStr = `$${rawVolume.toFixed(0)} Vol.`;
      if (rawVolume >= 1_000_000) {
        volumeStr = `$${(rawVolume / 1_000_000).toFixed(1)}M Vol.`;
      } else if (rawVolume >= 1_000) {
        volumeStr = `$${(rawVolume / 1_000).toFixed(1)}K Vol.`;
      }

      return {
        id: event.id,
        // Safe category extraction from tags array
        category: event.tags?.[0]?.name || 'General',
        title: event.title,
        options,
        volume: volumeStr,
        isLive: event.active,
        image: event.image || event.icon,
      };
    });

    return NextResponse.json(mappedData);
  } catch (error) {
    console.error('Prediction Markets route error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}