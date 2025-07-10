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

    // FPS monitoring
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    checkMobile();
    checkLowPower();
    measureFPS();

    // Performance optimization based on device capabilities
    const optimizePerformance = () => {
      const root = document.documentElement;

      if (isMobile || isLowPower || fps < 30) {
        // Reduce particle counts and animation complexity
        root.style.setProperty("--particle-count-multiplier", "0.3");
        root.style.setProperty("--animation-complexity", "low");
        root.style.setProperty("--enable-heavy-animations", "false");
      } else if (fps < 50) {
        // Medium optimization
        root.style.setProperty("--particle-count-multiplier", "0.6");
        root.style.setProperty("--animation-complexity", "medium");
        root.style.setProperty("--enable-heavy-animations", "true");
      } else {
        // Full performance
        root.style.setProperty("--particle-count-multiplier", "1");
        root.style.setProperty("--animation-complexity", "high");
        root.style.setProperty("--enable-heavy-animations", "true");
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
