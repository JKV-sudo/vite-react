import React, { useState, useRef, useEffect, useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
// import gsap from "gsap"; // Remove GSAP

// Framer Motion variants for unified entrance and floating
const contentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
    },
  },
  float: {
    y: [0, -18, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

// Add stats array for new contact stats
const contactStats = [
  {
    label: "Antwortzeit",
    value: 24,
    suffix: "h",
    color: "#00d4ff",
  },
  {
    label: "Kundenzufriedenheit",
    value: 100,
    suffix: "%",
    color: "#39ff14",
  },
  {
    label: "Projekte erfolgreich",
    value: 150,
    suffix: "+",
    color: "#ff006e",
  },
];

const statCardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
    },
  },
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

const CountUpStat: React.FC<{ value: number; duration?: number }> = ({
  value,
  duration = 1200,
}) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = 0;
    const end = value;
    const startTime = performance.now();
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
  }, [value, duration]);
  return <>{count}</>;
};

// Add a custom hook for mobile detection
function useIsMobile(breakpoint = 700) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  // const floatingCardsRef = useRef<HTMLDivElement>(null); // Remove GSAP
  const isMobile = useIsMobile();
  const [canvasSize, setCanvasSize] = useState(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      width: Math.round(width * 1.2),
      height: Math.round(height * 1.2),
    };
  });
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setCanvasSize({
        width: Math.round(width * 1.2),
        height: Math.round(height * 1.2),
      });
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Particle count: desktop = 60, mobile = 40
  const particleCount = isMobile ? 40 : 60;

  // Memoize particlesInit
  const particlesInit = useCallback(async (main: Engine) => {
    await loadFull(main);
  }, []);

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      value: "hello@split-vision.de",
      action: "mailto:hello@split-vision.de",
      color: "#00d4ff",
    },
    {
      icon: "📱",
      title: "Phone",
      value: "+49 151 220 297 69",
      action: "tel:+4915122029769",
      color: "#39ff14",
    },
    {
      icon: "📍",
      title: "Location",
      value: "Simbach am Inn, Germany",
      action: "#",
      color: "#ff006e",
    },
    {
      icon: "💬",
      title: "WhatsApp",
      value: "+49 151 220 297 69",
      action: "https://wa.me/4915122029769",
      color: "#25d366",
    },
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Name must be at least 2 characters" : "";
      case "email":
        return !emailRegex.test(value) ? "Please enter a valid email" : "";
      case "message":
        return value.length < 10
          ? "Message must be at least 10 characters"
          : "";
      default:
        return "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        project: "",
        message: "",
      });
      setErrors({});

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 2000);
  };

  return (
    <section id="contact" className="contact">
      {/* Particle Background */}
      <Particles
        id="tsparticles-contact"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          style: {
            position: "absolute",
            top: `-${(canvasSize.height - window.innerHeight) / 2}px`,
            left: `-${(canvasSize.width - window.innerWidth) / 2}px`,
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`,
            zIndex: "0",
            pointerEvents: "none",
          },
          particles: {
            number: {
              value: particleCount,
              density: { enable: true, area: 800 },
            },
            color: { value: ["#00d4ff", "#39ff14", "#ff006e", "#25d366"] },
            links: {
              color: "#00d4ff",
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              direction: "none",
              outModes: { default: "out" },
              random: false,
              speed: 1.5,
              straight: false,
            },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "grab" },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              grab: { distance: 140, links: { opacity: 0.5 } },
            },
          },
          detectRetina: true,
          fpsLimit: 60,
        }}
      />

      <div className="contact-container">
        {/* Section Header */}
        <motion.div
          className="contact-header"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="contact-title"
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
            Kontaktieren Sie uns
          </motion.h2>
          <motion.p
            className="contact-subtitle"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Lassen Sie uns gemeinsam Ihre Vision verwirklichen
          </motion.p>
        </motion.div>

        {/* Unified entrance for content */}
        <motion.div
          className="contact-content"
          initial="hidden"
          whileInView="visible"
          variants={contentVariants}
          viewport={{ once: true }}
        >
          {/* Contact Methods */}
          <div className="contact-methods">
            {contactMethods.map((method) => (
              <motion.a
                key={method.title}
                href={method.action}
                className="contact-method"
                variants={cardVariants}
                initial="hidden"
                animate={["visible", "float"]}
                whileHover={{
                  scale: 1.07,
                  boxShadow: `0 10px 30px ${method.color}40`,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <span className="method-icon">{method.icon}</span>
                <div className="method-info">
                  <h3>{method.title}</h3>
                  <p>{method.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            className="contact-form-container"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.form
              ref={formRef}
              className="contact-form"
              onSubmit={handleSubmit}
              animate={{
                boxShadow: [
                  "0 0 30px rgba(0, 212, 255, 0.2)",
                  "0 0 40px rgba(57, 255, 20, 0.3)",
                  "0 0 30px rgba(0, 212, 255, 0.2)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.h3
                className="form-title"
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
              >
                Projekt anfragen
              </motion.h3>

              <div className="form-row">
                <motion.div
                  className="form-group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setActiveField("name")}
                    onBlur={() => setActiveField(null)}
                    className={`form-input ${
                      activeField === "name" ? "active" : ""
                    } ${errors.name ? "error" : ""}`}
                    placeholder="Ihr Name"
                    required
                  />
                  {errors.name && (
                    <motion.span
                      className="error-message"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.name}
                    </motion.span>
                  )}
                </motion.div>

                <motion.div
                  className="form-group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField(null)}
                    className={`form-input ${
                      activeField === "email" ? "active" : ""
                    } ${errors.email ? "error" : ""}`}
                    placeholder="Ihre E-Mail"
                    required
                  />
                  {errors.email && (
                    <motion.span
                      className="error-message"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.email}
                    </motion.span>
                  )}
                </motion.div>
              </div>

              <div className="form-row">
                <motion.div
                  className="form-group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    onFocus={() => setActiveField("company")}
                    onBlur={() => setActiveField(null)}
                    className={`form-input ${
                      activeField === "company" ? "active" : ""
                    }`}
                    placeholder="Firmenname (optional)"
                  />
                </motion.div>

                <motion.div
                  className="form-group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    onFocus={() => setActiveField("project")}
                    onBlur={() => setActiveField(null)}
                    className={`form-input ${
                      activeField === "project" ? "active" : ""
                    }`}
                  >
                    <option value="">Projekttyp wählen</option>
                    <option value="webapp">Web-App Entwicklung</option>
                    <option value="social">Social Media Management</option>
                    <option value="drone">Drohnenaufnahmen</option>
                    <option value="branding">Branding & Design</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </motion.div>
              </div>

              <motion.div
                className="form-group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField("message")}
                  onBlur={() => setActiveField(null)}
                  className={`form-input ${
                    activeField === "message" ? "active" : ""
                  } ${errors.message ? "error" : ""}`}
                  placeholder="Beschreiben Sie Ihr Projekt..."
                  rows={5}
                  required
                />
                {errors.message && (
                  <motion.span
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.message}
                  </motion.span>
                )}
              </motion.div>

              <motion.button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(57, 255, 20, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  background: isSubmitting
                    ? "linear-gradient(45deg, #666, #888)"
                    : [
                        "linear-gradient(45deg, #39ff14, #00d4ff)",
                        "linear-gradient(45deg, #00d4ff, #39ff14)",
                        "linear-gradient(45deg, #39ff14, #00d4ff)",
                      ],
                }}
                transition={{
                  duration: isSubmitting ? 0.3 : 3,
                  repeat: isSubmitting ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              >
                {isSubmitting ? (
                  <motion.div
                    className="loading-spinner"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ) : (
                  "Nachricht senden"
                )}
              </motion.button>
            </motion.form>

            {/* Success Message */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -50 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <motion.div
                    className="success-icon"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                  >
                    ✅
                  </motion.div>
                  <h3>Nachricht gesendet!</h3>
                  <p>Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Contact Stats */}
        <motion.div
          className="contact-stats-modern"
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "1.5rem" : "2.5rem",
            margin: isMobile ? "2.5rem 0 0 0" : "4rem 0 0 0",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.18,
                delayChildren: 0.5,
              },
            },
          }}
          viewport={{ once: true }}
        >
          {contactStats.map((stat) => (
            <motion.div
              key={stat.label}
              className="contact-stat-card"
              variants={statCardVariants}
              initial="hidden"
              animate={["visible", "float"]}
              whileHover={
                !isMobile
                  ? {
                      scale: 1.08,
                      boxShadow: `0 0 32px ${stat.color}80, 0 0 0 2px ${stat.color}55`,
                      borderColor: stat.color,
                    }
                  : undefined
              }
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              style={
                isMobile
                  ? {
                      scale: 1.08,
                      boxShadow: `0 0 32px ${stat.color}80, 0 0 0 2px ${stat.color}55`,
                      borderColor: stat.color,
                    }
                  : undefined
              }
            >
              <div className="stat-number">
                <CountUpStat value={stat.value} />
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
