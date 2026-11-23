'use client';

import { useMemo, useState } from 'react';
import { Search, Shuffle, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Sermon } from './types';
import { SermonCard } from './SermonCard';

type SortMode = 'curated' | 'longest' | 'shortest' | 'random';

interface Props {
  sermons: Sermon[];
  pageSize?: number;
  searchable?: boolean;
  showCategory?: boolean;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const SORT_LABELS: Record<SortMode, string> = {
  curated: '系列顺序',
  longest: '时长最长',
  shortest: '时长最短',
  random: '随机浏览',
};

export function SermonList({
  sermons,
  pageSize = 24,
  searchable = true,
  showCategory = true,
}: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('全部');
  const [sort, setSort] = useState<SortMode>('curated');
  const [randomSeed, setRandomSeed] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const categories = useMemo(
    () => ['全部', ...Array.from(new Set(sermons.map((s) => s.category)))],
    [sermons],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sermons.filter((sermon) => {
      if (category !== '全部' && sermon.category !== category) return false;
      if (!q) return true;
      const haystack = `${sermon.topic} ${sermon.title} ${sermon.seriesName} ${sermon.number ?? ''}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [sermons, query, category]);

  const sorted = useMemo(() => {
    const items = [...filtered];
    switch (sort) {
      case 'longest':
        return items.sort((a, b) => b.durationSeconds - a.durationSeconds);
      case 'shortest':
        return items
          .filter((s) => s.durationSeconds > 0)
          .sort((a, b) => a.durationSeconds - b.durationSeconds);
      case 'random':
        return items.sort(
          (a, b) =>
            seededRandom(randomSeed + a.slug.length * 31 + a.slug.charCodeAt(0)) -
            seededRandom(randomSeed + b.slug.length * 31 + b.slug.charCodeAt(0)),
        );
      default:
        return items;
    }
  }, [filtered, sort, randomSeed]);

  const visible = expanded ? sorted : sorted.slice(0, pageSize);
  const hasMore = sorted.length > pageSize;

  function handleSort(next: SortMode) {
    setSort(next);
    if (next === 'random') setRandomSeed((seed) => seed + 1);
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {searchable && (
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索讲道标题、系列或集数，如「圣灵」「罗马书」「84」…"
              className="input pl-9"
              aria-label="搜索讲道"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          {showCategory ? (
            <div className="flex flex-wrap gap-1.5">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                    category === item
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5 text-gray-400" />
            {(Object.keys(SORT_LABELS) as SortMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => handleSort(mode)}
                className={cn(
                  'rounded-md px-2 py-1 text-xs transition-colors',
                  sort === mode
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900',
                )}
              >
                {mode === 'random' && <Shuffle className="mr-1 inline h-3 w-3" />}
                {SORT_LABELS[mode]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-500" role="status">
        共 <span className="font-medium text-gray-900">{sorted.length}</span> 讲
        {query && <span> · 关键词「{query}」</span>}
      </p>

      {sorted.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-gray-200 py-16 text-center">
          <p className="text-sm text-gray-500">没有找到匹配的讲道。</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('全部');
            }}
            className="mt-3 text-sm font-medium text-primary hover:underline"
          >
            清除筛选
          </button>
        </div>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((sermon) => (
              <SermonCard key={sermon.slug} sermon={sermon} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="btn-secondary"
              >
                {expanded ? '收起' : `显示全部 ${sorted.length} 讲`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
