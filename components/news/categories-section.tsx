import { simpleNewsCard } from "@/lib/interface";
import { urlFor } from "@/sanity/lib/client";
import { getArticleUrl } from "@/lib/article-url";
import { formatDynamicDateTime } from "@/lib/date-utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoriesSectionProps {
  data: simpleNewsCard[];
}

const CATEGORIES = ["Markets", "Finance", "Policy", "Tech"];

const PLACEHOLDER_ARTICLES = [
  { title: "No articles available in this category yet" },
  { title: "Check back soon for the latest updates" },
  { title: "New stories are published daily" },
];

function CategoryCard({
  category,
  articles,
}: {
  category: string;
  articles: simpleNewsCard[];
}) {
  const isEmpty = articles.length === 0;
  const featured = articles[0] ?? null;
  const sideArticles = isEmpty ? PLACEHOLDER_ARTICLES : articles.slice(1, 4);

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950 overflow-hidden flex flex-col">
      {/* Card Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <Link
          href={`/news/${category.toLowerCase()}`}
          className="flex items-center gap-1.5 group"
        >
          <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
            {category}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-primary transition-colors" />
        </Link>
      </div>

      {/* Card Body */}
      <div className="flex flex-row flex-1 p-3 gap-3">
        {/* Featured Article */}
        <div className="flex flex-col gap-2 w-[42%] shrink-0 group">
          <div className="relative w-full aspect-4/3 rounded overflow-hidden bg-slate-100 dark:bg-slate-800">
            {featured?.titleImage ? (
              <Image
                src={urlFor(featured.titleImage).width(400).height(300).url()}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 200px"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            {featured ? (
              <Link href={getArticleUrl(featured)} className="group/link">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug group-hover/link:text-primary transition-colors line-clamp-3">
                  {featured.title}
                </h3>
              </Link>
            ) : (
              <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 leading-snug line-clamp-3">
                No articles available in this category yet — check back soon.
              </h3>
            )}
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              {featured ? formatDynamicDateTime(featured.publishedAt) : "Coming soon"}
            </span>
          </div>
        </div>

        {/* Side Articles */}
        <div className="flex flex-col flex-1 self-stretch divide-y divide-slate-100 dark:divide-slate-800">
          {sideArticles.map((article, idx) => {
            const isReal = !isEmpty && "currentSlug" in article;
            return isReal ? (
              <Link
                key={idx}
                href={getArticleUrl(article as simpleNewsCard)}
                className="group flex flex-1 items-start pt-2 pb-0"
              >
                <h4 className="text-md font-medium text-blue-600 dark:text-blue-400 leading-snug group-hover:underline line-clamp-2">
                  {article.title}
                </h4>
              </Link>
            ) : (
              <div key={idx} className="flex flex-1 items-start pt-2 pb-0">
                <h4 className="text-md font-medium text-slate-400 dark:text-slate-500 leading-snug line-clamp-2">
                  {article.title}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function CategoriesSection({ data }: CategoriesSectionProps) {
  const categorised = CATEGORIES.map((cat) => ({
    category: cat,
    articles: data.filter(
      (a) => String(a.categoryName).toLowerCase() === cat.toLowerCase()
    ),
  }));

  return (
    <div className="w-full px-2 sm:px-4 lg:px-3 py-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {categorised.map(({ category, articles }) => (
          <CategoryCard key={category} category={category} articles={articles} />
        ))}
      </div>
    </div>
  );
}
