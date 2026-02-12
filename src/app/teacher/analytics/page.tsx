"use client"

import * as React from "react"
import {
    BarChart2,
    TrendingUp,
    Users,
    Clock,
    Download,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    PieChart,
    Target
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

export default function AnalyticsPage() {
    return (
        <DashboardLayout role="teacher">
            <div className="space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest">Intelligence</Badge>
                        <h1 className="text-4xl font-black font-outfit text-slate-900 uppercase tracking-tighter">
                            Performance <span className="text-emerald-500 italic">Analytics</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-sm">Deep dive into course metrics, student engagement, and growth trends.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-12 px-6 rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest gap-2">
                            <Calendar size={18} /> Last 30 Days
                        </Button>
                        <Button className="h-12 px-6 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200 font-black text-xs uppercase tracking-widest gap-2">
                            <Download size={18} /> Export Report
                        </Button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Course Completion", value: "84%", trend: "+5.2%", isUp: true, icon: <Target />, color: "text-primary bg-primary/5" },
                        { label: "Avg Test Score", value: "78.5", trend: "+2.1%", isUp: true, icon: <BarChart2 />, color: "text-emerald-500 bg-emerald-50" },
                        { label: "Active Students", value: "1,240", trend: "-12", isUp: false, icon: <Users />, color: "text-blue-500 bg-blue-50" },
                        { label: "Watch Time", value: "4.2k hr", trend: "+15%", isUp: true, icon: <Clock />, color: "text-accent bg-accent/5" },
                    ].map((kpi, i) => (
                        <Card key={i} className="border-slate-100 rounded-[2rem] shadow-sm group hover:border-emerald-500/20 transition-all duration-500">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", kpi.color)}>
                                        {kpi.icon}
                                    </div>
                                    <div className={cn("flex items-center gap-1 text-xs font-black", kpi.isUp ? "text-emerald-500" : "text-red-500")}>
                                        {kpi.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {kpi.trend}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{kpi.label}</p>
                                    <p className="text-3xl font-black font-outfit text-slate-900">{kpi.value}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Engagement Chart Mockup */}
                    <Card className="lg:col-span-2 border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden bg-white">
                        <CardContent className="p-10 space-y-10">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black font-outfit text-slate-900 uppercase tracking-tighter">Student Engagement</h3>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Active vs Inactive time (Weekly)</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                        <span className="text-[10px] font-black uppercase text-slate-400">Lectures</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-accent" />
                                        <span className="text-[10px] font-black uppercase text-slate-400">Quizzes</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-80 flex items-end gap-3 pt-4">
                                {[30, 45, 35, 60, 40, 75, 50, 65, 55, 80, 45, 70].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col justify-end gap-1.5 h-full group relative">
                                        <div
                                            className="w-full bg-primary/10 rounded-t-lg group-hover:bg-primary transition-all duration-500 cursor-help"
                                            style={{ height: `${h}%` }}
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                {h}% Active
                                            </div>
                                        </div>
                                        <div
                                            className="w-full bg-accent/10 rounded-b-lg group-hover:bg-accent transition-all duration-500"
                                            style={{ height: `${h / 2}%` }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between px-2 text-[10px] font-black text-slate-300 uppercase tracking-widest border-t border-slate-50 pt-6">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Batch Distribution */}
                    <Card className="border-slate-100 rounded-[2.5rem] shadow-sm bg-white overflow-hidden">
                        <CardContent className="p-8 space-y-8">
                            <div className="space-y-1 text-center">
                                <h3 className="text-xl font-black font-outfit text-slate-900 uppercase tracking-tighter">Batch Distribution</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Enrollment per stream</p>
                            </div>

                            <div className="relative aspect-square flex items-center justify-center">
                                {/* SVG Pseudo Chart */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-48 h-48 rounded-full border-[1.5rem] border-slate-50 relative">
                                        <div className="absolute top-[-1.5rem] left-[-1.5rem] w-48 h-48 rounded-full border-[1.5rem] border-primary border-t-transparent border-r-transparent rotate-45" />
                                        <div className="absolute top-[-1.5rem] left-[-1.5rem] w-48 h-48 rounded-full border-[1.5rem] border-accent border-b-transparent border-l-transparent rotate-[140deg]" />
                                    </div>
                                </div>
                                <div className="text-center z-10">
                                    <p className="text-2xl font-black font-outfit text-slate-900 leading-none">1,240</p>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Students</p>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4">
                                {[
                                    { label: "Mathematics", value: "45%", color: "bg-primary" },
                                    { label: "Physics", value: "30%", color: "bg-accent" },
                                    { label: "Humanities", value: "25%", color: "bg-slate-200" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <div className={cn("w-2 h-2 rounded-full", item.color)} />
                                            {item.label}
                                        </div>
                                        <span className="text-slate-900">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Table Placeholder */}
                <Card className="border-slate-100 rounded-[2.5rem] shadow-sm bg-white overflow-hidden">
                    <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black font-outfit text-slate-900 uppercase tracking-tighter">Detailed Stream Performance</h3>
                            <Button variant="ghost" className="text-primary font-black text-[10px] uppercase tracking-widest">Compare All Streams</Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-50">
                                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Stream Name</th>
                                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Attendance</th>
                                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Content Score</th>
                                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Doubt Ratio</th>
                                        <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Efficiency</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {[
                                        { name: "JEE Advanced 2024", att: "92%", score: "8.5/10", doubt: "1:4", eff: "96%", color: "text-primary" },
                                        { name: "NEET Foundation", att: "88%", score: "7.2/10", doubt: "1:12", eff: "82%", color: "text-accent" },
                                        { name: "UPSC Comprehensive", att: "95%", score: "9.0/10", doubt: "1:3", eff: "98%", color: "text-slate-900" },
                                        { name: "State Exams — General", att: "74%", score: "6.5/10", doubt: "1:25", eff: "68%", color: "text-slate-400" },
                                    ].map((row, i) => (
                                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-6 font-bold text-slate-900">{row.name}</td>
                                            <td className="py-6 font-black font-outfit text-slate-900">{row.att}</td>
                                            <td className="py-6 font-black font-outfit text-slate-900">{row.score}</td>
                                            <td className="py-6">
                                                <Badge className="bg-slate-100 text-slate-500 border-none font-black text-[8px] uppercase">{row.doubt}</Badge>
                                            </td>
                                            <td className="py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-24">
                                                        <div className={cn("h-full rounded-full bg-emerald-500")} style={{ width: row.eff }} />
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-900">{row.eff}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
