import React, { useEffect, useState, createContext, useContext } from "react";

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

// Create context for particles state
interface ParticlesContextType {
  enabled: boolean;
}

const ParticlesContext = createContext<ParticlesContextType>({ enabled: true });

// Hook to use particles context
export const useParticles = () => useContext(ParticlesContext);

// Expose broader performance info
type PerfTier = "low" | "medium" | "high";
interface PerfContextType {
  tier: PerfTier;
  fps: number;
  heavyAnimations: boolean;
  particlesEnabled: boolean;
  isMobile: boolean;
}
export const PerfContext = createContext<PerfContextType>({
  tier: "medium",
  fps: 60,
  heavyAnimations: true,
  particlesEnabled: true,
  isMobile: false,
});

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [connectionType, setConnectionType] = useState<string | undefined>(
    undefined
  );
  const [fps, setFps] = useState(60);
  const [fpsAvg, setFpsAvg] = useState(60);
  const [tier, setTier] = useState<PerfTier>(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("sv_tier");
      if (stored === "low" || stored === "medium" || stored === "high") {
        return stored as PerfTier;
      }
    }
    return "medium";
  });
  const [showPerformanceInfo, setShowPerformanceInfo] = useState(false);
  const [showLowPerfBanner, setShowLowPerfBanner] = useState(false);
  const [particlesOverride, setParticlesOverride] = useState(
    localStorage.getItem("disableParticles") !== "true"
  );
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const lowPerfTriggeredRef = React.useRef(false);
  const fpsHistoryRef = React.useRef<number[]>([]);
  const upStableRef = React.useRef(0);
  const downStableRef = React.useRef(0);
  const lastChangeRef = React.useRef(0);

  // Helper: user override for particles
  window.__disableParticles = () => {
    return localStorage.getItem("disableParticles") === "true";
  };

  // Particles override state management (user-controlled only)
  useEffect(() => {
    const checkDisabled = () => {
      setParticlesOverride(localStorage.getItem("disableParticles") !== "true");
    };
    checkDisabled();
    window.addEventListener("storage", checkDisabled);
    const interval = setInterval(checkDisabled, 500);
    return () => {
      window.removeEventListener("storage", checkDisabled);
      clearInterval(interval);
    };
  }, []);

  // Detect mobile/coarse pointer and reduced motion
  useEffect(() => {
    const updateFlags = () => {
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const smallViewport = window.innerWidth <= 820;
      const uaMobile =
        (navigator as any).userAgentData?.mobile ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(Boolean(coarse || smallViewport || uaMobile));

      const rMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      setReducedMotion(rMotion);
    };
    updateFlags();
    window.addEventListener("resize", updateFlags);
    return () => window.removeEventListener("resize", updateFlags);
  }, []);

  // Detect battery/low power hints (best-effort)
  useEffect(() => {
    if (typeof (navigator as any).getBattery === "function") {
      (navigator as any)
        .getBattery()
        .then(
          (battery: {
            level: number;
            charging: boolean;
            addEventListener: (type: string, listener: () => void) => void;
          }) => {
            const update = () =>
              setIsLowPower(!battery.charging && battery.level < 0.2);
            update();
            battery.addEventListener("levelchange", update);
            battery.addEventListener("chargingchange", update);
          }
        );
    }

    const connection = (navigator as any).connection;
    if (connection && typeof connection.effectiveType === "string") {
      setConnectionType(connection.effectiveType);
      const onChange = () => setConnectionType(connection.effectiveType);
      connection.addEventListener?.("change", onChange);
      return () => connection.removeEventListener?.("change", onChange);
    }
  }, []);

  // FPS monitoring with sliding window average - RUNS ONCE ON MOUNT
  useEffect(() => {
    let lastTime = performance.now();
    let framesThisSecond = 0;

    const measureFPS = () => {
      if (document.visibilityState !== "visible") {
        // Skip FPS check if not visible
        framesThisSecond = 0;
        lastTime = performance.now();
        requestAnimationFrame(measureFPS);
        return;
      }

      framesThisSecond++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const currentFps = Math.round(
          (framesThisSecond * 1000) / (currentTime - lastTime)
        );
        setFps(currentFps);

        // Update sliding window (last ~8s)
        const history = fpsHistoryRef.current;
        history.push(currentFps);
        if (history.length > 8) history.shift();
        const avg = Math.round(
          history.reduce((a, b) => a + b, 0) / history.length
        );
        setFpsAvg(avg);

        framesThisSecond = 0;
        lastTime = currentTime;
      }
      requestAnimationFrame(measureFPS);
    };
    measureFPS();
    return () => {};
  }, []);

  // Apply initial medium knobs on mount
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--particle-count-multiplier", "0.6");
    root.style.setProperty("--animation-complexity", "medium");
    root.style.setProperty("--enable-heavy-animations", "true");
  }, []);

  // Compute perf tier combining signals with stability and cooldown
  useEffect(() => {
    const connectionPenalty =
      connectionType === "2g" || connectionType === "slow-2g"
        ? 2
        : connectionType === "3g"
        ? 1
        : 0;

    // Score heuristic
    let score = 0;
    score += fpsAvg >= 55 ? 2 : fpsAvg >= 40 ? 1 : 0; // FPS weight
    score += !isMobile ? 1 : 0; // desktop bonus
    score += !isLowPower ? 1 : 0; // battery bonus
    score -= connectionPenalty; // slow network penalty
    score -= reducedMotion ? 2 : 0; // honor reduced motion

    let nextTier: PerfTier = "high";
    if (score <= 0 || fpsAvg < 30) nextTier = "low";
    else if (score <= 2 || fpsAvg < 50) nextTier = "medium";
    else nextTier = "high";

    // Stability counters and cooldown (only one-step transitions allowed)
    const wantHigh = nextTier === "high";
    const wantLow = nextTier === "low";
    const wantMedium = nextTier === "medium";

    if (wantHigh) upStableRef.current += 1;
    else upStableRef.current = 0;
    if (wantLow) downStableRef.current += 1;
    else if (wantMedium) downStableRef.current += 0;
    else downStableRef.current = 0;

    const now = Date.now();
    const cooldownMs = 5000;
    const cooledDown = now - lastChangeRef.current > cooldownMs;

    let decidedTier: PerfTier = tier;
    if (tier === "medium") {
      if (wantLow && downStableRef.current >= 3 && cooledDown)
        decidedTier = "low";
      else if (wantHigh && upStableRef.current >= 6 && cooledDown)
        decidedTier = "high";
    } else if (tier === "low") {
      if (!wantLow && upStableRef.current >= 5 && cooledDown)
        decidedTier = "medium";
    } else if (tier === "high") {
      if (!wantHigh && downStableRef.current >= 2 && cooledDown)
        decidedTier = "medium";
    }

    if (tier !== decidedTier) {
      setTier(decidedTier);
      lastChangeRef.current = now;
      try {
        sessionStorage.setItem("sv_tier", decidedTier);
      } catch {}
      if (decidedTier === "low" && !lowPerfTriggeredRef.current) {
        setShowLowPerfBanner(true);
        lowPerfTriggeredRef.current = true;
        setTimeout(() => setShowLowPerfBanner(false), 2500);
      }
      if (decidedTier !== "low") lowPerfTriggeredRef.current = false;
    }

    // Apply CSS knobs
    const root = document.documentElement;
    if (decidedTier === "low") {
      root.style.setProperty("--particle-count-multiplier", "0.25");
      root.style.setProperty("--animation-complexity", "low");
      root.style.setProperty("--enable-heavy-animations", "false");
    } else if (decidedTier === "medium") {
      root.style.setProperty("--particle-count-multiplier", "0.6");
      root.style.setProperty("--animation-complexity", "medium");
      root.style.setProperty("--enable-heavy-animations", "true");
    } else {
      root.style.setProperty("--particle-count-multiplier", "1");
      root.style.setProperty("--animation-complexity", "high");
      root.style.setProperty("--enable-heavy-animations", "true");
    }

    // Final particles decision: honor user override; otherwise disable on low tier
    const finalParticlesEnabled = particlesOverride && decidedTier !== "low";
    setParticlesEnabled(finalParticlesEnabled);
  }, [
    fpsAvg,
    isMobile,
    isLowPower,
    reducedMotion,
    connectionType,
    tier,
    particlesOverride,
  ]);

  // Listen for visibility changes to pause animations when tab is not visible
  useEffect(() => {
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
  }, []);

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
      <ParticlesContext.Provider value={{ enabled: particlesEnabled }}>
        <PerfContext.Provider
          value={{
            tier,
            fps: fpsAvg,
            heavyAnimations: tier !== "low" && !reducedMotion,
            particlesEnabled,
            isMobile,
          }}
        >
          {children}
        </PerfContext.Provider>
      </ParticlesContext.Provider>
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
      {/* Note: user can still override particles via localStorage('disableParticles') */}
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
