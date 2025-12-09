export default function FormContent() {
  return (
    <div className="p-4 min-h-full flex flex-col">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-slate-400 font-bold uppercase tracking-wide text-[9px]">
            Step 1 of 3
          </span>
        </div>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-slate-900 w-1/3 transition-all duration-300"></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6 flex-1">
        <h2 className="text-lg font-bold text-slate-900 leading-tight mb-4">
          What's your name? <span className="text-blue-600">*</span>
        </h2>
        <input
          type="text"
          placeholder="Type your answer here..."
          className="w-full text-sm text-slate-900 border-b-2 border-slate-200 py-2 bg-transparent font-semibold focus:border-slate-900 focus:outline-none transition-colors"
        />
      </div>

      {/* Next Button */}
      <button className="w-full bg-slate-900 text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-slate-800 transition">
        Next
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="text-[9px] text-slate-300 font-bold uppercase tracking-wide">
          Powered by WrappedForm
        </p>
      </div>
    </div>
  );
}
