import { cn } from "@/lib/utils";

interface KeyPoint {
  _key: string;
  point: string;
  description?: string;
}

interface KeyPointsProps {
  points: KeyPoint[];
  className?: string;
  title?: string;
}

export function KeyPoints({ points, className, title = 'Key Points' }: KeyPointsProps) {
  console.log('KeyPoints component received points:', points);
  if (!points?.length) {
    console.log('No points to display');
    return null;
  }

  return (
    <div className={cn(
      "my-10 p-8 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent dark:from-secondary/10 dark:via-secondary/5 dark:to-transparent rounded-2xl border border-primary/20 dark:border-secondary/20 shadow-sm",
      className
    )}>
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-primary/20 dark:border-secondary/20">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-secondary/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">{title}</h3>
      </div>
      <ul className="space-y-5">
        {points.map((item, index) => (
          <li key={item._key} className="flex items-start group">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 dark:bg-secondary/20 flex items-center justify-center mr-4 mt-0.5 group-hover:bg-primary/20 dark:group-hover:bg-secondary/30 transition-colors duration-200">
              <span className="text-sm font-bold text-primary dark:text-secondary">
                {index + 1}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-50 leading-relaxed">
                {item.point}
              </p>
              {item.description && (
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
