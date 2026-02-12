"use client"

import * as React from "react"
import { Search, Filter, MoreVertical, Mail, Phone, FileText, UserPlus, ChevronRight, Star, GraduationCap, CheckCircle2 } from "lucide-react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

const STUDENTS = [
    { id: 1, name: "Arjun Sharma", batch: "JEE Advanced 2024", attendance: "98%", score: "92/100", status: "Active", imgPath: "https://i.pravatar.cc/150?u=a" },
    { id: 2, name: "Priyanaka Verma", batch: "NEET Foundation", attendance: "85%", score: "78/100", status: "Warning", imgPath: "https://i.pravatar.cc/150?u=b" },
    { id: 3, name: "Sahil Khan", batch: "UPSC History", attendance: "92%", score: "88/100", status: "Active", imgPath: "https://i.pravatar.cc/150?u=c" },
    { id: 4, name: "Riya Singh", batch: "JEE Mains - Phsyics", attendance: "70%", score: "65/100", status: "At Risk", imgPath: "https://i.pravatar.cc/150?u=d" },
    { id: 5, name: "Ankit Tiwari", batch: "JEE Advanced 2024", attendance: "95%", score: "89/100", status: "Active", imgPath: "https://i.pravatar.cc/150?u=e" },
    { id: 6, name: "Sneha Kapoor", batch: "NEET Foundation", attendance: "88%", score: "82/100", status: "Active", imgPath: "https://i.pravatar.cc/150?u=f" },
]

export default function StudentsPage() {
    const [searchQuery, setSearchQuery] = React.useState("")

    return (
        <DashboardLayout role="teacher">
            <div className="space-y-10">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <Badge className="bg-primary/10 text-primary border-none font-bold px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest">Directory</Badge>
                        <h1 className="text-4xl font-black font-outfit text-slate-900 uppercase tracking-tighter">
                            Student <span className="text-primary italic">Management</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-sm">Monitor performance, attendance and engagement across your batches.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-12 w-12 rounded-2xl border-slate-200">
                            <Filter size={20} />
                        </Button>
                        <Button className="h-12 px-6 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200 font-black text-xs uppercase tracking-widest gap-2">
                            <UserPlus size={18} /> Add Student
                        </Button>
                    </div>
                </div>

                {/* Search & Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3 relative group">
                        <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-[2.5rem] opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                            <Input
                                placeholder="Search by name, batch or student ID..."
                                className="h-16 pl-16 rounded-2xl bg-white border-slate-100 shadow-sm focus-visible:ring-primary/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                                <GraduationCap size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Enrolled</p>
                                <p className="text-xl font-black font-outfit text-slate-900">1,280</p>
                            </div>
                        </div>
                        <div className="text-emerald-500 text-xs font-bold">+12%</div>
                    </div>
                </div>

                {/* Students List */}
                <div className="grid grid-cols-1 gap-4">
                    {STUDENTS.map((student) => (
                        <Card key={student.id} className="group border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 rounded-[2rem]">
                            <CardContent className="p-4">
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="relative shrink-0">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-100 group-hover:border-primary/50 transition-colors">
                                            <img src={student.imgPath} alt={student.name} className="w-full h-full object-cover" />
                                        </div>
                                        {student.status === "Active" && <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full" />}
                                    </div>

                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="font-black text-lg text-slate-900 font-outfit uppercase tracking-tight">{student.name}</h3>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{student.batch}</p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 px-6 py-2 bg-slate-50/50 rounded-2xl border border-slate-50 group-hover:bg-white transition-colors">
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Attendance</p>
                                            <p className="font-outfit font-black text-slate-900">{student.attendance}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Avg Score</p>
                                            <p className="font-outfit font-black text-slate-900">{student.score}</p>
                                        </div>
                                        <div className="hidden md:block">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</p>
                                            <Badge className={cn(
                                                "border-none px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-lg",
                                                student.status === "Active" ? "bg-emerald-100 text-emerald-600" :
                                                    student.status === "Warning" ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600"
                                            )}>
                                                {student.status}
                                            </Badge>
                                        </div>
                                        <div className="hidden md:block">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Last Active</p>
                                            <p className="text-[10px] font-bold text-slate-500">2h ago</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200 hover:text-primary hover:border-primary/20">
                                            <Mail size={18} />
                                        </Button>
                                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200 hover:text-primary hover:border-primary/20">
                                            <FileText size={18} />
                                        </Button>
                                        <Button size="icon" className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                                            <ChevronRight size={18} />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State Mock */}
                {searchQuery && !STUDENTS.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())) && (
                    <div className="py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                        <Search className="mx-auto text-slate-300 mb-4" size={48} />
                        <h3 className="text-xl font-black text-slate-900 font-outfit uppercase">No matching students</h3>
                        <p className="text-slate-400 text-sm font-medium">Try a different name or batch filter</p>
                    </div>
                )}

                {/* Pagination Placeholder */}
                <div className="flex items-center justify-center pt-8">
                    <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <Button variant="outline" className="w-10 h-10 p-0 rounded-xl border-none bg-slate-50 text-slate-400"><ChevronRight size={18} className="rotate-180" /></Button>
                        <Button className="w-10 h-10 p-0 rounded-xl bg-primary text-white font-black text-xs">1</Button>
                        <Button variant="ghost" className="w-10 h-10 p-0 rounded-xl text-slate-400 font-black text-xs">2</Button>
                        <Button variant="ghost" className="w-10 h-10 p-0 rounded-xl text-slate-400 font-black text-xs">3</Button>
                        <Button variant="outline" className="w-10 h-10 p-0 rounded-xl border-none bg-slate-50 text-slate-400"><ChevronRight size={18} /></Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
