import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import Hero from "./Hero";
import Services from "./Services";
import About from "./About";
import Portfolio from "./Portfolio";
import TechStack from "./TechStack";
import Contact from "./Contact";

const ids: Array<{ id: string; selector: string }> = [
  { id: "home", selector: "section#home" },
  { id: "services", selector: "section#services" },
  { id: "about", selector: "section#about" },
  { id: "portfolio", selector: "section#portfolio" },
  { id: "tech", selector: "section#tech" },
  { id: "contact", selector: "section#contact" },
];

const SnapshotPreloader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (globalThis as any).__svSnapshotMode = true;
    const run = async () => {
      // Let React paint
      await new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(r))
      );

      for (const { id, selector } of ids) {
        try {
          const el = containerRef.current?.querySelector(
            selector
          ) as HTMLElement | null;
          if (!el) continue;
          // wait images decode
          const images = Array.from(el.querySelectorAll("img"));
          await Promise.race([
            Promise.allSettled(
              images.map((img) =>
                (img as HTMLImageElement).decode
                  ? (img as HTMLImageElement).decode().catch(() => {})
                  : new Promise((res) => {
                      img.complete
                        ? res(undefined)
                        : img.addEventListener("load", () => res(undefined), {
                            once: true,
                          });
                    })
              )
            ),
            new Promise((res) => setTimeout(res, 700)),
          ]);
          const canvas = await html2canvas(el, {
            backgroundColor: "#0a0a0c",
            useCORS: true,
            scale: 0.6,
            logging: false,
            windowWidth: el.scrollWidth,
            windowHeight: el.scrollHeight,
          });
          const url = canvas.toDataURL("image/png");
          try {
            sessionStorage.setItem(`sv_snap_${id}`, url);
          } catch {}
        } catch {
          // ignore
        }
      }

      (globalThis as any).__svSnapshotMode = false;
      try {
        window.dispatchEvent(new CustomEvent("sv:snapshotsReady"));
      } catch {}
    };
    run();
    return () => {
      (globalThis as any).__svSnapshotMode = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        left: -10000,
        top: 0,
        width: 1200,
        pointerEvents: "none",
        // keep visible for html2canvas to paint
        zIndex: -1,
      }}
      aria-hidden
      className="transition-capture"
    >
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <TechStack />
      <Contact />
    </div>
  );
};

export default SnapshotPreloader;
