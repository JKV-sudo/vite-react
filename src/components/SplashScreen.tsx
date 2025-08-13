import React from "react";
import { motion } from "framer-motion";
import logoPng from "../assets/logo_eye_V2-removebg-preview.png";
import logoWebp from "../assets/logo_eye_V2-removebg-preview.webp";
import logoAvif from "../assets/logo_eye_V2-removebg-preview.avif";

interface SplashScreenProps {
  onFinish?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = () => {
  return (
    <div className="splash-screen" role="status" aria-live="polite">
      {/* Ambient grid + noise */}
      <div className="splash-bg" />

      {/* Rotating neon ring */}
      <motion.div
        className="splash-ring"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 1 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Orbiting dots */}
      <motion.div
        className="splash-orbit"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <span className="orbit-dot dot1" />
        <span className="orbit-dot dot2" />
        <span className="orbit-dot dot3" />
      </motion.div>

      {/* Bi-colored logo stack */}
      <motion.div
        className="splash-logo-wrap"
        initial={{ scale: 0.85, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.div
          className="splash-logo-anim"
          animate={{
            y: [0, -6, 0],
            rotateZ: [0, 2, -2, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Blue layer */}
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
              }}
            />
          </picture>
          {/* Green layer */}
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
              }}
            />
          </picture>
          {/* Main layer */}
          <picture>
            <source srcSet={logoAvif} type="image/avif" />
            <source srcSet={logoWebp} type="image/webp" />
            <motion.img
              src={logoPng}
              alt="Split-Vision Logo"
              className="splash-logo-layer layer-main"
              animate={{
                scale: [1, 1.03, 1],
                rotate: [0, 1, -1, 0],
                filter: [
                  "drop-shadow(0 0 18px #00d4ff) brightness(1.2)",
                  "drop-shadow(0 0 26px #39ff14) brightness(1.3)",
                  "drop-shadow(0 0 18px #00d4ff) brightness(1.2)",
                ],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </picture>
          {/* Scanline */}
          <motion.div
            className="splash-scanline"
            initial={{ y: "-120%" }}
            animate={{ y: "120%" }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
          {/* Shimmer sweep */}
          <motion.div
            className="splash-shimmer"
            initial={{ left: "-60%" }}
            animate={{ left: ["-60%", "160%"] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Sparks */}
      <div className="splash-sparks">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className={`spark spark-${i + 1}`} />
        ))}
      </div>

      <motion.div
        className="splash-wordmark"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Split-Vision
      </motion.div>

      <div className="splash-progress-wrap">
        <motion.div
          className="splash-progress"
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "100%"] }}
          transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
