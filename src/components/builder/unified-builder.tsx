"use client";

import { Save } from "lucide-react";
import Link from "next/link";
import React from "react";

interface UnifiedBuilderProps {
  step: string;
  onSave: () => void;
  sidebarContent: React.ReactNode;
  canvasContent: React.ReactNode;
}

export function UnifiedBuilder({ step, onSave, sidebarContent, canvasContent }: UnifiedBuilderProps) {
  return (
    <div className="flex h-screen bg-[#1c1c1e]">
      {/* Transparent Sidebar */}
      <div className="w-[280px] p-6 flex-shrink-0">
        <div className="h-full flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-semibold text-base text-white/90">Builder</span>
            </div>
            
            <div className="flex flex-col gap-1.5 mb-4">
              <Link href="/builder/build" className={`px-3 py-2 rounded-lg text-sm font-medium transition ${step === "build" ? "bg-white/10 text-white backdrop-blur-sm" : "text-white/60 hover:text-white/80 hover:bg-white/5"}`}>
                1. Form
              </Link>
              <Link href="/builder/design" className={`px-3 py-2 rounded-lg text-sm font-medium transition ${step === "design" ? "bg-white/10 text-white backdrop-blur-sm" : "text-white/60 hover:text-white/80 hover:bg-white/5"}`}>
                2. Design Story
              </Link>
              <Link href="/builder/landing" className={`px-3 py-2 rounded-lg text-sm font-medium transition ${step === "landing" ? "bg-white/10 text-white backdrop-blur-sm" : "text-white/60 hover:text-white/80 hover:bg-white/5"}`}>
                3. Landing Page
              </Link>
            </div>

            <button onClick={onSave} className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
              <Save className="w-4 h-4" /> Save
            </button>
          </div>

          {sidebarContent}
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 p-6 pr-6 overflow-hidden">
        <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          {canvasContent}
        </div>
      </div>
    </div>
  );
}
