import { simpleResearchCard } from '@/lib/interface';
import { urlFor } from "@/sanity/lib/client";
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';


export const revalidate = 30; // revalidate at most 30 seconds

async function getData(): Promise<simpleResearchCard[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/research`, {
    next: { revalidate: 30 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch research data');
  }

  return res.json();
}


export default async function ResearchDisplay() {
  const data: simpleResearchCard[] = await getData()
  console.log(data);

  return (
    <div className='flex flex-col h-full bg-white dark:bg-zinc-950 '>
        <div className='flex flex-row gap-1 items-center justify-between px-2'>
          <h1 className='font-semibold text-zinc-zinc-800 dark:text-white text-lg p-4'> 
            Research Analysis
          </h1>
          <span className='text-zinc-500 dark:text-zinc-100 hover:text-primary dark:hover:text-secondary text-sm px-2 hover:underline'>See All</span>
        </div>
        <div className='p-3 flex flex-col gap-2 mt-5  pt-0 h-full'>
          {data.map((post, idx) => (
            <Card key={idx} className='p-3 shadow-none bg-white items-center dark:bg-zinc-950 border-none flex flex-row h-fit mt-0 mb-0 pb-0 pt-0'>
              <Image
                src={urlFor(post.titleImage).url()}
                alt="image"
                width={100}
                height={100}
                className="rounded-lg hidden object-cover"
              />
              <div className='flex flex-row h-fit'>
                <h3 className="text-sm w-full flex flex-row h-fit hover:underline text-start mt-0 mb-3 text-black hover:text-primary dark:hover:text-secondary dark:text-white font-semibold">
                  <Link href={`/analysis/${post.currentSlug}`}>{post.title}</Link>
                </h3>
              </div>
            </Card>
          ))}
        </div>

    </div>
  )
}
