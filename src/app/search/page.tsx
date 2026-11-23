import type { Metadata } from 'next';
import { SearchPage } from '@/components/sites/tang-chongrong/SearchPage';
import { canonicalAlternates } from '@/components/sites/tang-chongrong/data/site';

export const metadata: Metadata = {
  title: '搜索',
  description: '在唐崇荣牧师的全部讲道与问答中搜索关键词、经卷与主题。',
  alternates: canonicalAlternates('/search/'),
};

export default function SearchRoute() {
  return <SearchPage />;
}
