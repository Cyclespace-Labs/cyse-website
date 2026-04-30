import Link from "next/link";

interface DropdownCard {
  title: string;
  description: string;
  href: string;
  image?: string;
  category?: string;
}

interface DropdownContentProps {
  cards: DropdownCard[];
  sectionLinks?: Array<{ label: string; href: string }>;
  featuredSections?: Array<{ title: string; href: string; card?: DropdownCard }>;
}

export default function DropdownContent({ cards, sectionLinks, featuredSections }: DropdownContentProps) {
  return (
    <div className="fixed left-0 top-[56px] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 -translate-y-2 transition-all duration-300 ease-out z-50 w-screen">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">
          {/* Left column - Section links */}
          <div className="col-span-3 border-r border-zinc-200 dark:border-zinc-800 pr-6">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Categories</h3>
            <div className="flex flex-col gap-2">
              {sectionLinks?.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Middle column - 3 cards */}
          <div className="col-span-6 grid grid-cols-3 gap-4">
            {cards.slice(0, 3).map((card, index) => (
              <Link
                key={index}
                href={card.href}
                className="block bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              >
                {card.image && (
                  <div className="w-full h-24 mb-3 rounded-md overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {card.category && (
                  <span className="text-[10px] text-primary dark:text-primary font-semibold uppercase tracking-wider">
                    {card.category}
                  </span>
                )}
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-2 line-clamp-2">
                  {card.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>

          {/* Right column - 2 featured sections with cards */}
          <div className="col-span-3 flex flex-col gap-4">
            {featuredSections?.slice(0, 2).map((section, index) => (
              <div key={index} className="flex-1">
                <Link href={section.href} className="block">
                  {section.card ? (
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors h-full">
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                        {section.title}
                      </h3>
                      {section.card.category && (
                        <span className="text-[10px] text-primary dark:text-primary font-semibold uppercase tracking-wider">
                          {section.card.category}
                        </span>
                      )}
                      <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-2 line-clamp-2">
                        {section.card.title}
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
                        {section.card.description}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors h-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {section.title}
                      </span>
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
