interface TwibbonButtonProps {
  onClick: () => void;
}

export default function TwibbonButton({ onClick }: TwibbonButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-32 z-20 bg-white hover:bg-slate-50 text-slate-900 px-6 py-3 rounded-xl shadow-2xl transition text-sm font-normal border border-slate-100"
    >
      Twibbon
    </button>
  );
}
