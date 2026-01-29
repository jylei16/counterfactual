# Upstash Redis 启用详细步骤（Vercel）

> **说明**：Vercel KV 已弃用。若你之前使用过 Vercel KV，它可能已迁移为 Upstash Redis，可在 Vercel 的 **Integrations** 中查看。新项目请按以下步骤添加 Upstash Redis。

## 📋 前置条件

- ✅ 已注册 Vercel 账户
- ✅ 代码已推送到 GitHub
- ✅ 项目已部署到 Vercel（至少部署过一次）

## 🚀 详细步骤

### 第一步：进入项目

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 找到并点击你的项目名称

### 第二步：添加 Redis 集成

1. 在项目页面：
   - 点击 **"Integrations"** 选项卡，或
   - 进入 **"Storage"**（若仍显示），或
   - 打开 [Vercel Marketplace](https://vercel.com/marketplace?category=storage&search=redis)，搜索 **Redis** 并选择 **Upstash Redis**

2. 若在 Integrations 中：
   - 搜索 **Upstash** 或 **Redis**
   - 点击 **Upstash Redis**，按提示安装并关联到当前项目

3. 若你已有迁移后的 Upstash Redis（原 Vercel KV）：
   - 在 **Integrations** 中应能看到已连接的 Redis
   - 无需再创建，环境变量已配置

### 第三步：创建 / 关联数据库

1. 按集成向导创建新 Redis 数据库，或关联已有 Upstash 数据库
2. 选择地区（建议选离你最近的）
3. 完成创建后，Vercel 会自动为项目注入环境变量

### 第四步：验证环境变量（自动配置）

集成会自动为项目添加：

- `UPSTASH_REDIS_REST_URL` - Redis REST API 地址
- `UPSTASH_REDIS_REST_TOKEN` - REST API 令牌

**查看环境变量**：
1. 在项目页面，点击 **"Settings"** 选项卡
2. 在左侧找到 **"Environment Variables"**
3. 确认存在 `UPSTASH_REDIS_REST_URL` 和 `UPSTASH_REDIS_REST_TOKEN`

### 第五步：重新部署项目

1. 若代码有更新，推送到 GitHub
2. Vercel 会自动检测并部署
3. 或手动：**Deployments** → 最新部署 → **"..."** → **Redeploy**

## ✅ 验证是否成功

### 方法 1：测试网站功能

1. 访问你的网站
2. 尝试提交一条数据
3. 查看是否能正常保存与展示

### 方法 2：查看 Vercel 日志

1. **Deployments** → 最新部署
2. 查看 **Functions** / **Logs**，确认无报错

### 方法 3：检查集成与用量

1. 在 **Integrations** 或 **Storage** 中打开 Upstash Redis
2. 在 Upstash 控制台查看是否有请求与数据

## ❓ 常见问题

### Q1: 之前用的是 Vercel KV，需要改代码吗？

**A**: 本项目已迁移到 `@upstash/redis`，使用 `UPSTASH_REDIS_REST_URL` 和 `UPSTASH_REDIS_REST_TOKEN`。若你的 KV 已迁移为 Upstash Redis，Vercel 会提供上述环境变量，一般无需改代码，重新部署即可。

### Q2: 环境变量没有自动添加？

**A**: 确认集成已安装并关联到本项目，然后到 Settings → Environment Variables 查看；必要时重新部署。

### Q3: 本地开发时如何使用 Redis？

**A**: 在项目根目录创建 `.env.local`，添加：
```
UPSTASH_REDIS_REST_URL=你的URL
UPSTASH_REDIS_REST_TOKEN=你的TOKEN
```
从 Vercel 或 Upstash 控制台复制即可。不要将 `.env.local` 提交到 Git。

## 🔗 相关链接

- [Upstash Redis 文档](https://upstash.com/docs/redis)
- [Vercel + Upstash 集成](https://upstash.com/docs/redis/howto/vercelintegration)
- [@upstash/redis 包](https://www.npmjs.com/package/@upstash/redis)
- [Vercel Marketplace - Redis](https://vercel.com/marketplace?category=storage&search=redis)
