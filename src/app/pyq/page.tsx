"use client"

import React from 'react'
import { Section } from "@/components/layout/Section"
import { PYQS } from "@/lib/data/pyqs"
import { EXAM_CATEGORIES } from "@/lib/constants/exams"
import { FileDown, Search, History, Download, Eye, FileText, Sparkles, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'

export default function PYQPage() {
    const [selectedCategory, setSelectedCategory] = React.useState('All')
    const [searchQuery, setSearchQuery] = React.useState('')

    const filteredPYQs = PYQS.filter(pyq => {
        const matchesCategory = selectedCategory === 'All' || pyq.exam === selectedCategory;
        const matchesSearch = pyq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pyq.exam.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    })

    return (
        <div className="bg-white min-h-screen">
            {/* Header Section */}
            <Section className="bg-white pb-32 pt-32 md:pt-48 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1/2 h-full pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-500/5 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
                    <Badge className="bg-amber-100 text-amber-700 border-none font-black px-6 py-2 uppercase tracking-[0.2em] text-[10px]">
                        Elite Selection Archive
                    </Badge>
                    <h1 className="text-6xl md:text-8xl font-black font-outfit text-primary tracking-tighter leading-[0.95] uppercase">
                        Master the <br /><span className="text-amber-600 italic">History.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Don&apos;t practice blindly. Decode the patterns with <span className="text-slate-900 font-bold decoration-amber-500 underline underline-offset-8">Official Solved Papers</span> from 2018 - 2025.
                    </p>

                    <div className="relative max-w-3xl mx-auto group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-amber-500 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
                        <div className="relative">
                            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
                            <Input
                                placeholder="Find Shift-wise Solved Papers (e.g. SSC CGL 2024)..."
                                className="w-full h-20 pl-20 pr-8 rounded-[1.5rem] bg-white border-slate-100 text-slate-900 text-xl shadow-2xl transition-all focus-visible:ring-primary/20 placeholder:text-slate-400 font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Section>

            <Section className="-mt-16 pb-32">
                {/* Category Filter */}
                <div className="flex items-center gap-4 overflow-x-auto pb-8 no-scrollbar max-w-6xl mx-auto px-4 mb-12 border-b border-slate-100">
                    <div className="flex items-center gap-3 text-slate-400 mr-6 shrink-0 font-black text-[10px] uppercase tracking-widest leading-none">
                        <SlidersHorizontal size={16} className="text-amber-600" />
                        Archive
                    </div>
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className={`px-8 py-3 rounded-full whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all duration-500 border-2 shrink-0 ${selectedCategory === 'All'
                            ? "bg-amber-600 text-white border-amber-600 shadow-xl shadow-amber-200"
                            : "bg-white text-slate-400 border-slate-100 hover:border-amber-200 hover:text-amber-600"
                            }`}
                    >
                        All Papers
                    </button>
                    {EXAM_CATEGORIES.map((cat) => (
                        <div key={cat.label} className="flex gap-3 items-center">
                            <span className="w-px h-4 bg-slate-200 mx-2" />
                            {cat.exams.map((exam) => (
                                <button
                                    key={exam}
                                    onClick={() => setSelectedCategory(exam)}
                                    className={`px-8 py-3 rounded-full whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all duration-500 border-2 shrink-0 ${selectedCategory === exam
                                        ? "bg-amber-600 text-white border-amber-600 shadow-xl shadow-amber-200"
                                        : "bg-white text-slate-400 border-slate-100 hover:border-amber-200 hover:text-amber-600"
                                        }`}
                                >
                                    {exam}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="grid gap-8">
                    {filteredPYQs.map((pyq) => (
                        <Card key={pyq.id} className="group hover:shadow-[0_30px_60px_rgba(30,27,75,0.1)] transition-all duration-700 rounded-[3rem] border-slate-100 overflow-hidden bg-white">
                            <CardContent className="p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                                <div className="flex items-start md:items-center gap-8">
                                    <div className="w-20 h-20 rounded-[2rem] bg-amber-50 flex items-center justify-center text-amber-600 shadow-xl group-hover:scale-110 transition-transform shrink-0">
                                        <FileText size={40} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-4 mb-3">
                                            <Badge className="bg-amber-600 text-white border-none uppercase tracking-[0.2em] text-[9px] font-black px-4 py-1.5 rounded-full">
                                                {pyq.exam}
                                            </Badge>
                                            <span className="text-slate-400 text-xs font-black uppercase tracking-widest">{pyq.year} Revision</span>
                                        </div>
                                        <h3 className="text-3xl font-black text-primary font-outfit leading-tight group-hover:text-amber-600 transition-colors uppercase tracking-tight">
                                            {pyq.title}
                                        </h3>
                                        <div className="flex items-center gap-8 mt-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                            <span className="flex items-center gap-2"><Download size={16} className="text-amber-500" /> {pyq.downloads}</span>
                                            <span className="flex items-center gap-2">• {pyq.type}</span>
                                            <span className="flex items-center gap-2">• {pyq.size}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 shrink-0 w-full md:w-auto">
                                    <Button variant="outline" className="flex-1 md:flex-none h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] border-slate-200 hover:bg-slate-50 text-slate-600 transition-all">
                                        <Eye size={18} className="mr-2" /> Quick View
                                    </Button>
                                    <Button className="flex-1 md:flex-none h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-primary text-white shadow-2xl shadow-primary/20 hover:bg-indigo-900 transition-all">
                                        <Download size={18} className="mr-2" /> Download PDF
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-32 text-center">
                    <div className="max-w-2xl mx-auto p-12 rounded-[4rem] bg-slate-50 border border-slate-100 space-y-8">
                        <Sparkles className="text-amber-500 mx-auto" size={48} />
                        <h2 className="text-3xl md:text-5xl font-black text-primary font-outfit uppercase tracking-tighter leading-tight italic">Missing a shift paper?</h2>
                        <p className="text-slate-500 text-lg font-medium">New exam archives are uploaded within 48 hours of official answer key release.</p>
                        <Button className="bg-slate-900 h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-[10px] mt-4 hover:bg-black transition-all">Request Shift Paper</Button>
                    </div>
                </div>
            </Section>
        </div>
    )
}
