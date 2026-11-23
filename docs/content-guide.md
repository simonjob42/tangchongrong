# 内容更新指南

站点内容分两类：**自动生成的讲道目录**与**手写的编辑内容**。改完之后 push 到 `master`，Render 会自动构建并发布到 <https://beyondonline.org>。

## 数据流

```
data/yt-dlp/*.txt  →  scripts/build-tang-data.mjs  →  src/components/sites/tang-chongrong/data/sermons.ts  →  页面
```

`sermons.ts` 是生成物，**不要手改**。

## 一、日常更新讲道目录

1. 用 yt-dlp 按原有格式导出，每行 `videoId|title|NA|duration`。
2. 把结果放回 `data/yt-dlp/<系列>.txt`，文件名与生成脚本里对应系列的 `file` 字段一致。
3. 重新生成：

   ```bash
   node scripts/build-tang-data.mjs
   ```

4. 检查 `sermons.ts` 的 diff。`TOTAL_SERMONS`、`TOTAL_TONG`、`TOTAL_HOURS` 等统计常量会自动更新，页面引用这些常量，无需手改数字。
5. 本地预览并检查：

   ```bash
   npm run dev
   npm run check          # lint + typecheck + 静态构建
   ```

6. 提交并发布：

   ```bash
   git add -A && git commit -m "数据: 更新约翰福音系列"
   git push origin master
   ```

   push 后到 Render 控制台的服务页面查看部署进度，约 1–2 分钟上线。

### 标题解析不正确时

集数、讲员归属、分类由 `scripts/build-tang-data.mjs` 中对应系列的 `match` / `numRe` / `headRe` 正则决定。改正则后重新生成即可，不要直接编辑 `sermons.ts`。

## 二、新增一个系列

1. 放置 `data/yt-dlp/<key>.txt`。
2. 在 `scripts/build-tang-data.mjs` 的 `SERIES` 数组增加一项：
   - `key` — 网址段，对应 `/series/<key>`
   - `file` — `data/yt-dlp/` 下的文件名
   - `name` / `short` / `category` / `desc`
   - `match` / `numRe` / `headRe` — 标题匹配规则
3. 运行 `node scripts/build-tang-data.mjs`，系列页会自动生成。

## 三、修改编辑内容

编辑 `src/components/sites/tang-chongrong/data/site.ts`：

| 内容 | 常量 |
| --- | --- |
| 站名、描述、SEO 地址 | `SITE` |
| 导航 | `NAV_LINKS` |
| 生平时间线 | `TIMELINE` |
| 神学主题 | `THEMES` |
| 语录 | `QUOTES` |
| 事工 | `MINISTRIES` |
| 阅读指南 | `READING_GUIDE` |
| 首页精选合集 | `FEATURED_COLLECTIONS` |
| 搜索建议 | `SEARCH_SUGGESTIONS` |

页面结构与样式在 `src/components/sites/tang-chongrong/*.tsx`，路由在 `src/app/*/page.tsx`。新增页面时新建目录，必要时把链接加进 `NAV_LINKS`。

## 四、发布与回滚

- 发布：push 到 `master` 即触发 Render 自动部署，无需手动操作。
- 回滚：`git revert <commit>` 后 push，Render 会重新部署上一版。
- 只改文案不碰数据时，不需要运行生成脚本。

## 五、注意事项

- 站点是静态导出，所有页面必须在构建时生成。新增动态路由时 `generateStaticParams` 要覆盖全部条目，否则线上 404。
- 不提交音视频文件，只提交标题、时长、视频 ID。
- `NEXT_PUBLIC_BASE_PATH` 只在子路径托管时需要；Render 和本地开发都不用设置。
- 本站只做索引与导读，讲道内容版权归原讲员与发布机构所有。
