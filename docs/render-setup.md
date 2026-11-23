# Render 设置核对

服务名 `tang-chongrong`，线上地址 <https://beyondonline.org/>。本页用来核对控制台设置与 [`../render.yaml`](../render.yaml) 是否一致，以及处理环境变量遗留值。

## 一、期望设置

| 项目 | 值 |
| --- | --- |
| Service Type | Web Service |
| Runtime | Node |
| Plan | Starter（0.5 CPU / 512 MB） |
| Region | Singapore |
| Branch | `master` |
| Build Command | `npm ci && npm run build` |
| Start Command | `NODE_OPTIONS=--max-old-space-size=384 npm start` |
| Health Check Path | `/` |
| Auto-Deploy | Yes（push 到 `master` 即部署） |
| Custom Domain | `beyondonline.org`（`www` 重定向到主域） |

环境变量：

| Key | Value | 说明 |
| --- | --- | --- |
| `NODE_VERSION` | `24` | 与本地开发一致 |
| `NEXT_TELEMETRY_DISABLED` | `1` | 关掉构建遥测 |
| `NEXT_PUBLIC_SITE_URL` | `https://beyondonline.org` | 构建时内联进 canonical、og:url、RSS、llms.txt |

## 二、Blueprint 与手动服务的区别

- `render.yaml` **只在服务由 Blueprint 创建时自动同步**。手动创建的服务改了仓库里的 YAML 不会影响控制台。
- 手动服务想改成 Blueprint 管理：新建一个 Blueprint（New → Blueprint，指向本仓库），再把自定义域名切过去。切换期间旧服务先别删，等新服务健康检查通过、域名生效后再下线。
- 不打算切换也可以：按上面的核对表在控制台逐项对照即可，仓库里的 YAML 作为文档使用。

## 三、`NEXT_PUBLIC_SITE_URL` 遗留值

这个变量是构建时内联的，改了值必须重新构建才生效，只重启不会更新。

代码里有一层兜底：`src/components/sites/tang-chongrong/data/site.ts` 会丢弃 `*.onrender.com` 这类默认主机名，回落到 `https://beyondonline.org`。所以即使控制台里残留旧值，线上 canonical 也不会跑偏。

清理步骤（可选，但建议做，避免以后换域名时误导）：

1. Render 控制台 → 服务 `tang-chongrong` → **Environment**。
2. 找到 `NEXT_PUBLIC_SITE_URL`：
   - 改成 `https://beyondonline.org`（不要带结尾斜杠），或
   - 直接删除（代码默认值就是正式域名）。
3. **Manual Deploy → Clear build cache & deploy**，让新值进入构建产物。

## 四、512 MB 实例注意事项

- 页面全部在构建时预渲染，运行时只做静态响应，512 MB 足够。
- 堆上限通过启动命令设成 384 MB，给 Node 运行时本体留出余量；构建阶段不设上限，否则 1000 页的预渲染可能被 OOM 打断。
- 若部署日志出现 `JavaScript heap out of memory` 或构建被 SIGKILL，先在控制台临时升到 Standard 完成构建，再降回 Starter。
- 首次构建较慢属正常（0.5 CPU）。渲染 1000+ 页面通常需要 2–4 分钟。

## 五、上线后自检

```bash
# 首页与关键路由
for u in / /about/ /series/ /ep/yuehan-fuyin-001/ /feed.xml /llms.txt; do
  curl -s -o /dev/null -w "%{http_code}  $u\n" "https://beyondonline.org$u"
done

# canonical 与站点地址是否指向正式域名
curl -s https://beyondonline.org/ | grep -o '<link rel="canonical" href="[^"]*"'
curl -s https://beyondonline.org/feed.xml | grep -m1 '<link>https'

# 域名跳转与证书
curl -sI http://beyondonline.org/ | grep -i '^location'
curl -sI https://www.beyondonline.org/ | grep -i '^location'
```
