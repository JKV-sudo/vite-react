import React, { createContext, useContext, useEffect, useState } from "react";

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

interface ParticlesContextType {
  enabled: boolean;
}

const ParticlesContext = createContext<ParticlesContextType>({ enabled: true });
export const useParticles = () => useContext(ParticlesContext);

type PerfTier = "low" | "medium" | "high";
interface PerfContextType {
  tier: PerfTier;
  fps: number;
  heavyAnimations: boolean;
  particlesEnabled: boolean;
  isMobile: boolean;
}

export const PerfContext = createContext<PerfContextType>({
  tier: "high",
  fps: 60,
  heavyAnimations: true,
  particlesEnabled: true,
  isMobile: false,
});

// Performance detection function
const getDevicePerformance = (): PerfTier => {
  // Check for reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "low";
  }

  // Check for mobile devices
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  if (isMobile) {
    return "medium";
  }

  // Check for hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;
  if (cores < 4) {
    return "low";
  }

  // Check for memory
  if ("deviceMemory" in navigator) {
    const memory = (navigator as any).deviceMemory;
    if (memory < 4) {
      return "low";
    }
  }

  // Check for connection speed
  if ("connection" in navigator) {
    const connection = (navigator as any).connection;
    if (connection && connection.effectiveType === "slow-2g") {
      return "low";
    }
  }

  return "high";
};

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  children,
}) => {
  const [perfState, setPerfState] = useState<PerfContextType>({
    tier: "high",
    fps: 60,
    heavyAnimations: true,
    particlesEnabled: true,
    isMobile: false,
  });

  useEffect(() => {
    const tier = getDevicePerformance();
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setPerfState({
      tier,
      fps: tier === "low" ? 30 : tier === "medium" ? 45 : 60,
      heavyAnimations: tier !== "low" && !prefersReducedMotion,
      particlesEnabled: tier !== "low",
      isMobile,
    });
  }, []);

  return (
    <ParticlesContext.Provider value={{ enabled: perfState.particlesEnabled }}>
      <PerfContext.Provider value={perfState}>{children}</PerfContext.Provider>
    </ParticlesContext.Provider>
  );
};

export default PerformanceOptimizer;
