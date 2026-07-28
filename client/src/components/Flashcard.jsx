import { useEffect, useState } from "react";
import "../styles/Flashcard.css";

const Flashcard = ({ card }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
  }, [card]);

  return (
    <div
      className={`flashcard-wrapper ${
        showAnswer ? "flipped" : ""
      }`}
      onClick={() => setShowAnswer(!showAnswer)}
    >
      <div className="flashcard-inner">

        {/* FRONT */}

        <div className="flashcard-front">

          <div className="card-header">
            📖 FlashMind AI
          </div>

          <div className="card-content">

            <div className="card-icon">
              ❓
            </div>

            <h2>Question</h2>

            <p>{card.question}</p>

          </div>

          <div className="card-footer">
            💡 Tap anywhere to reveal the answer
          </div>

        </div>

        {/* BACK */}

        <div className="flashcard-back">

          <div className="card-header">
            📖 FlashMind AI
          </div>

          <div className="card-content">

            <div className="card-icon">
              ✅
            </div>

            <h2>Answer</h2>

            <p>{card.answer}</p>

          </div>

          <div className="card-footer">
            🔄 Tap again to view the question
          </div>

        </div>

      </div>
    </div>
  );
};

export default Flashcard;