import "../styles/TopicInput.css";
import { useState } from "react";

function TopicInput({ onGenerate, isLoading }) {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [error, setError] = useState("");

  const handleGenerate = () => {
    if (!topic.trim()) {
      setError("Please enter a topic or paste your notes.");
      return;
    }

    setError("");

    onGenerate({
      topic,
      difficulty,
    });
  };

  return (
    <section className="input-card">

      <div className="input-header">

        <h2>Generate AI Flashcards</h2>

        <p>
          Enter any topic or paste your notes to create
          personalized flashcards and quizzes.
        </p>

      </div>

      <div className="textarea-wrapper">

        <textarea
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);

            if (error) setError("");
          }}
          placeholder="Example:
• Operating Systems
• Database Management Systems
• Computer Networks
• Paste your class notes here..."
        />

      </div>

      {error && (
        <p className="input-error">
          ⚠ {error}
        </p>
      )}

      <div className="difficulty-section">

        <h3>Difficulty Level</h3>

        <div className="difficulty-buttons">

          <button
            type="button"
            className={`difficulty ${
              difficulty === "Easy" ? "active" : ""
            }`}
            onClick={() => setDifficulty("Easy")}
          >
            😊 Easy
          </button>

          <button
            type="button"
            className={`difficulty ${
              difficulty === "Medium" ? "active" : ""
            }`}
            onClick={() => setDifficulty("Medium")}
          >
            ⚡ Medium
          </button>

          <button
            type="button"
            className={`difficulty ${
              difficulty === "Hard" ? "active" : ""
            }`}
            onClick={() => setDifficulty("Hard")}
          >
            🔥 Hard
          </button>

        </div>

      </div>

      <button
        className="generate-btn"
        onClick={handleGenerate}
        disabled={isLoading}
      >
        {isLoading
          ? "✨ Generating Flashcards..."
          : "🚀 Generate AI Flashcards"}
      </button>

    </section>
  );
}

export default TopicInput;