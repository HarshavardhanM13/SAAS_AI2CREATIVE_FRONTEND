const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    tag: "AI Copywriting",
    title: "Brand Voice Engine",
    desc: "Generate platform-ready captions, hooks, and ad copy that sounds exactly like your brand. Feed it 3 posts — it learns your voice forever.",
    eta: "Q3 2025",
    accent: "from-violet-500 to-purple-600",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    tag: "Insights",
    title: "Trend Radar",
    desc: "Real-time trending topics, viral audio, and hashtag clusters by industry and region. Know what's blowing up before your competitors.",
    eta: "Q3 2025",
    accent: "from-amber-500 to-orange-500",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    tag: "Export",
    title: "Multi-Platform Pack",
    desc: "Auto-resize and reformat every visual for Instagram Reels, TikTok, LinkedIn banners, Facebook ads, and Pinterest — one click, all platforms.",
    eta: "Q3 2025",
    accent: "from-sky-500 to-blue-600",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    tag: "Analytics",
    title: "Creative Performance Studio",
    desc: "A/B test your campaign visuals, track CTR and engagement, and get AI-generated suggestions to improve underperforming creatives.",
    eta: "Q4 2025",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    tag: "Automation",
    title: "Smart Scheduler",
    desc: "Schedule posts at peak engagement windows by region and platform. Connect Instagram, TikTok, and LinkedIn for hands-free publishing.",
    eta: "Q4 2025",
    accent: "from-rose-500 to-pink-500",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
    tag: "Collaboration",
    title: "Team Workspace",
    desc: "Invite your team, leave comments on creatives, manage approval workflows, and maintain a shared brand asset library.",
    eta: "Q1 2026",
    accent: "from-indigo-500 to-violet-500",
  },
];

export default function ComingSoon() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span className="text-[10px] uppercase tracking-[2px] text-amber-400">Roadmap</span>
        </div>
        <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
          What's Coming Next
        </h2>
        <p className="max-w-lg text-sm leading-relaxed text-zinc-400">
          We're building the most complete content creation suite for personal brands and solo creators.
          Here's a sneak peek at what's shipping soon.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900"
          >
            {/* Top glow */}
            <div
              className={`absolute -top-10 left-0 h-24 w-full bg-gradient-to-b ${f.accent} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-10`}
            />

            {/* Tag */}
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-[9px] uppercase tracking-widest text-zinc-400">
                {f.tag}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-zinc-600">{f.eta}</span>
            </div>

            {/* Icon */}
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${f.accent} text-white shadow-lg`}
            >
              {f.icon}
            </div>

            {/* Content */}
            <h3 className="mb-2 font-display text-base font-semibold text-white">{f.title}</h3>
            <p className="text-xs leading-relaxed text-zinc-500">{f.desc}</p>

            {/* Coming soon badge */}
            <div className="mt-4 flex items-center gap-1.5">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-[10px] uppercase tracking-widest text-zinc-600">Coming Soon</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-950 p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-white">
          Want early access?
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-xs text-zinc-500">
          Join the waitlist and be the first to try every feature as it drops.
        </p>
        <div className="mx-auto mt-5 flex max-w-sm gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-xs text-white placeholder-zinc-600 outline-none focus:border-amber-400/60 focus:ring-0"
          />
          <button className="rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2.5 text-xs font-semibold text-zinc-950 transition hover:opacity-90">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}