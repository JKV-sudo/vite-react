import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const About: React.FC = () => {
  const dnaRef = useRef<HTMLDivElement>(null);
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);

  // DNA helix animation
  useEffect(() => {
    // Removed GSAP animation - now using CSS animation for unified rotation
  }, []);

  // Particle portrait effects
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
    <section id="about" className="about">
      {/* DNA Helix Background */}
      <div className="dna-helix-container" ref={dnaRef}>
        {/* DNA Helix Structure */}
        <div className="dna-helix-structure">
          {/* First DNA Strand */}
          <div className="dna-strand strand-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`strand1-${i}`}
                className="dna-base"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: `${i * 30}px`,
                  width: "6px",
                  height: "25px",
                  background: i % 2 === 0 ? "#00d4ff" : "#39ff14",
                  transformOrigin: "center",
                  transform: `translateX(-50%) rotateX(${i * 18}deg) rotateZ(${
                    i * 18
                  }deg) translateX(-30px)`,
                  boxShadow: `0 0 20px ${i % 2 === 0 ? "#00d4ff" : "#39ff14"}`,
                  borderRadius: "3px",
                  zIndex: 2,
                }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [0.8, 1.3, 0.8],
                  filter: [
                    `brightness(1) drop-shadow(0 0 10px ${
                      i % 2 === 0 ? "#00d4ff" : "#39ff14"
                    })`,
                    `brightness(1.5) drop-shadow(0 0 20px ${
                      i % 2 === 0 ? "#00d4ff" : "#39ff14"
                    })`,
                    `brightness(1) drop-shadow(0 0 10px ${
                      i % 2 === 0 ? "#00d4ff" : "#39ff14"
                    })`,
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Second DNA Strand */}
          <div className="dna-strand strand-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`strand2-${i}`}
                className="dna-base"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: `${i * 30}px`,
                  width: "6px",
                  height: "25px",
                  background: i % 2 === 0 ? "#39ff14" : "#00d4ff",
                  transformOrigin: "center",
                  transform: `translateX(-50%) rotateX(${i * 18}deg) rotateZ(${
                    i * 18 + 180
                  }deg) translateX(30px)`,
                  boxShadow: `0 0 20px ${i % 2 === 0 ? "#39ff14" : "#00d4ff"}`,
                  borderRadius: "3px",
                  zIndex: 2,
                }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [0.8, 1.3, 0.8],
                  filter: [
                    `brightness(1) drop-shadow(0 0 10px ${
                      i % 2 === 0 ? "#39ff14" : "#00d4ff"
                    })`,
                    `brightness(1.5) drop-shadow(0 0 20px ${
                      i % 2 === 0 ? "#39ff14" : "#00d4ff"
                    })`,
                    `brightness(1) drop-shadow(0 0 10px ${
                      i % 2 === 0 ? "#39ff14" : "#00d4ff"
                    })`,
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Connecting Lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`connection-${i}`}
              className="dna-connection"
              style={{
                position: "absolute",
                left: "50%",
                top: `${i * 60 + 15}px`,
                width: "60px",
                height: "3px",
                background: "linear-gradient(90deg, #00d4ff, #39ff14)",
                transform: `translateX(-50%) rotateX(${i * 18}deg) rotateZ(${
                  i * 18
                }deg)`,
                boxShadow: "0 0 15px rgba(0, 212, 255, 0.8)",
                borderRadius: "2px",
                zIndex: 3,
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scaleX: [0.6, 1.2, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Particle Portrait Effects */}
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
            zIndex: "0",
            pointerEvents: "none",
          },
          particles: {
            number: { value: 40, density: { enable: true, area: 1500 } },
            color: { value: ["#00d4ff", "#39ff14", "#9d4edd"] },
            shape: { type: "circle" },
            opacity: {
              value: 0.4,
              anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false },
            },
            size: {
              value: 2,
              random: { enable: true, minimumValue: 1 },
              anim: { enable: true, speed: 1, size_min: 0.5, sync: false },
            },
            move: {
              enable: true,
              speed: 0.8,
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
          detectRetina: true,
        }}
      />

      <motion.div
        className="about-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
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
      </motion.div>
    </section>
  );
};

export default About;
