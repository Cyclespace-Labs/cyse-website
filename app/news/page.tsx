import Header from "@/components/layout/Header";
import NewsSection from "@/components/news/news-section";
import RelatedNews from "@/components/news/related-news";
import ResearchDisplay from "@/components/news/research-display";
import { simpleNewsCard } from "@/lib/interface";
import { client } from "@/sanity/lib/client";
import React from "react";



export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
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
      },
      
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function News() {
  const data: simpleNewsCard[] = await getData();

  console.log(data);

  return (
      <div className="w-full h-fit dark:bg-black bg-zinc-100 flex flex-col">
      {/* Ticker */}
      <div className="w-full h-fit flex justify-center items-center py-1 px-1 md:py-1 ">
        <div className="border border-px dark:border-zinc-700 border-zinc-200 w-full">
          <Header />
        </div>
      </div>

      <div className="flex-col-reverse flex md:flex-row lg:flex-row justify-center mt-1 lg:mt-0 pb-1 gap-0 w-full px-1">

        {/*Left-Section*/}
        <div className="lg:w-[500px] w-full lg:block md:hidden sm:hidden hidden flex-col h-full border border-px dark:border-zinc-700 border-zinc-200">
          <RelatedNews/>
        </div>

        {/*middle-Section*/}
        <div className="w-full h-full flex flex-col lg:px-1 md:px-1 sm:px-1 px- gap-1 ">
          <NewsSection data={data} />
        </div>

        {/*Right-Section*/}
        <div className="lg:w-[500px] lg:block md:hidden sm:hidden hidden  w-full gap-3 flex-col h-full border border-px dark:border-zinc-700 border-zinc-200 ">
          <div className='hidden'>
            <ResearchDisplay/>
          </div>
          <div className="lg:block md:hidden hidden">

          </div>
        </div>

      </div>
    </div>
  );
}