# Vercel KV 启用详细步骤

## 📋 前置条件

- ✅ 已注册 Vercel 账户
- ✅ 代码已推送到 GitHub
- ✅ 项目已部署到 Vercel（至少部署过一次）

## 🚀 详细步骤

### 第一步：进入项目设置

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 找到并点击你的项目名称

### 第二步：打开 Storage 选项卡

1. 在项目页面顶部，你会看到多个选项卡：
   - Overview（概览）
   - Deployments（部署）
   - **Storage（存储）** ← 点击这个
   - Settings（设置）
   - Analytics（分析）
   - 等等

2. 点击 **"Storage"** 选项卡

### 第三步：创建 KV 数据库

1. 在 Storage 页面，你会看到：
   - 一个 **"Create Database"** 或 **"Add Database"** 按钮
   - 或者显示已有的数据库列表

2. 点击 **"Create Database"** 按钮

3. 选择存储类型：
   - 你会看到多个选项：
     - **Postgres**（关系型数据库）
     - **KV**（键值存储，基于 Redis）← **选择这个**
     - **Blob**（对象存储）
     - **Edge Config**（边缘配置）
   
4. 点击 **"KV"** 选项

### 第四步：配置 KV 数据库

1. **数据库名称**：
   - 输入一个名称，例如：`counterfactual-kv`
   - 或者使用默认名称

2. **地区选择**：
   - 选择一个地区（建议选择离你最近的）
   - 例如：`us-east-1`、`eu-west-1`、`ap-southeast-1` 等

3. **计划选择**：
   - 通常有免费计划（Hobby）和付费计划
   - 对于测试和小型项目，免费计划通常足够

4. 点击 **"Create"** 或 **"Continue"** 按钮

### 第五步：等待创建完成

- Vercel 会自动创建 KV 数据库
- 这个过程通常只需要几秒钟
- 创建完成后，你会看到数据库出现在列表中

### 第六步：验证环境变量（自动配置）

Vercel 会自动为你的项目添加以下环境变量：

- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

**查看环境变量**：
1. 在项目页面，点击 **"Settings"** 选项卡
2. 在左侧菜单中找到 **"Environment Variables"**
3. 你应该能看到 KV 相关的环境变量（通常以 `KV_` 开头）

### 第七步：重新部署项目

1. 如果代码有更新，推送到 GitHub
2. Vercel 会自动检测并部署
3. 或者手动触发：
   - 在 **"Deployments"** 选项卡
   - 找到最新的部署
   - 点击右侧的 **"..."** 菜单
   - 选择 **"Redeploy"**

## ✅ 验证是否成功

### 方法 1：测试网站功能

1. 访问你的网站
2. 尝试提交一条数据
3. 查看是否能正常保存
4. 尝试查看数据，看是否能正常显示

### 方法 2：查看 Vercel 日志

1. 在 Vercel 仪表板中，进入 **"Deployments"** 选项卡
2. 点击最新的部署
3. 查看 **"Functions"** 或 **"Logs"** 部分
4. 检查是否有错误信息

### 方法 3：检查 Storage 使用情况

1. 在 **"Storage"** 选项卡中
2. 点击你创建的 KV 数据库
3. 查看是否有数据写入

## 🖼️ 界面参考

Vercel 的界面可能会更新，但大致流程如下：

```
Vercel Dashboard
  └── Your Project
      └── Storage Tab
          └── Create Database Button
              └── Select KV
                  └── Configure (Name, Region)
                      └── Create
```

## ❓ 常见问题

### Q1: 找不到 Storage 选项卡？

**A**: 可能的原因：
- 项目还没有部署过（需要至少部署一次）
- 你的 Vercel 账户类型不支持 Storage（免费账户应该支持）
- 尝试刷新页面或重新登录

### Q2: 创建 KV 时提示需要付费？

**A**: 
- 检查是否选择了付费计划
- Vercel KV 有免费额度，通常足够小型项目使用
- 如果确实需要付费，可以考虑使用其他免费替代方案

### Q3: 环境变量没有自动添加？

**A**: 
- 等待几分钟，有时需要一些时间
- 尝试重新部署项目
- 手动检查 Settings → Environment Variables

### Q4: 本地开发时如何使用 KV？

**A**: 
- 在项目根目录创建 `.env.local` 文件
- 从 Vercel 仪表板复制环境变量
- 添加到 `.env.local` 文件中
- 注意：不要将 `.env.local` 提交到 Git

## 📝 下一步

启用 KV 后，你的代码已经配置好了，应该可以直接使用。如果遇到问题：

1. 检查 Vercel 部署日志
2. 确认环境变量已正确配置
3. 验证代码中的 KV 导入是否正确

## 🔗 相关链接

- [Vercel KV 文档](https://vercel.com/docs/storage/vercel-kv)
- [Vercel Storage 概览](https://vercel.com/docs/storage)
- [@vercel/kv 包文档](https://www.npmjs.com/package/@vercel/kv)
