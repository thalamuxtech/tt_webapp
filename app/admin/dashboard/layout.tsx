"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  LayoutDashboard,
  FileText,
  Mail,
  LogOut,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Service Requests", href: "/admin/dashboard/requests", icon: FileText },
  { label: "Signups & Contacts", href: "/admin/dashboard/signups", icon: Mail },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace("/admin/login");
      } else {
        setUser(u);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [router]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-deepest">
        <Loader2 size={32} className="animate-spin text-pulse-blue" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface-deepest">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-pulse-blue/10 bg-surface-deep transition-all duration-300 lg:flex ${
          sidebarCollapsed ? "w-[72px]" : "w-[250px]"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-pulse-blue/10 px-4">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl">
            <Image
              src="/images/logo.png"
              alt="Thalamux Tech"
              fill
              className="object-contain"
            />
          </div>
          {!sidebarCollapsed && (
            <div className="overflow-hidden">
              <span className="font-brand-script text-lg text-signal-white">
                Thalamux <span className="text-pulse-blue">Tech</span>
              </span>
              <p className="font-mono text-[9px] uppercase tracking-widest text-signal-white/30">
                Admin
              </p>
            </div>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {sidebarLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                  active
                    ? "border-l-[3px] border-pulse-blue bg-pulse-blue/10 text-signal-white"
                    : "border-l-[3px] border-transparent text-signal-white/50 hover:bg-signal-white/[0.04] hover:text-signal-white/80"
                }`}
                title={link.label}
              >
                <link.icon size={18} className={active ? "text-pulse-blue" : ""} />
                {!sidebarCollapsed && (
                  <span className="text-sm font-medium">{link.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="mx-3 mb-2 flex items-center justify-center rounded-xl py-2 text-signal-white/30 transition-colors hover:bg-signal-white/[0.04] hover:text-signal-white/60"
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* User / Sign out */}
        <div className="border-t border-pulse-blue/10 p-3">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-signal-white/50 transition-all hover:bg-red-500/10 hover:text-red-400"
            title="Sign out"
          >
            <LogOut size={16} />
            {!sidebarCollapsed && "Sign Out"}
          </button>
          {!sidebarCollapsed && user && (
            <p className="mt-2 truncate px-3 font-mono text-[10px] text-signal-white/25">
              {user.email}
            </p>
          )}
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-pulse-blue/10 bg-surface-deep/95 px-4 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-1.5 text-signal-white/60 hover:bg-signal-white/[0.06]"
          >
            <Menu size={20} />
          </button>
          <div className="relative h-7 w-7 overflow-hidden rounded-lg">
            <Image src="/images/logo.png" alt="" fill className="object-contain" />
          </div>
          <span className="font-clash text-sm font-bold text-signal-white">
            Admin
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-lg p-1.5 text-signal-white/40 hover:text-red-400"
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative h-full w-[260px] border-r border-pulse-blue/10 bg-surface-deep">
            <div className="flex h-14 items-center justify-between border-b border-pulse-blue/10 px-4">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-xl">
                  <Image src="/images/logo.png" alt="" fill className="object-contain" />
                </div>
                <span className="font-brand-script text-lg text-signal-white">
                  Thalamux
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-1 text-signal-white/50"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="space-y-1 px-3 py-4">
              {sidebarLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                      active
                        ? "bg-pulse-blue/10 text-signal-white"
                        : "text-signal-white/50 hover:bg-signal-white/[0.04]"
                    }`}
                  >
                    <link.icon size={18} className={active ? "text-pulse-blue" : ""} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content area */}
      <main
        className={`flex-1 pt-14 transition-all duration-300 lg:pt-0 ${
          sidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-[250px]"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
