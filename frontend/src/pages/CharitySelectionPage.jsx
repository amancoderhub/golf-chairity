import { HeartHandshake, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { charityService } from "../services/charityService.js";

export const CharitySelectionPage = () => {
  const { user, setUser } = useAuth();
  const [charities, setCharities] = useState([]);
  const [contribution, setContribution] = useState(user?.charityContributionPercentage || 10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    charityService.list().then((data) => setCharities(data.charities || []));
  }, []);

  const filteredCharities = useMemo(
    () => charities.filter((charity) => charity.name.toLowerCase().includes(search.toLowerCase())),
    [charities, search]
  );

  const handleSelect = async (charityId) => {
    const data = await charityService.select({
      charityId,
      charityContributionPercentage: Number(contribution)
    });
    setUser(data.user);
  };

  return (
    <main className="page-shell space-y-8 lg:space-y-10">
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(135deg,#fff4f5,#ffffff,#eff7ff)] p-8 shadow-[0_28px_90px_rgba(15,23,42,0.08)] lg:p-10">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-rose-200/40 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-sky-200/30 blur-3xl" />
          <div className="relative space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-sm font-medium text-rose-700 backdrop-blur">
              <Sparkles size={16} />
              Charity directory
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-slate-950 lg:text-5xl">
              Choose the cause that receives part of every membership payment.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 lg:text-lg">
              This page is built to make charity selection feel meaningful instead of hidden. Browse, compare, and decide how much of your active membership should be routed to the cause you support.
            </p>
          </div>
        </div>

        <div className="glass-card p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Contribution setting</p>
          <p className="mt-4 text-5xl font-semibold tracking-tight text-slate-950">{contribution}%</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Minimum contribution is 10% of the subscription fee. Increase it if you want your membership to direct more support toward the selected cause.</p>
          <input min="10" max="100" type="range" className="mt-6 w-full" value={contribution} onChange={(e) => setContribution(e.target.value)} />
          <div className="mt-5 rounded-[1.5rem] border border-rose-200 bg-rose-50 p-5 text-sm leading-6 text-rose-900">
            Once you choose a charity, this percentage becomes part of your visible member profile and dashboard summary.
          </div>
        </div>
      </section>

      <div className="glass-card flex flex-col gap-4 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center sm:justify-between">
        <label className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-600">
          <Search size={16} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search charities" className="w-full bg-transparent text-slate-800 outline-none placeholder:text-slate-400" />
        </label>
        <p className="text-sm text-slate-600">{filteredCharities.length} charities available</p>
      </div>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredCharities.length ? filteredCharities.map((charity) => {
          const selected = user?.selectedCharity === charity._id;
          return (
            <article key={charity._id} className="glass-card overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_75px_rgba(15,23,42,0.10)]">
              <img src={charity.image} alt={charity.name} className="h-56 w-full object-cover" />
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-slate-900">{charity.name}</h2>
                  {selected && <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">Selected</span>}
                </div>
                <p className="text-sm leading-7 text-slate-600">{charity.description}</p>
                <div className="rounded-[1.5rem] bg-slate-50 p-4 text-sm text-slate-700">
                  <div className="flex items-center gap-2 font-medium text-slate-900"><HeartHandshake size={16} /> Your contribution</div>
                  <p className="mt-2 leading-6">{contribution}% of your subscription will be allocated to this cause.</p>
                </div>
                <button onClick={() => handleSelect(charity._id)} className={`w-full rounded-2xl px-4 py-3.5 font-semibold transition ${selected ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-slate-950 text-white hover:bg-slate-800"}`}>
                  {selected ? "Currently supporting" : "Support this charity"}
                </button>
              </div>
            </article>
          );
        }) : (
          <div className="glass-card md:col-span-2 xl:col-span-3 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">No charities found</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Seed sample charities first</h2>
            <p className="mt-3 max-w-2xl text-slate-600">This page becomes usable after sample charity records are added to the database. Run the charity seeder once, then refresh this page.</p>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4 font-mono text-sm text-slate-700">npm.cmd run seed:charities -w backend/services/game-service</div>
          </div>
        )}
      </section>
    </main>
  );
};
