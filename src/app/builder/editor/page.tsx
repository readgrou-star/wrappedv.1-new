"use client";

import { useState } from "react";
import CoreFeaturesCard from "@/components/core-features-card";
import AboutEventContent from "@/components/features/about-event-content";
import FormContent from "@/components/features/form-content";
import FileManagerContent from "@/components/features/file-manager-content";
import ParticipantsContent from "@/components/features/participants-content";
import EditorButton from "@/components/editor-button";
import EditorSidebar from "@/components/editor-sidebar";
import HeaderNav from "@/components/header-nav";
import TwibbonButton from "@/components/twibbon-button";
import TwibbonPopup from "@/components/twibbon-popup";

export default function BuilderEditor() {
  const [showPopup, setShowPopup] = useState(false);
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [showEditorCard, setShowEditorCard] = useState(false);
  const [showTwibbonPopup, setShowTwibbonPopup] = useState(false);
  const [background, setBackground] = useState("bg-gradient-to-br from-sky-400 to-blue-500");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

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
    <div 
      className={`fixed inset-0 transition-colors duration-500 ${background}`}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'high-quality'
      } : {}}
    >
      {/* Header Navigation */}
      <HeaderNav onTwibbonClick={() => setShowTwibbonPopup(true)} />

      {/* Editor Button */}
      <EditorButton onClick={() => setShowEditorCard(!showEditorCard)} />

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

      {/* Editor Sidebar */}
      <EditorSidebar
        isOpen={showEditorCard}
        onClose={() => setShowEditorCard(false)}
        background={background}
        setBackground={setBackground}
        setBackgroundImage={setBackgroundImage}
      />

      {/* Twibbon Popup */}
      <TwibbonPopup
        isOpen={showTwibbonPopup}
        onClose={() => setShowTwibbonPopup(false)}
      />

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
