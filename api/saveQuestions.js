import { kv } from '@vercel/kv';

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
    let questions = (await kv.get(key)) || [];
    if (!Array.isArray(questions)) questions = [];

    if (index !== null && index !== undefined) {
      // Edit existing question
      if (index >= 0 && index < questions.length) {
        questions[index] = question;
      } else {
        return res.status(400).json({ error: 'Invalid index' });
      }
    } else {
      // Add new question
      questions.push(question);
    }

    await kv.set(key, questions);
    res.status(200).json({ message: 'Question saved successfully' });
  } catch (error) {
    console.error('Error saving question:', error);
    res.status(500).json({ error: 'Failed to save question' });
  }
}