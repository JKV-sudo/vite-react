import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import gsap from "gsap";

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
  const floatingCardsRef = useRef<HTMLDivElement>(null);

  // Particle effects for contact background
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  // Floating cards animation
  useEffect(() => {
    if (floatingCardsRef.current) {
      const cards = floatingCardsRef.current.children;
      gsap.to(cards, {
        y: -20,
        duration: 3,
        stagger: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
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
      value: "+49 123 456 789",
      action: "tel:+49123456789",
      color: "#39ff14",
    },
    {
      icon: "📍",
      title: "Location",
      value: "Berlin, Germany",
      action: "#",
      color: "#ff006e",
    },
    {
      icon: "💬",
      title: "WhatsApp",
      value: "+49 123 456 789",
      action: "https://wa.me/49123456789",
      color: "#25d366",
    },
  ];

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Name must be at least 2 characters" : "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
                mode: "grab",
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              grab: {
                distance: 140,
                links: {
                  opacity: 0.5,
                },
              },
            },
          },
          particles: {
            color: {
              value: ["#00d4ff", "#39ff14", "#ff006e", "#25d366"],
            },
            links: {
              color: "#00d4ff",
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 4 },
            },
          },
          detectRetina: true,
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

        <div className="contact-content">
          {/* Contact Methods */}
          <motion.div
            className="contact-methods"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            ref={floatingCardsRef}
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.action}
                className="contact-method"
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 10px 30px ${method.color}40`,
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    `0 0 20px ${method.color}30`,
                    `0 0 30px ${method.color}50`,
                    `0 0 20px ${method.color}30`,
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5,
                }}
              >
                <span className="method-icon">{method.icon}</span>
                <div className="method-info">
                  <h3>{method.title}</h3>
                  <p>{method.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

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
        </div>

        {/* Contact Stats */}
        <motion.div
          className="contact-stats"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="stat-item"
            whileHover={{ scale: 1.1 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(0, 212, 255, 0.3)",
                "0 0 30px rgba(57, 255, 20, 0.4)",
                "0 0 20px rgba(0, 212, 255, 0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="stat-number">24h</span>
            <span className="stat-label">Antwortzeit</span>
          </motion.div>
          <motion.div
            className="stat-item"
            whileHover={{ scale: 1.1 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(57, 255, 20, 0.3)",
                "0 0 30px rgba(0, 212, 255, 0.4)",
                "0 0 20px rgba(57, 255, 20, 0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <span className="stat-number">100%</span>
            <span className="stat-label">Kundenzufriedenheit</span>
          </motion.div>
          <motion.div
            className="stat-item"
            whileHover={{ scale: 1.1 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(255, 0, 110, 0.3)",
                "0 0 30px rgba(0, 212, 255, 0.4)",
                "0 0 20px rgba(255, 0, 110, 0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <span className="stat-number">150+</span>
            <span className="stat-label">Projekte erfolgreich</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
