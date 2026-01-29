# 部署说明

## Vercel 部署注意事项

由于 Vercel 的 serverless 函数使用只读文件系统，当前的文件系统存储方案在 Vercel 上无法正常工作。

### 推荐方案：使用 Upstash Redis

Vercel KV 已弃用，请使用 **Upstash Redis**（Vercel 集成 / Marketplace）。

#### 步骤 1：部署项目到 Vercel

1. 将代码推送到 GitHub 仓库
2. 登录 [Vercel](https://vercel.com)
3. 点击 **"Add New..."** → **"Project"**
4. 导入你的 GitHub 仓库
5. 点击 **"Deploy"** 完成首次部署

#### 步骤 2：添加 Upstash Redis

1. 在 Vercel 仪表板中，进入你的项目
2. 打开 **Integrations** 或 **Storage**，或前往 [Vercel Marketplace](https://vercel.com/marketplace?category=storage&search=redis)
3. 添加 **Upstash Redis** 集成并按提示创建/关联数据库
4. 若你之前使用过 Vercel KV，该 KV 可能已迁移为 Upstash Redis，可在 Integrations 中查看

#### 步骤 3：验证环境变量

集成会自动为项目配置：
- `UPSTASH_REDIS_REST_URL` - Redis REST API 地址
- `UPSTASH_REDIS_REST_TOKEN` - REST API 令牌

无需手动配置。

#### 步骤 4：确认代码已更新

确保你的代码已经：
- ✅ 使用 `@upstash/redis` 依赖（已在 `package.json` 中）
- ✅ 使用 `lib/dataStorageKV.ts` 作为存储（已完成）
- ✅ 所有 API 路由已使用异步调用（已完成）

#### 步骤 5：重新部署

1. 如果代码有更新，推送到 GitHub
2. Vercel 会自动触发新的部署
3. 或者手动在 Vercel 仪表板中点击 **"Redeploy"**

#### 步骤 6：测试

部署完成后，访问你的网站：
- 测试提交数据功能
- 测试查看数据功能
- 检查数据是否正常保存

### 本地开发

当前版本可以在本地正常使用，数据会保存在 `data/submissions.json` 文件中。

**注意**：本地开发时，如果没有配置 KV，代码会报错。你可以：
1. 在本地也创建一个 KV 数据库（免费）
2. 或者创建一个环境检测，本地使用文件系统，生产环境使用 KV

### 替代方案

如果不想使用 Vercel KV，可以考虑：

1. **使用外部数据库**（如 MongoDB Atlas、Supabase）
2. **使用 GitHub API** 将数据存储到仓库
3. **使用其他云存储服务**（如 AWS S3、Google Cloud Storage）

### 常见问题

**Q: 创建 KV 数据库需要付费吗？**
A: Vercel KV 有免费额度，对于小型项目通常足够使用。超出免费额度后需要付费。

**Q: 本地开发时如何测试 KV？**
A: 可以在本地创建 `.env.local` 文件，添加 KV 的环境变量，或者使用条件判断在本地使用文件系统。

**Q: 如何查看 KV 中存储的数据？**
A: 在 Vercel 仪表板的 Storage 选项卡中，可以查看和管理 KV 数据库中的数据。
