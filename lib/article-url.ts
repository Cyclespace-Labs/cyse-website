import { simpleNewsCard } from "./interface";

export function getArticleUrl(post: { currentSlug: string; categoryName: any; publishedAt: string }): string {
  const date = new Date(post.publishedAt);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const category = String(post.categoryName || "news").toLowerCase().replace(/\s+/g, "-");
  return `/news/${category}/${year}/${month}/${day}/${post.currentSlug}`;
}
