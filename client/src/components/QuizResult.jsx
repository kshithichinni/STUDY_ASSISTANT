import { useNavigate } from "react-router-dom";
import "../styles/QuizResult.css";

function QuizResult({
  score,
  totalQuestions,
  wrongQuestions,
  onRetest,
}) {
  const navigate = useNavigate();

  const percentage = Math.round((score / totalQuestions) * 100);

  let message = "";
  let emoji = "";
  let stars = "";

  if (percentage === 100) {
    emoji = "🏆";
    message = "Outstanding! Perfect Score!";
    stars = "★★★★★";
  } else if (percentage >= 80) {
    emoji = "🌟";
    message = "Excellent Work!";
    stars = "★★★★☆";
  } else if (percentage >= 60) {
    emoji = "👏";
    message = "Great Job! Keep Learning!";
    stars = "★★★☆☆";
  } else if (percentage >= 40) {
    emoji = "📖";
    message = "Good Attempt! Keep Practicing!";
    stars = "★★☆☆☆";
  } else {
    emoji = "💪";
    message = "Don't Give Up! Practice Makes Perfect!";
    stars = "★☆☆☆☆";
  }

  return (
    <div className="result-container">
      <div className="result-card">

        <div className="result-icon">
          {emoji}
        </div>

        <h1 className="result-title">
          Quiz Completed!
        </h1>

        <div className="score-circle">
          <span className="score-percent">
            {percentage}%
          </span>

          <span className="score-label">
            SCORE
          </span>
        </div>

        <h2 className="score-text">
          {score} / {totalQuestions}
        </h2>

        <p className="stars" align="center">
          {stars}
        </p>

        <p className="performance-message">
          {message}
        </p>

        <div className="stats-grid">

          <div className="stat-card correct-card">
            <span className="stat-icon">✅</span>
            <h3>{score}</h3>
            <p>Correct</p>
          </div>

          <div className="stat-card wrong-card">
            <span className="stat-icon">❌</span>
            <h3>{totalQuestions - score}</h3>
            <p>Wrong</p>
          </div>

          <div className="stat-card accuracy-card">
            <span className="stat-icon">🎯</span>
            <h3>{percentage}%</h3>
            <p>Accuracy</p>
          </div>

        </div>

        <div className="footer-text">
          🚀 Ready for another challenge? Keep learning and improve your score!
        </div>

        <div className="result-buttons">

          {wrongQuestions.length > 0 && (
            <button
              className="retest-btn"
              onClick={onRetest}
            >
              🔄 Retest Wrong Answers
            </button>
          )}

          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            🏠 Back to Home
          </button>

        </div>

      </div>
    </div>
  );
}

export default QuizResult;