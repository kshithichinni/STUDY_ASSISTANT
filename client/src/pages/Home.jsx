import Navbar from "../components/Navbar";
import "../styles/home.css";
import TopicInput from "../components/TopicInput";
import EmptyState from "../components/EmptyState";
import API from "../services/api";

function Home() {
  const handleGenerate = async ({ topic, difficulty }) => {
  try {
    const response = await API.post("/generate", {
      topic,
      difficulty,
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
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

        <EmptyState />
      </main>
    </>
  );
}

export default Home;