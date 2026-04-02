"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

function CountUp({ value, suffix = "", prefix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [isInView, value, suffix, prefix]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}0{suffix}
    </span>
  );
}

const metrics = [
  {
    value: 500,
    suffix: "+",
    label: "Data & AI Projects",
    sub: "Delivered successfully",
  },
  {
    value: 99,
    suffix: "%",
    label: "Client Satisfaction",
    sub: "Across all engagements",
  },
  {
    value: 5,
    suffix: "",
    label: "Service Domains",
    sub: "End-to-end coverage",
  },
  {
    value: 10,
    suffix: "+",
    label: "Industries Served",
    sub: "Global reach",
  },
];

export default function TrustMetrics() {
  return (
    <section className="relative bg-surface-deep py-20 sm:py-28">
      {/* Border accents */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-pulse-blue/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pulse-blue/15 to-transparent" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-pulse-blue/10">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center lg:px-8">
                <div className="font-clash text-3xl font-bold text-signal-white sm:text-4xl lg:text-5xl">
                  <CountUp value={metric.value} suffix={metric.suffix} />
                </div>
                <p className="mt-2 text-sm font-medium text-signal-white/80">
                  {metric.label}
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-signal-white/35">
                  {metric.sub}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
