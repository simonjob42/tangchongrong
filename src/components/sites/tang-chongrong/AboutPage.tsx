import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import {
  ABOUT_NOTE,
  MINISTRIES,
  QUOTES,
  SITE,
  THEMES,
  TIMELINE,
} from './data/site';

export function AboutPage() {
  return (
    <div className="pt-10">
      <header className="grid gap-8 border-b border-gray-100 pb-10 lg:grid-cols-[1fr_280px]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
            人物 · 改革宗神学家 · 布道家
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            唐崇荣
          </h1>
          <p className="mt-1 text-lg text-gray-500">Stephen Tong · 1940 —</p>
          <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-gray-600">
            <p>
              1940 年生于厦门鼓浪屿，三岁丧父，在母亲每日一小时的祷告中长大；1949 年随家移居印尼泗水，
              1957 年在归家途中归主并献身传道。此后六十余年，他以布道、逐卷讲经、神学教育与音乐事奉，
              成为华人与东南亚教会中最具影响力的改革宗讲员之一。
            </p>
            <p>
              他的讲道以神学严密、哲学引用丰富、论证层层推进著称：从宇宙性的问题开场，指出人本主义方案的失败，
              再回到圣经的答案，最后落在宣告与呼召。他同时是钢琴家、圣诗作者与教堂设计者，
              坚持真理、良善与美在同一位神里本为一体。
            </p>
          </div>
        </div>

        <div className="card h-fit rounded-lg p-5">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs text-gray-500">出生</dt>
              <dd className="mt-0.5 text-gray-900">1940 年 3 月 22 日 · 厦门鼓浪屿</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">神学传统</dt>
              <dd className="mt-0.5 text-gray-900">改革宗 / 加尔文主义</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">主要事工</dt>
              <dd className="mt-0.5 text-gray-900">STEMI · GRII · RICI</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">代表著作</dt>
              <dd className="mt-0.5 text-gray-900">《布道神学》《圣灵与福音》《三一神论》《理性·信仰·真理》</dd>
            </div>
          </dl>
          <a
            href={SITE.youtubeChannel}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            原始视频频道
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <section className="mt-12">
        <h2 className="section-title text-2xl">生平节点</h2>
        <ol className="mt-6 space-y-0">
          {TIMELINE.map((event) => (
            <li key={event.year} className="grid gap-2 border-l-2 border-gray-100 pb-7 pl-6 last:pb-0 sm:grid-cols-[88px_1fr] sm:gap-6">
              <span className="text-sm font-medium tabular-nums text-gray-900">{event.year}</span>
              <div className="-mt-0.5">
                <h3 className="text-sm font-semibold text-gray-900">{event.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{event.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 border-t border-gray-100 pt-10">
        <h2 className="section-title text-2xl">神学脉络</h2>
        <p className="section-subtitle max-w-2xl">
          六个反复出现在他讲道中的核心框架。理解它们，会更容易听懂他论证的走向。
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {THEMES.map((theme) => (
            <div key={theme.key} className="card rounded-lg p-5">
              <h3 className="text-base font-semibold tracking-tight text-gray-900">
                {theme.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{theme.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{theme.body}</p>
              <p className="mt-3 border-t border-gray-100 pt-3 text-xs leading-relaxed text-gray-500">
                {theme.practice}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-gray-100 pt-10">
        <h2 className="section-title text-2xl">主要事工</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {MINISTRIES.map((ministry) => (
            <div key={ministry.name} className="card rounded-lg p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold tracking-tight text-gray-900">
                  {ministry.name}
                </h3>
                <span className="badge-gray">{ministry.founded}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{ministry.full}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{ministry.description}</p>
              <p className="mt-3 text-xs font-medium text-gray-500">{ministry.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-gray-100 pt-10">
        <h2 className="section-title text-2xl">语录</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {QUOTES.map((quote) => (
            <blockquote key={quote.text} className="rounded-lg border border-gray-100 bg-gray-50/60 p-5">
              <p className="text-sm leading-relaxed text-gray-900">「{quote.text}」</p>
              <footer className="mt-3 text-xs text-gray-500">—— 唐崇荣 · {quote.source}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-gray-100 pt-10">
        <h2 className="section-title text-2xl">关于本站</h2>
        <ul className="mt-5 max-w-3xl space-y-3 text-sm leading-relaxed text-gray-600">
          {ABOUT_NOTE.map((note) => (
            <li key={note} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/disclaimer" className="btn-secondary">
            阅读完整声明
          </Link>
          <Link href="/stats" className="btn-ghost">
            查看数据口径
          </Link>
        </div>
      </section>
    </div>
  );
}
