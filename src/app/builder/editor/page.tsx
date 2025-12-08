"use client";

import { useState } from "react";
import { X } from "lucide-react";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
];

export default function BuilderEditor() {
  const [bgImage, setBgImage] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setBgImage(event.target?.result as string);
      setShowPopup(false);
    };
    reader.readAsDataURL(file);
  };

  const selectGalleryImage = (url: string) => {
    setBgImage(url);
    setShowPopup(false);
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-900 transition-all duration-500"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background Button - Sudut Kanan Atas */}
      <div className="fixed top-6 right-6 z-10">
        <button
          onClick={() => setShowPopup(true)}
          className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 rounded-full text-sm font-bold shadow-2xl transition"
        >
          Background
        </button>
      </div>

      {/* Full Page Editor - 60:40 */}
      <div className="w-full h-full flex">
        {/* Left Empty Area - 60% */}
        <div className="flex-[60] h-full"></div>

        {/* Right Area - 40% */}
        <div className="flex-[40] h-full p-6 flex items-center justify-start pl-6">
          <div className="w-full max-w-lg h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Empty for now */}
            </div>
          </div>
        </div>
      </div>

      {/* Background Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-8">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
            {/* Popup Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Choose Background</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Upload Section */}
            <div className="p-6 border-b border-slate-200">
              <label className="block">
                <div className="w-full p-8 border-2 border-dashed border-slate-300 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer text-center">
                  <p className="text-slate-600 font-semibold mb-2">Upload Your Image</p>
                  <p className="text-slate-400 text-sm">Click to browse or drag and drop</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Gallery Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Gallery</h3>
              <div className="grid grid-cols-3 gap-4">
                {GALLERY_IMAGES.map((url, index) => (
                  <div
                    key={index}
                    onClick={() => selectGalleryImage(url)}
                    className="aspect-video rounded-xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-blue-500 transition shadow-lg"
                  >
                    <img
                      src={url}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
