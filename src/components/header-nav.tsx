interface HeaderNavProps {
  onTwibbonClick: () => void;
}

export default function HeaderNav({ onTwibbonClick }: HeaderNavProps) {
  return (
    <div className="absolute top-6 right-6 z-20">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg flex items-center gap-6">
        <button 
          onClick={onTwibbonClick}
          className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition"
        >
          Twibbon
        </button>
        <button className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition">
          The Awards
        </button>
        <button className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition">
          Certificates
        </button>
        <button className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition">
          Leaderboard
        </button>
        <button className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition">
          Roadmap
        </button>
      </div>
    </div>
  );
}
