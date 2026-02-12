"use client"

import * as React from "react"
import { Plus, Trash2, CheckCircle2, HelpCircle, Save, ArrowRight } from "lucide-react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

export default function NewQuizPage() {
    return (
        <DashboardLayout role="teacher">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest">Assessment Hub</Badge>
                        <h1 className="text-4xl font-black font-outfit text-slate-900 uppercase tracking-tighter">
                            Create <span className="text-primary italic">Interactive Quiz</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-sm">Design assessments to test student knowledge.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-100 font-black text-xs uppercase tracking-widest bg-white">
                            <Save size={18} className="mr-2" /> Draft
                        </Button>
                        <Button className="h-14 px-10 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200 font-black text-xs uppercase tracking-widest gap-3">
                            Publish Quiz <ArrowRight size={18} />
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quiz Info */}
                        <Card className="border-none shadow-sm rounded-[3rem] bg-white p-10 space-y-10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Quiz Title</label>
                                    <Input placeholder="e.g. Weekly Calculus Review" className="h-14 rounded-2xl bg-slate-50 border-transparent focus-visible:ring-primary/20 font-medium" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Time Limit (Mins)</label>
                                    <Input type="number" defaultValue="30" className="h-14 rounded-2xl bg-slate-50 border-transparent focus-visible:ring-primary/20 font-medium" />
                                </div>
                            </div>

                            <div className="space-y-8 pt-6 border-t border-slate-50">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-black font-outfit text-slate-900 uppercase tracking-tight">Questions (3)</h3>
                                    <Button variant="ghost" className="text-primary font-black uppercase text-[10px] tracking-widest">Reorder</Button>
                                </div>

                                {[1, 2, 3].map((q) => (
                                    <div key={q} className="p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50/30 space-y-6 relative group">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm">
                                                    {q}
                                                </div>
                                                <p className="font-bold text-slate-900">Question Title / Text</p>
                                            </div>
                                            <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl">
                                                <Trash2 size={18} />
                                            </Button>
                                        </div>
                                        <Input placeholder="Enter your question here..." className="h-14 rounded-2xl bg-white border-transparent shadow-sm focus-visible:ring-primary/20 font-medium" />
                                        <div className="grid grid-cols-2 gap-4">
                                            {[1, 2, 3, 4].map((opt) => (
                                                <div key={opt} className="relative">
                                                    <Input placeholder={`Option ${opt}`} className="h-12 pl-12 rounded-xl bg-white border-slate-100 focus-visible:ring-primary/20 font-medium text-xs" />
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-slate-200" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <button className="w-full h-20 rounded-[2.5rem] border-4 border-dashed border-slate-100 flex items-center justify-center gap-4 text-slate-300 hover:border-primary/20 hover:text-primary hover:bg-primary/5 transition-all duration-500">
                                    <Plus size={24} />
                                    <span className="font-black text-xs uppercase tracking-[0.2em]">Add New Question</span>
                                </button>
                            </div>
                        </Card>
                    </div>

                    <aside className="space-y-8">
                        <Card className="border-none shadow-sm rounded-[3rem] bg-white p-8 space-y-8">
                            <div>
                                <h3 className="font-black font-outfit text-slate-900 uppercase tracking-tighter text-lg mb-6">Settings</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: "Shuffle Questions", active: true },
                                        { label: "Show Instant Results", active: true },
                                        { label: "Multiple Attempts", active: false },
                                        { label: "Show Explanations", active: true },
                                    ].map((opt, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
                                            <span className="text-[10px] font-black uppercase text-slate-500">{opt.label}</span>
                                            <div className={cn("w-10 h-6 pl-1 rounded-full flex items-center transition-colors cursor-pointer", opt.active ? "bg-primary" : "bg-slate-200")}>
                                                <div className={cn("w-4 h-4 rounded-full bg-white transition-all", opt.active ? "translate-x-4" : "")} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-50 space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Weightage</h4>
                                <div className="text-4xl font-black font-outfit text-slate-900">100 <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Points</span></div>
                            </div>
                        </Card>

                        <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden group">
                            <HelpCircle className="absolute -right-4 -bottom-4 text-white/5 w-32 h-32 group-hover:scale-110 transition-transform" />
                            <h4 className="font-black uppercase tracking-widest text-[10px] text-primary mb-4">Pro Tip</h4>
                            <p className="text-xs font-bold text-slate-300 leading-relaxed italic relative z-10">
                                Adding explanations for each question increases student engagement by up to 40%.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </DashboardLayout>
    )
}
