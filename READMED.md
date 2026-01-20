# Insight Stack Blog 🧠

A digital garden exploring the intersection of Full-stack Engineering, Product Thinking, and LLMs. Built with VitePress and vitepress-theme-teek.

一个探索全栈工程、产品思维与 LLM 交叉领域的数字花园。

[![Built with VitePress](https://img.shields.io/badge/Built%20with-VitePress-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitepress.dev/)
[![License](https://img.shields.io/github/license/[你的GitHub用户名]/insight-stack-blog?style=flat-square)](LICENSE)


## 📖 关于本项目 (About)

欢迎来到 **Insight Stack Blog**。这是一个基于 [VitePress](https://vitepress.dev/) 构建的个人数字花园，聚焦**全栈技能 · 产品思维 · LLM 探索 · 个人成长**，探索技术边界，构建产品思维，在 AI 时代持续进化。

**"Stack"** 不仅代表我作为开发者的 **Tech Stack（技术栈）**，更代表了 **Insight Stack（认知栈）**。在这个快速变化的 AI 时代，单纯的代码能力已不足以定义一个优秀的工程师。本项目旨在记录和分享我在以下四个维度的深度思考与实践：

1.  **工程能力**：扎实的全栈技术根基。
2.  **产品 Sense = 用户价值洞察 × 商业可行性 × 技术可实现性的直觉平衡力**：技术服务于产品，从需求到设计再到实现，都需要产品 Sense。
3.  **AI 赋能**：拥抱 LLM 带来的生产力革命。
4.  **自我迭代**：持续学习与心智成长的闭环。

## 🛠️ 技术栈 (Tech Stack)

本项目使用以下技术构建：

* **Core**: [VitePress](https://vitepress.dev/) - 极速的静态网站生成器
* **Theme**: [vitepress-theme-teek](https://github.com/teekay/vitepress-theme-teek) - 基于 VitePress 的自定义主题
* **Deployment**: GitHub Actions + GitHub Pages


## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm 8+

### 本地开发

```bash
# 1. 克隆仓库
git clone [https://github.com/](https://github.com/)[你的GitHub用户名]/insight-stack-blog.git

# 2. 进入目录
cd insight-stack-blog

# 3. 安装依赖 (推荐使用 pnpm)
pnpm install

# 4. 启动本地开发服务器
pnpm docs:dev
```

### 访问博客
访问 http://localhost:5173 查看博客。

### 构建生产版本

```bash
pnpm run docs:build
```

构建产物将输出到 `dist` 目录。

### 本地预览构建结果

```bash
pnpm run docs:preview
```

## 📁 项目结构

```
insight-stack-blog/
├── .claude/              # AI assistant configuration
│   ├── GIT_WORKFLOW.md   # Git rules (READ THIS)
│   └── settings.local.json
├── docs/                 # Documentation and blog content
│   ├── .vitepress/       # VitePress config
│   ├── 01.全栈/          # Full-stack tech articles
│   ├── 10.产品 Sense/    # Product sense articles
│   ├── 20.AI 学习与实践/  # AI learning & practice
│   ├── 30.个人成长/      # Personal growth
│   ├── 40.关于/          # About section
│   └── public/           # Static assets
├── package.json
└── pnpm-lock.yaml
```

## ✍️ 写作指南

### 创建新文章

1. 在对应分类目录下创建 Markdown 文件（如 `docs/01.全栈技术/01.前端/`、`docs/20.AI 学习与实践/01.专题学习/`）
2. 文件名建议格式：`YYYY-MM-DD-article-title.md`
3. 在文件头部添加 frontmatter：

```yaml
---
title: 文章标题
date: 2025-11-20
tags: [标签1, 标签2]
description: 文章描述（可选）
---
```

### 文章分类

当前支持的分类目录：
- `01.全栈技术` - 全栈开发相关内容，包含前端、NodeJS、Python 等技术
- `10.产品 Sense` - 产品思维、用户价值、商业可行性等相关内容
- `20.AI 学习与实践` - AI 和大语言模型技术探索与应用实践
- `30.个人成长` - 资源推荐、阅读分享、时间管理、效率工具等
- `40.关于` - 关于作者、网站和时间轴等信息

可以根据需要在 `docs/` 下创建新的分类目录。

## 🚢 部署到 GitHub Pages

### 自动部署（推荐）

本项目已配置 GitHub Actions 自动部署：

1. 在 GitHub 仓库设置中，进入 `Settings` > `Pages`
2. 在 `Build and deployment` 下，`Source` 选择 `GitHub Actions`
3. 推送代码到 `main` 分支，会自动触发部署
4. 部署完成后，访问博客地址

### 手动部署

如果需要手动部署：

```bash
pnpm run deploy
```

### 配置自定义域名

1. 在 GitHub 仓库设置的 Pages 页面添加自定义域名
2. 在 `docs/.vitepress/config.ts` 中修改 `base` 配置：
   - 如果使用自定义域名：`base: '/'`
   - 如果使用 GitHub Pages 默认域名：`base: '/repository-name/'`

## 🔧 自定义配置

### 修改博客信息

编辑 `docs/.vitepress/config.ts`，修改以下配置：

- `title`: 博客标题
- `description`: 博客描述
- `socialLinks`: 社交媒体链接

### 添加新的导航项

在 `docs/.vitepress/config.ts` 的 `nav` 数组中添加新项：

```typescript
nav: [
  { text: '首页', link: '/' },
  { text: '新页面', link: '/new-page' }
]
```


## 📄 许可证

MIT License

## 🙏 致谢

特别感谢开源社区赋予我们如此强大的工具，让我能将精力聚焦于内容的创作，而非重复造轮子。本站的核心架构基于以下优秀项目构建：

* **Core**: [VitePress](https://vitepress.dev/)，由 Vite & Vue 驱动的极速静态网站生成器，提供了卓越的开发者体验 (DX) 和极致的性能。
* **Theme**: [vitepress-theme-teek](https://github.com/Kele-Bingtang/vitepress-theme-teek)，一个专注于阅读体验的 VitePress 自定义主题，其简约的设计理念与本站“注重内容”的初衷不谋而合。
