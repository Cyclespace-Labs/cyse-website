'use client';

import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsletterItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const newsletters: NewsletterItem[] = [
  {
    id: '1',
    name: 'Daily Briefing',
    description: 'The biggest crypto news and ideas of the day.',
    icon: '📰',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  },
  {
    id: '2',
    name: 'Markets Daily',
    description: 'Price analysis and market moving news.',
    icon: '📊',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  },
  {
    id: '3',
    name: 'Protocol Village',
    description: 'Deep dives into DeFi protocols and tech.',
    icon: '⚡',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  },
];

export default function Newsletters() {
  return (
    <div className='flex flex-col h-full w-full bg-white dark:bg-zinc-950'>
      {/* Header */}
      <header className='flex flex-row gap-1 items-center justify-between px-3 py-3 border-b border-zinc-200 dark:border-zinc-800'>
        <h1 className='font-semibold text-sm flex flex-row gap-2 items-center'> 
          <Mail className="w-4 h-4 text-zinc-500" />
          <span>Newsletters</span>
        </h1>
        <a href="#" className='text-xs text-zinc-500 hover:text-primary dark:hover:text-secondary transition-colors flex items-center gap-1'>
          See all <ArrowRight className="w-3 h-3" />
        </a>
      </header>

      {/* Newsletter List */}
      <div className="flex flex-col p-3 gap-2">
        {newsletters.map((item) => (
          <div
            key={item.id}
            className='group flex items-start gap-3 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer'
          >
            {/* Icon */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg ${item.color}`}>
              {item.icon}
            </div>
            
            <div className='flex-1 min-w-0'>
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {item.name}
              </h4>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Subscribe CTA */}
      <div className="px-3 pb-3">
        <Button 
          variant="outline" 
          size="sm" 
          className='w-full text-xs h-8 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600'
        >
          <Sparkles className="w-3 h-3 mr-1.5" />
          Subscribe to All
        </Button>
      </div>
    </div>
  );
}
