"use client";

import { ArrowRight, ChevronDown, ChevronUp, Plus, PlusCircle, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import type { Form, FormField } from "@/types";

interface FormEditorProps {
  step: string;
  form: Form;
  onSave: () => void;
}

export function FormEditor({ step, form: initialForm, onSave }: FormEditorProps) {
  const [form, setForm] = useState<Form>(initialForm);

  const updateField = (id: string, updates: Partial<FormField>) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    }));
  };

  const addField = () => {
    const newField: FormField = {
      id: `f${Date.now()}`,
      type: "text",
      label: "New Question",
      required: true,
      showInStory: false,
    };
    setForm((prev) => ({ ...prev, fields: [...prev.fields, newField] }));
  };

  const removeField = (id: string) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.filter((f) => f.id !== id),
    }));
  };

  const moveOption = (fieldId: string, index: number, direction: "up" | "down") => {
    const field = form.fields.find((f) => f.id === fieldId);
    if (!field || !field.options) return;

    const newOptions = [...field.options];
    if (direction === "up" && index > 0) {
      [newOptions[index], newOptions[index - 1]] = [newOptions[index - 1], newOptions[index]];
    } else if (direction === "down" && index < newOptions.length - 1) {
      [newOptions[index], newOptions[index + 1]] = [newOptions[index + 1], newOptions[index]];
    }
    updateField(fieldId, { options: newOptions });
  };

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

          <div className="flex-1 overflow-y-auto space-y-3">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Form Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-white/20"
                placeholder="E.g. Summer Hackathon"
              />
            </div>

            <div className="space-y-2">
              {form.fields.map((field, idx) => (
                <div key={field.id} className="bg-white/5 border border-white/10 rounded-lg p-2.5 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded bg-white/10 text-[9px] flex items-center justify-center font-medium text-white/70">
                        {idx + 1}
                      </span>
                      <select
                        value={field.type}
                        onChange={(e) => {
                          const newType = e.target.value as FormField["type"];
                          const updates: Partial<FormField> = { type: newType };
                          if ((newType === "select" || newType === "dropdown") && (!field.options || field.options.length === 0)) {
                            updates.options = ["Option 1", "Option 2", "Option 3"];
                          }
                          updateField(field.id, updates);
                        }}
                        className="text-[9px] font-medium bg-white/10 border border-white/10 rounded px-1.5 py-0.5 text-white/70 outline-none"
                      >
                        <option value="text">Short Text</option>
                        <option value="email">Email</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                        <option value="select">Multiple Choice</option>
                        <option value="dropdown">Dropdown</option>
                      </select>
                    </div>
                    <button onClick={() => removeField(field.id)} className="text-white/30 hover:text-red-400 transition">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                    className="w-full text-sm font-medium bg-transparent border-b border-white/10 hover:border-white/20 focus:border-white/30 outline-none py-1 mb-2 text-white"
                    placeholder="Enter your question"
                  />

                  {(field.type === "select" || field.type === "dropdown") && (
                    <div className="mt-1.5 p-2 bg-white/5 rounded border border-white/10">
                      <label className="text-[9px] font-medium text-white/40 mb-1.5 block">Options</label>
                      <div className="space-y-1">
                        {(field.options || []).map((option, optIdx) => (
                          <div key={optIdx} className="flex items-center gap-1.5">
                            <div className="flex flex-col gap-0.5">
                              <button onClick={() => moveOption(field.id, optIdx, "up")} disabled={optIdx === 0} className="text-white/30 hover:text-blue-400 disabled:opacity-0">
                                <ChevronUp className="w-2.5 h-2.5" />
                              </button>
                              <button onClick={() => moveOption(field.id, optIdx, "down")} disabled={optIdx === (field.options?.length || 0) - 1} className="text-white/30 hover:text-blue-400 disabled:opacity-0">
                                <ChevronDown className="w-2.5 h-2.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...(field.options || [])];
                                newOptions[optIdx] = e.target.value;
                                updateField(field.id, { options: newOptions });
                              }}
                              className="flex-1 text-xs p-1.5 bg-white/5 border border-white/10 rounded text-white outline-none"
                            />
                            <button onClick={() => {
                              const newOptions = field.options?.filter((_, i) => i !== optIdx);
                              updateField(field.id, { options: newOptions });
                            }} className="text-white/30 hover:text-red-400">
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => {
                        const newOptions = [...(field.options || []), `New Option`];
                        updateField(field.id, { options: newOptions });
                      }} className="mt-1.5 text-[9px] font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        <Plus className="w-2.5 h-2.5" /> Add Option
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-1.5 border-t border-white/10 mt-1.5">
                    <label className="flex items-center gap-1.5 text-[9px] font-medium text-white/60 cursor-pointer">
                      <input type="checkbox" checked={field.required} onChange={(e) => updateField(field.id, { required: e.target.checked })} className="rounded w-3 h-3" />
                      Required
                    </label>
                    <label className="flex items-center gap-1.5 text-[9px] font-medium text-blue-400 cursor-pointer">
                      <input type="checkbox" checked={field.showInStory} onChange={(e) => updateField(field.id, { showInStory: e.target.checked })} className="rounded w-3 h-3" />
                      Show in Story
                    </label>
                  </div>
                </div>
              ))}
              <button onClick={addField} className="w-full py-2 border border-dashed border-white/20 rounded-lg text-white/60 font-medium hover:border-white/30 hover:text-white/80 hover:bg-white/5 transition flex items-center justify-center gap-2 text-sm">
                <PlusCircle className="w-3.5 h-3.5" />
                Add Question
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 p-6 pr-6 overflow-hidden">
        <div className="w-full h-full bg-white rounded-2xl shadow-2xl flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px] flex flex-col">
            <div className="bg-slate-50 border-b border-slate-200 p-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Form Preview
            </div>
            <div className="flex-1 p-8 flex flex-col justify-center">
              {form.fields.length > 0 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-bold text-slate-900 mb-3 stack-sans-headline">
                      1. {form.fields[0].label} {form.fields[0].required && <span className="text-red-500">*</span>}
                    </label>

                    {form.fields[0].type === "select" ? (
                      <div className="space-y-2">
                        {(form.fields[0].options?.length ? form.fields[0].options : ["Option 1", "Option 2"]).map((opt, i) => (
                          <div key={i} className="w-full text-left p-3 rounded-lg border border-slate-200 bg-white text-base font-bold text-slate-400">
                            {opt || "Option"}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <input disabled type={form.fields[0].type} placeholder={form.fields[0].placeholder} className="w-full text-xl bg-transparent border-b border-slate-200 py-2 outline-none font-medium text-slate-400" />
                    )}
                  </div>
                  <div className="flex gap-2 mt-8">
                    <button disabled className="bg-slate-900 text-white px-6 py-2.5 rounded-lg opacity-50 cursor-not-allowed font-bold text-sm flex items-center gap-2">
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
