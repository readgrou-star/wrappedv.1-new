"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { FormEditor } from "@/components/builder/form-editor";
import { DesignEditor } from "@/components/builder/design-editor";
import { LandingEditor } from "@/components/builder/landing-editor";
import { DEFAULT_LANDING_CONFIG, DEFAULT_STORY_CONFIG } from "@/lib/constants";
import type { Form } from "@/types";

const INITIAL_FORM: Form = {
  id: "new",
  title: "My Awesome Event",
  description: "",
  status: "draft",
  created_at: new Date().toISOString(),
  stats: { views: 0, submissions: 0, shares: 0 },
  fields: [
    {
      id: "f1",
      type: "text",
      label: "Full Name",
      required: true,
      showInStory: true,
      placeholder: "Enter your name",
    },
    {
      id: "f2",
      type: "email",
      label: "Email",
      required: true,
      showInStory: false,
      placeholder: "name@example.com",
    },
  ],
  storyConfig: DEFAULT_STORY_CONFIG,
  landingConfig: DEFAULT_LANDING_CONFIG,
};

export default function Builder() {
  const router = useRouter();
  const params = useParams();
  const step = params.step || "build";
  const [form, setForm] = useState<Form>(INITIAL_FORM);

  const handleSave = async () => {
    alert('Saved!');
  };

  if (step === "build") {
    return <FormEditor step={step as string} form={form} onSave={handleSave} />;
  }

  if (step === "design") {
    return <DesignEditor step={step as string} form={form} onSave={handleSave} />;
  }

  if (step === "landing") {
    return <LandingEditor step={step as string} form={form} onSave={handleSave} />;
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Step: {step}</h1>
        <p className="text-slate-600">Editor for this step coming soon</p>
      </div>
    </div>
  );
}
