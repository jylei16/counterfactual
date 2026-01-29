import fs from 'fs';
import path from 'path';

export interface Submission {
  id: string;
  username: string;
  domain: string;
  worldKnowledge: string;
  data: string;
  timestamp: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'submissions.json');

// 确保数据目录存在
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// 读取所有提交
export function readSubmissions(): Submission[] {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
}

// 保存提交
export function saveSubmission(submission: Omit<Submission, 'id' | 'timestamp'>): Submission {
  ensureDataDir();
  const submissions = readSubmissions();
  const newSubmission: Submission = {
    ...submission,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
  };
  submissions.push(newSubmission);
  fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
  return newSubmission;
}

// 获取所有领域
export function getAllDomains(): string[] {
  const submissions = readSubmissions();
  const domains = new Set<string>();
  submissions.forEach(sub => domains.add(sub.domain));
  return Array.from(domains).sort();
}

// 按用户名获取提交
export function getSubmissionsByUsername(username: string): Submission[] {
  const submissions = readSubmissions();
  return submissions.filter(sub => sub.username === username);
}
