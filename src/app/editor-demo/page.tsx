"use client";

import { useState } from "react";
import { CoreForm } from "@/features/editor/components/core-form";
import { CoreLanding } from "@/features/editor/components/core-landing";
import { CoreTwibbon } from "@/features/editor/components/core-twibbon";

export default function EditorDemo() {
  const [activeCore, setActiveCore] = useState<"form" | "landing" | "twibbon">("form");

  return (
    <div className="flex h-screen flex-col">
      <div className="flex gap-4 border-b p-4">
        <button
          onClick={() => setActiveCore("form")}
          className={`px-4 py-2 rounded ${activeCore === "form" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Core Form
        </button>
        <button
          onClick={() => setActiveCore("landing")}
          className={`px-4 py-2 rounded ${activeCore === "landing" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Core Landing
        </button>
        <button
          onClick={() => setActiveCore("twibbon")}
          className={`px-4 py-2 rounded ${activeCore === "twibbon" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Core Twibbon
        </button>
      </div>

      <div className="flex-1">
        {activeCore === "form" && (
          <CoreForm
            onSave={(values) => console.log("Form saved:", values)}
          />
        )}
        {activeCore === "landing" && (
          <CoreLanding
            onSave={(values) => console.log("Landing saved:", values)}
          />
        )}
        {activeCore === "twibbon" && (
          <CoreTwibbon
            onSave={(values) => console.log("Twibbon saved:", values)}
          />
        )}
      </div>
    </div>
  );
}
