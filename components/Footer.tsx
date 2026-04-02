"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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

// Social icons as inline SVGs
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const socialLinks = [
  { icon: LinkedInIcon, href: "#", label: "LinkedIn", hoverColor: "hover:bg-[#0A66C2]/15 hover:text-[#0A66C2] hover:border-[#0A66C2]/30" },
  { icon: XIcon, href: "#", label: "X (Twitter)", hoverColor: "hover:bg-signal-white/10 hover:text-signal-white hover:border-signal-white/20" },
  { icon: GitHubIcon, href: "#", label: "GitHub", hoverColor: "hover:bg-signal-white/10 hover:text-signal-white hover:border-signal-white/20" },
  { icon: InstagramIcon, href: "#", label: "Instagram", hoverColor: "hover:bg-[#E4405F]/15 hover:text-[#E4405F] hover:border-[#E4405F]/30" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await addDoc(collection(db, "signups"), {
        email,
        source: "footer_newsletter",
        createdAt: serverTimestamp(),
      });
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <footer className="relative bg-surface-deepest pt-16 sm:pt-20">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-synapse-gold/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Col 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
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
              Data for insights, Intelligence for your Boldest moves.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border border-signal-white/[0.08] text-signal-white/35 transition-all duration-300 ${social.hoverColor}`}
                >
                  <social.icon />
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
