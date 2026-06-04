import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export const revalidate = 30; // revalidate at most 30 seconds

export async function GET() {
  try {
    const query = `
      *[_type == 'research'] | order(publishedAt desc) [0...6] {
        _id,
        title,
        "currentSlug": slug.current,
        titleImage,
        reportType,
        publishedAt,
        "authorName": author->name,
        "authorType": author->_type
      }
    `;

    const data = await client.fetch(query);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching research:", error);
    return NextResponse.json(
      { error: "Failed to fetch research articles" },
      { status: 500 }
    );
  }
}
