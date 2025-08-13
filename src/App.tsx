import Header from "./components/Header";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import SplashScreen from "./components/SplashScreen";
import { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getConfig } from "./components/ConfigPanel";
import heroLogoPng from "./assets/logo_eye_V2-removebg-preview.png";
import heroLogoWebp from "./assets/logo_eye_V2-removebg-preview.webp";
import heroLogoAvif from "./assets/logo_eye_V2-removebg-preview.avif";
import "./App.css";

const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const Portfolio = lazy(() => import("./components/Portfolio"));

function App() {
  const [config, setConfig] = useState(getConfig());
  const [showSplash, setShowSplash] = useState(true);

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
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const decodeImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        (img as any)
          .decode?.()
          .then(() => resolve())
          .catch(() => resolve());
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });

    const preload = async () => {
      const MIN_MS = 1200;
      const MAX_MS = 3000;
      const start = performance.now();

      const fontsReady = (document as any).fonts?.ready ?? Promise.resolve();

      const dynImports = Promise.allSettled([
        import("gsap"),
        import("tsparticles"),
      ]);

      const images = Promise.allSettled([
        decodeImage(heroLogoPng),
        decodeImage(heroLogoWebp),
        decodeImage(heroLogoAvif),
      ]);

      await Promise.race([
        Promise.allSettled([fontsReady, images, dynImports]),
        wait(MAX_MS),
      ]);

      const elapsed = performance.now() - start;
      if (elapsed < MIN_MS) await wait(MIN_MS - elapsed);
      setShowSplash(false);
    };

    preload();
  }, [showSplash]);

  const appClasses = ["App", !config.heavyShadows ? "config-heavy-shadows" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <PerformanceOptimizer>
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
