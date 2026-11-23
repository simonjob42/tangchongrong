import type { Metadata } from 'next';
import { StatsPage } from '@/components/sites/tang-chongrong/StatsPage';
import { TOTAL_SERMONS } from '@/components/sites/tang-chongrong/data/sermons';

export const metadata: Metadata = {
  title: '数据总览',
  description: `唐崇荣讲道档案的规模、系列分布与数据口径：${TOTAL_SERMONS} 篇讲道与问答的统计。`,
};

export default function StatsRoute() {
  return <StatsPage />;
}
