"use client";

import { useState, useRef } from "react";
import { Type, Box, ImageIcon, Trash2, GripVertical, ArrowRight } from "lucide-react";
import { CoreBuilderLanding } from "@/components/builder/core-builder-landing";

export default function StudioLanding() {
  const [activeTab, setActiveTab] = useState<"landing" | "form" | "design">("landing");
  const [sidebarPos, setSidebarPos] = useState({ x: 40, y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [editorRef, setEditorRef] = useState<any>(null);
  const [bgImage, setBgImage] = useState<string>("");
  const dragRef = useRef<{ startX: number; startY: number } | null>(null);

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = { startX: e.clientX - sidebarPos.x, startY: e.clientY - sidebarPos.y };
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setBgImage(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div 
      onMouseMove={(e) => { 
        if (isDragging && dragRef.current) 
          setSidebarPos({ x: e.clientX - dragRef.current.startX, y: e.clientY - dragRef.current.startY }); 
      }} 
      onMouseUp={() => { setIsDragging(false); dragRef.current = null; }}
      className="fixed inset-0 bg-slate-50"
    >
      {/* Full Page Editor - 70:30 Super Wide */}
      <div className="w-full h-full flex">
        <div className="flex-[70] h-full overflow-hidden relative" style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <CoreBuilderLanding bgImage={bgImage} onSave={(json) => console.log("Saved:", json)} onEditorReady={setEditorRef} />
        </div>
        
        {/* Form Card Floating Kanan */}
        <div className="flex-[30] h-full flex items-center justify-center p-8 pointer-events-none">
          <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl border border-slate-200 pointer-events-auto">
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="text-slate-400 font-bold uppercase tracking-wide text-[10px]">Step 1 of 3</span>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-900 w-1/3"></div>
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-6">
                Full Name <span className="text-blue-600">*</span>
              </h2>
              <div className="w-full text-xl text-slate-900 border-b border-slate-200 py-2 bg-transparent font-bold">
                Enter your name
              </div>
            </div>
            <button className="w-full bg-slate-900 text-white text-sm font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-slate-800 transition">
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Sidebar - Compact & Draggable */}
      <div 
        style={{ left: sidebarPos.x, top: sidebarPos.y }} 
        className="fixed w-72 pointer-events-auto z-50"
      >
        {/* Design Card - Paling Belakang */}
        <div 
          className="absolute w-full bg-white rounded-xl shadow-xl border border-slate-200 transition-all duration-500 ease-out cursor-pointer"
          onClick={() => setActiveTab("design")}
          style={{
            zIndex: activeTab === "design" ? 30 : 10,
            transform: activeTab === "design" ? "translateY(0px) scale(1) rotateY(0deg)" : "translateY(20px) scale(0.96) rotateY(0deg)",
            opacity: activeTab === "design" ? 1 : 0.7,
          }}
        >
          <div 
            onMouseDown={activeTab === "design" ? handleDragStart : undefined}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-50 to-white rounded-t-xl border-b border-slate-100"
          >
            {activeTab === "design" && <GripVertical className="w-3.5 h-3.5 text-slate-400 cursor-move" />}
            <span className="text-xs font-bold text-green-700">Design</span>
          </div>
          {activeTab === "design" && (
            <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">ELEMENTS</p>
                <div className="space-y-1.5">
                  <div onClick={() => editorRef?.addText("Text")} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition flex items-center gap-2">
                    <Type className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-xs font-medium">Text</span>
                  </div>
                  <div onClick={() => editorRef?.addRectangle()} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition flex items-center gap-2">
                    <Box className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-xs font-medium">Rectangle</span>
                  </div>
                  <div onClick={() => editorRef?.addCircle()} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-600"></div>
                    <span className="text-xs font-medium">Circle</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">BACKGROUND</p>
                <label className="block">
                  <div className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-xs font-medium">Upload</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleBgUpload} className="hidden" />
                </label>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">ACTIONS</p>
                <div onClick={() => editorRef?.delete()} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg cursor-pointer transition flex items-center gap-2">
                  <Trash2 className="w-3.5 h-3.5 text-red-600" />
                  <span className="text-xs font-medium text-red-600">Delete</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Card - Tengah */}
        <div 
          className="absolute w-full bg-white rounded-xl shadow-xl border border-slate-200 transition-all duration-500 ease-out cursor-pointer"
          onClick={() => setActiveTab("form")}
          style={{
            zIndex: activeTab === "form" ? 30 : 20,
            transform: activeTab === "form" ? "translateY(0px) scale(1) rotateY(0deg)" : "translateY(10px) scale(0.98) rotateY(0deg)",
            opacity: activeTab === "form" ? 1 : 0.85,
          }}
        >
          <div 
            onMouseDown={activeTab === "form" ? handleDragStart : undefined}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-50 to-white rounded-t-xl border-b border-slate-100"
          >
            {activeTab === "form" && <GripVertical className="w-3.5 h-3.5 text-slate-400 cursor-move" />}
            <span className="text-xs font-bold text-purple-700">Form</span>
          </div>
          {activeTab === "form" && (
            <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">ELEMENTS</p>
                <div className="space-y-1.5">
                  <div onClick={() => editorRef?.addText("Text")} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition flex items-center gap-2">
                    <Type className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-xs font-medium">Text</span>
                  </div>
                  <div onClick={() => editorRef?.addRectangle()} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition flex items-center gap-2">
                    <Box className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-xs font-medium">Rectangle</span>
                  </div>
                  <div onClick={() => editorRef?.addCircle()} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-600"></div>
                    <span className="text-xs font-medium">Circle</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">BACKGROUND</p>
                <label className="block">
                  <div className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-xs font-medium">Upload</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleBgUpload} className="hidden" />
                </label>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">ACTIONS</p>
                <div onClick={() => editorRef?.delete()} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg cursor-pointer transition flex items-center gap-2">
                  <Trash2 className="w-3.5 h-3.5 text-red-600" />
                  <span className="text-xs font-medium text-red-600">Delete</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Landing Card - Paling Depan */}
        <div 
          className="absolute w-full bg-white rounded-xl shadow-xl border border-slate-200 transition-all duration-500 ease-out cursor-pointer"
          onClick={() => setActiveTab("landing")}
          style={{
            zIndex: activeTab === "landing" ? 30 : activeTab === "form" ? 10 : 20,
            transform: activeTab === "landing" ? "translateY(0px) scale(1) rotateY(0deg)" : 
                       activeTab === "form" ? "translateY(20px) scale(0.96) rotateY(0deg)" : "translateY(10px) scale(0.98) rotateY(0deg)",
            opacity: activeTab === "landing" ? 1 : activeTab === "form" ? 0.7 : 0.85,
          }}
        >
          <div 
            onMouseDown={activeTab === "landing" ? handleDragStart : undefined}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-white rounded-t-xl border-b border-slate-100"
          >
            {activeTab === "landing" && <GripVertical className="w-3.5 h-3.5 text-slate-400 cursor-move" />}
            <span className="text-xs font-bold text-blue-700">Landing</span>
          </div>
          {activeTab === "landing" && (
            <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">ELEMENTS</p>
                <div className="space-y-1.5">
                  <div onClick={() => editorRef?.addText("Text")} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition flex items-center gap-2">
                    <Type className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-xs font-medium">Text</span>
                  </div>
                  <div onClick={() => editorRef?.addRectangle()} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition flex items-center gap-2">
                    <Box className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-xs font-medium">Rectangle</span>
                  </div>
                  <div onClick={() => editorRef?.addCircle()} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-600"></div>
                    <span className="text-xs font-medium">Circle</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">BACKGROUND</p>
                <label className="block">
                  <div className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-xs font-medium">Upload</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleBgUpload} className="hidden" />
                </label>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">ACTIONS</p>
                <div onClick={() => editorRef?.delete()} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg cursor-pointer transition flex items-center gap-2">
                  <Trash2 className="w-3.5 h-3.5 text-red-600" />
                  <span className="text-xs font-medium text-red-600">Delete</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
