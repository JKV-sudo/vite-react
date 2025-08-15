import React from "react";
import { PerfContext } from "./PerformanceOptimizer";
import "../styles/neon-svg.css";

const NeonSVGAnimation: React.FC = () => {
  const { heavyAnimations } = React.useContext(PerfContext);

  return (
    <div
      className={`neon-svg-wrap ${heavyAnimations ? "" : "neon-svg--reduced"}`}
      aria-hidden
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(80vw, 780px)",
        height: "min(80vw, 780px)",
        zIndex: 1,
        pointerEvents: "none",
        mixBlendMode: "screen",
        opacity: 0.9,
      }}
    >
      <svg
        role="img"
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="neon-svg"
      >
        <defs>
          <linearGradient id="gradBlueGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#39ff14" />
          </linearGradient>
          <linearGradient id="gradPinkBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff0040" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
          <linearGradient id="gradPurpleGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9d4edd" />
            <stop offset="100%" stopColor="#39ff14" />
          </linearGradient>
        </defs>

        <g className="orbits">
          <g className="orbit orbit--slow">
            <circle
              cx="50"
              cy="50"
              r="36"
              fill="none"
              stroke="url(#gradBlueGreen)"
              strokeWidth="0.8"
              strokeLinecap="round"
              className="dash"
            />
          </g>
          <g className="orbit orbit--med">
            <circle
              cx="50"
              cy="50"
              r="28"
              fill="none"
              stroke="url(#gradPinkBlue)"
              strokeWidth="0.7"
              strokeLinecap="round"
              className="dash"
            />
          </g>
          <g className="orbit orbit--fast">
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="url(#gradPurpleGreen)"
              strokeWidth="0.6"
              strokeLinecap="round"
              className="dash"
            />
          </g>
        </g>

        <g className="crosshair">
          <line x1="50" y1="16" x2="50" y2="22" stroke="#00d4ff" strokeWidth="0.6" />
          <line x1="50" y1="78" x2="50" y2="84" stroke="#39ff14" strokeWidth="0.6" />
          <line x1="16" y1="50" x2="22" y2="50" stroke="#9d4edd" strokeWidth="0.6" />
          <line x1="78" y1="50" x2="84" y2="50" stroke="#ff0040" strokeWidth="0.6" />
        </g>

        <g className="nodes">
          <circle cx="50" cy="50" r="1.6" fill="#00d4ff" className="node node--pulse" />
          <circle cx="72" cy="36" r="1.1" fill="#39ff14" className="node node--blink" />
          <circle cx="34" cy="72" r="1.1" fill="#ff0040" className="node node--blink" />
        </g>

        <g className="link-arc">
          <path
            d="M65 50a15 15 0 0 1-30 0a15 15 0 0 1 30 0z"
            fill="none"
            stroke="#00d4ff"
            strokeOpacity="0.6"
            strokeWidth="0.5"
            className="dash dash--long"
          />
        </g>
      </svg>
    </div>
  );
};

export default NeonSVGAnimation;