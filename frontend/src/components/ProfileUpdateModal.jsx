import { useState } from "react";
import { X } from "lucide-react";
import { authService } from "../services/authService.js";

export const ProfileUpdateModal = ({ user, onClose, onUpdate }) => {
  const [form, setForm] = useState({ name: user.name, email: user.email });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authService.updateProfile(form);
      onUpdate(data.user);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Update Profile</h2>
          <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-slate-600">Full Name</span>
            <input required className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:bg-white" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-600">Email Address</span>
            <input required type="email" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:bg-white" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </label>
          <button disabled={loading} type="submit" className="w-full mt-4 rounded-xl bg-slate-950 py-4 font-bold text-white shadow-lg transition hover:bg-slate-800 disabled:opacity-50">
            {loading ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
};
