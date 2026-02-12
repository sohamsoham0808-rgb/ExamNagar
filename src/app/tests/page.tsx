"use client"

import React, { useState } from 'react'
import { Section } from "@/components/layout/Section"
import { EXAM_CATEGORIES, ExamCategory } from "@/lib/constants/exams"
import {
    Trophy,
    Timer,
    BarChart3,
    Star,
    Search,
    SlidersHorizontal,
    Gem,
    Play,
    CheckCircle2,
    ShieldAlert,
    ArrowLeft,
    Clock,
    Zap,
    ChevronRight,
    Lock,
    BarChart as ChartIcon,
    FileText,
    HelpCircle,
    Layout,
    Globe
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

// --- Mock Data Extension ---
const TEST_PASSES = [
    { id: '1y', name: '1 Year TestPass', price: 499, duration: '12 Months', features: ['70,000+ Mock Tests', 'All Exams Covered', 'TCS Pattern Console', 'AI Performance Analysis'], tag: 'Popular' },
    { id: '3y', name: '3 Year TestPass', price: 999, duration: '36 Months', features: ['Elite Mentorship Access', 'Priority Doubt Support', 'Extended Validity', 'Everything in 1Y Pass'], tag: 'Best Value' },
    { id: 'combo', name: 'Elite Combo Pass', price: 1499, duration: '48 Months', features: ['Video Course Access', 'Hardcopy Study Material', 'Lifetime Updates', 'All-in-One Testing Strategy'], tag: 'Ultimate' },
]

export default function TestsPage() {
    // Navigation State
    const [view, setView] = useState<'pass-selection' | 'categories' | 'exams' | 'test-dashboard'>('pass-selection')
    const [selectedCategory, setSelectedCategory] = useState<ExamCategory | null>(null)
    const [selectedExam, setSelectedExam] = useState<string | null>(null)
    const [selectedTestType, setSelectedTestType] = useState<'full' | 'sectional' | 'topic' | 'pyq'>('full')
    const [isFreeMode, setIsFreeMode] = useState(false)

    // Selection Handlers
    const handleCategorySelect = (cat: ExamCategory) => {
        setSelectedCategory(cat)
        setView('exams')
    }

    const handleExamSelect = (exam: string) => {
        setSelectedExam(exam)
        setView('test-dashboard')
    }

    const resetNavigation = () => {
        setView('pass-selection')
        setSelectedCategory(null)
        setSelectedExam(null)
        setIsFreeMode(false)
    }

    // --- Sub-Components ---

    // 1. Pass Selection Hero
    const PassSelection = () => (
        <div className="space-y-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="text-center space-y-6">
                <Badge className="bg-primary/10 text-primary border-none font-black px-6 py-2 uppercase tracking-[0.2em] text-[10px]">
                    The Ultimate Assessment Gateway
                </Badge>
                <h1 className="text-6xl md:text-8xl font-black font-outfit text-primary tracking-tighter leading-[0.95] uppercase">
                    Unlock Your <br /><span className="text-accent italic">TestPass.</span>
                </h1>
                <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                    One single pass to access <span className="text-slate-900 font-bold">70,000+ Mock Tests</span> for 700+ Government & Engineering Exams.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Button onClick={() => setView('categories')} className="h-16 px-12 rounded-2xl bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest shadow-2xl">Browse All Exam Packs</Button>
                    <Button onClick={() => { setIsFreeMode(true); setView('categories'); }} variant="outline" className="h-16 px-12 rounded-2xl border-2 border-slate-200 font-black uppercase text-[10px] tracking-widest">Try Free Arena</Button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {TEST_PASSES.map((pass) => (
                    <Card key={pass.id} className={cn(
                        "relative p-10 rounded-[3rem] border-2 shadow-2xl transition-all duration-500 overflow-hidden group hover:-translate-y-4",
                        pass.id === '3y' ? "bg-slate-900 text-white border-primary border-4" : "bg-white border-slate-100"
                    )}>
                        {pass.tag && (
                            <Badge className="absolute top-8 right-8 bg-accent text-white border-none font-black text-[9px] px-4 py-1.5 uppercase tracking-widest">
                                {pass.tag}
                            </Badge>
                        )}
                        <div className="space-y-6 relative z-10">
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-2">{pass.duration} Validity</h3>
                                <p className="text-2xl font-black uppercase tracking-tighter">{pass.name}</p>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black font-outfit">₹{pass.price}</span>
                                <span className="text-sm opacity-50 font-bold">/ Total</span>
                            </div>
                            <ul className="space-y-4 pt-6 border-t border-white/10">
                                {pass.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-tight">
                                        <CheckCircle2 size={16} className="text-primary" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button className={cn(
                                "w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl",
                                pass.id === '3y' ? "bg-primary text-white" : "bg-slate-900 text-white"
                            )}>
                                Activate Now <Zap size={14} className="ml-2 fill-current" />
                            </Button>
                        </div>
                        {pass.id === '3y' && (
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
                        )}
                    </Card>
                ))}
            </div>
        </div>
    )

    // 2. Category Selection
    const CategorySelection = () => (
        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black font-outfit text-primary uppercase tracking-tighter">
                        Select <span className="text-accent italic">{isFreeMode ? "Free" : "Premium"}</span> Category
                    </h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Choose an exam group to explore test series</p>
                </div>
                <Button variant="ghost" onClick={resetNavigation} className="text-primary font-black uppercase text-[10px] tracking-widest">
                    <ArrowLeft size={16} className="mr-2" /> Back to Passes
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {EXAM_CATEGORIES.map((cat) => (
                    <button
                        key={cat.label}
                        onClick={() => handleCategorySelect(cat)}
                        className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col items-center gap-6 group"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-12 group-hover:scale-110">
                            <Trophy size={32} />
                        </div>
                        <h4 className="font-black text-xs uppercase tracking-widest text-slate-800 text-center">{cat.label}</h4>
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[9px] font-black uppercase text-primary tracking-widest">Explore</span>
                            <ChevronRight size={12} className="text-primary" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )

    // 3. Exam Selection
    const ExamSelection = () => (
        <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-500">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black font-outfit text-primary uppercase tracking-tighter">
                        {selectedCategory?.label} <span className="text-accent italic">Battlefield</span>
                    </h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Choose your target exam to begin simulation</p>
                </div>
                <Button variant="ghost" onClick={() => setView('categories')} className="text-primary font-black uppercase text-[10px] tracking-widest">
                    <ArrowLeft size={16} className="mr-2" /> All Categories
                </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCategory?.exams.map((exam) => (
                    <button
                        key={exam}
                        onClick={() => handleExamSelect(exam)}
                        className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all flex items-center justify-between group px-8"
                    >
                        <div className="flex items-center gap-4 text-left">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-black text-[10px]">
                                {exam.split(' ').map(w => w[0]).join('')}
                            </div>
                            <span className="font-bold text-sm text-slate-700 group-hover:text-primary transition-colors">{exam}</span>
                        </div>
                        <ChevronRight size={18} className="text-slate-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </button>
                ))}
            </div>
        </div>
    )

    // 4. Test Dashboard
    const TestDashboardView = () => (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* Header & Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-slate-100">
                <div className="flex items-center gap-8">
                    <div className="w-24 h-24 rounded-[2rem] bg-slate-900 flex items-center justify-center text-white shadow-2xl">
                        <Globe size={40} className="text-primary" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <Badge className="bg-primary/10 text-primary border-none font-bold text-[9px] px-3 uppercase tracking-widest">Official Tier-1</Badge>
                            <span className="text-slate-400 text-[10px] uppercase font-black tracking-tighter">Updated 2h ago</span>
                        </div>
                        <h2 className="text-4xl font-black font-outfit text-primary uppercase tracking-tighter">{selectedExam} <span className="text-accent italic">Ultimate Series</span></h2>
                        <div className="flex gap-6 mt-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span className="flex items-center gap-2"><Trophy size={14} className="text-amber-500" /> 150+ Full Tests</span>
                            <span className="flex items-center gap-2"><Layers size={14} className="text-blue-500" /> 500+ Sectionals</span>
                            <span className="flex items-center gap-2"><ChartIcon size={14} className="text-emerald-500" /> AI Insights Enabled</span>
                        </div>
                    </div>
                </div>
                <Button variant="ghost" onClick={() => setView('exams')} className="text-primary font-black uppercase text-[10px] tracking-widest shrink-0 self-start md:self-center">
                    <ArrowLeft size={16} className="mr-2" /> Change Exam
                </Button>
            </div>

            {/* Test Type Tabs */}
            <div className="flex flex-wrap gap-4">
                {[
                    { id: 'full', label: 'Full Length Mocks', icon: <Layout size={16} /> },
                    { id: 'sectional', label: 'Sectional Tests', icon: <SlidersHorizontal size={16} /> },
                    { id: 'topic', label: 'Topic-wise Tests', icon: <FileText size={16} /> },
                    { id: 'pyq', label: 'Previous Year Papers', icon: <HelpCircle size={16} /> }
                ].map((type) => (
                    <button
                        key={type.id}
                        onClick={() => setSelectedTestType(type.id as any)}
                        className={cn(
                            "flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all",
                            selectedTestType === type.id
                                ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                                : "bg-white border border-slate-100 text-slate-400 hover:border-primary/20 hover:text-primary"
                        )}
                    >
                        {type.icon} {type.label}
                    </button>
                ))}
            </div>

            {/* Test Cards List */}
            <div className="grid md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="group hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] border-slate-100 overflow-hidden bg-white hover:border-primary/20">
                        <CardContent className="p-10 flex gap-8 items-center">
                            <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 flex flex-col items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                                <span className="text-[10px] font-black uppercase mb-1">MOCK</span>
                                <span className="text-2xl font-black">0{i}</span>
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-black text-primary font-outfit uppercase tracking-tighter">{selectedExam} - Mock {i}</h3>
                                    <Badge variant="success" className="bg-emerald-100 text-emerald-600 border-none font-bold text-[8px] h-5 px-3 uppercase tracking-widest">LIVE</Badge>
                                </div>
                                <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest text-slate-500">
                                    <span className="flex items-center gap-1.5"><Timer size={14} className="text-slate-300" /> 120 Mins</span>
                                    <span className="flex items-center gap-1.5"><FileText size={14} className="text-slate-300" /> 100 Ques</span>
                                    <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-slate-300" /> 200 Marks</span>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(j => (
                                            <img key={j} src={`https://i.pravatar.cc/50?u=${j + i * 10}`} className="w-6 h-6 rounded-full border-2 border-white" alt="Peer" />
                                        ))}
                                        <span className="text-[9px] font-black text-slate-400 pl-4 self-center uppercase tracking-tighter">12.4k Enrolled</span>
                                    </div>
                                    <Button className="h-10 px-6 rounded-xl bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all">
                                        Start Mock <Zap size={14} className="ml-2 fill-primary text-primary" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )

    return (
        <div className="bg-[#f8f9fc] min-h-screen pb-40">
            {/* Header / Nav context */}
            <Section className="bg-white pb-20 pt-32 md:pt-40 relative overflow-hidden border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                    {view === 'pass-selection' && <PassSelection />}
                    {view === 'categories' && <CategorySelection />}
                    {view === 'exams' && <ExamSelection />}
                    {view === 'test-dashboard' && <TestDashboardView />}
                </div>
            </Section>

            {/* Bottom Trust Section */}
            {view === 'pass-selection' && (
                <Section className="mt-20">
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: <ShieldAlert size={32} className="text-emerald-500" />, title: "Official Interface", desc: "TCS iON Console simulation for real exam feel." },
                            { icon: <ChartIcon size={32} className="text-blue-500" />, title: "AI Analytics", desc: "Depth analysis of speed, accuracy & weak spots." },
                            { icon: <Globe size={32} className="text-primary" />, title: "All India Rank", desc: "Compare scores with 5 Million+ active aspirants." },
                            { icon: <Zap size={32} className="text-amber-500" />, title: "Live Solutions", desc: "Expert video solutions for every single question." }
                        ].map((feature, i) => (
                            <Card key={i} className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm hover:shadow-xl transition-all group">
                                <div className="p-4 rounded-2xl bg-slate-50 w-fit mb-6 transition-colors group-hover:bg-primary/5">
                                    {feature.icon}
                                </div>
                                <h4 className="font-black text-lg text-primary uppercase tracking-tighter font-outfit mb-2">{feature.title}</h4>
                                <p className="text-sm text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
                            </Card>
                        ))}
                    </div>
                </Section>
            )}
        </div>
    )
}

function Layers({ size, className }: { size: number, className?: string }) {
    return <SlidersHorizontal size={size} className={className} />
}
