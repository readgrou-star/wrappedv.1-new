
"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowRight, Check, Share2, Download, Linkedin, Twitter, ChevronDown, Sparkles } from 'lucide-react';

import { StoryPreview } from '@/components/story-preview';
import { Form, LandingBlock } from '@/types';
import { DEFAULT_LANDING_CONFIG, DEFAULT_STORY_CONFIG } from '@/lib/constants';
import { LandingPageView } from '@/components/landing-page-view';


const MOCK_FORM: Form = {
  id: "new",
  title: "My Awesome Event",
  description: "",
  status: "draft",
  created_at: new Date().toISOString(),
  stats: { views: 0, submissions: 0, shares: 0 },
  fields: [
    { id: 'f1', type: 'text', label: 'Full Name', required: true, showInStory: true, placeholder: 'Enter your name' },
    { id: 'f2', type: 'email', label: 'Email', required: true, showInStory: false, placeholder: 'name@example.com' },
    { id: 'f3', type: 'text', label: 'Company', required: false, showInStory: true, placeholder: 'Where do you work?' },
    {
      id: 'f4',
      type: 'select',
      label: 'What is your role?',
      required: true,
      showInStory: true,
      options: ['Engineer', 'Designer', 'Product Manager', 'Founder', 'Other'],
    },
  ],
  storyConfig: DEFAULT_STORY_CONFIG,
  landingConfig: {
    ...DEFAULT_LANDING_CONFIG,
    blocks: [
      {
        id: "b1",
        type: "hero",
        title: "Web Dev Bootcamp",
        content: "Join our intensive 12-week bootcamp to become a full-stack web developer.",
        style: {
          backgroundColor: "bg-slate-50",
          textColor: "text-slate-900",
          textAlign: "center",
          padding: "lg",
        }
      },
      {
        id: "b2",
        type: "features",
        title: "What You'll Learn",
        items: [
          { title: "React & Next.js", desc: "Master the most popular frontend framework." },
          { title: "Node.js & Express", desc: "Build robust and scalable backend services." },
          { title: "Databases", desc: "Learn both SQL and NoSQL databases like PostgreSQL and MongoDB." },
        ],
        style: {
          backgroundColor: "bg-white",
          textColor: "text-slate-900",
          textAlign: "center",
          padding: "md",
        }
      },
       {
        id: "b3",
        type: "text",
        title: "About the Instructors",
        content: "Our instructors are industry veterans with years of experience at top tech companies. They are passionate about teaching and helping you succeed.",
        style: {
          backgroundColor: "bg-slate-50",
          textColor: "text-slate-800",
          textAlign: "left",
          padding: "md",
        }
      }
    ],
  }
};

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
)

export default function ParticipantFormPage({ params }: { params: { formId: string } }) {
    const { formId } = useParams();
    const [form, setForm] = useState<Form | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const formRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const found = MOCK_FORM; // In real app, fetch form by ID
        setForm(found);
    }, [formId]);

    if (!form) return <div className="min-h-screen flex items-center justify-center font-bold">Loading...</div>;

    const currentField = form.fields[currentStep];
    const progress = ((currentStep) / form.fields.length) * 100;

    const handleNext = () => {
        if (currentStep < form.fields.length - 1) {
            setCurrentStep(c => c + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setIsSubmitted(true);
        }, 2000); 
    };

    const handleInputChange = (value: string) => {
        setAnswers(prev => ({...prev, [currentField.id]: value}));
    };
    
    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (isGenerating) {
        return (
            <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center text-white p-6 text-center">
                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-8"></div>
                <h2 className="text-3xl font-bold mb-4 stack-sans-headline">Generating your story...</h2>
                <p className="opacity-90 text-lg font-medium google-sans-flex">Hold tight.</p>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
                <div className="max-w-5xl w-full flex flex-col md:flex-row gap-12 items-center justify-center">
                    <div className="w-full max-w-[320px] bg-slate-900 p-2 rounded-xl shadow-2xl transform rotate-1 border border-slate-800">
                        <StoryPreview config={form.storyConfig} data={answers} fields={form.fields} className="rounded-lg" />
                    </div>
                    <div className="text-white max-w-md w-full">
                        <h1 className="text-4xl font-black mb-4 stack-sans-headline">You're in! 🎉</h1>
                        <p className="text-slate-400 text-lg mb-8 google-sans-flex font-medium leading-relaxed">
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
                            <button onClick={() => alert("Image download started!")} className="w-full bg-transparent border border-slate-700 hover:bg-slate-900 text-slate-300 font-bold py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 transition mt-2">
                                <Download className="w-4 h-4" /> Download Image
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
       <div className="h-screen bg-slate-50 font-sans flex flex-col md:flex-row overflow-hidden">
            <div className="md:w-[70%] h-full overflow-y-auto no-scrollbar relative z-0">
                <LandingPageView blocks={form.landingConfig.blocks} formTitle={form.title} />
                 {/* Minimal Footer */}
                 <div className="px-16 py-12 text-center text-slate-300 text-[10px] font-bold uppercase tracking-widest">
                    Powered by WrappedForm
                </div>
            </div>

            <div ref={formRef} className="md:w-[30%] h-full relative z-10 flex flex-col justify-center pointer-events-none">
                <div className="w-full px-6 md:px-8 pointer-events-auto">
                    
                    <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 max-h-[85vh] overflow-y-auto no-scrollbar flex flex-col">
                        
                        <div className="mb-8">
                            <div className="flex justify-between items-end mb-3">
                                <span className="text-slate-400 font-bold uppercase tracking-wide text-[10px]">Step {currentStep + 1} of {form.fields.length}</span>
                            </div>
                            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-900 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>

                        <div className="mb-8 flex-1">
                             <h2 className="text-2xl font-bold text-slate-900 leading-tight stack-sans-headline mb-6">
                                {currentField.label} {currentField.required && <span className="text-blue-600">*</span>}
                            </h2>

                            {currentField.type === 'select' ? (
                                <div className="space-y-2">
                                    {currentField.options?.map((opt) => (
                                        <button 
                                            key={opt}
                                            onClick={() => handleInputChange(opt)}
                                            className={`w-full text-left p-3.5 rounded-xl border transition-all text-sm font-bold ${answers[currentField.id] === opt ? 'border-slate-900 bg-slate-900 text-white shadow-md' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white'}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                {opt}
                                                {answers[currentField.id] === opt && <Check className="w-4 h-4" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : currentField.type === 'dropdown' ? (
                                <div className="relative">
                                    <select
                                        value={answers[currentField.id] || ''}
                                        onChange={(e) => handleInputChange(e.target.value)}
                                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-base font-bold text-slate-900 focus:border-slate-900 outline-none transition-colors"
                                    >
                                        <option value="" disabled>Select an option...</option>
                                        {currentField.options?.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            ) : (
                                <input
                                    autoFocus
                                    type={currentField.type}
                                    value={answers[currentField.id] || ''}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && answers[currentField.id] && handleNext()}
                                    className="w-full text-xl text-slate-900 border-b border-slate-200 focus:border-slate-900 outline-none py-2 bg-transparent placeholder-slate-300 transition-colors font-bold stack-sans-headline"
                                    placeholder="Type here..."
                                />
                            )}
                        </div>

                        <button 
                            onClick={handleNext}
                            disabled={currentField.required && !answers[currentField.id]}
                            className="w-full bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 text-white text-sm font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            {currentStep === form.fields.length - 1 ? 'Complete Registration' : 'Next'}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                         <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wide">Secure via WrappedForm</p>
                    </div>

                </div>
            </div>
        </div>
    );
}




    