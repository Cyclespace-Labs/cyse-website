import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export const revalidate = 30; // revalidate at most 30 seconds

export async function GET() {
  try {
    const query = `
      *[_type == 'news'] | order(publishedAt desc) {
        title,
        smallDescription,
        "currentSlug": slug.current,
        titleImage,
        publishedAt,
        "categoryName": category->name,
        category,
        "tags": tags[]->{
          name,
          color
        },
        "impacts": impacts[]->{
          name,
          color
        },
        "author": author->{
          name,
          avatar,
          role
        }
      }
    `;

    const data = await client.fetch(query);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news articles" },
      { status: 500 }
    );
  }
}
