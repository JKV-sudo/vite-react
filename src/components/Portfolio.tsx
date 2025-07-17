import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import DroneIcon from "./DroneIcon";
import "../styles/portfolio.css";
import { useInView } from "react-intersection-observer";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.92, rotateY: -10 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
    },
  },
};

// Move particles options outside the component so it's not re-created on every render

const Portfolio: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  useEffect(() => {
    const handleResize = () => {};
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Memoize particlesInit so it doesn't change on every render

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
      image: <DroneIcon size={36} />, // Use the new DroneIcon component
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

  // Filtered projects
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="portfolio" ref={ref}>
      {inView && (
        <>
          {/* Particle Background */}

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
                Explore our quantum portfolio of digital innovations and
                creative breakthroughs
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
                  className={`filter-btn${
                    activeCategory === category ? " active" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 0 24px rgba(0, 212, 255, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>

            {/* Projects Grid with AnimatePresence and staggered children */}
            <motion.div
              className="portfolio-grid"
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.16,
                    delayChildren: 0.5,
                  },
                },
              }}
              viewport={{ once: true }}
            >
              <AnimatePresence initial={false}>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    className={`portfolio-card${
                      project.featured ? " featured" : ""
                    }`}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{
                      opacity: 0,
                      y: 40,
                      scale: 0.92,
                      rotateY: -10,
                      transition: { duration: 0.3 },
                    }}
                    whileHover={{
                      scale: 1.045,
                      rotateY: 8,
                      boxShadow:
                        "0 8px 32px rgba(0,212,255,0.18), 0 0 0 2px #00d4ff33",
                      borderColor: "#39ff14",
                      zIndex: 2,
                    }}
                    onHoverStart={() => setHoveredProject(project.id)}
                    onHoverEnd={() => setHoveredProject(null)}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
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
                      className={`project-image${
                        hoveredProject === project.id ? " hovered" : ""
                      }`}
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
                      <p className="project-description">
                        {project.description}
                      </p>

                      <motion.div
                        className="project-technologies"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
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
              </AnimatePresence>
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
        </>
      )}
    </section>
  );
};

export default Portfolio;
