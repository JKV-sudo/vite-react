import React from "react";
import { motion, Variants, anticipate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import logo from "../assets/logo_eye_V2-removebg-preview.png";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import DroneIcon from "./DroneIcon";
import logoWebp from "../assets/logo_eye_V2-removebg-preview.webp";
import logoAvif from "../assets/logo_eye_V2-removebg-preview.avif";

// Add a custom hook for mobile detection
function useIsMobile(breakpoint = 700) {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

const Hero: React.FC = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const logoRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (logoRef.current) {
      // GSAP holographic entrance
      gsap.fromTo(
        logoRef.current,
        {
          filter: "blur(20px) brightness(0.2)",
          opacity: 0,
          scale: 0.7,
          rotateY: 60,
        },
        {
          filter: "blur(0px) brightness(1)",
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 2.2,
          ease: "power2.inOut",
        }
      );
      // Glitch flicker
      gsap.to(logoRef.current, {
        keyframes: [
          { x: -2, filter: "contrast(1.5) brightness(1.2)", duration: 0.08 },
          { x: 2, filter: "contrast(1.2) brightness(1.4)", duration: 0.08 },
          { x: 0, filter: "contrast(1) brightness(1)", duration: 0.08 },
        ],
        repeat: -1,
        repeatDelay: 2.5,
        yoyo: true,
        ease: "power2.inOut",
        delay: 2.3,
      });
    }
  }, []);

  // Framer Motion animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.25,
        duration: 1.2,
        ease: anticipate,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: anticipate },
    },
  };

  const logoVariants: Variants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: anticipate },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      boxShadow: "0 0 30px rgba(0, 212, 255, 0.8)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        duration: 0.5,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: anticipate },
    },
  };

  const buttonVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1, ease: anticipate },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(0, 212, 255, 0.6)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        duration: 0.5,
      },
    },
    tap: { scale: 0.97, transition: { duration: 0.2 } },
  };

  const featureVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: anticipate },
    },
    hover: {
      y: -5,
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(57, 255, 20, 0.3)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        duration: 0.5,
      },
    },
  };

  const featureIcons = [
    { icon: "🖥️", text: "Web-App Entwicklung" },
    { icon: "📱", text: "Social Media" },
    { icon: <DroneIcon size={32} />, text: "Drohnenaufnahmen" }, // Use the new DroneIcon component
  ];

  return (
    <section id="home" className="hero" ref={ref}>
      {/* Lazy render heavy elements only when in view */}
      {inView && (
        <>
          {/* Large RGB Split Background Logo */}
          <div className="hero-bg-logo" style={{ zIndex: 2 }}>
            <picture>
              <source srcSet={logoAvif} type="image/avif" />
              <source srcSet={logoWebp} type="image/webp" />
              <img
                src={logo} // TODO: Replace with WebP/AVIF for optimization
                alt="Split-Vision Logo BG Blue"
                className="hero-bg-logo-img"
                width={800}
                height={800}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  opacity: 0.18,
                  filter: "drop-shadow(0 0 80px #00d4ff)",
                  mixBlendMode: "screen",
                  transform: "translate(8px, 0) scale(1.04)",
                  zIndex: 1,
                }}
              />
            </picture>
            <picture>
              <source srcSet={logoAvif} type="image/avif" />
              <source srcSet={logoWebp} type="image/webp" />
              <img
                src={logo} // TODO: Replace with WebP/AVIF for optimization
                alt="Split-Vision Logo BG Red"
                className="hero-bg-logo-img"
                width={800}
                height={800}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  opacity: 0.13,
                  filter: "drop-shadow(0 0 80px #ff0040)",
                  mixBlendMode: "screen",
                  transform: "translate(-8px, 0) scale(1.04)",
                  zIndex: 1,
                }}
              />
            </picture>
            <picture>
              <source srcSet={logoAvif} type="image/avif" />
              <source srcSet={logoWebp} type="image/webp" />
              <img
                src={logo} // TODO: Replace with WebP/AVIF for optimization
                alt="Split-Vision Logo BG Main"
                className="hero-bg-logo-img"
                width={800}
                height={800}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  opacity: 0.22,
                  filter: "drop-shadow(0 0 80px #39ff14)",
                  mixBlendMode: "screen",
                  zIndex: 1,
                }}
              />
            </picture>
          </div>

          {/* Animated Matrix Particles Background */}

          {/* Floating 3D Neon Shapes */}
          <motion.div
            className="floating-shape shape-1"
            initial={{ x: -50, y: 100, scale: 0.8, rotate: 0, opacity: 0.7 }}
            animate={{
              x: [-50, -30, -70, -50],
              y: [100, 80, 120, 100],
              scale: [0.8, 1, 0.9, 0.8],
              rotate: [0, 15, -10, 0],
              opacity: [0.7, 1, 0.8, 0.7],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 180,
              height: 180,
              zIndex: 1, // above -1, below bg logo (2)
              pointerEvents: "none",
              filter: "blur(32px) brightness(0.7)",
            }}
          >
            <svg width="180" height="180" viewBox="0 0 180 180">
              <polygon
                points="90,10 170,60 140,170 40,170 10,60"
                fill="url(#neon1)"
                filter="url(#blur1)"
              />
              <defs>
                <linearGradient id="neon1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#39ff14" />
                </linearGradient>
                <filter id="blur1">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>
            </svg>
          </motion.div>
          <motion.div
            className="floating-shape shape-2"
            initial={{ x: 50, y: 400, scale: 1.1, rotate: 0, opacity: 0.6 }}
            animate={{
              x: [50, 70, 30, 50],
              y: [400, 420, 380, 400],
              scale: [1.1, 0.95, 1.2, 1.1],
              rotate: [0, -20, 10, 0],
              opacity: [0.6, 0.9, 0.7, 0.6],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 140,
              height: 140,
              zIndex: -1, // ensure behind bg logo
              pointerEvents: "none",
            }}
          >
            <svg width="140" height="140" viewBox="0 0 140 140">
              <polygon
                points="70,10 130,50 110,130 30,130 10,50"
                fill="url(#neon2)"
                filter="url(#blur2)"
              />
              <defs>
                <linearGradient id="neon2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#9d4edd" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
                <filter id="blur2">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
            </svg>
          </motion.div>
          <motion.div
            className="floating-shape shape-3"
            initial={{ x: 0, y: 500, scale: 0.7, rotate: 0, opacity: 0.5 }}
            animate={{
              x: [0, 40, -40, 0],
              y: [500, 520, 480, 500],
              scale: [0.7, 1, 0.8, 0.7],
              rotate: [0, 30, -15, 0],
              opacity: [0.5, 0.8, 0.6, 0.5],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 100,
              height: 100,
              zIndex: -1, // ensure behind bg logo
              pointerEvents: "none",
            }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100">
              <polygon
                points="50,10 90,40 75,90 25,90 10,40"
                fill="url(#neon3)"
                filter="url(#blur3)"
              />
              <defs>
                <linearGradient id="neon3" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff0040" />
                  <stop offset="100%" stopColor="#39ff14" />
                </linearGradient>
                <filter id="blur3">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>
            </svg>
          </motion.div>

          {/* Matrix Background */}
          <div className="matrix-bg"></div>
        </>
      )}

      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Logo */}
        <motion.div
          className="hero-logo"
          variants={logoVariants}
          whileHover={
            !isMobile
              ? {
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 0 30px rgba(0, 212, 255, 0.8)",
                  filter:
                    "blur(2.5px) drop-shadow(0 0 24px #00d4ff) drop-shadow(0 0 24px #39ff14)",
                  borderRadius: "50%",
                  transition: {
                    type: "spring",
                    stiffness: 120,
                    damping: 12,
                    duration: 0.5,
                  },
                }
              : undefined
          }
          style={
            isMobile
              ? {
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 0 30px rgba(0, 212, 255, 0.8)",
                  filter:
                    "blur(2.5px) drop-shadow(0 0 24px #00d4ff) drop-shadow(0 0 24px #39ff14)",
                  borderRadius: "50%",
                }
              : {
                  position: "relative",
                  display: "inline-block",
                  borderRadius: "50%",
                }
          }
          ref={logoRef}
        >
          {/* RGB Split Layers */}
          <picture>
            <source srcSet={logoAvif} type="image/avif" />
            <source srcSet={logoWebp} type="image/webp" />
            <img
              src={logo}
              alt="Split-Vision Logo"
              className="hero-logo-img"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                filter: "drop-shadow(0 0 20px #00d4ff) brightness(1.3)",
                opacity: 0.7,
                mixBlendMode: "screen",
                borderRadius: "50%",
                transform: "translate(2px, 0) scale(1.01)",
                zIndex: 2,
              }}
            />
          </picture>
          <picture>
            <source srcSet={logoAvif} type="image/avif" />
            <source srcSet={logoWebp} type="image/webp" />
            <img
              src={logo}
              alt="Split-Vision Logo"
              className="hero-logo-img"
              style={{
                position: "absolute",
                borderRadius: "50%",
                left: 0,
                top: 0,
                filter: "drop-shadow(0 0 20px #ff0040) brightness(1.1)",
                opacity: 0.5,
                mixBlendMode: "screen",
                transform: "translate(-2px, 0) scale(1.01)",
                zIndex: 2,
              }}
            />
          </picture>
          {/* Main Logo */}
          <motion.img
            src={logo}
            alt="Split-Vision Logo"
            className="hero-logo-img"
            animate={{
              filter: [
                "drop-shadow(0 0 20px #00d4ff) brightness(1.3)",
                "drop-shadow(0 0 30px #39ff14) brightness(1.5)",
                "drop-shadow(0 0 20px #00d4ff) brightness(1.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ position: "relative", zIndex: 3, borderRadius: "50%" }}
          />
          {/* Scanline Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              borderRadius: "50%",
              zIndex: 4,
              background:
                "repeating-linear-gradient(180deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.15) 2px, transparent 4px, transparent 8px)",
              mixBlendMode: "overlay",
              animation: "scanlineMove 2s linear infinite",
            }}
          />
        </motion.div>

        {/* Animated Main Headline */}
        <motion.h1 className="hero-title" variants={itemVariants}>
          <motion.span
            className="hero-title-main"
            variants={titleVariants}
            animate={{
              textShadow: [
                "0 0 10px #00d4ff",
                "0 0 20px #39ff14",
                "0 0 10px #00d4ff",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Split-Vision
          </motion.span>
          <motion.span
            className="hero-title-sub"
            variants={itemVariants}
            animate={{
              opacity: [1, 0.8, 1],
              textShadow: [
                "0 0 15px #39ff14",
                "0 0 25px #39ff14",
                "0 0 15px #39ff14",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Ihre Vision, unsere Expertise
          </motion.span>
        </motion.h1>

        {/* Animated Hero Statement */}
        <motion.p className="hero-description" variants={itemVariants}>
          Marketing-Agentur für <strong>Web-App Entwicklung</strong>,
          <strong> Social Media Management</strong> und{" "}
          <strong>Drohnenaufnahmen</strong>
        </motion.p>

        {/* Animated Subtext */}
        <motion.p className="hero-subtext" variants={itemVariants}>
          Wir erschaffen digitale Erlebnisse, die im Gedächtnis bleiben.
          Cutting-edge Technologie trifft auf kreative Vision.
        </motion.p>

        {/* Animated Call-to-Action Buttons */}
        <motion.div
          className="hero-cta"
          variants={itemVariants}
          style={{ zIndex: 10, position: "relative" }}
        >
          <motion.button
            onClick={scrollToContact}
            className="cta-primary"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Projekt starten
            </motion.span>
          </motion.button>
          <motion.button
            onClick={() => {
              const element = document.getElementById("services");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="cta-secondary"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Unsere Leistungen
          </motion.button>
          <motion.button
            onClick={() => {
              const element = document.getElementById("about");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="cta-secondary"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Über uns
          </motion.button>
          <motion.button
            onClick={() => {
              const element = document.getElementById("portfolio");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="cta-secondary"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Portfolio
          </motion.button>
        </motion.div>

        {/* Animated Key Points */}
        <motion.div className="hero-features" variants={itemVariants}>
          {featureIcons.map((feature, index) => (
            <motion.div
              key={index}
              className="feature"
              variants={featureVariants}
              whileHover="hover"
              custom={index}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0, 212, 255, 0.3)",
                  "0 0 30px rgba(57, 255, 20, 0.4)",
                  "0 0 20px rgba(0, 212, 255, 0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            >
              <motion.span
                className="feature-icon"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3,
                }}
              >
                {feature.icon}
              </motion.span>
              <span className="feature-text">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Background Elements */}
        <motion.div className="hero-background">
          <motion.div
            className="gradient-orb orb-1"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="gradient-orb orb-2"
            animate={{
              x: [0, -20, 30, 0],
              y: [0, 20, -30, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
