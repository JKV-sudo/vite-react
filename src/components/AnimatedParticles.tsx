import React, { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./AnimatedParticlesBanner.css";

const getViewportWithMargin = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width: Math.round(width * 1.2),
    height: Math.round(height * 1.2),
  };
};

// Performance tier detection using hardware APIs
function getPerformanceTier() {
  const cores = navigator.hardwareConcurrency || 2;
  // Use type assertion to access deviceMemory
  const memory = (navigator as any).deviceMemory || 2;
  if (cores >= 6 && memory >= 4) return "high";
  if (cores >= 4 && memory >= 2) return "medium";
  return "low";
}

const AnimatedParticles: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [canvasSize, setCanvasSize] = useState(getViewportWithMargin());
  const [particleCount, setParticleCount] = useState(25);
  const [showBanner, setShowBanner] = useState(false);
  const [perfTier, setPerfTier] = useState<"high" | "medium" | "low">("high");

  useEffect(() => {
    // Check if particles should be disabled
    const checkDisabledState = () => {
      const isDisabled = localStorage.getItem("disableParticles") === "true";
      console.log(
        "[AnimatedParticles] localStorage.disableParticles:",
        localStorage.getItem("disableParticles"),
        "| enabled:",
        !isDisabled
      );
      setEnabled(!isDisabled);
    };

    // Initial check
    checkDisabledState();

    // Listen for storage changes (in case it's updated from another tab/window)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "disableParticles") {
        checkDisabledState();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also check periodically in case the function is set up after this component mounts
    const interval = setInterval(() => {
      if (typeof window.__disableParticles === "function") {
        const isDisabled = window.__disableParticles();
        setEnabled(!isDisabled);
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(getViewportWithMargin());
      // Recalculate performance tier on resize
      const tier = getPerformanceTier();
      setPerfTier(tier);
      if (tier === "high") setParticleCount(25);
      else if (tier === "medium") setParticleCount(15);
      else setParticleCount(7);
    };
    // Initial calculation
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Show banner for 3 seconds if low performance mode is activated
  useEffect(() => {
    if (perfTier === "low") {
      setShowBanner(true);
      const timer = setTimeout(() => setShowBanner(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [perfTier]);

  // Custom neon network config - OPTIMIZED FOR PERFORMANCE
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  if (!enabled) return null;

  return (
    <>
      {showBanner && (
        <div className="low-perf-banner">
          <span>Low Performance Mode Activated: Slow device detected</span>
          <button className="close-banner" onClick={() => setShowBanner(false)}>
            &times;
          </button>
        </div>
      )}
      <Particles
        id="tsparticles-neon-network"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          style: {
            position: "absolute",
            top: `-${(canvasSize.height - window.innerHeight) / 2}px`,
            left: `-${(canvasSize.width - window.innerWidth) / 2}px`,
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`,
            zIndex: "-1",
          },
          particles: {
            number: {
              value: particleCount,
              density: { enable: true, area: 1200 },
            },
            color: { value: ["#00d4ff", "#39ff14", "#9d4edd"] },
            shape: { type: "circle" },
            opacity: {
              value: 0.6,
              anim: { enable: false },
            },
            size: {
              value: 3,
              random: { enable: true, minimumValue: 1.5 },
              anim: { enable: false },
            },
            links: {
              enable: true,
              distance: 150,
              color: "#00d4ff",
              opacity: 0.4,
              width: 1.5,
              shadow: { enable: false },
            },
            move: {
              enable: true,
              speed: 0.8,
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "out" },
              attract: { enable: false },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" }, // Interactivity enabled
              onClick: { enable: true, mode: "push" }, // Interactivity enabled
              resize: true,
            },
            modes: {
              repulse: { distance: 120, duration: 0.4 },
              push: { quantity: 2 },
            },
          },
          retina_detect: false,
          fpsLimit: 60, // Keep 60 FPS
        }}
      />
    </>
  );
};

export default AnimatedParticles;
