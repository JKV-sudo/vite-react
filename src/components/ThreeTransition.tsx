import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MathUtils,
  Color,
  AdditiveBlending,
  DoubleSide,
  TextureLoader,
  SRGBColorSpace,
  LinearFilter,
} from "three";
import * as THREE from "three";
import type { Group, Texture } from "three";
import { Edges, PerspectiveCamera } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import "../styles/transition.css";
// logo asset no longer used for previews; snapshots are preloaded

type Axis = "x" | "y";

type StartOptions = {
  fromId: string;
  toId: string;
  axis?: Axis;
  direction?: 1 | -1;
};

type ThreeTransitionContextType = {
  startTransition: (opts: StartOptions) => Promise<void>;
  navigateWith3D: (args: {
    currentId: string;
    targetId: string;
    orderedIds: string[];
  }) => void;
  isTransitioning: boolean;
};

const ThreeTransitionContext = createContext<ThreeTransitionContextType | null>(
  null
);

export const useThreeTransition = (): ThreeTransitionContextType => {
  const ctx = useContext(ThreeTransitionContext);
  if (!ctx)
    throw new Error(
      "useThreeTransition must be used within ThreeTransitionProvider"
    );
  return ctx;
};

const idToLabel: Record<string, string> = {
  home: "Home",
  services: "Leistungen",
  about: "Über uns",
  tech: "Tech Stack",
  portfolio: "Portfolio",
  contact: "Kontakt",
};

// Improved easing functions for smoother animation
// Keep for potential future use
// const easeInOutCubic = (t: number) =>
//   t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

const easeInOutBack = (t: number) => {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  return t < 0.5
    ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
    : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
};
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const GlowParticles: React.FC<{
  progressMsRef: React.MutableRefObject<number | null>;
}> = ({ progressMsRef }) => {
  const pointsRef = useRef<{
    rotation?: { x: number; y: number };
    material?: { opacity: number };
  } | null>(null);
  // Reduced particle count for better performance
  const count = 120; // Was 220
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, []);

  // Optimize animation with less frequent updates
  const animationSpeed = useRef(0);
  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Use delta for frame-rate independent animation
      animationSpeed.current += delta;

      if (pointsRef.current.rotation) {
        pointsRef.current.rotation.y = animationSpeed.current * 0.2; // Slightly slower
        pointsRef.current.rotation.x =
          Math.sin(animationSpeed.current * 0.25) * 0.03; // Reduced amplitude
      }

      // Less frequent opacity calculations (every 4th frame)
      if (Math.floor(state.clock.getElapsedTime() * 60) % 4 === 0) {
        const elapsed = progressMsRef.current ?? 0;
        const progress = clamp01(elapsed / 1000);
        if (pointsRef.current && pointsRef.current.material) {
          pointsRef.current.material.opacity =
            0.12 + 0.18 * Math.sin(progress * Math.PI); // Reduced opacity range
        }
      }
    }
  });

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <points ref={pointsRef as any}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        size={0.03} // Slightly smaller
        color="#00d4ff"
        transparent
        opacity={0.18} // Reduced base opacity
        depthWrite={false}
        blending={AdditiveBlending}
        sizeAttenuation={true} // Better depth perception
      />
    </points>
  );
};

// Cube face mappings for clickable navigation
const FACE_TO_SECTION: Record<string, string> = {
  front: "home",
  right: "services",
  left: "about",
  top: "portfolio",
  bottom: "tech",
  back: "contact",
};

