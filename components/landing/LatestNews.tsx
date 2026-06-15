"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { client, urlFor } from "@/sanity/lib/client";
import { formatDate } from "@/lib/date-utils";

interface NewsItem {
  _id: string;
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage?: { asset: { _ref: string } } | null;
  publishedAt: string;
  categoryName?: string;
  categorySlug?: string;
  author?: {
    name: string;
    avatar?: { asset: { _ref: string } } | null;
    role?: string;
  } | null;
}

const MAX_ITEMS = 6;

async function fetchLatestNews(): Promise<NewsItem[]> {
  const query = `
    *[_type == 'news'] | order(publishedAt desc) [0...${MAX_ITEMS}] {
      _id,
      title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      publishedAt,
      "categoryName": category->name,
      "categorySlug": category->slug.current,
      "author": author->{
        name,
        avatar,
        role
      }
    }
  `;
  const data = await client.fetch(query);
  return data;
}

const CARD_W = 316;
const CARD_GAP = 18;
const STEP = CARD_W + CARD_GAP;

function TagPill({ label }: { label: string }) {
  return (
    <span className="inline-block shrink-0 rounded-full bg-gray-200 dark:bg-slate-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
      {label}
    </span>
  );
}

function Avatar() {
  return <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-200 dark:bg-slate-700" />;
}

function buildArticleUrl(card: NewsItem): string {
  const date = new Date(card.publishedAt);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const categorySlug = card.categorySlug || "news";
  return `/news/${categorySlug}/${year}/${month}/${day}/${card.currentSlug}`;
}

function NewsCardItem({ card, index, inView }: { card: NewsItem; index: number; inView: boolean }) {
  const imageUrl = card.titleImage ? urlFor(card.titleImage).url() : null;
  const avatarUrl = card.author?.avatar ? urlFor(card.author.avatar).url() : null;
  const articleUrl = buildArticleUrl(card);

  return (
    <motion.article
      initial={{ opacity: 0, y: 44, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-[316px] shrink-0 flex-col gap-3 rounded-2xl border border-zinc-200 dark:border-slate-700 bg-zinc-100 dark:bg-slate-900 p-5 pb-4 transition-colors hover:border-zinc-300 dark:hover:border-slate-600"
    >
      <Link href={articleUrl} className="contents">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img src={avatarUrl} alt={card.author?.name || ''} className="h-10 w-10 shrink-0 rounded-xl object-cover" />
          ) : (
            <Avatar />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-gray-900 dark:text-white">{card.author?.name || 'Anonymous'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(card.publishedAt, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          {card.categoryName && <TagPill label={card.categoryName} />}
        </div>

        <div className="h-px bg-gray-300 dark:bg-slate-700" />

        <h3 className="text-sm hover:text-primary dark:hover:text-primary dark:hover:underline hover:underline font-semibold text-gray-900 dark:text-white line-clamp-2">{card.title}</h3>

        <p className="flex-1 text-xs leading-relaxed text-gray-700 dark:text-gray-300 line-clamp-3">{card.smallDescription}</p>

        {imageUrl && (
          <div className="h-[145px] overflow-hidden rounded-lg bg-gray-300 dark:bg-slate-700">
            <img src={imageUrl} alt={card.title} className="h-full w-full object-cover" loading="lazy" />
          </div>
        )}
      </Link>
    </motion.article>
  );
}

function ScrollBtn({
  dir,
  onClick,
  disabled,
}: {
  dir: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 transition hover:bg-gray-100 dark:hover:bg-slate-700 ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {dir === "left" ? <ChevronLeft className="" /> : <ChevronRight className="" />}
    </button>
  );
}

function Dots({ total, active, onDot }: { total: number; active: number; onDot: (i: number) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDot(i)}
          className={`h-2 rounded-full transition-all ${
            i === active ? "w-6 bg-blue-500" : "w-2 bg-gray-300"
          }`}
          aria-label={`Go to card ${i + 1}`}
        />
      ))}
    </div>
  );
}

