"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import { Radar, Filter, Route, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "INTERCEPT",
    description:
      "We embed, listen, and diagnose your operation with precision. Every friction point. Every signal. Captured.",
    icon: Radar,
    bgNum: "01",
  },
  {
    num: "02",
    title: "FILTER",
    description:
      "We strip away noise to expose what truly drives or disrupts value. Clarity from chaos.",
    icon: Filter,
    bgNum: "02",
  },
  {
    num: "03",
    title: "ROUTE",
    description:
      "We architect and deploy precision solutions with surgical accuracy. Every component placed with purpose.",
    icon: Route,
    bgNum: "03",
  },
  {
    num: "04",
    title: "DELIVER",
    description:
      "We execute without compromise. Measurable outcomes. On time. On target. Beyond expectation.",
    icon: Rocket,
    bgNum: "04",
  },
];

export default function HowWeWork() {
  return (
    <section className="relative overflow-hidden bg-surface-deep py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How We Work"
          title="Signal to Solution"
          subtitle="Four stages. Zero compromise. Every engagement follows our precision framework."
        />

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-pulse-blue/30 via-synapse-gold/30 to-circuit-teal/30 lg:left-1/2 lg:block" />

          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1}>
                <div
                  className={`relative flex flex-col gap-8 lg:flex-row lg:items-center ${
                    i % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      i % 2 === 1 ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    <div className="relative">
                      {/* Background number */}
                      <span className="pointer-events-none absolute -top-8 font-clash text-[120px] font-bold leading-none text-synapse-gold/[0.04] sm:text-[160px]">
                        {step.bgNum}
                      </span>

                      <div className="relative">
                        <div
                          className={`mb-4 inline-flex items-center gap-3 ${
                            i % 2 === 1 ? "lg:flex-row-reverse" : ""
                          }`}
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-pulse-blue/30 bg-surface-raised">
                            <step.icon size={20} className="text-pulse-blue" />
                          </div>
                          <span className="font-mono text-xs tracking-[0.2em] text-circuit-teal">
                            STEP {step.num}
                          </span>
                        </div>

                        <h3 className="font-clash text-2xl font-bold text-signal-white sm:text-3xl">
                          {step.title}
                        </h3>
                        <p className="mt-3 max-w-md text-base leading-relaxed text-signal-white/55">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center dot (desktop) */}
                  <div className="relative z-10 hidden lg:flex lg:items-center lg:justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-synapse-gold bg-surface-deep"
                    >
                      <div className="h-2 w-2 rounded-full bg-synapse-gold" />
                    </motion.div>
                  </div>

                  {/* Empty space for alternating */}
                  <div className="hidden flex-1 lg:block" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
