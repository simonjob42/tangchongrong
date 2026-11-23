import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Hero } from '@/components/sites/tang-chongrong/Hero';
import { SeriesGrid } from '@/components/sites/tang-chongrong/SeriesCard';
import { SERIES } from '@/components/sites/tang-chongrong/data/sermons';
import {
  FeaturedCollections,
  HomeCta,
  ReadingGuide,
  SourceNote,
  ThemesPreview,
} from '@/components/sites/tang-chongrong/HomeSections';

const FEATURED_SERIES = [
  'yuehan-fuyin',
  'chuangshiji',
  'xibolaishu',
  'luomashu',
  'yage-shu',
  'qishilu-qijian-jiaohui',
  'shangdi-de-huzhao',
  'qa-jingxuan',
  'grc-zhuri',
];

export default function HomePage() {
  const featured = FEATURED_SERIES.map((key) => SERIES.find((s) => s.key === key)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s),
  );

  return (
    <>
      <div className="-mx-4">
        <Hero />
      </div>

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">主要系列</h2>
            <p className="section-subtitle">先从一卷书或一个专题进入。</p>
          </div>
          <Link
            href="/series"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            全部 {SERIES.length} 个系列
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-6">
          <SeriesGrid items={featured} />
        </div>
      </section>

      <section className="mt-16 border-t border-gray-100 pt-10">
        <h2 className="section-title">编辑精选</h2>
        <p className="section-subtitle">三条不同的进入路线：初识、逐卷、生活实践。</p>
        <div className="mt-6">
          <FeaturedCollections />
        </div>
      </section>

      <section className="mt-16 border-t border-gray-100 pt-10">
        <h2 className="section-title">怎么使用这份档案</h2>
        <p className="section-subtitle">不需要按顺序读完，按你需要的方式进入就好。</p>
        <div className="mt-6">
          <ReadingGuide />
        </div>
      </section>

      <section className="mt-16 border-t border-gray-100 pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">神学脉络</h2>
            <p className="section-subtitle">六个反复出现的核心框架。</p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            读完整小传
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-6">
          <ThemesPreview />
        </div>
      </section>

      <div className="mt-16">
        <HomeCta />
      </div>

      <div className="mt-6">
        <SourceNote />
      </div>
    </>
  );
}
