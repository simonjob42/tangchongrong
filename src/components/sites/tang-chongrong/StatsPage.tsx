import Link from 'next/link';
import { Clock, Layers, Library, UserCheck } from 'lucide-react';
import {
  CATEGORIES,
  EXCLUDED_OTHER_PREACHERS,
  SERIES,
  SERMONS,
  TOTAL_HOURS,
  TOTAL_SERMONS,
  TOTAL_TONG,
} from './data/sermons';

export function StatsPage() {
  const withDuration = SERMONS.filter((s) => s.durationSeconds > 0);
  const totalSeconds = withDuration.reduce((acc, s) => acc + s.durationSeconds, 0);
  const avgMinutes = Math.round(totalSeconds / withDuration.length / 60);
  const maxCount = Math.max(...SERIES.map((s) => s.count));
  const longest = [...withDuration].sort((a, b) => b.durationSeconds - a.durationSeconds).slice(0, 6);

  const byCategory = CATEGORIES.map((category) => {
    const items = SERMONS.filter((s) => s.category === category);
    return {
      category,
      count: items.length,
      hours: Math.round(items.reduce((acc, s) => acc + s.durationSeconds, 0) / 3600),
    };
  }).sort((a, b) => b.count - a.count);

  const tiles = [
    { icon: Library, label: '讲道与问答', value: String(TOTAL_SERMONS), unit: '篇' },
    { icon: UserCheck, label: '署名唐崇荣', value: String(TOTAL_TONG), unit: '篇' },
    { icon: Clock, label: '已标注时长合计', value: String(TOTAL_HOURS), unit: '小时' },
    { icon: Layers, label: '讲道系列', value: String(SERIES.length), unit: '个' },
  ];

  return (
    <div className="pt-10">
      <header className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">数据总览</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          这份档案里有什么
        </h1>
        <p className="mt-3 leading-relaxed text-gray-600">
          所有数字都来自公开播放列表的实际条目：{TOTAL_SERMONS} 篇讲道与问答，
          其中 {TOTAL_TONG} 篇在标题中署名唐崇荣牧师。时长以视频标注为准。
        </p>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map((tile) => (
          <div key={tile.label} className="card rounded-lg p-5">
            <tile.icon className="h-4 w-4 text-gray-400" />
            <p className="mt-4 text-3xl font-semibold tracking-tight text-gray-900">
              {tile.value}
              <span className="ml-1 text-sm font-normal text-gray-500">{tile.unit}</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">{tile.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">系列规模</h2>
          <p className="text-xs text-gray-500">按讲道数量排序</p>
        </div>
        <div className="mt-5 space-y-5">
          {[...SERIES]
            .sort((a, b) => b.count - a.count)
            .map((series) => (
              <div key={series.key}>
                <div className="flex items-baseline justify-between gap-3">
                  <Link
                    href={`/series/${series.key}`}
                    className="truncate text-sm font-medium text-gray-900 hover:underline"
                  >
                    {series.name}
                  </Link>
                  <span className="shrink-0 text-xs text-gray-500">
                    {series.count} 讲
                    {series.hours > 0 && ` · ${series.hours} 小时`}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-primary/80"
                    style={{ width: `${Math.max(4, (series.count / maxCount) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      </section>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">按分类</h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs text-gray-500">
                <tr>
                  <th className="px-4 py-2.5 font-medium">分类</th>
                  <th className="px-4 py-2.5 text-right font-medium">讲数</th>
                  <th className="px-4 py-2.5 text-right font-medium">时长</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {byCategory.map((row) => (
                  <tr key={row.category}>
                    <td className="px-4 py-2.5 text-gray-900">{row.category}</td>
                    <td className="px-4 py-2.5 text-right text-gray-600">{row.count}</td>
                    <td className="px-4 py-2.5 text-right text-gray-600">
                      {row.hours > 0 ? `${row.hours} 小时` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">最长的六篇</h2>
          <ol className="mt-4 divide-y divide-gray-100 rounded-lg border border-gray-200">
            {longest.map((sermon, index) => (
              <li key={sermon.slug}>
                <Link
                  href={`/ep/${sermon.slug}`}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50"
                >
                  <span className="mt-0.5 w-4 shrink-0 text-xs tabular-nums text-gray-400">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-1 text-sm text-gray-900">{sermon.topic}</span>
                    <span className="mt-0.5 block text-xs text-gray-500">
                      {sermon.seriesName}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-gray-500">{sermon.duration}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="mt-12 rounded-lg border border-gray-200 bg-gray-50/60 p-6">
        <h2 className="text-sm font-semibold text-gray-900">数据口径</h2>
        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-gray-600">
          <li>
            目录取自 YouTube 频道 @Gudao200 的公开播放列表，通过 yt-dlp 导出，抓取时间为 2026 年 11 月。
          </li>
          <li>
            播放列表中另有 {EXCLUDED_OTHER_PREACHERS} 条标注为其他讲员的崇拜视频，未收入本档案。
          </li>
          <li>
            现存条目中有 {TOTAL_SERMONS - TOTAL_TONG} 篇的标题未注明讲员，仍保留在「主日证道」系列中，并标注为「讲员未标注」。
          </li>
          <li>
            共 {withDuration.length} 篇有可读取的时长，平均约 {avgMinutes} 分钟；其余条目在源数据中未标注时长，不计入合计。
          </li>
        </ul>
      </section>
    </div>
  );
}
