import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StickyCTAProps {
  type?: "fab" | "banner" | "ribbon" | "panel";
  position?:
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
    | "bottom"
    | "right";
  glassmorphism?: boolean;
  pulse?: boolean;
  slideUp?: boolean;
  animated?: boolean;
  slideIn?: boolean;
  text?: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
}

const StickyCTA: React.FC<StickyCTAProps> = ({
  type = "fab",
  position = "bottom-right",
  glassmorphism = true,
  pulse = true,
  slideUp = false,
  animated = false,
  slideIn = false,
  text = "Projekt starten",
  icon = "🚀",
  onClick,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Show CTA after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior - scroll to contact section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Base styles for glassmorphism
  const glassmorphismStyles = glassmorphism
    ? {
        background:
          "linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(26, 26, 46, 0.8))",
        backdropFilter: "blur(30px)",
        border: "2px solid rgba(0, 212, 255, 0.6)",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 212, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }
    : {};

  // Position styles
  const getPositionStyles = () => {
    const baseStyles: React.CSSProperties = {
      position: "fixed",
      zIndex: 9999, // Much higher z-index
    };

    // Check if we're in guided mode and adjust accordingly
    const isGuidedMode = document.body.classList.contains("guided-mode");
    const topOffset = isGuidedMode ? "6rem" : "5rem";

    switch (position) {
      case "bottom-right":
        return { ...baseStyles, bottom: "2rem", right: "2rem" };
      case "bottom-left":
        return { ...baseStyles, bottom: "2rem", left: "2rem" };
      case "top-right":
        return { ...baseStyles, top: topOffset, right: "2rem" };
      case "top-left":
        return { ...baseStyles, top: topOffset, left: "2rem" };
      case "bottom":
        return { ...baseStyles, bottom: "0", left: "0", right: "0" };
      case "right":
        return {
          ...baseStyles,
          top: "50%",
          right: "0",
          transform: "translateY(-50%)",
        };
      default:
        return { ...baseStyles, bottom: "2rem", right: "2rem" };
    }
  };

  // Render different CTA types
  const renderCTA = () => {
    switch (type) {
      case "fab":
        return (
          <motion.button
            className={`sticky-cta-fab ${className}`}
            style={{
              ...getPositionStyles(),
              ...glassmorphismStyles,
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              color: "#fff",
              transition: "all 0.3s ease",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0,
              ...(pulse && {
                boxShadow: [
                  "0 8px 32px rgba(0, 212, 255, 0.3)",
                  "0 12px 40px rgba(57, 255, 20, 0.5)",
                  "0 8px 32px rgba(0, 212, 255, 0.3)",
                ],
              }),
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 12px 40px rgba(0, 212, 255, 0.6)",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{
              duration: 0.3,
              ...(pulse && {
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
          >
            <AnimatePresence>
              {isHovered ? (
                <motion.span
                  key="text"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: "0.7rem", whiteSpace: "nowrap" }}
                >
                  {text}
                </motion.span>
              ) : (
                <motion.span
                  key="icon"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {icon}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );

      case "banner":
        return (
          <motion.div
            className={`sticky-cta-banner ${className}`}
            style={{
              ...getPositionStyles(),
              ...glassmorphismStyles,
              width: "100%",
              padding: "1rem 2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
            initial={{ y: slideUp ? 100 : 0, opacity: 0 }}
            animate={{
              y: isVisible ? 0 : slideUp ? 100 : 0,
              opacity: isVisible ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span style={{ color: "#fff", fontSize: "1rem" }}>
              Bereit für Ihr nächstes Projekt?
            </span>
            <motion.button
              style={{
                background: "linear-gradient(45deg, #00d4ff, #39ff14)",
                color: "#000",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontFamily: "JetBrains Mono, monospace",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
            >
              {text}
            </motion.button>
          </motion.div>
        );

      case "ribbon":
        return (
          <motion.div
            className={`sticky-cta-ribbon ${className}`}
            style={{
              ...getPositionStyles(),
              ...glassmorphismStyles,
              padding: "0.35rem 1rem",
              borderRadius: "0 0 0 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              position: "relative",
              overflow: "hidden",
              minHeight: "32px",
              maxHeight: "32px",
            }}
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.8,
              x: isVisible ? 0 : 50,
              ...(animated && {
                boxShadow: [
                  "0 8px 25px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.2)",
                  "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(57, 255, 20, 0.6), 0 0 50px rgba(57, 255, 20, 0.3)",
                  "0 8px 25px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.2)",
                ],
              }),
            }}
            whileHover={{
              scale: 1.08,
              boxShadow:
                "0 15px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 212, 255, 0.7), 0 0 60px rgba(0, 212, 255, 0.3)",
            }}
            transition={{
              duration: 0.4,
              ...(animated && {
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }),
            }}
            onClick={handleClick}
          >
            {/* Neon background gradient */}
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(45deg, rgba(0, 212, 255, 0.15), rgba(57, 255, 20, 0.1), rgba(0, 212, 255, 0.08))",
                borderRadius: "0 0 0 12px",
              }}
            />

            {/* Neon icon */}
            <span
              style={{
                color: "#00d4ff",
                fontSize: "0.9rem",
                filter: "drop-shadow(0 0 6px rgba(0, 212, 255, 0.8))",
                textShadow: "0 0 8px rgba(0, 212, 255, 0.9)",
                zIndex: 1,
              }}
            >
              {icon}
            </span>

            {/* Neon text */}
            <span
              style={{
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: "700",
                textShadow:
                  "0 0 6px rgba(0, 212, 255, 0.8), 0 0 12px rgba(0, 212, 255, 0.4)",
                zIndex: 1,
                fontFamily: "JetBrains Mono, monospace",
                letterSpacing: "0.05em",
              }}
            >
              {text}
            </span>

            {/* Neon border glow */}
            <div
              style={{
                position: "absolute",
                top: "-2px",
                left: "-2px",
                right: "-2px",
                bottom: "-2px",
                borderRadius: "0 0 0 14px",
                background:
                  "linear-gradient(45deg, rgba(0, 212, 255, 0.8), rgba(57, 255, 20, 0.6), rgba(0, 212, 255, 0.4))",
                zIndex: -1,
                opacity: 0.7,
                filter: "blur(2px)",
              }}
            />
          </motion.div>
        );

      case "panel":
        return (
          <motion.div
            className={`sticky-cta-panel ${className}`}
            style={{
              ...getPositionStyles(),
              ...glassmorphismStyles,
              width: "300px",
              padding: "2rem",
              borderRadius: "12px 0 0 12px",
              cursor: "pointer",
            }}
            initial={{ x: slideIn ? 300 : 0, opacity: 0 }}
            animate={{
              x: isVisible ? 0 : slideIn ? 300 : 0,
              opacity: isVisible ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={handleClick}
          >
            <div style={{ color: "#fff", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                {icon}
              </div>
              <div
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  marginBottom: "0.5rem",
                }}
              >
                {text}
              </div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                Lassen Sie uns Ihr Projekt zum Leben erwecken
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return <AnimatePresence>{renderCTA()}</AnimatePresence>;
};

export default StickyCTA;
