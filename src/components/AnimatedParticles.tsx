import React, { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const getViewportWithMargin = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width: Math.round(width * 1.2),
    height: Math.round(height * 1.2),
  };
};

const isMobileDevice = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 700;

const AnimatedParticles: React.FC = () => {
  const [canvasSize, setCanvasSize] = useState(getViewportWithMargin());
  const [isMobile, setIsMobile] = useState(isMobileDevice());

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(getViewportWithMargin());
      setIsMobile(isMobileDevice());
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Custom neon network config - OPTIMIZED FOR PERFORMANCE
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  // Particle count: desktop = 25, mobile = 7
  const particleCount = isMobile ? 7 : 25;

  return (
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
  );
};

export default AnimatedParticles;
