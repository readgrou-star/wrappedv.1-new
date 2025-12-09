"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function BuilderEditor() {
  const [showPopup, setShowPopup] = useState(false);

  const initialCards = [
    { id: 0, name: "Request files", content: "form" },
    { id: 1, name: "Settings", content: "settings" },
    { id: 2, name: "Preview", content: "preview" }
  ];

  const [cards, setCards] = useState(initialCards);

  const moveToEnd = (index: number) => {
    setCards(prev => [...prev.slice(index + 1), ...prev.slice(0, index + 1)]);
  };

  const offset = 40;
  const scaleStep = 0.03;
  const spring = {
    type: 'spring' as const,
    stiffness: 170,
    damping: 26
  };

  const renderContent = (content: string) => {
    if (content === "form") {
      return (
        <div className="p-4 min-h-full">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button className="flex flex-col items-center justify-center p-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition">
              <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center mb-1">
                <span className="text-white text-base font-light">+</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-900">Add files</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition">
              <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center mb-1">
                <span className="text-white text-base font-light">+</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-900">Add folders</span>
            </button>
          </div>

          <div className="text-center mb-3">
            <span className="text-[10px] text-slate-500">Get unlimited transfers </span>
            <button className="text-[10px] text-purple-600 font-semibold hover:underline">
              ⚡ Increase limit
            </button>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] text-slate-500">Email to</label>
                <span className="text-[10px] text-slate-400">0 of 3</span>
              </div>
              <input
                type="text"
                className="w-full px-0 py-1 border-0 border-b border-slate-200 focus:border-blue-600 focus:outline-none text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-500 block mb-1">Your email</label>
              <input
                type="email"
                className="w-full px-0 py-1 border-0 border-b border-slate-200 focus:border-blue-600 focus:outline-none text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-500 block mb-1">Title</label>
              <input
                type="text"
                className="w-full px-0 py-1 border-0 border-b border-slate-200 focus:border-blue-600 focus:outline-none text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-500 block mb-1">Message</label>
              <input
                type="text"
                className="w-full px-0 py-1 border-0 border-b border-slate-200 focus:border-blue-600 focus:outline-none text-xs text-slate-900"
              />
            </div>

            <div className="flex gap-1.5 pt-2">
              <button className="flex-1 flex items-center justify-between px-2.5 py-2 bg-slate-50 hover:bg-slate-100 rounded-2xl transition border border-slate-200">
                <div className="flex items-center gap-1">
                  <span className="text-xs">📅</span>
                  <span className="text-blue-600 font-semibold text-[10px]">3 days</span>
                </div>
                <span className="text-slate-400 text-[10px]">^</span>
              </button>
              <button className="px-2.5 py-2 bg-slate-50 hover:bg-slate-100 rounded-2xl transition border border-slate-200">
                <span className="text-slate-600 font-bold text-[10px]">•••</span>
              </button>
            </div>

            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition shadow-lg text-xs mt-2">
              Transfer
            </button>
          </div>
        </div>
      );
    } else if (content === "settings") {
      return (
        <div className="p-4 min-h-full">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-600 block mb-1">Theme</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:border-blue-600 focus:outline-none">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-600 block mb-1">Language</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:border-blue-600 focus:outline-none">
                <option>English</option>
                <option>Indonesia</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-600 block mb-1">Font Size</label>
              <input type="range" min="12" max="20" className="w-full" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-4 min-h-full">
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-3">👁️</div>
            <p className="text-xs text-slate-600 mb-2">Preview Mode</p>
            <p className="text-[10px] text-slate-500">Your content will appear here</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-sky-400 to-blue-500">
      {/* Hero Section - Right Side */}
      <div className="absolute inset-0 flex items-center justify-end pr-16">
        <div className="text-right text-white max-w-2xl">
          <h1 className="text-7xl font-bold mb-6">Transfer ideas.</h1>
          <h2 className="text-7xl font-bold mb-8">Transform the world.</h2>
          <button
            onClick={() => setShowPopup(true)}
            className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition shadow-xl"
          >
            Read More
          </button>
        </div>
      </div>

      {/* Floating Card Stack - Left Side */}
      <div className="absolute left-16 top-1/2 -translate-y-[45%] z-10">
        <div className="relative w-[280px] h-[480px]">
          <ul className="relative w-full h-full m-0 p-0">
            {cards.map((card, i) => {
              const isFront = i === 0;
              const brightness = Math.max(0.9, 1 - i * 0.05);

              return (
                <motion.li
                  key={card.id}
                  className="absolute w-full list-none"
                  style={{
                    cursor: isFront ? 'grab' : 'pointer',
                    touchAction: 'none'
                  }}
                  animate={{
                    top: `${i * -offset}px`,
                    scale: 1 - i * scaleStep,
                    filter: `brightness(${brightness})`,
                    zIndex: cards.length - i
                  }}
                  transition={spring}
                  drag={isFront ? 'y' : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragMomentum={false}
                  onDragEnd={(e, info) => {
                    if (info.offset.y < -50) {
                      moveToEnd(i);
                    }
                  }}
                  whileDrag={
                    isFront
                      ? {
                          zIndex: cards.length + 10,
                          cursor: 'grabbing',
                          scale: 1 - i * scaleStep + 0.02,
                          rotate: 2
                        }
                      : {}
                  }
                >
                  {/* Card dengan Header dan Body */}
                  <div 
                    className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer"
                    onClick={() => !isFront && moveToEnd(i)}
                  >
                    {/* Card Header - Selalu Keliatan */}
                    <div
                      className={`w-full px-4 py-3 font-bold transition ${
                        isFront
                          ? "text-base text-slate-900"
                          : "text-sm text-slate-700 hover:text-slate-900"
                      }`}
                    >
                      {card.name}
                    </div>

                    {/* Card Body - Semua card punya body dengan scroll */}
                    <div className="w-[280px] h-[420px] overflow-y-auto overflow-x-hidden custom-scrollbar">
                      {isFront ? renderContent(card.content) : <div className="bg-slate-50 h-full" />}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Popup Phone - Slide from Bottom */}
      <div
        className={`fixed left-[340px] bottom-0 w-[380px] bg-white rounded-t-3xl shadow-2xl transition-transform duration-500 ease-out z-20 ${
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
