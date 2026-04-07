// app/components/News/news-filter.tsx
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export default function NewsFilter({ 
  categories,
  onFilterChange,
  selectedCategory
}: {
  categories: string[];
  onFilterChange: (category: string | null) => void;
  selectedCategory: string | null;
}) {
  // Filter out the "Trending" category from the main news section
  const filteredCategories = categories.filter(category => category !== "Trending");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftScroll(scrollLeft > 0);
    setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -200 : 200;
      
      container.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });
      
      // Update scroll buttons after scroll animation
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="w-full">
      {/* Mobile Layout - Stacked */}
      <div className="flex lg:hidden w-full flex-col gap-3">
        {/* Filter label and clear button row */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Filter by:</p>
          {selectedCategory && (
            <Button 
              variant="ghost"
              size="sm"
              className="h-7 px-3 text-xs text-black dark:text-white border border-border/50 rounded-full hover:bg-primary dark:hover:bg-secondary"
              onClick={() => onFilterChange(null)}
            >
              Clear filter
            </Button>
          )}
        </div>
        
        {/* Categories scroll container */}
        <div className="relative">
          {/* Left scroll button */}
          {showLeftScroll && (
            <Button
              onClick={() => scroll('left')}
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full shadow-lg bg-zinc-900 dark:bg-zinc-100 hover:bg-primary dark:hover:bg-secondary text-white dark:text-white transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}

          {/* Categories container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide py-1"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-2 px-8">
              {/* All Categories button */}
              <Button
                variant={!selectedCategory ? 'default' : 'outline'}
                size="sm"
                className={cn(
                  'whitespace-nowrap rounded-full text-sm h-8 px-4 transition-all',
                  !selectedCategory 
                    ? 'bg-primary dark:bg-secondary text-white dark:text-white shadow-md' 
                    : 'hover:bg-primary/10 dark:hover:bg-secondary/10'
                )}
                onClick={() => onFilterChange(null)}
              >
                All
              </Button>

              {/* Category buttons */}
              {filteredCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  className={cn(
                    'whitespace-nowrap rounded-full text-sm h-8 px-4 transition-all',
                    selectedCategory === category 
                      ? 'bg-primary dark:bg-secondary text-white dark:text-white shadow-md' 
                      : 'hover:bg-primary/10 dark:hover:bg-secondary/10'
                  )}
                  onClick={() => onFilterChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Right scroll button */}
          {showRightScroll && (
            <Button
              onClick={() => scroll('right')}
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full shadow-lg bg-zinc-900 dark:bg-zinc-100 hover:bg-primary dark:hover:bg-secondary text-white dark:text-white transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden lg:flex overflow-clip items-center gap-4">
        <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">Filter by:</p>
        
        <div className="flex-1 relative">
          {/* Left scroll button */}
          <div className="flex">
          {showLeftScroll && (
            <Button
              onClick={() => scroll('left')}
                size="icon"
                className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full shadow-lg bg-zinc-900 dark:bg-zinc-100 hover:bg-primary dark:hover:bg-secondary text-white dark:text-white transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Categories container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide py-1"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-2 px-10">
              {/* All Categories button */}
              <Button
                variant={!selectedCategory ? 'default' : 'outline'}
                size="sm"
                className={cn(
                  'whitespace-nowrap rounded-full text-sm h-9 px-5 transition-all',
                  !selectedCategory 
                    ? 'bg-primary dark:bg-secondary text-white dark:text-white shadow-md' 
                    : 'hover:bg-primary/10 dark:hover:bg-secondary/10'
                )}
                onClick={() => onFilterChange(null)}
              >
                All
              </Button>

              {/* Category buttons */}
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    className={cn(
                      'whitespace-nowrap rounded-full text-sm h-8 px-4 transition-all',
                      selectedCategory === category 
                        ? 'bg-primary dark:bg-secondary text-white dark:text-white shadow-md' 
                        : 'hover:bg-primary/10 dark:hover:bg-secondary/10'
                    )}
                    onClick={() => onFilterChange(category)}
                  >
                    {category}
                  </Button>
                ))
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                  <Filter className="w-4 h-4" />
                  <span>No categories available</span>
                </div>
              )}
            </div>
          </div>

          {/* Right scroll button */}
          <div className="flex">
          {showRightScroll && (
            <Button
              onClick={() => scroll('right')}
              size="icon"
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full shadow-lg bg-zinc-900 dark:bg-zinc-100 hover:bg-primary dark:hover:bg-secondary text-white dark:text-black transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
          </div>
        </div>

        {/* Clear filter button - desktop only */}
        <div className="flex">
          {selectedCategory && (
            <Button 
              variant="outline"
              size="sm"
              className="h-9 px-4 rounded-full border-border/50 hover:bg-accent whitespace-nowrap transition-all"
              onClick={() => onFilterChange(null)}
            >
              Clear filter
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}