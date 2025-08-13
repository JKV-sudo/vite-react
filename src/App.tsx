import Header from "./components/Header";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import ConfigPanel from "./components/ConfigPanel";
import SplashScreen from "./components/SplashScreen";
import { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getConfig } from "./components/ConfigPanel";
import "./App.css";

const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const Portfolio = lazy(() => import("./components/Portfolio"));

function App() {
  const [config, setConfig] = useState(getConfig());
  const [showSplash, setShowSplash] = useState(() => {
    const isDev = import.meta.env.DEV;
    if (isDev) return true; // Always show in dev for easy testing
    return typeof window !== "undefined" && !sessionStorage.getItem("sv_seen");
  });

  useEffect(() => {
    const checkConfig = () => {
      setConfig(getConfig());
    };

    // Check config every 500ms for changes
    const interval = setInterval(checkConfig, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!showSplash) return;
    const timer = setTimeout(() => {
      sessionStorage.setItem("sv_seen", "1");
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [showSplash]);

  const appClasses = ["App", !config.heavyShadows ? "config-heavy-shadows" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <PerformanceOptimizer>
      <ConfigPanel />
      <AnimatePresence>
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.04 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ position: "relative", zIndex: 20000 }}
          >
            <SplashScreen />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0, filter: "blur(12px)", scale: 0.98 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <div className={appClasses}>
              <Header />
              <main>
                <Hero />
                <Suspense fallback={<div>Loading...</div>}>
                  <Services />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                  <About />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                  <Portfolio />
                </Suspense>
                <Contact />
              </main>
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PerformanceOptimizer>
  );
}

export default App;
