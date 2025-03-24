const fs = require('fs').promises;
const path = require('path');

module.exports = async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'data', 'learnQuestions.json');
    const data = await fs.readFile(filePath, 'utf8');
    const questions = JSON.parse(data);
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error reading learn questions:', error);
    res.status(500).json([]);
  }
};