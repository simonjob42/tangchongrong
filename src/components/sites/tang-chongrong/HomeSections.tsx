import Link from 'next/link';
import { ArrowRight, Clock, Search } from 'lucide-react';
import { getSermon, TOTAL_SERMONS } from './data/sermons';
import { FEATURED_COLLECTIONS, READING_GUIDE, THEMES } from './data/site';
import type { Sermon } from './types';

export function FeaturedCollections() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {FEATURED_COLLECTIONS.map((collection) => {
        const items = collection.slugs
          .map((slug) => getSermon(slug))
          .filter((item): item is Sermon => Boolean(item));

        return (
          <section key={collection.title} className="card flex flex-col rounded-lg p-5">
            <h3 className="text-base font-semibold tracking-tight text-gray-900">
              {collection.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
              {collection.description}
            </p>
            <ol className="mt-4 flex-1 divide-y divide-gray-100">
              {items.map((sermon, index) => (
                <li key={sermon.slug}>
                  <Link
                    href={`/ep/${sermon.slug}`}
                    className="group flex items-start gap-3 py-2.5"
                  >
                    <span className="mt-0.5 w-4 shrink-0 text-xs tabular-nums text-gray-400">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-1 text-sm text-gray-900 group-hover:text-primary">
                        {sermon.topic}
                      </span>
                      <span className="mt-0.5 block text-xs text-gray-500">
                        {sermon.seriesName}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-gray-400">{sermon.number != null ? `#${sermon.number}` : ''}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}

export function ReadingGuide() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {READING_GUIDE.map((item) => (
        <div key={item.step} className="rounded-lg border border-gray-100 p-5">
          <span className="text-xs font-medium text-gray-400">第 {item.step} 步</span>
          <h3 className="mt-1.5 text-base font-semibold tracking-tight text-gray-900">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export function ThemesPreview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {THEMES.map((theme) => (
        <Link
          key={theme.key}
          href="/about"
          className="group rounded-lg border border-gray-100 p-5 transition-colors hover:border-gray-200 hover:bg-gray-50/60"
        >
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary">
            {theme.title}
          </h3>
          <p className="mt-1 text-xs text-gray-500">{theme.subtitle}</p>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500">{theme.body}</p>
        </Link>
      ))}
    </div>
  );
}

export function HomeCta() {
  return (
    <section className="overflow-hidden rounded-xl bg-primary px-6 py-10 text-white sm:px-10">
      <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            在 {TOTAL_SERMONS} 篇讲道中，找到你现在需要的那一篇
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
            可以按关键词搜索，也可以从问答精选进入——信仰生活中最实际的疑难，往往已经有人问过。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
          >
            <Search className="h-4 w-4" />
            搜索讲道
          </Link>
          <Link
            href="/qa"
            className="inline-flex items-center gap-2 rounded-md border border-white/25 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            问答精选
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SourceNote() {
  return (
    <p className="flex items-start gap-1.5 text-xs leading-relaxed text-gray-500">
      <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      视频由 YouTube 提供；本站整理公开目录与时长信息，不托管视频文件。
    </p>
  );
}
