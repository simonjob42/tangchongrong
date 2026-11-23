import type { MetadataRoute } from 'next';
import { SITE } from '@/components/sites/tang-chongrong/data/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
