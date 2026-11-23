import Link from 'next/link';
import { Play } from 'lucide-react';
import type { Sermon } from './types';

interface Props {
  sermon: Sermon;
}

export function SermonCard({ sermon }: Props) {
  return (
    <Link
      href={`/ep/${sermon.slug}`}
      className="card-hover group flex flex-col overflow-hidden rounded-lg"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sermon.thumbnail}
          alt={`${sermon.seriesName}：${sermon.topic}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 opacity-0 shadow transition-opacity group-hover:opacity-100">
            <Play className="ml-0.5 h-5 w-5 fill-gray-900 text-gray-900" />
          </span>
        </span>
        {sermon.number != null && (
          <span className="absolute left-2 top-2 rounded bg-black/65 px-1.5 py-0.5 text-xs font-medium text-white">
            #{sermon.number}
          </span>
        )}
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white">
          {sermon.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <p className="text-xs text-gray-500">{sermon.seriesName}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-gray-900 group-hover:text-primary">
          {sermon.topic}
        </h3>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
          <span className="badge-gray">{sermon.category}</span>
          {sermon.speaker !== '唐崇荣' && <span className="badge-amber">讲员未标注</span>}
        </div>
      </div>
    </Link>
  );
}
