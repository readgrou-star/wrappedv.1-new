"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, GripVertical, Trash2 } from "lucide-react";

interface BuilderStep1Props {
    onNext: () => void;
}

const fieldTypes = [
    { type: 'short-text', label: 'Short Text', icon: '📝' },
    { type: 'long-text', label: 'Long Text', icon: '📄' },
    { type: 'email', label: 'Email', icon: '📧' },
    { type: 'phone', label: 'Phone', icon: '📱' },
    { type: 'date', label: 'Date', icon: '📅' },
    { type: 'multiple-choice', label: 'Multiple Choice', icon: '☑️' },
    { type: 'dropdown', label: 'Dropdown', icon: '🔽' },
];

export function BuilderStep1({ onNext }: BuilderStep1Props) {
    // For MVP, we'll just show a static form preview
    const formFields = [
        { id: 1, label: "What's your name? *", type: "text" },
        { id: 2, label: "Email address *", type: "email" },
    ];

    return (
        <div>
            <div className="grid md:grid-cols-3 gap-8">
                {/* Left Sidebar */}
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Form Settings</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="form-title">Form Title</Label>
                                <Input id="form-title" placeholder="e.g. Web Dev Bootcamp" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="form-description">Description</Label>
                                <Textarea id="form-description" placeholder="A short description of your event." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="event-type">Event Type</Label>
                                <Select>
                                    <SelectTrigger id="event-type">
                                        <SelectValue placeholder="Select event type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bootcamp">Bootcamp</SelectItem>
                                        <SelectItem value="hackathon">Hackathon</SelectItem>
                                        <SelectItem value="job-app">Job Application</SelectItem>
                                        <SelectItem value="seminar">Seminar</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Field Library</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">Click to add a field to your form.</p>
                            <div className="space-y-2">
                                {fieldTypes.map(field => (
                                    <Button key={field.type} variant="outline" className="w-full justify-start">
                                        <span className="mr-2">{field.icon}</span> {field.label}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Panel */}
                <div className="md:col-span-2">
                    <Card className="h-full">
                        <CardHeader><CardTitle>Form Preview</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {formFields.map(field => (
                                <div key={field.id} className="p-4 border rounded-lg flex items-center gap-2 group bg-background">
                                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                                    <div className="flex-1">
                                        <Label>{field.label}</Label>
                                        <Input type={field.type} placeholder="..." disabled />
                                    </div>
                                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                             <Button variant="secondary" className="w-full border-dashed border-2 h-12">
                                + Add Field
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <Button onClick={onNext} size="lg">
                    Next: Design Story <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
