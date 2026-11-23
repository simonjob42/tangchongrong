import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ChevronRight, Clock } from 'lucide-react';
import { SermonList } from '@/components/sites/tang-chongrong/SermonList';
import {
  getSeries,
  getSeriesNeighbours,
  getSeriesSermons,
  SERIES,
} from '@/components/sites/tang-chongrong/data/sermons';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERIES.map((series) => ({ slug: series.key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeries(slug);
  if (!series) return { title: '未找到系列' };

  return {
    title: series.name,
    description: `${series.name}（${series.count} 讲）——${series.desc}`,
  };
}

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  const series = getSeries(slug);
  if (!series) notFound();

  const sermons = getSeriesSermons(series.key);
  const { prev, next } = getSeriesNeighbours(series.key);

  return (
    <div className="pt-8">
      <nav aria-label="面包屑" className="flex items-center gap-1 text-xs text-gray-500">
        <Link href="/" className="hover:text-gray-900">首页</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/series" className="hover:text-gray-900">讲道系列</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-400">{series.name}</span>
      </nav>

      <header className="mt-5 border-b border-gray-100 pb-8">
        <span className="badge-primary">{series.category}</span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          {series.name}
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">{series.desc}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span>{series.count} 讲</span>
          {series.hours > 0 && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              约 {series.hours} 小时
            </span>
          )}
        </div>
      </header>

      <div className="mt-8">
        <SermonList sermons={sermons} pageSize={24} showCategory={false} />
      </div>

      <nav className="mt-14 grid gap-3 border-t border-gray-100 pt-8 sm:grid-cols-2" aria-label="其他系列">
        {prev ? (
          <Link href={`/series/${prev.key}`} className="card-hover rounded-lg p-4">
            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
              <ArrowLeft className="h-3 w-3" />
              上一个系列
            </span>
            <p className="mt-1.5 text-sm font-medium text-gray-900">{prev.name}</p>
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <Link href={`/series/${next.key}`} className="card-hover rounded-lg p-4 sm:text-right">
            <span className="inline-flex items-center gap-1 text-xs text-gray-500 sm:flex-row-reverse">
              <ArrowRight className="h-3 w-3" />
              下一个系列
            </span>
            <p className="mt-1.5 text-sm font-medium text-gray-900">{next.name}</p>
          </Link>
        )}
      </nav>
    </div>
  );
}
