"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Menu,
  X,
  Database,
  BarChart3,
  Users,
  Brain,
  Cog,
} from "lucide-react";

const navLinks = [
  { label: "Data", href: "#services", icon: Database },
  { label: "Analytics", href: "#services", icon: BarChart3 },
  { label: "Consultancy", href: "#services", icon: Users },
  { label: "AI", href: "#services", icon: Brain },
  { label: "Automation", href: "#services", icon: Cog },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed left-0 right-0 top-0 z-50"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo — separate element, left side */}
          <a
            href="#"
            className="group flex shrink-0 items-center gap-3 transition-all duration-500"
          >
            {/* Logo image with smooth size transition */}
            <motion.div
              animate={{
                width: scrolled ? 36 : 44,
                height: scrolled ? 36 : 44,
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative overflow-hidden rounded-xl"
            >
              <Image
                src="/images/logo.png"
                alt="Thalamux Tech"
                fill
                className="object-contain drop-shadow-[0_0_8px_rgba(46,125,255,0.3)]"
                priority
              />
            </motion.div>

            {/* Brand name — script font */}
            <motion.div
              animate={{
                opacity: scrolled ? 0 : 1,
                width: scrolled ? 0 : "auto",
                marginRight: scrolled ? 0 : 0,
              }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="font-brand-script text-2xl tracking-wide text-signal-white">
                Thalamux{" "}
                <span className="text-pulse-blue">Tech</span>
              </span>
            </motion.div>
          </a>

          {/* Desktop menu bar — rounded rectangle, separate from logo */}
          <div
            className={`hidden flex-1 items-center justify-between rounded-2xl border px-2 py-1.5 transition-all duration-500 lg:flex ${
              scrolled
                ? "border-pulse-blue/15 bg-surface-deepest/80 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
                : "border-signal-white/[0.06] bg-signal-white/[0.03] backdrop-blur-md"
            }`}
          >
            {/* Nav links */}
            <div className="flex items-center gap-0.5 px-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group relative rounded-xl px-4 py-2 font-mono text-xs uppercase tracking-wider text-signal-white/60 transition-all duration-300 hover:bg-signal-white/[0.06] hover:text-signal-white"
                >
                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="rounded-xl border border-synapse-gold/50 bg-synapse-gold/[0.06] px-5 py-2 font-mono text-[11px] uppercase tracking-wider text-synapse-gold transition-all duration-300 hover:border-synapse-gold hover:bg-synapse-gold/15 hover:shadow-[0_0_20px_rgba(212,168,67,0.12)]"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile: hamburger button with pill background */}
          <div
            className={`ml-auto flex items-center gap-3 rounded-2xl border px-3 py-2 transition-all duration-500 lg:hidden ${
              scrolled
                ? "border-pulse-blue/15 bg-surface-deepest/80 backdrop-blur-2xl"
                : "border-signal-white/[0.06] bg-signal-white/[0.03] backdrop-blur-md"
            }`}
          >
            <a
              href="#contact"
              className="hidden rounded-lg border border-synapse-gold/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-synapse-gold transition-all hover:bg-synapse-gold/10 sm:block"
            >
              Contact
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-1.5 text-signal-white/70 transition-all hover:bg-signal-white/[0.06] hover:text-signal-white"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-surface-deepest/97 backdrop-blur-2xl"
          >
            <div className="flex h-full flex-col px-6 py-5">
              {/* Top bar: logo + close */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                    <Image
                      src="/images/logo.png"
                      alt="Thalamux Tech"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-brand-script text-xl text-signal-white">
                    Thalamux <span className="text-pulse-blue">Tech</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl p-2 text-signal-white/70 transition-colors hover:bg-signal-white/[0.06] hover:text-signal-white"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile links */}
              <div className="flex flex-1 flex-col items-center justify-center gap-3">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.06 + 0.1,
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full max-w-xs items-center gap-4 rounded-2xl px-6 py-4 text-lg font-clash font-bold text-signal-white transition-all hover:bg-signal-white/[0.04]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pulse-blue/10">
                      <link.icon size={20} className="text-pulse-blue" />
                    </div>
                    {link.label}
                  </motion.a>
                ))}

                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  onClick={() => setMobileOpen(false)}
                  className="mt-6 w-full max-w-xs rounded-2xl border border-synapse-gold/60 py-4 text-center font-mono text-sm uppercase tracking-wider text-synapse-gold transition-all hover:bg-synapse-gold/10"
                >
                  Contact Us
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
