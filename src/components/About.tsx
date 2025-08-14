import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import "../styles/about.css";
import DnaHelix from "./DnaHelix";
import { useEffect } from "react";
import type { TargetAndTransition } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Particle portrait effects - OPTIMIZED
  // Remove the particlesInit function

  const stats = [
    { label: "Projekte", value: 15, suffix: "+" },
    { label: "Kunden", value: 8, suffix: "+" },
    { label: "Erfahrung", value: 1, suffix: " Jahr" },
    { label: "Technologien", value: 25, suffix: "+" },
  ];

  const testimonials = [
    {
      text: "Split-Vision hat unsere digitale Präsenz komplett transformiert. Absolut beeindruckend!",
      author: "Dr. Anna Schmidt",
      company: "TechStart GmbH",
    },
    {
      text: "Die Kombination aus Kreativität und Technologie ist einzigartig. Höchstempfehlung!",
      author: "Michael Bauer",
      company: "Innovation Labs",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="about"
      data-preview-image="/images/previews/about.svg"
      // style={{ position: "relative", overflow: "hidden" }} // Removed for guided mode
    >
      {/* Main background/particles (z-index 0 or 1) */}
      {/* Lazy render DnaHelix only when in view */}
      {inView && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(90vw, 400px)",
            height: "min(80vh, 500px)",
            zIndex: 5,
            pointerEvents: "none",
            opacity: 0.35,
            filter: "blur(1.5px)",
          }}
        >
          <DnaHelix />
        </div>
      )}
      {/* About content/cards (z-index 10) */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Section Header */}
        <motion.div
          className="about-header"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="about-title"
            animate={{
              textShadow: [
                "0 0 20px #00d4ff",
                "0 0 30px #39ff14",
                "0 0 20px #00d4ff",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Über Split-Vision
          </motion.h2>
          <motion.p
            className="about-subtitle"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Wo Innovation auf Expertise trifft - Ihr Partner für digitale
            Transformation
          </motion.p>
        </motion.div>

        {/* Unified Animation Parent for Stats & Testimonials */}
        <motion.div
          className="about-stats-testimonials-wrapper"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.18,
                delayChildren: 0.3,
              },
            },
          }}
          viewport={{ once: true }}
        >
          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat) => (
              <CountUpStatCard key={stat.label} stat={stat} duration={1400} />
            ))}
          </div>

          {/* Testimonials Section */}
          <motion.div
            className="testimonials-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 + stats.length * 0.18 }}
          >
            <motion.h3
              className="testimonials-title"
              animate={{
                textShadow: [
                  "0 0 15px #9d4edd",
                  "0 0 25px #ff0040",
                  "0 0 15px #9d4edd",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Was unsere Kunden sagen
            </motion.h3>
            <motion.div
              className="testimonials-grid"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.18,
                  },
                },
              }}
            >
              {testimonials.map((testimonial, idx) => (
                <TestimonialPod key={idx} testimonial={testimonial} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Team Avatar Materializations */}
        {/*<motion.div
          className="team-section"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.3 + stats.length * 0.18 + 0.8 + 0.1,
          }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="team-title"
            animate={{
              textShadow: [
                "0 0 15px #00d4ff",
                "0 0 25px #39ff14",
                "0 0 15px #00d4ff",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Unser Team
          </motion.h3>
          <div
            className="team-grid"
            style={{ perspective: "1000px", gap: "3rem" }}
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className="team-member"
                initial={{ rotateY: -90, opacity: 0, scale: 0.8 }}
                whileInView={{ rotateY: 0, opacity: 1, scale: 1 }}
                whileHover={{
                  rotateY: 16,
                  scale: 1.045,
                  zIndex: 50,
                  transformStyle: "preserve-3d",
                }}
                onHoverStart={() => setHoveredAvatar(member.id)}
                onHoverEnd={() => setHoveredAvatar(null)}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 20,
                  duration: 0.32,
                }}
                viewport={{ once: true }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="avatar"
                  animate={{
                    filter:
                      hoveredAvatar === member.id
                        ? "drop-shadow(0 0 20px #39ff14) brightness(1.3)"
                        : "drop-shadow(0 0 10px #00d4ff) brightness(1.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {member.avatar}
                </motion.div>
                <motion.h4
                  className="member-name"
                  animate={{
                    textShadow:
                      hoveredAvatar === member.id
                        ? "0 0 15px #39ff14"
                        : "0 0 5px #00d4ff",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {member.name}
                </motion.h4>
                <div className="member-role">{member.role}</div>
                <p className="member-description">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>*/}
      </div>
    </section>
  );
};

const statCardVariants = {
  hidden: { y: 40, opacity: 0, scale: 0.92 },
  visible: (): TargetAndTransition => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 16,
    },
  }),
};

const CountUpStatCard: React.FC<{
  stat: { label: string; value: number; suffix: string };
  duration?: number;
}> = ({ stat, duration = 1200 }) => {
  const [count, setCount] = useState(0);
  const [shouldCount, setShouldCount] = useState(false);

  useEffect(() => {
    if (!shouldCount) return;
    const start = 0;
    const end = stat.value;
    const startTime = performance.now();
    let frame: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      setCount(current);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [shouldCount, stat.value, duration]);

  return (
    <motion.div
      className="stat-card"
      variants={statCardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(0, 212, 255, 0.3)",
      }}
      onAnimationComplete={() => setShouldCount(true)}
      viewport={{ once: true }}
    >
      <div className="stat-number">
        {count}
        <span className="stat-suffix">{stat.suffix}</span>
      </div>
      <div className="stat-label">{stat.label}</div>
    </motion.div>
  );
};

const testimonialPodVariants: Variants = {
  hidden: { y: 40, opacity: 0, scale: 0.92 },
  visible: () => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 16,
    },
  }),
};

const TestimonialPod: React.FC<{
  testimonial: { text: string; author: string; company: string };
}> = ({ testimonial }) => (
  <motion.div
    className="testimonial-pod"
    variants={testimonialPodVariants}
    initial="hidden"
    animate="visible"
    whileHover={{
      scale: 1.01,
      // Only rely on CSS for box-shadow
    }}
    viewport={{ once: true }}
  >
    <motion.p
      className="testimonial-text"
      animate={{
        textShadow: [
          "0 0 5px rgba(157, 78, 221, 0.3)",
          "0 0 10px rgba(157, 78, 221, 0.5)",
          "0 0 5px rgba(157, 78, 221, 0.3)",
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      "{testimonial.text}"
    </motion.p>
    <div className="testimonial-author">
      <strong>{testimonial.author}</strong>
      <span>{testimonial.company}</span>
    </div>
  </motion.div>
);

export default About;
