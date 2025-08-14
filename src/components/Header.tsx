import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "../hooks/useNavigation";
import logo from "../assets/logo_eye_V2-removebg-preview.png";
import logoWebp from "../assets/logo_eye_V2-removebg-preview.webp";
import logoAvif from "../assets/logo_eye_V2-removebg-preview.avif";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/header.css";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLButtonElement>(null);

  const { activeSection, navigateToSection, navigateToHome, sections } =
    useNavigation();

  // Navigate to section with 3D transition
  const handleNavigation = (sectionId: string) => {
    console.log(`[Header] handleNavigation called with: ${sectionId}`);
    navigateToSection(
      sectionId as
        | "home"
        | "services"
        | "about"
        | "portfolio"
        | "tech"
        | "contact"
    );
    setIsMenuOpen(false);
  };

  // Handle logo click
  const handleLogoClick = () => {
    console.log(`[Header] handleLogoClick called`);
    navigateToHome();
    setIsMenuOpen(false);
  };

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      // Focus trap
      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  // Close menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <motion.div
          className="logo-container"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <picture>
            <source srcSet={logoAvif} type="image/avif" />
            <source srcSet={logoWebp} type="image/webp" />
            <img
              src={logo}
              alt="Split-Vision Logo"
              className="logo"
              tabIndex={0}
              onClick={handleLogoClick}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && handleLogoClick()
              }
              style={{ cursor: "pointer" }}
              aria-label="Navigate to home"
              width={48}
              height={48}
            />
          </picture>
          <span className="logo-text">Split-Vision</span>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          className="nav-desktop"
          role="navigation"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavigation(section.id)}
              className={`nav-link${
                activeSection === section.id ? " active" : ""
              }`}
              aria-current={activeSection === section.id ? "page" : undefined}
            >
              {section.label}
            </button>
          ))}
        </motion.nav>

        {/* Mobile Menu Button */}
        {!isMenuOpen && (
          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`hamburger${isMenuOpen ? " active" : ""}`}></span>
          </button>
        )}

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1200,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(8px)",
              }}
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </AnimatePresence>
        {/* Mobile Navigation */}
        <nav
          id="mobile-menu"
          className={`nav-mobile${isMenuOpen ? " active" : ""}`}
          role="navigation"
          ref={menuRef}
          aria-hidden={!isMenuOpen}
        >
          {/* Invisible placeholder for X button row */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 56,
              marginBottom: 8,
            }}
          >
            {isMenuOpen && (
              <button
                className="mobile-menu-close"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close navigation menu"
                style={{
                  position: "absolute",
                  top: 18,
                  right: 18,
                  zIndex: 1500,
                  background: "none",
                  border: "none",
                  fontSize: 48,
                  color: "#00d4ff",
                  cursor: "pointer",
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                &#10005;
              </button>
            )}
            {/* Visually hidden but occupies space */}
            <button
              tabIndex={-1}
              aria-hidden="true"
              style={{
                opacity: 0,
                pointerEvents: "none",
                width: "100%",
                height: 56,
                background: "none",
                border: "none",
              }}
            />
          </div>
          {sections.map((section, i) => (
            <button
              key={section.id}
              ref={i === 0 ? firstLinkRef : undefined}
              onClick={() => handleNavigation(section.id)}
              className={`nav-link-mobile${
                activeSection === section.id ? " active" : ""
              }`}
              aria-current={activeSection === section.id ? "page" : undefined}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
