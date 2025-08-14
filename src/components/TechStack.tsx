import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PerfContext } from "./PerformanceOptimizer";
import "../styles/techstack.css";
import reactLogo from "../assets/react.svg";

type LogoProps = { size?: number };

const LogoReact: React.FC<LogoProps> = ({ size = 64 }) => (
  <img
    src={reactLogo}
    alt="React"
    width={size}
    height={size}
    className="tech-svg"
  />
);

const LogoTypeScript: React.FC<LogoProps> = ({ size = 64 }) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className="tech-svg"
    aria-label="TypeScript"
  >
    <rect x="0" y="0" width="128" height="128" rx="16" fill="#3178c6" />
    <text
      x="64"
      y="80"
      textAnchor="middle"
      fontSize="64"
      fontWeight="800"
      fill="#fff"
      fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto"
    >
      TS
    </text>
  </svg>
);

const LogoVite: React.FC<LogoProps> = ({ size = 64 }) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className="tech-svg"
    aria-label="Vite"
  >
    <defs>
      <linearGradient id="viteG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#41d1ff" />
        <stop offset="50%" stopColor="#bd34fe" />
        <stop offset="100%" stopColor="#ffa800" />
      </linearGradient>
    </defs>
    <polygon points="64,8 120,120 8,120" fill="url(#viteG)" />
  </svg>
);

const LogoFramerMotion: React.FC<LogoProps> = ({ size = 64 }) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className="tech-svg"
    aria-label="Framer Motion"
  >
    <polygon points="16,16 112,16 64,64 16,64" fill="#ff006e" />
    <polygon points="16,64 64,112 112,64" fill="#9d4edd" opacity="0.9" />
  </svg>
);

const LogoGSAP: React.FC<LogoProps> = ({ size = 64 }) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className="tech-svg"
    aria-label="GSAP"
  >
    <circle cx="64" cy="64" r="56" fill="#78e08f" />
    <text
      x="64"
      y="78"
      textAnchor="middle"
      fontSize="44"
      fontWeight="800"
      fill="#0b1d0f"
      fontFamily="Inter, system-ui"
    >
      GS
    </text>
  </svg>
);

const LogoVercel: React.FC<LogoProps> = ({ size = 64 }) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className="tech-svg"
    aria-label="Vercel"
  >
    <polygon points="64,16 112,112 16,112" fill="#111" />
  </svg>
);

const LogoWorkbox: React.FC<LogoProps> = ({ size = 64 }) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className="tech-svg"
    aria-label="Workbox"
  >
    <polygon points="64,8 112,40 112,88 64,120 16,88 16,40" fill="#ffb703" />
    <text
      x="64"
      y="82"
      textAnchor="middle"
      fontSize="44"
      fontWeight="900"
      fill="#111"
      fontFamily="Inter, system-ui"
    >
      W
    </text>
  </svg>
);

const LogoPWA: React.FC<LogoProps> = ({ size = 64 }) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className="tech-svg"
    aria-label="PWA"
  >
    <path
      d="M64 100 L80 76 L100 72 L84 56 L88 36 L68 44 L48 36 L52 56 L36 72 L56 76 Z"
      fill="#00d4ff"
    />
  </svg>
);

const LogoTSParticles: React.FC<LogoProps> = ({ size = 64 }) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className="tech-svg"
    aria-label="tsParticles"
  >
    <circle cx="32" cy="32" r="6" fill="#00d4ff" />
    <circle cx="96" cy="36" r="6" fill="#39ff14" />
    <circle cx="84" cy="92" r="6" fill="#ff006e" />
    <circle cx="28" cy="96" r="6" fill="#9d4edd" />
    <line
      x1="32"
      y1="32"
      x2="96"
      y2="36"
      stroke="#00d4ff"
      strokeOpacity="0.4"
    />
    <line
      x1="96"
      y1="36"
      x2="84"
      y2="92"
      stroke="#39ff14"
      strokeOpacity="0.4"
    />
    <line
      x1="84"
      y1="92"
      x2="28"
      y2="96"
      stroke="#ff006e"
      strokeOpacity="0.4"
    />
    <line
      x1="28"
      y1="96"
      x2="32"
      y2="32"
      stroke="#9d4edd"
      strokeOpacity="0.4"
    />
  </svg>
);

const LogoFirebase: React.FC<LogoProps> = ({ size = 64 }) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className="tech-svg"
    aria-label="Firebase"
  >
    <defs>
      <linearGradient id="fbG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffa000" />
        <stop offset="100%" stopColor="#f57c00" />
      </linearGradient>
    </defs>
    <polygon points="28,100 52,20 72,58 84,36 100,100" fill="url(#fbG)" />
  </svg>
);

const LogoSupabase: React.FC<LogoProps> = ({ size = 64 }) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className="tech-svg"
    aria-label="Supabase"
  >
    <defs>
      <linearGradient id="sbG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3ecf8e" />
        <stop offset="100%" stopColor="#00b37e" />
      </linearGradient>
    </defs>
    <path d="M48 18 L92 18 L36 110 L80 110 Z" fill="url(#sbG)" />
  </svg>
);

