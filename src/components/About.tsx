import React, { useState } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "../styles/about.css";
import DnaHelix from "./DnaHelix";

const About: React.FC = () => {
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);

  // Particle portrait effects - OPTIMIZED
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  const teamMembers = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Lead Developer",
      avatar: "👨‍💻",
      description: "Full-stack wizard with 8+ years in React & Node.js",
    },
    {
      id: 2,
      name: "Sarah Müller",
      role: "Creative Director",
      avatar: "👩‍🎨",
      description: "Visionary designer crafting digital experiences",
    },
    {
      id: 3,
      name: "Marcus Weber",
      role: "Drone Specialist",
      avatar: "👨‍🚁",
      description: "Aerial photography expert & cinematographer",
    },
  ];

  const stats = [
    { label: "Projekte", value: 150, suffix: "+" },
    { label: "Kunden", value: 80, suffix: "+" },
    { label: "Erfahrung", value: 5, suffix: " Jahre" },
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
      className="about"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Main background/particles (z-index 0 or 1) */}
      <Particles
        id="tsparticles-about-portraits"
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
            zIndex: 0,
            pointerEvents: "none",
          },
          particles: {
            number: { value: 20, density: { enable: true, area: 2000 } }, // Reduced from 40
            color: { value: ["#00d4ff", "#39ff14", "#9d4edd"] },
            shape: { type: "circle" },
            opacity: {
              value: 0.3, // Reduced from 0.4
              anim: { enable: false }, // Disabled for performance
            },
            size: {
              value: 2,
              random: { enable: true, minimumValue: 1 },
              anim: { enable: false }, // Disabled for performance
            },
            move: {
              enable: true,
              speed: 0.6, // Reduced from 0.8
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "out" },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: false },
              onClick: { enable: false },
              resize: true,
            },
          },
          detectRetina: false, // Disabled for performance
        }}
      />

      {/* DNA Helix (z-index 5) */}
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

      {/* About content/cards (z-index 10) */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Section Header */}
        <motion.div
          className="about-header"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
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

        {/* Quantum Stats Counters */}
        <motion.div
          className="stats-grid"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0, 212, 255, 0.3)",
              }}
            >
              <motion.div
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                animate={{
                  textShadow: [
                    "0 0 10px #39ff14",
                    "0 0 20px #39ff14",
                    "0 0 10px #39ff14",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                viewport={{ once: true }}
              >
                {stat.value}
                <span className="stat-suffix">{stat.suffix}</span>
              </motion.div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Avatar Materializations */}
        <motion.div
          className="team-section"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
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
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="team-member"
                initial={{ rotateY: -90, opacity: 0, scale: 0.8 }}
                whileInView={{ rotateY: 0, opacity: 1, scale: 1 }}
                whileHover={{
                  rotateY: 10,
                  scale: 1.05,
                  z: 50,
                }}
                onHoverStart={() => setHoveredAvatar(member.id)}
                onHoverEnd={() => setHoveredAvatar(null)}
                transition={{
                  duration: 0.8,
                  delay: 1.2 + index * 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                viewport={{ once: true }}
                style={{ perspective: 1000 }}
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
        </motion.div>

        {/* Glowing Testimonial Pods */}
        <motion.div
          className="testimonials-section"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          viewport={{ once: true }}
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
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-pod"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 15px 40px rgba(157, 78, 221, 0.4)",
                }}
                transition={{
                  duration: 0.8,
                  delay: 1.8 + index * 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
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
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
