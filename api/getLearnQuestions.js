import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  try {
    const learnQuestions = await redis.get('learnQuestions');
    res.status(200).json(learnQuestions ? JSON.parse(learnQuestions) : []);
  } catch (error) {
    console.error('Error fetching learn questions:', error);
    res.status(500).json([]);
  }
}