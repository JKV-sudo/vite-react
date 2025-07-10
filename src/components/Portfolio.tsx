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
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className="filter-btn"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`project-card ${project.featured ? "featured" : ""}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)",
              }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <div className="project-card-inner">
                <div className="project-image">
                  <div className="project-icon">{project.image}</div>
                  {project.featured && (
                    <div className="featured-badge">
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                <div className="project-content">
                  <div className="project-category">{project.category}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="project-overlay"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    className="view-project-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    View Project
                  </motion.button>
                </motion.div>

                {/* Hover Particle Effect */}
                {hoveredProject === project.id && (
                  <Particles
                    id={`project-particles-${project.id}`}
                    init={particlesInit}
                    options={{
                      background: {
                        color: {
                          value: "transparent",
                        },
                      },
                      particles: {
                        color: {
                          value: ["#00d4ff", "#39ff14"],
                        },
                        move: {
                          direction: "outside",
                          enable: true,
                          outModes: {
                            default: "destroy",
                          },
                          random: true,
                          speed: 3,
                          straight: false,
                        },
                        number: {
                          density: {
                            enable: true,
                            area: 200,
                          },
                          value: 20,
                        },
                        opacity: {
                          value: 0.8,
                        },
                        shape: {
                          type: "circle",
                        },
                        size: {
                          value: { min: 2, max: 6 },
                        },
                      },
                      detectRetina: true,
                    }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Portfolio CTA */}
        <motion.div
          className="portfolio-cta"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="cta-content">
            <h3>Ready to Create Something Amazing?</h3>
            <p>
              Let's bring your digital vision to life with cutting-edge
              technology and creative innovation.
            </p>
            <motion.button
              className="cta-button"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(57, 255, 20, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
