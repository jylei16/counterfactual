import type { NextApiRequest, NextApiResponse } from 'next';
import { saveSubmission } from '@/lib/dataStorageKV';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, domain, worldKnowledge, data } = req.body;

    // 验证必填字段
    if (!username || !domain || !worldKnowledge || !data) {
      return res.status(400).json({ 
        error: 'Missing required fields: username, domain, worldKnowledge, data' 
      });
    }

    // 保存提交
    const submission = await saveSubmission({
      username: username.trim(),
      domain: domain.trim(),
      worldKnowledge: worldKnowledge.trim(),
      data: data.trim(),
    });

    return res.status(200).json({ 
      success: true, 
      submission 
    });
  } catch (error) {
    console.error('Error saving submission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
