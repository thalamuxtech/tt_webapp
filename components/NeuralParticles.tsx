"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function NeuralParticles() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  if (reducedMotion || !ready) return null;

  return (
    <Particles
      id="neural-particles"
      className="absolute inset-0 -z-10"
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: {
            value: 70,
            density: { enable: true },
          },
          color: { value: "#2E7DFF" },
          opacity: { value: 0.35 },
          size: { value: { min: 1, max: 2.5 } },
          links: {
            enable: true,
            distance: 140,
            color: "#2E7DFF",
            opacity: 0.12,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
          },
          modes: {
            grab: { distance: 150, links: { opacity: 0.35 } },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
