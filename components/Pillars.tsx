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
    label: '"The Raw Signal"',
    description:
      "We capture, cleanse, structure, and govern your data with military-grade discipline — ensuring your foundation is unshakable.",
    icon: Database,
    accent: "from-pulse-blue to-blue-400",
    borderHover: "hover:border-pulse-blue/50 hover:shadow-[0_0_30px_rgba(46,125,255,0.15)]",
  },
  {
    num: "02",
    name: "ANALYTICS",
    label: '"The Filtered Intelligence"',
    description:
      "We transform raw data into visual, predictive, and prescriptive intelligence. Decision-makers see exactly what they need.",
    icon: BarChart3,
    accent: "from-circuit-teal to-teal-300",
    borderHover: "hover:border-circuit-teal/50 hover:shadow-[0_0_30px_rgba(0,180,166,0.15)]",
  },
  {
    num: "03",
    name: "CONSULTANCY",
    label: '"The Strategic Routing"',
    description:
      "We don't just advise — we architect transformation. Our consultants embed, diagnose, and design actionable roadmaps.",
    icon: Users,
    accent: "from-synapse-gold to-yellow-300",
    borderHover: "hover:border-synapse-gold/50 hover:shadow-[0_0_30px_rgba(212,168,67,0.15)]",
  },
  {
    num: "04",
    name: "AI",
    label: '"The Thinking Layer"',
    description:
      "We build AI that reasons, learns, and acts — from ML models and NLP to computer vision and generative AI.",
    icon: Brain,
    accent: "from-blue-400 to-purple-400",
    borderHover: "hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]",
  },
  {
    num: "05",
    name: "AUTOMATION",
    label: '"The Relentless Executor"',
    description:
      "We eliminate repetition, accelerate workflows, and build systems that work while you sleep. Intelligent. Relentless.",
    icon: Cog,
    accent: "from-circuit-teal to-data-graphite",
    borderHover: "hover:border-circuit-teal/50 hover:shadow-[0_0_30px_rgba(0,180,166,0.12)]",
  },
];

export default function Pillars() {
  return (
    <section
      id="services"
      className="relative bg-gradient-to-b from-surface-deepest to-surface-mid py-24 sm:py-32 lg:py-40"
    >
      {/* Subtle glow */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-pulse-blue/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Five Pillars of Precision"
          subtitle="Every domain engineered to intercept complexity and deliver clarity."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.1, 0.2)}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.name}
              variants={fadeUp}
              className={`group glass-card relative cursor-pointer rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 ${pillar.borderHover}`}
            >
              {/* Pillar number */}
              <span className="font-mono text-[10px] tracking-[0.3em] text-circuit-teal/60">
                {pillar.num}
              </span>

              {/* Icon */}
              <div
                className={`mt-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${pillar.accent} bg-opacity-10 p-0.5`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-surface-raised">
                  <pillar.icon
                    size={22}
                    className="text-signal-white/80 transition-colors group-hover:text-signal-white"
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="mt-5 font-clash text-xl font-bold text-signal-white">
                {pillar.name}
              </h3>

              {/* Signal label */}
              <p className="mt-1 font-mono text-[11px] italic text-synapse-gold/80">
                {pillar.label}
              </p>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-signal-white/50">
                {pillar.description}
              </p>

              {/* Explore link */}
              <div className="mt-5 flex items-center gap-1.5 text-sm text-circuit-teal/70 transition-all group-hover:gap-2.5 group-hover:text-circuit-teal">
                Explore
                <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
