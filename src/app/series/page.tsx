import type { Metadata } from 'next';
import { SeriesGrid } from '@/components/sites/tang-chongrong/SeriesCard';
import { CATEGORIES, SERIES, TOTAL_SERMONS } from '@/components/sites/tang-chongrong/data/sermons';

export const metadata: Metadata = {
  title: '讲道系列',
  description: '唐崇荣牧师的 17 个讲道系列：圣经逐卷讲解、专题系列、布道信息、实践神学、主日证道与问答。',
};

export default function SeriesPage() {
  return (
    <div className="pt-10">
      <header className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">系列</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          讲道系列
        </h1>
        <p className="mt-3 leading-relaxed text-gray-600">
          {SERIES.length} 个系列、{TOTAL_SERMONS} 篇讲道。逐卷讲解适合系统收听，
          专题与布道系列适合按主题检索。
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {CATEGORIES.map((category) => {
          const items = SERIES.filter((series) => series.category === category);
          if (items.length === 0) return null;

          return (
            <section key={category}>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                  {category}
                </h2>
                <span className="text-xs text-gray-500">{items.length} 个系列</span>
              </div>
              <div className="mt-5">
                <SeriesGrid items={items} />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
