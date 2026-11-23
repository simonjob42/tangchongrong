import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronRight, Clock, ExternalLink, Info } from 'lucide-react';
import {
  getPrevNextSermon,
  getRelatedSermons,
  getSeries,
} from './data/sermons';
import type { Sermon } from './types';
import { SermonCard } from './SermonCard';

export function SermonDetail({ sermon }: { sermon: Sermon }) {
  const series = getSeries(sermon.seriesKey);
  const { prev, next } = getPrevNextSermon(sermon.slug);
  const related = getRelatedSermons(sermon.slug, 3);
  const watchUrl = `https://www.youtube.com/watch?v=${sermon.youtubeId}`;

  return (
    <article className="pt-8">
      <nav aria-label="面包屑" className="flex items-center gap-1 text-xs text-gray-500">
        <Link href="/" className="hover:text-gray-900">首页</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/series" className="hover:text-gray-900">讲道系列</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/series/${sermon.seriesKey}`} className="hover:text-gray-900">
          {sermon.seriesName}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate text-gray-400">{sermon.topic}</span>
      </nav>

      <header className="mt-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge-primary">{sermon.seriesName}</span>
          {sermon.number != null && <span className="badge-gray">第 {sermon.number} 讲</span>}
          <span className="badge-gray">{sermon.category}</span>
          {sermon.speaker !== '唐崇荣' && <span className="badge-amber">讲员未标注</span>}
        </div>
        <h1 className="text-balance mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          {sermon.topic}
        </h1>
        {sermon.title !== sermon.topic && (
          <p className="mt-2 text-sm text-gray-500">原始标题：{sermon.title}</p>
        )}
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-black shadow-sm">
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${sermon.youtubeId}`}
                title={`${sermon.seriesName}：${sermon.topic}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 text-gray-500">
              <Clock className="h-4 w-4" />
              {sermon.duration}
            </span>
            <a
              href={watchUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-gray-700 hover:text-gray-900"
            >
              在 YouTube 打开
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {series && (
            <section className="mt-10 border-t border-gray-100 pt-8">
              <h2 className="text-lg font-semibold tracking-tight text-gray-900">
                关于「{series.name}」
              </h2>
              <p className="mt-3 leading-relaxed text-gray-600">{series.desc}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                <span>{series.count} 讲</span>
                {series.hours > 0 && <span>约 {series.hours} 小时</span>}
                <span>{series.category}</span>
              </div>
              <Link
                href={`/series/${series.key}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                查看完整系列
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </section>
          )}

          {(prev || next) && (
            <nav className="mt-10 grid gap-3 border-t border-gray-100 pt-8 sm:grid-cols-2" aria-label="相邻讲道">
              {prev ? (
                <Link href={`/ep/${prev.slug}`} className="card-hover rounded-lg p-4">
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                    <ArrowLeft className="h-3 w-3" />
                    上一讲
                  </span>
                  <p className="mt-1.5 line-clamp-2 text-sm font-medium text-gray-900">
                    {prev.topic}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {next && (
                <Link href={`/ep/${next.slug}`} className="card-hover rounded-lg p-4 sm:text-right">
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500 sm:flex-row-reverse">
                    <ArrowRight className="h-3 w-3" />
                    下一讲
                  </span>
                  <p className="mt-1.5 line-clamp-2 text-sm font-medium text-gray-900">
                    {next.topic}
                  </p>
                </Link>
              )}
            </nav>
          )}
        </div>

        <aside className="space-y-4">
          <div className="card rounded-lg p-5">
            <h2 className="text-sm font-semibold text-gray-900">这一讲的信息</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-gray-500">系列</dt>
                <dd className="text-right font-medium text-gray-900">{sermon.seriesName}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-gray-500">讲员</dt>
                <dd className="text-right text-gray-900">{sermon.speaker}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-gray-500">集数</dt>
                <dd className="text-right text-gray-900">{sermon.number != null ? `第 ${sermon.number} 讲` : '—'}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-gray-500">分类</dt>
                <dd className="text-right text-gray-900">{sermon.category}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-gray-500">时长</dt>
                <dd className="text-right text-gray-900">{sermon.duration}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-gray-500">视频 ID</dt>
                <dd className="text-right font-mono text-xs text-gray-500">{sermon.youtubeId}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-amber-100 bg-amber-50/60 p-5">
            <h2 className="flex items-center gap-1.5 text-sm font-semibold text-amber-900">
              <Info className="h-4 w-4" />
              说明
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-amber-900/80">
              视频由 YouTube 提供并受其服务条款约束。本站只整理公开目录，讲道版权归唐崇荣牧师与原发布机构所有。
            </p>
            <Link href="/disclaimer" className="mt-3 inline-block text-xs font-medium text-amber-900 underline underline-offset-4">
              阅读完整声明
            </Link>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-14 border-t border-gray-100 pt-10">
          <h2 className="section-title text-xl">相关讲道</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <SermonCard key={item.slug} sermon={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
