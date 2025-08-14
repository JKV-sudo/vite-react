import React, { useState } from "react";
import { motion } from "framer-motion";
import logoPng from "../assets/logo_eye_V2-removebg-preview.png";
import logoWebp from "../assets/logo_eye_V2-removebg-preview.webp";
import logoAvif from "../assets/logo_eye_V2-removebg-preview.avif";

interface SplashScreenProps {
  onFinish?: () => void;
}

// Performance tier detection for splash screen
const getDevicePerformance = () => {
  const memory = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile && memory < 4) return "low";
  if (cores >= 4 && memory >= 4) return "high";
  return "medium";
};

const SplashScreen: React.FC<SplashScreenProps> = () => {
  const [perfTier] = useState(getDevicePerformance());
  const [reduceMotion] = useState(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  return (
    <div className="splash-screen" role="status" aria-live="polite">
      {/* Ambient grid + noise */}
      <div className="splash-bg" />

      {/* Rotating neon ring - Optimized */}
      {perfTier !== "low" && !reduceMotion && (
        <motion.div
          className="splash-ring"
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 360, opacity: 1 }}
          transition={{
            duration: perfTier === "high" ? 4 : 6,
            repeat: Infinity,
            ease: "linear",
            // Optimize for performance
            repeatType: "loop",
          }}
          style={{
            willChange: "transform",
            // Use transform3d for GPU acceleration
            transform: "translateZ(0)",
          }}
        />
      )}

      {/* Orbiting dots - Simplified for performance */}
      {perfTier === "high" && !reduceMotion && (
        <motion.div
          className="splash-orbit"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          <span className="orbit-dot dot1" />
          <span className="orbit-dot dot2" />
          <span className="orbit-dot dot3" />
        </motion.div>
      )}

      {/* Bi-colored logo stack - Performance optimized */}
      <motion.div
        className="splash-logo-wrap"
        initial={{ scale: 0.85, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      >
        <motion.div
          className="splash-logo-anim"
          animate={
            !reduceMotion
              ? {
                  y: perfTier === "high" ? [0, -6, 0] : [0, -3, 0],
                  rotateZ: perfTier === "high" ? [0, 2, -2, 0] : [0, 1, 0],
                  scale: perfTier === "high" ? [1, 1.02, 1] : [1, 1.01, 1],
                }
              : {}
          }
          transition={{
            duration: perfTier === "high" ? 3.2 : 4,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut",
            repeatType: "loop",
          }}
          style={{
            willChange: reduceMotion ? "auto" : "transform",
            transform: "translateZ(0)",
          }}
        >
          {/* Blue layer - Conditionally rendered for performance */}
          {perfTier === "high" && !reduceMotion && (
            <picture>
              <source srcSet={logoAvif} type="image/avif" />
              <source srcSet={logoWebp} type="image/webp" />
              <motion.img
                src={logoPng}
                alt=""
                aria-hidden="true"
                className="splash-logo-layer layer-blue"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.6, 0.9, 0.7, 0.6],
                  x: [2, 4, 2, -1, 2],
                  y: [0, -1, 0, 1, 0],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "loop",
                }}
                style={{
                  willChange: "transform, opacity",
                  transform: "translateZ(0)",
                }}
              />
            </picture>
          )}

          {/* Green layer - Conditionally rendered for performance */}
          {perfTier === "high" && !reduceMotion && (
            <picture>
              <source srcSet={logoAvif} type="image/avif" />
              <source srcSet={logoWebp} type="image/webp" />
              <motion.img
                src={logoPng}
                alt=""
                aria-hidden="true"
                className="splash-logo-layer layer-green"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.5, 0.8, 0.6, 0.5],
                  x: [-2, -4, -2, 1, -2],
                  y: [0, 1, 0, -1, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "loop",
                }}
                style={{
                  willChange: "transform, opacity",
                  transform: "translateZ(0)",
                }}
              />
            </picture>
          )}
          {/* Main layer - Always visible, optimized animations */}
          <picture>
            <source srcSet={logoAvif} type="image/avif" />
            <source srcSet={logoWebp} type="image/webp" />
            <motion.img
              src={logoPng}
              alt="Split-Vision Logo"
              className="splash-logo-layer layer-main"
              animate={
                !reduceMotion
                  ? {
                      scale: perfTier === "high" ? [1, 1.03, 1] : [1, 1.015, 1],
                      rotate: perfTier === "high" ? [0, 1, -1, 0] : [0, 0.5, 0],
                      // Remove expensive filter animations on lower-end devices
                      ...(perfTier === "high" && {
                        filter: [
                          "drop-shadow(0 0 18px #00d4ff) brightness(1.2)",
                          "drop-shadow(0 0 26px #39ff14) brightness(1.3)",
                          "drop-shadow(0 0 18px #00d4ff) brightness(1.2)",
                        ],
                      }),
                    }
                  : {}
              }
              transition={{
                duration: perfTier === "high" ? 2.6 : 3.2,
                repeat: reduceMotion ? 0 : Infinity,
                ease: "easeInOut",
                repeatType: "loop",
              }}
              style={{
                willChange: reduceMotion
                  ? "auto"
                  : perfTier === "high"
                  ? "transform, filter"
                  : "transform",
                transform: "translateZ(0)",
              }}
            />
          </picture>
          {/* Scanline - Optimized */}
          {perfTier !== "low" && !reduceMotion && (
            <motion.div
              className="splash-scanline"
              initial={{ y: "-120%" }}
              animate={{ y: "120%" }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
              style={{
                willChange: "transform",
                transform: "translateZ(0)",
              }}
            />
          )}

          {/* Shimmer sweep - High performance only */}
          {perfTier === "high" && !reduceMotion && (
            <motion.div
              className="splash-shimmer"
              initial={{ left: "-60%" }}
              animate={{ left: ["-60%", "160%"] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
                repeatType: "loop",
              }}
              style={{
                willChange: "transform",
                transform: "translateZ(0)",
              }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Sparks - Reduced count for performance */}
      {perfTier === "high" && !reduceMotion && (
        <div className="splash-sparks">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={`spark spark-${i + 1}`} />
          ))}
        </div>
      )}

      <motion.div
        className="splash-wordmark"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          willChange: "transform, opacity",
        }}
      >
        Split-Vision
      </motion.div>

      <div className="splash-progress-wrap">
        <motion.div
          className="splash-progress"
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "100%"] }}
          transition={{
            duration: 1.6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{
            willChange: "width",
            transform: "translateZ(0)",
          }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
