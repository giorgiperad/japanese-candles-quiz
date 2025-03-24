const fs = require('fs').promises;
const path = require('path');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { mode, question } = req.body;

  if (!mode || !question) {
    return res.status(400).json({ error: 'Mode and question are required' });
  }

  const fileName = mode === 'game' ? 'gameQuestions.json' : 'learnQuestions.json';
  const filePath = path.join(process.cwd(), 'data', fileName);

  try {
    let questions = [];
    try {
      const data = await fs.readFile(filePath, 'utf8');
      questions = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, start with empty array
    }

    questions.push(question);
    await fs.writeFile(filePath, JSON.stringify(questions, null, 2));
    res.status(200).json({ message: 'Question saved successfully' });
  } catch (error) {
    console.error('Error saving question:', error);
    res.status(500).json({ error: 'Failed to save question' });
  }
};