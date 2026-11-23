import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { SERIES, TOTAL_HOURS, TOTAL_SERMONS } from './data/sermons';
import { QUOTES, SITE } from './data/site';

export function Hero() {
  const featured = QUOTES[0];

  return (
    <section className="relative overflow-hidden border-b border-gray-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_0%,rgba(0,0,0,0.045),transparent)]"
      />
      <div className="container-main relative py-14 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
              1940–2026 · 华人改革宗讲道档案
            </p>
            <h1 className="text-balance mt-4 text-4xl font-semibold leading-[1.15] tracking-tight text-gray-900 sm:text-5xl">
              把唐崇荣牧师六十年的讲道，
              <span className="block text-gray-500">按系列认真整理一遍</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600">
              {SITE.tagline}。创世记、约翰福音、罗马书、希伯来书逐卷讲解，启示录七间教会、
              主日证道与问答，都在这里按脉络排好。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/ep/yuehan-fuyin-001" className="btn-primary">
                <Play className="h-4 w-4" />
                从约翰福音第一讲开始
              </Link>
              <Link href="/archive" className="btn-secondary">
                浏览全部讲道
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-gray-100 pt-6">
              <div>
                <dt className="text-xs text-gray-500">讲道与问答</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                  {TOTAL_SERMONS}
                  <span className="ml-1 text-sm font-normal text-gray-500">篇</span>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">累计时长</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                  {TOTAL_HOURS}
                  <span className="ml-1 text-sm font-normal text-gray-500">小时</span>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">讲道系列</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                  {SERIES.length}
                  <span className="ml-1 text-sm font-normal text-gray-500">个</span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="card rounded-xl p-7 lg:p-8">
              <span className="text-5xl leading-none text-gray-200" aria-hidden>
                &ldquo;
              </span>
              <blockquote className="mt-2 text-lg font-medium leading-relaxed tracking-tight text-gray-900">
                {featured.text}
              </blockquote>
              <p className="mt-5 text-sm text-gray-500">—— 唐崇荣 · {featured.source}</p>

              <div className="mt-7 border-t border-gray-100 pt-5">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  本档案包含
                </p>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  {[...SERIES].sort((a, b) => b.count - a.count).slice(0, 4).map((series) => (
                    <li key={series.key} className="flex items-center justify-between gap-3">
                      <Link
                        href={`/series/${series.key}`}
                        className="truncate underline-offset-4 hover:text-gray-900 hover:underline"
                      >
                        {series.name}
                      </Link>
                      <span className="shrink-0 text-xs text-gray-400">{series.count} 讲</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
