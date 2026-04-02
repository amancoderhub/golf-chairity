import { BarChart3, Heart, Plus, Settings2, ShieldCheck, Sparkles, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { authService } from "../services/authService.js";
import { charityService } from "../services/charityService.js";
import { drawService } from "../services/drawService.js";
import { scoreService } from "../services/scoreService.js";
import { formatDate } from "../utils/formatters.js";

export const AdminPanelPage = () => {
  const [users, setUsers] = useState([]);
  const [scores, setScores] = useState([]);
  const [charities, setCharities] = useState([]);
  const [draw, setDraw] = useState(null);
  const [simulationPhase, setSimulationPhase] = useState("numbers");
  const [newCharity, setNewCharity] = useState({ name: "", description: "", image: "" });

  const loadAdminData = async () => {
    const [userData, scoreData, drawData, charityData] = await Promise.all([
      authService.listUsers(),
      scoreService.adminList(),
      drawService.latest().catch(() => ({ draw: null })),
      charityService.list()
    ]);

    const drawObj = drawData.draw || null;
    setDraw(drawObj);
    if (drawObj?.status === "draft") {
      setSimulationPhase("numbers");
    } else {
      setSimulationPhase("winners");
    }
    setUsers(userData.users || []);
    setScores(scoreData.scores || []);
    setCharities(charityData.charities || []);
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleRunDraw = async () => {
    await drawService.run("random");
    loadAdminData();
  };

  const handlePublishDraw = async () => {
    if (draw?._id) {
      await drawService.publish(draw._id);
      loadAdminData();
    }
  };

  const handleUpdateRole = async (userId, role) => {
    await authService.updateRole(userId, role);
    loadAdminData();
  };

  const handleUpdateWinnerStatus = async (drawId, userId, status) => {
    await drawService.updateWinnerStatus(drawId, userId, status);
    loadAdminData();
  };

  const handleAddCharity = async (e) => {
    e.preventDefault();
    await charityService.create(newCharity);
    setNewCharity({ name: "", description: "", image: "" });
    loadAdminData();
  };

  const handleDeleteCharity = async (id) => {
    if (window.confirm("Are you sure you want to delete this charity?")) {
      await charityService.delete(id);
      loadAdminData();
    }
  };

  return (
    <main className="page-shell space-y-8 lg:space-y-12 pb-20 px-4 sm:px-6 lg:px-8">
      <section className="grid gap-6 grid-cols-1 xl:grid-cols-[0.34fr_0.66fr]">
        <aside className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(135deg,#0f172a,#13243a,#1e293b)] p-5 sm:p-7 text-white shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
          <div className="absolute -right-10 top-10 h-44 w-44 rounded-full bg-sky-400/12 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-sky-100 backdrop-blur">
              <Sparkles size={16} className="text-amber-300" />
              Admin control center
            </div>
            <h1 className="mt-5 text-2xl sm:text-3xl font-bold leading-tight text-white">Run the platform from one place.</h1>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              Review users, inspect score activity, launch the monthly draw, and monitor the latest winner state without leaving this page.
            </p>
            <div className="mt-7 space-y-3">
              {[
                [Users, "User management"],
                [Settings2, "Draw controls"],
                [ShieldCheck, "Winner verification"],
                [BarChart3, "Reports and analytics"]
              ].map(([Icon, label]) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-slate-200 backdrop-blur">
                  <Icon size={16} className="text-sky-300" />
                  {label}
                </div>
              ))}
            </div>
            <button onClick={handleRunDraw} className="mt-7 w-full rounded-2xl bg-white px-4 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-100">Run monthly draw</button>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="metric-tile rounded-[1.75rem]"><p className="text-sm text-slate-500">Total users</p><p className="mt-3 text-3xl font-semibold text-slate-900">{users.length}</p><p className="mt-2 text-sm text-slate-600">Registered member accounts</p></div>
            <div className="metric-tile rounded-[1.75rem]"><p className="text-sm text-slate-500">Scores stored</p><p className="mt-3 text-3xl font-semibold text-slate-900">{scores.length}</p><p className="mt-2 text-sm text-slate-600">Rounds available for review</p></div>
            <div className="metric-tile rounded-[1.75rem]"><p className="text-sm text-slate-500">Latest winners</p><p className="mt-3 text-3xl font-semibold text-slate-900">{draw?.winners?.length || 0}</p><p className="mt-2 text-sm text-slate-600">Most recent published draw</p></div>
          </section>

          <section className="glass-card overflow-hidden shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">User list</h2>
                <p className="mt-1 text-sm text-slate-600">Membership status, role, and account visibility.</p>
              </div>
              <span className="text-sm text-slate-500">Admin operations</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-950 text-slate-200">
                  <tr>
                    <th className="px-4 py-4 sm:px-6">Name</th>
                    <th className="px-4 py-4 sm:px-6 hidden md:table-cell">Email</th>
                    <th className="px-4 py-4 sm:px-6">Role</th>
                    <th className="px-4 py-4 sm:px-6 hidden sm:table-cell">Subscription</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((entry) => (
                    <tr key={entry._id} className="border-t border-slate-200 bg-white">
                      <td className="px-4 py-4 sm:px-6 text-slate-900">
                        <div className="font-medium">{entry.name}</div>
                        <div className="text-xs text-slate-500 md:hidden">{entry.email}</div>
                      </td>
                      <td className="px-4 py-4 sm:px-6 text-slate-700 hidden md:table-cell">{entry.email}</td>
                      <td className="px-4 py-4 sm:px-6 text-slate-700">
                        <div className="flex items-center gap-3">
                          <span className={entry.role === 'admin' ? "font-semibold text-slate-900" : ""}>{entry.role}</span>
                          {entry.role === 'user' && (
                            <button onClick={() => handleUpdateRole(entry._id, "admin")} className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                              Promote
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 sm:px-6 text-slate-700 hidden sm:table-cell">
                        {entry.subscriptionStatus === "active" ? `Till: ${formatDate(entry.subscriptionRenewalDate)}` : "Inactive"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>

      <section className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="glass-card overflow-hidden shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <div className="border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
            <h2 className="text-xl font-semibold text-slate-900">Score management</h2>
            <p className="mt-1 text-sm text-slate-600">View the stored rounds tied to each account.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-200">
                <tr>
                  <th className="px-4 py-4 sm:px-6">User</th>
                  <th className="px-4 py-4 sm:px-6 hidden sm:table-cell">Email</th>
                  <th className="px-4 py-4 sm:px-6">Score</th>
                  <th className="px-4 py-4 sm:px-6 hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((entry) => (
                  <tr key={entry._id} className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-4 sm:px-6 text-slate-900">
                      <div>{entry.userId?.name || "Unknown"}</div>
                      <div className="text-xs text-slate-500 sm:hidden">{entry.userId?.email || "Unknown"}</div>
                    </td>
                    <td className="px-4 py-4 sm:px-6 text-slate-700 hidden sm:table-cell">{entry.userId?.email || "Unknown"}</td>
                    <td className="px-4 py-4 sm:px-6 text-slate-700 font-semibold">{entry.score}</td>
                    <td className="px-4 py-4 sm:px-6 text-slate-700 hidden md:table-cell">{formatDate(entry.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-5 sm:p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-semibold text-slate-900">Latest draw result</h2>
          {!draw ? <p className="mt-4 text-slate-600">No draw has been run yet.</p> : (
            <div className="mt-5 space-y-4">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">Numbers</p>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${draw.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {draw.status === "published" ? "PUBLISHED 🟢" : "PENDING 🟡"}
                  </span>
                </div>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{draw.numbers.join(" - ")}</p>
                <p className="mt-2 text-sm text-slate-600">Generated on {formatDate(draw.createdAt)}</p>
                {draw.status === "draft" && simulationPhase === "numbers" ? (
                  <button onClick={() => setSimulationPhase("winners")} className="mt-4 w-full rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700">
                    Simulate Results
                  </button>
                ) : draw.status === "draft" && simulationPhase === "winners" ? (
                  <button onClick={handlePublishDraw} className="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800">
                    Publish Result
                  </button>
                ) : null}
              </div>

              {(simulationPhase === "winners" || draw.status === "published") && (
                <div className="mt-6">
                  <h3 className="mb-3 text-lg font-semibold text-slate-900">Winner Verification</h3>
                  {(draw.winners || []).length ? (
                    <div className="space-y-4">
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                        <p className="font-semibold text-slate-900 mb-2">Winners:</p>
                        {draw.winners.map(w => {
                           const prizeAmt = w.matches === 5 ? "₹50000" : w.matches === 4 ? "₹3500" : "₹2500";
                           return <p key={`text-${w.userId}`} className="text-sm font-medium text-emerald-800">{w.userName} → {w.matches} Matches → {prizeAmt}</p>;
                        })}
                      </div>
                      <div className="overflow-x-auto rounded-[1.5rem] border border-slate-200 bg-white">
                        <table className="min-w-full text-left text-sm">
                          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                             <tr>
                               <th className="px-4 py-3 font-medium">User</th>
                               <th className="px-4 py-3 font-medium">Matches</th>
                               <th className="px-4 py-3 font-medium">Status</th>
                               <th className="px-4 py-3 font-medium">Action</th>
                             </tr>
                          </thead>
                          <tbody>
                            {draw.winners.map((winner) => (
                             <tr key={`${winner.userId}-${winner.matches}`} className="border-t border-slate-200">
                               <td className="px-4 py-3 text-slate-900 font-medium">{winner.userName}</td>
                               <td className="px-4 py-3 text-slate-700">{winner.matches}</td>
                               <td className="px-4 py-3 text-slate-700 capitalize">{winner.paymentStatus}</td>
                               <td className="px-4 py-3 text-slate-700">
                                  {winner.paymentStatus === "pending" && draw.status === "published" && (
                                     <div className="flex gap-2">
                                       <button onClick={() => handleUpdateWinnerStatus(draw._id, winner.userId, "paid")} className="text-xs font-semibold px-2 py-1 rounded bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Approve</button>
                                       <button onClick={() => handleUpdateWinnerStatus(draw._id, winner.userId, "rejected")} className="text-xs font-semibold px-2 py-1 rounded bg-rose-100 text-rose-700 hover:bg-rose-200">Reject</button>
                                     </div>
                                  )}
                                  {winner.paymentStatus !== "pending" && <span className="text-xs text-slate-500">Processed</span>}
                                  {draw.status === "draft" && <span className="text-xs text-slate-500 italic">Available after publish</span>}
                               </td>
                             </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  ) : <p className="text-slate-600">No winners this month — jackpot rolls over</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <hr className="border-slate-200" />

      <section className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="glass-card p-5 sm:p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Charity directory</h2>
              <p className="mt-1 text-sm text-slate-600">Manage charity listings for the platform.</p>
            </div>
          </div>
          
          <form onSubmit={handleAddCharity} className="mb-8 space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Add new charity</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Name" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none" value={newCharity.name} onChange={e => setNewCharity({...newCharity, name: e.target.value})} />
              <input required placeholder="Img URL" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none" value={newCharity.image} onChange={e => setNewCharity({...newCharity, image: e.target.value})} />
            </div>
            <textarea required placeholder="Description" rows={2} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none" value={newCharity.description} onChange={e => setNewCharity({...newCharity, description: e.target.value})} />
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white hover:bg-slate-800">
              <Plus size={18} /> Publish to directory
            </button>
          </form>

          <div className="space-y-3">
            {charities.map(c => (
              <div key={c._id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-4">
                  <img src={c.image} className="h-12 w-12 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-500 line-clamp-1">{c.description}</p>
                  </div>
                </div>
                <button onClick={() => handleDeleteCharity(c._id)} className="rounded-full p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 sm:p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-semibold text-slate-900">Platform Insights</h2>
          <p className="mt-1 text-sm text-slate-600">Overview of impact and revenue distributions.</p>
          
          <div className="mt-8 space-y-6">
            <div className="rounded-3xl bg-slate-950 p-5 sm:p-6 text-white shadow-xl">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-rose-500/20 p-2 text-rose-400"><Heart size={20} /></div>
                <p className="text-sm font-medium text-slate-400">Total Charity Impact</p>
              </div>
              <p className="mt-4 text-4xl font-bold tracking-tight">₹{(users.filter(u => u.subscriptionStatus === 'active').length * 499 * 0.1).toLocaleString() || 0}*</p>
              <p className="mt-2 text-xs text-slate-500">*Estimated based on 10% min contribution from active subs.</p>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Monthly Revenue</p>
                <p className="mt-3 text-2xl font-bold text-slate-900">₹{(users.filter(u => u.subscriptionStatus === 'active').length * 499).toLocaleString()}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Active Draw Pool</p>
                <p className="mt-3 text-2xl font-bold text-slate-900">₹{(users.filter(u => u.subscriptionStatus === 'active').length * 100).toLocaleString()}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-slate-900">Distribution Overview</h3>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Prizes", value: "20%", color: "bg-sky-500" },
                  { label: "Charity", value: "10-20%", color: "bg-rose-500" },
                  { label: "Operations", value: "60-70%", color: "bg-slate-400" }
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1.5"><span className="text-slate-600">{item.label}</span><span className="font-bold text-slate-900">{item.value}</span></div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden"><div className={`h-full ${item.color}`} style={{width: item.value.replace('%', '').split('-')[0] + '%'}} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

