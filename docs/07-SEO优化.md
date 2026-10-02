# SEO 优化说明

本文档记录本站已做的 SEO 优化、每项的作用，以及日常写作中需要遵守的 SEO 规范。

## 一、已实施的优化

### 1. 结构化元数据（PaperMod 内置，已确认开启）

| 优化项 | 作用 | 实现方式 |
|---|---|---|
| Open Graph 标签 | 文章被分享到微信/微博/X 时显示标题、摘要、封面图卡片 | `hugo.toml` 中 `env = "production"` 确保渲染 |
| Twitter Cards | X/Twitter 分享卡片 | 同上 |
| Schema.org JSON-LD | 向搜索引擎声明「这是一篇文章、作者是谁、发布于何时」，可能获得富摘要展示 | 同上，自动读取 frontmatter |
| Canonical 链接 | 防止重复内容分散权重，指明页面权威地址 | PaperMod 自动生成 |

### 2. 站点级配置（hugo.toml）

```toml
enableRobotsTXT = true      # 生成 robots.txt，引导爬虫
enableGitInfo = true        # 用 git 提交时间作为 lastmod（文章更新时间），
                            # 写入 sitemap，搜索引擎偏好有新鲜度信号的页面

[sitemap]
  changefreq = "weekly"     # 告知爬虫页面更新频率
  priority = 0.5

[params]
  env = "production"        # 强制输出 OG/Twitter/Schema 元数据（含本地构建）
  keywords = [...]          # 站点级关键词，输出到 meta keywords 和 JSON-LD
```

### 3. robots.txt（layouts/robots.txt）

```
User-agent: *
Allow: /
Sitemap: https://omnifj.github.io/sitemap.xml
```

作用：允许所有搜索引擎抓取，并主动告知 sitemap 位置。Sitemap 地址使用 `absURL` 模板函数生成，本地为 omnifj.com 构建时会自动指向 omnifj.com 的 sitemap（双域名各自正确）。

### 4. Sitemap

Hugo 自动生成 `https://omnifj.github.io/sitemap.xml`，包含全部页面 URL、更新时间（lastmod，来自 git）、更新频率。作用是让搜索引擎快速、完整地发现所有文章，新文章收录更快。

### 5. 文章 frontmatter 增强（以 hello-world.md 为示例）

新增字段及作用：

| 字段 | 作用 |
|---|---|
| `description` | 搜索结果中展示的摘要（约 150 字内），直接影响点击率；同时用于 og:description 和 JSON-LD |
| `summary` | 列表页和 RSS 的摘要兜底 |
| `keywords` | 输出到 meta keywords 和 JSON-LD keywords，辅助搜索引擎理解主题 |
| `tags` / `categories` | 生成分类聚合页，形成站内链接网络，提升整体权重 |

## 二、每篇文章的写作规范（重要）

配置只做一次，**每篇文章的 frontmatter 才是长期影响 SEO 的关键**：

```markdown
---
title: "包含核心关键词的标题，50 字以内"
date: 2026-10-02
draft: false
tags: ["2~5 个相关标签"]
categories: ["一个分类"]
keywords: ["3~6 个文章关键词"]
description: "120~150 字的摘要，包含核心关键词，写清楚读者能获得什么"
---
```

正文规范：

1. **标题层级**：正文从 `##`（h2）开始，每篇文章只有一个 h1（由 title 自动生成），层级不要跳跃
2. **图片必须有 alt**：`![有意义的描述](/images/pic.png)`，alt 是图片搜索和无障碍的关键
3. **内链**：相关文章互相链接，如 `[另一篇文章](/posts/xxx/)`，内链是提升整站权重最有效的手段之一
4. **URL 用英文短横线命名**：文件名 `content/posts/hugo-seo-guide.md` 决定 URL，避免中文和空格
5. **首段点题**：前 100 字内出现核心关键词
6. **持续更新**：`enableGitInfo` 会把修改时间写入 sitemap，常更新的文章排名更好

## 三、搜索引擎收录提交（一次性，需手动完成）

配置完成后，需要主动把站点提交给搜索引擎：

### Google

1. 打开 https://search.google.com/search-console
2. 添加资源 → URL 前缀 → 输入 `https://omnifj.github.io`
3. 验证所有权：下载 HTML 验证文件放入 `static/` 目录，push 后完成验证
4. 提交 Sitemap：`https://omnifj.github.io/sitemap.xml`

### Bing

1. 打开 https://www.bing.com/webmasters
2. 可直接从 Google Search Console 导入
3. 提交同一个 sitemap 地址

### 百度（中文内容建议提交）

1. 打开 https://ziyuan.baidu.com
2. 添加站点，验证方式选「文件验证」，将 HTML 文件放入 `static/`
3. 提交 sitemap。注意：百度对 GitHub Pages 的抓取不稳定，`omnifj.com` 自有服务器版本收录效果会更好

## 四、双域名的 SEO 注意事项

参见 [06-双域名部署](06-双域名部署.md)。两个域名内容完全相同，存在「重复内容」风险：

- 每个构建的 canonical 指向各自 baseURL，搜索引擎会各自收录，权重分散
- **建议**：确定一个主域名（推荐 omnifj.com，自有域名更利于品牌建设），长期以主域名对外分享、引流
- 进阶做法（可选）：github.io 版本的页面 canonical 统一指向 omnifj.com，做法是将构建改为 `hugo --minify --baseURL https://omnifj.com/` 再部署到 Pages（URL 会跳转/指向主域名）。需要时再改造

## 五、提升行业影响力的内容策略（SEO 之外）

1. **系列化写作**：围绕一个主题写系列文章并互相链接，形成「主题权威」（Topical Authority）
2. **解决具体问题**：标题即问题（如「Hugo 部署 GitHub Pages 失败的 5 个原因」），长尾搜索流量最精准
3. **英文或双语摘要**：扩大受众范围
4. **分发引流**：文章同步到掘金、知乎、Dev.to 等平台，文末注明「原文链接」指回本站，积累外链
5. **保持稳定更新频率**：每周 1 篇优于每月突击 4 篇
6. **衡量效果**：可在 `layouts/_partials/extend_head.html` 中加入 Google Analytics 或百度统计代码

## 六、验证 SEO 是否生效

```bash
# 构建后检查本地产物
hugo --minify
# 确认以下文件/标签存在
public/sitemap.xml                                  # sitemap
public/robots.txt                                   # robots
# 文章页面源码中应包含：
#   <meta property="og:title" ...>
#   <meta name="twitter:card" ...>
#   <script type="application/ld+json">...</script>
#   <link rel="canonical" ...>
```

线上验证工具：

- Google Rich Results 测试：https://search.google.com/test/rich-results
- OG 预览：https://www.opengraph.xyz/
