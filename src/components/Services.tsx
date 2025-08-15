import React from "react";
import { motion, anticipate } from "framer-motion";
import DroneIcon from "./DroneIcon";
import { useInView } from "react-intersection-observer";

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

// ServiceCard component for clarity and separation
const ServiceCard: React.FC<{ service: (typeof services)[0] }> = ({
  service,
}) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);

  // Removed debug logging for performance

  return (
    <div
      className="service-card"
      ref={cardRef}
      // Removed debug event handlers for performance
    >
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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section
      id="services"
      className="services"
      ref={ref}
      data-preview-image="/images/previews/services.svg"
      style={{ border: "3px solid lime" }} // Debug: Green border to identify Services
    >
      {inView && (
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
      )}
    </section>
  );
};

export default Services;
