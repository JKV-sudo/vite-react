import React from "react";
import { useThreeTransition } from "./ThreeTransition";
import { useState, useEffect, useCallback, createContext } from "react";

// Navigation sections in logical order
export const NAV_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Leistungen" },
  { id: "about", label: "Über uns" },
  { id: "portfolio", label: "Portfolio" },
  { id: "tech", label: "Tech Stack" },
  { id: "contact", label: "Kontakt" },
] as const;

export type SectionId = (typeof NAV_SECTIONS)[number]["id"];

// Navigation Context
interface NavigationContextType {
  activeSection: SectionId;
  navigateToSection: (targetId: SectionId) => void;
  navigateToHome: () => void;
  getAdjacentSections: () => { previous?: SectionId; next?: SectionId };
  sections: typeof NAV_SECTIONS;
}

export const NavigationContext = createContext<NavigationContextType | null>(
  null
);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const { navigateWith3D, isTransitioning } = useThreeTransition();

  // Monitor transition completion and ensure section consistency
  useEffect(() => {
    if (!isTransitioning) {
      // Transition completed, clear any stored targets
      sessionStorage.removeItem("nav_target_section");
    }
  }, [isTransitioning]);

  // Navigate to section using 3D cube
  const navigateToSection = useCallback(
    (targetId: SectionId) => {
      if (targetId === activeSection) {
        return;
      }

      const currentId = activeSection;

      // Update section state immediately for guided experience
      setActiveSection(targetId);

      // Run 3D transition
      navigateWith3D({
        currentId,
        targetId,
        orderedIds: NAV_SECTIONS.map((s) => s.id),
      });
    },
    [activeSection, navigateWith3D]
  );

  // Navigate to home (for logo clicks)
  const navigateToHome = useCallback(() => {
    if (activeSection !== "home") {
      navigateToSection("home");
    }
  }, [activeSection, navigateToSection]);

  // Get next/previous sections for keyboard navigation
  const getAdjacentSections = useCallback(() => {
    const currentIndex = NAV_SECTIONS.findIndex((s) => s.id === activeSection);
    const prevSection = NAV_SECTIONS[currentIndex - 1];
    const nextSection = NAV_SECTIONS[currentIndex + 1];

    return {
      previous: prevSection?.id,
      next: nextSection?.id,
    };
  }, [activeSection]);

  // Removed debug logging for performance

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(
    () => ({
      activeSection,
      navigateToSection,
      navigateToHome,
      getAdjacentSections,
      sections: NAV_SECTIONS,
    }),
    [activeSection, navigateToSection, navigateToHome, getAdjacentSections]
  );

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};
