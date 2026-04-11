'use client';

import { useState, useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  fallbackClassName?: string;
}

export default function VideoBackground({ 
  src, 
  poster,
  fallbackClassName = "bg-gradient-to-br from-slate-900 to-slate-800"
}: VideoBackgroundProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [canPlay, setCanPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setCanPlay(true);
      setIsLoading(false);
    };

    const handleError = () => {
      console.error('Video failed to load:', src);
      setHasError(true);
      setIsLoading(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    
    // Try to play
    video.play().catch(() => {
      // Autoplay blocked or other error
      setHasError(true);
    });

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [src]);

  // If video fails or can't play, show fallback
  if (hasError || !canPlay) {
    return (
      <div className={`absolute inset-0 ${fallbackClassName}`}>
        {poster && (
          <img 
            src={poster} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        )}
      </div>
    );
  }

  return (
    <>
      {/* Loading state */}
      {isLoading && poster && (
        <div className="absolute inset-0 z-0">
          <img 
            src={poster} 
            alt="Loading..." 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        autoPlay
        controls={true}
        loop
        muted
        playsInline
        poster={poster}
        preload="auto"
      >
        <source src={src} type="video/mp4" />
        {/* WebM fallback for better codec support */}
        <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}
