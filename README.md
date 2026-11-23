# 唐崇荣中文档案

把唐崇荣牧师在 YouTube 公开频道 **@Gudao200** 上的讲道与问答，按系列整理成一份可检索的静态网站。

- 999 篇讲道与问答，其中 948 篇标题署名唐崇荣
- 21 个系列，8 类（圣经讲解 / 专题系列 / 布道信息 / 实践神学 / 培灵信息 / 主日证道 / 问答 / 讲道集）
- 已标注时长合计约 962 小时
- 播放列表中署名为其他讲员的 32 条崇拜视频未收入；标题未注明讲员的 51 条标注为「讲员未标注」
- 逐卷系列：创世记（106）、约翰福音（128）、罗马书（24）、雅各书（45）、希伯来书（152）；专题系列：启示录七间教会（15）、圣经中上帝对人的呼召（71）等

本站为非官方档案，视频由 YouTube 提供，版权归原讲员与发布机构所有。

## 技术栈

Next.js 16（App Router、React 19、TypeScript strict）、Tailwind CSS v4、lucide-react。

## 本地运行

```bash
npm install
npm run dev            # 开发模式，http://localhost:3000
npm run check          # lint + typecheck + build
npm run build
npx next start -p 3100 # 生产预览；换一个端口可避开已占用端口
```

`next.config` 使用 `output: 'standalone'`，部署时也可以直接运行：

```bash
node .next/standalone/server.js
```

## 路由

| 路径 | 内容 |
| --- | --- |
| `/` | 首页：主要系列、编辑精选、使用指南、神学脉络 |
| `/series` | 21 个讲道系列总览 |
| `/series/[slug]` | 单个系列，按集数排序，可搜索、按分类与时长筛选 |
| `/archive` | 全部 999 篇，可搜索、分类、时长排序与随机浏览 |
| `/ep/[slug]` | 单篇讲道：YouTube 嵌入、系列简介、相邻与相关讲道 |
| `/qa` | 问答精选（89 篇） |
| `/search` | 全站搜索 |
| `/stats` | 数据总览：系列规模、分类分布、最长讲道、数据口径 |
| `/about` | 小传、生平节点、神学脉络、事工、语录 |
| `/disclaimer` | 版权与内容声明 |
| `/feed.xml` | RSS 2.0（前 100 篇） |
| `/llms.txt` | 面向 AI 代理的站点摘要 |

## 数据管线

```
../tang-data/*.txt          # yt-dlp 导出的播放列表（videoId|title|duration）
        │
        ▼
scripts/build-tang-data.mjs # 分类、集数提取、标题清洗、讲员归属、去重、排序
        │
        ▼
src/components/sites/tang-chongrong/data/sermons.ts   # 自动生成，勿手改
```

重新生成：

```bash
node scripts/build-tang-data.mjs
```

生成器会按标题优先归属系列（避免跨播放列表误归），跳过其他讲员的条目，并统计 `TOTAL_SERMONS`、`TOTAL_TONG`、`EXCLUDED_OTHER_PREACHERS`、`TOTAL_HOURS` 等常量，页面均引用这些常量，不写死数字。

## 目录

```
src/app/                                  # 路由
src/components/sites/tang-chongrong/      # 站点组件与数据
  data/sermons.ts                         # 自动生成：999 条记录与查询函数
  data/site.ts                            # 站点信息、时间线、主题、语录、编辑精选
scripts/build-tang-data.mjs               # 数据生成脚本
```

## 内容说明

- 系列归属、集数与主题由标题规则推断，可能与原始频道标注略有出入。
- GRII 主日证道列表中部分视频标题未注明讲员，保留并标注「讲员未标注」，请以视频为准。
- 小传、神学主题与语录为第三方整理，引用请回到原始出处。
- 本站自行撰写的导读文字采用 CC BY 4.0；讲道内容版权归原权利人所有。
