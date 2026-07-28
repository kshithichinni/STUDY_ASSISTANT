const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateFlashcards = async (req, res) => {
  try {
    const { topic, difficulty } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
    });

    const prompt = `
You are a study assistant.

Generate exactly 5 flashcards.

Topic: ${topic}
Difficulty: ${difficulty}

Return ONLY valid JSON.

Format:

{
  "flashcards": [
    {
      "question": "...",
      "answer": "..."
    }
  ]
}

Do not add markdown.
Do not use \`\`\`.
Do not explain anything.
`;
    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const json = JSON.parse(text);

    res.json(json);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate flashcards",
    });
  }
};

module.exports = {
  generateFlashcards,
};