const LogoThreeJS: React.FC<LogoProps> = ({ size = 64 }) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className="tech-svg"
    aria-label="Three.js"
  >
    <g fill="none" stroke="#00d4ff" strokeWidth="3">
      <polygon points="64,20 100,40 100,88 64,108 28,88 28,40" />
      <line x1="64" y1="20" x2="64" y2="108" />
      <line x1="28" y1="40" x2="100" y2="88" />
      <line x1="100" y1="40" x2="28" y2="88" />
    </g>
  </svg>
);

const LogoR3F: React.FC<LogoProps> = ({ size = 64 }) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className="tech-svg"
    aria-label="React Three Fiber"
  >
    <rect
      x="12"
      y="12"
      width="104"
      height="104"
      rx="18"
      fill="#111"
      stroke="#9d4edd"
      strokeWidth="4"
    />
    <text
      x="64"
      y="76"
      textAnchor="middle"
      fontSize="40"
      fontWeight="800"
      fill="#9d4edd"
      fontFamily="Inter, system-ui"
    >
      R3F
    </text>
  </svg>
);

const LogoSpline: React.FC<LogoProps> = ({ size = 64 }) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className="tech-svg"
    aria-label="Spline"
  >
    <defs>
      <linearGradient id="spG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="100%" stopColor="#9d4edd" />
      </linearGradient>
    </defs>
    <path
      d="M24 72 C24 40, 64 40, 64 72 C64 104, 104 104, 104 72"
      fill="none"
      stroke="url(#spG)"
      strokeWidth="10"
      strokeLinecap="round"
    />
  </svg>
);

const logos: Array<{ name: string; Logo: React.FC<LogoProps> }> = [
  { name: "React", Logo: LogoReact },
  { name: "TypeScript", Logo: LogoTypeScript },
  { name: "Vite", Logo: LogoVite },
  { name: "Framer Motion", Logo: LogoFramerMotion },
  { name: "GSAP", Logo: LogoGSAP },
  { name: "Vercel", Logo: LogoVercel },
  { name: "Workbox", Logo: LogoWorkbox },
  { name: "PWA", Logo: LogoPWA },
  { name: "tsParticles", Logo: LogoTSParticles },
  { name: "Firebase", Logo: LogoFirebase },
  { name: "Supabase", Logo: LogoSupabase },
  { name: "Three.js", Logo: LogoThreeJS },
  { name: "React Three Fiber", Logo: LogoR3F },
  { name: "Spline", Logo: LogoSpline },
];

const TechStack: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { heavyAnimations } = React.useContext(PerfContext);
  const enableAnimations = heavyAnimations;

  return (
    <section
      id="tech"
      className="techstack"
      ref={ref}
      data-preview-image="/images/previews/tech.svg"
    >
      <div className="techstack-container">
        <motion.div
          className="techstack-bg"
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          animate={enableAnimations ? { y: [0, -8, 0] } : undefined}
          transition={{
            duration: 12,
            repeat: enableAnimations ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="bg-blob blob-blue"
            animate={
              enableAnimations
                ? { x: [0, 12, -6, 0], y: [0, -6, 8, 0] }
                : undefined
            }
            transition={{
              duration: 18,
              repeat: enableAnimations ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="bg-blob blob-green"
            animate={
              enableAnimations
                ? { x: [0, -10, 6, 0], y: [0, 8, -6, 0] }
                : undefined
            }
            transition={{
              duration: 16,
              repeat: enableAnimations ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="bg-blob blob-pink"
            animate={
              enableAnimations
                ? { x: [0, 8, -8, 0], y: [0, -10, 10, 0] }
                : undefined
            }
            transition={{
              duration: 20,
              repeat: enableAnimations ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        <motion.div
          className="techstack-header"
          initial={{ y: -40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="techstack-title"
            animate={
              enableAnimations
                ? {
                    textShadow: [
                      "0 0 20px #00d4ff",
                      "0 0 30px #39ff14",
                      "0 0 20px #00d4ff",
                    ],
                  }
                : undefined
            }
            transition={{
              duration: 3,
              repeat: enableAnimations ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            Unser Tech‑Stack
          </motion.h2>
          <p className="techstack-subtitle">
            Tools und Plattformen, die unsere Projekte antreiben
          </p>
        </motion.div>

        <div className="tech-grid">
          {logos.map(({ name, Logo }, i) => (
            <motion.div
              key={name}
              className={`tech-tile ${i % 7 === 0 ? "span-3" : ""} ${
                i % 9 === 0 ? "tall" : ""
              }`}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              whileHover={
                enableAnimations
                  ? {
                      scale: 1.06,
                      boxShadow: "0 10px 28px rgba(0,212,255,0.35)",
                    }
                  : undefined
              }
            >
              <motion.div
                className="tech-logo"
                animate={
                  enableAnimations
                    ? { y: [0, -5, 0], rotate: [0, 2.5, 0] }
                    : undefined
                }
                transition={{
                  duration: 3.6,
                  repeat: enableAnimations ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                <Logo />
              </motion.div>
              <div className="tech-name">{name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
