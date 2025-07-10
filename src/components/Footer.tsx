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
          <div className="neural-network">
            {/* SVG for neural connections */}
            <svg
              className="neural-connections"
              viewBox="0 0 400 200"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="neuralGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#39ff14" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ff006e" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {/* Neural connections - create a network pattern */}
              <motion.path
                d="M 50 50 L 150 50 L 250 50 L 350 50 M 50 50 L 100 100 L 150 50 M 150 50 L 200 100 L 250 50 M 250 50 L 300 100 L 350 50 M 50 150 L 150 150 L 250 150 L 350 150 M 50 150 L 100 100 L 150 150 M 150 150 L 200 100 L 250 150 M 250 150 L 300 100 L 350 150 M 100 100 L 200 100 L 300 100"
                stroke="url(#neuralGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>

            {/* Neural nodes */}
            <div className="neural-nodes">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="neural-node"
                  style={{
                    left: `${(i % 4) * 25 + 12.5}%`,
                    top: `${Math.floor(i / 4) * 50 + 25}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{
                    scale: 1.3,
                    boxShadow: "0 0 20px rgba(0, 212, 255, 0.8)",
                  }}
                />
              ))}
            </div>
          </div>
          <motion.h2
            className="footer-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span
              className="title-text"
              animate={{
                textShadow: [
                  "0 0 10px #00d4ff",
                  "0 0 20px #39ff14",
                  "0 0 30px #ff006e",
                  "0 0 20px #39ff14",
                  "0 0 10px #00d4ff",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {"Digital Nexus Terminal".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.1,
                    delay: 0.5 + index * 0.05,
                    ease: "easeOut",
                  }}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
            <motion.div
              className="title-glitch"
              animate={{
                opacity: [0, 1, 0],
                x: [0, -2, 2, 0],
                y: [0, 1, -1, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            >
              Digital Nexus Terminal
            </motion.div>
            <motion.div
              className="title-glitch-2"
              animate={{
                opacity: [0, 0.5, 0],
                x: [0, 2, -2, 0],
                y: [0, -1, 1, 0],
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            >
              Digital Nexus Terminal
            </motion.div>
          </motion.h2>
          <motion.p
            className="footer-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{
              textShadow: [
                "0 0 5px rgba(0, 212, 255, 0.3)",
                "0 0 10px rgba(57, 255, 20, 0.5)",
                "0 0 5px rgba(0, 212, 255, 0.3)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          >
            Connect with the future of digital marketing
          </motion.p>
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
