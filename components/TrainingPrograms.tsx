"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Crown,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { staggerContainer, fadeUp } from "@/lib/motion";
import ScrollReveal from "./ScrollReveal";

const programs = [
  {
    name: "AI & Tech Training",
    tagline: "For Learners & Career Switchers",
    description:
      "Hands-on, project-based training in modern AI, data, and software engineering — from fundamentals to advanced model deployment. Built for individuals ready to break into or rise within tech.",
    icon: GraduationCap,
    accent: "pulse-blue",
    iconBg: "bg-pulse-blue/10 text-pulse-blue group-hover:bg-pulse-blue/20",
    accentLine: "bg-pulse-blue",
    hoverGlow: "group-hover:shadow-[0_8px_40px_rgba(46,125,255,0.15)]",
    bullets: [
      "Python, ML, LLMs & Generative AI",
      "Real client projects & portfolios",
      "Mentorship from industry engineers",
    ],
  },
  {
    name: "Staff AI Productivity",
    tagline: "For Teams & Departments",
    description:
      "Equip your entire workforce with practical AI skills — prompt engineering, AI copilots, and workflow automation that compress hours of work into minutes, every single day.",
    icon: Zap,
    accent: "circuit-teal",
    iconBg: "bg-circuit-teal/10 text-circuit-teal group-hover:bg-circuit-teal/20",
    accentLine: "bg-circuit-teal",
    hoverGlow: "group-hover:shadow-[0_8px_40px_rgba(0,180,166,0.15)]",
    bullets: [
      "ChatGPT, Claude, Copilot mastery",
      "Department-specific AI playbooks",
      "Measurable productivity uplift",
    ],
  },
  {
    name: "Corporate & Executive",
    tagline: "For Leaders & Decision-Makers",
    description:
      "Strategic AI literacy for boards, C-suites, and senior leadership. We translate the AI landscape into clear capability decisions, governance frameworks, and competitive moves.",
    icon: Crown,
    accent: "synapse-gold",
    iconBg: "bg-synapse-gold/10 text-synapse-gold group-hover:bg-synapse-gold/20",
    accentLine: "bg-synapse-gold",
    hoverGlow: "group-hover:shadow-[0_8px_40px_rgba(212,168,67,0.15)]",
    bullets: [
      "AI strategy & governance",
      "Risk, ethics & compliance",
      "Boardroom-grade case studies",
    ],
  },
  {
    name: "AI for Efficiency",
    tagline: "For Operations & Process Owners",
    description:
      "Targeted training that pairs AI with workflow redesign — eliminating bottlenecks across operations, customer service, finance, and HR with deployable automations.",
    icon: Briefcase,
    accent: "violet-500",
    iconBg: "bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20",
    accentLine: "bg-violet-500",
    hoverGlow: "group-hover:shadow-[0_8px_40px_rgba(139,92,246,0.15)]",
    bullets: [
      "Process audit & automation design",
      "n8n, Zapier, Gumloop in practice",
      "ROI-tracked implementation",
    ],
  },
];

const benefits = [
  {
    title: "Faster, Smarter Decisions",
    body: "Teams move from reactive to predictive — making confident calls backed by data and AI insight, not guesswork.",
  },
  {
    title: "10x Productivity Gains",
    body: "Routine work compresses from hours to minutes, freeing your people for the strategic work only humans can do.",
  },
  {
    title: "Future-Proof Workforce",
    body: "Your staff become AI-fluent operators — confident with the tools reshaping every industry, not displaced by them.",
  },
  {
    title: "Competitive Differentiation",
    body: "Organizations that adopt AI deliberately move faster, serve customers better, and out-innovate slower rivals.",
  },
  {
    title: "Measurable ROI",
    body: "Every program ties to clear KPIs — time saved, cost reduced, revenue unlocked. We measure what we deliver.",
  },
  {
    title: "Lasting Capability",
    body: "We don't just train and leave. Your teams keep the playbooks, prompts, and frameworks long after we're gone.",
  },
];

export default function TrainingPrograms() {
  return (
    <section
      id="training"
      className="relative bg-gradient-to-b from-surface-mid via-surface-deep to-surface-mid py-24 sm:py-32 lg:py-40"
    >
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-circuit-teal/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Training & Enablement"
          title="AI & Tech Training That Compounds"
          subtitle="Whether you're an individual learner, a team lead, or a CEO — we build the AI fluency that turns curiosity into capability and capability into competitive advantage."
        />

        {/* Programs grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.08, 0.15)}
          className="grid gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4"
        >
          {programs.map((p) => (
            <motion.div
              key={p.name}
              variants={fadeUp}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
              className={`group relative overflow-hidden rounded-2xl border border-signal-white/[0.06] bg-surface-raised/50 backdrop-blur-sm transition-all duration-500 ${p.hoverGlow} hover:border-signal-white/[0.12]`}
            >
              <div
                className={`absolute inset-x-0 top-0 h-[2px] ${p.accentLine} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <div className="relative p-6">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${p.iconBg}`}
                >
                  <p.icon size={22} strokeWidth={1.8} />
                </div>

                <h3 className="mt-5 font-clash text-lg font-bold tracking-wide text-signal-white">
                  {p.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-synapse-gold/70">
                  {p.tagline}
                </p>

                <p className="mt-3 text-[13px] leading-relaxed text-signal-white/55">
                  {p.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {p.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-[12px] text-signal-white/60"
                    >
                      <CheckCircle2
                        size={14}
                        className="mt-0.5 shrink-0 text-circuit-teal/80"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-signal-white/40 transition-all duration-300 group-hover:gap-2.5 group-hover:text-signal-white/80"
                >
                  Enroll a team
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits / impact */}
        <ScrollReveal className="mt-24 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-synapse-gold/80">
            Value & Impact
          </span>
          <h3 className="mt-4 font-clash text-2xl font-bold text-signal-white sm:text-3xl lg:text-4xl">
            What These Programs Actually Deliver
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-base text-signal-white/55">
            Training is only worth the time it returns. Here's what organizations
            and individuals walk away with when the work is done.
          </p>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.06, 0.1)}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={fadeUp}
              className="group rounded-2xl border border-signal-white/[0.06] bg-surface-raised/40 p-6 transition-all duration-300 hover:border-circuit-teal/25 hover:bg-surface-raised/70"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-pulse-blue/15 to-circuit-teal/15">
                  <CheckCircle2 size={18} className="text-circuit-teal" />
                </div>
                <h4 className="font-clash text-base font-bold text-signal-white">
                  {b.title}
                </h4>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-signal-white/55">
                {b.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <ScrollReveal className="mt-16 text-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-md bg-pulse-blue px-7 py-3.5 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a6aee] hover:shadow-[0_0_30px_rgba(46,125,255,0.35)]"
          >
            Book a Training Consultation
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
