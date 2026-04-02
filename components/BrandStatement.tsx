"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { slideFromLeft, slideFromRight } from "@/lib/motion";
import { ArrowRight } from "lucide-react";

export default function BrandStatement() {
  return (
    <section className="relative overflow-hidden bg-surface-deep py-24 sm:py-32 lg:py-40">
      {/* Subtle gradient accent */}
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-pulse-blue/3 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Visual */}
          <ScrollReveal variants={slideFromLeft}>
            <div className="relative flex items-center justify-center">
              {/* Thalamus node SVG */}
              <div className="relative h-[260px] w-[260px] min-[400px]:h-[300px] min-[400px]:w-[300px] sm:h-[400px] sm:w-[400px]">
                <svg
                  viewBox="0 0 400 400"
                  fill="none"
                  className="h-full w-full"
                >
                  {/* Outer signal ring */}
                  <motion.circle
                    cx="200"
                    cy="200"
                    r="170"
                    stroke="#2E7DFF"
                    strokeWidth="0.5"
                    strokeDasharray="8 8"
                    opacity="0.2"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 60,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: "200px 200px" }}
                  />

                  {/* Mid signal ring */}
                  <motion.circle
                    cx="200"
                    cy="200"
                    r="120"
                    stroke="#00B4A6"
                    strokeWidth="0.5"
                    strokeDasharray="4 12"
                    opacity="0.15"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 40,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: "200px 200px" }}
                  />

                  {/* Signal pathways */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const innerR = 50;
                    const outerR = 160;
                    const x1 = 200 + innerR * Math.cos(rad);
                    const y1 = 200 + innerR * Math.sin(rad);
                    const x2 = 200 + outerR * Math.cos(rad);
                    const y2 = 200 + outerR * Math.sin(rad);
                    return (
                      <motion.line
                        key={angle}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={i % 2 === 0 ? "#2E7DFF" : "#D4A843"}
                        strokeWidth="1"
                        opacity="0.25"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.25 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.1 }}
                      />
                    );
                  })}

                  {/* Outer signal nodes */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const r = 155;
                    const cx = 200 + r * Math.cos(rad);
                    const cy = 200 + r * Math.sin(rad);
                    return (
                      <motion.circle
                        key={angle}
                        cx={cx}
                        cy={cy}
                        r="4"
                        fill={i % 2 === 0 ? "#2E7DFF" : "#00B4A6"}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 0.7 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                      />
                    );
                  })}

                  {/* Central thalamus node */}
                  <circle cx="200" cy="200" r="35" fill="#0F2847" />
                  <circle
                    cx="200"
                    cy="200"
                    r="35"
                    stroke="#2E7DFF"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                  <motion.circle
                    cx="200"
                    cy="200"
                    r="20"
                    fill="#2E7DFF"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.5, 0.8] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <circle cx="200" cy="200" r="6" fill="#FAFAFA" />
                </svg>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Copy */}
          <ScrollReveal variants={slideFromRight}>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-synapse-gold">
              Data to Insight. Intelligence to Action.
            </span>

            <h2 className="mt-5 font-clash text-3xl font-bold leading-snug text-signal-white sm:text-4xl lg:text-[2.75rem]">
              Like the thalamus commands every signal in the brain, we command
              every signal in your business.
            </h2>

            <p className="mt-6 text-base leading-relaxed text-signal-white/60 sm:text-lg">
              In the human brain, the thalamus is the master relay station.
              Every signal — sight, sound, touch — routes through it before
              reaching consciousness. It decides what matters. It filters noise.
              It commands purpose.
            </p>
            <p className="mt-4 text-base leading-relaxed text-signal-white/60 sm:text-lg">
              That is exactly what Thalamux Tech does for your business.
            </p>

            {/* Pull quote */}
            <blockquote className="gold-border-left mt-8">
              <p className="text-lg italic leading-relaxed text-synapse-gold/90 sm:text-xl">
                &ldquo;We don&apos;t just process your challenges. We decode
                them, dominate them, and deliver outcomes that redefine what your
                operation is capable of.&rdquo;
              </p>
            </blockquote>

            <a
              href="#about"
              className="group mt-8 inline-flex items-center gap-2 font-medium text-synapse-gold transition-all hover:gap-3"
            >
              Discover Our Story
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
