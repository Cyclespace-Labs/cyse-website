import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export const revalidate = 30;

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
        "author": author->{
          name,
          avatar
        }
      }
    `;

    const data = await client.fetch(query);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching recent news:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent news" },
      { status: 500 }
    );
  }
}
