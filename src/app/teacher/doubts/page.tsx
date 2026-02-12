"use client"

import * as React from "react"
import {
    Search,
    Filter,
    MessageSquare,
    Clock,
    Send,
    CheckCircle2,
    AlertCircle,
    Clock3,
    MoreHorizontal,
    ChevronDown,
    User,
    Paperclip
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

const DOUBTS = [
    {
        id: 1,
        student: "Aavya Gupta",
        batch: "JEE Advanced 2024",
        question: "In Module 4, why do we use the chain rule for this specific derivative? I'm confused about the inner function substitution.",
        time: "5 mins ago",
        status: "Urgent",
        category: "Mathematics",
        avatar: "https://i.pravatar.cc/150?u=a"
    },
    {
        id: 2,
        student: "Karan Johar",
        batch: "NEET Foundation",
        question: "Can you provide more examples for Integration by Parts? The textbook examples are a bit too simple.",
        time: "1 hr ago",
        status: "Pending",
        category: "Mathematics",
        avatar: "https://i.pravatar.cc/150?u=b"
    },
    {
        id: 3,
        student: "Rohan Mehra",
        batch: "SSC CGL Pro",
        question: "When is the next doubt clearing live session scheduled? I have a list of questions ready.",
        time: "3 hrs ago",
        status: "Resolved",
        category: "General",
        avatar: "https://i.pravatar.cc/150?u=c"
    },
    {
        id: 4,
        student: "Ishaan Khattar",
        batch: "UPSC History",
        question: "Does the decline of the Mughal Empire start before or after the death of Aurangzeb?",
        time: "Yesterday",
        status: "Pending",
        category: "History",
        avatar: "https://i.pravatar.cc/150?u=d"
    }
]

export default function DoubtCenterPage() {
    const [selectedTab, setSelectedTab] = React.useState("New")
    const [searchQuery, setSearchQuery] = React.useState("")

    return (
        <DashboardLayout role="teacher">
            <div className="space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <Badge className="bg-accent/10 text-accent border-none font-bold px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest">Support Hub</Badge>
                        <h1 className="text-4xl font-black font-outfit text-slate-900 uppercase tracking-tighter">
                            Doubt <span className="text-accent italic">Resolution</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-sm">Review and respond to student queries across all your active batches.</p>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-4 shadow-sm flex flex-col lg:flex-row gap-4 items-center">
                    <div className="flex bg-slate-50 p-1.5 rounded-2xl w-full lg:w-fit">
                        {["New", "Pending", "Resolved"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={cn(
                                    "px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                                    selectedTab === tab ? "bg-white text-accent shadow-lg" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 w-full relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={20} />
                        <Input
                            placeholder="Search by student name, keywords or batch..."
                            className="h-14 pl-16 rounded-xl bg-slate-50 border-transparent focus-visible:ring-accent/20 font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="h-14 px-6 rounded-xl border-slate-100 font-black text-[10px] uppercase tracking-widest gap-2 shrink-0">
                        <Filter size={18} /> Batch Filter
                    </Button>
                </div>

                {/* Main Doubt Listing */}
                <div className="grid grid-cols-1 gap-6">
                    {DOUBTS.map((doubt) => (
                        <Card key={doubt.id} className="group border-slate-100 hover:border-accent/20 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 rounded-[2.5rem] overflow-hidden">
                            <CardContent className="p-8">
                                <div className="flex flex-col lg:flex-row gap-8">
                                    {/* Student Sidebar */}
                                    <div className="lg:w-64 shrink-0 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:border-r lg:border-slate-50 lg:pr-8">
                                        <div className="relative">
                                            <img src={doubt.avatar} className="w-14 h-14 rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500" alt={doubt.student} />
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full" />
                                        </div>
                                        <div className="space-y-1 flex-1">
                                            <h3 className="font-black text-slate-900 font-outfit uppercase tracking-tight leading-none">{doubt.student}</h3>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{doubt.batch}</p>
                                            <div className="flex items-center gap-2 pt-1">
                                                <Badge className="bg-slate-100 text-slate-500 border-none text-[8px] font-black uppercase px-2 py-0.5">{doubt.category}</Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Doubt Content */}
                                    <div className="flex-1 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Badge className={cn(
                                                    "border-none px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                                    doubt.status === "Urgent" ? "bg-red-500 text-white" :
                                                        doubt.status === "Pending" ? "bg-amber-400 text-white" : "bg-emerald-500 text-white"
                                                )}>
                                                    {doubt.status}
                                                </Badge>
                                                <span className="text-slate-400 text-[10px] font-bold uppercase flex items-center gap-1.5">
                                                    <Clock size={12} /> Received {doubt.time}
                                                </span>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-slate-900 rounded-xl">
                                                <MoreHorizontal size={20} />
                                            </Button>
                                        </div>

                                        <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-50 group-hover:bg-white transition-colors">
                                            <p className="text-lg text-slate-700 font-medium leading-relaxed italic">
                                                &quot;{doubt.question}&quot;
                                            </p>
                                        </div>

                                        <div className="flex flex-col md:flex-row items-center gap-4">
                                            <div className="flex-1 relative w-full">
                                                <Input
                                                    placeholder="Type your response here..."
                                                    className="h-14 pl-6 pr-12 rounded-2xl bg-slate-50 border-transparent focus-visible:ring-accent/20 font-medium text-sm"
                                                />
                                                <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-accent text-white shadow-lg shadow-accent/20 hover:bg-slate-900 transition-all">
                                                    <Send size={18} />
                                                </Button>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-slate-100 text-slate-400 hover:text-accent hover:border-accent/20 transition-all">
                                                    <Paperclip size={20} />
                                                </Button>
                                                <Button size="lg" className="h-14 px-8 rounded-2xl bg-white border border-slate-100 text-slate-900 font-bold text-xs uppercase tracking-widest shadow-sm hover:bg-slate-900 hover:text-white transition-all">
                                                    Mark Resolved
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* History Action */}
                <div className="text-center pt-10">
                    <Button variant="outline" className="h-14 px-12 rounded-2xl border-slate-100 text-slate-500 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                        View Solution History <ChevronDown className="ml-2" size={18} />
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    )
}
