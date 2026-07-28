import { useState } from "react";
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

  const handleGenerate = async ({ topic, difficulty }) => {
    try {
      const response = await API.post("/generate", {
        topic,
        difficulty,
      });

      setFlashcards(response.data.flashcards);
      setCurrentCard(0);
      setStudyTopic(topic);
    } catch (error) {
      console.error(error);
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

        <TopicInput onGenerate={handleGenerate} />

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