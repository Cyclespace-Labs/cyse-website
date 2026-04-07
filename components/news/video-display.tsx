'use client';

import { useState } from 'react';
import { Play, Clock, Eye, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VideoItem {
  id: string;
  title: string;
  duration: string;
  views: string;
  thumbnail: string;
  category: string;
  isLive?: boolean;
}

const mockVideos: VideoItem[] = [
  {
    id: '1',
    title: 'Bitcoin ETF Approval: What It Means for Crypto Markets',
    duration: '12:34',
    views: '24.5K',
    thumbnail: '',
    category: 'Analysis',
    isLive: false,
  },
  {
    id: '2',
    title: 'Ethereum 2.0 Staking Guide - Complete Tutorial 2024',
    duration: '28:15',
    views: '18.2K',
    thumbnail: '',
    category: 'Tutorial',
    isLive: false,
  },
  {
    id: '3',
    title: 'Live: Crypto Market Analysis & Price Predictions',
    duration: 'LIVE',
    views: '5.1K',
    thumbnail: '',
    category: 'Live',
    isLive: true,
  },
];

export default function VideoDisplay() {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(mockVideos[0]);

  return (
    <div className='flex flex-col h-full w-full bg-white dark:bg-zinc-950'>
      {/* Header */}
      <header className='flex flex-row gap-1 items-center justify-between px-3 py-3 border-b border-zinc-200 dark:border-zinc-800'>
        <h1 className='font-semibold text-sm flex flex-row gap-2 items-center'> 
          <Play className="w-4 h-4 text-zinc-500" />
          <span>Featured Videos</span>
        </h1>
        <a href="#" className='text-xs text-zinc-500 hover:text-primary dark:hover:text-secondary transition-colors'>
          Watch all →
        </a>
      </header>

      {/* Main Video Player Mockup */}
      <div className="relative aspect-video bg-zinc-900 group cursor-pointer overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
        
        {/* Animated crypto pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl animate-pulse delay-700" />
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all group-hover:scale-110">
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </div>
        </div>

        {/* Live badge */}
        {activeVideo.isLive && (
          <div className="absolute top-3 left-3">
            <Badge className='bg-red-600 text-white border-none animate-pulse'>
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5" />
              LIVE
            </Badge>
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3">
          <span className="px-2 py-1 bg-black/60 text-white text-xs rounded font-medium">
            {activeVideo.duration}
          </span>
        </div>
      </div>

      {/* Video Info */}
      <div className="px-3 py-3 border-b border-zinc-200 dark:border-zinc-800">
        <Badge variant="secondary" className='text-[10px] mb-2'>
          {activeVideo.category}
        </Badge>
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2">
          {activeVideo.title}
        </h3>
        <div className="flex items-center gap-3 mt-2 text-[10px] text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {activeVideo.views} views
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {activeVideo.duration}
          </span>
        </div>
      </div>

      {/* Video Playlist */}
      <div className="flex flex-col">
        {mockVideos.slice(1).map((video, idx) => (
          <button
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className='group flex items-start gap-2 px-3 py-2.5 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors text-left'
          >
            {/* Thumbnail placeholder */}
            <div className="relative flex-shrink-0 w-20 h-12 rounded bg-zinc-800 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-4 h-4 text-white/60 fill-white/60" />
              </div>
              <span className="absolute bottom-0.5 right-0.5 px-1 py-0.5 bg-black/70 text-white text-[8px] rounded">
                {video.duration}
              </span>
            </div>
            
            <div className='flex-1 min-w-0'>
              <h4 className="text-xs font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                {video.title}
              </h4>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                {video.views} views
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* View All Link */}
      <a 
        href="#" 
        className='flex items-center justify-center gap-1 px-3 py-3 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-secondary transition-colors border-t border-zinc-200 dark:border-zinc-800'
      >
        View all videos
        <ArrowRight className="w-3 h-3" />
      </a>
    </div>
  );
}
