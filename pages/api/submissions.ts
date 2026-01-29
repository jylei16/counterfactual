import type { NextApiRequest, NextApiResponse } from 'next';
import { readSubmissions, getSubmissionsByUsername } from '@/lib/dataStorageKV';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username } = req.query;

    if (username && typeof username === 'string') {
      // 获取特定用户的提交
      const submissions = await getSubmissionsByUsername(username);
      return res.status(200).json({ submissions });
    } else {
      // 获取所有提交
      const submissions = await readSubmissions();
      return res.status(200).json({ submissions });
    }
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
