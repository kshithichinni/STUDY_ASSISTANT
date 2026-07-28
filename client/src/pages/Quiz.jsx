import { useLocation, Navigate } from "react-router-dom";
import { useMemo, useState } from "react";
import "../styles/Quiz.css";
import QuizQuestion from "../components/QuizQuestion";
import QuizResult from "../components/QuizResult";

function Quiz() {
  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { flashcards, studyTopic } = state;

  const quizQuestions = useMemo(() => {
    return flashcards.map((card, index) => {
      const wrongAnswers = flashcards
        .filter((_, i) => i !== index)
        .map((c) => c.answer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const options = [...wrongAnswers, card.answer].sort(
        () => Math.random() - 0.5
      );

      return {
        question: card.question,
        answer: card.answer,
        options,
      };
    });
  }, [flashcards]);

  const [questions, setQuestions] = useState(quizQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    const current = questions[currentQuestion];

    if (selectedAnswer === current.answer) {
      setScore((prev) => prev + 1);
    } else {
      setWrongQuestions((prev) => [...prev, current]);
    }

    setSelectedAnswer("");

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRetest = () => {
    if (wrongQuestions.length === 0) return;

    setQuestions(wrongQuestions);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setWrongQuestions([]);
    setShowResult(false);
  };

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">

      {!showResult && (

        <div className="quiz-header">

          <h1>🧠 FlashMind AI Quiz</h1>

          <p>
            Master your knowledge with AI-powered questions
          </p>

          <div className="topic-pill">
            {studyTopic}
          </div>

          <div className="question-info">

            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span>
              {Math.round(progress)}%
            </span>

          </div>

          <div className="progress-container">

            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>

          </div>

        </div>

      )}

      {showResult ? (

        <QuizResult
          score={score}
          totalQuestions={questions.length}
          wrongQuestions={wrongQuestions}
          onRetest={handleRetest}
        />

      ) : (

        <QuizQuestion
          question={questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={setSelectedAnswer}
          onNext={handleNext}
        />

      )}

    </div>
  );
}

export default Quiz;