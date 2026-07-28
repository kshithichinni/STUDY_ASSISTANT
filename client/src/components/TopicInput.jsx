import "../styles/topicInput.css";

function TopicInput() {
  return (
    <section className="input-card">

      <h2>Enter your Topic or Notes</h2>

      <textarea
        placeholder="Example: Explain Operating Systems, DBMS, Computer Networks..."
      ></textarea>

      <div className="difficulty-section">

        <p>Select Difficulty</p>

        <div className="difficulty-buttons">

          <button className="difficulty active">
            Medium
          </button>

          <button className="difficulty">
            Easy
          </button>

          <button className="difficulty">
            Hard
          </button>

        </div>

      </div>

      <button className="generate-btn">
        Generate Flashcards
      </button>

    </section>
  );
}

export default TopicInput;