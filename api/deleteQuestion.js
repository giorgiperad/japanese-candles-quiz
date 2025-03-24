import { kv } from '@vercel/kv';

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
    let questions = (await kv.get(key)) || [];
    if (!Array.isArray(questions)) questions = [];

    if (index >= 0 && index < questions.length) {
      questions.splice(index, 1); // Remove question at index
      await kv.set(key, questions);
      res.status(200).json({ message: 'Question deleted successfully' });
    } else {
      res.status(400).json({ error: 'Invalid index' });
    }
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Failed to delete question' });
  }
}