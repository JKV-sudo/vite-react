import PerformanceOptimizer from "./components/PerformanceOptimizer";
import SplashScreen from "./components/SplashScreen";
import GuidedApp from "./components/GuidedApp";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getConfig } from "./components/ConfigPanel";
import heroLogoPng from "./assets/logo_eye_V2-removebg-preview.png";
import heroLogoWebp from "./assets/logo_eye_V2-removebg-preview.webp";
import heroLogoAvif from "./assets/logo_eye_V2-removebg-preview.avif";
import "./App.css";
import ThreeTransitionProvider from "./components/ThreeTransition";
import SnapshotPreloader from "./components/SnapshotPreloader";
import { NavigationProvider } from "./components/NavigationProvider";

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
        if (typeof (img as HTMLImageElement).decode === "function") {
          (img as HTMLImageElement)
            .decode()
            .then(() => resolve())
            .catch(() => resolve());
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }
      });

    const preload = async () => {
      const firstVisit = !sessionStorage.getItem("sv_seen");
      const MIN_MS = firstVisit ? 1500 : 600;
      const MAX_MS = firstVisit ? 3000 : 1500;
      const start = performance.now();

      const fontsReady: Promise<unknown> =
        (document as unknown as { fonts?: { ready: Promise<unknown> } }).fonts
          ?.ready ?? Promise.resolve();

      const dynImports = Promise.allSettled([
        import("gsap"),
        import("tsparticles"),
      ]);

      const images = Promise.allSettled([
        decodeImage(heroLogoPng),
        decodeImage(heroLogoWebp),
        decodeImage(heroLogoAvif),
      ]);

      // Optional future: add API prefetch into the array
      const dataPrefetch = Promise.resolve();
      await Promise.race([
        Promise.allSettled([fontsReady, images, dynImports, dataPrefetch]),
        wait(MAX_MS),
      ]);

      const elapsed = performance.now() - start;
      if (elapsed < MIN_MS) await wait(MIN_MS - elapsed);
      sessionStorage.setItem("sv_seen", "1");
      setShowSplash(false);
    };

    preload();
  }, [showSplash]);

  const appClasses = ["App", !config.heavyShadows ? "config-heavy-shadows" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <PerformanceOptimizer>
      <ThreeTransitionProvider>
        <NavigationProvider>
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
                <SnapshotPreloader />
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
                  <GuidedApp />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </NavigationProvider>
      </ThreeTransitionProvider>
    </PerformanceOptimizer>
  );
}

export default App;
