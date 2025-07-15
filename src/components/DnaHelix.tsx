import React, { useRef, useEffect } from "react";

// DNA Helix parameters
const DOTS = 24;
const DOT_RADIUS = 7;
const WIDTH = 240;
const HEIGHT = 400;
const AMPLITUDE = 60;
const PERIOD = 2 * Math.PI;
const SPEED = 1.2; // Animation speed
const COLORS = ["#00d4ff", "#39ff14"];

const DnaHelix: React.FC = () => {
  const requestRef = useRef<number>();
  const svgRef = useRef<SVGSVGElement>(null);
  const dotsRef = useRef<SVGCircleElement[]>([]);
  const linesRef = useRef<SVGLineElement[]>([]);

  useEffect(() => {
    let start: number | null = null;
    function animate(time: number) {
      if (!start) start = time;
      const t = ((time - start) / 1000) * SPEED;
      for (let i = 0; i < DOTS; i++) {
        // Calculate phase for this dot
        const phase = (i / DOTS) * PERIOD + t;
        // X position for left and right rails
        const x1 = WIDTH / 2 + Math.sin(phase) * AMPLITUDE;
        const x2 = WIDTH / 2 - Math.sin(phase) * AMPLITUDE;
        // Y position
        const y = (i / DOTS) * HEIGHT;
        // Z for scale (3D effect)
        const z = Math.cos(phase);
        // Scale and opacity for 3D illusion
        const scale = 0.5 + (0.5 * (z + 1)) / 2;
        const opacity = 0.5 + (0.5 * (z + 1)) / 2;
        // Color
        const color1 = COLORS[0];
        const color2 = COLORS[1];
        // Left dot
        if (dotsRef.current[i * 2]) {
          dotsRef.current[i * 2].setAttribute("cx", x1.toString());
          dotsRef.current[i * 2].setAttribute("cy", y.toString());
          dotsRef.current[i * 2].setAttribute(
            "r",
            (DOT_RADIUS * scale).toString()
          );
          dotsRef.current[i * 2].setAttribute("fill", color1);
          dotsRef.current[i * 2].setAttribute("opacity", opacity.toString());
        }
        // Right dot
        if (dotsRef.current[i * 2 + 1]) {
          dotsRef.current[i * 2 + 1].setAttribute("cx", x2.toString());
          dotsRef.current[i * 2 + 1].setAttribute("cy", y.toString());
          dotsRef.current[i * 2 + 1].setAttribute(
            "r",
            (DOT_RADIUS * scale).toString()
          );
          dotsRef.current[i * 2 + 1].setAttribute("fill", color2);
          dotsRef.current[i * 2 + 1].setAttribute(
            "opacity",
            opacity.toString()
          );
        }
        // Rung (line)
        if (linesRef.current[i]) {
          linesRef.current[i].setAttribute("x1", x1.toString());
          linesRef.current[i].setAttribute("y1", y.toString());
          linesRef.current[i].setAttribute("x2", x2.toString());
          linesRef.current[i].setAttribute("y2", y.toString());
          linesRef.current[i].setAttribute("stroke", `url(#dna-gradient)`);
          linesRef.current[i].setAttribute(
            "stroke-width",
            (3 * scale).toString()
          );
          linesRef.current[i].setAttribute(
            "opacity",
            (0.3 + 0.7 * opacity).toString()
          );
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Render SVG
  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      style={{
        display: "block",
        maxWidth: 320,
        maxHeight: 500,
        margin: "0 auto",
      }}
    >
      <defs>
        <linearGradient id="dna-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#39ff14" />
        </linearGradient>
      </defs>
      {/* Rungs */}
      {Array.from({ length: DOTS }).map((_, i) => (
        <line
          key={`rung-${i}`}
          ref={(el) => (linesRef.current[i] = el!)}
          x1={0}
          y1={0}
          x2={0}
          y2={0}
          stroke="url(#dna-gradient)"
          strokeWidth={3}
          opacity={0.5}
        />
      ))}
      {/* Dots */}
      {Array.from({ length: DOTS }).flatMap((_, i) => [
        <circle
          key={`dot-left-${i}`}
          ref={(el) => (dotsRef.current[i * 2] = el!)}
          cx={0}
          cy={0}
          r={DOT_RADIUS}
          fill={COLORS[0]}
          opacity={0.7}
        />,
        <circle
          key={`dot-right-${i}`}
          ref={(el) => (dotsRef.current[i * 2 + 1] = el!)}
          cx={0}
          cy={0}
          r={DOT_RADIUS}
          fill={COLORS[1]}
          opacity={0.7}
        />,
      ])}
    </svg>
  );
};

export default DnaHelix;
