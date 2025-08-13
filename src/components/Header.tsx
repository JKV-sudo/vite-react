import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo_eye_V2-removebg-preview.png";
import logoWebp from "../assets/logo_eye_V2-removebg-preview.webp";
import logoAvif from "../assets/logo_eye_V2-removebg-preview.avif";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/header.css";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "services", label: "Leistungen" },
  { id: "about", label: "Über uns" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Kontakt" },
  { id: "techstack", label: "Tech Stack" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLButtonElement>(null);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  // Scroll to top on logo click
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  // Active link highlight on scroll
  useEffect(() => {
    const handleScroll = () => {
      let found = false;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActiveSection(link.id);
            found = true;
            break;
          }
        }
      }
      if (!found) setActiveSection("home");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              onClick={scrollToTop}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && scrollToTop()
              }
              style={{ cursor: "pointer" }}
              aria-label="Scroll to top"
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
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`nav-link${
                activeSection === link.id ? " active" : ""
              }`}
              aria-current={activeSection === link.id ? "page" : undefined}
            >
              {link.label}
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
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              ref={i === 0 ? firstLinkRef : undefined}
              onClick={() => scrollToSection(link.id)}
              className={`nav-link-mobile${
                activeSection === link.id ? " active" : ""
              }`}
              aria-current={activeSection === link.id ? "page" : undefined}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
