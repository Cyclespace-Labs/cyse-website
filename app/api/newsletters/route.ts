import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export const revalidate = 30; // revalidate at most 30 seconds

export async function GET() {
  try {
    const query = `
      *[_type == 'newsletter'] | order(publishedAt desc) [0...6] {
        _id,
        title,
        description,
        "currentSlug": slug.current,
        publishedAt,
        issueNumber,
        frequency
      }
    `;

    const data = await client.fetch(query);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletters" },
      { status: 500 }
    );
  }
}
