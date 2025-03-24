import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { mode, question, index } = req.body;

  if (!mode || !question) {
    return res.status(400).json({ error: 'Mode and question are required' });
  }

  const key = mode === 'game' ? 'gameQuestions' : 'learnQuestions';

  try {
    let questions = await redis.get(key);
    questions = questions ? JSON.parse(questions) : [];

    if (index !== null && index !== undefined) {
      if (index >= 0 && index < questions.length) {
        questions[index] = question; // Edit
      } else {
        return res.status(400).json({ error: 'Invalid index' });
      }
    } else {
      questions.push(question); // Add
    }

    await redis.set(key, JSON.stringify(questions));
    res.status(200).json({ message: 'Question saved successfully' });
  } catch (error) {
    console.error('Error saving question:', error);
    res.status(500).json({ error: 'Failed to save question' });
  }
}