import Link from 'next/link';
import { SERIES, TOTAL_HOURS, TOTAL_SERMONS } from './data/sermons';
import { SITE } from './data/site';

const columns = [
  {
    title: '档案',
    links: [
      { href: '/series', label: '讲道系列' },
      { href: '/archive', label: '全部讲道' },
      { href: '/qa', label: '问答精选' },
      { href: '/stats', label: '数据总览' },
    ],
  },
  {
    title: '检索',
    links: [
      { href: '/search', label: '全文搜索' },
      { href: '/feed.xml', label: 'RSS 订阅' },
      { href: '/llms.txt', label: 'llms.txt' },
      { href: '/about', label: '关于本站' },
    ],
  },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const topSeries = [...SERIES].sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="container-main py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-semibold text-white">
                唐
              </span>
              <span className="text-base font-semibold tracking-tight text-gray-900">
                {SITE.name}
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600">
              收录 {TOTAL_SERMONS} 篇公开讲道与问答，约 {TOTAL_HOURS} 小时，整理为{' '}
              {SERIES.length} 个系列。独立档案，非官方站点。
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <a
                href={SITE.youtubeChannel}
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline"
              >
                YouTube 频道 ↗
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline"
              >
                {SITE.email}
              </a>
              <Link
                href="/disclaimer"
                className="text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline"
              >
                版权与声明
              </Link>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6">
          <p className="text-xs font-medium text-gray-500">主要系列</p>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
            {topSeries.map((series) => (
              <Link
                key={series.key}
                href={`/series/${series.key}`}
                className="text-xs text-gray-500 hover:text-gray-900"
              >
                {series.name}（{series.count}）
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {CURRENT_YEAR} {SITE.name} · 讲道版权归原讲员与出版机构所有</p>
          <p>非官方整理 · 仅供学习与查阅索引</p>
        </div>
      </div>
    </footer>
  );
}
