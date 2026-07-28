import logo from "../assets/logo.png";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">

  <img
    src={logo}
    alt="FlashMind AI Logo"
    className="logo-image"
  />

        <div className="logo-text">

          <h2>FlashMind AI</h2>

          <span>AI Study Assistant</span>

        </div>

      </div>

      <div className="tagline">

        ✨ Learn Smarter. Study Faster.

      </div>

    </nav>
  );
}

export default Navbar;