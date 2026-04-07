import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { PortableTextComponents } from '@portabletext/react';

export const portableTextComponents: PortableTextComponents = {
  block: {
    // Paragraphs
    normal: ({ children }) => (
      <p className="mb-6 text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 font-normal">
        {children}
      </p>
    ),
    // Headings
    h1: ({ children }) => (
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 mt-12 text-zinc-900 dark:text-zinc-50 tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-bold mb-5 mt-10 text-zinc-900 dark:text-zinc-50 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-semibold mb-4 mt-8 text-zinc-900 dark:text-zinc-50">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg sm:text-xl font-semibold mb-3 mt-6 text-zinc-800 dark:text-zinc-100">
        {children}
      </h4>
    ),
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary dark:border-secondary pl-6 py-2 my-8 italic text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    // Bullet list
    bullet: ({ children }) => (
      <ul className="mb-6 space-y-3 pl-6 list-none">
        {children}
      </ul>
    ),
    // Numbered list
    number: ({ children }) => (
      <ol className="mb-6 space-y-3 pl-6 list-decimal list-outside marker:text-primary dark:marker:text-secondary marker:font-semibold">
        {children}
      </ol>
    ),
  },
  listItem: {
    // Bullet list item
    bullet: ({ children }) => (
      <li className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 pl-2 relative before:content-['•'] before:absolute before:-left-4 before:text-primary dark:before:text-secondary before:text-xl before:font-bold">
        {children}
      </li>
    ),
    // Numbered list item
    number: ({ children }) => (
      <li className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 pl-2">
        {children}
      </li>
    ),
  },
  marks: {
    // Strong/Bold
    strong: ({ children }) => (
      <strong className="font-bold text-zinc-900 dark:text-zinc-50">
        {children}
      </strong>
    ),
    // Emphasis/Italic
    em: ({ children }) => (
      <em className="italic text-zinc-800 dark:text-zinc-200">
        {children}
      </em>
    ),
    // Links
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          target={value.blank ? '_blank' : '_self'}
          className="text-primary dark:text-secondary font-medium underline decoration-primary/30 dark:decoration-secondary/30 underline-offset-4 hover:decoration-primary dark:hover:decoration-secondary transition-colors duration-200"
        >
          {children}
        </a>
      );
    },
    // Code
    code: ({ children }) => (
      <code className="bg-zinc-100 dark:bg-zinc-800 text-primary dark:text-secondary px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  types: {
    // Image
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Article image'}
            width={1000}
            height={600}
            quality={100}
            className="w-full h-auto"
          />
          {value.alt && (
            <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 py-2 px-4 bg-zinc-50 dark:bg-zinc-900/50">
              {value.alt}
            </p>
          )}
        </div>
      );
    },
  },
};
