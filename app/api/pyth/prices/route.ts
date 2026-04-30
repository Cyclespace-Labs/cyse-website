import { NextResponse } from "next/server";

const HERMES_URL = "https://hermes.pyth.network/v2/updates/price/latest";

const TOKEN_FEEDS: Record<string, { id: string; symbol: string; name: string }> = {
  BTC: {
    id: "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
    symbol: "BTC",
    name: "Bitcoin",
  },
  ETH: {
    id: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    symbol: "ETH",
    name: "Ethereum",
  },
  BNB: {
    id: "0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f",
    symbol: "BNB",
    name: "BNB",
  },
  XRP: {
    id: "0xec5d399846a9209f3fe5881d70aae9268c94339ff9817e8d18ff19fa05eea1c8",
    symbol: "XRP",
    name: "XRP",
  },
  TRON: {
    id: "0x67aed5a24fdad045475e7195c98a98aea119c763f272d4523f5bac93a4f33c2b",
    symbol: "TRX",
    name: "TRON",
  },
};

interface PythPriceFeed {
  id: string;
  price: {
    price: string;
    conf: string;
    expo: number;
    publish_time: number;
  };
}

function parsePrice(priceRaw: string, expo: number): number {
  return Number(priceRaw) * Math.pow(10, expo);
}

export async function GET() {
  const ids = Object.values(TOKEN_FEEDS).map((t) => t.id);
  const query = ids.map((id) => `ids[]=${encodeURIComponent(id)}`).join("&");
  const url = `${HERMES_URL}?${query}`;

  try {
    const res = await fetch(url, { next: { revalidate: 5 } });
    if (!res.ok) {
      return NextResponse.json({ error: "Hermes error" }, { status: 502 });
    }

    const data = (await res.json()) as { parsed: PythPriceFeed[] };
    const parsed = data.parsed ?? [];

    const prices = parsed.map((feed) => {
      const token = Object.values(TOKEN_FEEDS).find((t) => t.id.toLowerCase() === feed.id.toLowerCase());
      const price = parsePrice(feed.price.price, feed.price.expo);
      return {
        symbol: token?.symbol ?? feed.id.slice(0, 8),
        name: token?.name ?? "Unknown",
        price,
        confidence: parsePrice(feed.price.conf, feed.price.expo),
        publishTime: feed.price.publish_time,
        feedId: feed.id,
      };
    });

    return NextResponse.json({ prices, ts: Date.now() });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to fetch";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
