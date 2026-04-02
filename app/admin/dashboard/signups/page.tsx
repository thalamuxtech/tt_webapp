"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { Mail, Search, Trash2, Download } from "lucide-react";

interface Signup {
  id: string;
  email: string;
  source: string;
  createdAt: Timestamp | null;
}

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

export default function SignupsPage() {
  const [signups, setSignups] = useState<Signup[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    const q = query(collection(db, "signups"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSignups(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Signup))
      );
    });
    return unsubscribe;
  }, []);

  const filtered = signups.filter(
    (s) =>
      !searchTerm ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((s) => s.id)));
    }
  };

  const deleteSelected = async () => {
    if (!confirm(`Delete ${selected.size} signup(s)? This cannot be undone.`))
      return;
    const promises = Array.from(selected).map((id) =>
      deleteDoc(doc(db, "signups", id))
    );
    await Promise.all(promises);
    setSelected(new Set());
  };

  const exportCSV = () => {
    const headers = "Email,Source,Date\n";
    const rows = filtered
      .map(
        (s) =>
          `"${s.email}","${s.source || "website"}","${formatDate(s.createdAt)}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `signups-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-clash text-2xl font-bold text-signal-white">
            Signups & Contacts
          </h1>
          <p className="mt-1 text-sm text-signal-white/40">
            {filtered.length} signup{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-3">
          {selected.size > 0 && (
            <button
              onClick={deleteSelected}
              className="flex items-center gap-2 rounded-xl border border-red-500/20 px-4 py-2 text-xs text-red-400 transition-colors hover:bg-red-500/10"
            >
              <Trash2 size={14} />
              Delete ({selected.size})
            </button>
          )}
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-xl border border-pulse-blue/20 px-4 py-2 text-xs font-medium text-pulse-blue transition-colors hover:bg-pulse-blue/10"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-signal-white/30"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by email..."
          className="w-full rounded-lg border border-pulse-blue/15 bg-surface-deep py-2 pl-9 pr-3 text-sm text-signal-white placeholder:text-signal-white/25 focus:border-pulse-blue focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden rounded-2xl">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Mail size={36} className="mb-3 text-signal-white/15" />
            <p className="text-sm text-signal-white/40">No signups found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-pulse-blue/10 bg-pulse-blue/[0.03]">
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        filtered.length > 0 &&
                        selected.size === filtered.length
                      }
                      onChange={toggleAll}
                      className="h-3.5 w-3.5 rounded border-pulse-blue/30 accent-pulse-blue"
                    />
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-signal-white/40">
                    #
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-signal-white/40">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-signal-white/40">
                    Source
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-signal-white/40">
                    Date
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((signup, i) => (
                  <tr
                    key={signup.id}
                    className={`border-b border-pulse-blue/[0.05] transition-colors hover:bg-pulse-blue/[0.03] ${
                      selected.has(signup.id)
                        ? "bg-pulse-blue/[0.05]"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(signup.id)}
                        onChange={() => toggleSelect(signup.id)}
                        className="h-3.5 w-3.5 rounded border-pulse-blue/30 accent-pulse-blue"
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-signal-white/30">
                      {i + 1}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${signup.email}`}
                        className="text-sm text-pulse-blue hover:underline"
                      >
                        {signup.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-lg bg-signal-white/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-signal-white/45">
                        {signup.source?.replace("_", " ") || "website"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-signal-white/35">
                      {formatDate(signup.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={async () => {
                          if (
                            confirm("Delete this signup?")
                          ) {
                            await deleteDoc(doc(db, "signups", signup.id));
                          }
                        }}
                        className="rounded-lg p-1.5 text-signal-white/20 transition-colors hover:bg-red-500/10 hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
