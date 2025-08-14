import { useContext } from "react";
import { NavigationContext } from "../components/NavigationProvider";
import type { SectionId } from "../components/NavigationProvider";

// Re-export types for convenience
export type { SectionId };
export { NAV_SECTIONS } from "../components/NavigationProvider";

// Navigation hook that uses context
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  
  // Removed debug spam - state is working correctly
  return context;
};
