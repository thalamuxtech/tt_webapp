"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import {
  FileText,
  Mail,
  TrendingUp,
  Clock,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

interface ServiceRequest {
  id: string;
  name: string;
  company: string;
  email: string;
  service: string;
  message: string;
  status: string;
  createdAt: Timestamp | null;
}

interface Signup {
  id: string;
  email: string;
  source: string;
  createdAt: Timestamp | null;
}

const serviceBadgeColors: Record<string, string> = {
  data: "bg-pulse-blue/15 text-pulse-blue",
  analytics: "bg-circuit-teal/15 text-circuit-teal",
  consultancy: "bg-synapse-gold/15 text-synapse-gold",
  ai: "bg-blue-400/15 text-blue-400",
  automation: "bg-emerald-400/15 text-emerald-400",
  full_suite: "bg-purple-400/15 text-purple-400",
};

const statusBadgeColors: Record<string, string> = {
  new: "bg-circuit-teal/15 text-circuit-teal border-circuit-teal/30",
  in_review: "bg-synapse-gold/15 text-synapse-gold border-synapse-gold/30",
  converted: "bg-pulse-blue/15 text-pulse-blue border-pulse-blue/30",
  archived: "bg-data-graphite/30 text-signal-white/40 border-data-graphite/40",
};

function timeAgo(timestamp: Timestamp | null): string {
  if (!timestamp) return "Just now";
  const seconds = Math.floor((Date.now() - timestamp.toMillis()) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  sub,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accent: string;
  sub?: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-signal-white/50">{label}</p>
          <p className="mt-1.5 font-clash text-3xl font-bold text-signal-white">
            {value}
          </p>
          {sub && (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-signal-white/30">
              {sub}
            </p>
          )}
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}
        >
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [newThisWeek, setNewThisWeek] = useState(0);
  const [totalSignups, setTotalSignups] = useState(0);
  const [serviceCounts, setServiceCounts] = useState<Record<string, number>>({});

  // Real-time listener: service_requests
  useEffect(() => {
    const q = query(
      collection(db, "service_requests"),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ServiceRequest[];

      setRequests(data);
      setTotalRequests(data.length);

      // New this week
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const thisWeek = data.filter(
        (r) => r.createdAt && r.createdAt.toMillis() > weekAgo
      );
      setNewThisWeek(thisWeek.length);

      // Service breakdown
      const counts: Record<string, number> = {};
      data.forEach((r) => {
        counts[r.service] = (counts[r.service] || 0) + 1;
      });
      setServiceCounts(counts);
    });
    return unsubscribe;
  }, []);

  // Real-time listener: signups
  useEffect(() => {
    const q = query(
      collection(db, "signups"),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Signup[];
      setSignups(data);
      setTotalSignups(data.length);
    });
    return unsubscribe;
  }, []);

  // Service breakdown bar chart (simple CSS bars)
  const maxServiceCount = Math.max(...Object.values(serviceCounts), 1);
  const serviceOrder = [
    "data",
    "analytics",
    "consultancy",
    "ai",
    "automation",
    "full_suite",
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-clash text-2xl font-bold text-signal-white sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-signal-white/45">
          Real-time overview of service requests, signups, and activity.
        </p>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Requests"
          value={totalRequests}
          icon={FileText}
          accent="bg-pulse-blue/15 text-pulse-blue"
          sub="All time"
        />
        <StatCard
          label="New This Week"
          value={newThisWeek}
          icon={TrendingUp}
          accent="bg-circuit-teal/15 text-circuit-teal"
          sub="Last 7 days"
        />
        <StatCard
          label="Newsletter Signups"
          value={totalSignups}
          icon={Mail}
          accent="bg-synapse-gold/15 text-synapse-gold"
          sub="All time"
        />
        <StatCard
          label="Pending Review"
          value={requests.filter((r) => r.status === "new").length}
          icon={Clock}
          accent="bg-orange-400/15 text-orange-400"
          sub="Needs action"
        />
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Service breakdown chart */}
        <div className="glass-card rounded-2xl p-5 xl:col-span-1">
          <div className="mb-5 flex items-center gap-2">
            <BarChart3 size={16} className="text-pulse-blue" />
            <h2 className="text-sm font-medium text-signal-white">
              Requests by Service
            </h2>
          </div>
          <div className="space-y-3">
            {serviceOrder.map((service) => {
              const count = serviceCounts[service] || 0;
              const width =
                maxServiceCount > 0
                  ? (count / maxServiceCount) * 100
                  : 0;
              return (
                <div key={service}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-signal-white/50">
                      {service === "full_suite" ? "Full Suite" : service}
                    </span>
                    <span className="font-mono text-xs font-medium text-signal-white/70">
                      {count}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-signal-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pulse-blue to-circuit-teal transition-all duration-700"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {totalRequests === 0 && (
            <p className="mt-4 text-center font-mono text-xs text-signal-white/25">
              No requests yet
            </p>
          )}
        </div>

        {/* Recent service requests */}
        <div className="glass-card rounded-2xl p-5 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-pulse-blue" />
              <h2 className="text-sm font-medium text-signal-white">
                Recent Service Requests
              </h2>
            </div>
            <Link
              href="/admin/dashboard/requests"
              className="flex items-center gap-1 text-xs text-pulse-blue transition-colors hover:text-pulse-blue/80"
            >
              View all <ArrowUpRight size={12} />
            </Link>
          </div>

          {requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText size={32} className="mb-3 text-signal-white/15" />
              <p className="text-sm text-signal-white/40">
                No service requests yet.
              </p>
              <p className="mt-1 font-mono text-[10px] text-signal-white/25">
                They will appear here in real-time
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-pulse-blue/10">
                    <th className="pb-3 text-left font-mono text-[10px] uppercase tracking-wider text-signal-white/40">
                      Name / Company
                    </th>
                    <th className="pb-3 text-left font-mono text-[10px] uppercase tracking-wider text-signal-white/40">
                      Service
                    </th>
                    <th className="hidden pb-3 text-left font-mono text-[10px] uppercase tracking-wider text-signal-white/40 sm:table-cell">
                      Status
                    </th>
                    <th className="pb-3 text-right font-mono text-[10px] uppercase tracking-wider text-signal-white/40">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.slice(0, 8).map((req) => (
                    <tr
                      key={req.id}
                      className="border-b border-pulse-blue/[0.05] transition-colors hover:bg-pulse-blue/[0.03]"
                    >
                      <td className="py-3 pr-4">
                        <p className="text-sm font-medium text-signal-white">
                          {req.name}
                        </p>
                        <p className="font-mono text-[11px] text-signal-white/35">
                          {req.company}
                        </p>
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-block rounded-lg px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
                            serviceBadgeColors[req.service] ||
                            "bg-signal-white/10 text-signal-white/60"
                          }`}
                        >
                          {req.service === "full_suite"
                            ? "Full Suite"
                            : req.service}
                        </span>
                      </td>
                      <td className="hidden py-3 pr-4 sm:table-cell">
                        <span
                          className={`inline-block rounded-lg border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
                            statusBadgeColors[req.status] ||
                            "border-signal-white/10 text-signal-white/40"
                          }`}
                        >
                          {req.status === "in_review"
                            ? "In Review"
                            : req.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-mono text-[11px] text-signal-white/35">
                        {timeAgo(req.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter signups section */}
      <div className="mt-6 glass-card rounded-2xl p-5">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-synapse-gold" />
            <h2 className="text-sm font-medium text-signal-white">
              Recent Newsletter Signups
            </h2>
          </div>
          <Link
            href="/admin/dashboard/signups"
            className="flex items-center gap-1 text-xs text-pulse-blue transition-colors hover:text-pulse-blue/80"
          >
            View all <ArrowUpRight size={12} />
          </Link>
        </div>

        {signups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Mail size={28} className="mb-3 text-signal-white/15" />
            <p className="text-sm text-signal-white/40">No signups yet.</p>
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {signups.slice(0, 12).map((signup) => (
              <div
                key={signup.id}
                className="flex items-center justify-between rounded-xl bg-signal-white/[0.03] px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-signal-white/70">
                    {signup.email}
                  </p>
                  <p className="font-mono text-[10px] text-signal-white/25">
                    {signup.source?.replace("_", " ") || "website"}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[10px] text-signal-white/25">
                  {timeAgo(signup.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Analytics embed hint */}
      <div className="mt-6 glass-card rounded-2xl p-5">
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 size={16} className="text-circuit-teal" />
          <h2 className="text-sm font-medium text-signal-white">
            Google Analytics
          </h2>
        </div>
        <div className="rounded-xl border border-dashed border-pulse-blue/15 bg-signal-white/[0.02] p-8 text-center">
          <BarChart3 size={36} className="mx-auto mb-3 text-signal-white/15" />
          <p className="text-sm text-signal-white/50">
            Analytics data flows to Google Analytics (
            <span className="font-mono text-circuit-teal">G-RW5TEZD0KW</span>)
          </p>
          <a
            href="https://analytics.google.com/analytics/web/#/p605355205174/reports"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-pulse-blue/10 px-4 py-2 text-xs font-medium text-pulse-blue transition-colors hover:bg-pulse-blue/20"
          >
            Open Google Analytics Dashboard
            <ArrowUpRight size={12} />
          </a>
          <p className="mt-3 font-mono text-[10px] text-signal-white/25">
            Page views, sessions, and user data tracked in real-time
          </p>
        </div>
      </div>
    </div>
  );
}
