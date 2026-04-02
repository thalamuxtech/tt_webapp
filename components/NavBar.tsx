"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-pulse-blue/10 bg-surface-deepest/85 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-pulse-blue to-circuit-teal opacity-20" />
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="relative z-10"
              >
                <circle cx="12" cy="12" r="4" fill="#2E7DFF" />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  fill="none"
                  stroke="#2E7DFF"
                  strokeWidth="0.5"
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    values="4;8;4"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;0;0.5"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <line x1="12" y1="2" x2="12" y2="6" stroke="#2E7DFF" strokeWidth="1.5" opacity="0.6" />
                <line x1="12" y1="18" x2="12" y2="22" stroke="#2E7DFF" strokeWidth="1.5" opacity="0.6" />
                <line x1="2" y1="12" x2="6" y2="12" stroke="#2E7DFF" strokeWidth="1.5" opacity="0.6" />
                <line x1="18" y1="12" x2="22" y2="12" stroke="#2E7DFF" strokeWidth="1.5" opacity="0.6" />
                <line x1="4.9" y1="4.9" x2="7.8" y2="7.8" stroke="#00B4A6" strokeWidth="1" opacity="0.4" />
                <line x1="16.2" y1="16.2" x2="19.1" y2="19.1" stroke="#00B4A6" strokeWidth="1" opacity="0.4" />
                <line x1="4.9" y1="19.1" x2="7.8" y2="16.2" stroke="#00B4A6" strokeWidth="1" opacity="0.4" />
                <line x1="16.2" y1="7.8" x2="19.1" y2="4.9" stroke="#00B4A6" strokeWidth="1" opacity="0.4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-clash text-lg font-bold leading-none tracking-tight text-signal-white">
                THALAMUX
              </span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-pulse-blue/80">
                TECH
              </span>
            </div>
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link, i) => (
              <span key={link.label} className="flex items-center">
                <a
                  href={link.href}
                  className="px-3 py-2 font-mono text-xs uppercase tracking-wider text-signal-white/70 transition-colors hover:text-signal-white"
                >
                  {link.label}
                </a>
                {i < navLinks.length - 1 && (
                  <span className="text-synapse-gold/30">|</span>
                )}
              </span>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden rounded-md border border-synapse-gold/60 px-5 py-2 font-mono text-xs uppercase tracking-wider text-synapse-gold transition-all hover:border-synapse-gold hover:bg-synapse-gold/10 hover:shadow-[0_0_20px_rgba(212,168,67,0.15)] sm:block"
            >
              Contact Us
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-signal-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={24} />
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
            className="fixed inset-0 z-[60] bg-surface-deepest/97 backdrop-blur-2xl"
          >
            <div className="flex h-full flex-col px-8 py-6">
              {/* Close button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-signal-white"
                  aria-label="Close menu"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Mobile links */}
              <div className="flex flex-1 flex-col items-center justify-center gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + 0.1 }}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-4 text-2xl font-clash font-bold text-signal-white"
                  >
                    <link.icon size={24} className="text-pulse-blue" />
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 rounded-md border border-synapse-gold px-8 py-3 font-mono text-sm uppercase tracking-wider text-synapse-gold"
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
