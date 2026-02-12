"use client"

import * as React from "react"
import {
    Users,
    BookOpen,
    MessageSquare,
    TrendingUp,
    Play,
    Clock,
    Calendar,
    ArrowUpRight,
    Plus,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    CheckCircle2,
    Video,
    FileText,
    PieChart
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Input } from "@/components/ui/Input"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const ANNOUNCEMENTS = [
    { id: 1, title: "New Semester Planning Phase", content: "Finalize your course modules for the upcoming spring term by Feb 20.", type: "Important", color: "bg-primary" },
    { id: 2, title: "Teacher Training Webinar", content: "Join us this Friday at 4 PM for an exclusive session on 'Engaging Online Students'.", type: "Webinar", color: "bg-accent" },
    { id: 3, title: "Course Content Update", content: "New resources for JEE Advanced have been added to the library.", type: "System", color: "bg-emerald-500" }
]

const DOUBTS = [
    { id: 1, student: "Aavya Gupta", question: "In Module 4, why do we use the chain rule for this specific derivative?", time: "5 mins ago", status: "Urgent" },
    { id: 2, student: "Karan Johar", question: "Can you provide more examples for Integration by Parts?", time: "1 hr ago", status: "Pending" },
    { id: 3, student: "Rohan Mehra", question: "When is the next doubt clearing live session scheduled?", time: "3 hrs ago", status: "Resolved" }
]

