"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import dynamic from "next/dynamic";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const NeuralParticles = dynamic(() => import("./NeuralParticles"), {
  ssr: false,
});

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Valid email required"),
  service: z.enum(
    ["data", "analytics", "consultancy", "ai", "automation", "full_suite"],
    { message: "Select a service" }
  ),
  message: z.string().min(10, "Tell us more (at least 10 characters)"),
});

type FormData = z.infer<typeof schema>;

const services = [
  { value: "data", label: "Data" },
  { value: "analytics", label: "Analytics" },
  { value: "consultancy", label: "Consultancy" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "automation", label: "Automation" },
  { value: "full_suite", label: "Full Suite" },
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await addDoc(collection(db, "service_requests"), {
        ...data,
        status: "new",
        emailSent: false,
        readAt: null,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-pulse-blue/15 bg-surface-deepest/80 px-4 py-3.5 text-sm text-signal-white placeholder:font-mono placeholder:text-[12px] placeholder:text-signal-white/30 transition-all focus:border-pulse-blue focus:outline-none focus:ring-2 focus:ring-pulse-blue/15";
  const errorClass = "mt-1 text-xs text-red-400";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-surface-mid to-surface-deepest py-24 sm:py-32 lg:py-40"
    >
      {/* Particles at low opacity */}
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
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card mx-auto max-w-md rounded-2xl p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                <CheckCircle2
                  size={56}
                  className="mx-auto text-circuit-teal"
                />
              </motion.div>
              <h3 className="mt-5 font-clash text-2xl font-bold text-signal-white">
                Request Received
              </h3>
              <p className="mt-2 text-sm text-signal-white/60">
                Our team will review your submission and respond within 1
                business day. No noise. Just action.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
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
                  {errors.name && (
                    <p className={errorClass}>{errors.name.message}</p>
                  )}
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
                  {errors.company && (
                    <p className={errorClass}>{errors.company.message}</p>
                  )}
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
                  {errors.email && (
                    <p className={errorClass}>{errors.email.message}</p>
                  )}
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
                  {errors.service && (
                    <p className={errorClass}>{errors.service.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="mt-5">
                <label className="mb-1.5 block text-xs font-medium text-signal-white/70">
                  Tell us about your challenge{" "}
                  <span className="text-synapse-gold">*</span>
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Describe your data challenges, goals, or vision..."
                  className={`${inputClass} resize-none`}
                />
                {errors.message && (
                  <p className={errorClass}>{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-pulse-blue px-6 py-4 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a6aee] hover:shadow-[0_0_30px_rgba(46,125,255,0.35)] disabled:pointer-events-none disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Request
                  </>
                )}
              </button>

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
