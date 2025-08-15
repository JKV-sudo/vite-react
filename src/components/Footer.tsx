import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Minimal Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-title">Split-Vision</h3>
            <p className="footer-description">Ihre Vision, unsere Expertise.</p>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Kontakt</h4>
            <p className="footer-contact">hello@split-vision.de</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">© 2024 Split-Vision</p>
          <div className="footer-links">
            <a href="#" className="footer-link">
              Datenschutz
            </a>
            <a href="#" className="footer-link">
              Impressum
            </a>
          </div>
        </div>

        {/* Back to Top */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              className="back-to-top"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              ↑
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
};

export default Footer;
