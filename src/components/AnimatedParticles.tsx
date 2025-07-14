import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const AnimatedParticles: React.FC = () => {
  // Custom neon network config - OPTIMIZED FOR PERFORMANCE
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles-neon-network"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        style: {
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: "-1",
        },
        particles: {
          number: { value: 25, density: { enable: true, area: 1200 } }, // Reduced from 60
          color: { value: ["#00d4ff", "#39ff14", "#9d4edd"] },
          shape: { type: "circle" },
          opacity: {
            value: 0.6, // Reduced from 0.8
            anim: { enable: false }, // Disabled animation for performance
          },
          size: {
            value: 3, // Reduced from 4
            random: { enable: true, minimumValue: 1.5 },
            anim: { enable: false }, // Disabled animation for performance
          },
          links: {
            enable: true,
            distance: 150,
            color: "#00d4ff",
            opacity: 0.4, // Reduced from 0.5
            width: 1.5, // Reduced from 2
            shadow: { enable: false }, // Disabled shadow for performance
          },
          move: {
            enable: true,
            speed: 0.8, // Reduced from 1.2
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "out" },
            attract: { enable: false }, // Disabled attract for performance
          },
        },
        interactivity: {
          events: {
            onHover: { enable: false }, // Disabled hover for performance
            onClick: { enable: false }, // Disabled click for performance
            resize: true,
          },
        },
        retina_detect: false, // Disabled for performance
      }}
    />
  );
};

export default AnimatedParticles;
