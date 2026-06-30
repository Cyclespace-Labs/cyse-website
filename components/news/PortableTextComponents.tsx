import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { PortableTextComponents } from '@portabletext/react';

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => {
      const text = typeof children === 'string' ? children : children?.toString() || '';
      const dropCapMatch = text.match(/^\[\[([A-Z])\]\](.*)$/);

      if (dropCapMatch) {
        const [, letter, rest] = dropCapMatch;
        return (
          <p className="mb-5 text-[15px] sm:text-base leading-[1.8] text-zinc-700 dark:text-zinc-300">
            <span className="float-left text-[3.2rem] font-bold text-zinc-900 dark:text-white leading-none mr-3 mt-1 font-serif">
              {letter}
            </span>
            {rest}
          </p>
        );
      }

      return (
        <p className="mb-5 text-[15px] sm:text-base leading-[1.8] text-zinc-700 dark:text-zinc-300">
          {children}
        </p>
      );
    },
    h1: ({ children }) => (
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 mt-10 text-zinc-900 dark:text-white tracking-tight leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl sm:text-2xl font-bold mb-3 mt-8 text-zinc-900 dark:text-white tracking-tight leading-tight border-b border-zinc-100 dark:border-zinc-800 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg sm:text-xl font-semibold mb-3 mt-7 text-zinc-900 dark:text-white leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base sm:text-lg font-semibold mb-2 mt-6 text-zinc-800 dark:text-zinc-100 leading-snug">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-5 border-l-[3px] border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-400 italic text-[15px] leading-[1.7]">
        {children}
      </blockquote>
    ),
    pullQuote: ({ children }) => (
      <figure className="my-10 py-6 px-8 text-center border-y border-zinc-200 dark:border-zinc-800">
        <blockquote className="text-lg sm:text-xl font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed italic">
          {children}
        </blockquote>
      </figure>
    ),
    callout: ({ children }) => (
      <aside className="my-6 p-4 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-5 h-5 mt-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
            <svg className="w-3 h-3 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
          </div>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {children}
          </p>
        </div>
      </aside>
    ),
    statCard: ({ children }) => (
      <div className="my-6 p-5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <p className="text-base sm:text-lg font-semibold text-zinc-800 dark:text-zinc-200 leading-snug">
          {children}
        </p>
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 space-y-2 pl-5">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 space-y-2 pl-5 list-decimal list-outside marker:text-zinc-400 dark:marker:text-zinc-500 marker:text-sm">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-[15px] sm:text-base leading-[1.7] text-zinc-700 dark:text-zinc-300 pl-1 relative before:content-[''] before:absolute before:-left-3 before:top-[10px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-zinc-400 dark:before:bg-zinc-500">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="text-[15px] sm:text-base leading-[1.7] text-zinc-700 dark:text-zinc-300 pl-1">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-zinc-900 dark:text-white">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-zinc-700 dark:text-zinc-300">
        {children}
      </em>
    ),
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          target={value.blank ? '_blank' : '_self'}
          className="text-primary dark:text-secondary underline decoration-primary/40 dark:decoration-secondary/40 underline-offset-2 hover:decoration-primary dark:hover:decoration-secondary transition-colors"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-1.5 py-0.5 rounded text-[13px] font-mono">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || 'Article image'}
              width={1000}
              height={600}
              quality={90}
            />
          </div>
          {value.alt && (
            <figcaption className="text-xs text-center text-zinc-500 dark:text-zinc-400 mt-2">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};
