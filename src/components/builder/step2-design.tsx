"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Type, Square, Circle, Trash2 } from "lucide-react";
import { CoreBuilderLanding } from "./core-builder-landing";

interface BuilderStep2Props {
    onNext: () => void;
    onBack: () => void;
}

export function BuilderStep2({ onNext, onBack }: BuilderStep2Props) {
    const [editorRef, setEditorRef] = useState<any>(null);
    
    return (
        <div>
            <div className="grid md:grid-cols-4 gap-6">
                {/* Left Sidebar */}
                <div className="md:col-span-1 space-y-4">
                    <Card className="border-slate-200">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Design Tools</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button 
                                onClick={() => editorRef?.addText("Text")} 
                                variant="outline" 
                                className="w-full justify-start"
                                size="sm"
                            >
                                <Type className="mr-2 h-4 w-4" /> Add Text
                            </Button>
                            <Button 
                                onClick={() => editorRef?.addRectangle()} 
                                variant="outline" 
                                className="w-full justify-start"
                                size="sm"
                            >
                                <Square className="mr-2 h-4 w-4" /> Rectangle
                            </Button>
                            <Button 
                                onClick={() => editorRef?.addCircle()} 
                                variant="outline" 
                                className="w-full justify-start"
                                size="sm"
                            >
                                <Circle className="mr-2 h-4 w-4" /> Circle
                            </Button>
                            <Button 
                                onClick={() => editorRef?.delete()} 
                                variant="outline" 
                                className="w-full justify-start text-red-600 hover:text-red-700"
                                size="sm"
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-slate-200">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Colors</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2">
                                <Label className="text-xs">Fill Color</Label>
                                <Input 
                                    type="color" 
                                    defaultValue="#6366F1" 
                                    className="p-1 h-9"
                                    onChange={(e) => editorRef?.changeFillColor(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">Stroke Color</Label>
                                <Input 
                                    type="color" 
                                    defaultValue="#1e293b" 
                                    className="p-1 h-9"
                                    onChange={(e) => editorRef?.changeStrokeColor(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Right Panel */}
                <div className="md:col-span-3">
                    <Card className="h-[600px] border-slate-200">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Landing Page Canvas</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[calc(100%-4rem)] p-0">
                            <CoreBuilderLanding 
                                onSave={(json) => console.log("Saved:", json)}
                                onEditorReady={setEditorRef}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                 <Button onClick={onBack} size="lg" variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={onNext} size="lg">
                    Next: Publish <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
