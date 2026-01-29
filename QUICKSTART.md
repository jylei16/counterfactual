# 快速开始指南

## 本地运行

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

3. **访问应用**
   打开浏览器访问: http://localhost:3000

## 部署到Vercel

### 简单部署（使用文件系统 - 仅限测试）

当前代码在Vercel上可能无法完全正常工作，因为Vercel的serverless函数使用只读文件系统。

### 生产部署（使用 Upstash Redis）

1. **准备代码**
   - 确保代码已推送到 GitHub

2. **在 Vercel 中设置**
   - 登录 [Vercel](https://vercel.com)
   - 点击 "New Project"，导入你的 GitHub 仓库
   - 在项目中添加 **Upstash Redis** 集成（Integrations 或 [Marketplace](https://vercel.com/marketplace?category=storage&search=redis)）
   - 创建/关联 Redis 数据库，环境变量会自动注入

3. **代码已使用 Redis**
   - API 已使用 `lib/dataStorageKV.ts`（@upstash/redis）
   - 无需改导入，依赖已在 `package.json` 中

4. **部署**
   - Vercel会自动检测到代码推送并部署
   - 或手动点击"Redeploy"

## 使用说明

### 提交数据
1. 在首页填写用户名
2. 选择已有领域或输入新领域
3. 填写"考察的基本世界知识"
4. 填写"数据"
5. 点击"提交数据"

### 查看数据
1. 点击"查看提交数据"
2. 可以按用户名搜索
3. 可以按领域筛选
4. 可以下载所有数据为JSON文件

## 数据格式

每个提交的数据包含：
- `id`: 唯一标识符
- `username`: 用户名
- `domain`: 领域
- `worldKnowledge`: 考察的基本世界知识
- `data`: 数据内容
- `timestamp`: 提交时间（ISO格式）
