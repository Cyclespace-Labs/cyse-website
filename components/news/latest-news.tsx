import { simpleNewsCard } from '@/lib/interface';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, Minus, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from "@/lib/date-utils";
import { getArticleUrl } from "@/lib/article-url";
import * as ScrollArea from '@radix-ui/react-scroll-area';

// Helper to get sentiment icon and color
function getSentimentProps(impacts?: { color: string; name: string }[]) {
  if (!impacts || impacts.length === 0) {
    return { icon: Minus, colorClass: 'text-zinc-500', bgClass: 'bg-zinc-100 dark:bg-zinc-800', label: 'Neutral' };
  }
  
  const impact = impacts[0];
  switch (impact.color) {
    case 'green':
      return { icon: ArrowUpRight, colorClass: 'text-green-600', bgClass: 'bg-green-100 dark:bg-green-900/30', label: 'Positive' };
    case 'red':
      return { icon: ArrowDownRight, colorClass: 'text-red-600', bgClass: 'bg-red-100 dark:bg-red-900/30', label: 'Negative' };
    default:
      return { icon: Minus, colorClass: 'text-zinc-500', bgClass: 'bg-zinc-100 dark:bg-zinc-800', label: 'Neutral' };
  }
}

function getRelativeTime(date: string): string {
  const now = new Date();
  const published = new Date(date);
  const diff = now.getTime() - published.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return formatDate(date, { month: 'short', day: 'numeric' });
}

async function getData(): Promise<simpleNewsCard[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/news/trending`, {
    next: { revalidate: 30 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch trending news');
  }

  return res.json();
}


export default async function LatestNews() {
  const data: simpleNewsCard[] = await getData()
  console.log(data);

  return (
    <div className='flex flex-col w-full bg-white dark:bg-zinc-950 font-sans h-[612px]'>
        <header className='flex flex-row gap-1 items-center justify-between px-3 py-3 border-b border-zinc-200 dark:border-zinc-800'>
          <h1 className='font-semibold text-sm flex flex-row gap-2 items-center'>
            <div className='p-2 rounded-md bg-black'>
              <Clock strokeWidth={2.5} className="w-4 h-4 text-white" />
            </div> 
            <span>Latest Crypto News</span>
          </h1>
          <Link href="/news" className='text-xs text-zinc-500 hover:text-primary dark:hover:text-secondary transition-colors'>
            View all →
          </Link>
        </header>
        <ScrollArea.Root className="w-full rounded-none" type="auto">
          <ScrollArea.Viewport className="w-full max-h-[564px]">
          <div className='flex flex-col'>
          {data.slice(0, 20).map((post, idx) => {
            const sentiment = getSentimentProps(post.impacts);
            const Icon = sentiment.icon;
            
            return (
              <Link 
                key={idx} 
                href={getArticleUrl(post)}
                className='group px-3 py-3 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors'
              >
                <div className='flex items-start gap-2'>
                  {/* Sentiment indicator */}
                  <div className={cn(
                    "flex-shrink-0 w-6 h-6 rounded flex items-center justify-center",
                    sentiment.bgClass
                  )}>
                    <Icon className={cn("w-3.5 h-3.5", sentiment.colorClass)} />
                  </div>
                  
                  <div className='flex-1 min-w-0'>
                    {/* Meta row */}
                    <div className='flex items-center gap-2 text-[10px] text-zinc-500 dark:text-zinc-400 mb-1'>
                      <span>{getRelativeTime(post.publishedAt)}</span>
                      <span>•</span>
                      <Badge variant="secondary" className='text-[10px] px-1 py-0 h-4 font-normal'>
                        {post.categoryName}
                      </Badge>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    {/* Description - same length as title */}
                    <p className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                      {post.smallDescription}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar 
          className="w-2 p-0.5 bg-zinc-100 dark:bg-zinc-900 transition-colors duration-150 ease-out hover:bg-zinc-200 dark:hover:bg-zinc-800" 
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-zinc-400 dark:bg-zinc-600 rounded-full relative" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </div>
  )
}
