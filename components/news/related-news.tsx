
import { simpleNewsCard } from '@/lib/interface';
import { client, urlFor } from "@/sanity/lib/client";
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/date-utils';
import * as ScrollArea from '@radix-ui/react-scroll-area';


export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
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

  }`;

  const data = await client.fetch(query);

  return data;
}


export default async function TrendingNews() {
  const data: simpleNewsCard[] = await getData()
  console.log(data);

  return (
    <div className='flex flex-col h-full w-full bg-white dark:bg-zinc-950 '>
        <header className='flex flex-row gap-1 items-center justify-between px-2 mt-0 pt-0'>
          <h1 className='font-semibold text-lg p-4 flex flex-row gap-2'> 
            <span>Trending News</span>
          </h1>
        </header>
        <ScrollArea.Root className="h-[calc(100vh-225px)] w-full rounded-none" type="auto">
          <ScrollArea.Viewport className="w-full h-full">
          <div className='p-3 flex flex-col gap-2 mt-0 pt-0'>
          {data.map((post, idx) => (
            <Card key={idx} className='p-3 shadow-none dark:bg-zinc-950 bg-white gap-2  border-none'>
              <div className='relative'>
                <div className='absolute top-2 left-2 z-10'>
                  <Badge className='text-white dark:text-white font-medium bg-primary dark:bg-secondary border-none backdrop-blur-sm'>
                    {post.categoryName}
                  </Badge>
                </div>
                <div>
                  <Image
                    src={urlFor(post.titleImage).url()}
                    alt={post.title}
                    width={500}
                    height={280}
                    className="rounded-lg h-[200px] object-cover"
                  />   
                </div>
              </div>
              {/* Impact and Date display */}
              <div className="flex justify-between items-center w-full mt-2">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {formatDate(post.publishedAt, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                {/* Impact display */}
                <div className="flex flex-row items-center gap-1 h-fit ">
                  <h3 className="text-xs font-medium">Impact:</h3>
                  {post.impacts && post.impacts.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.impacts.map((impact, impactIdx) => (
                        <Badge 
                          key={impactIdx}
                          className={cn(
                            "text-xs",
                            impact.color === 'blue' && "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-950",
                            impact.color === 'green' && "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-950",
                            impact.color === 'red' && "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-950",
                            impact.color === 'yellow' && "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-950",
                            impact.color === 'purple' && "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-100 dark:border-purple-950",
                          )}
                        >
                          <Globe width={8} height={8} strokeWidth={3} className="w-8 h-8"/>
                          {impact.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
               <Link href={`/article/${post.currentSlug}`} className="group">
                  <h3 className="text-md tracking-tight text-start mt-1 text-black dark:text-white font-semibold line-clamp-2 hover:underline group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                </Link>
              
              {/* Description with breadcrumbs */}
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                {post.smallDescription}
              </p>
              <div className=" items-center gap-1 mt-2 text-xs hidden text-zinc-500">
                <span className="hover:text-blue-500 cursor-pointer">Home</span>
                <span>•</span>
                <span className="hover:text-blue-500 cursor-pointer">News</span>
                <span>•</span>
                <span className="text-orange-500 dark:text-orange-400 font-medium">{post.categoryName}</span>
              </div>
              
              {/* Tags display */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.map((tag, tagIdx) => (
                    <Badge 
                      key={tagIdx}
                      className={cn(
                        "text-xs",
                        tag.color === 'blue' && "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-950",
                        tag.color === 'green' && "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-950",
                        tag.color === 'red' && "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-950",
                        tag.color === 'yellow' && "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-950",
                        tag.color === 'purple' && "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-100 dark:border-purple-950",
                      )}
                    >
                      <Tag width={8} height={8} strokeWidth={3} className="mr-1"/>
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}

            </Card>
          ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar 
          className="w-1.5 p-0.5 bg-zinc-100 hidden dark:bg-zinc-900 transition-colors duration-150 ease-out hover:bg-zinc-200 dark:hover:bg-zinc-800" 
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-zinc-300 hidden dark:bg-zinc-600 rounded-full relative" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </div>
  )
}
