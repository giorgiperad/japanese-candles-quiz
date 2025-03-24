import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  try {
    const gameQuestions = await redis.get('gameQuestions');
    res.status(200).json(gameQuestions ? JSON.parse(gameQuestions) : []);
  } catch (error) {
    console.error('Error fetching game questions:', error);
    res.status(500).json([]);
  }
}