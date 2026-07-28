import "../styles/topicInput.css";
import { useState } from "react";

function TopicInput({ onGenerate }) {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");

  const handleGenerate = () => {
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    onGenerate({
      topic,
      difficulty,
    });
  };

  return (
    <section className="input-card">
      <h2>Enter your Topic or Notes</h2>

      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Example: Explain Operating Systems, DBMS, Computer Networks..."
      />

      <div className="difficulty-section">
        <p>Select Difficulty</p>

        <div className="difficulty-buttons">
          <button
            className={`difficulty ${
              difficulty === "Easy" ? "active" : ""
            }`}
            onClick={() => setDifficulty("Easy")}
          >
            Easy
          </button>

          <button
            className={`difficulty ${
              difficulty === "Medium" ? "active" : ""
            }`}
            onClick={() => setDifficulty("Medium")}
          >
            Medium
          </button>

          <button
            className={`difficulty ${
              difficulty === "Hard" ? "active" : ""
            }`}
            onClick={() => setDifficulty("Hard")}
          >
            Hard
          </button>
        </div>
      </div>

      <button className="generate-btn" onClick={handleGenerate}>
        Generate Flashcards
      </button>
    </section>
  );
}

export default TopicInput;