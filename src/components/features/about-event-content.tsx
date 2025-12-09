export default function AboutEventContent() {
  return (
    <div className="p-4 min-h-full">
      {/* Event Header */}
      <div className="mb-4">
        <div className="w-full h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl mb-3 flex items-center justify-center">
          <span className="text-4xl">🎉</span>
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-1">Tech Conference 2024</h2>
        <p className="text-[10px] text-slate-500">Annual Technology Summit</p>
      </div>

      {/* Event Details */}
      <div className="space-y-3">
        {/* Date & Time */}
        <div className="bg-slate-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">📅</span>
            <span className="text-xs font-bold text-slate-900">Date & Time</span>
          </div>
          <p className="text-[10px] text-slate-600 ml-6">Tue, Dec 9 • 10:30 - 11:30</p>
          <p className="text-[10px] text-slate-500 ml-6">GMT+07:00 Jakarta</p>
        </div>

        {/* Location */}
        <div className="bg-slate-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">📍</span>
            <span className="text-xs font-bold text-slate-900">Location</span>
          </div>
          <p className="text-[10px] text-slate-600 ml-6">Grand Ballroom, Hotel XYZ</p>
          <p className="text-[10px] text-slate-500 ml-6">Jakarta, Indonesia</p>
        </div>

        {/* Description */}
        <div className="bg-slate-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">📝</span>
            <span className="text-xs font-bold text-slate-900">About</span>
          </div>
          <p className="text-[10px] text-slate-600 ml-6 leading-relaxed">
            Join us for an exciting day of innovation, networking, and learning. 
            Connect with industry leaders and explore the latest tech trends.
          </p>
        </div>

        {/* Event Options */}
        <div className="bg-slate-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">🎫</span>
            <span className="text-xs font-bold text-slate-900">Ticket Info</span>
          </div>
          <div className="ml-6 space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-600">Price</span>
              <span className="text-[10px] font-bold text-green-600">Free</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-600">Capacity</span>
              <span className="text-[10px] font-bold text-slate-900">Unlimited</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-600">Approval</span>
              <span className="text-[10px] font-bold text-blue-600">Required</span>
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className="bg-slate-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">🎨</span>
            <span className="text-xs font-bold text-slate-900">Theme</span>
          </div>
          <div className="ml-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg border border-slate-200"></div>
              <span className="text-[10px] text-slate-600">Minimal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition shadow-lg text-xs">
        Create Event
      </button>
    </div>
  );
}
