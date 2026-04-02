"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Globe, MessageCircle, Code2, Mail } from "lucide-react";

const serviceLinks = [
  { label: "Data", href: "#services" },
  { label: "Analytics", href: "#services" },
  { label: "Consultancy", href: "#services" },
  { label: "AI", href: "#services" },
  { label: "Automation", href: "#services" },
];

const companyLinks = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const socialLinks = [
  { icon: Globe, href: "#", label: "LinkedIn" },
  { icon: MessageCircle, href: "#", label: "Twitter" },
  { icon: Code2, href: "#", label: "GitHub" },
  { icon: Mail, href: "mailto:hello@thalamuxtech.com", label: "Email" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    console.log("Newsletter signup:", email);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative bg-surface-deepest pt-16 sm:pt-20">
      {/* Top border */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-synapse-gold/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Col 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
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

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-signal-white/45">
              Data for insights, Intelligence for your Boldest moves. One
              gateway. Total intelligence.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-pulse-blue/10 text-signal-white/40 transition-all hover:border-pulse-blue/30 hover:text-circuit-teal"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-synapse-gold/70">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-signal-white/50 transition-colors hover:text-signal-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-synapse-gold/70">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-signal-white/50 transition-colors hover:text-signal-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-synapse-gold/70">
              Stay Connected
            </h4>
            <p className="mt-4 text-sm text-signal-white/45">
              Subscribe for intelligence dispatches.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-4 flex gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 rounded-lg border border-pulse-blue/15 bg-surface-deep px-3 py-2.5 text-xs text-signal-white placeholder:text-signal-white/30 focus:border-pulse-blue focus:outline-none focus:ring-1 focus:ring-pulse-blue/20"
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center rounded-lg bg-pulse-blue px-3 py-2.5 text-white transition-all hover:bg-[#1a6aee]"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>

            {subscribed && (
              <p className="mt-2 text-xs text-circuit-teal">
                Subscribed successfully!
              </p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-pulse-blue/10 py-6 sm:flex-row">
          <p className="text-xs text-signal-white/30">
            &copy; {new Date().getFullYear()} Thalamux Tech. All rights
            reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-signal-white/20">
            Data to Insight. Intelligence to Action.
          </p>
        </div>
      </div>
    </footer>
  );
}
