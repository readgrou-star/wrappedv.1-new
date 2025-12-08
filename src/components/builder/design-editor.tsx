"use client";

import { AlignCenter, AlignLeft, AlignRight, Box, ImageIcon, Save, Trash2, Type } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import type { Form, StoryElement } from "@/types";

interface DesignEditorProps {
  step: string;
  form: Form;
  onSave: () => void;
}

export function DesignEditor({ step, form: initialForm, onSave }: DesignEditorProps) {
  const [form, setForm] = useState<Form>(initialForm);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isDraggingElement, setIsDraggingElement] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addStoryElement = (type: "text" | "shape" | "image") => {
    const newEl: StoryElement = {
      id: `el-${Date.now()}`,
      type,
      x: 50,
      y: 50,
      content: type === "text" ? "New Text" : undefined,
      width: type === "shape" ? 20 : undefined,
      height: type === "shape" ? 10 : undefined,
      style: {
        color: "#ffffff",
        backgroundColor: type === "shape" ? "#ffffff" : undefined,
        fontSize: 20,
        textAlign: "center",
        fontWeight: "700",
      },
    };
    setForm((prev) => ({
      ...prev,
      storyConfig: {
        ...prev.storyConfig,
        elements: [...prev.storyConfig.elements, newEl],
      },
    }));
    setSelectedElementId(newEl.id);
  };

  const updateStoryElement = (id: string, updates: Partial<StoryElement> | Partial<StoryElement["style"]>) => {
    setForm((prev) => ({
      ...prev,
      storyConfig: {
        ...prev.storyConfig,
        elements: prev.storyConfig.elements.map((el) => {
          if (el.id !== id) return el;
          const isStyleUpdate = Object.keys(updates).some((k) =>
            ["color", "fontSize", "backgroundColor", "textAlign", "fontWeight"].includes(k)
          );
          if (isStyleUpdate) {
            return { ...el, style: { ...el.style, ...updates } };
          }
          return { ...el, ...updates };
        }),
      },
    }));
  };

  const removeStoryElement = (id: string) => {
    setForm((prev) => ({
      ...prev,
      storyConfig: {
        ...prev.storyConfig,
        elements: prev.storyConfig.elements.filter((el) => el.id !== id),
      },
    }));
    setSelectedElementId(null);
  };

  const handleElementMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedElementId(id);
    setIsDraggingElement(true);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingElement || !selectedElementId || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    updateStoryElement(selectedElementId, { x, y });
  };

  const handleCanvasMouseUp = () => {
    setIsDraggingElement(false);
  };

  const selectedElement = form.storyConfig.elements.find((el) => el.id === selectedElementId);

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

          <div className="mb-3">
            <h3 className="font-medium text-white/90 text-sm mb-2">Add Elements</h3>
            <div className="grid grid-cols-3 gap-1.5">
              <button onClick={() => addStoryElement("text")} className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-xs font-medium text-white/70">
                <Type className="w-4 h-4 mb-0.5 text-white/90" />
                Text
              </button>
              <button onClick={() => addStoryElement("shape")} className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-xs font-medium text-white/70">
                <Box className="w-4 h-4 mb-0.5 text-white/90" />
                Shape
              </button>
              <button onClick={() => addStoryElement("image")} className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-xs font-medium text-white/70">
                <ImageIcon className="w-4 h-4 mb-0.5 text-white/90" />
                Image
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <h3 className="font-medium text-white/50 text-xs uppercase tracking-wide mb-2">Properties</h3>

            {selectedElement ? (
              <div className="space-y-2">
                {selectedElement.type === "text" && (
                  <div>
                    <label className="block text-[9px] font-medium text-white/50 mb-1">Content</label>
                    <textarea
                      value={selectedElement.content || ""}
                      onChange={(e) => updateStoryElement(selectedElement.id, { content: e.target.value })}
                      className="w-full text-xs p-1.5 bg-white/5 border border-white/10 rounded text-white outline-none"
                      rows={2}
                    />
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {form.fields.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => updateStoryElement(selectedElement.id, { content: `{${f.label}}` })}
                          className="text-[9px] px-1.5 py-0.5 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/30"
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-1.5">
                  <div>
                    <label className="block text-[9px] font-medium text-white/50 mb-1">Color</label>
                    <input type="color" value={selectedElement.style.color || "#000000"} onChange={(e) => updateStoryElement(selectedElement.id, { color: e.target.value })} className="w-full h-7 rounded cursor-pointer" />
                  </div>
                  {selectedElement.type === "text" && (
                    <div>
                      <label className="block text-[9px] font-medium text-white/50 mb-1">Size</label>
                      <input type="number" value={selectedElement.style.fontSize} onChange={(e) => updateStoryElement(selectedElement.id, { fontSize: parseInt(e.target.value) })} className="w-full text-xs p-1.5 bg-white/5 border border-white/10 rounded text-white outline-none" />
                    </div>
                  )}
                </div>

                {selectedElement.type === "shape" && (
                  <div>
                    <label className="block text-[9px] font-medium text-white/50 mb-1">Background</label>
                    <input type="color" value={selectedElement.style.backgroundColor || "#ffffff"} onChange={(e) => updateStoryElement(selectedElement.id, { backgroundColor: e.target.value })} className="w-full h-7 rounded cursor-pointer" />
                  </div>
                )}

                <div>
                  <label className="block text-[9px] font-medium text-white/50 mb-1">Align</label>
                  <div className="flex bg-white/5 p-0.5 rounded">
                    {["left", "center", "right"].map((align) => (
                      <button
                        key={align}
                        onClick={() => updateStoryElement(selectedElement.id, { textAlign: align as any })}
                        className={`flex-1 p-1 rounded flex justify-center ${selectedElement.style.textAlign === align ? "bg-white/10" : "text-white/40"}`}
                      >
                        {align === "left" && <AlignLeft className="w-3 h-3" />}
                        {align === "center" && <AlignCenter className="w-3 h-3" />}
                        {align === "right" && <AlignRight className="w-3 h-3" />}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={() => removeStoryElement(selectedElement.id)} className="w-full mt-2 py-1.5 bg-red-600/20 text-red-400 rounded-lg text-xs font-medium flex items-center justify-center gap-2 hover:bg-red-600/30">
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>
            ) : (
              <p className="text-xs text-white/40 text-center py-6">Select an element to edit</p>
            )}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 p-6 pr-6 overflow-hidden">
        <div className="w-full h-full bg-white rounded-2xl shadow-2xl flex items-center justify-center">
          <div
            className="relative w-[360px] h-[640px] shadow-2xl bg-white overflow-hidden select-none"
            style={{ backgroundColor: form.storyConfig.backgroundColor }}
            ref={canvasRef}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
          >
            <div className="absolute top-2 right-2 z-50">
              <input
                type="color"
                value={form.storyConfig.backgroundColor}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    storyConfig: {
                      ...p.storyConfig,
                      backgroundColor: e.target.value,
                    },
                  }))
                }
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm cursor-pointer"
                title="Background Color"
              />
            </div>

            {form.storyConfig.elements.map((el) => {
              const isSelected = selectedElementId === el.id;
              const isCenter = el.style.textAlign === "center";
              const isRight = el.style.textAlign === "right";

              return (
                <div
                  key={el.id}
                  onMouseDown={(e) => handleElementMouseDown(e, el.id)}
                  className={`absolute cursor-move hover:outline hover:outline-1 hover:outline-blue-300 ${isSelected ? "outline outline-2 outline-blue-600 z-50" : ""}`}
                  style={{
                    top: `${el.y}%`,
                    left: `${el.x}%`,
                    transform: isCenter ? "translate(-50%, -50%)" : isRight ? "translate(-100%, -50%)" : "translate(0, -50%)",
                    color: el.style.color,
                    fontSize: `${el.style.fontSize}px`,
                    fontWeight: el.style.fontWeight,
                    textAlign: el.style.textAlign,
                    fontFamily: "Stack Sans Headline, sans-serif",
                    width: el.type === "shape" ? `${el.width}%` : undefined,
                    height: el.type === "shape" ? `${el.height}%` : undefined,
                    backgroundColor: el.style.backgroundColor,
                    borderRadius: el.style.borderRadius ? `${el.style.borderRadius}%` : undefined,
                    opacity: el.style.opacity,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {el.type === "text" && (el.content || "Text")}
                  {el.type === "image" && (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-[10px]">Image</div>
                  )}

                  {isSelected && (
                    <>
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-blue-600 rounded-full"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-blue-600 rounded-full"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-blue-600 rounded-full"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-blue-600 rounded-full"></div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
