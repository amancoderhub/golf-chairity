import { ArrowRight, ChevronDown, Facebook, HeartHandshake, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const socialButtons = [
  { label: "Continue with Google", icon: "G" },
  { label: "Continue with Apple", icon: "A" },
  { label: "Continue with Facebook", icon: <Facebook size={18} className="text-blue-500" /> }
];

export const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showSocials, setShowSocials] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await signup(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <main className="min-h-[calc(100vh-88px)] bg-white lg:grid lg:grid-cols-[0.92fr_1.08fr]">
      <section className="relative flex items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.08),transparent_40%),#f8fafc] px-6 py-12 lg:px-12 lg:py-16 overflow-hidden">
        {/* Decorative background orbs */}
        <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-rose-400/10 blur-[80px]" />
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-400/5 blur-[80px]" />

        <div className="relative z-10 w-full max-w-lg rounded-[2.5rem] border border-slate-200/50 bg-white/95 backdrop-blur-sm p-8 shadow-[0_32px_100px_rgba(15,23,42,0.08)] xl:p-12 transition-all hover:shadow-[0_45px_120px_rgba(15,23,42,0.12)] hover:border-slate-300/40">
          <div className="mb-10 flex items-center gap-4">
            <img src="/logo.png" alt="FairChance Logo" className="h-14 w-auto object-contain" />
            <div>
              <p className="text-xl font-bold tracking-tight text-slate-950">FairChance</p>
              <p className="text-sm font-medium text-slate-500">Create your account</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-rose-600">
              <Sparkles size={14} />
              Start your journey
            </div>
            <h1 className="text-3xl font-bold leading-[1.2] tracking-tight text-slate-950 lg:text-4xl">Join the platform where support meets participation.</h1>
            <p className="text-base leading-relaxed text-slate-500 font-medium">
              Create your profile to begin tracking rounds, selecting a charity, and entering the cleaner membership flow.
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3.5 text-slate-950 font-medium outline-none placeholder:text-slate-400 focus:border-sky-400 focus:bg-white transition-all text-sm sm:text-base" placeholder="Full name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input required className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3.5 text-slate-950 font-medium outline-none placeholder:text-slate-400 focus:border-sky-400 focus:bg-white transition-all text-sm sm:text-base" placeholder="Email address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input required className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3.5 text-slate-950 font-medium outline-none placeholder:text-slate-400 focus:border-sky-400 focus:bg-white transition-all text-sm sm:text-base" placeholder="Create password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              {error && <p className="text-sm font-semibold text-rose-600 px-2">{error}</p>}
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-4 font-bold text-white shadow-xl transition hover:bg-slate-800 hover:scale-[1.02] active:scale-95 duration-200">
                Create account
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          <div className="mt-6">
            <button 
              onClick={() => setShowSocials(!showSocials)}
              className="flex w-full items-center justify-center gap-2 py-3 text-sm font-bold text-slate-400 transition hover:text-slate-600 font-medium"
            >
              or continue with social
              <ChevronDown size={16} className={`transition-transform duration-300 ${showSocials ? "rotate-180" : ""}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-500 ${showSocials ? "mt-3 max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="space-y-3">
                {socialButtons.map((button) => (
                  <button key={button.label} type="button" className="group flex w-full items-center justify-center gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-3.5 font-bold text-slate-900 transition hover:bg-slate-50 hover:border-slate-200">
                    <span className="flex h-6 w-6 items-center justify-center">{typeof button.icon === "string" ? <span className="font-black text-lg">{button.icon}</span> : button.icon}</span>
                    {button.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">Already have an account? <Link to="/login" className="font-bold text-slate-950 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-950 transition">Login</Link></p>
        </div>
      </section>

      <section className="relative hidden overflow-hidden lg:flex lg:items-center lg:justify-center">
        {/* Full-bleed background image */}
        <div className="absolute inset-0 z-0">
          <img src="/impact.png" alt="Community Impact" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-2xl px-12 text-center lg:text-left">
          <div className="space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-amber-400">Start your journey</p>
            <h2 className="text-5xl font-black leading-[1] tracking-tighter text-white lg:text-6xl">
              Golf for <br />
              <span className="text-amber-400">Impact.</span>
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-slate-200 font-medium">
              Join a community where your passion for the game fuels meaningful contributions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
