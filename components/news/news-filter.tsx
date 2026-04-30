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
  // Default categories to show
  const defaultCategories = ['Markets', 'Tech', 'Finance', 'Policy', 'Web3', 'Bitcoin'];
  
  // Filter out the "Trending" category from the main news section
  const filteredCategories = categories.filter(category => category !== "Trending");
  
  // Ensure default categories are included and prioritized
  const prioritizedCategories = [
    ...defaultCategories.filter(cat => filteredCategories.includes(cat)),
    ...filteredCategories.filter(cat => !defaultCategories.includes(cat))
  ];
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
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Filter</p>
          </div>
          {selectedCategory && (
            <Button 
              variant="ghost"
              size="sm"
              className="h-7 px-3 text-xs font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
              onClick={() => onFilterChange(null)}
            >
              Clear
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full shadow-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}

          {/* Categories container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide py-2"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-2 px-10">
              {/* All Categories button */}
              <Button
                variant={!selectedCategory ? 'default' : 'outline'}
                size="sm"
                className={cn(
                  'whitespace-nowrap rounded-full text-sm font-medium h-9 px-4 transition-all',
                  !selectedCategory 
                    ? 'bg-primary dark:bg-primary text-white shadow-md shadow-primary/20' 
                    : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                )}
                onClick={() => onFilterChange(null)}
              >
                All
              </Button>

              {/* Category buttons */}
              {prioritizedCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  className={cn(
                    'whitespace-nowrap rounded-full text-sm font-medium h-9 px-4 transition-all',
                    selectedCategory === category 
                      ? 'bg-primary dark:bg-primary text-white shadow-md shadow-primary/20' 
                      : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full shadow-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden lg:flex overflow-clip items-center gap-4 py-2">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">Filter</p>
        </div>
        
        <div className="flex-1 relative">
          {/* Left scroll button */}
          <div className="flex">
          {showLeftScroll && (
            <Button
              onClick={() => scroll('left')}
                size="icon"
                className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full shadow-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 transition-all"
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
                  'whitespace-nowrap rounded-full text-sm font-medium h-9 px-5 transition-all',
                  !selectedCategory 
                    ? 'bg-primary dark:bg-primary text-white shadow-md shadow-primary/20' 
                    : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                )}
                onClick={() => onFilterChange(null)}
              >
                All
              </Button>

              {/* Category buttons */}
              {prioritizedCategories.length > 0 ? (
                prioritizedCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    className={cn(
                      'whitespace-nowrap rounded-full text-sm font-medium h-9 px-4 transition-all',
                      selectedCategory === category 
                        ? 'bg-primary dark:bg-primary text-white shadow-md shadow-primary/20' 
                        : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
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
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full shadow-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 transition-all"
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
              className="h-9 px-4 rounded-full border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 whitespace-nowrap transition-all"
              onClick={() => onFilterChange(null)}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}