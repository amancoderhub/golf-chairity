export const StatCard = ({ label, value, hint }) => (
  <div className="glass-card p-5">
    <p className="text-sm font-medium text-slate-500">{label}</p>
    <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
    {hint && <p className="mt-2 text-sm text-slate-600">{hint}</p>}
  </div>
);
