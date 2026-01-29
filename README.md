# 知识数据采集系统

多人协作提交“世界知识 + 由此得到的数据”，无需登录，提交时填写用户名即可。

## 功能

- **领域**：可选经典力学、电磁学、光学、热力学、天体物理、化学、生物、地理、社会学，或选择「新建领域」输入自定义领域名
- **提交内容**：考察的基本世界知识 + 由此得到的数据
- **多人同时提交**：支持多人同时使用
- **数据持久化**：所有提交以 JSON 形式保存（Vercel 部署时使用 Vercel Blob）
- **查看**：可按用户名查询某人提交记录，或导出全部为 JSON 文件

## 本地运行

```bash
npm install
npm start
```

访问 http://localhost:3000。本地无 `BLOB_READ_WRITE_TOKEN` 时数据存在内存，重启后清空。

## 部署到 Vercel

1. 将项目推送到 GitHub，在 [Vercel](https://vercel.com) 导入该项目并部署。
2. **启用 Blob 存储**（否则提交数据不会持久化）：
   - 在 Vercel 项目 → Storage → Create Database → 选择 **Blob**
   - 创建后会自动绑定环境变量 `BLOB_READ_WRITE_TOKEN`
3. 重新部署一次，使 Blob 生效。

部署完成后，所有人可同时访问网站提交数据，无需登录，只需在提交时填写姓名/ID。

## 后台查看数据

- 在页面「查看提交记录」输入用户名并点击「查询」可查看该用户的所有提交。
- 点击「导出全部 JSON」可下载当前全部提交的 JSON 文件到本地保存。

API 说明（供自行查看或备份）：

- `GET /api/submissions`：返回全部提交（JSON）
- `GET /api/submissions?username=某人`：返回该用户的提交（JSON）
