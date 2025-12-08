'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Download, Linkedin, Twitter } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { StoryPreview } from '@/components/story-preview';
import { DEFAULT_STORY_CONFIG } from '@/lib/constants';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
)

export default function StoryPage({ params }: { params: { submissionId: string } }) {
    const [loading, setLoading] = useState(true);
    // Mock data for now
    const answers = {f1: "Alex"}; 
    const fields = [{ id: 'f1', type: 'text', label: 'Full Name', required: true, showInStory: true }];
    const storyConfig = DEFAULT_STORY_CONFIG;


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // Simulate generation time
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
         return (
            <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center text-white p-6 text-center">
                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-8"></div>
                <h2 className="text-3xl font-bold mb-4 stack-sans-headline">Generating your story...</h2>
                <p className="opacity-90 text-lg font-medium google-sans-flex">Hold tight.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <div className="max-w-5xl w-full flex flex-col md:flex-row gap-12 items-center justify-center">
                <div className="w-full max-w-[320px] bg-slate-900 p-2 rounded-xl shadow-2xl transform rotate-1 border border-slate-800">
                    <StoryPreview config={storyConfig} data={answers} fields={fields} className="rounded-lg" />
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
