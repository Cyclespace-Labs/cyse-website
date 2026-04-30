"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Clock } from "lucide-react";
import SearchBar from "./search-bar";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/client";
import { simpleNewsCard } from "@/lib/interface";

function formatRelativeTime(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [recentNews, setRecentNews] = useState<simpleNewsCard[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch("/api/news/recent")
      .then((res) => res.json())
      .then((data) => {
        setRecentNews(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch recent news:", err);
        setRecentNews([]);
      })
      .finally(() => setLoading(false));
  }, [isOpen]);

  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) return recentNews;
    const q = searchQuery.toLowerCase();
    return recentNews.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.smallDescription?.toLowerCase().includes(q) ||
        String(post.categoryName).toLowerCase().includes(q)
    );
  }, [recentNews, searchQuery]);

  return (
    <>
      {/* Search Bar Button Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 px-4 py-2 h-8 rounded-full bg-slate-100 dark:bg-zinc-900 text-sm text-gray-500 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors w-full max-w-xs"
      >
        <Search className="h-4 w-4 shrink-0 font-medium" />
        <span className="flex-1 text-left truncate text-medium">Search</span>
        <span className="bg-slate-200 dark:bg-zinc-800 group-hover:bg-slate-300 dark:group-hover:bg-zinc-600 text-slate-400 items-center justify-center px-3 py-2.5 flex h-full rounded-md text-[9px] font-medium">/</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b border-zinc-200 dark:border-zinc-700">
                <div className="flex-1">
                  <SearchBar
                    onSearch={setSearchQuery}
                    placeholder="Search recent news..."
                    className="max-w-none"
                  />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1 p-4">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full" />
                  </div>
                ) : filteredNews.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    {searchQuery.trim()
                      ? "No results found"
                      : "No articles available"}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-1">
                      {searchQuery.trim()
                        ? `Results (${filteredNews.length})`
                        : "Recent News"}
                    </p>
                    {filteredNews.map((post) => (
                      <Link
                        key={post.currentSlug}
                        href={`/article/${post.currentSlug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
                      >
                        {post.titleImage && (
                          <div className="w-14 h-14 rounded-md overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
                            <Image
                              src={urlFor(post.titleImage).url()}
                              alt={post.title}
                              width={56}
                              height={56}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-zinc-800 text-blue-700 dark:text-zinc-400 font-medium">
                              {post.categoryName}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-gray-500">
                              <Clock className="h-3 w-3" />
                              {formatRelativeTime(post.publishedAt)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
