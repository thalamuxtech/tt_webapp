"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const clients = [
  {
    name: "EduVate Kids Store",
    logo: "/images/eduvatekids.png",
    url: "https://eduvatekids-store.web.app/",
    type: "image" as const,
  },
  {
    name: "AfriBioBank",
    logo: "/images/afribiobank.svg",
    url: "https://afribiobank.web.app/",
    type: "image" as const,
  },
  {
    name: "Scholarly Echo",
    logo: "/images/scholarlyecho.png",
    url: "https://scholarly-echo.web.app",
    type: "image" as const,
  },
  {
    name: "Apex-Line Studios",
    logo: "/images/apexline.png",
    url: "https://apexline-studios.web.app",
    type: "image" as const,
  },
  {
    name: "NAU Maternity Centre",
    logo: "/images/nau-maternity.png",
    url: "https://nau-maternity-center.web.app/",
    type: "image" as const,
  },
  {
    name: "NovaTrust Capital",
    logo: null,
    url: "#",
    initials: "NC",
    type: "text" as const,
  },
  {
    name: "ZenithPay Africa",
    logo: null,
    url: "#",
    initials: "ZP",
    type: "text" as const,
  },
  {
    name: "MedConnect Global",
    logo: null,
    url: "#",
    initials: "MG",
    type: "text" as const,
  },
  {
    name: "AgriData Systems",
    logo: null,
    url: "#",
    initials: "AS",
    type: "text" as const,
  },
];

// Double the array for seamless infinite scroll
const marqueeClients = [...clients, ...clients];

function ClientCard({
  client,
}: {
  client: (typeof clients)[0];
}) {
  return (
    <a
      href={client.url}
      target={client.url !== "#" ? "_blank" : undefined}
      rel={client.url !== "#" ? "noopener noreferrer" : undefined}
      className="group flex shrink-0 items-center gap-4 rounded-2xl border border-signal-white/[0.06] bg-surface-raised/30 px-6 py-4 transition-all duration-300 hover:border-signal-white/[0.12] hover:bg-surface-raised/60"
    >
      {/* Logo / initials */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-signal-white/[0.06]">
        {client.type === "image" && client.logo ? (
          <Image
            src={client.logo}
            alt={client.name}
            width={28}
            height={28}
            className="object-contain"
          />
        ) : (
          <span className="text-xs font-bold text-signal-white/50">
            {client.initials}
          </span>
        )}
      </div>
      <span className="whitespace-nowrap text-sm font-medium text-signal-white/50 transition-colors group-hover:text-signal-white/80">
        {client.name}
      </span>
    </a>
  );
}

export default function TrustedBy() {
  return (
    <section className="relative overflow-hidden bg-surface-deepest py-20 sm:py-28">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-synapse-gold/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal className="mb-12 text-center">
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
      </div>

      {/* Auto-scrolling marquee */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface-deepest to-transparent min-[480px]:w-24 sm:w-40" />
        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface-deepest to-transparent min-[480px]:w-24 sm:w-40" />

        {/* Marquee row 1 — left to right */}
        <div className="mb-4 flex animate-marquee gap-4">
          {marqueeClients.map((client, i) => (
            <ClientCard key={`row1-${i}`} client={client} />
          ))}
        </div>

        {/* Marquee row 2 — right to left */}
        <div className="flex animate-marquee-reverse gap-4">
          {[...marqueeClients].reverse().map((client, i) => (
            <ClientCard key={`row2-${i}`} client={client} />
          ))}
        </div>
      </div>

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
    </section>
  );
}
