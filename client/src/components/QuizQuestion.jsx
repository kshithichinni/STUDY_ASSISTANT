import "../styles/QuizQuestion.css";

function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
}) {
  return (
    <div className="quiz-card">

      <div className="question-badge">
        📝 Question {questionNumber} of {totalQuestions}
      </div>

      <h2 className="question-title">
        {question.question}
      </h2>

      <div className="options">

        {question.options.map((option, index) => (

          <button
            key={index}
            className={
              selectedAnswer === option
                ? "option selected"
                : "option"
            }
            onClick={() => onSelectAnswer(option)}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>

            <span className="option-text">
              {option}
            </span>

          </button>

        ))}

      </div>

      <button
        className="next-btn"
        onClick={onNext}
        disabled={!selectedAnswer}
      >
        {questionNumber === totalQuestions
          ? "🏁 Finish Quiz"
          : "Next Question →"}
      </button>

    </div>
  );
}

export default QuizQuestion;