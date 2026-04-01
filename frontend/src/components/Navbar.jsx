import { HeartHandshake, LayoutDashboard, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const appNavClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? "bg-white text-slate-950 shadow-sm" : "text-slate-200 hover:bg-white/10 hover:text-white"}`;

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isPublicTheme = ["/", "/login", "/signup", "/forgot-password", "/reset-password"].includes(location.pathname);

  const publicAppNavClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? "bg-slate-900 text-white shadow-sm" : "text-slate-700 hover:bg-black/5 hover:text-slate-950"}`;

  const publicLinkClass = "text-sm font-medium text-slate-700 transition hover:text-slate-950";

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`sticky top-0 z-40 ${isPublicTheme ? "border-b border-black/5 bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(15,23,42,0.05)]" : "border-b border-slate-800 bg-[#0b1220] shadow-lg shadow-slate-900/10"}`}>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <img src="/logo.png" alt="FairChance Logo" className="h-12 w-auto object-contain drop-shadow-sm" />
            <div>
              <p className={`text-lg font-semibold tracking-tight ${isPublicTheme ? "text-slate-950" : "text-white"}`}>FairChance</p>
              <p className={`text-xs font-medium ${isPublicTheme ? "text-slate-500" : "text-slate-400"}`}>Golf for impact</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-2 md:flex">
            <NavLink to="/" className={isPublicTheme ? publicAppNavClass : appNavClass}>Home</NavLink>
            {!user && <a href="/#about-us" className={isPublicTheme ? publicLinkClass : "text-sm font-medium text-slate-200 transition hover:text-white"}>About Us</a>}
            {!user && <a href="/#contact-us" className={isPublicTheme ? publicLinkClass : "text-sm font-medium text-slate-200 transition hover:text-white"}>Contact Us</a>}
            {!user && <a href="/#help-center" className={isPublicTheme ? publicLinkClass : "text-sm font-medium text-slate-200 transition hover:text-white"}>Help</a>}
            {user && <NavLink to="/dashboard" className={isPublicTheme ? publicAppNavClass : appNavClass}>Dashboard</NavLink>}
            {user && <NavLink to="/scores" className={isPublicTheme ? publicAppNavClass : appNavClass}>Scores</NavLink>}
            {user && <NavLink to="/charities" className={isPublicTheme ? publicAppNavClass : appNavClass}>Charities</NavLink>}
            {user && <NavLink to="/subscription" className={isPublicTheme ? publicAppNavClass : appNavClass}>Subscription</NavLink>}
            {user?.role === "admin" && <NavLink to="/admin" className={isPublicTheme ? publicAppNavClass : appNavClass}>Admin</NavLink>}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className={`hidden rounded-full border px-4 py-2 text-sm font-medium lg:flex lg:items-center lg:gap-2 ${isPublicTheme ? "border-slate-200 bg-slate-50 text-slate-600" : "border-white/10 bg-white/[0.04] text-slate-300"}`}>
                  {user.role === "admin" ? <ShieldCheck size={16} /> : <LayoutDashboard size={16} />}
                  {user.name}
                </div>
                <button 
                  onClick={logout} 
                  className={`hidden rounded-full px-4 py-2 text-sm font-semibold transition md:block ${isPublicTheme ? "bg-slate-950 text-white hover:bg-slate-800" : "bg-white text-slate-900 hover:opacity-90"}`}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="hidden items-center gap-3 md:flex">
                <Link to="/login" className={`text-sm font-medium transition ${isPublicTheme ? "text-slate-700 hover:text-slate-950" : "text-slate-200 hover:text-white"}`}>Login</Link>
                <Link to="/signup" className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isPublicTheme ? "bg-slate-950 text-white hover:bg-slate-800" : "bg-white text-slate-900 hover:opacity-90"}`}>Start Now</Link>
              </div>
            )}

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border md:hidden ${isPublicTheme ? "border-slate-200 text-slate-900" : "border-white/10 text-white"}`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Move outside sticky header to avoid backdrop-filter stacking issues */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 top-[80px] z-[9999] md:hidden border-t border-slate-200"
          style={{ backgroundColor: isPublicTheme ? '#ffffff' : '#0b1220' }}
        >
          <nav className="flex h-full flex-col gap-4 overflow-y-auto p-6 pb-24">
            <NavLink onClick={closeMenu} to="/" className={isPublicTheme ? publicAppNavClass : appNavClass}>Home</NavLink>
            {user && (
              <>
                <NavLink onClick={closeMenu} to="/dashboard" className={isPublicTheme ? publicAppNavClass : appNavClass}>Dashboard</NavLink>
                <NavLink onClick={closeMenu} to="/scores" className={isPublicTheme ? publicAppNavClass : appNavClass}>Scores</NavLink>
                <NavLink onClick={closeMenu} to="/charities" className={isPublicTheme ? publicAppNavClass : appNavClass}>Charities</NavLink>
                <NavLink onClick={closeMenu} to="/subscription" className={isPublicTheme ? publicAppNavClass : appNavClass}>Subscription</NavLink>
                {user.role === "admin" && <NavLink onClick={closeMenu} to="/admin" className={isPublicTheme ? publicAppNavClass : appNavClass}>Admin Panel</NavLink>}
                <div className="my-2 h-px border-t border-slate-200" />
                <button onClick={() => { logout(); closeMenu(); }} className="flex w-full items-center justify-center rounded-2xl bg-rose-500 py-4 text-sm font-bold text-white shadow-lg shadow-rose-500/20 active:scale-95 transition-transform">
                  Logout
                </button>
              </>
            )}
            {!user && (
              <div className="mt-4 flex flex-col gap-4">
                <Link onClick={closeMenu} to="/login" className="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 py-4 text-sm font-bold text-slate-900 active:scale-95 transition-transform">Login</Link>
                <Link onClick={closeMenu} to="/signup" className="flex w-full items-center justify-center rounded-2xl bg-slate-950 py-4 text-sm font-bold text-white shadow-lg shadow-slate-950/20 active:scale-95 transition-transform">Start Now</Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </>
  );
};
