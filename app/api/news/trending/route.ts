import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export const revalidate = 30; // revalidate at most 30 seconds

export async function GET() {
  try {
    const query = `
      *[_type == 'news' && category->name == "Trending"] | order(_createdAt desc) {
        title,
        smallDescription,
        "currentSlug": slug.current,
        titleImage,
        "categoryName": category->name,
        category,
        publishedAt,
        tags[]->{
          name,
          color
        },
        impacts[]->{
          name,
          color
        }
      }
    `;

    const data = await client.fetch(query);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching trending news:", error);
    return NextResponse.json(
      { error: "Failed to fetch trending news" },
      { status: 500 }
    );
  }
}
