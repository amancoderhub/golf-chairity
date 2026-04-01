import { Facebook, HeartHandshake, Instagram, Linkedin, Mail, MapPin, Trophy, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const footerColumns = [
  {
    title: "Creators",
    items: ["Podcasters", "Video creators", "Musicians", "Artists", "Game devs"]
  },
  {
    title: "Features",
    items: ["Create on your terms", "Where community thrives", "Grow your community", "Support for your mission", "Start a membership"]
  },
  {
    title: "Resources",
    items: ["Member guide", "Help Centre & FAQs", "Partners & integrations", "Mobile experience"]
  },
  {
    title: "Company",
    items: ["About", "Careers", "Terms & policies", "Privacy policy", "Accessibility"]
  }
];

export const Footer = () => {
  return (
    <footer id="contact-us" className="mt-16 bg-black text-white">
      <div className="h-6 w-full bg-gradient-to-r from-rose-900 via-amber-900 to-emerald-900 opacity-80" />
      <div className="page-shell pb-10 pt-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr_0.9fr]">
          <div id="about-us">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="FairChance Logo" className="h-14 w-auto object-contain drop-shadow-md brightness-0 invert" />
              <div>
                <p className="text-xl font-semibold">FairChance</p>
                <p className="text-sm text-slate-400">Charity-led golf subscription platform</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              A modern product experience where score tracking, memberships, prize draws, and community impact live together in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
              <div className="rounded-full border border-white/15 px-4 py-2">English</div>
              <div className="rounded-full border border-white/15 px-4 py-2">India</div>
              <div className="rounded-full border border-white/15 px-4 py-2">USD</div>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} id={column.title === "Resources" ? "help-center" : undefined}>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white">{column.title}</p>
              <div className="mt-5 space-y-3 text-sm text-slate-400">
                {column.items.map((item) => (
                  <Link key={item} to="/" className="block transition hover:text-white">{item}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5 text-slate-300">
            <Trophy size={18} className="text-amber-400" />
            <Mail size={18} className="text-sky-400" />
            <MapPin size={18} className="text-rose-400" />
            <Instagram size={20} />
            <Youtube size={20} />
            <Facebook size={20} />
            <Linkedin size={20} />
          </div>
          <p className="text-sm text-slate-400">Copyright 2026 FairChance. Purpose-led golf participation platform.</p>
        </div>
      </div>
    </footer>
  );
};
