# 数据目录

本目录保存站点数据的可复现来源。网站本身只读取 `src/components/sites/tang-chongrong/data/sermons.ts`，该文件由脚本生成，不要手改。

## 结构

```
data/
├── playlists/     # 播放列表清单（videoId|title|NA|duration）
└── yt-dlp/        # 按系列整理的 yt-dlp 导出，生成器直接读取
```

## 数据来源

- 频道：YouTube `@Gudao200`
- 播放列表清单：`data/playlists/tang_playlist_grc.txt`、`tang_playlist_jiangdao.txt`、`tang_playlist_jingxuan.txt`
- 条目字段：`videoId|title|NA|duration`
- 数据仅包含公开视频的标题、时长与视频 ID，不包含音视频文件。

## 重新生成

```bash
node scripts/build-tang-data.mjs
```

生成器会按标题优先归属系列，跳过其他讲员的条目，并输出统计常量。生成目标：

```
src/components/sites/tang-chongrong/data/sermons.ts
```

## 说明

- 系列归属、集数与主题由标题规则推断，可能与原始频道标注略有出入。
- 标题未注明讲员的条目保留并标注「讲员未标注」。
- 讲道内容版权归原讲员与发布机构所有；本站只做索引与链接。
