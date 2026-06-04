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

export function KeyPoints({ points, className, title = 'Key Takeaways' }: KeyPointsProps) {
  if (!points?.length) return null;

  return (
    <div className={cn(
      "my-8 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden",
      className
    )}>
      <div className="px-5 py-3 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
        <svg className="w-4 h-4 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
        </svg>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white tracking-tight">{title}</h3>
      </div>
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {points.map((item, index) => (
          <li key={item._key} className="flex items-start gap-3 px-5 py-3.5">
            <span className="shrink-0 w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[11px] font-bold text-zinc-500 dark:text-zinc-400 mt-0.5">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-white leading-snug">
                {item.point}
              </p>
              {item.description && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
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
