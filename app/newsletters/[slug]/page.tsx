import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Hash, Mail, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/date-utils";
import Navbar from "@/components/news/navbar";
import Footer from "@/components/layout/Footer";
import { portableTextComponents } from "@/components/news/PortableTextComponents";

export const revalidate = 30;

interface Newsletter {
  _id: string;
  title: string;
  description?: string;
  content: any;
  publishedAt: string;
  issueNumber?: number;
  frequency?: string;
  author?: { name: string };
  tags?: { name: string; color: string }[];
}

async function getData(slug: string): Promise<Newsletter | null> {
  const query = `
    *[_type == "newsletter" && slug.current == $slug][0] {
      _id,
      title,
      description,
      content,
      publishedAt,
      issueNumber,
      frequency,
      "author": author->{ name },
      "tags": tags[]->{ name, color }
    }
  `;
  return client.fetch(query, { slug });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const newsletter = await getData(slug);

  if (!newsletter) {
    return { title: "Newsletter Not Found" };
  }

  return {
    title: `${newsletter.title} | Cyclespace Newsletters`,
    description: newsletter.description || newsletter.title,
  };
}

export async function generateStaticParams() {
  const newsletters = await client.fetch(
    `*[_type == "newsletter"]{ "slug": slug.current }`
  );
  return newsletters.map((n: { slug: string }) => ({ slug: n.slug }));
}

const frequencyLabels: Record<string, string> = {
  daily: "Daily",
  weekly: "Weekly",
  "bi-weekly": "Bi-Weekly",
  monthly: "Monthly",
  special: "Special Edition",
};

export default async function NewsletterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const newsletter = await getData(slug);

  if (!newsletter) notFound();

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Back link */}
        <Link
          href="/newsletters"
          className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-secondary transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Newsletters
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 flex-wrap mb-3">
            {newsletter.frequency && (
              <Badge variant="outline" className="text-[10px] px-2 py-0.5 font-medium">
                <Mail className="w-3 h-3 mr-1" />
                {frequencyLabels[newsletter.frequency] || newsletter.frequency}
              </Badge>
            )}
            {newsletter.issueNumber && (
              <Badge variant="outline" className="text-[10px] px-2 py-0.5 font-medium">
                <Hash className="w-3 h-3 mr-1" />
                Issue {newsletter.issueNumber}
              </Badge>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white leading-tight mb-3">
            {newsletter.title}
          </h1>

          {newsletter.description && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              {newsletter.description}
            </p>
          )}

          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(newsletter.publishedAt)}
            </span>
            {newsletter.author?.name && (
              <>
                <span>•</span>
                <span>{newsletter.author.name}</span>
              </>
            )}
          </div>
        </header>

        {/* Content */}
        {newsletter.content && (
          <article className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-a:text-primary dark:prose-a:text-secondary">
            <PortableText value={newsletter.content} components={portableTextComponents} />
          </article>
        )}

        {/* Tags */}
        {newsletter.tags && newsletter.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-zinc-400" />
              {newsletter.tags.map((tag) => (
                <Badge key={tag.name} variant="secondary" className="text-[10px]">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
