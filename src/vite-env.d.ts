/// <reference types="vite/client" />

declare global {
  interface Window {
    __disableParticles?: () => boolean;
  }
}

export {};