const CubeFaces: React.FC<{
  axis: Axis;
  direction: 1 | -1;
  durationMs: number;
  onDone: () => void;
  onFaceClick: (sectionId: string) => void;
}> = ({ axis, direction, durationMs, onDone, onFaceClick }) => {
  const groupRef = useRef<Group>(null);
  const startRef = useRef<number | null>(null);
  const elapsedMsRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  useFrame((state) => {
    const now = state.clock.getElapsedTime() * 1000;
    if (startRef.current === null) startRef.current = now;
    const elapsed = now - startRef.current;
    elapsedMsRef.current = elapsed;
    const t = Math.min(1, elapsed / durationMs);

    // Use improved easing for smoother rotation
    const rotationEased = easeInOutQuart(t);
    const scaleEased = easeInOutBack(Math.max(0, Math.min(1, t * 1.2)));

    const targetAngle = (Math.PI / 2) * direction;
    const g = groupRef.current;
    if (g) {
      if (axis === "y") {
        g.rotation.y = MathUtils.lerp(0, targetAngle, rotationEased);
      } else {
        g.rotation.x = MathUtils.lerp(0, -targetAngle, rotationEased);
      }

      // Enhanced scaling with bounce effect
      const scale = MathUtils.lerp(
        1,
        0.88, // Slightly more dramatic scale
        Math.sin(Math.PI * Math.min(scaleEased * 1.1, 1)) * (1 - t * 0.2)
      );
      g.scale.setScalar(scale);

      // Add subtle secondary rotation for more dynamic feel
      if (t > 0.1 && t < 0.9) {
        const wobble =
          0.015 * Math.sin(t * Math.PI * 6) * (1 - Math.abs(t - 0.5) * 2);
        g.rotation.z = wobble;
      }
    }

    if (!doneRef.current && t >= 1) {
      doneRef.current = true;
      onDone();
    }
  });

  const size = 2.2;

  // Shared geometry for all faces - better performance
  const planeGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size);
    // Optimize geometry
    geo.deleteAttribute("normal"); // We don't need normals for basic material
    geo.deleteAttribute("uv"); // We'll use texture coordinates
    return geo;
  }, [size]);
  const half = size / 2;
  const faceColor = new Color("#0a0a0c");
  const faceEmissive = new Color("#101020");
  const getPreview = (id: string): string =>
    sessionStorage.getItem(`sv_snap_${id}`) || "";

  // Cached texture loader - reuse single instance
  const textureLoader = useMemo(() => new TextureLoader(), []);
  const textureCache = useMemo(() => new Map<string, Texture>(), []);

  const makeTexture = useCallback(
    (id: string): Texture | null => {
      const url = getPreview(id);
      if (!url) return null;

      // Return cached texture if available
      if (textureCache.has(url)) {
        return textureCache.get(url)!;
      }

      // Create optimized texture
      const tex = textureLoader.load(url);
      tex.colorSpace = SRGBColorSpace;
      tex.minFilter = LinearFilter;
      tex.magFilter = LinearFilter;
      tex.generateMipmaps = false;
      tex.flipY = false; // Optimize for canvas-generated images

      // Cache for reuse
      textureCache.set(url, tex);
      return tex;
    },
    [textureLoader, textureCache]
  );

  const texFront: Texture | null = useMemo(
    () => makeTexture("home"),
    [makeTexture]
  );
  const texRight: Texture | null = useMemo(
    () => makeTexture("services"),
    [makeTexture]
  );
  const texLeft: Texture | null = useMemo(
    () => makeTexture("about"),
    [makeTexture]
  );
  const texTop: Texture | null = useMemo(
    () => makeTexture("portfolio"),
    [makeTexture]
  );
  const texBottom: Texture | null = useMemo(
    () => makeTexture("tech"),
    [makeTexture]
  );
  const texBack: Texture | null = useMemo(
    () => makeTexture("contact"),
    [makeTexture]
  );

  // Cleanup function for memory management
  useEffect(() => {
    return () => {
      // Clean up texture cache when component unmounts
      textureCache.forEach((texture) => {
        texture.dispose();
      });
      textureCache.clear();

      // Clean up geometry
      if (planeGeometry) {
        planeGeometry.dispose();
      }
    };
  }, [textureCache, planeGeometry]);

  // Handle face clicks with hover effects
  const handleFaceClick = (faceName: string) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const sectionId = FACE_TO_SECTION[faceName];
    if (sectionId) {
      onFaceClick(sectionId);
    }
  };

  const faceHoverProps = {
    onPointerEnter: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      document.body.style.cursor = "pointer";
    },
    onPointerLeave: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      document.body.style.cursor = "auto";
    },
  };

  return (
    <group ref={groupRef}>
      <GlowParticles progressMsRef={elapsedMsRef} />
      {/* Front */}
      <mesh
        position={[0, 0, half]}
        onClick={handleFaceClick("front")}
        {...faceHoverProps}
      >
        <primitive object={planeGeometry} />
        {texFront ? (
          <meshBasicMaterial
            map={texFront}
            side={DoubleSide}
            toneMapped={false}
          />
        ) : (
          <meshStandardMaterial
            color={faceColor}
            emissive={faceEmissive}
            roughness={0.6}
            metalness={0.1}
          />
        )}
        <Edges color="#00d4ff" threshold={15} />
        {/* filled by texture */}
      </mesh>
      {/* Right */}
      <group rotation={[0, Math.PI / 2, 0]}>
        <mesh
          position={[0, 0, half]}
          onClick={handleFaceClick("right")}
          {...faceHoverProps}
        >
          <primitive object={planeGeometry} />
          {texRight ? (
            <meshBasicMaterial
              map={texRight}
              side={DoubleSide}
              toneMapped={false}
            />
          ) : (
            <meshStandardMaterial
              color={faceColor}
              emissive={faceEmissive}
              roughness={0.6}
              metalness={0.1}
              side={DoubleSide}
            />
          )}
          <Edges color="#39ff14" threshold={15} />
          {/* filled by texture */}
        </mesh>
      </group>
      {/* Left */}
      <group rotation={[0, -Math.PI / 2, 0]}>
        <mesh
          position={[0, 0, half]}
          onClick={handleFaceClick("left")}
          {...faceHoverProps}
        >
          <primitive object={planeGeometry} />
          {texLeft ? (
            <meshBasicMaterial
              map={texLeft}
              side={DoubleSide}
              toneMapped={false}
            />
          ) : (
            <meshStandardMaterial
              color={faceColor}
              emissive={faceEmissive}
              roughness={0.6}
              metalness={0.1}
              side={DoubleSide}
            />
          )}
          <Edges color="#ff006e" threshold={15} />
          {/* filled by texture */}
        </mesh>
      </group>
      {/* Back */}
      <group rotation={[0, Math.PI, 0]}>
        <mesh
          position={[0, 0, half]}
          onClick={handleFaceClick("back")}
          {...faceHoverProps}
        >
          <primitive object={planeGeometry} />
          {texBack ? (
            <meshBasicMaterial
              map={texBack}
              side={DoubleSide}
              toneMapped={false}
            />
          ) : (
            <meshStandardMaterial
              color={faceColor}
              emissive={faceEmissive}
              roughness={0.6}
              metalness={0.1}
              side={DoubleSide}
            />
          )}
          <Edges color="#00d4ff" threshold={15} />
        </mesh>
      </group>
      {/* Top */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          position={[0, 0, half]}
          onClick={handleFaceClick("top")}
          {...faceHoverProps}
        >
          <primitive object={planeGeometry} />
          {texTop ? (
            <meshBasicMaterial
              map={texTop}
              side={DoubleSide}
              toneMapped={false}
            />
          ) : (
            <meshStandardMaterial
              color={faceColor}
              emissive={faceEmissive}
              roughness={0.6}
              metalness={0.1}
            />
          )}
          <Edges color="#7a5cff" threshold={15} />
          {/* filled by texture */}
        </mesh>
      </group>
      {/* Bottom */}
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          position={[0, 0, half]}
          onClick={handleFaceClick("bottom")}
          {...faceHoverProps}
        >
          <primitive object={planeGeometry} />
          {texBottom ? (
            <meshBasicMaterial
              map={texBottom}
              side={DoubleSide}
              toneMapped={false}
            />
          ) : (
            <meshStandardMaterial
              color={faceColor}
              emissive={faceEmissive}
              roughness={0.6}
              metalness={0.1}
            />
          )}
          <Edges color="#00d4ff" threshold={15} />
          {/* filled by texture */}
        </mesh>
      </group>
    </group>
  );
};

