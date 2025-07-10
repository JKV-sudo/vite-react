import React, { useState } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Portfolio: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Particle effects for portfolio background
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  const projects = [
    {
      id: 1,
      title: "Cyberpunk E-Commerce Platform",
      category: "Web Development",
      image: "🛒",
      description:
        "Futuristic online marketplace with AI-powered recommendations",
      technologies: ["React", "Node.js", "AI/ML", "WebGL"],
      link: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Neon City Drone Photography",
      category: "Aerial Photography",
      image: "🚁",
      description: "Stunning urban landscapes captured from above",
      technologies: ["DJI Mavic", "Adobe Creative Suite", "4K Video"],
      link: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Quantum Brand Identity",
      category: "Branding",
      image: "🎨",
      description: "Complete visual identity for tech startup",
      technologies: ["Illustrator", "Photoshop", "After Effects"],
      link: "#",
      featured: false,
    },
    {
      id: 4,
      title: "Holographic UI System",
      category: "UI/UX Design",
      image: "💎",
      description: "Next-generation interface design system",
      technologies: ["Figma", "Framer", "Three.js"],
      link: "#",
      featured: false,
    },
    {
      id: 5,
      title: "Digital Art Installation",
      category: "Interactive Art",
      image: "🎭",
      description: "Immersive digital experience for gallery",
      technologies: ["TouchDesigner", "Arduino", "Projection Mapping"],
      link: "#",
      featured: false,
    },
    {
      id: 6,
      title: "AI-Powered Analytics Dashboard",
      category: "Data Visualization",
      image: "📊",
      description: "Real-time business intelligence platform",
      technologies: ["D3.js", "Python", "TensorFlow"],
      link: "#",
      featured: false,
    },
  ];

  const categories = [
    "All",
    "Web Development",
    "Aerial Photography",
    "Branding",
    "UI/UX Design",
    "Interactive Art",
    "Data Visualization",
  ];

  return (
    <section id="portfolio" className="portfolio">
      {/* Particle Background */}
      <Particles
        id="tsparticles-portfolio"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#00d4ff", "#39ff14", "#ff006e"],
            },
            links: {
              color: "#00d4ff",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />

      <div className="portfolio-container">
        <div className="portfolio-header">
          <motion.h2
            className="portfolio-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Digital Showcase Gallery
          </motion.h2>
          <motion.p
            className="portfolio-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our quantum portfolio of digital innovations and creative
            breakthroughs
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          className="portfolio-filters"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className="filter-btn"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="portfolio-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`portfolio-card ${project.featured ? "featured" : ""}`}
              initial={{ scale: 0, rotateY: -90, opacity: 0 }}
              whileInView={{ scale: 1, rotateY: 0, opacity: 1 }}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                z: 50,
              }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              viewport={{ once: true }}
              style={{ perspective: 1000 }}
            >
              {project.featured && (
                <motion.div
                  className="featured-badge"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(57, 255, 20, 0.5)",
                      "0 0 30px rgba(57, 255, 20, 0.8)",
                      "0 0 20px rgba(57, 255, 20, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Featured
                </motion.div>
              )}

              <motion.div
                className="project-image"
                animate={{
                  filter:
                    hoveredProject === project.id
                      ? "drop-shadow(0 0 30px #39ff14) brightness(1.3)"
                      : "drop-shadow(0 0 15px #00d4ff) brightness(1.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="project-icon">{project.image}</span>
              </motion.div>

              <motion.div className="project-content">
                <motion.h3
                  className="project-title"
                  animate={{
                    textShadow:
                      hoveredProject === project.id
                        ? "0 0 15px #39ff14"
                        : "0 0 5px #00d4ff",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {project.title}
                </motion.h3>
                <p className="project-category">{project.category}</p>
                <p className="project-description">{project.description}</p>

                <motion.div
                  className="project-technologies"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="tech-tag"
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)",
                      }}
                      animate={{
                        boxShadow: [
                          "0 0 5px rgba(0, 212, 255, 0.3)",
                          "0 0 10px rgba(57, 255, 20, 0.4)",
                          "0 0 5px rgba(0, 212, 255, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: techIndex * 0.1,
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.button
                  className="project-link"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(0, 212, 255, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Project →
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="portfolio-cta"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 15px 40px rgba(0, 212, 255, 0.4)",
          }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <h3>Ready to Start Your Project?</h3>
          <p>Let's create something amazing together</p>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById("contact");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
