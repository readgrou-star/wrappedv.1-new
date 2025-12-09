export default function ParticipantsContent() {
  return (
    <div className="p-6 min-h-full">
      {/* Participants List */}
      <div className="mb-8">
        <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mb-4">Registered (24)</h3>
        <div className="space-y-3">
          {/* User Card 1 */}
          <div className="flex items-center gap-3 py-3 border-b border-slate-50">
            <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-slate-600 text-xs font-normal">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-900">John Doe</p>
              <p className="text-[10px] text-slate-400">john@example.com</p>
            </div>
            <span className="text-xs text-slate-900">✓</span>
          </div>

          {/* User Card 2 */}
          <div className="flex items-center gap-3 py-3 border-b border-slate-50">
            <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-slate-600 text-xs font-normal">AS</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-900">Alice Smith</p>
              <p className="text-[10px] text-slate-400">alice@example.com</p>
            </div>
            <span className="text-xs text-slate-900">✓</span>
          </div>

          {/* User Card 3 */}
          <div className="flex items-center gap-3 py-3 border-b border-slate-50">
            <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-slate-600 text-xs font-normal">BJ</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-900">Bob Johnson</p>
              <p className="text-[10px] text-slate-400">bob@example.com</p>
            </div>
            <span className="text-xs text-slate-300">○</span>
          </div>
        </div>
      </div>

      {/* Zoom Link & QR Code */}
      <div className="mb-8">
        <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mb-4">Join Event</h3>
        <div className="space-y-4">
          {/* Zoom Link */}
          <div className="py-3 border-b border-slate-50">
            <p className="text-xs text-slate-900 mb-1">Zoom Meeting</p>
            <p className="text-[10px] text-slate-400 mb-2">ID: 123 456 7890</p>
            <button className="text-[10px] text-slate-900 hover:text-slate-600 transition">
              Join Now →
            </button>
          </div>

          {/* QR Code */}
          <div className="py-3 border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="grid grid-cols-3 gap-0.5">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-700'} rounded-sm`}></div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-900 mb-1">QR Check-in</p>
                <p className="text-[10px] text-slate-400">Scan to register</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Twibbon Card */}
      <div className="mb-8">
        <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mb-4">Event Twibbon</h3>
        <div className="py-3 border-b border-slate-50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🎉</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-900 mb-1">Share Your Moment</p>
              <p className="text-[10px] text-slate-400 mb-2">Download event frame</p>
              <button className="text-[10px] text-slate-900 hover:text-slate-600 transition">
                Get Twibbon →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-normal rounded-lg transition text-xs">
        View All Participants
      </button>
    </div>
  );
}
