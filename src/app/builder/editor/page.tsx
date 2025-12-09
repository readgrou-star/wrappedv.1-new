"use client";

import { useState } from "react";
import CoreFeaturesCard from "@/components/core-features-card";
import AboutEventContent from "@/components/features/about-event-content";
import FormContent from "@/components/features/form-content";
import FileManagerContent from "@/components/features/file-manager-content";
import ParticipantsContent from "@/components/features/participants-content";

export default function BuilderEditor() {
  const [showPopup, setShowPopup] = useState(false);
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [showEditorCard, setShowEditorCard] = useState(false);
  const [activeTab, setActiveTab] = useState("design");

  // Handle file click - buka popup file preview
  const handleFileClick = (fileName: string) => {
    if (showFilePreview && selectedFile !== fileName) {
      // Jika preview sudah buka dengan file berbeda, slide down dulu
      setShowFilePreview(false);
      setTimeout(() => {
        setSelectedFile(fileName);
        setShowFilePreview(true);
      }, 300);
    } else {
      // Jika preview tutup atau file sama, langsung buka
      setSelectedFile(fileName);
      setShowFilePreview(true);
    }
  };

  // Define modular feature cards - bisa tambah/kurang sesuai kebutuhan
  const featureCards = [
    {
      id: 0,
      name: "About Event",
      content: <AboutEventContent />
    },
    {
      id: 1,
      name: "Form",
      content: <FormContent />
    },
    {
      id: 2,
      name: "File Manager",
      content: <FileManagerContent onFileClick={handleFileClick} />
    },
    {
      id: 3,
      name: "Participants",
      content: <ParticipantsContent />
    }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-sky-400 to-blue-500">
      {/* Header - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg flex items-center gap-6">
          <button 
            onClick={() => setShowEditorCard(!showEditorCard)}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition"
          >
            Editor
          </button>
          <button className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition">
            Pricing
          </button>
          <button className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition">
            Use cases
          </button>
          <button className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition">
            Resources
          </button>
          <button className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition">
            What's new
          </button>
        </div>
      </div>

      {/* Core Features Card - Floating Card Stack */}
      <CoreFeaturesCard cards={featureCards} />

      {/* File Preview Card - Slide from Bottom */}
      <div
        className={`fixed left-[380px] bottom-0 w-[400px] bg-white rounded-t-2xl shadow-2xl transition-transform duration-500 ease-out z-20 ${
          showFilePreview ? "translate-y-[calc(100%-520px)]" : "translate-y-full"
        }`}
        style={{ height: "85vh" }}
      >
        <div className="h-full overflow-y-auto custom-scrollbar">
          <div className="p-6">
            {/* Drag Handle */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1.5 bg-slate-300 rounded-full"></div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowFilePreview(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full transition"
            >
              <span className="text-slate-600 font-bold">×</span>
            </button>

            {/* File Preview Content */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">{selectedFile}</h3>
              
              {/* PDF Preview Placeholder */}
              <div className="bg-slate-100 rounded-xl p-8 min-h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-sm text-slate-600 font-semibold mb-2">PDF Preview</p>
                  <p className="text-xs text-slate-500">File: {selectedFile}</p>
                  <p className="text-xs text-slate-400 mt-4">
                    PDF render will be displayed here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Sidebar - Super Minimalist Total */}
      <div
        className={`fixed right-0 top-0 w-[700px] h-full bg-white transition-transform duration-500 ease-out z-30 shadow-2xl ${
          showEditorCard ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-16 py-12 border-b border-slate-50">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-extralight text-slate-900 tracking-tight">Editor</h2>
              <button
                onClick={() => setShowEditorCard(false)}
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
                    <h3 className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mb-8">Colors</h3>
                    <div className="grid grid-cols-5 gap-5">
                      <div className="aspect-square rounded-xl bg-blue-600 hover:scale-105 transition cursor-pointer"></div>
                      <div className="aspect-square rounded-xl bg-purple-600 hover:scale-105 transition cursor-pointer"></div>
                      <div className="aspect-square rounded-xl bg-pink-600 hover:scale-105 transition cursor-pointer"></div>
                      <div className="aspect-square rounded-xl bg-slate-900 hover:scale-105 transition cursor-pointer"></div>
                      <div className="aspect-square rounded-xl bg-emerald-600 hover:scale-105 transition cursor-pointer"></div>
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

      {/* Popup Phone - Slide from Bottom */}
      <div
        className={`fixed left-[760px] bottom-0 w-[380px] bg-white rounded-t-3xl shadow-2xl transition-transform duration-500 ease-out z-20 ${
          showPopup ? "translate-y-[calc(100%-500px)]" : "translate-y-full"
        }`}
        style={{ height: "80vh" }}
      >
        <div className="h-full overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1.5 bg-slate-300 rounded-full"></div>
            </div>

            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full transition"
            >
              <span className="text-slate-600 font-bold">×</span>
            </button>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900">Details</h3>
              <p className="text-slate-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-slate-600">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
              <p className="text-slate-600">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>
              <p className="text-slate-600">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
              <p className="text-slate-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-slate-600">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
