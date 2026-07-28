import "../styles/emptyState.css";

function EmptyState() {
  return (
    <section className="empty-state">

      <div className="empty-icon">📖</div>

      <h2>Ready to Study?</h2>

      <p>
        Generate flashcards from your notes.
      </p>

      <span>
        Your flashcards will appear here after you click
        <strong> Generate Flashcards</strong>.
      </span>

    </section>
  );
}

export default EmptyState;