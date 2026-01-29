// 使用 Vercel KV 的存储方案
// 需要先安装: npm install @vercel/kv
// 并在 Vercel 项目中配置 KV

import { kv } from '@vercel/kv';

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
    const submissions = await kv.get<Submission[]>(KV_KEY);
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
  await kv.set(KV_KEY, submissions);
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
