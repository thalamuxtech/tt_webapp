"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const NeuralParticles = dynamic(() => import("./NeuralParticles"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_55%_-5%,#0F2847_0%,#040E1F_60%)]" />

      {/* Particle canvas */}
      <NeuralParticles />

      {/* Decorative orbs */}
      <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-pulse-blue/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-circuit-teal/5 blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-circuit-teal/20 bg-circuit-teal/5 px-4 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-circuit-teal animate-pulse-glow" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-circuit-teal">
            The Intelligent Gateway
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-clash text-[clamp(1.75rem,6vw,5.5rem)] font-bold leading-[1.08] tracking-tight text-signal-white"
        >
          Data for insights,
          <br />
          <span className="gradient-text-blue">Intelligence</span> for your
          <br />
          <span className="gradient-text-gold">Boldest moves.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto mt-6 max-w-xl text-base text-signal-white/60 sm:text-lg sm:leading-relaxed"
        >
          We intercept complexity, filter the noise, and route precision-driven
          solutions across Data, Analytics, Consultancy, AI, and Automation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="group flex items-center gap-2 rounded-md bg-pulse-blue px-7 py-3.5 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a6aee] hover:shadow-[0_0_30px_rgba(46,125,255,0.35)]"
          >
            Request a Consultation
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#services"
            className="flex items-center gap-2 rounded-md border border-signal-white/20 px-7 py-3.5 font-medium text-signal-white/90 transition-all hover:border-signal-white/40 hover:bg-signal-white/5"
          >
            Explore Our Services
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-synapse-gold/40" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-synapse-gold/60">
              Trusted across industries
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-synapse-gold/40" />
          </div>
          <div className="flex items-center gap-8 opacity-40">
            {["Finance", "Healthcare", "Education", "Tech", "Government"].map(
              (industry) => (
                <span
                  key={industry}
                  className="hidden font-mono text-[10px] uppercase tracking-wider text-signal-white/60 sm:block"
                >
                  {industry}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown
          size={24}
          className="animate-bounce-gentle text-synapse-gold/60"
        />
      </motion.div>
    </section>
  );
}