const Scene: React.FC<{
  fromId: string;
  toId: string;
  axis: Axis;
  direction: 1 | -1;
  onComplete: () => void;
  onFaceClick: (sectionId: string) => void;
}> = ({ axis, direction, onComplete, onFaceClick }) => {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 3, 4]} intensity={0.8} />
      <directionalLight
        position={[-3, -2, -4]}
        intensity={0.35}
        color={new Color("#00d4ff")}
      />
      <CubeFaces
        axis={axis}
        direction={direction}
        durationMs={1000}
        onDone={onComplete}
        onFaceClick={onFaceClick}
      />
      <EffectComposer
        multisampling={0}
        frameBufferType={undefined} // Use default for better performance
      >
        <Bloom
          intensity={0.35} // Reduced intensity
          luminanceThreshold={0.35} // Higher threshold = less bloom
          luminanceSmoothing={0.7} // Less smoothing
          width={512} // Lower resolution for better performance
          height={512}
        />
        <Vignette
          eskil={false}
          offset={0.2}
          darkness={0.6} // Reduced darkness
        />
      </EffectComposer>
    </>
  );
};

export const ThreeTransitionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [active, setActive] = useState(false);
  const [shrunk, setShrunk] = useState(false);
  const [fromId, setFromId] = useState<string | null>(null);
  const [toId, setToId] = useState<string | null>(null);
  // previews handled via preloaded sessionStorage snapshots; no local state
  const [axis, setAxis] = useState<Axis>("y");
  const [direction, setDirection] = useState<1 | -1>(1);
  const resolver = useRef<(() => void) | null>(null);
  // no preview cache; using preloaded snapshots

  // prefers reduced motion no longer used in this component

  // const isForce3DEnabled = () => {
  //   try {
  //     return (
  //       typeof window !== "undefined" &&
  //       localStorage.getItem("sv_force_3d") === "1"
  //     );
  //   } catch {
  //     return false;
  //   }
  // };

  const startTransition = useCallback(
    async ({
      fromId: f,
      toId: t,
      axis: ax = "y",
      direction: dir = 1,
    }: StartOptions) => {
      // Previews are pre-captured; no capture work here
      console.log(`[ThreeTransition] Starting transition ${f} -> ${t}`);
      setShrunk(true);
      await new Promise((r) => setTimeout(r, 160));
      setFromId(f);
      setToId(t);
      setAxis(ax);
      setDirection(dir);
      setActive(true);
      document.body.style.overflow = "hidden";
      console.log(
        `[ThreeTransition] 3D animation active, waiting for completion`
      );
      await new Promise<void>((resolve) => {
        resolver.current = resolve;
      });
      // In guided mode, no scrolling needed - sections are rendered conditionally
      console.log(`[ThreeTransition] Transition complete, unshrinking`);
      setShrunk(false);
      document.body.style.overflow = "";
    },
    []
  );

  const navigateWith3D = useCallback(
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

  // Handle cube face clicks during transitions
  const handleFaceClick = useCallback(
    (sectionId: string) => {
      if (!active) return; // Only during transitions

      const sections = [
        "home",
        "services",
        "about",
        "portfolio",
        "tech",
        "contact",
      ];
      const currentIndex = sections.indexOf(fromId || "home");
      const targetIndex = sections.indexOf(sectionId);

      if (targetIndex === -1 || currentIndex === targetIndex) return;

      const dir: 1 | -1 = targetIndex > currentIndex ? 1 : -1;

      // Cancel current transition and start new one
      if (resolver.current) {
        resolver.current();
        resolver.current = null;
      }

      setFromId(fromId);
      setToId(sectionId);
      setAxis("y");
      setDirection(dir);
    },
    [active, fromId]
  );

  const onComplete = useCallback(() => {
    setActive(false);
    if (resolver.current) {
      const r = resolver.current;
      resolver.current = null;
      r();
    }
  }, []);

  // Expose a simple debug trigger in console: window.sv3d(fromId, toId)
  React.useEffect(() => {
    (
      window as unknown as { sv3d?: (fromId: string, toId: string) => void }
    ).sv3d = (fromId: string, toId: string) =>
      startTransition({ fromId, toId, axis: "y", direction: 1 });
    return () => {
      (window as unknown as { sv3d?: undefined }).sv3d = undefined;
    };
  }, [startTransition]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(
    () => ({
      startTransition,
      navigateWith3D,
      isTransitioning: active,
    }),
    [startTransition, navigateWith3D, active]
  );

  // Debug logging
  console.log(
    `[ThreeTransition] Render - shrunk: ${shrunk}, active: ${active}`
  );
  if (active) {
    console.log("[ThreeTransition] 3D overlay is ACTIVE and covering screen");
  }

  return (
    <ThreeTransitionContext.Provider value={contextValue}>
      <div className={`transition-root${shrunk ? " shrink" : ""}`}>
        {children}
      </div>
      {active && fromId && toId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 30000,
            pointerEvents: "none",
            background:
              "radial-gradient(1200px 800px at 50% 50%, rgba(0, 20, 30, 0.35), rgba(0,0,0,0.85))",
          }}
        >
          <Canvas
            gl={{
              antialias: false,
              powerPreference: "high-performance",
              alpha: false, // Better performance
              stencil: false, // Not needed
              depth: true,
              preserveDrawingBuffer: false, // Better memory usage
            }}
            shadows={false}
            dpr={Math.min(window.devicePixelRatio, 2)} // Cap DPR for performance
            performance={{ min: 0.8 }} // Adaptive performance
            frameloop="always" // Continuous for smooth animation
          >
            <PerspectiveCamera makeDefault fov={55} position={[0, 0, 6]} />
            <color attach="background" args={["#02040a"]} />
            <Scene
              fromId={fromId}
              toId={toId}
              axis={axis}
              direction={direction}
              onComplete={onComplete}
              onFaceClick={handleFaceClick}
            />
          </Canvas>
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              color: "#bdf9ff",
              fontSize: 14,
              letterSpacing: 0.4,
              fontWeight: 500,
              textShadow: "0 0 10px rgba(0,212,255,0.7)",
              pointerEvents: "none",
            }}
          >
            Loading {idToLabel[toId] ?? toId}…
          </div>
        </div>
      )}
    </ThreeTransitionContext.Provider>
  );
};

export default ThreeTransitionProvider;
