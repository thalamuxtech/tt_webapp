"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { Radar, Filter, Route, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Intercept",
    description:
      "We embed, listen, and diagnose your operation with precision. Every friction point identified. Every signal captured.",
    icon: Radar,
    color: "text-pulse-blue",
    bg: "bg-pulse-blue/10 group-hover:bg-pulse-blue/15",
    line: "from-pulse-blue",
  },
  {
    num: "02",
    title: "Filter",
    description:
      "We strip away noise to expose what truly drives or disrupts value. Clarity from chaos — pure signal remains.",
    icon: Filter,
    color: "text-circuit-teal",
    bg: "bg-circuit-teal/10 group-hover:bg-circuit-teal/15",
    line: "from-circuit-teal",
  },
  {
    num: "03",
    title: "Route",
    description:
      "We architect and deploy precision solutions with surgical accuracy. Every component placed with purpose.",
    icon: Route,
    color: "text-synapse-gold",
    bg: "bg-synapse-gold/10 group-hover:bg-synapse-gold/15",
    line: "from-synapse-gold",
  },
  {
    num: "04",
    title: "Deliver",
    description:
      "We execute without compromise. Measurable outcomes delivered on time, on target, and beyond expectation.",
    icon: Rocket,
    color: "text-violet-400",
    bg: "bg-violet-500/10 group-hover:bg-violet-500/15",
    line: "from-violet-500",
  },
];

export default function HowWeWork() {
  return (
    <section className="relative overflow-hidden bg-surface-deep py-24 sm:py-32 lg:py-40">
      {/* Background accent */}
      <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-pulse-blue/[0.02] blur-[120px]" />
      <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-synapse-gold/[0.02] blur-[100px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How We Work"
          title="Signal to Solution"
          subtitle="Four stages. Zero compromise. Every engagement follows our precision framework."
        />

        {/* Horizontal cards layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.12, 0.1)}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              className="group relative"
            >
              {/* Connecting line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-14 z-10 hidden w-6 lg:block">
                  <div className={`h-[2px] w-full bg-gradient-to-r ${step.line} to-transparent opacity-20`} />
                  <div className="absolute -right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-signal-white/20" />
                </div>
              )}

              <div className="relative h-full overflow-hidden rounded-2xl border border-signal-white/[0.06] bg-surface-raised/40 p-6 transition-all duration-500 hover:border-signal-white/[0.1] hover:bg-surface-raised/70">
                {/* Step number — large background */}
                <span className="absolute -right-2 -top-4 font-clash text-[100px] font-bold leading-none text-signal-white/[0.025]">
                  {step.num}
                </span>

                {/* Icon */}
                <div
                  className={`relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${step.bg}`}
                >
                  <step.icon size={22} className={step.color} strokeWidth={1.8} />
                </div>

                {/* Step label */}
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal-white/30">
                    Step {step.num}
                  </span>
                  <div className="h-px flex-1 bg-signal-white/[0.06]" />
                </div>

                {/* Title */}
                <h3 className="mb-3 font-clash text-xl font-bold text-signal-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] leading-relaxed text-signal-white/45">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
