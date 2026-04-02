"use client";

import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      className={`mb-16 md:mb-20 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-circuit-teal">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-clash text-3xl font-bold leading-tight tracking-tight text-signal-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-base text-signal-white/60 sm:text-lg">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
