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
  console.log(`[SectionWrapper] Mounting section: ${sectionId}`);

  useEffect(() => {
    console.log(`[SectionWrapper] Section ${sectionId} mounted`);
    return () => {
      console.log(`[SectionWrapper] Section ${sectionId} unmounting`);
    };
  }, [sectionId]);

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

const GUIDED_APP_ID = Math.random().toString(36).substr(2, 9);

export const GuidedApp: React.FC = () => {
  const { activeSection } = useNavigation();

  console.log(
    `[GuidedApp#${GUIDED_APP_ID}] Component render - activeSection: "${activeSection}"`
  );

  // Set body class for guided mode
  useEffect(() => {
    document.body.classList.add("guided-mode");
    return () => {
      document.body.classList.remove("guided-mode");
    };
  }, []);

  // Debug active section changes and ensure consistency
  useEffect(() => {
    // Check if there's a navigation target that doesn't match current section
    const targetSection = sessionStorage.getItem("nav_target_section");
    if (targetSection && targetSection !== activeSection) {
      console.log(
        `[GuidedApp] Mismatch detected: activeSection=${activeSection}, target=${targetSection}`
      );
      // Don't auto-correct here to avoid loops, just log for debugging
    }
  }, [activeSection]);

  // Render only the active section
  const renderCurrentSection = () => {
    console.log(
      `[GuidedApp#${GUIDED_APP_ID}] renderCurrentSection called - activeSection: "${activeSection}"`
    );
    console.log(
      `[GuidedApp#${GUIDED_APP_ID}] Switch statement will check case: "${activeSection}"`
    );

    switch (activeSection) {
      case "home":
        console.log(`[GuidedApp] Switch matched "home" case`);
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
        console.log(`[GuidedApp] Switch matched "services" case`);
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
        console.log(`[GuidedApp] Switch matched "about" case`);
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
        console.error(
          `[GuidedApp] Unknown section: ${activeSection}, falling back to home`
        );
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
      <StickyCTA
        type="ribbon"
        position="bottom-left"
        glassmorphism={true}
        animated={true}
        text="Projekt starten"
        icon="⚡"
      />
    </div>
  );
};

export default GuidedApp;
