import { BadgeCheck, Heart, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { subscriptionService } from "../services/subscriptionService.js";

const plans = [
  {
    name: "monthly",
    label: "Monthly membership",
    headline: "Stay flexible",
    accent: "border-sky-200 bg-sky-50 text-sky-700",
    description: "A lower-friction way to join quickly and start logging scores.",
    benefits: ["Full score entry access", "Monthly draw participation", "Charity-linked subscription"]
  },
  {
    name: "yearly",
    label: "Yearly membership",
    headline: "Commit to impact",
    accent: "border-amber-200 bg-amber-50 text-amber-700",
    description: "The strongest fit for committed supporters who want continuity and better long-term value.",
    benefits: ["Lower effective annual cost", "Best for consistent participation", "Stronger long-term charity support"]
  }
];

const pillars = [
  { icon: Heart, label: "Charity allocation built into every membership" },
  { icon: Trophy, label: "Access to monthly 3, 4, and 5-match draws" },
  { icon: Zap, label: "Fast Stripe checkout with scalable billing flow" }
];

export const SubscriptionPage = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [currentSubscription, setCurrentSubscription] = useState(null);

  useEffect(() => {
    subscriptionService.myStatus().then((data) => {
      setCurrentSubscription(data.subscription || null);
    });
  }, []);

  const handleCheckout = async (plan) => {
    const data = await subscriptionService.checkout(plan);
    setMessage(`Stripe session created for ${plan}. Redirecting...`);
    window.location.href = data.url;
  };

  const isActive = user?.subscriptionStatus === "active";
  const activePlanName = currentSubscription?.plan;

  return (
    <main className="page-shell space-y-8 lg:space-y-10">
      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(135deg,#0f172a,#15263b,#1f2d45)] p-8 text-white shadow-[0_28px_90px_rgba(15,23,42,0.18)] lg:p-10">
          <div className="absolute -left-12 top-10 h-44 w-44 rounded-full bg-sky-400/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />
          <div className="relative space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200">Membership engine</p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white lg:text-5xl">
              Subscription plans designed to feel smooth, clear, and worth supporting.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-200 lg:text-lg">
              The goal here is to present membership like a modern creator-support product: simple value framing, direct Stripe checkout, and visible impact through charity plus monthly draw access.
            </p>
            {message && <p className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">{message}</p>}
            <div className="flex flex-wrap gap-3">
              <div className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-slate-200">Monthly and yearly plan options</div>
              <div className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-slate-200">Stripe checkout and webhook updates</div>
              <div className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-slate-200">Built-in charity contribution</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Included with every plan</p>
          <div className="mt-6 space-y-4">
            {pillars.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <div className="rounded-2xl bg-sky-50 p-2 text-sky-700"><Icon size={16} /></div>
                <p className="text-sm leading-6 text-slate-700">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            Your selected charity receives a portion of each active membership, so the subscription layer always stays tied to real impact.
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {plans.map((plan) => {
          const isCurrentPlan = isActive && activePlanName === plan.name;
          const isUpgrade = isActive && activePlanName === "monthly" && plan.name === "yearly";
          const isDowngrade = isActive && activePlanName === "yearly" && plan.name === "monthly";

          return (
            <div key={plan.name} className={`glass-card p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)] transition ${isCurrentPlan ? "border-emerald-200 ring-2 ring-emerald-100" : "hover:-translate-y-1 hover:shadow-[0_28px_75px_rgba(15,23,42,0.10)]"}`}>
              <div className="flex items-center justify-between">
                <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${plan.accent}`}>{plan.label}</div>
                {isCurrentPlan && <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Active</span>}
              </div>
              <p className="mt-5 text-4xl font-semibold tracking-tight text-slate-950">{plan.headline}</p>
              <p className="mt-3 text-base leading-7 text-slate-600">{plan.description}</p>
              <div className="mt-6 space-y-3">
                {plan.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 text-sm text-slate-700">
                    <BadgeCheck size={16} className="text-emerald-600" />
                    {benefit}
                  </div>
                ))}
              </div>
              
              {isCurrentPlan ? (
                <button disabled className="mt-8 w-full rounded-2xl bg-emerald-50 px-4 py-3.5 font-semibold text-emerald-700 opacity-90 cursor-not-allowed">
                  Current Plan
                </button>
              ) : isDowngrade ? (
                <button disabled className="mt-8 w-full rounded-2xl bg-slate-50 px-4 py-3.5 font-semibold text-slate-400 cursor-not-allowed">
                  Included in Yearly
                </button>
              ) : (
                <button onClick={() => handleCheckout(plan.name)} className="mt-8 w-full rounded-2xl bg-slate-950 px-4 py-3.5 font-semibold text-white shadow-[0_16px_40px_rgba(15,23,42,0.14)] transition hover:bg-slate-800">
                  {isUpgrade ? "Upgrade to Yearly" : "Continue with Stripe"}
                </button>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
};
