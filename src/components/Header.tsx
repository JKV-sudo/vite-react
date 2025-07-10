import React, { useState } from "react";
import logo from "../assets/logo_eye_V2-removebg-preview.png";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container">
          <img src={logo} alt="Split-Vision Logo" className="logo" />
          <span className="logo-text">Split-Vision</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <button onClick={() => scrollToSection("home")} className="nav-link">
            Home
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="nav-link"
          >
            Leistungen
          </button>
          <button onClick={() => scrollToSection("about")} className="nav-link">
            Über uns
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="nav-link"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="nav-link"
          >
            Kontakt
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Navigation Menu"
        >
          <span className={`hamburger ${isMenuOpen ? "active" : ""}`}></span>
        </button>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMenuOpen ? "active" : ""}`}>
          <button
            onClick={() => scrollToSection("home")}
            className="nav-link-mobile"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="nav-link-mobile"
          >
            Leistungen
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="nav-link-mobile"
          >
            Über uns
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="nav-link-mobile"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="nav-link-mobile"
          >
            Kontakt
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
