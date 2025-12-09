"use client";

import { useState } from "react";

interface EditorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  background: string;
  setBackground: (bg: string) => void;
  setBackgroundImage: (img: string | null) => void;
}

export default function EditorSidebar({
  isOpen,
  onClose,
  background,
  setBackground,
  setBackgroundImage
}: EditorSidebarProps) {
  const [activeTab, setActiveTab] = useState("design");

  // Handle background image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result as string);
        setBackground(""); // Clear gradient background
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 w-[700px] h-full bg-white transition-transform duration-500 ease-out z-30 shadow-2xl ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="px-16 py-12 border-b border-slate-50">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-extralight text-slate-900 tracking-tight">Editor</h2>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center hover:bg-slate-50 rounded-lg transition"
            >
              <span className="text-slate-400 text-xl font-extralight">×</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-16 py-8 border-b border-slate-50">
          <div className="flex items-center gap-12">
            <button
              onClick={() => setActiveTab("design")}
              className={`text-sm font-normal transition relative pb-1 ${
                activeTab === "design"
                  ? "text-slate-900"
                  : "text-slate-300 hover:text-slate-500"
              }`}
            >
              Design
              {activeTab === "design" && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-900"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`text-sm font-normal transition relative pb-1 ${
                activeTab === "preview"
                  ? "text-slate-900"
                  : "text-slate-300 hover:text-slate-500"
              }`}
            >
              Preview
              {activeTab === "preview" && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-900"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`text-sm font-normal transition relative pb-1 ${
                activeTab === "code"
                  ? "text-slate-900"
                  : "text-slate-300 hover:text-slate-500"
              }`}
            >
              Code
              {activeTab === "code" && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-900"></div>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-16 py-12">
          <div className="space-y-16">
            {activeTab === "design" && (
              <>
                <div>
                  <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mb-8">Background</h3>
                  
                  {/* Upload Image */}
                  <div className="mb-6">
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="bg-upload"
                      />
                      <div className="w-full py-4 px-6 border-2 border-dashed border-slate-200 rounded-xl hover:border-slate-300 transition cursor-pointer text-center">
                        <p className="text-xs text-slate-400">Upload Image</p>
                      </div>
                    </label>
                  </div>

                  {/* Preset Gradients */}
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => {
                        setBackground("bg-gradient-to-br from-sky-400 to-blue-500");
                        setBackgroundImage(null);
                      }}
                      className="aspect-square rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 hover:scale-105 transition cursor-pointer border-2 border-transparent hover:border-slate-300"
                    ></button>
                    <button
                      onClick={() => {
                        setBackground("bg-gradient-to-br from-purple-400 to-pink-500");
                        setBackgroundImage(null);
                      }}
                      className="aspect-square rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 hover:scale-105 transition cursor-pointer border-2 border-transparent hover:border-slate-300"
                    ></button>
                    <button
                      onClick={() => {
                        setBackground("bg-gradient-to-br from-emerald-400 to-teal-500");
                        setBackgroundImage(null);
                      }}
                      className="aspect-square rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 hover:scale-105 transition cursor-pointer border-2 border-transparent hover:border-slate-300"
                    ></button>
                    <button
                      onClick={() => {
                        setBackground("bg-gradient-to-br from-orange-400 to-red-500");
                        setBackgroundImage(null);
                      }}
                      className="aspect-square rounded-xl bg-gradient-to-br from-orange-400 to-red-500 hover:scale-105 transition cursor-pointer border-2 border-transparent hover:border-slate-300"
                    ></button>
                    <button
                      onClick={() => {
                        setBackground("bg-gradient-to-br from-slate-700 to-slate-900");
                        setBackgroundImage(null);
                      }}
                      className="aspect-square rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 hover:scale-105 transition cursor-pointer border-2 border-transparent hover:border-slate-300"
                    ></button>
                    <button
                      onClick={() => {
                        setBackground("bg-white");
                        setBackgroundImage(null);
                      }}
                      className="aspect-square rounded-xl bg-white hover:scale-105 transition cursor-pointer border-2 border-slate-200 hover:border-slate-300"
                    ></button>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mb-8">Typography</h3>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between py-5 border-b border-slate-50">
                      <span className="text-sm text-slate-400">Font Family</span>
                      <span className="text-sm text-slate-900">Inter</span>
                    </div>
                    <div className="flex items-center justify-between py-5 border-b border-slate-50">
                      <span className="text-sm text-slate-400">Font Weight</span>
                      <span className="text-sm text-slate-900">600</span>
                    </div>
                    <div className="flex items-center justify-between py-5 border-b border-slate-50">
                      <span className="text-sm text-slate-400">Line Height</span>
                      <span className="text-sm text-slate-900">1.5</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mb-8">Spacing</h3>
                  <input type="range" min="0" max="100" className="w-full h-px bg-slate-100 rounded-full appearance-none cursor-pointer" />
                </div>
              </>
            )}

            {activeTab === "preview" && (
              <>
                <div className="min-h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
                      <span className="text-3xl">👁️</span>
                    </div>
                    <p className="text-sm text-slate-900 mb-2">Live Preview</p>
                    <p className="text-xs text-slate-300">Your design will appear here</p>
                  </div>
                </div>
              </>
            )}

            {activeTab === "code" && (
              <>
                <div className="bg-slate-900 rounded-xl p-10 font-mono text-xs text-green-400 leading-relaxed">
                  <div className="mb-2">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-400">component</span> ={" "}
                    <span className="text-yellow-400">()</span> =&gt; {"{"}
                  </div>
                  <div className="ml-4 mb-2">
                    <span className="text-purple-400">return</span> (
                  </div>
                  <div className="ml-8 mb-2">
                    &lt;<span className="text-pink-400">div</span>&gt;
                  </div>
                  <div className="ml-12 mb-2 text-slate-500">
                    // Your code here
                  </div>
                  <div className="ml-8 mb-2">
                    &lt;/<span className="text-pink-400">div</span>&gt;
                  </div>
                  <div className="ml-4 mb-2">)</div>
                  <div>{"}"}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
