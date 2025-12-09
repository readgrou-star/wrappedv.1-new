"use client";

import { useState } from "react";
import CoreFeaturesCard from "@/components/core-features-card";
import AboutEventContent from "@/components/features/about-event-content";
import FormContent from "@/components/features/form-content";

export default function BuilderEditor() {
  const [showPopup, setShowPopup] = useState(false);
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [showEditorCard, setShowEditorCard] = useState(false);
  const [activeTab, setActiveTab] = useState("design");

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

      {/* Editor Card - Slide from Right */}
      <div
        className={`fixed right-0 bottom-0 w-[500px] bg-white rounded-l-2xl shadow-2xl transition-transform duration-500 ease-out z-30 ${
          showEditorCard ? "translate-x-[calc(100%-480px)]" : "translate-x-full"
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
              onClick={() => setShowEditorCard(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full transition"
            >
              <span className="text-slate-600 font-bold">×</span>
            </button>

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
              <button
                onClick={() => setActiveTab("design")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  activeTab === "design"
                    ? "bg-blue-600 text-white"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                Design
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  activeTab === "preview"
                    ? "bg-blue-600 text-white"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  activeTab === "code"
                    ? "bg-blue-600 text-white"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                Code
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              {activeTab === "design" && (
                <>
                  <h3 className="text-lg font-bold text-slate-900">Design View</h3>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <h4 className="text-sm font-bold text-slate-900 mb-3">Colors</h4>
                    <div className="flex gap-2">
                      <div className="w-12 h-12 rounded-lg bg-blue-600"></div>
                      <div className="w-12 h-12 rounded-lg bg-purple-600"></div>
                      <div className="w-12 h-12 rounded-lg bg-pink-600"></div>
                      <div className="w-12 h-12 rounded-lg bg-slate-900"></div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <h4 className="text-sm font-bold text-slate-900 mb-2">Typography</h4>
                    <p className="text-xs text-slate-600">Font: Inter, System UI</p>
                  </div>
                </>
              )}

              {activeTab === "preview" && (
                <>
                  <h3 className="text-lg font-bold text-slate-900">Preview</h3>
                  <div className="bg-slate-100 rounded-xl p-12 min-h-[500px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">👁️</div>
                      <p className="text-sm text-slate-600 font-semibold">Live Preview</p>
                      <p className="text-xs text-slate-400 mt-2">Your design will appear here</p>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "code" && (
                <>
                  <h3 className="text-lg font-bold text-slate-900">Code Editor</h3>
                  <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-green-400">
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
                    <div className="ml-12 mb-2 text-slate-400">
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
