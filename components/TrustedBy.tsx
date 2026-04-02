"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { ExternalLink } from "lucide-react";

const clients = [
  {
    name: "EduVate Kids Store",
    url: "https://eduvatekids-store.web.app/",
    initials: "EK",
    color: "from-blue-500 to-cyan-400",
  },
  {
    name: "AfriBioBank",
    url: "https://afribiobank.web.app/",
    initials: "AB",
    color: "from-emerald-500 to-teal-400",
  },
  {
    name: "NovaTrust Capital",
    url: "#",
    initials: "NC",
    color: "from-purple-500 to-pink-400",
  },
  {
    name: "ZenithPay Africa",
    url: "#",
    initials: "ZP",
    color: "from-orange-500 to-amber-400",
  },
  {
    name: "MedConnect Global",
    url: "#",
    initials: "MG",
    color: "from-rose-500 to-red-400",
  },
  {
    name: "AgriData Systems",
    url: "#",
    initials: "AS",
    color: "from-lime-500 to-green-400",
  },
];

export default function TrustedBy() {
  return (
    <section className="relative overflow-hidden bg-surface-deepest py-20 sm:py-28">
      {/* Top border accent */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-synapse-gold/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal className="text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-synapse-gold/70">
            Trusted by forward-thinking organizations
          </span>
          <h2 className="mt-4 font-clash text-2xl font-bold text-signal-white sm:text-3xl">
            Our Happy Customers
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-signal-white/50">
            Organizations across industries trust Thalamux Tech to decode
            complexity and deliver excellence.
          </p>
        </ScrollReveal>

        {/* Logo / client grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {clients.map((client) => (
            <motion.a
              key={client.name}
              href={client.url}
              target={client.url !== "#" ? "_blank" : undefined}
              rel={client.url !== "#" ? "noopener noreferrer" : undefined}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="group glass-card flex flex-col items-center gap-3 rounded-xl px-4 py-6 transition-all duration-300 hover:border-signal-white/20"
            >
              {/* Logo placeholder — will be replaced with actual logos */}
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${client.color} p-0.5`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-surface-deepest">
                  <span className="text-sm font-bold text-signal-white/80">
                    {client.initials}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <span className="block text-xs font-medium text-signal-white/70 group-hover:text-signal-white">
                  {client.name}
                </span>
                {client.url !== "#" && (
                  <ExternalLink
                    size={10}
                    className="mx-auto mt-1 text-signal-white/30 group-hover:text-circuit-teal"
                  />
                )}
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* "And many more" */}
        <ScrollReveal className="mt-10 text-center" delay={0.3}>
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-signal-white/20" />
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-signal-white/40">
              And many more across 10+ industries
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-signal-white/20" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
