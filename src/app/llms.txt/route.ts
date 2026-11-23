import {
  EXCLUDED_OTHER_PREACHERS,
  SERIES,
  TOTAL_HOURS,
  TOTAL_SERMONS,
  TOTAL_TONG,
} from '@/components/sites/tang-chongrong/data/sermons';
import { SITE } from '@/components/sites/tang-chongrong/data/site';

export const dynamic = 'force-static';

export async function GET() {
  const seriesLines = SERIES.map(
    (series) =>
      `- ${series.name}（${series.count} 讲，约 ${series.hours} 小时）：${SITE.url}/series/${series.key} — ${series.desc}`,
  ).join('\n');

  const text = `# ${SITE.name}

> ${SITE.tagline}。收录 ${TOTAL_SERMONS} 篇讲道与问答（其中 ${TOTAL_TONG} 篇标题署名唐崇荣牧师），共约 ${TOTAL_HOURS} 小时，整理为 ${SERIES.length} 个系列。

本站是一个独立整理的非官方档案，不是唐崇荣牧师或 STEMI / GRII / RICI 的官方网站。讲道视频由 YouTube 提供，版权归原讲员与出版机构所有。

## 主要页面

- 首页：${SITE.url}/
- 讲道系列总览：${SITE.url}/series
- 全部讲道（可按关键词、分类、时长筛选）：${SITE.url}/archive
- 问答精选：${SITE.url}/qa
- 搜索：${SITE.url}/search
- 数据总览：${SITE.url}/stats
- 关于唐崇荣（小传、神学脉络、事工、语录）：${SITE.url}/about
- 版权与声明：${SITE.url}/disclaimer
- RSS 订阅：${SITE.url}/feed.xml

## 讲道系列

${seriesLines}

## 单篇讲道

每篇讲道有独立页面：${SITE.url}/ep/{slug}/
页面包含：主题、所属系列与集数、时长、YouTube 嵌入播放器、系列简介、相邻讲道与相关讲道。

## 内容说明

- 目录来源：YouTube 频道 @Gudao200 的公开播放列表，通过 yt-dlp 导出，抓取于 2026 年 11 月。
- 播放列表中标注为其他讲员的 ${EXCLUDED_OTHER_PREACHERS} 条崇拜视频未收入本档案；标题未注明讲员的条目保留并标注为「讲员未标注」。
- 部分条目在原数据中未标注时长。
- 本站自行撰写的导读文字采用 CC BY 4.0 许可；讲道内容版权归原权利人所有。

## 联系

原始视频频道：${SITE.youtubeChannel}
`;

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=7200',
    },
  });
}