export default function LatestNews() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxDrag, setMaxDrag] = useState(0);

  const rawX = useMotionValue(0);
  const animX = useSpring(rawX, { stiffness: 300, damping: 34, mass: 0.9 });

  // Fetch news on mount
  useEffect(() => {
    let mounted = true;
    fetchLatestNews()
      .then(data => {
        if (mounted) {
          setNews(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Failed to fetch latest news:", err);
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const calcMax = useCallback(() => {
    const cw = trackRef.current?.parentElement?.clientWidth ?? 1200;
    return Math.max(0, news.length * STEP - cw + 80);
  }, [news.length]);

  useEffect(() => {
    const update = () => setMaxDrag(calcMax());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [calcMax]);

  useEffect(() => {
    return animX.on("change", (v) => {
      const idx = Math.round(-v / STEP);
      setActiveIndex(Math.max(0, Math.min(idx, news.length - 1)));
    });
  }, [animX, news.length]);

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, news.length - 1));
    const offset = Math.min(clamped * STEP, maxDrag);
    rawX.set(-offset);
    setActiveIndex(clamped);
  };

  const canLeft = activeIndex > 0;
  const canRight = activeIndex < news.length - 1;

  return (
    <section ref={sectionRef} className="w-full py-20">
      <div className="mb-10 px-6 md:px-70 justify-center w-full">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold text- dark:text-white md:text-4xl">Weekly headlines</h2>

          <div className="flex shrink-0 items-center gap-3">
            <div className="flex gap-2">
              <ScrollBtn dir="left" onClick={() => scrollTo(activeIndex - 1)} disabled={!canLeft} />
              <ScrollBtn dir="right" onClick={() => scrollTo(activeIndex + 1)} disabled={!canRight} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none hidden absolute left-0 top-0 bottom-0 z-10 w-12 bg-linear-to-r from-white to-transparent dark:bg-linear-to-r dark:from-black dark:to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none hidden absolute right-0 top-0 bottom-0 z-10 w-12 bg-linear-to-l from-white to-transparent dark:bg-linear-to-l dark:from-black dark:to-transparent"
          aria-hidden
        />

        {loading ? (
          <div className="flex w-max gap-[18px] px-6 md:px-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex w-[316px] shrink-0 flex-col gap-3 rounded-2xl border border-zinc-200 dark:border-slate-700 bg-zinc-100 dark:bg-slate-900 p-5 pb-4 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-300 dark:bg-slate-700" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-24 bg-zinc-300 dark:bg-slate-700 rounded" />
                    <div className="h-2 w-16 bg-zinc-300 dark:bg-slate-700 rounded" />
                  </div>
                </div>
                <div className="h-px bg-zinc-300 dark:bg-slate-700" />
                <div className="h-4 w-full bg-zinc-300 dark:bg-slate-700 rounded" />
                <div className="h-4 w-3/4 bg-zinc-300 dark:bg-slate-700 rounded" />
                <div className="h-[145px] bg-zinc-300 dark:bg-slate-700 rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ right: 0, left: -maxDrag }}
            dragTransition={{ bounceStiffness: 360, bounceDamping: 38 }}
            dragElastic={0.07}
            whileDrag={{ cursor: "grabbing" }}
            onDragEnd={(_, info) => {
              const newX = Math.max(-maxDrag, Math.min(0, rawX.get() + info.offset.x));
              const snapped = Math.round(-newX / STEP);
              scrollTo(Math.max(0, Math.min(snapped, news.length - 1)));
            }}
            className="flex w-max cursor-grab gap-[18px] px-6 md:px-12"
            style={{ x: animX }}
          >
            {news.map((card, i) => (
              <NewsCardItem key={card._id} card={card} index={i} inView={isInView} />
            ))}
          </motion.div>
        )}

        <div className="w-full h-full justify-center flex mt-6">
          <Dots total={news.length} active={activeIndex} onDot={scrollTo} />
        </div>
      </div>
    </section>
  );
}