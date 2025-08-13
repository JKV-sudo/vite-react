import React, { useState, useEffect } from "react";

const defaultConfig = {
  heroAnimations: true,
  particles: true,
  heavyShadows: true,
  animationComplexity: "high", // "low" | "medium" | "high"
};

export function getConfig() {
  const config = localStorage.getItem("sv_config");
  return config ? JSON.parse(config) : defaultConfig;
}

export function setConfig(newConfig: any) {
  localStorage.setItem("sv_config", JSON.stringify(newConfig));
}

const ConfigPanel: React.FC = () => {
  const [config, setConfigState] = useState(getConfig());

  useEffect(() => {
    setConfig(config);
  }, [config]);

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        background: "#222",
        color: "#fff",
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 4px 24px #00d4ff55",
      }}
    >
      <h4 style={{ marginTop: 0, marginBottom: 12 }}>Config Panel</h4>
      <label style={{ display: "block", marginBottom: 8 }}>
        <input
          type="checkbox"
          checked={config.heroAnimations}
          onChange={(e) =>
            setConfigState({ ...config, heroAnimations: e.target.checked })
          }
        />{" "}
        Hero Animations
      </label>
      <label style={{ display: "block", marginBottom: 8 }}>
        <input
          type="checkbox"
          checked={config.particles}
          onChange={(e) =>
            setConfigState({ ...config, particles: e.target.checked })
          }
        />{" "}
        Particles
      </label>
      <label style={{ display: "block", marginBottom: 8 }}>
        <input
          type="checkbox"
          checked={config.heavyShadows}
          onChange={(e) =>
            setConfigState({ ...config, heavyShadows: e.target.checked })
          }
        />{" "}
        Heavy Shadows
      </label>
      <label style={{ display: "block", marginBottom: 8 }}>
        Animation Complexity:{" "}
        <select
          value={config.animationComplexity}
          onChange={(e) =>
            setConfigState({ ...config, animationComplexity: e.target.value })
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <div style={{ fontSize: 12, color: "#aaa", marginTop: 10 }}>
        <b>Note:</b> Changes are saved to your browser and apply instantly.
        <br />
        Only visible to you.
      </div>
    </div>
  );
};

export default ConfigPanel;
