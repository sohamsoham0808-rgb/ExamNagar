"use client"

import * as React from "react"
import {
    Video,
    Calendar,
    Clock,
    Users,
    Play,
    Settings,
    Plus,
    ChevronRight,
    Monitor,
    Mic,
    MoreVertical,
    CheckCircle2,
    Search
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

const UPCOMING_SESSIONS = [
    {
        id: 1,
        title: "Calculus Deep Dive — Module 4",
        time: "04:30 PM",
        date: "Today",
        enrollment: "1,240 students",
        subject: "Mathematics",
        status: "Live Soon"
    },
    {
        id: 2,
        title: "Algebra Basics for SSC CGL",
        time: "07:00 PM",
        date: "Today",
        enrollment: "845 students",
        subject: "Mathematics",
        status: "Scheduled"
    },
    {
        id: 3,
        title: "Ancient History — Gupta Empire",
        time: "10:00 AM",
        date: "Tomorrow",
        enrollment: "1,520 students",
        subject: "History",
        status: "Scheduled"
    },
    {
        id: 4,
        title: "Newton's Laws of Motion - Part 2",
        time: "02:00 PM",
        date: "Tomorrow",
        enrollment: "2,100 students",
        subject: "Physics",
        status: "Scheduled"
    }
]

import { useRouter } from 'next/navigation'

export default function LiveSessionsPage() {
    const [broadcastMode, setBroadcastMode] = React.useState<'smartboard' | 'pentab'>('smartboard')
    const router = useRouter()

    return (
        <DashboardLayout role="teacher">
            <div className="space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <Badge className="bg-primary/10 text-primary border-none font-bold px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest">Broadcast Portal</Badge>
                        <h1 className="text-4xl font-black font-outfit text-slate-900 uppercase tracking-tighter">
                            Live <span className="text-primary italic">Sessions</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-sm">Manage your interactive broadcasts and engage with your students in real-time.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-12 w-12 rounded-2xl border-slate-200">
                            <Settings size={20} />
                        </Button>
                        <Button className="h-12 px-6 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200 font-black text-xs uppercase tracking-widest gap-2">
                            <Plus size={18} /> Schedule Session
                        </Button>
                    </div>
                </div>

                {/* Main Live Banner */}
                <Card className="bg-slate-900 rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-2 p-1 bg-white/5 w-fit rounded-2xl backdrop-blur-sm border border-white/5">
                                <button
                                    onClick={() => setBroadcastMode('smartboard')}
                                    className={cn(
                                        "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                        broadcastMode === 'smartboard' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:text-white"
                                    )}
                                >
                                    Smartboard Mode
                                </button>
                                <button
                                    onClick={() => setBroadcastMode('pentab')}
                                    className={cn(
                                        "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                        broadcastMode === 'pentab' ? "bg-accent text-white shadow-lg shadow-accent/20" : "text-slate-500 hover:text-white"
                                    )}
                                >
                                    Pen Tab Mode
                                </button>
                            </div>

                            <div className="space-y-4">
                                <Badge className="bg-red-500 text-white border-none font-black text-[9px] uppercase tracking-widest px-4 py-1.5 animate-pulse">
                                    Next Broadast in 45 Mins
                                </Badge>
                                <h2 className="text-3xl md:text-5xl font-black font-outfit uppercase tracking-tighter leading-none">
                                    Calculus <br /><span className="text-primary italic">Deep Dive.</span>
                                </h2>
                                <p className="text-slate-400 font-medium text-base max-w-md">
                                    {broadcastMode === 'smartboard'
                                        ? "Optimized for widescreen interaction and physical gestures. Ensure Smartboard calibration is complete."
                                        : "Optimized for high-precision writing and pressure-sensitive annotations. Check Pen Tab driver status."}
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <Button onClick={() => router.push(`/teacher/live/studio?mode=${broadcastMode}`)} className="h-14 px-10 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 gap-2 group">
                                    <Play size={16} fill="white" className="group-hover:scale-110 transition-transform" /> Launch Studio
                                </Button>
                                <div className="flex items-center gap-6 px-6 border-l border-white/10 ml-2">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-500">Mode</span>
                                        <span className="text-lg font-black font-outfit text-primary uppercase">{broadcastMode}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:grid grid-cols-2 gap-4">
                            {[
                                {
                                    label: broadcastMode === 'smartboard' ? "Edge Calibration" : "Pressure Mapping",
                                    icon: <Monitor />,
                                    status: "Verified"
                                },
                                {
                                    label: broadcastMode === 'smartboard' ? "Gesture Control" : "Stylus Battery",
                                    icon: <Video />,
                                    status: "Active"
                                },
                                { label: "Microphone", icon: <Mic />, status: "Perfect" },
                                { label: "Stable Net", icon: <CheckCircle2 />, status: "Excellent" },
                            ].map((check, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-md flex flex-col gap-3 group hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        {check.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{check.label}</p>
                                        <p className="text-sm font-bold text-white">{check.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Schedule & Calendar Grid */}
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Weekly Timeline */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-black font-outfit text-slate-900 uppercase tracking-tighter text-xl">Upcoming Timeline</h3>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase border-slate-200">Weekly</Button>
                                <Button variant="ghost" size="sm" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase text-slate-400">Monthly</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {UPCOMING_SESSIONS.map((session) => (
                                <div key={session.id} className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 flex items-center justify-between hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-50 group-hover:bg-primary transition-all duration-500">
                                            <Calendar size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                                            <span className="text-[9px] font-black text-slate-400 mt-1 uppercase group-hover:text-white/80">{session.date}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge className="bg-primary/5 text-primary border-none text-[8px] font-black uppercase tracking-widest">{session.subject}</Badge>
                                                {session.status === "Live Soon" && <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />}
                                            </div>
                                            <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{session.title}</h4>
                                            <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                                <span className="flex items-center gap-1.5"><Clock size={12} /> {session.time}</span>
                                                <span className="flex items-center gap-1.5"><Users size={12} /> {session.enrollment}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-slate-900 rounded-xl">
                                            <MoreVertical size={20} />
                                        </Button>
                                        <Button className="h-10 px-6 rounded-xl bg-slate-50 text-slate-900 hover:bg-slate-900 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest">
                                            Prepare
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats & Controls */}
                    <div className="space-y-8">
                        <Card className="border-none shadow-sm rounded-[2.5rem] bg-indigo-50/30 overflow-hidden">
                            <CardContent className="p-8 space-y-6">
                                <h3 className="font-black font-outfit text-slate-900 uppercase tracking-tighter">Live Analytics</h3>
                                <div className="space-y-4">
                                    <div className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm flex items-center gap-4">
                                        <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
                                            <Users size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Attendance</p>
                                            <p className="text-lg font-black font-outfit text-slate-900">12.5k <span className="text-[10px] text-emerald-500">+4%</span></p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm flex items-center gap-4">
                                        <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Watch Time</p>
                                            <p className="text-lg font-black font-outfit text-slate-900">4,280 hrs</p>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full h-14 rounded-2xl bg-white border border-slate-100 text-primary font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-primary hover:text-white transition-all">
                                    Detailed Live Report
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm rounded-[2.5rem] bg-slate-900 text-white overflow-hidden p-8 text-center space-y-4">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                                <Video size={32} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-black font-outfit uppercase tracking-tighter">Instant Session?</h3>
                            <p className="text-slate-400 text-xs font-medium leading-relaxed">Need to address an urgent doubt or announce something big? Launch a temporary live room now.</p>
                            <Button className="w-full h-12 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20">
                                Go Live Instantly
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
