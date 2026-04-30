"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, XCircle, ArrowRight, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useToast } from "./Toast";
import dynamic from "next/dynamic";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { countries } from "@/lib/countries";

const NeuralParticles = dynamic(() => import("./NeuralParticles"), {
  ssr: false,
});

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  country: z.string().min(1, "Select a country"),
  state: z.string().optional(),
  companySize: z.enum(
    ["1-10", "11-50", "51-200", "201-1000", "1000+"],
    { message: "Select company size" }
  ),
  service: z.enum(
    [
      "data",
      "analytics",
      "consultancy",
      "ai",
      "automation",
      "training",
      "full_suite",
    ],
    { message: "Select a service" }
  ),
  budget: z.enum(
    ["under_1k", "1k_5k", "5k_10k", "10k_20k", "20k_plus", "not_sure"],
    { message: "Select a budget range" }
  ),
  timeline: z.enum(
    ["2_weeks", "1_month", "2_months", "3_months_plus"],
    { message: "Select a timeline" }
  ),
  heardFrom: z.string().optional(),
  message: z.string().min(10, "Tell us more (at least 10 characters)"),
});

type FormData = z.infer<typeof schema>;

const services = [
  { value: "data", label: "Data" },
  { value: "analytics", label: "Analytics" },
  { value: "consultancy", label: "Consultancy" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "automation", label: "Automation" },
  { value: "training", label: "AI & Tech Training" },
  { value: "full_suite", label: "Full Suite" },
];

const companySizes = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "201-1000", label: "201–1,000 employees" },
  { value: "1000+", label: "1,000+ employees" },
];

const budgets = [
  { value: "under_1k", label: "Under $1,000" },
  { value: "1k_5k", label: "$1,000 – $5,000" },
  { value: "5k_10k", label: "$5,000 – $10,000" },
  { value: "10k_20k", label: "$10,000 – $20,000" },
  { value: "20k_plus", label: "$20,000+" },
  { value: "not_sure", label: "Not sure yet" },
];

const timelines = [
  { value: "2_weeks", label: "In 2 weeks" },
  { value: "1_month", label: "In 1 month" },
  { value: "2_months", label: "In 2 months" },
  { value: "3_months_plus", label: "3 months+" },
];

// Animated checkmark SVG
function AnimatedCheck() {
  return (
    <div className="relative mx-auto h-20 w-20">
      {/* Outer ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
      />
      {/* Pulsing glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.4, 1.2], opacity: [0, 0.3, 0] }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute inset-0 rounded-full bg-emerald-500/20"
      />
      {/* Inner circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.15 }}
        className="absolute inset-2 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-circuit-teal"
      >
        {/* Check SVG */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M6 12.5L10 16.5L18 8.5"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
      {/* Sparkle particles */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 44;
        const y = Math.sin(angle) * 44;
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{ scale: [0, 1, 0], x, y, opacity: [1, 1, 0] }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.06 }}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-synapse-gold"
          />
        );
      })}
    </div>
  );
}

