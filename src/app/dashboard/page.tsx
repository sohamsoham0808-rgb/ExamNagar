"use client"

import * as React from "react"
import {
    Zap,
    Clock,
    Trophy,
    CheckCircle,
    PlayCircle,
    Calendar,
    Award,
    TrendingUp,
    BookOpen
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { TOP_COURSES } from "@/lib/data/courses"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
    const enrolledCourses = TOP_COURSES.slice(0, 2);

    return (
        <DashboardLayout
            role="student"
            user={{
                name: "Soham",
                role: "JEE Aspirant",
                avatar: "https://i.pravatar.cc/150?u=current_user"
            }}
        >
            <div className="space-y-10">
                {/* Welcome Heading */}
                <div className="space-y-1">
                    <h1 className="text-3xl font-black font-outfit text-slate-900 uppercase tracking-tighter">Welcome back, <span className="text-primary italic">Soham! 👋</span></h1>
                    <p className="text-slate-500 text-sm font-medium">You&apos;ve completed 75% of your weekly goal. Keep it up!</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        label="Learning Streak"
                        value="12 Days"
                        icon={<Zap className="fill-orange-500 text-orange-500" size={24} />}
                        trend={{ value: "2d", isUp: true }}
                    />
                    <StatsCard
                        label="Hours Spent"
                        value="45.5h"
                        icon={<Clock className="text-blue-500" size={24} />}
                        trend={{ value: "12%", isUp: true }}
                    />
                    <StatsCard
                        label="Test Average"
                        value="82%"
                        icon={<Trophy className="text-accent" size={24} />}
                        trend={{ value: "5%", isUp: true }}
                    />
                    <StatsCard
                        label="Courses Completed"
                        value="04"
                        icon={<CheckCircle className="text-emerald-500" size={24} />}
                    />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Dashboard Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Continue Learning */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-end">
                                <h2 className="text-xl font-black font-outfit text-slate-900 uppercase tracking-tight">Continue Learning</h2>
                                <Button variant="ghost" size="sm" className="text-primary font-black uppercase text-[10px] tracking-widest">View My Library</Button>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {enrolledCourses.map((course) => (
                                    <Card key={course.id} className="group overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white">
                                        <div className="relative aspect-video overflow-hidden">
                                            <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={course.title} />
                                            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <PlayCircle size={48} className="text-white" fill="currentColor" />
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-200">
                                                <div className="h-full bg-primary" style={{ width: '65%' }}></div>
                                            </div>
                                        </div>
                                        <CardContent className="p-6">
                                            <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Module 4: Next Lesson</p>
                                            <h3 className="font-bold text-slate-900 mb-4 line-clamp-1">{course.title}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-black uppercase text-slate-400">65% Completed</span>
                                                <div className="flex -space-x-2">
                                                    {[1, 2].map((i) => (
                                                        <img key={i} src={`https://i.pravatar.cc/50?u=${i}`} className="w-6 h-6 rounded-full border-2 border-white" alt="Peer" />
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Performance Insights */}
                        <div className="p-10 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

                            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                                <div className="space-y-6">
                                    <Badge className="bg-emerald-500 font-black text-[9px] uppercase tracking-widest px-4 py-1">Weekly Insight</Badge>
                                    <h3 className="text-3xl font-black font-outfit uppercase tracking-tighter leading-tight">Your performance is up by <span className="text-primary">15%</span> this week!</h3>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed">You&apos;ve mastered 4 new topics in Organic Chemistry. Based on your speed, you&apos;re on track to finish early.</p>
                                    <Button className="bg-white text-slate-900 hover:bg-slate-200 font-black text-[10px] uppercase tracking-widest px-8 rounded-xl h-12">Full Analysis</Button>
                                </div>
                                <div className="flex justify-center">
                                    <div className="relative w-40 h-40 flex items-center justify-center">
                                        <svg className="w-full h-full -rotate-90">
                                            <circle cx="80" cy="80" r="74" className="stroke-slate-800 fill-none" strokeWidth="12" />
                                            <circle cx="80" cy="80" r="74" className="stroke-primary fill-none" strokeWidth="12" strokeDasharray="464.72" strokeDashoffset="116.18" strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute flex flex-col items-center">
                                            <span className="text-4xl font-black font-outfit uppercase">75</span>
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Score</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        {/* My Schedule */}
                        <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
                            <CardContent className="p-8 space-y-8">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-black font-outfit text-slate-900 uppercase tracking-tighter">Upcoming Today</h3>
                                    <Calendar size={20} className="text-primary" />
                                </div>
                                <div className="space-y-6">
                                    {[
                                        { time: "04:30 PM", subject: "Maths: Calculus", type: "Live Class", instructor: "R. Sharma" },
                                        { time: "07:00 PM", subject: "Physics: Optics", type: "Doubt Session", instructor: "V. Sarabhai" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 hover:bg-primary/5 transition-all cursor-pointer group border border-transparent hover:border-primary/10">
                                            <div className="text-center min-w-[70px] py-1 border-r border-slate-200">
                                                <p className="text-sm font-black text-primary">{item.time.split(' ')[0]}</p>
                                                <p className="text-[9px] uppercase font-black text-slate-400">{item.time.split(' ')[1]}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{item.subject}</p>
                                                <div className="flex items-center gap-2">
                                                    <Badge className="bg-white text-[8px] font-black uppercase text-primary border-primary/10 h-5 px-2">{item.type}</Badge>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Prof. {item.instructor}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="w-full border-dashed border-slate-200 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500">View Full Schedule</Button>
                            </CardContent>
                        </Card>

                        {/* Achievements */}
                        <Card className="border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden">
                            <CardContent className="p-8 space-y-8">
                                <h3 className="font-black font-outfit text-slate-900 uppercase tracking-tighter">Badge Collection</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { icon: <Zap size={20} />, color: "bg-orange-100 text-orange-500", label: "Streak" },
                                        { icon: <Award size={20} />, color: "bg-blue-100 text-blue-500", label: "Ranker" },
                                        { icon: <TrendingUp size={20} />, color: "bg-emerald-100 text-emerald-500", label: "Speed" },
                                    ].map((badge, i) => (
                                        <div key={i} className="flex flex-col items-center gap-3 group">
                                            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-sm", badge.color)}>
                                                {badge.icon}
                                            </div>
                                            <span className="text-[10px] font-black text-center uppercase tracking-tighter transition-colors group-hover:text-primary">{badge.label}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-slate-50 p-6 rounded-[1.5rem] space-y-3">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-slate-400">Next: Quiz Whiz</span>
                                        <span className="text-primary">8/10</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
