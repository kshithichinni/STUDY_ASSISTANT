const generateFlashcards = (req, res) => {
  const { topic, difficulty } = req.body;

  res.json({
    success: true,
    message: "Backend connected successfully!",
    topic,
    difficulty,
  });
};

module.exports = {
  generateFlashcards,
};