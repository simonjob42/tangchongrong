import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SermonDetail } from '@/components/sites/tang-chongrong/SermonDetail';
import { getSermon, SERMONS } from '@/components/sites/tang-chongrong/data/sermons';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sermon = getSermon(slug);
  if (!sermon) return { title: '未找到讲道' };

  return {
    title: `${sermon.topic} · ${sermon.seriesName}`,
    description: `${sermon.seriesName}${sermon.number != null ? `第 ${sermon.number} 讲` : ''}：${sermon.topic}（${sermon.duration}）。唐崇荣牧师讲道视频。`,
    openGraph: {
      title: `${sermon.topic} | ${sermon.seriesName}`,
      description: `唐崇荣牧师：${sermon.topic}`,
      images: [{ url: sermon.thumbnail, width: 480, height: 360, alt: sermon.topic }],
    },
  };
}

export default async function SermonPage({ params }: Props) {
  const { slug } = await params;
  const sermon = getSermon(slug);
  if (!sermon) notFound();

  return <SermonDetail sermon={sermon} />;
}

export const dynamicParams = false;

export function generateStaticParams() {
  // Static export: every sermon page must exist at build time.
  return SERMONS.map((sermon) => ({ slug: sermon.slug }));
}
