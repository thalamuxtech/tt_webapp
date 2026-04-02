"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { Signal, Target, Cpu, Zap, Network } from "lucide-react";

const values = [
  {
    icon: Signal,
    title: "Signal Over Noise",
    description:
      "We reject clutter. Every solution we build is designed to eliminate distraction and amplify what truly matters.",
  },
  {
    icon: Target,
    title: "Precision Without Compromise",
    description:
      "Good enough is not in our vocabulary. We engineer every outcome with surgical accuracy.",
  },
  {
    icon: Cpu,
    title: "Intelligence By Design",
    description:
      "We don't bolt AI onto broken systems. We architect intelligence from the ground up.",
  },
  {
    icon: Zap,
    title: "Relentless Delivery",
    description:
      "Ideas without execution are noise. We deliver measurable outcomes on time, on target, beyond expectation.",
  },
  {
    icon: Network,
    title: "Gateway Mindset",
    description:
      "We connect data to decisions, strategy to systems, and people to possibilities. Everything flows through purpose.",
  },
];

export default function CoreValues() {
  return (
    <section className="relative bg-surface-mid py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Who We Are"
          title="Built on Five Unbreakable Principles"
          subtitle="The non-negotiable foundations that drive every decision we make."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.08, 0.1)}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              variants={fadeUp}
              className={`glass-card group relative rounded-xl p-7 transition-all duration-300 hover:border-synapse-gold/30 hover:shadow-[0_0_30px_rgba(212,168,67,0.1)] ${
                i >= 3 ? "sm:col-span-1 lg:col-span-1 lg:last:col-start-2 xl:last:col-start-auto" : ""
              }`}
            >
              {/* Icon */}
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-synapse-gold/20 bg-synapse-gold/5 transition-colors group-hover:border-synapse-gold/40 group-hover:bg-synapse-gold/10">
                <value.icon size={20} className="text-synapse-gold" />
              </div>

              <h3 className="font-clash text-lg font-bold text-signal-white">
                {value.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-signal-white/50">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
