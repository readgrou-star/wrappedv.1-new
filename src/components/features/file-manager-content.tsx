interface FileManagerContentProps {
  onFileClick: (fileName: string) => void;
}

export default function FileManagerContent({ onFileClick }: FileManagerContentProps) {
  return (
    <div className="p-4 min-h-full">
      <div className="space-y-2">
        {/* File 1 */}
        <div 
          className="bg-blue-50 hover:bg-blue-100 rounded-xl p-3 transition cursor-pointer"
          onClick={() => onFileClick("Project_Proposal.pdf")}
        >
          <p className="text-xs font-bold text-slate-900 truncate mb-0.5">Project_Proposal.pdf</p>
          <p className="text-[10px] text-slate-500">2.4 MB • PDF</p>
        </div>

        {/* File 2 */}
        <div 
          className="bg-blue-50 hover:bg-blue-100 rounded-xl p-3 transition cursor-pointer"
          onClick={() => onFileClick("Design_Mockup.png")}
        >
          <p className="text-xs font-bold text-slate-900 truncate mb-0.5">Design_Mockup.png</p>
          <p className="text-[10px] text-slate-500">1.8 MB • PNG</p>
        </div>

        {/* File 3 */}
        <div 
          className="bg-blue-50 hover:bg-blue-100 rounded-xl p-3 transition cursor-pointer"
          onClick={() => onFileClick("Analytics_Report.xlsx")}
        >
          <p className="text-xs font-bold text-slate-900 truncate mb-0.5">Analytics_Report.xlsx</p>
          <p className="text-[10px] text-slate-500">856 KB • Excel</p>
        </div>
      </div>
    </div>
  );
}
