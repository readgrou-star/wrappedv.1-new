export default function ParticipantsContent() {
  return (
    <div className="p-4 min-h-full">
      {/* Participants List */}
      <div className="mb-4">
        <h3 className="text-xs font-bold text-slate-900 mb-2">Registered (24)</h3>
        <div className="space-y-2">
          {/* User Card 1 */}
          <div className="bg-slate-50 rounded-xl p-2 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-900">John Doe</p>
              <p className="text-[9px] text-slate-500">john@example.com</p>
            </div>
            <span className="text-[9px] text-green-600 font-semibold">✓</span>
          </div>

          {/* User Card 2 */}
          <div className="bg-slate-50 rounded-xl p-2 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AS</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-900">Alice Smith</p>
              <p className="text-[9px] text-slate-500">alice@example.com</p>
            </div>
            <span className="text-[9px] text-green-600 font-semibold">✓</span>
          </div>

          {/* User Card 3 */}
          <div className="bg-slate-50 rounded-xl p-2 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">BJ</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-900">Bob Johnson</p>
              <p className="text-[9px] text-slate-500">bob@example.com</p>
            </div>
            <span className="text-[9px] text-slate-400 font-semibold">○</span>
          </div>
        </div>
      </div>

      {/* Zoom Link & QR Code */}
      <div className="mb-4">
        <h3 className="text-xs font-bold text-slate-900 mb-2">Join Event</h3>
        <div className="space-y-2">
          {/* Zoom Link */}
          <div className="bg-blue-50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">🎥</span>
              <span className="text-xs font-bold text-slate-900">Zoom Meeting</span>
            </div>
            <p className="text-[10px] text-slate-600 mb-1">ID: 123 456 7890</p>
            <button className="text-[10px] text-blue-600 font-semibold hover:underline">
              Join Now →
            </button>
          </div>

          {/* QR Code */}
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="grid grid-cols-3 gap-0.5">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-700'} rounded-sm`}></div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 mb-1">QR Check-in</p>
                <p className="text-[9px] text-slate-500">Scan to register</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Twibbon Card */}
      <div className="mb-4">
        <h3 className="text-xs font-bold text-slate-900 mb-2">Event Twibbon</h3>
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-3 border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🎉</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-900 mb-1">Share Your Moment</p>
              <p className="text-[9px] text-slate-600 mb-2">Download event frame</p>
              <button className="text-[10px] text-purple-600 font-semibold hover:underline">
                Get Twibbon →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition shadow-lg text-xs">
        View All Participants
      </button>
    </div>
  );
}
