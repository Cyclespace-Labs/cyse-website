import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export const revalidate = 30; // revalidate at most 30 seconds

export async function GET() {
  try {
    const query = `
      *[_type == 'news' && category->name == "Press Releases"] | order(publishedAt desc) {
        title,
        "currentSlug": slug.current,
        publishedAt,
        category,
        "categoryName": category->name,
        "company": author->name
      }
    `;

    const data = await client.fetch(query);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching press releases:", error);
    return NextResponse.json(
      { error: "Failed to fetch press releases" },
      { status: 500 }
    );
  }
}
