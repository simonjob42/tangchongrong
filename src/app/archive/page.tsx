import type { Metadata } from 'next';
import { SermonList } from '@/components/sites/tang-chongrong/SermonList';
import { SERMONS, TOTAL_SERMONS } from '@/components/sites/tang-chongrong/data/sermons';
import { canonicalAlternates } from '@/components/sites/tang-chongrong/data/site';

export const metadata: Metadata = {
  title: '全部讲道',
  description: `浏览全部 ${TOTAL_SERMONS} 篇唐崇荣牧师讲道与问答，按分类、关键词与时长筛选。`,
  alternates: canonicalAlternates('/archive/'),
};

export default function ArchivePage() {
  return (
    <div className="pt-10">
      <header className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">档案</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          全部讲道
        </h1>
        <p className="mt-3 leading-relaxed text-gray-600">
          {TOTAL_SERMONS} 篇讲道与问答，按系列顺序排列。可以用关键词、分类或时长筛选，
          也可以切换成随机浏览。
        </p>
      </header>

      <div className="mt-8">
        <SermonList sermons={SERMONS} pageSize={24} />
      </div>
    </div>
  );
}
