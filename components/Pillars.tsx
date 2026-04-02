"use client";

import { motion } from "framer-motion";
import {
  Database,
  BarChart3,
  Users,
  Brain,
  Cog,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { staggerContainer, fadeUp } from "@/lib/motion";

const pillars = [
  {
    num: "01",
    name: "DATA",
    label: "The Raw Signal",
    description:
      "We capture, cleanse, structure, and govern your data with military-grade discipline — ensuring your foundation is unshakable.",
    icon: Database,
    gradient: "from-pulse-blue/20 via-pulse-blue/5 to-transparent",
    iconBg: "bg-pulse-blue/10 text-pulse-blue group-hover:bg-pulse-blue/20",
    accentLine: "bg-pulse-blue",
    hoverGlow: "group-hover:shadow-[0_8px_40px_rgba(46,125,255,0.12)]",
  },
  {
    num: "02",
    name: "ANALYTICS",
    label: "The Filtered Intelligence",
    description:
      "We transform raw data into visual, predictive, and prescriptive intelligence. Decision-makers see exactly what they need.",
    icon: BarChart3,
    gradient: "from-circuit-teal/20 via-circuit-teal/5 to-transparent",
    iconBg: "bg-circuit-teal/10 text-circuit-teal group-hover:bg-circuit-teal/20",
    accentLine: "bg-circuit-teal",
    hoverGlow: "group-hover:shadow-[0_8px_40px_rgba(0,180,166,0.12)]",
  },
  {
    num: "03",
    name: "CONSULTANCY",
    label: "The Strategic Routing",
    description:
      "We don't just advise — we architect transformation. Our consultants embed, diagnose, and design actionable roadmaps.",
    icon: Users,
    gradient: "from-synapse-gold/20 via-synapse-gold/5 to-transparent",
    iconBg: "bg-synapse-gold/10 text-synapse-gold group-hover:bg-synapse-gold/20",
    accentLine: "bg-synapse-gold",
    hoverGlow: "group-hover:shadow-[0_8px_40px_rgba(212,168,67,0.12)]",
  },
  {
    num: "04",
    name: "AI",
    label: "The Thinking Layer",
    description:
      "We build AI that reasons, learns, and acts — from ML models and NLP to computer vision and generative AI.",
    icon: Brain,
    gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
    iconBg: "bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20",
    accentLine: "bg-violet-500",
    hoverGlow: "group-hover:shadow-[0_8px_40px_rgba(139,92,246,0.12)]",
  },
  {
    num: "05",
    name: "AUTOMATION",
    label: "The Relentless Executor",
    description:
      "We eliminate repetition, accelerate workflows, and build systems that work while you sleep.",
    icon: Cog,
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    iconBg: "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20",
    accentLine: "bg-emerald-500",
    hoverGlow: "group-hover:shadow-[0_8px_40px_rgba(16,185,129,0.12)]",
  },
];

export default function Pillars() {
  return (
    <section
      id="services"
      className="relative bg-gradient-to-b from-surface-deepest to-surface-mid py-24 sm:py-32 lg:py-40"
    >
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-pulse-blue/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Five Pillars of Precision"
          subtitle="Every domain engineered to intercept complexity and deliver clarity."
        />

        {/* Desktop: 5 columns, Tablet: 3+2, Mobile: stack */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.08, 0.15)}
          className="grid gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-5"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.name}
              variants={fadeUp}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-signal-white/[0.06] bg-surface-raised/50 backdrop-blur-sm transition-all duration-500 ${pillar.hoverGlow} hover:border-signal-white/[0.12]`}
            >
              {/* Top accent gradient */}
              <div
                className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${pillar.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              {/* Top accent line */}
              <div
                className={`absolute inset-x-0 top-0 h-[2px] ${pillar.accentLine} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <div className="relative p-6">
                {/* Header row: number + icon */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[40px] font-bold leading-none text-signal-white/[0.04] transition-colors duration-500 group-hover:text-signal-white/[0.08]">
                    {pillar.num}
                  </span>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${pillar.iconBg}`}
                  >
                    <pillar.icon size={20} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Name */}
                <h3 className="mt-4 font-clash text-lg font-bold tracking-wide text-signal-white">
                  {pillar.name}
                </h3>

                {/* Signal label */}
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-synapse-gold/70">
                  {pillar.label}
                </p>

                {/* Description */}
                <p className="mt-3 text-[13px] leading-relaxed text-signal-white/45 transition-colors duration-300 group-hover:text-signal-white/60">
                  {pillar.description}
                </p>

                {/* Explore link */}
                <div className="mt-5 flex items-center gap-1.5 text-[13px] font-medium text-signal-white/30 transition-all duration-300 group-hover:gap-2.5 group-hover:text-signal-white/70">
                  Explore
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
