import type { Metadata } from 'next';
import { AboutPage } from '@/components/sites/tang-chongrong/AboutPage';

export const metadata: Metadata = {
  title: '关于唐崇荣',
  description:
    '唐崇荣牧师（Stephen Tong，1940— ）小传、神学脉络、主要事工与语录，以及本站的整理说明。',
};

export default function AboutRoute() {
  return <AboutPage />;
}
