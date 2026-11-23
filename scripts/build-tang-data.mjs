#!/usr/bin/env node
/**
 * Build structured sermon data from yt-dlp TSV exports in data/yt-dlp.
 * Output: src/components/sites/tang-chongrong/data/sermons.ts
 *
 * Series assignment is driven by the title first (playlists often mix series),
 * falling back to the playlist the video was harvested from.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data', 'yt-dlp');
const OUT = path.join(ROOT, 'src/components/sites/tang-chongrong/data/sermons.ts');

const SERIES = [
  {
    key: 'yuehan-fuyin', file: 'yuehan-fuyin.txt', name: '约翰福音讲解', short: '约翰福音', category: '圣经讲解',
    desc: '从「太初有道」到复活后的显现，逐段讲解约翰福音，是唐牧师篇幅最长的单卷书系列。',
    match: /约翰福音/, numRe: /(?:约翰福音讲解|讲解约翰福音)[\s#＃]*0*(\d{1,3})/,
    headRe: /^(?:唐崇荣|唐崇榮)?\s*(?:约翰福音讲解|讲解约翰福音)[\s#＃]*0*\d{1,3}[#＃\s]*/,
  },
  {
    key: 'yage-shu', file: 'yage-shu.txt', name: '雅各书讲解', short: '雅各书', category: '圣经讲解',
    desc: '信心与行为、舌头、属天智慧、祷告——雅各书的实践神学。',
    match: /雅各书/, numRe: /雅各书(?:讲解)?[\s#＃]*0*(\d{1,3})/, headRe: /^(?:唐崇荣|唐崇榮)?\s*雅各书(?:讲解)?[\s#＃]*0*\d{1,3}[#＃\s]*/,
  },
  {
    key: 'luomashu', file: 'luomashu.txt', name: '罗马书讲解', short: '罗马书', category: '圣经讲解',
    desc: '因信称义的核心书信，涵盖罪、称义、成圣、预定与以色列的奥秘。',
    match: /罗马书/, numRe: /罗马书(?:讲解)?(?:第)?[\s#＃]*0*(\d{1,3})/,
    headRe: /^(?:唐崇荣|唐崇榮)?\s*(?:讲解)?\s*罗马书(?:讲解)?(?:第)?[\s#＃]*0*\d{1,3}\s*讲?[#＃\s]*/,
  },
  {
    key: 'xibolaishu', file: 'xibolaishu.txt', name: '希伯来书讲解', short: '希伯来书', category: '圣经讲解',
    desc: '从基督超越天使与摩西，到信心的见证与云彩般的见证人——逐章讲解希伯来书。',
    match: /希伯来书/,
    numRe: /希伯来书[\s#＃]*0*(\d{1,3})|^0*(\d{1,3})\s*[、.．]/,
    headRe: /^(?:希伯来书[\s#＃]*0*\d{1,3}|0*\d{1,3}\s*[、.．])\s*/,
  },
  {
    key: 'qishilu-qijian-jiaohui', file: 'jidutu-shenghuo.txt', name: '启示录七间教会', short: '七间教会', category: '圣经讲解',
    desc: '《启示录》第 2–3 章：基督给以弗所、士每拿、别迦摩、推雅推喇、撒狄、非拉铁非、老底嘉七间教会的信息。2021 年 GRII 主日系列。',
    match: /七間教會|七间教会/,
    numRe: /\(\s*(\d{1,2})\s*\)\s*[-–—]/,
    headRe: /^《啟示錄》\s*/, headRe2: /\(\s*\d{1,2}\s*\)\s*[-–—][\s\S]*$/,
  },
  {
    key: 'chuangshiji', file: 'xinyue-shenxue-4.txt', name: '创世记讲解', short: '创世记', category: '圣经讲解',
    desc: '从创造、堕落、洪水到列祖的应许，逐章讲解创世记——整本圣经的根基。',
    match: /创世记|創世記/,
    numRe: /(?:创世记|創世記)[\s#＃]*0*(\d{1,4})/,
    headRe: /^(?:创世记|創世記)[\s#＃]*0*\d{1,4}[#＃\s]*/,
  },
  {
    key: 'shangdi-de-huzhao', file: 'xinyue-shenxue.txt', name: '圣经中上帝对人的呼召', short: '上帝的呼召', category: '专题系列',
    desc: '从创造中的使命到基督里的恩召，按圣经整体脉络梳理神对人的呼召。2024–2025 年 GRII 主日系列。',
    match: /圣经中上帝对人的呼召|God[’']?s\s+(?:Calling|Call)|The\s+Biblical\s+Call/i,
    numRe: /[（(]\s*(\d{1,3})\s*[）)]/,
    headRe: /^(?:圣经中上帝对人的呼召|God[’']?s\b[^（(]*|The\s+Biblical\s+Call[^（(]*)\s*[（(]\s*\d{1,3}\s*[）)][\s\S]*$/i,
  },
  {
    key: 'ganqing-shenghua', file: 'ganqing-shenghua.txt', name: '基督徒感情的圣化', short: '感情圣化', category: '专题系列',
    desc: '爱、怒、惧、忧、喜、渴慕、失败、成就感——在基督里重新认识并圣化人的情感。',
    match: /感情(?:的)?圣化/, numRe: /感情(?:的)?圣化[\s#＃]*0*(\d{1,3})/,
    headRe: /^(?:唐崇荣|唐崇榮)?\s*基督徒的感情圣化[\s#＃]*0*\d{1,3}[#＃\s]*/,
  },
  {
    key: 'shengming-jiazhi', file: 'shengming-jiazhi.txt', name: '生命价值的重建', short: '生命价值', category: '专题系列',
    desc: '在虚无主义与物质主义之间，重建人被造的价值与尊严。',
    match: /生命价值的重建/, numRe: /生命价值的重建[\s#＃]*0*(\d{1,3})/,
    headRe: /^生命价值的重建[\s#＃]*0*\d{1,3}[#＃\s]*/,
  },
  {
    key: 'xinyang-neihan', file: 'xinyang-neihan.txt', name: '信仰的内涵', short: '信仰内涵', category: '专题系列',
    desc: '信仰不是口号，而是可以言说、可以活出的完整体系。',
    match: /信仰的内涵/, numRe: /信仰的内涵[\s#＃]*0*(\d{1,3})/,
    headRe: /^信仰的内涵[\s#＃]*0*\d{1,3}[#＃\s]*/,
  },
  {
    key: 'weishime-fuyin', file: 'weishime-fuyin.txt', name: '为什么人类需要福音', short: '需要福音', category: '布道信息',
    desc: '从人的困境出发，论证福音的必需性。',
    match: /为什么人类需要福音/, numRe: /为什么人类需要福音[\s#＃]*0*(\d{1,3})/,
    headRe: /^为什么人类需要福音[\s#＃]*0*\d{1,3}[#＃\s]*/,
  },
  {
    key: 'zui-shi-shenme', file: 'zui-shi-shenme.txt', name: '罪是什么？', short: '罪是什么', category: '专题系列',
    desc: '亏缺神的荣耀、位分的失落、罪人因信称义——对罪的三个层面剖析。',
    match: /^罪是什么/, numRe: /罪是什么？?[\s#＃]*0*(\d{1,3})/,
    headRe: /^罪是什么？?[\s#＃]*0*\d{1,3}[#＃\s]*/,
  },
  {
    key: 'ji-du-panwang', file: 'ji-du-panwang.txt', name: '基督是人类的盼望', short: '基督盼望', category: '布道信息',
    desc: '21 世纪人类的困境与盼望，基督作为唯一的答案。',
    match: /人类的?(?:的)?困境|人类的?盼望/, numRe: /盼望[\s#＃]*0*(\d{1,3})/,
    headRe: /^(?:\d{1,2}世纪)?人类的?的?困境与盼望[\s#＃]*0*\d{1,3}[#＃\s]*/, headRe2: /^基督\s*人类的?的?盼望[\s#＃]*0*\d{1,3}[#＃\s]*/,
  },
  {
    key: 'budao-hui', file: 'budao-hui.txt', name: '布道会信息', short: '布道会', category: '布道信息',
    desc: '巴黎、台北、儿童、青少年布道会现场信息：耶稣是谁？',
    match: /布道会|耶稣是谁/, numRe: /(?:耶稣是谁？?|布道会)[\s#＃]*(?:0*(\d{1,2}))?/,
  },
  {
    key: 'rensheng-kuiqian', file: 'rensheng-kuiqian.txt', name: '人生的亏欠', short: '人生亏欠', category: '专题系列',
    desc: '人欠神什么、欠人什么、欠自己什么。',
    match: /人生的亏欠/, numRe: /人生的亏欠[\s#＃]*0*(\d{1,3})/,
    headRe: /^人生的亏欠[\s#＃]*0*\d{1,3}[#＃\s]*/,
  },
  {
    key: 'hunyin-jiating', file: 'hunyin-jiating.txt', name: '婚姻与家庭中的基督宝座', short: '婚姻家庭', category: '实践神学',
    desc: '让基督在婚姻与家庭中掌权。',
    match: /婚姻与家庭/, numRe: /婚姻与家庭中(?:的)?基督(?:的)?宝座[\s#＃]*0*(\d{1,3})/,
    headRe: /^婚姻与家庭中(?:的)?基督(?:的)?宝座\s*0*\d{1,3}[#＃\s]*/,
  },
  {
    key: 'fumu-shisbiao', file: 'fumu-shisbiao.txt', name: '为人父母，为人师表', short: '父母师表', category: '实践神学',
    desc: '教育的失败、教育的目的、人格建立的影响因素。',
    match: /为人父母/, numRe: /为人父母[\s，,]*为人师表[\s#＃]*0*(\d{1,3})/,
    headRe: /^为人父母[\s，,]*为人师表\s*0*\d{1,3}[#＃\s]*/,
  },
  {
    key: 'peilinghui', file: 'peilinghui.txt', name: '培灵会信息', short: '培灵会', category: '培灵信息',
    desc: '信仰与生活、何谓事奉、公共崇拜的意义。',
    match: null, numRe: null,
  },
  {
    key: 'grc-zhuri', file: 'grc-zhuri.txt', name: '归正福音教会主日证道', short: '主日证道', category: '主日证道',
    desc: '雅加达归正福音教会（GRII）主日崇拜会的证道与问答实录。',
    match: null, numRe: /\((\d{1,3})\)/, headRe: /^Q&A\s*(?:\(\d+\))?\s*[-–]?\s*/,
  },
  {
    key: 'qa-jingxuan', file: 'qa-jingxuan.txt', name: '问答精选', short: '问答', category: '问答',
    desc: '婴儿洗、异端分辨、圣灵充满、苦难、传福音——信仰生活的实际疑难。',
    match: /^Q&A\s*[^(\s]|^問|^问/, numRe: null, headRe: /^Q&A\s*/,
  },
  {
    key: 'jiangdao-ji', file: 'jiangdao-ji.txt', name: '经典讲道集', short: '经典讲道', category: '讲道集',
    desc: '世界华福会、圣灵论、基督论等经典专题与布道讲道。',
    match: null, numRe: null,
  },
];

const TONG_RE = /唐崇荣|唐崇榮|Stephen\s*Tong|Tong\s*Chong[- ]?jung/i;
// Entries in the GRII playlist that name another preacher are not part of this archive.
const OTHER_PREACHER_RE = /Chai\s*Pengyuan|Zhong\s*Zhihui|柴鹏远|柴鵬遠|钟志辉|鍾志輝|解開武|谢伟光|謝偉光|萧鑫贤|蕭鑫賢|Ivan\s*Kristiono|Evangelist|(?:傳|传)道(?!書|书)|講員[：:]\s*(?!.*唐)/i;

const JUNK_SEGMENTS = [
  /^圣经讲解$/, /^唐崇荣(牧师)?(信息精选)?$/, /^唐崇榮(牧師)?$/, /^信息精选$/,
  /^福音信息$/, /^基督教信仰$/, /^唐崇荣布道(会|信息)?$/, /^儿童布道会$/,
  /^青少年布道会$/, /^唐崇荣台北布道会$/, /^唐崇荣布道$/, /^唐崇榮$/, /^牧师$/,
];

// Known title typos in the source playlists (kept explicit so the fix is auditable).
const TITLE_FIXES = new Map([
  ['创世记1041', '创世记104'], // appears between 103 and 105 in the playlist
]);

function parseDuration(s) {
  if (!s || s === 'NA') return 0;
  const parts = s.split(':').map(Number);
  if (parts.some(Number.isNaN)) return 0;
  return parts.reduce((acc, n) => acc * 60 + n, 0);
}

function formatDuration(sec) {
  if (!sec) return '时长未标注';
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h > 0 ? `${h} 小时 ${m} 分` : `${m} 分钟`;
}

function splitSegments(title) {
  return title
    .split(/[#＃]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function cleanTopic(title, series, number) {
  let t = title
    .replace(/^(?:唐崇榮|唐崇荣)\s*(?:牧师|牧師)?\s*[:：]?\s*/u, '')
    .replace(/\s*[-－–]\s*Rev\.?\s*(?:Dr\.?\s*)?Stephen\s+Tong\s*$/i, '')
    .replace(/\s*[-－–]\s*唐崇榮\s*$/u, '')
    .trim();

  // Drop the series heading + its episode number from the front.
  if (series.headRe) t = t.replace(series.headRe, '').trim();
  if (series.headRe2) t = t.replace(series.headRe2, '').trim();
  t = t.replace(new RegExp(`^${series.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*0*\\d{0,3}`), '').trim();
  // A leftover leading episode number ("022 ..."), but never the leading digits of a year/topic.
  t = t.replace(/^[#＃\s·|－-]+/, '').replace(/^0*\d{1,3}\s*(?:讲)?(?=[#＃\s·]|$)/, '').trim();
  t = t.replace(/^[#＃\s·|－-]+/, '').trim();

  const segments = splitSegments(t).filter(
    (s) => !JUNK_SEGMENTS.some((re) => re.test(s)) && !/^(?:唐崇荣|唐崇榮)/.test(s),
  );
  t = segments.join(' · ').replace(/\s+/g, ' ').trim();
  // Tidy scripture references: "罗1： 1- 15" -> "罗1：1-15".
  t = t.replace(/([：:])\s+/g, '$1').replace(/\s*-\s*/g, '-');
  t = t.replace(/^[，,、：:；;·\s]+/, '').trim();
  if (!t) t = number ? `第 ${number} 讲` : title;
  return t;
}

function extractYear(title) {
  const m = title.match(/(20\d{2})\s*年/) || title.match(/(20\d{2})[/-]\d{1,2}[/-]\d{1,2}/);
  if (m) return Number(m[1]);
  const m2 = title.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+(20\d{2})/i);
  if (m2) return Number(m2[2]);
  return undefined;
}

const sermons = [];
const seen = new Set();
let skippedOther = 0;

for (const playlist of SERIES) {
  const file = path.join(DATA_DIR, playlist.file);
  if (!fs.existsSync(file)) {
    console.warn(`missing ${file}`);
    continue;
  }
  const lines = fs.readFileSync(file, 'utf8').split('\n').filter((l) => l.includes('|'));
  for (const line of lines) {
    // Titles may themselves contain "|" (e.g. "... - 唐崇榮牧師 | 印尼歸正福音教會...").
    // The id is the first field and the duration is the last, so split only at the edges.
    const first = line.indexOf('|');
    const last = line.lastIndexOf('|');
    if (first === -1 || last <= first) continue;
    const videoId = line.slice(0, first);
    const rawTitle = line.slice(first + 1, last);
    const durationStr = line.slice(last + 1);
    if (!videoId || !rawTitle || rawTitle === 'NA') continue;
    if (seen.has(videoId)) continue;
    seen.add(videoId);

    const rawTrimmed = rawTitle.trim();
    const title = TITLE_FIXES.get(rawTrimmed) ?? rawTrimmed;
    // Title-first assignment; fall back to the playlist it came from.
    const owner = SERIES.find((s) => s.match && s.match.test(title)) ?? playlist;

    const isTong = TONG_RE.test(title);
    if (!isTong && OTHER_PREACHER_RE.test(title)) {
      skippedOther += 1;
      continue;
    }
    // Non-GRII playlists are curated from Tong's own ministry; the GRII playlist
    // also carries services whose preacher is not named in the title.
    const speaker = isTong || owner.key !== 'grc-zhuri' ? '唐崇荣' : '未标注';

    const numberMatch = owner.numRe ? title.match(owner.numRe) : null;
    // Some numbered-title formats need an alternation; take the first capture that matched.
    const captured = numberMatch ? numberMatch.slice(1).find((v) => v != null) : undefined;
    const number = captured ? Number(captured) : undefined;

    const durationSeconds = parseDuration(durationStr);
    const topic = cleanTopic(title, owner, number);
    const slug = number
      ? `${owner.key}-${String(number).padStart(3, '0')}`
      : `${owner.key}-${videoId}`;

    sermons.push({
      id: videoId,
      slug,
      seriesKey: owner.key,
      seriesName: owner.name,
      seriesShort: owner.short,
      category: owner.category,
      number,
      speaker,
      title,
      topic,
      duration: formatDuration(durationSeconds),
      durationSeconds,
      year: extractYear(title),
      youtubeId: videoId,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    });
  }
}

// Duplicate numbered slugs (two videos claiming episode N): keep the first, suffix the rest.
const slugCount = new Map();
for (const s of sermons) {
  const c = slugCount.get(s.slug) ?? 0;
  slugCount.set(s.slug, c + 1);
  if (c > 0) s.slug = `${s.slug}-${s.id.slice(0, 4)}`;
}

sermons.sort((a, b) => {
  const si = SERIES.findIndex((s) => s.key === a.seriesKey);
  const sj = SERIES.findIndex((s) => s.key === b.seriesKey);
  if (si !== sj) return si - sj;
  if (a.number != null && b.number != null) return a.number - b.number;
  if (a.number != null) return -1;
  if (b.number != null) return 1;
  return 0;
});

const totalSeconds = sermons.reduce((acc, s) => acc + s.durationSeconds, 0);
const seriesStats = SERIES.map((s) => {
  const items = sermons.filter((x) => x.seriesKey === s.key);
  return {
    key: s.key, name: s.name, short: s.short, category: s.category, desc: s.desc,
    count: items.length,
    hours: Math.round(items.reduce((a, x) => a + x.durationSeconds, 0) / 3600),
  };
}).filter((s) => s.count > 0);

const categories = [...new Set(seriesStats.map((s) => s.category))];

fs.mkdirSync(path.dirname(OUT), { recursive: true });

const header = `// AUTO-GENERATED by scripts/build-tang-data.mjs — do not edit by hand.
// Source: YouTube playlists exported with yt-dlp (${sermons.length} videos).

export interface Sermon {
  id: string;
  slug: string;
  seriesKey: string;
  seriesName: string;
  seriesShort: string;
  category: string;
  number?: number;
  speaker: string;
  title: string;
  topic: string;
  duration: string;
  durationSeconds: number;
  year?: number;
  youtubeId: string;
  thumbnail: string;
}

export interface SeriesInfo {
  key: string;
  name: string;
  short: string;
  category: string;
  desc: string;
  count: number;
  hours: number;
}

export const TOTAL_SERMONS = ${sermons.length};
export const TOTAL_TONG = ${sermons.filter((s) => s.speaker === '唐崇荣').length};
export const EXCLUDED_OTHER_PREACHERS = ${skippedOther};
export const TOTAL_HOURS = ${Math.round(totalSeconds / 3600)};
export const CATEGORIES: string[] = ${JSON.stringify(categories)};
export const SERIES: SeriesInfo[] = ${JSON.stringify(seriesStats, null, 2)};
export const SERMONS: Sermon[] = ${JSON.stringify(sermons, null, 2)};

export function getSermon(slug: string): Sermon | undefined {
  return SERMONS.find((s) => s.slug === slug);
}

export function getSeries(key: string): SeriesInfo | undefined {
  return SERIES.find((s) => s.key === key);
}

export function getSeriesSermons(key: string): Sermon[] {
  return SERMONS.filter((s) => s.seriesKey === key);
}

export function getSeriesNeighbours(key: string): { prev?: SeriesInfo; next?: SeriesInfo } {
  const idx = SERIES.findIndex((s) => s.key === key);
  return { prev: idx > 0 ? SERIES[idx - 1] : undefined, next: idx >= 0 && idx < SERIES.length - 1 ? SERIES[idx + 1] : undefined };
}

export function getRelatedSermons(slug: string, limit = 6): Sermon[] {
  const current = getSermon(slug);
  if (!current) return SERMONS.slice(0, limit);
  return [
    ...getSeriesSermons(current.seriesKey).filter((s) => s.slug !== slug),
    ...SERMONS.filter((s) => s.seriesKey !== current.seriesKey && s.category === current.category),
  ].slice(0, limit);
}

export function getPrevNextSermon(slug: string): { prev?: Sermon; next?: Sermon } {
  const current = getSermon(slug);
  if (!current) return {};
  const siblings = getSeriesSermons(current.seriesKey)
    .filter((s) => s.number != null)
    .sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
  const idx = siblings.findIndex((s) => s.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? siblings[idx - 1] : undefined,
    next: idx < siblings.length - 1 ? siblings[idx + 1] : undefined,
  };
}
`;

fs.writeFileSync(OUT, header, 'utf8');
console.log(`Wrote ${sermons.length} sermons, ${Math.round(totalSeconds / 3600)} hours -> ${OUT}`);
console.log(seriesStats.map((s) => `${s.name}: ${s.count} (${s.hours}h)`).join('\n'));
console.log('categories:', categories.join(' / '));
console.log(`speaker: 唐崇荣 ${sermons.filter((s) => s.speaker === '唐崇荣').length} / 未标注 ${sermons.filter((s) => s.speaker !== '唐崇荣').length}; skipped other preachers: ${skippedOther}`);
