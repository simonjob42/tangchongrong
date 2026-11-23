import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircleQuestion } from 'lucide-react';
import { SermonList } from '@/components/sites/tang-chongrong/SermonList';
import { SERMONS } from '@/components/sites/tang-chongrong/data/sermons';

const qaSermons = SERMONS.filter((sermon) => sermon.category === '问答');

export const metadata: Metadata = {
  title: '问答精选',
  description: `唐崇荣牧师 ${qaSermons.length} 篇信仰问答：婴儿洗、异端分辨、圣灵充满、苦难、传福音、教会生活等实际疑难。`,
};

export default function QaPage() {
  return (
    <div className="pt-10">
      <header className="max-w-2xl">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
          <MessageCircleQuestion className="h-3.5 w-3.5" />
          问答
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          问答精选
        </h1>
        <p className="mt-3 leading-relaxed text-gray-600">
          信仰生活中最实际的疑难：婴儿洗、异端分辨、圣灵充满、苦难、传福音、教会生活。
          共 {qaSermons.length} 篇。可以直接搜索你的问题。
        </p>
        <p className="mt-3 text-sm text-gray-500">
          也可以到{' '}
          <Link href="/archive" className="text-primary underline underline-offset-4">
            全部讲道
          </Link>{' '}
          中按系列浏览。
        </p>
      </header>

      <div className="mt-8">
        <SermonList sermons={qaSermons} pageSize={24} />
      </div>
    </div>
  );
}
