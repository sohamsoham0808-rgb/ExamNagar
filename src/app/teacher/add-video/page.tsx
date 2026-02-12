"use client"

import * as React from "react"
import { Upload, Play, CheckCircle2, AlertCircle, X, Plus } from "lucide-react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

export default function AddVideoPage() {
    return (
        <DashboardLayout role="teacher">
            <div className="max-w-4xl mx-auto space-y-10">
                <div className="space-y-2">
                    <Badge className="bg-blue-50 text-blue-600 border-none font-bold px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest">Content Creator</Badge>
                    <h1 className="text-4xl font-black font-outfit text-slate-900 uppercase tracking-tighter">
                        Upload <span className="text-primary italic">Video Lecture</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-sm">Add new video content to your course library.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-8">
                            <CardContent className="p-0 space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Video Title</label>
                                    <Input placeholder="e.g. Introduction to Integration" className="h-14 rounded-2xl bg-slate-50 border-transparent focus-visible:ring-primary/20 font-medium" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Description</label>
                                    <textarea className="w-full min-h-[120px] p-6 rounded-2xl bg-slate-50 border-transparent focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium text-slate-700 resize-none" placeholder="Provide a brief overview of the lecture content..." />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Select Course</label>
                                        <select className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-transparent focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium text-slate-700 appearance-none">
                                            <option>Calculus Elite</option>
                                            <option>Algebra Foundation</option>
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Module</label>
                                        <select className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-transparent focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium text-slate-700 appearance-none">
                                            <option>Module 1: Basics</option>
                                            <option>Module 2: Advanced</option>
                                        </select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="border-4 border-dashed border-slate-100 rounded-[3rem] p-12 flex flex-col items-center justify-center gap-6 group hover:border-primary/20 hover:bg-primary/5 transition-all duration-500 cursor-pointer">
                            <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:bg-white group-hover:text-primary transition-all shadow-sm">
                                <Upload size={32} />
                            </div>
                            <div className="text-center">
                                <p className="font-black text-slate-900 uppercase tracking-tight text-lg">Click to Upload Video</p>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">MP4, MOV up to 2GB — High Quality Recommended</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <Card className="border-none shadow-sm rounded-[2.5rem] bg-slate-900 text-white overflow-hidden p-8">
                            <h3 className="font-black uppercase tracking-widest text-[10px] text-primary mb-6">Upload Guidelines</h3>
                            <ul className="space-y-4">
                                {[
                                    "Resolution: 1080p minimum",
                                    "Format: .mp4 preferred",
                                    "File Size: Max 2GB",
                                    "Thumbnail: 1280x720px"
                                ].map((step, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                                        <span className="text-xs font-bold text-slate-300">{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        <div className="p-8 rounded-[2.5rem] bg-amber-50 border border-amber-100/50 flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-amber-600">
                                <AlertCircle size={20} />
                                <span className="font-black text-[10px] uppercase tracking-widest">Important Note</span>
                            </div>
                            <p className="text-xs font-medium text-amber-700/80 leading-relaxed italic">
                                Once uploaded, videos undergo a processing phase which may take 10-15 minutes depending on file size.
                            </p>
                        </div>

                        <Button className="w-full h-16 rounded-[2rem] bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-[0.2em] text-xs shadow-2xl transition-all shadow-slate-200">
                            Publish Lecture
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
