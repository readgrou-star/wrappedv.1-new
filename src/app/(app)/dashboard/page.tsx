"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Users, Share2, FileText, AlertTriangle, ArrowRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock Form type since it's not defined in the project
interface Form {
  id: string;
  title: string;
  status: 'active' | 'closed';
  created_at: string;
  stats: {
    views: number;
    submissions: number;
    shares: number;
  };
}

// Mock data to replace db call
const mockForms: Form[] = [
  { id: 'web-dev-bootcamp', title: 'Web Dev Bootcamp Registration', status: 'active', created_at: '2024-07-20T10:00:00Z', stats: { views: 1200, submissions: 127, shares: 89 } },
  { id: 'ai-hackathon', title: 'AI Hackathon Application', status: 'active', created_at: '2024-07-18T14:30:00Z', stats: { views: 800, submissions: 88, shares: 61 } },
  { id: 'ux-designer', title: 'UX Designer Job Application', status: 'closed', created_at: '2024-06-22T09:00:00Z', stats: { views: 500, submissions: 32, shares: 15 } },
];


export default function Dashboard() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const useMockMode = true; // Simulating demo mode
  const user = { full_name: 'Alex', email: 'alex@example.com' }; // Mock user


  useEffect(() => {
    const fetchForms = async () => {
        // Mocking data fetching
        setForms(mockForms);
        setLoading(false);
    };
    fetchForms();
  }, []);

  const totalSubmissions = forms.reduce((acc, f) => acc + f.stats.submissions, 0);
  const totalShares = forms.reduce((acc, f) => acc + f.stats.shares, 0);

  return (
    <div className="min-h-screen pb-20 bg-slate-50/50 -m-4 lg:-m-6">
       {/* Top Nav is part of the main layout, so we'll just build the page content */}
       <main className="max-w-7xl mx-auto px-6 py-10">
            
            {useMockMode && (
                <div className="bg-white rounded-lg p-3 mb-8 flex items-start gap-3 border border-yellow-200 shadow-sm max-w-2xl">
                    <div className="p-1 bg-yellow-50 rounded text-yellow-600">
                        <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-slate-900">Database Not Connected</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            You are currently in demo mode. Data is saved to your browser.
                        </p>
                    </div>
                </div>
            )}

            <div className="flex items-end justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Manage your forms and track performance</p>
                </div>
                <Button asChild className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg hover:bg-slate-800 transition font-medium text-sm shadow-sm">
                    <Link href="/builder">
                        <Plus className="w-4 h-4" />
                        Create New Form
                    </Link>
                </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="bg-white rounded-lg border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center border border-blue-100">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Forms</p>
                            <p className="text-2xl font-bold text-slate-900">{forms.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center border border-green-100">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Submissions</p>
                            <p className="text-2xl font-bold text-slate-900">{totalSubmissions}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center border border-purple-100">
                            <Share2 className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Viral Shares</p>
                            <p className="text-2xl font-bold text-slate-900">{totalShares}</p>
                        </div>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-slate-200 border-t-slate-900"></div>
                </div>
            ) : forms.length === 0 ? (
                 <div className="text-center py-24 bg-white rounded-lg border-dashed border border-slate-300 bg-slate-50/50">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400 border border-slate-200">
                        <Plus className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">No forms yet</h3>
                    <p className="text-slate-500 mb-6 max-w-xs mx-auto text-sm">Create your first form to start collecting registrations.</p>
                     <Button asChild className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium text-sm shadow-sm">
                        <Link href="/builder">
                            Create Form
                        </Link>
                    </Button>
                 </div>
            ) : (
                /* Forms Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {forms.map((form) => (
                        <div key={form.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col group hover:border-slate-300 transition-colors">
                            <div className="h-40 bg-slate-50 relative overflow-hidden flex items-center justify-center p-6 border-b border-slate-100">
                                <div className="transform group-hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg overflow-hidden w-24 aspect-[9/16] bg-slate-200 flex items-center justify-center">
                                    <span className="text-xs text-slate-500">Preview</span>
                                </div>
                                <div className="absolute top-3 right-3">
                                     <button className="p-1.5 bg-white rounded-md shadow-sm text-slate-400 hover:text-slate-900 border border-slate-200">
                                        <MoreHorizontal className="w-4 h-4" />
                                     </button>
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col bg-white">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-slate-900 truncate pr-4">{form.title}</h3>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                     <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${form.status === 'active' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                                        {form.status}
                                    </span>
                                    <span className="text-[10px] font-medium text-slate-400">
                                        {new Date(form.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-50 mt-auto">
                                    <div className="text-center">
                                        <span className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">Views</span>
                                        <span className="font-bold text-sm text-slate-700">{form.stats.views}</span>
                                    </div>
                                    <div className="text-center border-l border-slate-50">
                                        <span className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">Subs</span>
                                        <span className="font-bold text-sm text-slate-700">{form.stats.submissions}</span>
                                    </div>
                                    <div className="text-center border-l border-slate-50">
                                        <span className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">Shares</span>
                                        <span className="font-bold text-sm text-blue-600">{form.stats.shares}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-4 pt-3 border-t border-slate-50">
                                    <Button asChild variant="outline" className="flex-1 py-2 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 rounded-lg border-slate-200 transition">
                                        <Link href={`/analytics/${form.id}`}>Analytics</Link>
                                    </Button>
                                    <Button asChild className="flex-1 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition flex items-center justify-center gap-1">
                                        <Link href={`/f/${form.id}`}>
                                            View <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Create New Placeholder Card */}
                    <Link href="/builder" className="flex flex-col items-center justify-center h-full min-h-[350px] border border-dashed border-slate-300 rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all gap-3 group bg-white">
                        <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 group-hover:bg-white flex items-center justify-center text-slate-400 group-hover:text-slate-600 transition-colors">
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-sm text-slate-500 group-hover:text-slate-700">Create New Form</span>
                    </Link>
                </div>
            )}
       </main>
    </div>
  );
}
