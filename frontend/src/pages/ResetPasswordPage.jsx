import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authService } from "../services/authService.js";

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const data = await authService.resetPassword({ token, password });
      setMessage(data.message || "Password reset successfully.");
    } catch (err) {
      setError(err.message || "Could not reset password.");
    }
  };

  return (
    <main className="min-h-[calc(100vh-88px)] bg-black px-6 py-12 text-white">
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-950 p-8">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Reset password</p>
        <h1 className="mt-3 text-3xl font-semibold">Choose a new password</h1>
        <p className="mt-3 text-slate-300">Use the reset link you received to set a fresh password for your account.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-400" placeholder="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="text-sm text-rose-300">{error}</p>}
          {message && <p className="text-sm text-emerald-300">{message}</p>}
          <button className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-slate-900">Reset password</button>
        </form>
        <p className="mt-6 text-sm text-slate-400">Back to <Link to="/login" className="text-white underline underline-offset-4">login</Link></p>
      </div>
    </main>
  );
};
