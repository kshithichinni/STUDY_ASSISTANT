import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TopicInput from "../components/TopicInput";
import API from "../services/api";

import "../styles/Home.css";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastRequest, setLastRequest] = useState(null);

  const requestIdRef = useRef(0);
  const navigate = useNavigate();

  const handleGenerate = async ({ topic, difficulty }) => {
    const requestId = ++requestIdRef.current;

    try {
      setIsLoading(true);
      setError("");

      setLastRequest({
        topic,
        difficulty,
      });

      const response = await API.post("/generate", {
        topic,
        difficulty,
      });

      if (requestId !== requestIdRef.current) return;

      const cards = response.data?.flashcards;

      if (!Array.isArray(cards) || cards.length === 0) {
        throw new Error("Invalid flashcard data received.");
      }

      const title = topic.split("\n")[0].trim();

      const trimmedTitle =
        title.length > 50
          ? title.slice(0, 50) + "..."
          : title;

      navigate("/flashcards", {
        state: {
          flashcards: cards,
          studyTopic: trimmedTitle,
        },
      });
    } catch (error) {
      console.error(error);

      setError(
        error.message ===
          "Invalid flashcard data received."
          ? "The AI returned an unexpected response. Please try again."
          : "Unable to generate flashcards. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="home">

        <div className="bg-circle bg-one"></div>
        <div className="bg-circle bg-two"></div>

        <section className="hero">

          <div className="hero-badge">
            ✨ Powered by Gemini AI
          </div>

          <h1>

            Learn Smarter with

            <span>

              AI-Powered Flashcards

            </span>

          </h1>

          <p className="hero-description">

            Generate intelligent flashcards from any topic,
            revise concepts interactively,
            and instantly test your knowledge with quizzes.

          </p>

        </section>

        <TopicInput
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />

        {error && (

          <div className="error-message">

            <h3>⚠ Something went wrong</h3>

            <p>{error}</p>

            <button
              className="retry-btn"
              onClick={() => {
                if (lastRequest) {
                  handleGenerate(lastRequest);
                }
              }}
            >
              Try Again
            </button>

          </div>

        )}

        <section className="features">

          <div className="feature-card">

            <div className="feature-icon">
              ⚡
            </div>

            <h3>AI Generated</h3>

            <p>
              Generate high-quality flashcards
              instantly using Gemini AI.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              📚
            </div>

            <h3>Interactive Learning</h3>

            <p>
              Flip flashcards, review concepts,
              and retain knowledge effectively.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              📝
            </div>

            <h3>Smart Quiz</h3>

            <p>
              Test your understanding with
              automatically generated quizzes.
            </p>

          </div>

        </section>

      </main>
    </>
  );
}

export default Home;