<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 唐崇荣中文档案

## 项目概览

把 YouTube 频道 `@Gudao200` 上唐崇荣牧师的公开讲道与问答，整理成可检索的静态网站。站点包含 999 条记录、21 个系列、8 个分类，以及首页、系列、档案、单篇、问答、搜索、统计、关于等路由。

## 技术栈

- **Framework:** Next.js 16（App Router、React 19、TypeScript strict）
- **UI:** shadcn/ui（Base UI primitives、Tailwind CSS v4、`cn()`）
- **Icons:** Lucide React
- **Deployment:** Render Web Service（`next start`，见 `render.yaml`）；Docker 用 `NEXT_OUTPUT=standalone`

## 命令

- `npm run dev` — 开发服务器
- `npm run build` — 生产构建
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm run check` — lint + typecheck + build
- `node scripts/build-tang-data.mjs` — 从 `data/yt-dlp/` 重新生成讲道数据

## 部署

- 默认输出标准 Next.js 服务：`npm run build` 后用 `npm start` 启动。
- Render：push 到 `master` 自动部署，配置见 `render.yaml`；实例为 Starter（0.5 CPU / 512 MB），常驻不休眠。
- `NEXT_OUTPUT=standalone` 供 Docker 使用；`NEXT_OUTPUT=export` 可导出静态站到 `out/`。
- 页面在构建时预渲染；需要真正的动态渲染时，移除对应页面的 `dynamicParams = false` 或静态标记。
- `NEXT_PUBLIC_BASE_PATH` 只在子路径托管时需要，Render 与本机都不要设置。

## 目录

```
src/app/                                  # 路由
src/components/sites/tang-chongrong/      # 站点组件
  data/sermons.ts                         # 自动生成：999 条记录与查询函数
  data/site.ts                            # 站点信息、时间线、主题、语录、编辑精选
scripts/build-tang-data.mjs               # 数据生成脚本
data/yt-dlp/                              # yt-dlp 导出的系列数据
data/playlists/                           # 原始播放列表清单
```

## 数据约束

- `src/components/sites/tang-chongrong/data/sermons.ts` 由 `scripts/build-tang-data.mjs` 生成，**不要手改**。
- 修改数据来源或分类规则时，改脚本与 `data/`，然后重新生成并提交生成结果。
- 数据字段为 `videoId|title|NA|duration`；不要提交音视频文件。
- 讲道内容版权归原讲员与发布机构；站点只做索引、链接与导读。

## 代码风格

- TypeScript strict，避免 `any`。
- 具名导出；组件 PascalCase，工具函数 camelCase。
- 优先 Tailwind 工具类；动态值才用内联样式。
- 2 空格缩进，移动端优先。
