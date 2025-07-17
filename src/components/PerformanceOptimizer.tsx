import React, { useEffect, useState } from "react";

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [fps, setFps] = useState(60);
  const [showPerformanceInfo, setShowPerformanceInfo] = useState(false);
  const [showLowPerfBanner, setShowLowPerfBanner] = useState(false);
  const [showParticlesDisabledBanner, setShowParticlesDisabledBanner] =
    useState(false);
  const lowPerfTriggeredRef = React.useRef(false);
  const lowFpsDurationRef = React.useRef(0);
  const lastFpsCheckRef = React.useRef(performance.now());

  // Helper to check if particles should be disabled
  window.__disableParticles = () => {
    return localStorage.getItem("disableParticles") === "true";
  };

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(mobile);
    };

    // Detect low power mode (iOS)
    const checkLowPower = () => {
      if (typeof (navigator as any).getBattery === "function") {
        (navigator as any)
          .getBattery()
          .then(
            (battery: {
              level: number;
              addEventListener: (type: string, listener: () => void) => void;
            }) => {
              setIsLowPower(battery.level < 0.2);
            }
          );
      }
    };

    // FPS monitoring (extended for particles disable)
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const currentFps = Math.round(
          (frameCount * 1000) / (currentTime - lastTime)
        );
        setFps(currentFps);
        frameCount = 0;
        lastTime = currentTime;

        // Track low FPS duration for particles disabling
        if (currentFps < 20) {
          lowFpsDurationRef.current += 1;
        } else {
          lowFpsDurationRef.current = 0;
        }
        if (lowFpsDurationRef.current >= 3 && !window.__disableParticles()) {
          // Disable particles for this session
          localStorage.setItem("disableParticles", "true");
          setShowParticlesDisabledBanner(true);
          setTimeout(() => setShowParticlesDisabledBanner(false), 3000);
          lowFpsDurationRef.current = 0; // Reset so it doesn't trigger again
        }
      }
      requestAnimationFrame(measureFPS);
    };

    checkMobile();
    checkLowPower();
    measureFPS();

    // Performance optimization based on device capabilities
    const optimizePerformance = () => {
      const root = document.documentElement;
      const isLowPerf = isMobile || isLowPower || fps < 30;
      if (isLowPerf) {
        root.style.setProperty("--particle-count-multiplier", "0.3");
        root.style.setProperty("--animation-complexity", "low");
        root.style.setProperty("--enable-heavy-animations", "false");
        // Show banner only once per low-perf activation
        if (!lowPerfTriggeredRef.current) {
          setShowLowPerfBanner(true);
          lowPerfTriggeredRef.current = true;
          setTimeout(() => setShowLowPerfBanner(false), 3000);
        }
      } else if (fps < 50) {
        root.style.setProperty("--particle-count-multiplier", "0.6");
        root.style.setProperty("--animation-complexity", "medium");
        root.style.setProperty("--enable-heavy-animations", "true");
        lowPerfTriggeredRef.current = false;
      } else {
        root.style.setProperty("--particle-count-multiplier", "1");
        root.style.setProperty("--animation-complexity", "high");
        root.style.setProperty("--enable-heavy-animations", "true");
        lowPerfTriggeredRef.current = false;
      }
    };

    optimizePerformance();

    // Listen for battery changes
    if (typeof (navigator as any).getBattery === "function") {
      (navigator as any)
        .getBattery()
        .then(
          (battery: {
            addEventListener: (type: string, listener: () => void) => void;
          }) => {
            battery.addEventListener("levelchange", checkLowPower);
            battery.addEventListener("chargingchange", checkLowPower);
          }
        );
    }

    // Listen for visibility changes to pause animations when tab is not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.style.setProperty("--animation-paused", "true");
      } else {
        document.body.style.setProperty("--animation-paused", "false");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isMobile, isLowPower, fps]);

  // Performance info toggle (hold Ctrl+Shift+P)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setShowPerformanceInfo((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <>
      {children}
      {/* Low Performance Banner */}
      {showLowPerfBanner && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: "5%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.92)",
            color: "#39ff14",
            borderRadius: "16px",
            padding: "1rem 2.5rem",
            fontWeight: 700,
            fontSize: "1.1rem",
            boxShadow: "0 4px 32px #00d4ff55",
            zIndex: 9999,
            textAlign: "center",
            pointerEvents: "none",
            userSelect: "none",
            letterSpacing: "0.02em",
            maxWidth: "90vw",
          }}
        >
          Low device detected: Performance mode activated
        </div>
      )}
      {/* Particles Disabled Banner */}
      {showParticlesDisabledBanner && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: "12%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.92)",
            color: "#ff0040",
            borderRadius: "16px",
            padding: "1rem 2.5rem",
            fontWeight: 700,
            fontSize: "1.1rem",
            boxShadow: "0 4px 32px #ff004055",
            zIndex: 9999,
            textAlign: "center",
            pointerEvents: "none",
            userSelect: "none",
            letterSpacing: "0.02em",
            maxWidth: "90vw",
          }}
        >
          Particle network disabled for better performance
        </div>
      )}
      {/* Performance Info Overlay */}
      {showPerformanceInfo && (
        <div className="performance-info">
          <div className="performance-card">
            <h3>Performance Monitor</h3>
            <div className="performance-stats">
              <div className="stat">
                <span className="label">FPS:</span>
                <span
                  className={`value ${
                    fps < 30 ? "warning" : fps < 50 ? "medium" : "good"
                  }`}
                >
                  {fps}
                </span>
              </div>
              <div className="stat">
                <span className="label">Device:</span>
                <span className="value">{isMobile ? "Mobile" : "Desktop"}</span>
              </div>
              <div className="stat">
                <span className="label">Power:</span>
                <span className={`value ${isLowPower ? "warning" : "good"}`}>
                  {isLowPower ? "Low" : "Normal"}
                </span>
              </div>
              <div className="stat">
                <span className="label">Optimization:</span>
                <span className="value">
                  {fps < 30 ? "Low" : fps < 50 ? "Medium" : "High"}
                </span>
              </div>
            </div>
            <p className="performance-tip">
              Hold Ctrl+Shift+P to toggle this panel
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PerformanceOptimizer;