export default function TeacherOverviewPage() {
    const [currentSlide, setCurrentSlide] = React.useState(0)

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % ANNOUNCEMENTS.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <DashboardLayout
            role="teacher"
            user={{
                name: "Dr. Rajesh Sharma",
                role: "Senior Math Expert",
                avatar: "https://i.pravatar.cc/150?u=teacher"
            }}
        >
            <div className="space-y-12">
                {/* Search Header - Matches the photo */}
                <div className="relative max-w-2xl group">
                    <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative flex items-center">
                        <Search className="absolute left-6 text-slate-300 group-focus-within:text-primary transition-colors" size={22} />
                        <Input
                            placeholder="Search anything..."
                            className="h-16 pl-16 pr-6 rounded-2xl border-none bg-white shadow-sm shadow-slate-200/50 focus-visible:ring-2 focus-visible:ring-primary/20 text-slate-600 font-medium text-lg placeholder:text-slate-300"
                        />
                    </div>
                </div>

                {/* Rapid Action Cards - Matches the photo exactly */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "ADD VIDEO", icon: <Video size={32} />, color: "text-blue-500", href: "/teacher/add-video" },
                        { label: "NEW QUIZ", icon: <CheckCircle2 size={32} />, color: "text-emerald-500", href: "/teacher/new-quiz" },
                        { label: "UPLOAD PDF", icon: <FileText size={32} />, color: "text-orange-500", href: "/teacher/upload-pdf" },
                        { label: "ANALYTICS", icon: <PieChart size={32} />, color: "text-indigo-500", href: "/teacher/analytics" },
                    ].map((action, i) => (
                        <Link
                            key={i}
                            href={action.href}
                            className="bg-white p-10 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 shadow-sm shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 group"
                        >
                            <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center bg-slate-50 transition-colors group-hover:bg-white", action.color)}>
                                {action.icon}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">{action.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8 pt-4">
                    {/* Welcome & Stats Row - Hidden in photo but useful for complete dashboard */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Welcome Banner */}
                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[300px]">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

                            <div className="relative z-10 space-y-6">
                                <div className="space-y-4">
                                    <Badge className="bg-primary/20 text-primary border-primary/20 px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                                        Academic Session 2024
                                    </Badge>
                                    <h1 className="text-3xl md:text-5xl font-black font-outfit leading-tight tracking-tighter uppercase">
                                        Monitor Your<br /><span className="text-primary italic">Live Success!✍️</span>
                                    </h1>
                                    <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed font-medium">
                                        You have <span className="text-white font-black">12 unread doubts</span> and a live session scheduled in <span className="text-primary font-black">45 minutes</span>.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <Button className="bg-primary hover:bg-primary/90 text-white font-black h-14 px-8 rounded-2xl shadow-xl shadow-primary/20 group uppercase tracking-widest text-[10px]">
                                        <Plus className="mr-2 group-hover:rotate-90 transition-transform" size={16} />
                                        New Course
                                    </Button>
                                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                                        Full Schedule
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Schedule */}
                        <div className="space-y-6 pt-4">
                            <h2 className="text-xl font-black font-outfit text-slate-900 uppercase tracking-tight">Upcoming Classes</h2>
                            <div className="space-y-4">
                                {[
                                    { id: 1, title: "Calculus Deep Dive — Module 4", time: "04:30 PM", enrollment: "1,240 students", subject: "Mathematics", icon: <Video className="text-primary" size={20} /> },
                                    { id: 2, title: "Algebra Basics for SSC CGL", time: "07:00 PM", enrollment: "845 students", subject: "Mathematics", icon: <MessageSquare className="text-accent" size={20} /> }
                                ].map((session) => (
                                    <div key={session.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-50 flex items-center justify-between group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-50 group-hover:bg-primary/10 transition-colors">
                                                <div className="group-hover:scale-110 transition-transform">{session.icon}</div>
                                                <span className="text-[9px] font-black text-slate-400 mt-1 uppercase tracking-tighter">{session.time.split(' ')[1]}</span>
                                            </div>
                                            <div className="space-y-1">
                                                <Badge className="bg-primary/5 text-primary border-none text-[8px] font-black uppercase tracking-widest mb-1">{session.subject}</Badge>
                                                <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{session.title}</h3>
                                            </div>
                                        </div>
                                        <Button size="icon" className="h-12 w-12 bg-slate-900 hover:bg-primary text-white rounded-xl transition-all shadow-lg hover:shadow-primary/20">
                                            <Play size={18} fill="currentColor" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Doubt Resolution Sidebar */}
                    <div className="space-y-8">
                        {/* Doubt Resolution Center */}
                        <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
                            <CardContent className="p-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-black font-outfit text-slate-900 uppercase tracking-tighter">Doubt Center</h3>
                                    <Badge className="bg-red-50 text-red-500 border-none font-black text-[9px] uppercase px-2 h-5">12 New</Badge>
                                </div>
                                <div className="space-y-5">
                                    {DOUBTS.map((doubt) => (
                                        <div key={doubt.id} className="p-5 rounded-2xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-primary/10 transition-all duration-300 cursor-pointer group">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <img src={`https://i.pravatar.cc/100?u=${doubt.student}`} className="w-6 h-6 rounded-lg grayscale" alt={doubt.student} />
                                                    <span className="text-[10px] font-black text-slate-900">{doubt.student}</span>
                                                </div>
                                                <Badge className={cn(
                                                    "text-[8px] font-black tracking-widest uppercase border-none px-2 py-0.5",
                                                    doubt.status === 'Urgent' ? "bg-red-500 text-white" :
                                                        doubt.status === 'Pending' ? "bg-amber-400 text-white" : "bg-slate-200 text-slate-500"
                                                )}>
                                                    {doubt.status}
                                                </Badge>
                                            </div>
                                            <p className="text-xs font-bold text-slate-500 line-clamp-2 leading-relaxed mb-3 group-hover:text-slate-700 transition-colors italic">
                                                &quot;{doubt.question}&quot;
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{doubt.time}</span>
                                                <Button variant="ghost" size="sm" className="h-7 px-3 text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary/10">Solve Now</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="w-full h-11 rounded-xl border-dashed border-slate-200 text-slate-500 font-black text-[10px] uppercase tracking-widest">Manage All Doubts</Button>
                            </CardContent>
                        </Card>

                        {/* Performance Mini Chart */}
                        <Card className="border-none shadow-sm rounded-[2.5rem] bg-slate-900 text-white overflow-hidden relative">
                            <CardContent className="p-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold font-outfit uppercase tracking-tight text-sm">Engagement Trend</h3>
                                    <TrendingUp size={16} className="text-emerald-500" />
                                </div>
                                <div className="h-24 flex items-end gap-1.5 pt-4">
                                    {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
                                        <div key={i} className="flex-1 bg-white/10 rounded-t-md relative group cursor-help transition-all duration-500 hover:bg-primary/40" style={{ height: `${h}%` }}>
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[8px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                +{h}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <p className="text-xs font-bold text-slate-400">Weekly Activity</p>
                                    <p className="text-xs font-black text-emerald-500">+24%</p>
                                </div>
                            </CardContent>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        </Card>
                    </div>
                </div>

                {/* Student Ranking */}
                <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
                    <CardContent className="p-10 space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black font-outfit text-slate-900 uppercase tracking-tighter">Student Brilliance</h3>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Top Performers from your batches</p>
                            </div>
                            <Button variant="outline" className="h-11 px-8 rounded-xl border-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-widest gap-2">
                                <Users size={16} /> View All Profiles
                            </Button>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { name: "Rahul Deshmukh", score: "98%", status: "UP", rank: 1, batch: "Calculus Elite", img: "https://i.pravatar.cc/150?u=1" },
                                { name: "Sneha Kapur", score: "95%", status: "UP", rank: 2, batch: "Algebra Foundation", img: "https://i.pravatar.cc/150?u=2" },
                                { name: "Amit Verma", score: "92%", status: "DOWN", rank: 3, batch: "SSC CGL Pro", img: "https://i.pravatar.cc/150?u=3" }
                            ].map((student) => (
                                <div key={student.rank} className="p-6 rounded-3xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img src={student.img} className="w-14 h-14 rounded-2xl border-2 border-white shadow-md grayscale group-hover:grayscale-0 transition-all duration-500" alt={student.name} />
                                            <div className="absolute -top-2 -left-2 w-7 h-7 bg-slate-900 shadow-xl border-2 border-white rounded-full flex items-center justify-center text-[10px] font-black text-white">
                                                {student.rank}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors">{student.name}</p>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{student.batch}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-black text-slate-900">{student.score}</p>
                                        <p className={cn(
                                            "text-[9px] font-black uppercase flex items-center justify-end gap-1",
                                            student.status === 'UP' ? "text-emerald-500" : "text-amber-500"
                                        )}>
                                            <ArrowUpRight size={10} className={student.status === 'DOWN' ? 'rotate-90' : ''} />
                                            {student.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
