import { type AppTab } from "../types";

interface HeaderProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const NAV_ITEMS: { key: AppTab; label: string }[] = [
  { key: "generate", label: "Create" },
  { key: "gallery", label: "Gallery" },
  { key: "coming-soon", label: "What's Next" },
];

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="white"
              />
            </svg>
          </div>
          <div>
            <p className="font-display text-base font-semibold tracking-tight text-white">
              EasyContent
            </p>
            <p className="text-[10px] uppercase tracking-[3px] text-zinc-500">
              Studio
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900/60 p-1">
          {NAV_ITEMS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 ${
                activeTab === key
                  ? "bg-amber-400 text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right badge */}
        <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[10px] uppercase tracking-widest text-zinc-400">
            AI Ready
          </span>
        </div>
      </div>
    </header>
  );
}