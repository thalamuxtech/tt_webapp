"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Loader2, Mail, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Login failed";
      if (message.includes("invalid-credential")) {
        setError("Invalid email or password.");
      } else if (message.includes("too-many-requests")) {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Google sign-in failed";
      if (!message.includes("popup-closed")) {
        setError("Google sign-in failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-pulse-blue/15 bg-surface-deepest/80 pl-11 pr-4 py-3.5 text-sm text-signal-white placeholder:text-signal-white/30 transition-all focus:border-pulse-blue focus:outline-none focus:ring-2 focus:ring-pulse-blue/15";

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-deepest px-4">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,#0F2847_0%,#040E1F_70%)]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back to site */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-signal-white/40 transition-colors hover:text-signal-white/70"
        >
          <ArrowLeft size={14} />
          Back to site
        </Link>

        {/* Login card */}
        <div className="glass-card rounded-2xl p-8 sm:p-10">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative mb-4 h-14 w-14 overflow-hidden rounded-2xl">
              <Image
                src="/images/logo.png"
                alt="Thalamux Tech"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="font-clash text-2xl font-bold text-signal-white">
              Admin Portal
            </h1>
            <p className="mt-1.5 text-sm text-signal-white/45">
              Sign in to access the dashboard
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Google Sign-in */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="mb-5 flex w-full items-center justify-center gap-3 rounded-xl border border-signal-white/10 bg-signal-white/[0.03] px-4 py-3.5 text-sm font-medium text-signal-white transition-all hover:border-signal-white/20 hover:bg-signal-white/[0.06] disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-signal-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface-raised px-3 font-mono text-[10px] uppercase tracking-wider text-signal-white/30">
                or sign in with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-signal-white/30"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@thalamuxtech.com"
                className={inputClass}
                required
              />
            </div>

            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-signal-white/30"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={inputClass}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-pulse-blue px-6 py-3.5 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a6aee] hover:shadow-[0_0_30px_rgba(46,125,255,0.3)] disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wider text-signal-white/20">
            Thalamux Tech Admin Portal
          </p>
        </div>
      </div>
    </div>
  );
}