// Animated error icon
function AnimatedError() {
  return (
    <div className="relative mx-auto h-20 w-20">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-0 rounded-full border-2 border-red-500/30"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.3, 1.1], opacity: [0, 0.25, 0] }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute inset-0 rounded-full bg-red-500/20"
      />
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.15 }}
        className="absolute inset-2 flex items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600"
      >
        <XCircle size={30} className="text-white" strokeWidth={2} />
      </motion.div>
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    try {
      await addDoc(collection(db, "service_requests"), {
        ...data,
        status: "new",
        emailSent: false,
        readAt: null,
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      reset();
      toast.success(
        "Request Submitted!",
        "Our team will review and respond within 3 business days."
      );
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      toast.error(
        "Submission Failed",
        "Something went wrong. Please try again or contact us directly."
      );
    }
  };

  const resetForm = () => setStatus("idle");

  const inputClass =
    "w-full rounded-xl border border-pulse-blue/15 bg-surface-deepest/80 px-4 py-3.5 text-sm text-signal-white placeholder:font-mono placeholder:text-[12px] placeholder:text-signal-white/30 transition-all duration-200 focus:border-pulse-blue focus:outline-none focus:ring-2 focus:ring-pulse-blue/15";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-surface-mid to-surface-deepest py-24 sm:py-32 lg:py-40"
    >
      <div className="absolute inset-0 opacity-30">
        <NeuralParticles />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Get Started"
          title="Ready to Command Your Signals?"
          subtitle="Tell us about your challenge. We'll route the right intelligence."
        />

        <AnimatePresence mode="wait">
          {/* Success State */}
          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass-card mx-auto max-w-lg rounded-2xl p-10 text-center sm:p-12"
            >
              <AnimatedCheck />

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-7 font-clash text-2xl font-bold text-signal-white"
              >
                Request Received!
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-3 text-sm leading-relaxed text-signal-white/55"
              >
                Thank you for reaching out. Our intelligence team will review
                your submission and respond within{" "}
                <span className="font-medium text-circuit-teal">3 business days</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-[12px] font-medium text-emerald-400"
              >
                <Sparkles size={14} />
                No noise. Just action.
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={resetForm}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-signal-white/10 py-3 text-sm text-signal-white/50 transition-all hover:border-signal-white/20 hover:text-signal-white/70"
              >
                Submit another request
                <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          )}

          {/* Error State */}
          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass-card mx-auto max-w-lg rounded-2xl p-10 text-center sm:p-12"
            >
              <AnimatedError />

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-7 font-clash text-2xl font-bold text-signal-white"
              >
                Something Went Wrong
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-3 text-sm leading-relaxed text-signal-white/55"
              >
                We couldn&apos;t process your request right now. Please try
                again or reach us directly at{" "}
                <a
                  href="mailto:thalamuxtech@gmail.com"
                  className="text-pulse-blue hover:underline"
                >
                  thalamuxtech@gmail.com
                </a>
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={resetForm}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-pulse-blue px-6 py-3.5 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a6aee] hover:shadow-[0_0_30px_rgba(46,125,255,0.3)]"
              >
                Try Again
              </motion.button>
            </motion.div>
          )}

          {/* Form State */}
          {(status === "idle" || status === "submitting") && (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit(onSubmit)}
              className="glass-card rounded-2xl p-6 sm:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-signal-white/70">
                    Full Name <span className="text-synapse-gold">*</span>
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="e.g. John Doe"
                    className={inputClass}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
                      >
                        <XCircle size={12} />
                        {errors.name.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Company */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-signal-white/70">
                    Company <span className="text-synapse-gold">*</span>
                  </label>
                  <input
                    {...register("company")}
                    type="text"
                    placeholder="e.g. Acme Corp"
                    className={inputClass}
                  />
                  <AnimatePresence>
                    {errors.company && (
                      <motion.p
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
                      >
                        <XCircle size={12} />
                        {errors.company.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-signal-white/70">
                    Email <span className="text-synapse-gold">*</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
                      >
                        <XCircle size={12} />
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-signal-white/70">
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className={inputClass}
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-signal-white/70">
                    Country <span className="text-synapse-gold">*</span>
                  </label>
                  <select
                    {...register("country")}
                    className={`${inputClass} appearance-none`}
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-surface-deep">
                      Select your country...
                    </option>
                    {countries.map((c) => (
                      <option key={c} value={c} className="bg-surface-deep">
                        {c}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.country && (
                      <motion.p
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
                      >
                        <XCircle size={12} />
                        {errors.country.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* State / Region */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-signal-white/70">
                    State / Region / Province
                  </label>
                  <input
                    {...register("state")}
                    type="text"
                    placeholder="e.g. Lagos, California, Bavaria"
                    className={inputClass}
                  />
                </div>

                {/* Company Size */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-signal-white/70">
                    Company Size <span className="text-synapse-gold">*</span>
                  </label>
                  <select
                    {...register("companySize")}
                    className={`${inputClass} appearance-none`}
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-surface-deep">
                      Select company size...
                    </option>
                    {companySizes.map((c) => (
                      <option
                        key={c.value}
                        value={c.value}
                        className="bg-surface-deep"
                      >
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.companySize && (
                      <motion.p
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
                      >
                        <XCircle size={12} />
                        {errors.companySize.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Budget */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-signal-white/70">
                    Budget Range (USD) <span className="text-synapse-gold">*</span>
                  </label>
                  <select
                    {...register("budget")}
                    className={`${inputClass} appearance-none`}
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-surface-deep">
                      Select a budget range...
                    </option>
                    {budgets.map((b) => (
                      <option
                        key={b.value}
                        value={b.value}
                        className="bg-surface-deep"
                      >
                        {b.label}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.budget && (
                      <motion.p
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
                      >
                        <XCircle size={12} />
                        {errors.budget.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Service */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-signal-white/70">
                    Service Interest <span className="text-synapse-gold">*</span>
                  </label>
                  <select
                    {...register("service")}
                    className={`${inputClass} appearance-none`}
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-surface-deep">
                      Select a service...
                    </option>
                    {services.map((s) => (
                      <option
                        key={s.value}
                        value={s.value}
                        className="bg-surface-deep"
                      >
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.service && (
                      <motion.p
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
                      >
                        <XCircle size={12} />
                        {errors.service.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Timeline */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-signal-white/70">
                    When do you expect to start? <span className="text-synapse-gold">*</span>
                  </label>
                  <select
                    {...register("timeline")}
                    className={`${inputClass} appearance-none`}
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-surface-deep">
                      Select a timeline...
                    </option>
                    {timelines.map((t) => (
                      <option
                        key={t.value}
                        value={t.value}
                        className="bg-surface-deep"
                      >
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.timeline && (
                      <motion.p
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
                      >
                        <XCircle size={12} />
                        {errors.timeline.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* How did you hear about us */}
              <div className="mt-5">
                <label className="mb-1.5 block text-xs font-medium text-signal-white/70">
                  How did you hear about us?
                </label>
                <input
                  {...register("heardFrom")}
                  type="text"
                  placeholder="e.g. LinkedIn, referral, search, event"
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div className="mt-5">
                <label className="mb-1.5 block text-xs font-medium text-signal-white/70">
                  Tell us about your project{" "}
                  <span className="text-synapse-gold">*</span>
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Describe your project, goals, or vision and let us do the rest..."
                  className={`${inputClass} resize-none`}
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -5, height: 0 }}
                      className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
                    >
                      <XCircle size={12} />
                      {errors.message.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "submitting"}
                whileTap={{ scale: 0.98 }}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-pulse-blue px-6 py-4 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a6aee] hover:shadow-[0_0_30px_rgba(46,125,255,0.35)] disabled:pointer-events-none disabled:opacity-60"
              >
                <AnimatePresence mode="wait">
                  {status === "submitting" ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Send size={16} />
                      Submit Request
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-wider text-signal-white/30">
                We respond within 3 business days. No spam. Ever.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
