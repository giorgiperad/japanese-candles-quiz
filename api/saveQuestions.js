import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { mode, question } = req.body;

  if (!mode || !question) {
    return res.status(400).json({ error: 'Mode and question are required!' });
  }

  const key = mode === 'game' ? 'gameQuestions' : 'learnQuestions';

  try {
    // Fetch existing questions, or initialize as empty array
    let questions = (await kv.get(key)) || [];
    // Ensure questions is an array
    if (!Array.isArray(questions)) questions = [];
    // Add new question
    questions.push(question);
    // Save back to KV
    await kv.set(key, questions);
    res.status(200).json({ message: 'Question saved successfully' });
  } catch (error) {
    console.error('Error saving question:', error);
    res.status(500).json({ error: 'Failed to save question' });
  }
}