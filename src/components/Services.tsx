import React from "react";
import { motion, anticipate } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";
import DroneIcon from "./DroneIcon";
// import { Engine } from "tsparticles-engine"; // Remove this import

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
    icon: <DroneIcon size={40} />, // Use the new DroneIcon component
    title: "Drohnenaufnahmen",
    description: "Professionelle Luftaufnahmen für Marketing und Dokumentation",
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

const particlesInit = async (main: Engine) => {
  await loadFull(main);
};

// ServiceCard component for clarity and separation
const ServiceCard: React.FC<{ service: (typeof services)[0] }> = ({
  service,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const explosionParticlesInit = async (main: Engine) => {
    await loadFull(main);
  };
  const cardRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);

  const logRects = (label: string) => {
    if (cardRef.current && innerRef.current) {
      console.log(label, {
        card: cardRef.current.getBoundingClientRect(),
        inner: innerRef.current.getBoundingClientRect(),
      });
    }
  };

  return (
    <div
      className="service-card"
      ref={cardRef}
      onMouseEnter={() => {
        setHovered(true);
        logRects("mouseenter");
      }}
      onMouseLeave={() => {
        setHovered(false);
        logRects("mouseleave");
      }}
    >
      {/* Hover Explosion Particles - Always present but controlled by hover state */}
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
            opacity: hovered ? "1" : "0", // Control visibility with opacity
            transition: "opacity 0.1s ease", // Smooth transition
          },
          particles: {
            number: { value: 8, density: { enable: false } },
            color: {
              value: ["#00d4ff", "#39ff14", "#ff0040", "#9d4edd"],
            },
            shape: { type: "circle" },
            opacity: {
              value: 1,
              anim: {
                enable: true,
                speed: 3,
                opacity_min: 0,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: 4 },
              anim: {
                enable: true,
                speed: 4,
                size_min: 0,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 8,
              direction: "outside",
              random: true,
              straight: false,
              outModes: { default: "destroy" },
              trail: { enable: false },
            },
            life: {
              duration: { value: 0.6 },
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
            rate: {
              quantity: hovered ? 8 : 0, // Only emit particles when hovered
              delay: 0,
            },
            size: { width: 0, height: 0 },
            position: { x: 50, y: 50 },
          },
          detectRetina: false,
        }}
      />
      <div className="service-card-inner" ref={innerRef}>
        {/* Front of card */}
        <div className="service-card-front">
          <div className="service-icon">{service.icon}</div>
          <h3 className="service-title">{service.title}</h3>
          <p className="service-description">{service.description}</p>
          <div className="service-hover-indicator">
            <span>Mehr erfahren</span>
            <span className="arrow">→</span>
          </div>
        </div>
        {/* Back of card */}
        <div className="service-card-back">
          <h3 className="service-title-back">{service.title}</h3>
          <ul className="service-features">
            {service.features.map((feature, i) => (
              <li className="service-feature" key={i}>
                <span className="feature-bullet">⚡</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const isMobile = window.innerWidth < 768; // Define isMobile here
  // Particle count: desktop = 15, mobile = 10
  const particleCount = isMobile ? 10 : 15;

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
            number: {
              value: particleCount,
              density: { enable: true, area: 1500 },
            },
            color: { value: ["#00d4ff", "#39ff14", "#9d4edd"] },
            shape: { type: "circle" },
            opacity: {
              value: 0.2, // Reduced from 0.3
              anim: { enable: false }, // Disabled animation for performance
            },
            size: {
              value: 2, // Reduced from 3
              random: { enable: true, minimumValue: 1 },
              anim: { enable: false }, // Disabled animation for performance
            },
            links: {
              enable: true,
              distance: 180,
              color: "#00d4ff",
              opacity: 0.15, // Reduced from 0.2
              width: 1, // Reduced from 1.2
              shadow: { enable: false }, // Disabled shadow for performance
            },
            move: {
              enable: true,
              speed: 0.5, // Reduced from 0.7
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "out" },
              attract: { enable: false }, // Disabled attract for performance
            },
          },
          interactivity: {
            events: {
              onHover: { enable: false },
              onClick: { enable: false },
              resize: true,
            },
          },
          retina_detect: false, // Disabled for performance
        }}
      />
      <div className="services-container">
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
        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
