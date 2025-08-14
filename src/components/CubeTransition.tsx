import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/cube.css";

type Axis = "x" | "y";

type StartOptions = {
  fromId: string;
  toId: string;
  axis?: Axis;
  direction?: 1 | -1; // 1 forward/right/down, -1 backward/left/up
};

type CubeTransitionContextType = {
  startTransition: (opts: StartOptions) => Promise<void>;
  navigateWithCube: (args: {
    currentId: string;
    targetId: string;
    orderedIds: string[];
  }) => void;
};

const CubeTransitionContext = createContext<CubeTransitionContextType | null>(
  null
);

export const useCubeTransition = (): CubeTransitionContextType => {
  const ctx = useContext(CubeTransitionContext);
  if (!ctx)
    throw new Error(
      "useCubeTransition must be used within CubeTransitionProvider"
    );
  return ctx;
};

const getSectionHtml = (id: string): string => {
  const el = document.getElementById(id);
  if (!el)
    return `<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%\">Missing section: ${id}</div>`;
  // Clone shallow HTML snapshot; interactivity is disabled and ephemeral
  return el.outerHTML;
};

export const CubeTransitionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [active, setActive] = useState(false);
  const [fromHtml, setFromHtml] = useState("");
  const [toHtml, setToHtml] = useState("");
  const [axis, setAxis] = useState<Axis>("y");
  const [direction, setDirection] = useState<1 | -1>(1);
  const resolveRef = useRef<(() => void) | null>(null);

  // Reduced motion: bypass animation entirely
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    return () => {
      if (resolveRef.current) resolveRef.current();
    };
  }, []);

  const startTransition = useCallback(
    async ({
      fromId,
      toId,
      axis: ax = "y",
      direction: dir = 1,
    }: StartOptions) => {
      if (prefersReducedMotion) {
        document.getElementById(toId)?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      const from = getSectionHtml(fromId);
      const to = getSectionHtml(toId);

      setAxis(ax);
      setDirection(dir);
      setFromHtml(from);
      setToHtml(to);
      setActive(true);

      document.body.style.overflow = "hidden";

      await new Promise<void>((resolve) => {
        resolveRef.current = resolve;
      });

      document
        .getElementById(toId)
        ?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
      document.body.style.overflow = "";
    },
    [prefersReducedMotion]
  );

  const navigateWithCube = useCallback(
    ({
      currentId,
      targetId,
      orderedIds,
    }: {
      currentId: string;
      targetId: string;
      orderedIds: string[];
    }) => {
      if (currentId === targetId) return;
      const fromIndex = orderedIds.indexOf(currentId);
      const toIndex = orderedIds.indexOf(targetId);
      const dir: 1 | -1 = toIndex > fromIndex ? 1 : -1;
      startTransition({
        fromId: currentId,
        toId: targetId,
        axis: "y",
        direction: dir,
      });
    },
    [startTransition]
  );

  const onAnimationComplete = useCallback(() => {
    if (resolveRef.current) {
      const r = resolveRef.current;
      resolveRef.current = null;
      setActive(false);
      r();
    }
  }, []);

  // Wheel demo removed per request

  return (
    <CubeTransitionContext.Provider
      value={{ startTransition, navigateWithCube }}
    >
      {children}
      <AnimatePresence>
        {active && (
          <motion.div
            className="cube-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden
          >
            <motion.div
              className="cube-scene"
              initial={{ scale: 1 }}
              animate={{ scale: 0.88 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              <motion.div
                className="cube"
                initial={{ rotateY: 0, rotateX: 0 }}
                animate={
                  axis === "y"
                    ? { rotateY: direction === 1 ? 90 : -90 }
                    : { rotateX: direction === 1 ? -90 : 90 }
                }
                transition={{ duration: 0.62, ease: [0.4, 0.0, 0.2, 1] }}
                onAnimationComplete={onAnimationComplete}
              >
                <div
                  className="face face-front"
                  dangerouslySetInnerHTML={{ __html: fromHtml }}
                />
                {axis === "y" && (
                  <div
                    className={`face ${
                      direction === 1 ? "face-right" : "face-left"
                    }`}
                    dangerouslySetInnerHTML={{ __html: toHtml }}
                  />
                )}
                {axis === "x" && (
                  <div
                    className={`face ${
                      direction === 1 ? "face-bottom" : "face-top"
                    }`}
                    dangerouslySetInnerHTML={{ __html: toHtml }}
                  />
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CubeTransitionContext.Provider>
  );
};

export default CubeTransitionProvider;
