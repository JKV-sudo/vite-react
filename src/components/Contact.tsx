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
              value: 100,
            },
            opacity: {
              value: 0.6,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 6 },
            },
          },
          detectRetina: true,
        }}
      />

      <div className="contact-container">
        <div className="contact-header">
          <motion.h2
            className="contact-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Quantum Communication Hub
          </motion.h2>
          <motion.p
            className="contact-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Connect with our digital architects and bring your vision to reality
          </motion.p>
        </div>

        <div className="contact-content">
          {/* Contact Methods */}
          <motion.div
            className="contact-methods"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            ref={floatingCardsRef}
          >
            <h3 className="methods-title">Get In Touch</h3>
            <div className="methods-grid">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.action}
                  className="contact-method-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 30px ${method.color}40`,
                  }}
                  style={{ borderColor: method.color }}
                >
                  <div className="method-icon" style={{ color: method.color }}>
                    {method.icon}
                  </div>
                  <div className="method-content">
                    <h4 className="method-title">{method.title}</h4>
                    <p className="method-value">{method.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="form-container">
              <h3 className="form-title">Send Message</h3>

              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    className="success-message"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="success-icon">✅</div>
                    <h4>Message Sent Successfully!</h4>
                    <p>We'll get back to you within 24 hours.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="contact-form"
              >
                <div className="form-row">
                  <div className="form-group">
                    <motion.div
                      className={`input-container ${
                        activeField === "name" ? "active" : ""
                      } ${errors.name ? "error" : ""}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setActiveField("name")}
                        onBlur={() => setActiveField(null)}
                        placeholder="Your Name"
                        required
                      />
                      <div className="input-border"></div>
                    </motion.div>
                    {errors.name && (
                      <motion.span
                        className="error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.name}
                      </motion.span>
                    )}
                  </div>

                  <div className="form-group">
                    <motion.div
                      className={`input-container ${
                        activeField === "email" ? "active" : ""
                      } ${errors.email ? "error" : ""}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setActiveField("email")}
                        onBlur={() => setActiveField(null)}
                        placeholder="Your Email"
                        required
                      />
                      <div className="input-border"></div>
                    </motion.div>
                    {errors.email && (
                      <motion.span
                        className="error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.email}
                      </motion.span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <motion.div
                      className={`input-container ${
                        activeField === "company" ? "active" : ""
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        onFocus={() => setActiveField("company")}
                        onBlur={() => setActiveField(null)}
                        placeholder="Company (Optional)"
                      />
                      <div className="input-border"></div>
                    </motion.div>
                  </div>

                  <div className="form-group">
                    <motion.div
                      className={`input-container ${
                        activeField === "project" ? "active" : ""
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <select
                        name="project"
                        value={formData.project}
                        onChange={handleInputChange}
                        onFocus={() => setActiveField("project")}
                        onBlur={() => setActiveField(null)}
                        required
                      >
                        <option value="">Select Project Type</option>
                        <option value="web-development">Web Development</option>
                        <option value="aerial-photography">
                          Aerial Photography
                        </option>
                        <option value="branding">Branding & Design</option>
                        <option value="ui-ux">UI/UX Design</option>
                        <option value="interactive-art">Interactive Art</option>
                        <option value="data-visualization">
                          Data Visualization
                        </option>
                        <option value="other">Other</option>
                      </select>
                      <div className="input-border"></div>
                    </motion.div>
                  </div>
                </div>

                <div className="form-group">
                  <motion.div
                    className={`input-container ${
                      activeField === "message" ? "active" : ""
                    } ${errors.message ? "error" : ""}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Tell us about your project..."
                      rows={5}
                      required
                    ></textarea>
                    <div className="input-border"></div>
                  </motion.div>
                  {errors.message && (
                    <motion.span
                      className="error-message"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.message}
                    </motion.span>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(57, 255, 20, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? (
                    <div className="loading-spinner">
                      <div className="spinner"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Contact Stats */}
        <motion.div
          className="contact-stats"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">24h</div>
              <div className="stat-label">Response Time</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5★</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
