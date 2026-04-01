import { ArrowRight, CircleDollarSign, Heart, ShieldCheck, Sparkles, Star, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const impactStats = [
  { label: "Active member support", value: "10% min to charity" },
  { label: "Score entry system", value: "Latest 5 rounds" },
  { label: "Reward cadence", value: "Published monthly" }
];

const storyCards = [
  {
    icon: Heart,
    title: "A cause-first experience",
    copy: "The platform leads with human impact before sport mechanics so the purpose is clear from the first screen."
  },
  {
    icon: Trophy,
    title: "A game layer people understand",
    copy: "Add five scores, stay eligible, and follow draw status without having to decode complicated rules."
  },
  {
    icon: CircleDollarSign,
    title: "Membership that feels polished",
    copy: "Monthly and yearly plans are presented with the calm structure of a modern subscription product."
  }
];

const features = [
  {
    number: "01.",
    title: "Choose a membership",
    copy: "Join monthly or yearly and unlock the full charity, score, and draw flow."
  },
  {
    number: "02.",
    title: "Record your rounds",
    copy: "Store your latest five Stableford scores and keep your participation set current."
  },
  {
    number: "03.",
    title: "Back a real cause",
    copy: "Pick a charity and route part of each subscription payment to the mission you care about."
  },
  {
    number: "04.",
    title: "Stay draw-ready",
    copy: "Once your membership and scores are ready, you remain in line for the next published draw."
  }
];

const spotlightCards = [
  {
    title: "Monthly draw engine",
    copy: "Three clear prize tiers create ongoing momentum while keeping the rules easy to explain in your demo."
  },
  {
    title: "Clean Stripe flow",
    copy: "Payments feel calm and modern instead of looking like a technical billing form."
  },
  {
    title: "Visible charity impact",
    copy: "Members always know which cause they selected and what portion of support is being routed there."
  }
];

export const LandingPage = () => {
  return (
    <main className="space-y-0">
      <section className="relative overflow-hidden border-b border-black/5 bg-[radial-gradient(circle_at_top_left,rgba(254,240,138,0.30),transparent_20%),radial-gradient(circle_at_75%_18%,rgba(251,191,36,0.18),transparent_16%),linear-gradient(135deg,#f2f7ec_0%,#d7e6b9_44%,#eef5d8_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:34px_34px] opacity-30" />
        <div className="relative mx-auto flex min-h-[78vh] w-full max-w-7xl flex-col justify-center px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-16">
          <div className="grid gap-10 xl:grid-cols-[1.08fr_0.92fr] xl:items-end">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur animate-reveal">
                <Sparkles size={16} className="text-amber-500" />
                Charity-first membership for golfers who want purpose, rhythm, and rewards
              </div>
              <div className="space-y-5 animate-reveal stagger-1">
                <h1 className="display-hero max-w-5xl text-slate-950">
                  Support a cause. Track your rounds. Stay in the draw.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-700">
                  FairChance blends the emotional pull of an Omaze-style campaign, the smooth structure of a Patreon-style membership, and a simple score-based participation system designed for recurring engagement.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 animate-reveal stagger-2">
                <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 font-semibold text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800 animate-pulse-glow">
                  Get started
                  <ArrowRight size={18} />
                </Link>
                <Link to="/charities" className="rounded-full border border-black/10 bg-white/75 px-6 py-3.5 font-semibold text-slate-800 backdrop-blur transition hover:bg-white">
                  Explore charities
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 animate-reveal stagger-3">
                {impactStats.map((item) => (
                  <div key={item.label} className="rounded-[1.75rem] border border-black/8 bg-white/72 p-5 backdrop-blur shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="mt-3 text-xl font-semibold leading-snug text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-4 hidden rounded-full bg-amber-300/20 blur-[80px] transition duration-1000 group-hover:bg-emerald-400/20 lg:block" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-black/8 bg-slate-900 shadow-[0_35px_90px_rgba(15,23,42,0.12)] transition duration-700 group-hover:shadow-[0_45px_100px_rgba(15,23,42,0.20)] animate-reveal stagger-2">
                <img src="/hero.png" alt="Golf course at golden hour" className="h-[600px] w-full object-cover transition duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white backdrop-blur-md transition duration-500 hover:bg-white/15 stagger-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-amber-300">Campaign spotlight</p>
                        <h2 className="mt-3 text-3xl font-semibold leading-tight">A beautifully smooth reason to return.</h2>
                      </div>
                      <div className="rounded-2xl bg-white/20 p-3 text-amber-300">
                        <Star size={18} />
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <div className="rounded-xl bg-black/30 px-4 py-2 text-sm font-medium text-slate-200">3-match tier</div>
                      <div className="rounded-xl bg-black/30 px-4 py-2 text-sm font-medium text-slate-200">4-match tier</div>
                      <div className="rounded-xl border border-amber-500/30 bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-200">Jackpot</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -left-10 top-20 hidden md:block transition duration-700 hover:-translate-y-1 animate-float">
                {storyCards.slice(0,1).map(({ icon: Icon, title, copy }) => (
                  <article key={title} className="w-64 rounded-[1.5rem] border border-white/40 bg-white/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-md">
                    <div className="inline-flex rounded-xl bg-rose-50 p-2.5 text-rose-600"><Icon size={18} /></div>
                    <h3 className="mt-3 text-base font-semibold text-slate-900">{title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_30%),linear-gradient(180deg,#dce9be_0%,#d4e2b0_100%)] py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-600">Explore the flow</p>
              <h2 className="mt-3 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                A clearer membership journey from signup to draw participation.
              </h2>
            </div>
            <p className="hidden max-w-sm pt-4 text-base leading-7 text-slate-700 lg:block">
              The experience is broken into visible steps so your assignment demo feels intuitive instead of over-explained.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((item, idx) => (
              <article key={item.number} className={`rounded-[2rem] border border-black/8 bg-white/82 p-6 backdrop-blur shadow-[0_18px_50px_rgba(15,23,42,0.06)] animate-reveal stagger-${idx + 1}`}>
                <p className="text-2xl font-medium text-slate-400">{item.number}</p>
                <h3 className="mt-5 text-2xl font-semibold leading-tight text-slate-950">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about-us" className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8">
          <div className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)] transition duration-700 hover:shadow-[0_40px_100px_rgba(15,23,42,0.12)]">
            <img src="/impact.png" alt="Golf ball on tee representing impact" className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/80 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-8 text-white sm:p-10">
              <p className="inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                <Heart size={14} className="text-rose-400" /> Why it stands out
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">Not a typical golf website. A platform that moves people.</h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-200">
                The visual direction avoids sports cliches, leaning into human warmth, trust, and premium modern product storytelling. Designed to be memorable from the first glance.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white/40 p-8 backdrop-blur-md shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition duration-500 hover:-translate-y-1.5 hover:bg-white/60 hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
              <ShieldCheck className="text-slate-900 transition-transform duration-500 group-hover:scale-110" size={22} />
              <h3 className="mt-5 text-2xl font-bold leading-tight text-slate-950 tracking-tight">Clean subscription trust</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">Stripe-backed payments, clear plan choices, and a calmer layout make the product feel safer and more premium.</p>
            </div>
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white/40 p-8 backdrop-blur-md shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition duration-500 hover:-translate-y-1.5 hover:bg-white/60 hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
              <Heart className="text-rose-500 transition-transform duration-500 group-hover:scale-110" size={22} />
              <h3 className="mt-5 text-2xl font-bold leading-tight text-slate-950 tracking-tight">Visible cause selection</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">Members can see their chosen charity clearly, which makes the giving side feel real instead of decorative.</p>
            </div>
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white/40 p-9 backdrop-blur-md shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition duration-500 hover:-translate-y-1.5 hover:bg-white/60 hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)] sm:col-span-2">
              <Trophy className="text-amber-500 transition-transform duration-500 group-hover:scale-110" size={22} />
              <h3 className="mt-5 text-3xl font-bold leading-tight text-slate-950 tracking-tight">Simple draw mechanics for a better demo</h3>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">The monthly draw layer gives the product energy, while the latest-five-scores rule keeps the logic explainable in seconds during review.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-us" className="bg-[linear-gradient(180deg,#fffdf7_0%,#f5f8ef_100%)] py-16 lg:py-24">
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white/70 p-8 backdrop-blur-xl shadow-[0_30px_90px_rgba(15,23,42,0.06)] transition duration-700 hover:bg-white/80 sm:p-10">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-gradient-to-br from-amber-100/40 via-sky-100/20 to-transparent opacity-60 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <p className="inline-flex w-max items-center gap-2 rounded-full border border-amber-200/60 bg-amber-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 backdrop-blur">
                <ShieldCheck size={14} className="text-amber-500" /> Membership structure
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 lg:text-5xl">Built with the calm feel of a creator subscription.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-700 font-medium">Monthly and yearly plans are framed as simple support choices, not a cluttered pricing table. That keeps the subscription layer persuasive and clean.</p>
              <div className="mt-8 space-y-4">
                <div className="group rounded-[1.5rem] border border-white/60 bg-white/60 p-5 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-sky-300/60 hover:shadow-[0_20px_40px_rgba(14,165,233,0.1)]">
                  <div className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-sky-600 font-semibold"><CircleDollarSign size={16} /> Monthly plan</div>
                  <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">Flexible and easy to start</p>
                  <p className="mt-2 leading-relaxed text-slate-600">Ideal for first-time members who want to support a cause and enter the next draw cycle quickly.</p>
                </div>
                <div className="group rounded-[1.5rem] border border-white/60 bg-white/60 p-5 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-amber-300/60 hover:shadow-[0_20px_40px_rgba(245,158,11,0.1)]">
                  <div className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-amber-600 font-semibold"><Trophy size={16} /> Yearly plan</div>
                  <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">Longer-term impact, lower friction</p>
                  <p className="mt-2 leading-relaxed text-slate-600">Best for members who want steadier charity support and a cleaner renewal rhythm all year.</p>
                </div>
              </div>
            </div>
          </div>

          <div id="help-center" className="group relative flex flex-col justify-end overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-950 p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.16)] transition duration-700 hover:shadow-[0_45px_100px_rgba(15,23,42,0.22)] sm:p-10">
            <img src="/membership.png" alt="Premium membership" className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-1000 group-hover:scale-110 group-hover:opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent pointer-events-none" />
            <div className="relative">
              <p className="inline-flex w-max items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200 backdrop-blur">
                <Sparkles size={14} className="text-sky-300" /> Ready to join
              </p>
              <h2 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">Support a mission, record your rounds, and stay ready for the next draw.</h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">This home page is now shaped to feel more engaging and presentation-friendly: big campaign language, smoother surfaces, and a clearer product story.</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-slate-950 transition hover:bg-slate-100 hover:scale-105 duration-300">
                  Start now
                  <ArrowRight size={18} />
                </Link>
                <Link to="/subscription" className="rounded-full border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20 hover:border-white/30 duration-300">
                  View membership plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
