"use client";

import React, { useState } from "react";
import { Type, Box, Trash2, ImageIcon, Monitor, Smartphone, Wand2, ArrowRight } from "lucide-react";
import { CoreBuilderLanding } from "./core-builder-landing";
import { UnifiedBuilder } from "./unified-builder";

interface LandingEditorProps {
  step: string;
  form: any;
  onSave: () => void;
}

export function LandingEditor({ step, form, onSave }: LandingEditorProps) {
  const [editorRef, setEditorRef] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [bgImage, setBgImage] = useState<string>("");

  const handleAutoLayout = () => {
    if (!editorRef?.canvas) return;
    const canvas = editorRef.canvas;
    const objects = canvas.getObjects().filter((obj: any) => obj.name !== "clip");
    objects.forEach((obj: any) => {
      obj.scaleX = (obj.scaleX || 1) * 0.5;
      obj.scaleY = (obj.scaleY || 1) * 0.5;
      obj.left = (obj.left || 0) * 0.5;
      obj.top = (obj.top || 0) * 0.5;
    });
    canvas.renderAll();
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setBgImage(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const sidebarContent = (
    <>
      <div className="mb-3 pb-3 border-b border-white/10">
        <div className="flex bg-white/5 p-0.5 rounded-lg">
          <button onClick={() => setViewMode("desktop")} className={`flex-1 py-1.5 rounded transition text-xs font-medium ${viewMode === "desktop" ? "bg-white/10 text-white" : "text-white/60"}`}>Desktop</button>
          <button onClick={() => setViewMode("mobile")} className={`flex-1 py-1.5 rounded transition text-xs font-medium ${viewMode === "mobile" ? "bg-white/10 text-white" : "text-white/60"}`}>Mobile</button>
        </div>
        {viewMode === "mobile" && (
          <button onClick={handleAutoLayout} className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 transition">
            <Wand2 className="w-3 h-3" /> Auto Layout
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto space-y-3">
        <div>
          <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5">Elements</p>
          <div className="space-y-1">
            <div onClick={() => editorRef?.addText("Text")} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-all flex items-center gap-2">
              <Type className="w-3.5 h-3.5 text-white/70" />
              <span className="text-sm font-medium text-white/90">Text</span>
            </div>
            <div onClick={() => editorRef?.addRectangle()} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-all flex items-center gap-2">
              <Box className="w-3.5 h-3.5 text-white/70" />
              <span className="text-sm font-medium text-white/90">Rectangle</span>
            </div>
            <div onClick={() => editorRef?.addCircle()} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-all flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-white/70"></div>
              <span className="text-sm font-medium text-white/90">Circle</span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5">Background</p>
          <label className="block">
            <div className="p-2 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-all flex items-center gap-2">
              <ImageIcon className="w-3.5 h-3.5 text-white/70" />
              <span className="text-sm font-medium text-white/90">Upload Image</span>
            </div>
            <input type="file" accept="image/*" onChange={handleBgUpload} className="hidden" />
          </label>
          {bgImage && (
            <button onClick={() => setBgImage("")} className="w-full mt-1.5 text-xs text-red-400 hover:text-red-300 font-medium py-1.5">Remove</button>
          )}
        </div>
        <div>
          <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5">Actions</p>
          <div onClick={() => editorRef?.delete()} className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg cursor-pointer transition-all flex items-center gap-2">
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
            <span className="text-sm font-medium text-red-400">Delete</span>
          </div>
        </div>
      </div>
    </>
  );

  const canvasContent = (
    <div className="w-full h-full" style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: bgImage ? 'transparent' : 'white' }}>
      {viewMode === "desktop" ? (
        <div className="w-full h-full flex">
          <div className="flex-[7] h-full overflow-y-auto relative">
            <CoreBuilderLanding bgImage={bgImage} onSave={(json) => console.log("Saved:", json)} onEditorReady={setEditorRef} />
          </div>
          <div className="flex-[3] h-full flex items-center justify-center p-8 pointer-events-none">
            <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl border border-slate-200 pointer-events-auto">
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
                  {form.fields[0]?.label || "Question"} <span className="text-blue-600">*</span>
                </h2>
                <div className="w-full text-xl text-slate-900 border-b border-slate-200 py-2 bg-transparent font-bold">
                  {form.fields[0]?.placeholder || "Answer..."}
                </div>
              </div>
              <button className="w-full bg-slate-900 text-white text-sm font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="w-[375px] h-[812px] border-[10px] border-slate-900 rounded-[3rem] shadow-2xl ring-4 ring-slate-900/20 overflow-hidden bg-white">
            <CoreBuilderLanding bgImage={bgImage} onSave={(json) => console.log("Saved:", json)} onEditorReady={setEditorRef} />
          </div>
        </div>
      )}
    </div>
  );

  return <UnifiedBuilder step={step} onSave={onSave} sidebarContent={sidebarContent} canvasContent={canvasContent} />;
}
