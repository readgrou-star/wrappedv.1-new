interface EditorButtonProps {
  onClick: () => void;
}

export default function EditorButton({ onClick }: EditorButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-20 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl shadow-2xl transition text-sm font-normal"
    >
      Editor
    </button>
  );
}
