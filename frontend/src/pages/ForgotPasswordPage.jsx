import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/authService.js";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setResetUrl("");

    try {
      const data = await authService.forgotPassword({ email });
      setMessage(data.message || "If the email exists, a reset link has been prepared.");
      setResetUrl(data.resetUrl || "");
    } catch (err) {
      setError(err.message || "Could not start password reset.");
    }
  };

  return (
    <main className="min-h-[calc(100vh-88px)] bg-black px-6 py-12 text-white">
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-950 p-8">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Forgot password</p>
        <h1 className="mt-3 text-3xl font-semibold">Reset your password</h1>
        <p className="mt-3 text-slate-300">Enter your email and we will generate a secure reset link. If the email service is configured, it will be delivered straight to your inbox.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-400" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {error && <p className="text-sm text-rose-300">{error}</p>}
          {message && <p className="text-sm text-emerald-300">{message}</p>}
          {resetUrl && <a href={resetUrl} className="block text-sm text-sky-300 underline underline-offset-4">Open reset link</a>}
          <button className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-slate-900">Send reset link</button>
        </form>
        <p className="mt-6 text-sm text-slate-400">Remembered it? <Link to="/login" className="text-white underline underline-offset-4">Back to login</Link></p>
      </div>
    </main>
  );
};
