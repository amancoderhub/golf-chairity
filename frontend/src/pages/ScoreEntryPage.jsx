import { CalendarDays, CircleDot, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { scoreService } from "../services/scoreService.js";
import { formatDate } from "../utils/formatters.js";

export const ScoreEntryPage = () => {
  const [scores, setScores] = useState([]);
  const [form, setForm] = useState({ score: "", date: "" });
  const [message, setMessage] = useState("");

  const loadScores = async () => {
    const data = await scoreService.list();
    setScores(data.scores || []);
  };

  useEffect(() => {
    loadScores();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await scoreService.create({ score: Number(form.score), date: form.date });
    setForm({ score: "", date: "" });
    setMessage("Score saved. If you had more than five scores, the oldest entry was removed automatically.");
    loadScores();
  };

  return (
    <main className="page-shell grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="glass-card space-y-5 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Score system</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-900">Enter a stableford round in seconds</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Inspired by fast score logging tools, this flow keeps things tight: score, date, save, done.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <span className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-600"><TrendingUp size={16} /> Stableford score</span>
              <input min="1" max="45" type="number" required className="w-full bg-transparent text-2xl font-semibold text-slate-900 outline-none placeholder:text-slate-400" placeholder="32" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} />
            </label>
            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <span className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-600"><CalendarDays size={16} /> Round date</span>
              <input type="date" required className="w-full bg-transparent text-base text-slate-900 outline-none" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </label>
          </div>
          <button className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition hover:bg-slate-800">Save latest round</button>
          {message && <p className="text-sm text-emerald-700">{message}</p>}
        </form>

        <div className="glass-card p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Eligibility tracker</p>
          <div className="mt-5 grid grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, index) => {
              const item = scores[index];
              return (
                <div key={index} className={`rounded-2xl border p-4 text-center shadow-sm ${item ? "border-sky-200 bg-sky-50" : "border-slate-200 bg-white"}`}>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Slot {index + 1}</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">{item ? item.score : "-"}</p>
                  <p className="mt-2 text-xs text-slate-500">{item ? formatDate(item.date) : "Waiting"}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <section className="glass-card p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Latest five scores</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Reverse chronological order with automatic rolling replacement.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{scores.length}/5 stored</span>
        </div>
        <div className="mt-6 space-y-3">
          {scores.length ? scores.map((entry, index) => (
            <div key={entry._id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white">#{index + 1}</div>
                <div>
                  <p className="font-semibold text-slate-900">Stableford {entry.score}</p>
                  <p className="text-sm text-slate-600">Played on {formatDate(entry.date)}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-sm text-sky-700"><CircleDot size={14} /> Draw-ready</span>
            </div>
          )) : <p className="text-slate-600">No scores added yet.</p>}
        </div>
      </section>
    </main>
  );
};
