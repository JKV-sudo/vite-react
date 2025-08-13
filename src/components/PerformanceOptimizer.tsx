import React, { createContext, useContext } from "react";

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

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  children,
}) => {
  return (
    <ParticlesContext.Provider value={{ enabled: true }}>
      <PerfContext.Provider
        value={{
          tier: "high",
          fps: 60,
          heavyAnimations: true,
          particlesEnabled: true,
          isMobile: false,
        }}
      >
        {children}
      </PerfContext.Provider>
    </ParticlesContext.Provider>
  );
};

export default PerformanceOptimizer;
