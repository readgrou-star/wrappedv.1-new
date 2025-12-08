"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, CheckCircle, Copy, Download, Link as LinkIcon } from "lucide-react";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface BuilderStep3Props {
    onBack: () => void;
}

export function BuilderStep3({ onBack }: BuilderStep3Props) {
    const qrCodeImage = PlaceHolderImages.find(img => img.id === 'qr-code');
    const { toast } = useToast();
    const shareLink = "wrappedform.co/bootcamp-batch10";

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to clipboard!",
            description: text,
        })
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4"/>
                <h1 className="text-3xl font-bold">🎉 Your form is ready!</h1>
                <p className="text-muted-foreground mt-2">Share the link with your audience or embed it on your site.</p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Share Link</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1 w-full flex items-center border rounded-md">
                        <span className="pl-3 text-muted-foreground"><LinkIcon className="h-4 w-4"/></span>
                        <Input readOnly value={shareLink} className="border-0 focus-visible:ring-0 bg-transparent" />
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(shareLink)}><Copy className="h-4 w-4"/></Button>
                    </div>
                     <div className="flex-shrink-0 flex items-center gap-4">
                        {qrCodeImage && <Image src={qrCodeImage.imageUrl} alt={qrCodeImage.description} width={80} height={80} className="rounded-md" />}
                        <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Download QR</Button>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Embed Options</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="inline">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="inline">Inline</TabsTrigger>
                            <TabsTrigger value="popup">Popup</TabsTrigger>
                            <TabsTrigger value="side-panel">Side Panel</TabsTrigger>
                        </TabsList>
                        <TabsContent value="inline" className="mt-4">
                            <div className="p-4 bg-muted/50 rounded-lg font-mono text-sm overflow-x-auto relative">
                                <pre><code>{`<iframe src="https://wrappedform.co/embed/bootcamp-batch10"></iframe>`}</code></pre>
                                <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => copyToClipboard(`<iframe src="https://wrappedform.co/embed/bootcamp-batch10"></iframe>`)}><Copy className="h-4 w-4"/></Button>
                            </div>
                        </TabsContent>
                         <TabsContent value="popup" className="mt-4">
                            <div className="p-4 bg-muted/50 rounded-lg font-mono text-sm overflow-x-auto relative">
                                <pre><code>{`<script src="https://wrappedform.co/popup.js" data-form-id="bootcamp-batch10"></script>`}</code></pre>
                                <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => copyToClipboard(`<script src="https://wrappedform.co/popup.js" data-form-id="bootcamp-batch10"></script>`)}><Copy className="h-4 w-4"/></Button>
                            </div>
                        </TabsContent>
                         <TabsContent value="side-panel" className="mt-4">
                            <div className="p-4 bg-muted/50 rounded-lg font-mono text-sm overflow-x-auto relative">
                                <pre><code>{`<script src="https://wrappedform.co/sidepanel.js" data-form-id="bootcamp-batch10"></script>`}</code></pre>
                                <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => copyToClipboard(`<script src="https://wrappedform.co/sidepanel.js" data-form-id="bootcamp-batch10"></script>`)}><Copy className="h-4 w-4"/></Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between"><Label htmlFor="s-1">Allow multiple submissions</Label><Switch id="s-1"/></div>
                        <div className="flex items-center justify-between"><Label htmlFor="s-2">Send confirmation email</Label><Switch id="s-2" defaultChecked/></div>
                        <div className="flex items-center justify-between"><Label htmlFor="s-3">Show submission counter on form</Label><Switch id="s-3"/></div>
                    </div>
                    <div>
                        <Label>Redirect after submission</Label>
                        <RadioGroup defaultValue="story" className="mt-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="story" id="r1" />
                                <Label htmlFor="r1">Show story (recommended)</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="custom" id="r2" />
                                <Label htmlFor="r2" className="flex-shrink-0">Custom URL:</Label>
                                <Input placeholder="https://example.com" className="h-8"/>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
            </Card>
            
            <div className="mt-8 flex justify-between">
                 <Button onClick={onBack} size="lg" variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button size="lg" asChild>
                    <Link href="/dashboard">
                        Publish Form <CheckCircle className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
