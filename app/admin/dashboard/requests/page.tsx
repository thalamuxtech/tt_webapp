"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import {
  FileText,
  Search,
  X,
  Trash2,
  Eye,
  Download,
} from "lucide-react";

interface ServiceRequest {
  id: string;
  name: string;
  company: string;
  email: string;
  service: string;
  message: string;
  status: string;
  notes?: string;
  createdAt: Timestamp | null;
}

const statusOptions = ["new", "in_review", "converted", "archived"];
const serviceOptions = [
  "all",
  "data",
  "analytics",
  "consultancy",
  "ai",
  "automation",
  "full_suite",
];

const serviceBadge: Record<string, string> = {
  data: "bg-pulse-blue/15 text-pulse-blue",
  analytics: "bg-circuit-teal/15 text-circuit-teal",
  consultancy: "bg-synapse-gold/15 text-synapse-gold",
  ai: "bg-blue-400/15 text-blue-400",
  automation: "bg-emerald-400/15 text-emerald-400",
  full_suite: "bg-purple-400/15 text-purple-400",
};

function formatDate(ts: Timestamp | null): string {
  if (!ts) return "—";
  return ts.toDate().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterService, setFilterService] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(
    null
  );
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "service_requests"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRequests(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ServiceRequest))
      );
    });
    return unsubscribe;
  }, []);

  const filtered = requests.filter((r) => {
    const matchesSearch =
      !searchTerm ||
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService =
      filterService === "all" || r.service === filterService;
    const matchesStatus =
      filterStatus === "all" || r.status === filterStatus;
    return matchesSearch && matchesService && matchesStatus;
  });

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "service_requests", id), { status });
    if (selectedRequest?.id === id) {
      setSelectedRequest({ ...selectedRequest, status });
    }
  };

  const saveNotes = async (id: string) => {
    await updateDoc(doc(db, "service_requests", id), { notes });
  };

  const deleteRequest = async (id: string) => {
    if (!confirm("Delete this request? This cannot be undone.")) return;
    await deleteDoc(doc(db, "service_requests", id));
    setSelectedRequest(null);
  };

  const exportCSV = () => {
    const headers = "Name,Company,Email,Service,Message,Status,Date\n";
    const rows = filtered
      .map(
        (r) =>
          `"${r.name}","${r.company}","${r.email}","${r.service}","${r.message.replace(/"/g, '""')}","${r.status}","${formatDate(r.createdAt)}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `service-requests-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectClass =
    "rounded-lg border border-pulse-blue/15 bg-surface-deep px-3 py-2 font-mono text-[11px] uppercase text-signal-white/60 focus:border-pulse-blue focus:outline-none";

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-clash text-2xl font-bold text-signal-white">
            Service Requests
          </h1>
          <p className="mt-1 text-sm text-signal-white/40">
            {filtered.length} request{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 rounded-xl border border-pulse-blue/20 px-4 py-2 text-xs font-medium text-pulse-blue transition-colors hover:bg-pulse-blue/10"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-signal-white/30"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, company, email..."
            className="w-full rounded-lg border border-pulse-blue/15 bg-surface-deep py-2 pl-9 pr-3 text-sm text-signal-white placeholder:text-signal-white/25 focus:border-pulse-blue focus:outline-none"
          />
        </div>
        <select
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          className={selectClass}
        >
          <option value="all">All Services</option>
          {serviceOptions.slice(1).map((s) => (
            <option key={s} value={s}>
              {s === "full_suite" ? "Full Suite" : s}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={selectClass}
        >
          <option value="all">All Status</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s === "in_review" ? "In Review" : s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden rounded-2xl">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText size={36} className="mb-3 text-signal-white/15" />
            <p className="text-sm text-signal-white/40">No requests found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-pulse-blue/10 bg-pulse-blue/[0.03]">
                  {["Name", "Company", "Email", "Service", "Status", "Date", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-signal-white/40"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((req) => (
                  <tr
                    key={req.id}
                    className="border-b border-pulse-blue/[0.05] transition-colors hover:bg-pulse-blue/[0.03]"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-signal-white">
                      {req.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-signal-white/60">
                      {req.company}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${req.email}`}
                        className="text-sm text-pulse-blue hover:underline"
                      >
                        {req.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-lg px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
                          serviceBadge[req.service] || "bg-signal-white/10 text-signal-white/50"
                        }`}
                      >
                        {req.service === "full_suite" ? "Full Suite" : req.service}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={req.status}
                        onChange={(e) => updateStatus(req.id, e.target.value)}
                        className="rounded-lg border border-pulse-blue/10 bg-transparent px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-signal-white/60 focus:outline-none"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s} className="bg-surface-deep">
                            {s === "in_review" ? "In Review" : s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-signal-white/35">
                      {formatDate(req.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          setSelectedRequest(req);
                          setNotes(req.notes || "");
                        }}
                        className="rounded-lg p-1.5 text-signal-white/30 transition-colors hover:bg-signal-white/[0.06] hover:text-signal-white"
                        title="View details"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedRequest(null)}
          />
          <div className="relative w-full max-w-lg border-l border-pulse-blue/10 bg-surface-deep p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="font-clash text-xl font-bold text-signal-white">
                  {selectedRequest.name}
                </h2>
                <p className="text-sm text-signal-white/50">
                  {selectedRequest.company}
                </p>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="rounded-lg p-1.5 text-signal-white/40 hover:bg-signal-white/[0.06]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-signal-white/35">
                  Email
                </label>
                <a
                  href={`mailto:${selectedRequest.email}`}
                  className="text-sm text-pulse-blue hover:underline"
                >
                  {selectedRequest.email}
                </a>
              </div>

              <div className="flex gap-4">
                <div>
                  <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-signal-white/35">
                    Service
                  </label>
                  <span
                    className={`inline-block rounded-lg px-3 py-1 font-mono text-xs uppercase ${
                      serviceBadge[selectedRequest.service] || ""
                    }`}
                  >
                    {selectedRequest.service}
                  </span>
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-signal-white/35">
                    Status
                  </label>
                  <select
                    value={selectedRequest.status}
                    onChange={(e) =>
                      updateStatus(selectedRequest.id, e.target.value)
                    }
                    className="rounded-lg border border-pulse-blue/15 bg-surface-deepest px-3 py-1.5 font-mono text-xs text-signal-white focus:outline-none"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s} className="bg-surface-deep">
                        {s === "in_review" ? "In Review" : s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-signal-white/35">
                  Message
                </label>
                <div className="rounded-xl bg-signal-white/[0.03] p-4 text-sm leading-relaxed text-signal-white/70">
                  {selectedRequest.message}
                </div>
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-signal-white/35">
                  Internal Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={() => saveNotes(selectedRequest.id)}
                  rows={3}
                  className="w-full rounded-xl border border-pulse-blue/15 bg-surface-deepest p-3 text-sm text-signal-white placeholder:text-signal-white/25 focus:border-pulse-blue focus:outline-none"
                  placeholder="Add internal notes..."
                />
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-signal-white/35">
                  Submitted
                </label>
                <p className="text-sm text-signal-white/50">
                  {formatDate(selectedRequest.createdAt)}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => deleteRequest(selectedRequest.id)}
                  className="flex items-center gap-2 rounded-xl border border-red-500/20 px-4 py-2 text-xs text-red-400 transition-colors hover:bg-red-500/10"
                >
                  <Trash2 size={14} />
                  Delete Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
