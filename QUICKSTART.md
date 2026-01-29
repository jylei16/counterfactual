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

### 生产部署（使用Vercel KV）

1. **准备代码**
   - 确保代码已推送到GitHub

2. **在Vercel中设置**
   - 登录 [Vercel](https://vercel.com)
   - 点击"New Project"
   - 导入你的GitHub仓库
   - 在项目设置中，进入"Storage"标签
   - 点击"Create Database"，选择"KV"
   - 创建KV数据库

3. **修改代码使用KV**
   
   修改以下文件，将 `@/lib/dataStorage` 改为 `@/lib/dataStorageKV`：
   - `pages/api/submit.ts`
   - `pages/api/submissions.ts`
   - `pages/api/domains.ts`
   
   并将所有同步函数调用改为异步（添加 `await`）

4. **安装KV依赖**
   
   在 `package.json` 中添加：
   ```json
   "dependencies": {
     "@vercel/kv": "^0.2.0"
   }
   ```

5. **部署**
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
