import React, { useState } from "react";
import { motion } from "framer-motion";
import StickyCTA from "./StickyCTA";

const CTADemo: React.FC = () => {
  const [activeType, setActiveType] = useState<
    "fab" | "banner" | "ribbon" | "panel"
  >("fab");
  const [activePosition, setActivePosition] = useState<
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
    | "bottom"
    | "right"
  >("bottom-right");

  const ctaOptions = [
    {
      type: "fab" as const,
      name: "Floating Action Button",
      description: "Circular button with hover text reveal",
      icon: "🚀",
      features: ["Glassmorphism", "Pulse animation", "Hover text", "Compact"],
    },
    {
      type: "banner" as const,
      name: "Bottom Banner",
      description: "Full-width banner with slide-up animation",
      icon: "📢",
      features: [
        "Slide-up animation",
        "Full-width",
        "Prominent",
        "Mobile-friendly",
      ],
    },
    {
      type: "ribbon" as const,
      name: "Corner Ribbon",
      description: "Animated corner ribbon with rotation",
      icon: "🎗️",
      features: [
        "Corner placement",
        "Rotation animation",
        "Compact",
        "Eye-catching",
      ],
    },
    {
      type: "panel" as const,
      name: "Side Panel",
      description: "Sliding side panel with detailed content",
      icon: "📋",
      features: [
        "Slide-in animation",
        "Detailed content",
        "Large surface",
        "Informative",
      ],
    },
  ];

  const positionOptions = [
    { value: "bottom-right", label: "Bottom Right", icon: "↘️" },
    { value: "bottom-left", label: "Bottom Left", icon: "↙️" },
    { value: "top-right", label: "Top Right", icon: "↗️" },
    { value: "top-left", label: "Top Left", icon: "↖️" },
    { value: "bottom", label: "Bottom", icon: "⬇️" },
    { value: "right", label: "Right Side", icon: "➡️" },
  ];

  return (
    <div
      style={{
        padding: "2rem",
        background: "linear-gradient(135deg, #0a0a0c, #1a1a2e)",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: "2.5rem",
            textAlign: "center",
            marginBottom: "1rem",
            fontFamily: "JetBrains Mono, monospace",
            background: "linear-gradient(45deg, #00d4ff, #39ff14)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Sticky CTA Options
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            textAlign: "center",
            fontSize: "1.1rem",
            marginBottom: "3rem",
            opacity: 0.8,
          }}
        >
          Choose your preferred sticky call-to-action style
        </motion.p>

        {/* CTA Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: "3rem" }}
        >
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>
            CTA Type
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {ctaOptions.map((option) => (
              <motion.div
                key={option.type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveType(option.type)}
                style={{
                  background: "rgba(0, 0, 0, 0.3)",
                  backdropFilter: "blur(20px)",
                  border: `2px solid ${
                    activeType === option.type
                      ? "#00d4ff"
                      : "rgba(255, 255, 255, 0.1)"
                  }`,
                  borderRadius: "12px",
                  padding: "1.5rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={{ fontSize: "2rem", marginRight: "1rem" }}>
                    {option.icon}
                  </span>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                      {option.name}
                    </h3>
                    <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                      {option.description}
                    </p>
                  </div>
                </div>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  {option.features.map((feature, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(0, 212, 255, 0.2)",
                        color: "#00d4ff",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        border: "1px solid rgba(0, 212, 255, 0.3)",
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Position Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: "3rem" }}
        >
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>
            Position
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1rem",
            }}
          >
            {positionOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActivePosition(option.value as any)}
                style={{
                  background:
                    activePosition === option.value
                      ? "linear-gradient(45deg, #00d4ff, #39ff14)"
                      : "rgba(0, 0, 0, 0.3)",
                  color: activePosition === option.value ? "#000" : "#fff",
                  border: `2px solid ${
                    activePosition === option.value
                      ? "#00d4ff"
                      : "rgba(255, 255, 255, 0.1)"
                  }`,
                  borderRadius: "8px",
                  padding: "1rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                  backdropFilter: "blur(20px)",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Live Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(0, 212, 255, 0.3)",
            borderRadius: "12px",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
            Live Preview
          </h2>
          <p style={{ marginBottom: "2rem", opacity: 0.8 }}>
            The CTA will appear in the selected position. Scroll down to see it
            in action!
          </p>

          {/* Multiple CTAs for demo */}
          <StickyCTA
            type={activeType}
            position={activePosition}
            glassmorphism={true}
            pulse={true}
            text="Projekt starten"
            icon="🚀"
          />

          {/* Show different positions for demo */}
          {activeType === "fab" && (
            <>
              <StickyCTA
                type="fab"
                position="bottom-left"
                glassmorphism={true}
                pulse={false}
                text="Demo"
                icon="🎯"
              />
              <StickyCTA
                type="fab"
                position="top-right"
                glassmorphism={true}
                pulse={false}
                text="Demo"
                icon="⚡"
              />
            </>
          )}
        </motion.div>

        {/* Usage Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: "3rem",
            background: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(57, 255, 20, 0.3)",
            borderRadius: "12px",
            padding: "2rem",
          }}
        >
          <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>Usage</h2>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              borderRadius: "8px",
              padding: "1rem",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.9rem",
              overflow: "auto",
            }}
          >
            <pre style={{ margin: 0, color: "#00d4ff" }}>
              {`<StickyCTA 
  type="${activeType}"
  position="${activePosition}"
  glassmorphism={true}
  pulse={true}
  text="Projekt starten"
  icon="🚀"
/>`}
            </pre>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTADemo;
