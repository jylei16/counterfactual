# 反事实数据收集平台

一个用于多人协作提交数据的平台。

## 功能特性

- ✅ 多人同时提交数据
- ✅ 支持多个领域（经典力学、电磁学、光学、热力学、天体物理、化学、生物、地理、社会学）
- ✅ 可以新建领域
- ✅ 数据以JSON格式保存
- ✅ 可以查看每个用户的提交情况
- ✅ 按用户名和领域筛选数据
- ✅ 下载所有数据为JSON文件
- ✅ 无需登录，只需填写用户名

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 访问应用

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 部署到Vercel

### 方法一：使用文件系统（仅限本地，Vercel不支持）

当前版本使用文件系统存储，在本地开发时可以正常工作。但在Vercel上，serverless函数使用只读文件系统，无法写入文件。

### 方法二：使用 Upstash Redis（推荐用于生产环境）

Vercel KV 已弃用，请使用 Vercel 集成中的 **Upstash Redis**。

1. **在 Vercel 项目中添加 Redis**
   - 进入 Vercel 项目 → **Integrations**（或 **Storage**）
   - 添加 **Upstash Redis**（可从 [Vercel Marketplace](https://vercel.com/marketplace?category=storage&search=redis) 安装）

2. **安装 Redis 依赖**
   ```bash
   npm install @upstash/redis
   ```

3. **代码已使用 Redis 存储**
   - 项目已使用 `lib/dataStorageKV.ts`（基于 @upstash/redis）
   - 环境变量由集成自动注入：`UPSTASH_REDIS_REST_URL`、`UPSTASH_REDIS_REST_TOKEN`

4. **部署**
   ```bash
   git push
   ```
   Vercel会自动部署

### 快速部署步骤

1. 将代码推送到GitHub仓库
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 如果需要使用KV，在项目设置中启用Vercel KV
4. 点击部署

## 项目结构

```
├── pages/
│   ├── api/          # API路由
│   │   ├── submit.ts      # 提交数据
│   │   ├── submissions.ts # 查询数据
│   │   └── domains.ts     # 获取领域列表
│   ├── index.tsx     # 主页面（提交数据）
│   ├── view.tsx      # 查看页面
│   └── _app.tsx      # Next.js应用入口
├── lib/
│   ├── dataStorage.ts    # 文件系统存储（本地开发）
│   └── dataStorageKV.ts  # Upstash Redis 存储（生产环境）
├── styles/           # 样式文件
└── data/             # 数据存储目录（本地）
```

## 数据存储

### 本地开发
所有提交的数据保存在 `/data/submissions.json` 文件中。

### 生产环境（Vercel）
建议使用Vercel KV或其他数据库服务。参考 `DEPLOYMENT.md` 了解详细说明。

## 使用说明

1. **提交数据**
   - 访问首页，填写用户名
   - 选择或创建领域
   - 输入考察的基本世界知识
   - 输入数据
   - 点击提交

2. **查看数据**
   - 点击"查看提交数据"链接
   - 可以按用户名搜索
   - 可以按领域筛选
   - 可以下载所有数据为JSON文件

## 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: CSS Modules
- **部署**: Vercel

## 注意事项

- 在Vercel上部署时，需要使用持久化存储（如Vercel KV）
- 数据文件 `submissions.json` 已添加到 `.gitignore`，不会提交到Git
- 建议定期备份数据
