// app/components/News/search-bar.tsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search news...",
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className={`group relative w-full ${className ?? "max-w-md"}`}>
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-10 rounded-4xl shadow-none border-none dark:bg-zinc-800 bg-blue-100/70"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-200 dark:bg-zinc-700 group-hover:bg-slate-300 dark:group-hover:bg-zinc-600 text-slate-400
      px-3 py-1 rounded-md text-[9px] font-medium">/</span>
    </div>
  );
}