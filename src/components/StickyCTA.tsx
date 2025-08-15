import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/eye-animations.css";

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

  // Eye component with CodePen-style animation
  const EyeIcon = () => (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 30% 30%, #ffffff 0%, #f0f0f0 30%, #e0e0e0 60%, #d0d0d0 100%)",
          border: "2px solid #333",
          overflow: "hidden",
          animation: "eyeBlink 4s infinite",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "25%",
            width: "50%",
            height: "50%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, #4a90e2 0%, #357abd 50%, #2c5aa0 100%)",
            border: "2px solid #1a365d",
            animation: "eyeMove 3s infinite",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "25%",
              left: "25%",
              width: "50%",
              height: "50%",
              borderRadius: "50%",
              background: "#000",
              boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.3)",
              animation: "pupilMove 3s infinite",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "15%",
              width: "20%",
              height: "20%",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.8)",
            }}
          ></div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) 30%, transparent 70%)",
            borderRadius: "50%",
            transformOrigin: "center top",
            animation: "eyelidBlink 4s infinite",
          }}
        ></div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "-5px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "10px",
        }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: `${i * 20}%`,
              width: "2px",
              height: "8px",
              background: "#333",
              borderRadius: "50%",
              transform: `rotate(${i * 10 - 20}deg)`,
              transformOrigin: "bottom center",
            }}
          />
        ))}
      </div>
    </div>
  );

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
              padding: "8px",
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
                  style={{
                    fontSize: "0.7rem",
                    whiteSpace: "nowrap",
                    color: "#fff",
                    textShadow: "0 0 8px rgba(0, 212, 255, 0.8)",
                    fontWeight: "700",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {text}
                </motion.span>
              ) : (
                <motion.div
                  key="eye"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <EyeIcon />
                </motion.div>
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
            <div style={{ width: "32px", height: "32px" }}>
              <EyeIcon />
            </div>
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

            {/* Eye icon */}
            <div style={{ width: "20px", height: "20px", zIndex: 1 }}>
              <EyeIcon />
            </div>

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
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.5rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: "48px", height: "48px" }}>
                  <EyeIcon />
                </div>
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
