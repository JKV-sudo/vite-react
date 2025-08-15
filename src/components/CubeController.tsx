import React, { useEffect, useRef, useState } from "react";
import { useNavigation, SectionId } from "../hooks/useNavigation";
import { useThreeTransition } from "./ThreeTransition";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced cube control system
export const CubeController: React.FC = () => {
  const { activeSection, navigateToSection, getAdjacentSections } =
    useNavigation();
  const { isTransitioning } = useThreeTransition();
  const [showControls, setShowControls] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only if no input is focused and cube transition isn't active
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.querySelector('[style*="z-index: 30000"]') // cube transition active
      ) {
        return;
      }

      const { previous, next } = getAdjacentSections();

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          if (previous) navigateToSection(previous);
          break;
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          if (next) navigateToSection(next);
          break;
        case " ": // Space bar
          e.preventDefault();
          setShowControls(!showControls);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, navigateToSection, getAdjacentSections, showControls]);

  // Touch/swipe navigation for mobile - now works on entire viewport
  useEffect(() => {
    if (!isMobile) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };

      const deltaX = touchEnd.x - touchStartRef.current.x;
      const deltaY = touchEnd.y - touchStartRef.current.y;
      const minSwipeDistance = 50;

      // Ignore if touch move was too small
      if (
        Math.abs(deltaX) < minSwipeDistance &&
        Math.abs(deltaY) < minSwipeDistance
      ) {
        return;
      }

      // Determine swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        const { previous, next } = getAdjacentSections();
        if (deltaX > 0 && previous) {
          // Swipe right (go to previous)
          navigateToSection(previous);
        } else if (deltaX < 0 && next) {
          // Swipe left (go to next)
          navigateToSection(next);
        }
      }

      touchStartRef.current = null;
    };

    // Add touch listeners to entire document for guided experience
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile, navigateToSection, getAdjacentSections, isTransitioning]);

  // Show hint on first visit
  useEffect(() => {
    const hasSeenHint = sessionStorage.getItem("sv_cube_hint_shown");
    if (!hasSeenHint) {
      setShowControls(true);
      sessionStorage.setItem("sv_cube_hint_shown", "1");

      // Auto hide after 3 seconds
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* Floating Control Toggle Button */}
      <motion.button
        className="cube-control-toggle"
        onClick={() => setShowControls(!showControls)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00d4ff, #39ff14)",
          border: "none",
          color: "#000",
          fontSize: 18,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0, 212, 255, 0.3)",
        }}
        title="Navigation Controls (Space)"
      >
        🎮
      </motion.button>

      {/* Control Panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="cube-controls-panel"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{
              position: "fixed",
              bottom: 80,
              right: 20,
              zIndex: 1000,
              background: "rgba(10, 10, 12, 0.95)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              borderRadius: 16,
              padding: 20,
              minWidth: 280,
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <h3
                style={{
                  margin: "0 0 12px 0",
                  fontSize: 16,
                  color: "#00d4ff",
                  textAlign: "center",
                }}
              >
                🎯 Guided Experience
              </h3>

              {/* Current Section Indicator */}
              <div
                style={{
                  background: "rgba(0, 212, 255, 0.1)",
                  border: "1px solid rgba(0, 212, 255, 0.3)",
                  borderRadius: 8,
                  padding: 8,
                  textAlign: "center",
                  marginBottom: 12,
                }}
              >
                Viewing:{" "}
                <strong style={{ color: "#39ff14" }}>
                  {activeSection.toUpperCase()}
                </strong>
              </div>
            </div>

            {/* Desktop Controls */}
            {!isMobile && (
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontSize: 13,
                    opacity: 0.8,
                    marginBottom: 8,
                    color: "#00d4ff",
                  }}
                >
                  🖱️ Desktop Controls:
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                  • <kbd style={kbdStyle}>←</kbd> <kbd style={kbdStyle}>↑</kbd>{" "}
                  Previous Section
                  <br />• <kbd style={kbdStyle}>→</kbd>{" "}
                  <kbd style={kbdStyle}>↓</kbd> Next Section
                  <br />• <kbd style={kbdStyle}>Space</kbd> Toggle Controls
                  <br />• Click cube faces during transitions
                  <br />•{" "}
                  <strong style={{ color: "#39ff14" }}>
                    No scrolling needed!
                  </strong>
                </div>
              </div>
            )}

            {/* Mobile Controls */}
            {isMobile && (
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontSize: 13,
                    opacity: 0.8,
                    marginBottom: 8,
                    color: "#39ff14",
                  }}
                >
                  📱 Mobile Controls:
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                  • Swipe left/right to navigate
                  <br />
                  • Tap cube faces during transitions
                  <br />•{" "}
                  <strong style={{ color: "#39ff14" }}>
                    Pure guided experience!
                  </strong>
                </div>
              </div>
            )}

            {/* Quick Section Access */}
            <div>
              <div
                style={{
                  fontSize: 13,
                  opacity: 0.8,
                  marginBottom: 8,
                  color: "#ff006e",
                }}
              >
                🚀 Quick Jump:
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 6,
                  fontSize: 11,
                }}
              >
                {[
                  "home",
                  "services",
                  "about",
                  "portfolio",
                  "tech",
                  "contact",
                ].map((sectionId) => (
                  <button
                    key={sectionId}
                    onClick={() => {
                      navigateToSection(sectionId as SectionId);
                      setShowControls(false);
                    }}
                    style={{
                      background:
                        activeSection === sectionId
                          ? "rgba(57, 255, 20, 0.2)"
                          : "rgba(0, 212, 255, 0.1)",
                      border: `1px solid ${
                        activeSection === sectionId
                          ? "#39ff14"
                          : "rgba(0, 212, 255, 0.3)"
                      }`,
                      borderRadius: 6,
                      padding: "6px 8px",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: 11,
                      textTransform: "capitalize",
                    }}
                  >
                    {sectionId}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const kbdStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: 4,
  padding: "2px 6px",
  fontSize: 11,
  fontFamily: "monospace",
  color: "#00d4ff",
  margin: "0 2px",
};

export default CubeController;
