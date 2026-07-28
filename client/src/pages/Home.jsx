import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import TopicInput from "../components/TopicInput";
import EmptyState from "../components/EmptyState";
import Flashcard from "../components/Flashcard";
import API from "../services/api";

import "../styles/home.css";

function Home() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [studyTopic, setStudyTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastRequest, setLastRequest] = useState(null);

  const requestIdRef = useRef(0);

  const handleGenerate = async ({ topic, difficulty }) => {
    const requestId = ++requestIdRef.current;
    try {
    setIsLoading(true);
    setError("");

    setLastRequest({
        topic,
        difficulty,
    });

    setFlashcards([]);
    setCurrentCard(0);

    const response = await API.post("/generate", {
      topic,
      difficulty,
    });
    
    if (requestId !== requestIdRef.current) {
    return;
    }

    const cards = response.data?.flashcards;

    if (!Array.isArray(cards) || cards.length === 0) {
        throw new Error("Invalid flashcard data received.");
    }
    setFlashcards(cards);
    setCurrentCard(0);
    setStudyTopic(topic);
  } catch (error) {
    console.error(error);
    setError(
    error.message === "Invalid flashcard data received."
      ? "The AI returned an unexpected response. Please try again."
      : "Unable to generate flashcards. Please check your connection and try again."
  );

  } finally {
    setIsLoading(false);
  }
};

  const nextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  return (
    <>
      <Navbar />

      <main className="home">
        <section className="hero">
          <p className="hero-badge">
            ✨ Smart Revision with AI
          </p>

          <h1>
            Turn Your Notes into
            <span> Flashcards & Quizzes</span>
          </h1>

          <p className="hero-description">
            Create AI-powered study material in seconds.
            Paste your notes, choose your difficulty level,
            and revise smarter with interactive flashcards
            and quizzes.
          </p>
        </section>

        <TopicInput
            onGenerate={handleGenerate}
            isLoading={isLoading}
        />
        {error && (
  <div className="error-message">
    <p>{error}</p>

    <button
      className="retry-btn"
      onClick={() => {
        if (lastRequest) {
            handleGenerate(lastRequest);
        }
      }}
    >
      Retry
    </button>
  </div>
)}

        {flashcards.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flashcards-section">

  <h3 className="topic-title">
    📚 Studying: {studyTopic}
  </h3>

  <Flashcard card={flashcards[currentCard]} />

  <div className="progress-container">

    <div className="progress-info">

      <span>Progress</span>

      <span>
        {currentCard + 1} of {flashcards.length}
      </span>

    </div>

    <div className="progress-bar">

      <div
        className="progress-fill"
        style={{
          width: `${((currentCard + 1) / flashcards.length) * 100}%`,
        }}
      ></div>

    </div>

  </div>

            <div className="navigation">
              <button
                onClick={prevCard}
                disabled={currentCard === 0}
              >
                Previous
              </button>

              <span>
                {currentCard + 1} / {flashcards.length}
              </span>

              <button
                onClick={nextCard}
                disabled={currentCard === flashcards.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Home;