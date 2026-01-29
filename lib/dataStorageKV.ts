// 使用 Upstash Redis 的存储方案（Vercel KV 已弃用，迁移至 Upstash）
// 需要先安装: npm install @upstash/redis
// 并在 Vercel 项目中添加 Redis 集成（Integrations → Upstash Redis）
// 环境变量: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN

import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export interface Submission {
  id: string;
  username: string;
  domain: string;
  worldKnowledge: string;
  data: string;
  timestamp: string;
}

const KV_KEY = 'submissions';

// 读取所有提交
export async function readSubmissions(): Promise<Submission[]> {
  try {
    const submissions = await redis.get<Submission[]>(KV_KEY);
    return submissions || [];
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
}

// 保存提交
export async function saveSubmission(
  submission: Omit<Submission, 'id' | 'timestamp'>
): Promise<Submission> {
  const submissions = await readSubmissions();
  const newSubmission: Submission = {
    ...submission,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
  };
  submissions.push(newSubmission);
  await redis.set(KV_KEY, submissions);
  return newSubmission;
}

// 获取所有领域
export async function getAllDomains(): Promise<string[]> {
  const submissions = await readSubmissions();
  const domains = new Set<string>();
  submissions.forEach(sub => domains.add(sub.domain));
  return Array.from(domains).sort();
}

// 按用户名获取提交
export async function getSubmissionsByUsername(
  username: string
): Promise<Submission[]> {
  const submissions = await readSubmissions();
  return submissions.filter(sub => sub.username === username);
}
