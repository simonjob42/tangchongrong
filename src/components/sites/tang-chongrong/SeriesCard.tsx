import Link from 'next/link';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import type { SeriesInfo } from './types';

interface Props {
  series: SeriesInfo;
}

export function SeriesCard({ series }: Props) {
  return (
    <Link
      href={`/series/${series.key}`}
      className="card-hover group flex flex-col rounded-lg p-5"
    >
      <div className="flex items-center justify-between">
        <span className="badge-gray">{series.category}</span>
        {series.hours > 0 && (
          <span className="inline-flex items-center gap-1 text-xs text-gray-400">
            <Clock className="h-3 w-3" />
            {series.hours} 小时
          </span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight text-gray-900 group-hover:text-primary">
        {series.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{series.desc}</p>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
          <BookOpen className="h-3.5 w-3.5" />
          {series.count} 讲
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-900">
          进入系列
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function SeriesGrid({ items }: { items: SeriesInfo[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((series) => (
        <SeriesCard key={series.key} series={series} />
      ))}
    </div>
  );
}
