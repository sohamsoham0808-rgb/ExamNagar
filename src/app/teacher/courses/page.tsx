"use client"

import * as React from "react"
import { Plus, BookOpen, Users, Clock, Play, MoreVertical, Search, Filter } from "lucide-react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

const COURSES = [
    {
        id: 1,
        title: "Calculus Elite for JEE 2024",
        students: "1,240",
        videos: "42",
        status: "Active",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        title: "Algebra Foundation Masterclass",
        students: "845",
        videos: "28",
        status: "Active",
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        title: "Ancient History — Detailed Series",
        students: "520",
        videos: "15",
        status: "Draft",
        image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=60"
    }
]

export default function MyCoursesPage() {
    return (
        <DashboardLayout role="teacher">
            <div className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <Badge className="bg-primary/10 text-primary border-none font-bold px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest">Curriculum</Badge>
                        <h1 className="text-4xl font-black font-outfit text-slate-900 uppercase tracking-tighter">
                            My <span className="text-primary italic">Courses</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-sm">Manage your curriculum, students and video content.</p>
                    </div>
                    <Button className="h-14 px-8 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200 font-black text-xs uppercase tracking-widest gap-3">
                        <Plus size={18} /> Create New Course
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                        <Input
                            placeholder="Find a course..."
                            className="h-16 pl-16 rounded-2xl border-none bg-white shadow-sm shadow-slate-200/50 font-medium"
                        />
                    </div>
                    <Button variant="outline" className="h-16 px-8 rounded-2xl border-slate-100 font-black text-[10px] uppercase tracking-widest gap-2 bg-white">
                        <Filter size={18} /> Filter Status
                    </Button>
                </div>

                {/* Course Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {COURSES.map((course) => (
                        <Card key={course.id} className="group border-none shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-white">
                            <div className="aspect-video relative overflow-hidden">
                                <img src={course.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={course.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                                    <Badge className={cn(
                                        "border-none px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest",
                                        course.status === "Active" ? "bg-emerald-500 text-white" : "bg-white/20 text-white backdrop-blur-md"
                                    )}>
                                        {course.status}
                                    </Badge>
                                </div>
                            </div>
                            <CardContent className="p-8 space-y-6">
                                <h3 className="text-lg font-black text-slate-900 font-outfit uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                            <Users size={14} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Students</span>
                                            <span className="text-xs font-black text-slate-900">{course.students}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-accent transition-colors">
                                            <BookOpen size={14} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Videos</span>
                                            <span className="text-xs font-black text-slate-900">{course.videos}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <Button variant="ghost" size="sm" className="h-10 px-6 rounded-xl text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50">Manage</Button>
                                    <Button size="icon" className="h-10 w-10 text-slate-300 hover:text-slate-900 rounded-xl">
                                        <MoreVertical size={18} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <button className="border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-slate-300 hover:border-primary/20 hover:text-primary hover:bg-primary/5 transition-all duration-500 min-h-[400px]">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white">
                            <Plus size={32} />
                        </div>
                        <span className="font-black text-xs uppercase tracking-[0.2em]">New Course</span>
                    </button>
                </div>
            </div>
        </DashboardLayout>
    )
}
