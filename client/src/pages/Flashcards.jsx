import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Flashcard from "../components/Flashcard";
import "../styles/Flashcards.css";

function Flashcards() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { flashcards, studyTopic } = state;

  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard((prev) => prev + 1);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard((prev) => prev - 1);
    }
  };

  const startQuiz = () => {
    navigate("/quiz", {
      state: {
        flashcards,
        studyTopic,
      },
    });
  };

  const progress =
    ((currentCard + 1) / flashcards.length) * 100;

  return (
    <div className="flashcards-container">

      <div className="flashcards-header">

        <h1>📚 FlashMind AI Flashcards</h1>

        <p>
          Learn one concept at a time with AI-generated flashcards.
        </p>

        <div className="topic-pill">
          {studyTopic}
        </div>

      </div>

      <Flashcard card={flashcards[currentCard]} />

      <div className="progress-section">

        <div className="progress-info">

          <span>Card Progress</span>

          <span>
            {currentCard + 1} of {flashcards.length}
          </span>

        </div>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>

        </div>

      </div>

      <div className="navigation">

        <button
          className="nav-btn"
          onClick={prevCard}
          disabled={currentCard === 0}
        >
          ← Previous
        </button>

        <div className="card-count">
          Card {currentCard + 1} / {flashcards.length}
        </div>

        <button
          className="nav-btn"
          onClick={nextCard}
          disabled={currentCard === flashcards.length - 1}
        >
          Next →
        </button>

      </div>

      <div className="quiz-button-wrapper">

        <button
          className="quiz-btn"
          onClick={startQuiz}
        >
          📝 Start Quiz
        </button>

      </div>

    </div>
  );
}

export default Flashcards;