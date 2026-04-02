"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
}: ScrollRevealProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...(typeof variants.visible === "object" ? variants.visible : {}),
          transition: {
            ...((typeof variants.visible === "object" && variants.visible !== null && "transition" in variants.visible
              ? (variants.visible as Record<string, unknown>).transition
              : {}) as object),
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
