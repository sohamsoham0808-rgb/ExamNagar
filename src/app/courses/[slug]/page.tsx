"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Section } from "@/components/layout/Section"
import { TOP_COURSES } from "@/lib/data/courses"
import {
    Play,
    Star,
    Clock,
    Users,
    CheckCircle2,
    Lock,
    ChevronRight,
    FileText,
    HelpCircle,
    Video,
    ShieldCheck,
    Zap,
    Sparkles,
    Trophy,
    ArrowRight,
    MonitorPlay,
    BookOpen
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"

export default function CourseDetailPage() {
    const params = useParams()
    const course = TOP_COURSES.find(c => c.id === params.slug)
    const [isEnrolled, setIsEnrolled] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState<'notes' | 'dpp' | 'quiz'>('notes')
    const [currentLesson, setCurrentLesson] = React.useState("Course Overview")

    if (!course) return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-primary">Course not found</div>

    // Learning Dashboard View (Visible after Enrollment)
    if (isEnrolled) {
        return (
            <div className="bg-[#0f172a] min-h-screen pt-24 pb-20 font-outfit">
                <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-8">
                    {/* Main Player & Content */}
                    <div className="flex-1 space-y-8">
                        {/* Cinema Player */}
                        <div className="relative aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MonitorPlay size={80} className="text-white/10 group-hover:scale-110 transition-transform group-hover:text-primary/20" />
                            </div>
                            <div className="absolute top-8 left-8 flex items-center gap-3">
                                <Badge className="bg-primary/90 text-white border-none font-black px-4 py-2 uppercase tracking-widest text-[10px]">Live Lecture</Badge>
                                <span className="text-white/60 text-xs font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">1080p Ultra HD</span>
                            </div>
                            <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between bg-gradient-to-t from-black via-black/40 to-transparent p-6 -m-6">
                                <div>
                                    <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-1">Now Playing</p>
                                    <h2 className="text-white font-black text-2xl uppercase tracking-tighter">{currentLesson}</h2>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-primary transition-all">
                                        <Play size={24} fill="currentColor" className="ml-1" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Tabs */}
                        <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/5 shadow-2xl">
                            <div className="flex gap-4 mb-10 overflow-x-auto no-scrollbar">
                                {[
                                    { id: 'notes', label: 'Study Vault', icon: FileText },
                                    { id: 'dpp', label: 'Practice Sheets', icon: ShieldCheck },
                                    { id: 'quiz', label: 'Assessments', icon: HelpCircle }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={cn(
                                            "flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shrink-0",
                                            activeTab === tab.id
                                                ? "bg-primary text-white shadow-xl shadow-primary/20"
                                                : "text-slate-500 hover:text-white bg-white/5 hover:bg-white/10"
                                        )}
                                    >
                                        <tab.icon size={16} />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="min-h-[300px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {activeTab === 'notes' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                                        {[
                                            { title: "Lec 01: Concept Mapping", size: "2.4 MB" },
                                            { title: "Lec 02: Advanced Methods", size: "3.1 MB" },
                                            { title: "Special Sunday Notes", size: "1.2 MB" },
                                            { title: "The Success Blueprint", size: "5.4 MB" }
                                        ].map((note, i) => (
                                            <div key={i} className="bg-slate-800/40 p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-slate-800/80 transition-all cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
                                                        <FileText size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="font-black uppercase text-[10px] tracking-widest mb-1">{note.title}</p>
                                                        <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">{note.size} • PDF Document</p>
                                                    </div>
                                                </div>
                                                <ChevronRight size={20} className="text-slate-700 group-hover:text-primary transition-colors" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {activeTab === 'dpp' && (
                                    <div className="flex flex-col gap-4 text-white">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="flex flex-col md:flex-row items-center gap-6 bg-slate-800/20 p-8 rounded-[2rem] border border-white/5 hover:bg-slate-800/40 transition-all">
                                                <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-400"><ShieldCheck size={32} /></div>
                                                <div className="flex-1 text-center md:text-left">
                                                    <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-1">Practice Program #0{i}</h4>
                                                    <p className="text-slate-500 text-xs font-medium italic">25 High-level questions with video mapping.</p>
                                                </div>
                                                <Button size="sm" className="bg-white text-black font-black uppercase text-[10px] tracking-widest px-10 rounded-2xl h-14 hover:bg-primary hover:text-white shadow-xl shadow-black/20">Solve Now</Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {activeTab === 'quiz' && (
                                    <div className="text-center py-20 bg-slate-800/10 rounded-[4rem] border border-dashed border-white/10">
                                        <Trophy size={60} className="text-accent mx-auto mb-8 animate-bounce" />
                                        <h3 className="text-white font-black text-3xl uppercase tracking-tighter mb-4">Evaluate Progress</h3>
                                        <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium mb-10 leading-relaxed">The weekly evaluation unlocks on Saturdays. Complete all lectures to be eligible for the rankers list.</p>
                                        <Badge className="bg-white/5 text-white border-white/10 px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest">Unlocking in 2 Days</Badge>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Sidebar */}
                    <div className="w-full lg:w-[450px] space-y-8">
                        <div className="bg-slate-900 border border-white/5 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-all" />
                            <h3 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                                <BookOpen size={18} className="text-primary" />
                                Mastery Roadmap
                            </h3>
                            <div className="space-y-4 relative z-10">
                                {[
                                    "Course Overview & Orientation",
                                    "Level 01: Foundations Explored",
                                    "Level 02: Analytical Mastery",
                                    "Level 03: Expert Strategies",
                                    "Final Rankers Evaluation"
                                ].map((lesson, i) => (
                                    <button
                                        key={lesson}
                                        onClick={() => setCurrentLesson(lesson)}
                                        className={cn(
                                            "w-full text-left p-6 rounded-3xl border transition-all flex items-center gap-4 group/btn",
                                            currentLesson === lesson
                                                ? "bg-primary border-primary text-white shadow-xl shadow-primary/30"
                                                : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/10"
                                        )}
                                    >
                                        <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs", currentLesson === lesson ? "bg-white/20" : "bg-white/5 group-hover/btn:bg-primary/30 transition-colors")}>
                                            0{i + 1}
                                        </div>
                                        <span className="font-bold text-xs uppercase tracking-widest flex-1">{lesson}</span>
                                        {i > 2 && <Lock size={14} className="opacity-40" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Ranker Widget */}
                        <div className="bg-gradient-to-br from-slate-800 to-slate-950 p-10 rounded-[3.5rem] text-white border border-white/5 shadow-2xl relative group">
                            <Sparkles className="absolute top-6 right-6 text-accent opacity-40 animate-pulse" />
                            <h4 className="text-2xl font-black font-outfit uppercase tracking-tighter mb-8">Your Standing</h4>
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <span>Course Velocity</span>
                                        <span className="text-white">Active</span>
                                    </div>
                                    <div className="h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5">
                                        <div className="h-full w-[65%] bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Daily Streak</p>
                                        <p className="text-xl font-black font-outfit">12 Days</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Rank</p>
                                        <p className="text-xl font-black font-outfit">#420</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Default Marketing Detail View (Redesigned for WOW factor)
    return (
        <div className="bg-[#fbfcff] min-h-screen font-outfit">
            {/* Dark Cinematic Hero */}
            <div className="bg-slate-950 pt-32 pb-60 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-primary/20 blur-[180px] rounded-full" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-accent/20 blur-[180px] rounded-full" />
                </div>

                <Section className="relative z-10">
                    <div className="flex flex-col xl:flex-row gap-20 items-center">
                        <div className="flex-1 text-center xl:text-left space-y-12">
                            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-3xl border border-white/10 px-8 py-3 rounded-full mb-4">
                                <Badge className="bg-primary text-white border-none text-[8px] font-black leading-none">RANKER CHOICE</Badge>
                                <span className="text-white/60 font-black text-[10px] uppercase tracking-[0.4em]">{course.category} 2024</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl 2xl:text-9xl font-black text-white tracking-tightest leading-[0.8] uppercase">
                                {course.title.split(' ').map((word, i) => (
                                    <span key={i} className={i % 2 === 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic block md:inline" : ""}>{word} </span>
                                ))}
                            </h1>

                            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-6 pt-4">
                                <div className="flex items-center gap-3 bg-white/5 px-8 py-4 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-md transition-all hover:bg-white/10">
                                    <Users size={24} className="text-primary shadow-primary/20" />
                                    <div className="flex flex-col">
                                        <span className="text-white font-black text-xs uppercase tracking-widest">{course.students}</span>
                                        <span className="text-slate-500 font-bold text-[8px] uppercase tracking-widest">Enrolled Learners</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 px-8 py-4 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-md transition-all hover:bg-white/10">
                                    <Trophy size={24} className="text-accent shadow-accent/20" />
                                    <div className="flex flex-col">
                                        <span className="text-white font-black text-xs uppercase tracking-widest">{course.rating}/5.0</span>
                                        <span className="text-slate-500 font-bold text-[8px] uppercase tracking-widest">Success Rating</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl mx-auto xl:mx-0">
                                Join our <span className="text-white font-bold decoration-primary underline underline-offset-8">exclusive selection engine</span>. This batch is architected for results, featuring live mapping by {course.instructor} and personalized doubt mentory.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-8 justify-center xl:justify-start pt-10">
                                <Button
                                    onClick={() => setIsEnrolled(true)}
                                    className="h-24 px-20 rounded-[2.5rem] bg-primary text-white font-black uppercase text-[14px] tracking-[0.25em] shadow-[0_20px_50px_rgba(var(--primary),0.4)] hover:scale-105 active:scale-95 transition-all group"
                                >
                                    Join The Batch <Zap size={20} className="ml-3 fill-white group-hover:scale-125 transition-transform" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-24 px-12 rounded-[2.5rem] border-white/10 bg-white/5 text-white hover:bg-white/10 font-black uppercase text-[10px] tracking-widest backdrop-blur-xl"
                                >
                                    <MonitorPlay size={20} className="mr-3" /> Watch Demo Session
                                </Button>
                            </div>
                        </div>

                        {/* Cinema Preview Floating Deck */}
                        <div className="w-full xl:w-[600px] relative select-none">
                            <div className="absolute -inset-10 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                            <Card className="relative bg-slate-900 rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform xl:rotate-3 transition-all duration-1000 group hover:rotate-0">
                                <img src={course.thumbnail} className="w-full aspect-[4/5] object-cover opacity-60 transition-transform duration-[2000ms] group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-primary transition-all shadow-2xl scale-125 group-hover:scale-150 group-active:scale-110">
                                        <Play size={40} fill="currentColor" className="ml-2" />
                                    </div>
                                </div>

                                <div className="absolute bottom-12 left-10 right-10 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Badge className="bg-emerald-500 text-white border-none font-black text-[9px] px-6 py-2 rounded-full shadow-xl">LIVE ENROLLMENT OPEN</Badge>
                                    </div>
                                    <div className="flex items-baseline gap-4">
                                        <span className="text-6xl font-black font-outfit text-white tracking-tightest">₹{course.price}</span>
                                        <span className="text-white/30 line-through text-2xl font-bold">₹{course.originalPrice}</span>
                                    </div>
                                    <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em]">Institutional Scholarship ID: #82928</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Section>
            </div>

            {/* Feature Highlights Grid */}
            <Section className="-mt-32 relative z-20 pb-40">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-16">
                        {/* Benefits Grid */}
                        <div className="bg-white p-12 md:p-20 rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                            <div className="text-center md:text-left mb-16 space-y-3">
                                <h3 className="text-4xl font-black text-primary font-outfit uppercase tracking-tighter inline-flex items-center gap-4">
                                    Why this <span className="text-accent italic">Batch?</span>
                                </h3>
                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Built for maximum selection conversion</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-10">
                                {[
                                    { title: "Level 0 to Advanced", desc: "No prior knowledge required. We build you from scratch.", icon: <Zap className="text-primary" /> },
                                    { title: "AI Performance Analytics", desc: "Track every mistake and mapped concepts.", icon: <Sparkles className="text-accent" /> },
                                    { title: "One-on-One Mentoring", desc: "Direct access to our subject matter experts.", icon: <Users className="text-primary" /> },
                                    { title: "Live Rapid Rounds", desc: "Gamified live quizzes to boost your speed.", icon: <Play className="text-accent" /> }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 p-8 rounded-[2.5rem] bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:scale-[1.02] transition-all border border-transparent hover:border-slate-100">
                                        <div className="w-16 h-16 shrink-0 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-slate-900 font-black text-sm uppercase tracking-tight mb-2">{item.title}</h4>
                                            <p className="text-slate-500 text-xs font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Structured Roadmap */}
                        <div className="bg-slate-950 p-12 md:p-20 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">
                                    <h3 className="text-4xl font-black font-outfit uppercase tracking-tighter">Your Roadmap</h3>
                                    <Badge className="bg-white/10 text-white border-white/20 px-8 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase">220+ High Quality Lectures</Badge>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        "Phase 01: Concept Seeding & Orientation",
                                        "Phase 02: Core Theoretical Deep-dive",
                                        "Phase 03: Advanced Problem Mapping",
                                        "Phase 04: Selection Booster Strategies"
                                    ].map((phase, i) => (
                                        <div key={i} className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer flex items-center gap-8">
                                            <div className="w-16 h-16 rounded-[1.5rem] bg-white text-slate-900 flex items-center justify-center font-black text-xl shadow-2xl">
                                                0{i + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xl font-black uppercase tracking-tight font-outfit">{phase}</h4>
                                                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-1">10-12 Lessons • 24 study sheets • Complete Coverage</p>
                                            </div>
                                            <ArrowRight className="text-slate-700 group-hover:text-primary transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Attractive Sidebar CTA */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-[4rem] p-4 border border-slate-100 shadow-2xl sticky top-32">
                            <div className="bg-primary rounded-[3.5rem] p-10 text-white text-center space-y-10 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                                <div className="space-y-2 relative z-10">
                                    <p className="font-black text-[10px] uppercase tracking-[0.4em] opacity-80">Final Selection Call</p>
                                    <h4 className="text-4xl font-black font-outfit uppercase tracking-tightest">Secure Your Seat</h4>
                                </div>

                                <div className="space-y-1 relative z-10">
                                    <div className="flex items-baseline justify-center gap-4">
                                        <span className="text-6xl font-black font-outfit tracking-tightest">₹{course.price}</span>
                                        <span className="text-white/40 line-through text-2xl font-bold">₹{course.originalPrice}</span>
                                    </div>
                                    <Badge className="bg-black/20 text-white border-white/20 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest">75% OFF TODAY</Badge>
                                </div>

                                <div className="space-y-4 pt-4 relative z-10">
                                    <Button
                                        onClick={() => setIsEnrolled(true)}
                                        className="w-full h-24 rounded-[2rem] bg-white text-primary hover:bg-slate-100 font-black uppercase text-[12px] tracking-[0.2em] shadow-2xl transition-all hover:scale-105 active:scale-95"
                                    >
                                        Enroll Now
                                    </Button>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Offer ends in 04:32:12</p>
                                </div>

                                <div className="pt-8 border-t border-white/10 space-y-6 relative z-10">
                                    {[
                                        { label: "Valid for", val: "12 Months" },
                                        { label: "Faculty", val: course.instructor },
                                        { label: "Medium", val: "Hinglish" }
                                    ].map(item => (
                                        <div key={item.label} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                            <span className="opacity-60">{item.label}</span>
                                            <span className="text-white">{item.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Trusted Badge */}
                        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm text-center">
                            <div className="flex justify-center -space-x-4 mb-6">
                                {[1, 2, 3, 4].map(i => (
                                    <img key={i} src={`https://i.pravatar.cc/100?u=s${i}`} className="w-14 h-14 rounded-2xl border-4 border-white object-cover shadow-xl" />
                                ))}
                            </div>
                            <p className="text-slate-900 font-black text-xs uppercase tracking-tight">8,400+ Students Already Joined</p>
                            <p className="text-slate-400 text-[10px] font-medium italic mt-2">Verified selections across all major departments.</p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}
