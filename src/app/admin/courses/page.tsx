"use client"

import * as React from "react"
import {
    BookOpen,
    CheckCircle2,
    XCircle,
    Clock,
    Search,
    Filter,
    MoreVertical,
    Eye,
    Star,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    PlayCircle,
    Layers,
    Activity,
    ShieldCheck,
    Zap,
    Download
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { cn } from "@/lib/utils"

const MOCK_APPROVALS = [
    { id: "1", title: "SSC CGL 2026: The Quant Blueprint", instructor: "Dr. Rajesh Sharma", category: "SSC", status: "Pending", submitted: "2h ago", quality: "94%" },
    { id: "2", title: "Banking Awareness 2.0", instructor: "Sneha Kapur", category: "Banking", status: "Reviewing", submitted: "5h ago", quality: "88%" },
    { id: "3", title: "Railway NTPC: Static GK Masterclass", instructor: "Vikram Malhotra", category: "Railway", status: "Pending", submitted: "1d ago", quality: "91%" },
    { id: "4", title: "Advanced English for Government Exams", instructor: "Ananya Iyer", category: "Teaching", status: "Approved", submitted: "2d ago", quality: "96%" },
    { id: "5", title: "Digital Reasoning & Logic", instructor: "Rahul Deshmukh", category: "SSC", status: "Rejected", submitted: "3d ago", quality: "64%" },
]

export default function AdminCoursesPage() {
    return (
        <DashboardLayout
            role="admin"
            user={{
                name: "Arch Admin",
                role: "Platform Architect",
                avatar: "https://i.pravatar.cc/150?u=arch_admin"
            }}
        >
            <div className="space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-4 border-b border-white/5">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Layers className="text-secondary" size={16} />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Content Governance</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black font-outfit text-white uppercase tracking-tighter">Content <span className="text-secondary italic">Audit</span></h1>
                        <p className="text-slate-500 text-sm font-medium">Verify curriculum integrity and quality standards for all new submissions.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden xl:flex flex-col items-end">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-2">Queue Velocity</p>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-black text-[9px] uppercase tracking-widest px-4 py-1.5">+14% Improvement</Badge>
                        </div>
                        <Button className="h-16 px-10 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest gap-2 hover:bg-white/10 transition-all">
                            <Download size={18} /> Export Log
                        </Button>
                    </div>
                </div>

                {/* Content Stat HUD */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Pending Approvals", value: "12", sub: "Awaiting QA", icon: <Clock />, color: "text-amber-400" },
                        { label: "Active Courses", value: "482", sub: "Live Clusters", icon: <Layers />, color: "text-primary" },
                        { label: "Total Learners", value: "84.2k", sub: "Verified Enrollment", icon: <Zap />, color: "text-emerald-400" },
                        { label: "Quality Multiplier", value: "4.8x", sub: "Avg Rating", icon: <Star />, color: "text-secondary" }
                    ].map((stat, i) => (
                        <Card key={i} className="bg-slate-900 border-white/5 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group hover:border-white/10 transition-all">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                            <div className="relative z-10 space-y-4">
                                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-white/5", stat.color)}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black text-white leading-none mb-1">{stat.value}</h4>
                                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                    <p className="text-[8px] text-slate-700 font-bold uppercase">{stat.sub}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Audit Queue */}
                <Card className="bg-slate-900 border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
                    <CardContent className="p-0">
                        {/* Filters Bar */}
                        <div className="p-8 border-b border-white/5 flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-white/[0.02]">
                            <div className="relative w-full xl:w-[450px]">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                <Input
                                    placeholder="Filter by course title or instructor..."
                                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-2xl h-14 focus-visible:ring-primary/40 font-medium"
                                />
                            </div>
                            <div className="flex bg-white/5 p-1 rounded-[1.2rem] border border-white/10">
                                {['Queue Stage', 'Approved', 'Rejected'].map((tab, i) => (
                                    <button key={tab} className={cn(
                                        "px-8 py-2.5 text-[10px] font-black rounded-xl transition-all",
                                        i === 0 ? "bg-white/10 text-white shadow-xl" : "text-slate-500 hover:text-slate-300"
                                    )}>{tab}</button>
                                ))}
                            </div>
                        </div>

                        {/* Audit Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5">
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Course Intel</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Instructor</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">QA Score</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Audit Status</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Direct Directives</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {MOCK_APPROVALS.map((course) => (
                                        <tr key={course.id} className="hover:bg-white/[0.03] transition-colors group">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 font-black text-xs uppercase group-hover:border-primary/40 group-hover:text-primary transition-all">
                                                        <BookOpen size={20} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-black text-white group-hover:text-primary transition-colors">{course.title}</p>
                                                        <div className="flex items-center gap-2">
                                                            <Badge className="bg-white/5 text-slate-500 border-none text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">{course.category}</Badge>
                                                            <span className="text-[9px] text-slate-700 font-bold uppercase">Submitted {course.submitted}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-slate-400 font-bold text-xs">{course.instructor}</td>
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-1.5 w-20 bg-white/5 rounded-full overflow-hidden">
                                                        <div
                                                            className={cn(
                                                                "h-full rounded-full",
                                                                parseInt(course.quality) > 90 ? "bg-emerald-500" : parseInt(course.quality) > 80 ? "bg-primary" : "bg-red-500"
                                                            )}
                                                            style={{ width: course.quality }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-black text-white">{course.quality}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <Badge className={cn(
                                                    "text-[9px] font-black tracking-widest uppercase border-none px-4 py-1.5 rounded-lg",
                                                    course.status === 'Approved' ? "bg-emerald-500/10 text-emerald-500" :
                                                        course.status === 'Rejected' ? "bg-red-500/10 text-red-500" :
                                                            course.status === 'Reviewing' ? "bg-primary/10 text-primary" : "bg-white/5 text-slate-400"
                                                )}>
                                                    {course.status}
                                                </Badge>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                                                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"><Eye size={16} /></Button>
                                                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all"><CheckCircle2 size={16} /></Button>
                                                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all"><XCircle size={16} /></Button>
                                                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-white transition-all"><MoreVertical size={16} /></Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* QA Intelligence Widgets */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 pb-20">
                    <Card className="bg-slate-900 border-white/5 rounded-[3rem] p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-all duration-1000" />
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-black font-outfit text-white uppercase tracking-tighter">Instructional <span className="text-primary italic">Distribution</span></h3>
                                <Badge className="bg-white/5 text-slate-500 border-none">Real-time</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { label: "Visual Clarity", p: 92, c: "bg-emerald-500" },
                                    { label: "Curriculum Depth", p: 84, c: "bg-primary" },
                                    { label: "Audio Fidelity", p: 96, c: "bg-secondary" },
                                    { label: "Resource Count", p: 78, c: "bg-blue-500" }
                                ].map(stat => (
                                    <div key={stat.label} className="bg-white/[0.03] p-6 rounded-[2rem] border border-white/5 space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                                            <span className="text-sm font-black text-white">{stat.p}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div className={cn("h-full rounded-full", stat.c)} style={{ width: `${stat.p}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-slate-900 border-white/5 p-10 rounded-[3rem] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
                            <div className="space-y-3">
                                <Badge className="bg-secondary/10 text-secondary border-none font-black text-[9px] uppercase tracking-widest px-4 py-1.5 mb-2">Automated Audit</Badge>
                                <h3 className="text-3xl font-black font-outfit text-white uppercase tracking-tighter">Sentinel <span className="text-secondary italic">Review</span></h3>
                                <p className="text-slate-500 text-sm font-medium italic leading-relaxed">AI-powered scan detect copyright infringements, low audio, and missing metadata automatically.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <ShieldCheck className="text-emerald-500" size={24} />
                                        <span className="text-xs font-black text-white uppercase tracking-widest">Copyright Scan</span>
                                    </div>
                                    <Badge className="bg-emerald-500 text-white border-none font-black text-[9px] uppercase">Clean</Badge>
                                </div>
                                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Activity className="text-primary" size={24} />
                                        <span className="text-xs font-black text-white uppercase tracking-widest">Spectral Audio Analysis</span>
                                    </div>
                                    <Badge className="bg-primary text-white border-none font-black text-[9px] uppercase">Excellent</Badge>
                                </div>
                            </div>
                            <Button className="h-16 rounded-2xl bg-secondary text-white font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-secondary/20 hover:scale-[1.02] transition-all">Configure Sentinel v2.4</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
