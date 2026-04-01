import { CalendarClock, Edit3, HeartHandshake, Sparkles, Target, Trophy, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProfileUpdateModal } from "../components/ProfileUpdateModal.jsx";
import { StatCard } from "../components/StatCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { charityService } from "../services/charityService.js";
import { drawService } from "../services/drawService.js";
import { scoreService } from "../services/scoreService.js";
import { subscriptionService } from "../services/subscriptionService.js";
import { formatDate } from "../utils/formatters.js";

export const DashboardPage = () => {
  const { user, setUser } = useAuth();
  const [scores, setScores] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [draw, setDraw] = useState(null);
  const [charities, setCharities] = useState([]);
  const [lifetimeWinnings, setLifetimeWinnings] = useState({ totalWon: 0, wonDrawsCount: 0 });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [proof, setProof] = useState("");
  const [isSubmittingProof, setIsSubmittingProof] = useState(false);

  const loadDashboardData = async () => {
    const [scoreData, subscriptionData, drawData, charityData, winningsData] = await Promise.all([
      scoreService.list(),
      subscriptionService.myStatus(),
      drawService.latest().catch(() => ({ draw: null })),
      charityService.list(),
      drawService.myWinnings().catch(() => ({ totalWon: 0, wonDrawsCount: 0 }))
    ]);

    setScores(scoreData.scores || []);
    setSubscription(subscriptionData.subscription || null);
    setDraw(drawData.draw || null);
    setCharities(charityData.charities || []);
    setLifetimeWinnings(winningsData);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleProofSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingProof(true);
    try {
      await drawService.submitProof(proof);
      setProof("");
      loadDashboardData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingProof(false);
    }
  };

  const selectedCharity = charities.find((charity) => charity._id === user?.selectedCharity);
  const scoreAverage = scores.length ? Math.round(scores.reduce((sum, item) => sum + item.score, 0) / scores.length) : 0;
  const upcomingState = scores.length === 5 && user?.subscriptionStatus === "active" ? "Eligible for next draw" : "Action needed";
  const readinessCopy = scores.length === 5
    ? "Your latest five rounds are stored, so your score side is ready for the next draw cycle."
    : `Add ${5 - scores.length} more score(s) to complete your five-round participation set.`;

  return (
    <main className="page-shell space-y-8 lg:space-y-10">
      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(135deg,#0f172a,#11263a,#103c38)] p-8 text-white shadow-[0_28px_90px_rgba(15,23,42,0.18)] lg:p-10">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-sky-400/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-emerald-300/10 blur-3xl" />
          <div className="relative space-y-6">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-sky-100 backdrop-blur">
                <Sparkles size={16} className="text-amber-300" />
                Member dashboard
              </div>
              <button onClick={() => setShowProfileModal(true)} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">
                <Edit3 size={16} /> Edit Profile
              </button>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white lg:text-5xl">
                {user?.name}, your support and score activity are all in one place.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-200 lg:text-lg">
                This dashboard is designed to feel less like a spreadsheet and more like a member home base. Track your charity route, score readiness, subscription health, and draw momentum from one screen.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Subscription</p>
                <p className="mt-3 text-2xl font-semibold text-white">{user?.subscriptionStatus === "active" ? "Active" : "Inactive"}</p>
                <p className="mt-2 text-sm text-slate-300">{user?.subscriptionStatus === "active" ? `Active till: ${formatDate(user?.subscriptionRenewalDate)}` : "Inactive"}</p>
          </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Selected charity</p>
                <p className="mt-3 text-2xl font-semibold text-white">{selectedCharity?.name || "Not chosen"}</p>
                <p className="mt-2 text-sm text-slate-300">{user?.charityContributionPercentage || 10}% contribution route</p>
        </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-amber-300 to-rose-300 p-5 text-slate-950">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-700">Next draw</p>
                <p className="mt-3 text-2xl font-semibold">{upcomingState}</p>
                <p className="mt-2 text-sm text-slate-700">{scores.length}/5 scores stored</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/scores" className="rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-100">Update scores</Link>
              <Link to="/charities" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">Adjust charity</Link>
              <Link to="/subscription" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">Review membership</Link>
            </div>
          </div>
        </div>

        <div className="glass-card p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Performance board</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">A quick read on where you stand today</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">Live</span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Average score</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{scoreAverage || "-"}</p>
              <p className="mt-2 text-sm text-slate-600">Based on your currently stored rounds.</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Latest draw</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">{draw ? draw.numbers.join(" - ") : "Pending"}</p>
              <p className="mt-2 text-sm text-slate-600">{draw ? `Published ${formatDate(draw.createdAt)}` : "No published draw yet"}</p>
            </div>
          </div>
          <div className="mt-4 rounded-[1.75rem] border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-900">
            <span className="font-semibold">Readiness note:</span> {readinessCopy}
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Subscription" value={user?.subscriptionStatus === "active" ? `Active till: ${formatDate(user?.subscriptionRenewalDate)}` : "Inactive"} hint={subscription?.plan || "No plan yet"} />
        <StatCard label="Selected charity" value={selectedCharity?.name || "Not selected"} hint={`${user?.charityContributionPercentage || 10}% contribution`} />
        <StatCard label="Latest draw" value={draw ? draw.numbers.join(" - ") : "Pending"} hint={draw ? formatDate(draw.createdAt) : "No published draw yet"} />
        <StatCard label="Total Lifetime Won" value={`₹${lifetimeWinnings.totalWon.toLocaleString()}`} hint={`${lifetimeWinnings.wonDrawsCount} winning draws`} />
      </section>

      <section className="glass-card p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between border-b border-slate-200 pb-5">
          <h2 className="text-2xl font-semibold text-slate-900">Draw Result Section</h2>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">This Month</span>
        </div>
        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          <div className="flex-1 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 flex flex-col justify-center items-center text-center">
            <p className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-2">This Month Draw</p>
            <p className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              {draw ? `[${draw.numbers.join(", ")}]` : "Pending"}
            </p>
          </div>
          
          <div className="flex-1 w-full rounded-[1.5rem] border border-sky-100 bg-sky-50/50 p-6 flex flex-col justify-center items-center text-center">
            {(() => {
              if (!draw) return <p className="text-slate-600 mt-4">Draw hasn't occurred yet.</p>;
              const userWin = draw.winners?.find(w => w.userId === (user?.id || user?._id));
              if (userWin) {
                const prize = userWin.matches === 5 ? "50,000" : userWin.matches === 4 ? "3,500" : "2,500";
                return (
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-slate-700 mb-1">Your Matches: <span className="text-emerald-600">{userWin.matches}</span></p>
                    <p className="text-xl font-bold text-emerald-600 mb-2">Status: Winner 🎉</p>
                    <p className="text-2xl font-bold text-slate-900">Result: You won ₹{prize}</p>
                    
                    {!userWin.proof ? (
                      <form onSubmit={handleProofSubmit} className="mt-4 flex flex-col gap-3">
                        <label className="text-xs font-bold text-slate-500 uppercase">Submit Proof of Win (URL/ID)</label>
                        <div className="flex gap-2">
                          <input required className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" placeholder="Evidence URL" value={proof} onChange={e => setProof(e.target.value)} />
                          <button disabled={isSubmittingProof} type="submit" className="rounded-xl bg-slate-950 px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-50">
                            <Upload size={16} />
                          </button>
                        </div>
                      </form>
                    ) : (
                      <p className="text-xs mt-3 text-emerald-700 font-semibold">Proof Submitted ✅</p>
                    )}
                  </div>
                );
              }
              const maxMatchesStr = "Not enough matches to win";
              return (
                <>
                  <p className="text-base font-semibold text-slate-600 mb-2">Your Matches:<br />{maxMatchesStr}</p>
                  <p className="text-xl font-bold text-slate-900">Result: Better luck next time!</p>
                </>
              );
            })()}
              </div>

          <div className="flex-1 w-full rounded-[1.5rem] border border-amber-100 bg-amber-50/30 p-6 flex flex-col justify-center">
            <p className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-4 text-center lg:text-left">Prize Distribution</p>
            <ul className="space-y-3 text-sm font-medium text-slate-700">
              <li className="flex justify-between border-b border-amber-100 pb-2"><span>5 Match</span> <span className="text-amber-600 font-bold">40% (Jackpot)</span></li>
              <li className="flex justify-between border-b border-amber-100 pb-2"><span>4 Match</span> <span className="text-slate-900">35%</span></li>
              <li className="flex justify-between"><span>3 Match</span> <span className="text-slate-900">25%</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="glass-card p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Your draw status</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">Live</span>
            </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"><CalendarClock className="mt-1 text-sky-600" size={18} /><div><p className="font-semibold text-slate-900">Renewal date</p><p className="mt-1 text-sm leading-6 text-slate-600">{formatDate(user?.subscriptionRenewalDate)}</p></div></div>
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"><HeartHandshake className="mt-1 text-rose-500" size={18} /><div><p className="font-semibold text-slate-900">Selected charity</p><p className="mt-1 text-sm leading-6 text-slate-600">{selectedCharity?.name || "Choose one to activate your charity contribution route"}</p></div></div>
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"><Target className="mt-1 text-amber-500" size={18} /><div><p className="font-semibold text-slate-900">Draw eligibility</p><p className="mt-1 text-sm leading-6 text-slate-600">{readinessCopy}</p></div></div>
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <Trophy className="mt-1 text-emerald-600" size={18} />
              <div>
                <p className="font-semibold text-slate-900">Prize status</p>
                <div className="mt-1 text-sm leading-6 text-slate-600">
                  {(() => {
                    const userWin = draw?.winners?.find((w) => w.userId === user?.id || w.userId === user?._id);
                    if (userWin) {
                      const amount = userWin.matches === 5 ? "₹50,000" : userWin.matches === 4 ? "₹3,500" : "₹2,500";
                      const statusColor = userWin.paymentStatus === "paid" ? "text-emerald-600 font-semibold" 
                                        : userWin.paymentStatus === "rejected" ? "text-rose-600 font-semibold" 
                                        : "text-amber-600 font-semibold";
                      
                      return (
                        <div className="space-y-1">
                          <p>You won <span className="font-semibold text-slate-900">{amount}</span> for {userWin.matches} matches!</p>
                          <p>Status: <span className={`uppercase text-xs tracking-wider ${statusColor}`}>{userWin.paymentStatus}</span></p>
                          {userWin.proof && <p className="text-xs text-sky-600">Proof submitted: <span className="font-mono">{userWin.proof}</span></p>}
                          {draw?.status === "draft" && <p className="text-xs italic text-slate-500">Awaiting official publish</p>}
                        </div>
                      );
                    }
                    return "No prize has been recorded for your account in the latest draw.";
                  })()}
                </div>
              </div>
                  </div>
                </div>
              </div>

        <div className="glass-card p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Latest scores</h2>
              <p className="mt-2 text-sm text-slate-600">Your most recent five stored rounds, shown in the order that matters for participation.</p>
            </div>
            <Link to="/scores" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">Manage</Link>
          </div>
          <div className="mt-6 space-y-3">
            {scores.length ? scores.map((entry, index) => (
              <div key={entry._id} className="flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <div>
                  <p className="font-semibold text-slate-900">Round {index + 1}: {entry.score}</p>
                  <p className="mt-1 text-sm text-slate-600">Played on {formatDate(entry.date)}</p>
                </div>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">Stored</span>
              </div>
            )) : <p className="text-slate-600">No scores added yet.</p>}
          </div>
        </div>
      </section>
      {showProfileModal && (
        <ProfileUpdateModal 
          user={user} 
          onClose={() => setShowProfileModal(false)} 
          onUpdate={(updatedUser) => setUser(updatedUser)} 
        />
      )}
    </main>
  );
};
