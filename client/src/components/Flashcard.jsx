import { useEffect, useState } from "react";

const Flashcard = ({ card }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
  }, [card]);

  return (
    <div
      className="flashcard"
      onClick={() => setShowAnswer(!showAnswer)}
    >
      <div className="flashcard-tip">
        💡 Click anywhere on the card to flip
      </div>

      <h2>{showAnswer ? "Answer" : "Question"}</h2>

      <p>{showAnswer ? card.answer : card.question}</p>

      <small>
        {showAnswer
          ? "Click to see question"
          : "Click to reveal answer"}
      </small>
    </div>
  );
};

export default Flashcard;