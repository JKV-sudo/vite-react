import React from "react";
import "../styles/about.css";

/**
 * LegacyDnaHelix - The previous 3D div-based DNA helix spiral for future reference.
 * Usage: <LegacyDnaHelix />
 */
const LegacyDnaHelix: React.FC = () => {
  return (
    <div className="dna-helix-container">
      <div className="dna-helix-structure">
        {(() => {
          const numBases = 32;
          const numRungs = 16;
          const radius = 80;
          const baseStep = 11.25;
          const baseHeightStep = 15;

          const leftBases = Array.from({ length: numBases }).map((_, i) => {
            const angle = i * baseStep * (Math.PI / 180);
            return {
              x: Math.cos(angle) * radius,
              z: Math.sin(angle) * radius,
              y: i * baseHeightStep,
              angle: i * baseStep,
              even: i % 2 === 0,
              delay: 0.5 + 0.5 * Math.sin(angle),
            };
          });
          const rightBases = Array.from({ length: numBases }).map((_, i) => {
            const angle = (i * baseStep + 180) * (Math.PI / 180);
            return {
              x: Math.cos(angle) * radius,
              z: Math.sin(angle) * radius,
              y: i * baseHeightStep,
              angle: i * baseStep + 180,
              even: i % 2 === 0,
              delay: 0.5 + 0.5 * Math.sin(angle),
            };
          });

          const leftStrand = leftBases.map((pt, i) => (
            <div
              key={`left-base-${i}`}
              className={`dna-base base-${pt.even ? "even" : "odd"}`}
              style={
                {
                  "--delay": `${pt.delay}s`,
                  left: `calc(50% + ${pt.x}px)`,
                  top: `${pt.y}px`,
                  transform: `translateZ(${pt.z}px)`,
                } as React.CSSProperties
              }
            />
          ));

          const rightStrand = rightBases.map((pt, i) => (
            <div
              key={`right-base-${i}`}
              className={`dna-base base-${pt.even ? "odd" : "even"}`}
              style={
                {
                  "--delay": `${pt.delay}s`,
                  left: `calc(50% + ${pt.x}px)`,
                  top: `${pt.y}px`,
                  transform: `translateZ(${pt.z}px)`,
                } as React.CSSProperties
              }
            />
          ));

          const rungs = Array.from({ length: numRungs }).map((_, i) => {
            const left = leftBases[i * 2];
            const right = rightBases[i * 2];
            if (!left || !right) return null;
            const dx = right.x - left.x;
            const dz = right.z - left.z;
            const dist = Math.sqrt(dx * dx + dz * dz);
            const angle = Math.atan2(dz, dx) * (180 / Math.PI);
            const y = left.y;
            const delay =
              0.5 + 0.5 * Math.sin(i * 2 * baseStep * (Math.PI / 180));
            return (
              <div
                key={`rung-${i}`}
                className="dna-rung"
                style={
                  {
                    left: `calc(50% + ${left.x}px)`,
                    top: `${y}px`,
                    width: `${dist}px`,
                    transform: `translateZ(${left.z}px) rotateY(${angle}deg)`,
                    "--delay": `${delay}s`,
                  } as React.CSSProperties
                }
              />
            );
          });

          return (
            <>
              {leftStrand}
              {rightStrand}
              {rungs}
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default LegacyDnaHelix;
