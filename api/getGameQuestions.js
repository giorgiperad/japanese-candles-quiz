import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    const gameQuestions = await kv.get('gameQuestions') || [];
    res.status(200).json(gameQuestions);
  } catch (error) {
    console.error('Error fetching game questions:', error);
    res.status(500).json([]);
  }
}