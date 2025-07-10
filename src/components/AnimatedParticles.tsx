import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const AnimatedParticles: React.FC = () => {
  // Custom neon network config
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
          number: { value: 60, density: { enable: true, area: 900 } },
          color: { value: ["#00d4ff", "#39ff14", "#9d4edd"] },
          shape: { type: "circle" },
          opacity: {
            value: 0.8,
            anim: { enable: true, speed: 1, opacity_min: 0.5, sync: false },
          },
          size: {
            value: 4,
            random: { enable: true, minimumValue: 2 },
            anim: { enable: true, speed: 2, size_min: 1, sync: false },
          },
          links: {
            enable: true,
            distance: 140,
            color: "#00d4ff",
            opacity: 0.5,
            width: 2,
            shadow: { enable: true, color: "#00d4ff", blur: 8 },
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "out" },
            attract: { enable: true, rotateX: 600, rotateY: 1200 },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: {
              distance: 180,
              links: { opacity: 1, color: "#39ff14" },
            },
            push: { quantity: 4 },
          },
        },
        retina_detect: true,
      }}
    />
  );
};

export default AnimatedParticles;
