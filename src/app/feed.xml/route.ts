import { SERMONS } from '@/components/sites/tang-chongrong/data/sermons';
import { SITE } from '@/components/sites/tang-chongrong/data/site';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const items = SERMONS.slice(0, 100);
  const lastBuildDate = new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>${escapeXml(SITE.name)}</title>
    <link>${SITE.url}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <itunes:author>唐崇荣</itunes:author>
    <itunes:category text="Religion &amp; Spirituality">
      <itunes:category text="Christianity" />
    </itunes:category>
${items
  .map((sermon) => {
    const url = `${SITE.url}/ep/${sermon.slug}`;
    const description = `${sermon.seriesName}${sermon.number != null ? `第 ${sermon.number} 讲` : ''}：${sermon.topic}（${sermon.duration}）。原始视频：https://www.youtube.com/watch?v=${sermon.youtubeId}`;

    return `    <item>
      <title>${escapeXml(`${sermon.topic} · ${sermon.seriesName}`)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(description)}</description>
      <category>${escapeXml(sermon.category)}</category>
    </item>`;
  })
  .join('\n')}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=7200',
    },
  });
}
