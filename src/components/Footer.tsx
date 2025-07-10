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
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="50%" stopColor="#39ff14" />
                  <stop offset="100%" stopColor="#ff006e" />
                </linearGradient>
              </defs>
              {/* Neural connections */}
              <path
                d="M50,50 L150,30 L250,70 L350,50 M50,100 L150,80 L250,120 L350,100 M50,150 L150,130 L250,170 L350,150"
                stroke="url(#neuralGradient)"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
                className="neural-path"
              />
            </svg>
            {/* Neural nodes */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="neural-node"
                style={{
                  position: "absolute",
                  left: `${50 + (i % 4) * 100}px`,
                  top: `${50 + Math.floor(i / 4) * 50}px`,
                  width: "8px",
                  height: "8px",
                  background:
                    i % 3 === 0
                      ? "#00d4ff"
                      : i % 3 === 1
                      ? "#39ff14"
                      : "#ff006e",
                  borderRadius: "50%",
                  boxShadow: `0 0 10px ${
                    i % 3 === 0
                      ? "#00d4ff"
                      : i % 3 === 1
                      ? "#39ff14"
                      : "#ff006e"
                  }`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <motion.h2
            className="footer-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
              delay: 0.3,
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
                }}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
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

        {/* Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h3
              className="section-title"
              animate={{
                textShadow: [
                  "0 0 10px #00d4ff",
                  "0 0 15px #39ff14",
                  "0 0 10px #00d4ff",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Split-Vision
            </motion.h3>
            <p className="company-description">
              Ihre Vision, unsere Expertise. Wir erschaffen digitale Erlebnisse,
              die im Gedächtnis bleiben.
            </p>
            <motion.div
              className="social-links"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{
                    scale: 1.2,
                    boxShadow: `0 0 20px ${social.color}40`,
                  }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    boxShadow: [
                      `0 0 10px ${social.color}30`,
                      `0 0 20px ${social.color}50`,
                      `0 0 10px ${social.color}30`,
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                >
                  <span className="social-icon">{social.icon}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h3
              className="section-title"
              animate={{
                textShadow: [
                  "0 0 10px #39ff14",
                  "0 0 15px #00d4ff",
                  "0 0 10px #39ff14",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              Quick Links
            </motion.h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <motion.a
                    href={link.href}
                    className="footer-link"
                    whileHover={{
                      x: 5,
                      textShadow: "0 0 10px #39ff14",
                    }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.h3
              className="section-title"
              animate={{
                textShadow: [
                  "0 0 10px #ff006e",
                  "0 0 15px #39ff14",
                  "0 0 10px #ff006e",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              Services
            </motion.h3>
            <ul className="footer-links">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <motion.span
                    className="footer-link"
                    whileHover={{
                      x: 5,
                      textShadow: "0 0 10px #ff006e",
                    }}
                  >
                    {service}
                  </motion.span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.h3
              className="section-title"
              animate={{
                textShadow: [
                  "0 0 10px #9d4edd",
                  "0 0 15px #00d4ff",
                  "0 0 10px #9d4edd",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3,
              }}
            >
              Newsletter
            </motion.h3>
            <p className="newsletter-description">
              Bleiben Sie auf dem Laufenden mit unseren neuesten Projekten und
              Insights.
            </p>
            <motion.form
              className="newsletter-form"
              onSubmit={handleNewsletterSubmit}
              whileHover={{ scale: 1.02 }}
            >
              <motion.input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Ihre E-Mail Adresse"
                className="newsletter-input"
                whileFocus={{
                  boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
                }}
              />
              <motion.button
                type="submit"
                className="newsletter-button"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(57, 255, 20, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Abonnieren
              </motion.button>
            </motion.form>
            <AnimatePresence>
              {newsletterSuccess && (
                <motion.div
                  className="newsletter-success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  ✅ Newsletter erfolgreich abonniert!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2024 Split-Vision. Alle Rechte vorbehalten.
            </p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">
                Datenschutz
              </a>
              <a href="#" className="footer-bottom-link">
                Impressum
              </a>
              <a href="#" className="footer-bottom-link">
                AGB
              </a>
            </div>
          </div>
        </motion.div>

        {/* Back to Top Portal */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              className="back-to-top"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                boxShadow: [
                  "0 0 20px rgba(0, 212, 255, 0.4)",
                  "0 0 30px rgba(57, 255, 20, 0.5)",
                  "0 0 20px rgba(0, 212, 255, 0.4)",
                ],
              }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 30px rgba(0, 212, 255, 0.6)",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="portal-icon">🚀</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
};

export default Footer;
