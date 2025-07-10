import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import gsap from "gsap";

const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Particle effects for footer background
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  // Back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Neural network animation
  useEffect(() => {
    gsap.to(".neural-node", {
      scale: 1.2,
      duration: 2,
      stagger: 0.3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
  }, []);

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "💼",
      url: "https://linkedin.com/company/split-vision",
      color: "#0077b5",
    },
    {
      name: "Instagram",
      icon: "📸",
      url: "https://instagram.com/splitvision_agency",
      color: "#e4405f",
    },
    {
      name: "Twitter",
      icon: "🐦",
      url: "https://twitter.com/splitvision_de",
      color: "#1da1f2",
    },
    {
      name: "YouTube",
      icon: "📺",
      url: "https://youtube.com/@splitvision",
      color: "#ff0000",
    },
    {
      name: "GitHub",
      icon: "💻",
      url: "https://github.com/split-vision",
      color: "#333333",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Web-App Entwicklung",
    "Social Media Management",
    "Drohnenaufnahmen",
    "Branding & Design",
    "UI/UX Design",
    "Digital Marketing",
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      {/* Particle Background */}
      <Particles
        id="tsparticles-footer"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "grab",
              },
            },
            modes: {
              push: {
                quantity: 3,
              },
              grab: {
                distance: 120,
                links: {
                  opacity: 0.4,
                },
              },
            },
          },
          particles: {
            color: {
              value: ["#00d4ff", "#39ff14", "#ff006e", "#9d4edd"],
            },
            links: {
              color: "#00d4ff",
              distance: 120,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 600,
              },
              value: 60,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 4 },
            },
          },
          detectRetina: true,
        }}
      />

      <div className="footer-container">
        {/* Neural Network Header */}
        <motion.div
          className="neural-network-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="neural-nodes">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="neural-node"
                style={{
                  left: `${(i % 4) * 25}%`,
                  top: `${Math.floor(i / 4) * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            ))}
          </div>
          <h2 className="footer-title">Digital Nexus Terminal</h2>
          <p className="footer-subtitle">
            Connect with the future of digital marketing
          </p>
        </motion.div>

        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Information */}
          <motion.div
            className="footer-section company-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="section-title">Split-Vision</h3>
            <p className="company-description">
              Ihre Vision, unsere Expertise. Wir erschaffen digitale Erlebnisse,
              die begeistern und Ergebnisse liefern.
            </p>
            <div className="company-details">
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <span>Berlin, Deutschland</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📧</span>
                <span>hello@split-vision.de</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📱</span>
                <span>+49 123 456 789</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="footer-section quick-links"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="section-title">Quick Links</h3>
            <ul className="links-list">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <a href={link.href} className="footer-link">
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            className="footer-section services-list"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="section-title">Services</h3>
            <ul className="services-list">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="service-item">{service}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            className="footer-section newsletter"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="section-title">Stay Connected</h3>
            <p className="newsletter-description">
              Erhalten Sie die neuesten Updates und digitale Innovationen direkt
              in Ihr Postfach.
            </p>

            <AnimatePresence>
              {newsletterSuccess && (
                <motion.div
                  className="newsletter-success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="success-icon">✅</div>
                  <span>Newsletter erfolgreich abonniert!</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <div className="input-group">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Ihre E-Mail-Adresse"
                  required
                  className="newsletter-input"
                />
                <motion.button
                  type="submit"
                  className="newsletter-btn"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(57, 255, 20, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Abonnieren
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Social Media & Copyright */}
        <div className="footer-bottom">
          {/* Social Media */}
          <motion.div
            className="social-media"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h4 className="social-title">Follow Us</h4>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ borderColor: social.color }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.2,
                    boxShadow: `0 0 20px ${social.color}40`,
                  }}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="copyright"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="copyright-text">
              © 2024 Split-Vision. Alle Rechte vorbehalten. |
              <a href="/privacy" className="footer-link">
                {" "}
                Datenschutz
              </a>{" "}
              |
              <a href="/terms" className="footer-link">
                {" "}
                AGB
              </a>{" "}
              |
              <a href="/imprint" className="footer-link">
                {" "}
                Impressum
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="back-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 30px rgba(0, 212, 255, 0.7)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="back-to-top-icon">↑</span>
            <span className="back-to-top-text">Top</span>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
