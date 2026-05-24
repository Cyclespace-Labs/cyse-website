// app/components/News/news-section.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { simpleNewsCard } from "@/lib/interface";
import { urlFor } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import BannerArticle from "./banner-article";
import { cn } from "@/lib/utils";
import { formatDate, isRecent } from "@/lib/date-utils";
import { getArticleUrl } from "@/lib/article-url";
import { ArrowBigRightIcon, ArrowLeft, ArrowRight, ArrowRightFromLine, Filter, Globe, Newspaper, Search, Tag } from "lucide-react";
import SearchBar from "./search-bar";
import NewsFilter from "./news-filter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"; 
import TokenDisplay from "./tokenDisplay";


interface NewsSectionProps {
  data: simpleNewsCard[];
}

export default function NewsSection({ data }: NewsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Articles per page

    // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);
  
  // Default categories to always show
  const defaultCategories = ['Markets', 'Tech', 'Finance', 'Policy', 'Web3', 'Bitcoin'];

  // Memoize categories to prevent unnecessary recalculations
  const categories = useMemo(() => {
    const dataCategories = Array.from(
      new Set(data.map(post => post.categoryName))
    ).filter(Boolean) as string[];
    
    // Always include default categories first, then add any additional categories from data
    return [
      ...defaultCategories,
      ...dataCategories.filter(cat => !defaultCategories.includes(cat))
    ];
  }, [data]);

  // Memoize filtered data for performance
  const filteredData = useMemo(() => {
    let result = data;
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(post => post.categoryName === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        (post.title && post.title.toLowerCase().includes(query)) || 
        (post.categoryName && post.categoryName.toLowerCase().includes(query)) ||
        (post.tags && post.tags.some(tag => tag.name && tag.name.toLowerCase().includes(query))) ||
        (post.impacts && post.impacts.some(impact => impact.name && impact.name.toLowerCase().includes(query))) ||
        (post.author && post.impacts.some(author => author.name && author.name.toLowerCase().includes(query)))
      );
    }

    return result;
  }, [data, selectedCategory, searchQuery]);

  // Get the latest article (first item in sorted array)
  const latestArticle = useMemo(() => {
    return data.length > 0 ? data[0] : null;
  }, [data]);

    // Create data for pagination (excludes banner article when shown)
  const paginationData = useMemo(() => {
    const shouldSkipLatest = !selectedCategory && !searchQuery;
    return shouldSkipLatest && latestArticle
      ? filteredData.filter(post => post !== latestArticle)
      : filteredData;
  }, [filteredData, selectedCategory, searchQuery, latestArticle]);

  
  // Calculate pagination
  const totalPages = Math.ceil(paginationData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = paginationData.slice(startIndex, endIndex);


  const handleFilterChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Conditions for showing the banner and skipping the latest article
  const showBanner = !selectedCategory && !searchQuery && latestArticle;
  const skipLatestArticle = !selectedCategory && !searchQuery;

  return (
    <div className="bg-white w-full dark:bg-slate-950 h-full rounded-lg border border-slate-200 dark:border-slate-800 p-2">
      <div className="w-full pb-4">
          <div className="flex flex-col justify-between w-full items-start px-5 pt-2 gap-4">
            
            <div className="w-full  hidden justify-center items-center ">
              <TokenDisplay />
            </div>

            <div className="justify-between hidden items-center gap-5 space-y-2 lg:space-y-0 flex flex-col lg:flex-row w-full">
              <h1 className="text-lg py-1 flex flex-row justify-between text-start text-zinc-500 font-semibold tracking-wide">
                <span className="flex flex-row gap-2 text-lg text-black dark:text-white font-bold">
                  <p className="text-primary dark:text-primary">Latest</p>Headlines
                </span>
              </h1>
              <Link href="/news" className='text-sm items-center font-semibold tracking-tight flex gap-2 text-slate-900 hover:text-primary dark:hover:text-secondary transition-colors'>
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="w-full mb-1">
              <NewsFilter 
                categories={categories} 
                onFilterChange={handleFilterChange} 
                selectedCategory={selectedCategory}
              />
            </div>
        
          </div>
      
      <div>
      {/* Banner for latest article - only show when no category and no search */}
      {showBanner && (
        <div className="px-5">
          <BannerArticle post={latestArticle} />
        </div>
      )}
      
      {filteredData.length === 0 ? (
  <div className="flex flex-col items-center justify-center py-20 px-5">
    <div className="text-center max-w-md">
      {/* Icon based on context */}
      {searchQuery ? (
        <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      ) : selectedCategory ? (
        <Filter className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      ) : (
        <Newspaper className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      )}
      
      {/* Contextual title */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {searchQuery 
          ? `No results for "${searchQuery}"`
          : selectedCategory 
          ? `No articles in ${selectedCategory}`
          : "No news articles available"
        }
      </h3>
      
      {/* Contextual description */}
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {searchQuery 
          ? "Try different keywords or browse categories"
          : selectedCategory
          ? "Try selecting a different category or check back later"
          : "Check back soon for the latest crypto news"
        }
      </p>
      
      {/* Action buttons */}
      <div className="flex gap-3 justify-center">
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Clear Search
          </button>
        )}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Clear Filter
          </button>
        )}
      </div>
    </div>
  </div>
      ) : (
        <>
         
        {/* Article Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 justify-center py-2 px-3 sm:px-5 w-full">
          {currentArticles.map((post, idx) => (
            <Card key={idx} className="w-full p-3 m-0 justify-start items-start flex flex-col shadow border-none shadow-slate-200 dark:shadow-slate-900 h-full gap-2 bg-white dark:bg-slate-900 ">
              <div className="w-full h-full relative">
                {post.titleImage ? (
                  <Image
                    src={urlFor(post.titleImage).url()}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="rounded-lg h-[200px] w-full object-cover"
                  />
                ) : (
                  <div className="rounded-lg h-[200px] w-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <span className="text-slate-400 dark:text-slate-500">No image available</span>
                  </div>
                )}
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="w-fit bg-primary dark:bg-secondary text-white dark:text-white border-px border-none shadow-md">
                    <span className="ml-1 text-xs">{post.categoryName}</span>
                  </Badge>
                </div>
              </div>
              <CardContent className="mt-2 mb-2 justify-between w-full px-3">
                <Link href={getArticleUrl(post)} className="hover:text-primary dark:hover:text-primary hover:underline ">
                  <h3 className="text-sm tracking-tight font-semibold line-clamp-2">{post.title}</h3>
                </Link>
                <p className="text-xs mt-1 text-gray-600 dark:text-gray-300 line-clamp-3">
                  {post.smallDescription}
                </p>

                <div className="flex flex-col w-full gap-2 mt-2 h-fit">
                  {isRecent(post.publishedAt) && (
                    <span className="ml-1 animate-pulse">🆕</span>
                  )}
                  <div className="flex flex-row justify-between w-full items-center">

                    <div className="flex items-center gap-2">
                      {post.author?.avatar && (
                        <div className="w-5 h-5 rounded-full overflow-hidden">
                          <Image
                            src={urlFor(post.author.avatar).url()}
                            width={500}
                            height={500}
                            quality={100}
                            alt={post.author.name || 'Author'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        {post.author?.name || 'Anonymous'}
                      </p>
                    </div>

                    {/* impact display */}
                    <div className="flex flex-row items-center gap-1 ">
                      <h3 className="text-xs">Impact:</h3>
                      {post.impacts && post.impacts.length > 0 && (
                        <div className="">
                          {post.impacts.map((impact, impactIdx) => (
                            <Badge 
                              key={impactIdx}
                              className={cn(
                                "gap-0 flex ",
                                impact.color === 'blue' && "bg-blue-100 text-blue-950 border-blue-300 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-950",
                                impact.color === 'green' && "bg-green-100 text-green-950 border-green-300 dark:bg-green-950 dark:text-green-100 dark:border-green-950",
                                impact.color === 'red' && "bg-red-100 text-red-950 border-red-300 dark:bg-red-950 dark:text-red-100 dark:border-red-950",
                                impact.color === 'yellow' && "bg-yellow-100 text-yellow-950 border-yellow-300 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-950",
                                impact.color === 'purple' && "bg-purple-100 text-purple-950 border-purple-300 dark:bg-purple-950 dark:text-purple-100 dark:border-purple-950",
                              )}
                            >
                              <Globe width={6} height={6} strokeWidth={2} className="w-6 h-6"/>
                              <span className="ml-1 text-[10px]">{impact.name}</span>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>

                  <p className="text-xs text-slate-500  dark:text-slate-400">
                    {formatDate(post.publishedAt, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>

                </div>


                <div className="justify-between mt-3">
                {/* Tags display */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag, tagIdx) => (
                      <Badge 
                        key={tagIdx}
                        className={cn(
                          "flex gap-0",
                          tag.color === 'blue' && "bg-blue-100 text-blue-950 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-950",
                          tag.color === 'green' && "bg-green-100 text-green-950 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-950",
                          tag.color === 'red' && "bg-red-100 text-red-950 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-950",
                          tag.color === 'yellow' && "bg-yellow-100 text-yellow-950 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-950",
                          tag.color === 'purple' && "bg-purple-100 text-purple-950 border-purple-200 dark:bg-purple-950 dark:text-purple-100 dark:border-purple-950",
                        )}
                      >
                        <span className="text-[10px]">{tag.name}</span>
                      </Badge>
                    ))}
                    
                  </div>
                )}
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="py-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => currentPage > 1 && setCurrentPage(p => Math.max(p - 1, 1))}
                    className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => currentPage < totalPages && setCurrentPage(p => Math.min(p + 1, totalPages))}
                    className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        </>
      )}
      </div>
      </div>
    </div>
  );
}