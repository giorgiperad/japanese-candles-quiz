import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    const learnQuestions = await kv.get('learnQuestions') || [];
    res.status(200).json(learnQuestions);
  } catch (error) {
    console.error('Error fetching learn questions:', error);
    res.status(500).json([]);
  }
}