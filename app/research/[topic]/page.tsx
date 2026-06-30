import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, FileDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/news/navbar";
import Footer from "@/components/layout/Footer";
import { client, urlFor } from "@/sanity/lib/client";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { formatDate } from "@/lib/date-utils";
import { KeyPoints } from "@/components/news/KeyPoints";
import { portableTextComponents } from "@/components/news/PortableTextComponents";

export const revalidate = 30;

interface ResearchDoc {
  _id: string;
  title: string;
  currentSlug: string;
  smallDescription?: string;
  titleImage?: any;
  reportType?: string;
  publishedAt?: string;
  authorName?: string;
  content?: any;
  conclusion?: any;
  keyFindings?: Array<{ finding: string }>;
  pdfUrl?: string;
}

const reportTypeLabels: Record<string, string> = {
  quarterly: "Quarterly Review",
  annual: "Annual Report",
  market: "Market Report",
  adoption: "Adoption Index",
  exchange: "Exchange Report",
  stablecoin: "Stablecoin Report",
  tokenization: "Tokenization Report",
  network: "Network Report",
  regulatory: "Regulatory Report",
  ecosystem: "Ecosystem Report",
  whitepaper: "Whitepaper",
  "case-study": "Case Study",
  "deep-dive": "Deep Dive",
};

async function getResearch(slug: string): Promise<ResearchDoc | null> {
  const query = `
    *[_type == "research" && slug.current == $slug][0] {
      _id,
      title,
      "currentSlug": slug.current,
      smallDescription,
      titleImage,
      reportType,
      publishedAt,
      "authorName": author->name,
      content,
      conclusion,
      keyFindings,
      pdfUrl
    }
  `;
  return client.fetch(query, { slug });
}

export async function generateStaticParams() {
  const slugs: Array<{ slug: string }> = await client.fetch(
    `*[_type == "research"]{ "slug": slug.current }`
  );
  return slugs.map(({ slug }) => ({ topic: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const research = await getResearch(topic);
  if (!research) return { title: "Research Not Found" };
  return {
    title: `${research.title} | Cyclespace Research`,
    description: research.smallDescription,
  };
}

export default async function ResearchTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const research = await getResearch(topic);

  if (!research) notFound();

  const label = research.reportType
    ? reportTypeLabels[research.reportType] || research.reportType
    : null;

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Back */}
        <Link
          href="/news"
          className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-secondary transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Research
        </Link>

        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {label && (
              <Badge variant="outline" className="text-[10px] px-2 py-0.5 font-medium">
                {label}
              </Badge>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white leading-tight tracking-tight mb-3">
            {research.title}
          </h1>

          {research.smallDescription && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              {research.smallDescription}
            </p>
          )}

          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            {research.authorName && (
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  {research.authorName}
                </span>
              </span>
            )}
            {research.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(research.publishedAt, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>
        </header>

        {/* Cover image */}
        {research.titleImage?.asset && (
          <figure className="mb-8">
            <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <Image
                src={urlFor(research.titleImage).url()}
                alt={research.title}
                width={1000}
                height={520}
                quality={90}
                priority
              />
            </div>
          </figure>
        )}

        {/* PDF download */}
        {research.pdfUrl && (
          <a
            href={research.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 
            font-medium rounded-lg text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
          >
            <FileDown className="w-4 h-4" />
            Download PDF
          </a>
        )}

        {/* Key Findings */}
        {research.keyFindings && research.keyFindings.length > 0 && (
          <KeyPoints
            points={research.keyFindings.map((kf, i) => ({
              _key: String(i),
              point: kf.finding,
            }))}
            title="Key Findings"
          />
        )}

        {/* Full content */}
        {research.content && (
          <article className="mt-6">
            <PortableText
              value={research.content}
              components={portableTextComponents}
            />
          </article>
        )}

        {/* Conclusion */}
        {research.conclusion && (
          <section className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight mb-4">
              Conclusion
            </h2>
            <PortableText
              value={research.conclusion}
              components={portableTextComponents}
            />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
