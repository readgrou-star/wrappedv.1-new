export default function AboutEventContent() {
  return (
    <div className="p-6 min-h-full">
      {/* Event Header */}
      <div className="mb-8 pb-6 border-b border-slate-100">
        <h2 className="text-xl font-light text-slate-900 mb-1">Tech Conference 2024</h2>
        <p className="text-xs text-slate-400">Annual Technology Summit</p>
      </div>

      {/* Event Details */}
      <div className="space-y-6">
        {/* Date & Time */}
        <div>
          <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mb-3">Date & Time</h3>
          <p className="text-xs text-slate-900">Tue, Dec 9 • 10:30 - 11:30</p>
          <p className="text-xs text-slate-400 mt-1">GMT+07:00 Jakarta</p>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mb-3">Location</h3>
          <p className="text-xs text-slate-900">Grand Ballroom, Hotel XYZ</p>
          <p className="text-xs text-slate-400 mt-1">Jakarta, Indonesia</p>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mb-3">About</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Join us for an exciting day of innovation, networking, and learning. 
            Connect with industry leaders and explore the latest tech trends.
          </p>
        </div>

        {/* Event Options */}
        <div>
          <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mb-3">Ticket Info</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-xs text-slate-400">Price</span>
              <span className="text-xs text-slate-900">Free</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-xs text-slate-400">Capacity</span>
              <span className="text-xs text-slate-900">Unlimited</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-xs text-slate-400">Approval</span>
              <span className="text-xs text-slate-900">Required</span>
            </div>
          </div>
        </div>

        {/* Theme */}
        <div>
          <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mb-3">Theme</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-lg border border-slate-100"></div>
            <span className="text-xs text-slate-400">Minimal</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full mt-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-normal rounded-lg transition text-xs">
        Create Event
      </button>
    </div>
  );
}
