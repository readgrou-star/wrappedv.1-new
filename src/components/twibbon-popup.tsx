"use client";

import { Download, Linkedin, Twitter } from "lucide-react";
import { StoryPreview } from "@/components/story-preview";
import { DEFAULT_STORY_CONFIG } from "@/lib/constants";

interface TwibbonPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

export default function TwibbonPopup({ isOpen, onClose }: TwibbonPopupProps) {
  // Mock data untuk preview
  const mockAnswers = {
    f1: "John Doe",
    f3: "Tech Corp",
    f4: "Engineer"
  };

  const mockFields = [
    { id: 'f1', type: 'text' as const, label: 'Full Name', required: true, showInStory: true, placeholder: 'Enter your name' },
    { id: 'f3', type: 'text' as const, label: 'Company', required: false, showInStory: true, placeholder: 'Where do you work?' },
    { id: 'f4', type: 'select' as const, label: 'Role', required: true, showInStory: true, options: ['Engineer', 'Designer'] },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="bg-slate-950 rounded-2xl shadow-2xl max-w-5xl w-full p-12 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center hover:bg-slate-800 rounded-lg transition text-slate-400"
          >
            <span className="text-xl">×</span>
          </button>

          {/* Content */}
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            {/* Story Preview */}
            <div className="w-full max-w-[320px] bg-slate-900 p-2 rounded-xl shadow-2xl transform rotate-1 border border-slate-800">
              <StoryPreview 
                config={DEFAULT_STORY_CONFIG} 
                data={mockAnswers} 
                fields={mockFields} 
                className="rounded-lg" 
              />
            </div>

            {/* Actions */}
            <div className="text-white max-w-md w-full">
              <h1 className="text-4xl font-black mb-4">You're in! 🎉</h1>
              <p className="text-slate-400 text-lg mb-8 font-medium leading-relaxed">
                Your spot is reserved. Share your acceptance story to let your network know you're attending.
              </p>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3.5 px-6 rounded-lg flex items-center justify-center gap-3 transition shadow-lg shadow-purple-900/50">
                  <InstagramIcon className="w-5 h-5" /> Share to Instagram Story
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 transition border border-slate-700">
                    <Twitter className="w-4 h-4" /> Post to X
                  </button>
                  <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 transition shadow-lg shadow-blue-900/50">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </button>
                </div>
                <button 
                  onClick={() => alert("Image download started!")} 
                  className="w-full bg-transparent border border-slate-700 hover:bg-slate-900 text-slate-300 font-bold py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 transition mt-2"
                >
                  <Download className="w-4 h-4" /> Download Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
