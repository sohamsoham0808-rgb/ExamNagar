"use client"

import * as React from "react"
import { FileText, Upload, Plus, X, CheckCircle2, Info } from "lucide-react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

export default function UploadPdfPage() {
    return (
        <DashboardLayout role="teacher">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-2 text-center md:text-left">
                    <Badge className="bg-orange-50 text-orange-600 border-none font-bold px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest">Resource Portal</Badge>
                    <h1 className="text-4xl font-black font-outfit text-slate-900 uppercase tracking-tighter mt-2">
                        Distribute <span className="text-primary italic">Learning Material</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-sm">Upload notes, formulas and reference PDFs for your batches.</p>
                </div>

                <div className="grid md:grid-cols-5 gap-10">
                    <div className="md:col-span-3 space-y-8">
                        <div className="border-4 border-dashed border-slate-100 rounded-[3.5rem] p-16 flex flex-col items-center justify-center gap-8 group hover:border-primary/20 hover:bg-primary/5 transition-all duration-500 cursor-pointer bg-white">
                            <div className="w-24 h-24 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:bg-white group-hover:text-primary transition-all shadow-sm">
                                <FileText size={40} />
                            </div>
                            <div className="text-center">
                                <p className="font-black text-slate-900 uppercase tracking-tight text-xl">Drag & Drop PDF Resource</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">Maximum file size: 50MB</p>
                            </div>
                            <Button className="h-12 px-8 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest">Browse Files</Button>
                        </div>

                        <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-8 space-y-6">
                            <h3 className="font-black font-outfit text-slate-900 uppercase tracking-tight">Recent Uploads</h3>
                            <div className="space-y-4">
                                {[
                                    { name: "Calculus_Notes_Week_4.pdf", size: "2.4 MB", date: "Jan 12, 2024" },
                                    { name: "Algebra_Practice_Set.pdf", size: "1.8 MB", date: "Jan 10, 2024" }
                                ].map((file, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                                                <FileText size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-900">{file.name}</p>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{file.size} • {file.date}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl opacity-0 group-hover:opacity-100">
                                            <X size={16} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div className="md:col-span-2 space-y-8">
                        <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-8 space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Document Name</label>
                                <Input placeholder="Enter resource name..." className="h-14 rounded-2xl bg-slate-50 border-transparent focus-visible:ring-primary/20 font-medium" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Assign to Batch</label>
                                <select className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-transparent focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium text-slate-700 appearance-none">
                                    <option>All Students</option>
                                    <option>Calculus Elite</option>
                                    <option>Algebra Foundation</option>
                                </select>
                            </div>
                            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100/50 flex gap-4">
                                <Info size={20} className="text-blue-500 shrink-0" />
                                <p className="text-[10px] font-bold text-blue-800/70 leading-relaxed uppercase tracking-widest">
                                    PDFs are automatically optimized for web viewing and secured with watermarks if enabled.
                                </p>
                            </div>
                            <Button className="w-full h-16 rounded-[2rem] bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all shadow-slate-200">
                                Upload Resource
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
