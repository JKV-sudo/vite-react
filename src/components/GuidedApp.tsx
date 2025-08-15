import React, { Suspense, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from "../hooks/useNavigation";
import Header from "./Header";
import Hero from "./Hero";
import Contact from "./Contact";
import Footer from "./Footer";
import CubeController from "./CubeController";
import StickyCTA from "./StickyCTA";
import "../styles/guided.css";

// Lazy load sections for performance
const Services = React.lazy(() => import("./Services"));
const About = React.lazy(() => import("./About"));
const Portfolio = React.lazy(() => import("./Portfolio"));
const TechStack = React.lazy(() => import("./TechStack"));

// Loading component for section transitions
const SectionLoader: React.FC = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #0a0a0c, #1a1a2e)",
      color: "#00d4ff",
      fontSize: 18,
      fontWeight: 500,
    }}
  >
    <motion.div
      animate={{
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      Loading Section...
    </motion.div>
  </div>
);

// Section wrapper with entrance animations
const SectionWrapper: React.FC<{
  children: React.ReactNode;
  sectionId: string;
}> = ({ children, sectionId }) => {
  return (
    <motion.div
      key={sectionId}
      className="section-wrapper"
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.95,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        y: -50,
        scale: 1.05,
        filter: "blur(10px)",
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        position: "relative", // Ensure proper stacking
        zIndex: 1, // Base z-index
        // backgroundColor: "transparent", // No debug styling needed
      }}
    >
      {children}
    </motion.div>
  );
};

export const GuidedApp: React.FC = () => {
  const { activeSection } = useNavigation();

  // Set body class for guided mode
  useEffect(() => {
    document.body.classList.add("guided-mode");
    return () => {
      document.body.classList.remove("guided-mode");
    };
  }, []);

  // Render only the active section
  const renderCurrentSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <SectionWrapper sectionId="home">
            <Header />
            <main style={{ flex: 1 }}>
              <Hero />
            </main>
            <Footer />
            <CubeController />
          </SectionWrapper>
        );

      case "services":
        return (
          <SectionWrapper sectionId="services">
            <Header />
            <main style={{ flex: 1 }}>
              <Suspense fallback={<SectionLoader />}>
                <Services />
              </Suspense>
            </main>
            <Footer />
            <CubeController />
          </SectionWrapper>
        );

      case "about":
        return (
          <SectionWrapper sectionId="about">
            <Header />
            <main style={{ flex: 1 }}>
              <Suspense fallback={<SectionLoader />}>
                <About />
              </Suspense>
            </main>
            <Footer />
            <CubeController />
          </SectionWrapper>
        );

      case "portfolio":
        return (
          <SectionWrapper sectionId="portfolio">
            <Header />
            <main style={{ flex: 1 }}>
              <Suspense fallback={<SectionLoader />}>
                <Portfolio />
              </Suspense>
            </main>
            <Footer />
            <CubeController />
          </SectionWrapper>
        );

      case "tech":
        return (
          <SectionWrapper sectionId="tech">
            <Header />
            <main style={{ flex: 1 }}>
              <Suspense fallback={<SectionLoader />}>
                <TechStack />
              </Suspense>
            </main>
            <Footer />
            <CubeController />
          </SectionWrapper>
        );

      case "contact":
        return (
          <SectionWrapper sectionId="contact">
            <Header />
            <main style={{ flex: 1 }}>
              <Contact />
            </main>
            <Footer />
            <CubeController />
          </SectionWrapper>
        );

      default:
        return (
          <SectionWrapper sectionId="home">
            <Header />
            <main style={{ flex: 1 }}>
              <Hero />
            </main>
            <Footer />
            <CubeController />
          </SectionWrapper>
        );
    }
  };

  return (
    <div
      className="guided-app"
      style={{
        minHeight: "100vh", // Allow content to expand
        overflow: "auto", // Allow scrolling when content is taller
        background: "linear-gradient(135deg, #0a0a0c, #1a1a2e)",
      }}
    >
      <AnimatePresence mode="wait">{renderCurrentSection()}</AnimatePresence>
      {/* Eye-based StickyCTA - Ribbon style */}
      <StickyCTA
        type="ribbon"
        position="bottom-left"
        glassmorphism={true}
        animated={true}
        text="Projekt starten"
      />

      {/* Eye-based StickyCTA - FAB style */}
      <StickyCTA
        type="fab"
        position="bottom-right"
        glassmorphism={true}
        pulse={true}
        text="Kontakt"
      />
    </div>
  );
};

export default GuidedApp;
