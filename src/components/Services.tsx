import React, { useState } from "react";
import { motion, anticipate } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Services: React.FC = () => {
  const services = [
    {
      id: "webapp",
      icon: "🖥️",
      title: "Web-App Programmierung",
      description:
        "Moderne, responsive Web-Anwendungen mit neuesten Technologien",
      features: [
        "Custom Web-Anwendungen",
        "Responsive Design",
        "React, TypeScript, Node.js",
        "E-Commerce Lösungen",
        "Progressive Web Apps (PWAs)",
        "API Entwicklung & Integration",
      ],
    },
    {
      id: "social",
      icon: "📱",
      title: "Social Media Management",
      description: "Strategische Betreuung Ihrer Social Media Präsenz",
      features: [
        "Content-Strategie & Erstellung",
        "Plattform-Management",
        "Analytics & Reporting",
        "Community Building",
        "Influencer-Kooperationen",
        "Social Media Werbung",
      ],
    },
    {
      id: "drone",
      icon: "🚁",
      title: "Drohnenaufnahmen",
      description:
        "Professionelle Luftaufnahmen für Marketing und Dokumentation",
      features: [
        "Luftfotografie & Videografie",
        "Immobilien-Marketing",
        "Event-Dokumentation",
        "Baufortschritt-Monitoring",
        "Tourismus & Landschaft",
        "Gewerbe & Industrie",
      ],
    },
  ];

  // Neon network config for services
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  // Hover explosion particles config
  const explosionParticlesInit = async (main: any) => {
    await loadFull(main);
  };

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="services" className="services">
      {/* Neon Particle Network Background */}
      <Particles
        id="tsparticles-services-network"
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
            number: { value: 30, density: { enable: true, area: 1200 } },
            color: { value: ["#00d4ff", "#39ff14", "#9d4edd"] },
            shape: { type: "circle" },
            opacity: {
              value: 0.3,
              anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
            },
            size: {
              value: 3,
              random: { enable: true, minimumValue: 1 },
              anim: { enable: true, speed: 1, size_min: 0.5, sync: false },
            },
            links: {
              enable: true,
              distance: 160,
              color: "#00d4ff",
              opacity: 0.2,
              width: 1.2,
              shadow: { enable: true, color: "#00d4ff", blur: 4 },
            },
            move: {
              enable: true,
              speed: 0.7,
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "out" },
              attract: { enable: true, rotateX: 400, rotateY: 800 },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: false },
              onClick: { enable: false },
              resize: true,
            },
          },
          retina_detect: true,
        }}
      />
      <motion.div
        className="services-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, staggerChildren: 0.35, ease: anticipate }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Animated Section Header */}
        <motion.div
          className="services-header"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: anticipate }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="services-title"
            animate={{
              textShadow: [
                "0 0 20px #00d4ff",
                "0 0 30px #39ff14",
                "0 0 20px #00d4ff",
              ],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Unsere Leistungen
          </motion.h2>
          <motion.p
            className="services-subtitle"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: anticipate }}
            viewport={{ once: true }}
          >
            Drei Kernbereiche, eine Vision: Ihr digitaler Erfolg
          </motion.p>
        </motion.div>

        {/* Animated Services Grid */}
        <motion.div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card"
              initial={{ rotateY: -90, opacity: 0, scale: 0.8, y: 100 }}
              whileInView={{ rotateY: 0, opacity: 1, scale: 1, y: 0 }}
              whileHover={{
                rotateY: 180,
                scale: 1.05,
                y: -20,
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                  duration: 0.7,
                },
              }}
              onHoverStart={() => setHoveredCard(service.id)}
              onHoverEnd={() => setHoveredCard(null)}
              transition={{
                duration: 1.2,
                delay: index * 0.25,
                type: "spring",
                stiffness: 100,
                damping: 15,
                ease: anticipate,
              }}
              viewport={{ once: true, amount: 0.3 }}
              style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
                position: "relative",
              }}
            >
              {/* Hover Explosion Particles */}
              {hoveredCard === service.id && (
                <Particles
                  id={`explosion-${service.id}`}
                  init={explosionParticlesInit}
                  options={{
                    fullScreen: { enable: false },
                    background: { color: "transparent" },
                    style: {
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      zIndex: "10",
                      pointerEvents: "none",
                    },
                    particles: {
                      number: { value: 20, density: { enable: false } },
                      color: {
                        value: ["#00d4ff", "#39ff14", "#ff0040", "#9d4edd"],
                      },
                      shape: { type: "circle" },
                      opacity: {
                        value: 1,
                        anim: {
                          enable: true,
                          speed: 2,
                          opacity_min: 0,
                          sync: false,
                        },
                      },
                      size: {
                        value: { min: 2, max: 8 },
                        anim: {
                          enable: true,
                          speed: 3,
                          size_min: 0,
                          sync: false,
                        },
                      },
                      move: {
                        enable: true,
                        speed: 6,
                        direction: "outside",
                        random: true,
                        straight: false,
                        outModes: { default: "destroy" },
                        trail: { enable: false },
                      },
                      life: {
                        duration: { value: 1 },
                        count: 1,
                      },
                    },
                    interactivity: {
                      events: {
                        onHover: { enable: false },
                        onClick: { enable: false },
                      },
                    },
                    emitters: {
                      direction: "none",
                      rate: { quantity: 20, delay: 0 },
                      size: { width: 0, height: 0 },
                      position: { x: 50, y: 50 },
                    },
                    detectRetina: true,
                  }}
                />
              )}
              <motion.div
                className="service-card-inner"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(0, 212, 255, 0.3)",
                    "0 0 40px rgba(57, 255, 20, 0.4)",
                    "0 0 30px rgba(0, 212, 255, 0.3)",
                  ],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.7,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  transition:
                    "transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
              >
                {/* Animated Front of card */}
                <motion.div
                  className="service-card-front"
                  style={{
                    backfaceVisibility: "hidden",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <motion.div
                    className="service-icon"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    whileHover={{
                      scale: 1.3,
                      rotate: 360,
                      filter: "drop-shadow(0 0 20px #39ff14) brightness(1.5)",
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                        duration: 1,
                      },
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                      ease: anticipate,
                    }}
                    animate={{
                      filter: [
                        "grayscale(100%) brightness(0) invert(1)",
                        "grayscale(0%) brightness(1.2) invert(0)",
                        "grayscale(100%) brightness(0) invert(1)",
                      ],
                    }}
                    viewport={{ once: true }}
                    style={{
                      fontSize: "4rem",
                      marginBottom: "2rem",
                      display: "block",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {service.icon}
                  </motion.div>
                  <motion.h3
                    className="service-title"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: 0.7 + index * 0.1,
                      ease: anticipate,
                    }}
                    viewport={{ once: true }}
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p
                    className="service-description"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: 0.8 + index * 0.1,
                      ease: anticipate,
                    }}
                    viewport={{ once: true }}
                  >
                    {service.description}
                  </motion.p>
                  <motion.div
                    className="service-hover-indicator"
                    animate={{
                      x: [0, 5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span>Mehr erfahren</span>
                    <motion.span
                      className="arrow"
                      animate={{
                        x: [0, 10, 0],
                        color: ["#00d4ff", "#39ff14", "#00d4ff"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </motion.div>

                {/* Animated Back of card */}
                <motion.div className="service-card-back">
                  <motion.h3
                    className="service-title-back"
                    animate={{
                      textShadow: [
                        "0 0 15px #39ff14",
                        "0 0 25px #39ff14",
                        "0 0 15px #39ff14",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {service.title}
                  </motion.h3>
                  <motion.ul className="service-features">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="service-feature"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{
                          delay: featureIndex * 0.1,
                          duration: 0.6,
                        }}
                        viewport={{ once: true }}
                      >
                        <motion.span
                          className="feature-bullet"
                          animate={{
                            scale: [1, 1.3, 1],
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
                            delay: featureIndex * 0.1,
                          }}
                        >
                          ⚡
                        </motion.span>
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;
