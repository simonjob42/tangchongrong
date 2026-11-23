import type { MetadataRoute } from 'next';
import { SERIES, SERMONS } from '@/components/sites/tang-chongrong/data/sermons';
import { SITE } from '@/components/sites/tang-chongrong/data/site';

// 构建时生成，URL 带尾斜杠以匹配 next.config.ts 的 trailingSlash。
const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' }> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/series/', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/archive/', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/qa/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/stats/', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/disclaimer/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/search/', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE.url}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...SERIES.map((series) => ({
      url: `${SITE.url}/series/${series.key}/`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...SERMONS.map((sermon) => ({
      url: `${SITE.url}/ep/${sermon.slug}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
