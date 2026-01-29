import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllDomains } from '@/lib/dataStorageKV';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const domains = await getAllDomains();
    return res.status(200).json({ domains });
  } catch (error) {
    console.error('Error fetching domains:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
