'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { SERIES, SERMONS } from './data/sermons';
import { SEARCH_SUGGESTIONS } from './data/site';
import { SermonCard } from './SermonCard';

const SERIES_NAMES = new Map(SERIES.map((s) => [s.key, s.name]));
const SUGGESTED_SERIES = [
  'yuehan-fuyin',
  'luomashu',
  'yage-shu',
  'ganqing-shenghua',
  'qa-jingxuan',
  'grc-zhuri',
];

export function SearchPage() {
  const [query, setQuery] = useState('');

  const trimmed = query.trim();
  const results = useMemo(() => {
    if (!trimmed) return [];
    const q = trimmed.toLowerCase();
    return SERMONS.filter((sermon) => {
      const haystack = `${sermon.topic} ${sermon.title} ${sermon.seriesName} ${sermon.category} ${sermon.speaker} ${sermon.number ?? ''}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [trimmed]);

  const shown = results.slice(0, 24);

  return (
    <div className="pt-10">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">搜索讲道</h1>
        <p className="mt-3 text-gray-600">
          在 {SERMONS.length} 篇讲道与问答中检索标题、系列与主题。
        </p>

        <div className="relative mt-7">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入关键词：如「圣灵」「恩典」「苦难」「罗马书」…"
            aria-label="搜索关键词"
            className="input py-3 pl-12 text-base"
          />
        </div>

        {!trimmed && (
          <div className="mt-6">
            <p className="text-xs text-gray-500">试试这些关键词</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {SEARCH_SUGGESTIONS.map((word) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => setQuery(word)}
                  className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {trimmed && (
        <div className="mt-10">
          <p className="text-sm text-gray-500" role="status">
            找到 <span className="font-medium text-gray-900">{results.length}</span> 个结果
            {results.length > shown.length && `，显示前 ${shown.length} 个`}
          </p>

          {results.length === 0 ? (
            <div className="mt-10 rounded-lg border border-dashed border-gray-200 py-16 text-center">
              <p className="text-sm text-gray-500">
                没有找到与「{trimmed}」相关的讲道。
              </p>
              <p className="mt-2 text-xs text-gray-400">
                试试更短的关键词，或到{' '}
                <Link href="/archive" className="text-primary underline underline-offset-4">
                  全部讲道
                </Link>{' '}
                中按系列浏览。
              </p>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((sermon) => (
                <SermonCard key={sermon.slug} sermon={sermon} />
              ))}
            </div>
          )}
        </div>
      )}

      {!trimmed && (
        <div className="mt-14 border-t border-gray-100 pt-8">
          <h2 className="text-center text-sm font-medium text-gray-900">或从系列进入</h2>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SUGGESTED_SERIES.map((key) => (
              <Link
                key={key}
                href={`/series/${key}`}
                className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
              >
                {SERIES_NAMES.get(key) ?? key}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
