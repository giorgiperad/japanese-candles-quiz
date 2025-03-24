import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { mode, index } = req.body;

  if (!mode || index === undefined || index === null) {
    return res.status(400).json({ error: 'Mode and index are required' });
  }

  const key = mode === 'game' ? 'gameQuestions' : 'learnQuestions';

  try {
    let questions = await redis.get(key);
    questions = questions ? JSON.parse(questions) : [];

    if (index >= 0 && index < questions.length) {
      questions.splice(index, 1); // Delete
      await redis.set(key, JSON.stringify(questions));
      res.status(200).json({ message: 'Question deleted successfully' });
    } else {
      res.status(400).json({ error: 'Invalid index' });
    }
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Failed to delete question' });
  }
}