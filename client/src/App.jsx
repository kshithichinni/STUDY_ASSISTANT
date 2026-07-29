import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";

function App() {
  return (
  <>
  <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flashcards" element={<Flashcards />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  </>
  );
}

export default App;
