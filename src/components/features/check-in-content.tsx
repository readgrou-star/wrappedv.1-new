export default function CheckInContent() {
  return (
    <div className="p-4 min-h-full">
      {/* QR Code Section */}
      <div className="mb-4">
        <div className="bg-white border-2 border-slate-200 rounded-xl p-4 flex items-center justify-center">
          <div className="w-32 h-32 bg-slate-900 rounded-lg flex items-center justify-center">
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`w-2 h-2 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-700'} rounded-sm`}></div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-[10px] text-slate-500 mt-2">Scan to check in</p>
      </div>

      {/* Check-in Options */}
      <div className="space-y-3">
        {/* Zoom Link */}
        <div className="bg-blue-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">🎥</span>
            </div>
            <span className="text-xs font-bold text-slate-900">Zoom Meeting</span>
          </div>
          <div className="ml-8">
            <p className="text-[10px] text-slate-600 mb-1">Meeting ID: 123 456 7890</p>
            <button className="text-[10px] text-blue-600 font-semibold hover:underline">
              Join Meeting →
            </button>
          </div>
        </div>

        {/* Google Meet */}
        <div className="bg-green-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">📹</span>
            </div>
            <span className="text-xs font-bold text-slate-900">Google Meet</span>
          </div>
          <div className="ml-8">
            <p className="text-[10px] text-slate-600 mb-1">meet.google.com/abc-defg-hij</p>
            <button className="text-[10px] text-green-600 font-semibold hover:underline">
              Join Meeting →
            </button>
          </div>
        </div>

        {/* Physical Location */}
        <div className="bg-purple-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">📍</span>
            </div>
            <span className="text-xs font-bold text-slate-900">Physical Check-in</span>
          </div>
          <div className="ml-8">
            <p className="text-[10px] text-slate-600 mb-1">Grand Ballroom, Hotel XYZ</p>
            <button className="text-[10px] text-purple-600 font-semibold hover:underline">
              Get Directions →
            </button>
          </div>
        </div>

        {/* Check-in Code */}
        <div className="bg-slate-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-slate-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">#</span>
            </div>
            <span className="text-xs font-bold text-slate-900">Check-in Code</span>
          </div>
          <div className="ml-8">
            <div className="flex items-center gap-2">
              <code className="text-sm font-mono font-bold text-slate-900 bg-white px-2 py-1 rounded border border-slate-200">
                EVENT2024
              </code>
              <button className="text-[10px] text-slate-600 hover:text-slate-900">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition shadow-lg text-xs">
        Check In Now
      </button>
    </div>
  );
}
