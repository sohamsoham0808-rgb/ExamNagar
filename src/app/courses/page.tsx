"use client"

import * as React from "react"
import { Section } from "@/components/layout/Section"
import { CourseCard } from "@/components/ui/CourseCard"
import { TOP_COURSES } from "@/lib/data/courses"
import { EXAM_CATEGORIES } from "@/lib/constants/exams"
import {
    Search,
    SlidersHorizontal,
    Gem,
    Play,
    Sparkles,
    ChevronRight,
    Trophy,
    Landmark,
    TrainFront,
    GraduationCap,
    ShieldCheck,
    LayoutGrid,
    ArrowRight,
    Zap,
    Users,
    Clock
} from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from "@/lib/utils"

export default function CoursesPage() {
    const [selectedParentCategory, setSelectedParentCategory] = React.useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = React.useState('All')
    const [selectedFilter, setSelectedFilter] = React.useState('All')
    const [searchQuery, setSearchQuery] = React.useState('')

    const filteredCourses = TOP_COURSES.filter(course => {
        const parentCategoryData = EXAM_CATEGORIES.find(c => c.label === selectedParentCategory);
        const matchesCategory = selectedCategory === 'All'
            ? (selectedParentCategory ? ((parentCategoryData?.exams as readonly string[]).includes(course.category) || course.category === selectedParentCategory) : true)
            : course.category === selectedCategory

        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase())

        const isFree = course.price === 0 || course.isFree
        const matchesFilter = selectedFilter === 'All' ||
            (selectedFilter === 'Free' ? isFree : !isFree)

        return matchesCategory && matchesSearch && matchesFilter
    })

    const activeParentData = EXAM_CATEGORIES.find(c => c.label === selectedParentCategory);

    return (
        <div className="bg-[#fbfcff] min-h-screen">
            {/* High-Impact Hero Section */}
            <header className="relative bg-slate-950 pt-32 pb-60 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] animate-pulse rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[150px] animate-pulse delay-700 rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-12">
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full mb-4">
                        <Sparkles size={16} className="text-accent" />
                        <span className="text-white font-black text-[10px] uppercase tracking-[0.3em]">India&apos;s Premium Learning Tier</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black font-outfit text-white tracking-tighter leading-[0.9] uppercase max-w-5xl mx-auto">
                        Your Journey to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic">Selection</span> Begins Here.
                    </h1>

                    <p className="text-slate-400 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
                        Curated masterclasses for <span className="text-white font-bold underline decoration-primary underline-offset-8">SSC, DSSSB & State Exams</span>. Taught by the top 1% faculty in India.
                    </p>

                    {/* Styled Search Bar */}
                    <div className="relative max-w-4xl mx-auto pt-8">
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-[2.5rem] blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
                        <div className="relative flex items-center bg-white rounded-[2rem] p-3 shadow-2xl">
                            <Search className="ml-6 text-slate-400" size={24} />
                            <Input
                                placeholder="Search Exam, Batch or Faculty..."
                                className="w-full h-16 border-none shadow-none text-xl focus-visible:ring-0 placeholder:text-slate-400 font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button className="hidden md:flex h-16 px-12 rounded-[1.5rem] bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest shadow-xl ml-4">Find Batches</Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Category Deck */}
            <Section className="-mt-32 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
                    <button
                        onClick={() => { setSelectedParentCategory(null); setSelectedCategory('All'); }}
                        className={cn(
                            "group p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col items-center gap-4",
                            selectedParentCategory === null
                                ? "bg-white border-primary shadow-2xl scale-105"
                                : "bg-white/60 backdrop-blur-md border-transparent hover:border-slate-200 text-slate-400"
                        )}
                    >
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all", selectedParentCategory === null ? "bg-primary text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200")}>
                            <LayoutGrid size={24} />
                        </div>
                        <span className="font-black text-[10px] uppercase tracking-[0.2em]">All Exams</span>
                    </button>

                    {EXAM_CATEGORIES.map((cat) => (
                        <button
                            key={cat.label}
                            onClick={() => { setSelectedParentCategory(cat.label); setSelectedCategory('All'); }}
                            className={cn(
                                "group p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col items-center gap-4",
                                selectedParentCategory === cat.label
                                    ? "bg-white border-primary shadow-2xl scale-105"
                                    : "bg-white/60 backdrop-blur-md border-transparent hover:border-slate-200 text-slate-400"
                            )}
                        >
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all", selectedParentCategory === cat.label ? "bg-primary text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200")}>
                                <Trophy size={24} />
                            </div>
                            <span className="font-black text-[10px] uppercase tracking-[0.2em]">{cat.label}</span>
                        </button>
                    ))}
                </div>
            </Section>

            {/* Content Section */}
            <Section className="pb-40">
                <div className="flex flex-col gap-12">
                    {/* Filters Strip */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <div className="flex bg-slate-50 p-1.5 rounded-2xl w-full md:w-fit">
                            {['All', 'Paid', 'Free'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setSelectedFilter(filter)}
                                    className={cn(
                                        "px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-500",
                                        selectedFilter === filter
                                            ? 'bg-white text-primary shadow-sm'
                                            : 'text-slate-400 hover:text-slate-600'
                                    )}
                                >
                                    {filter} Mocks
                                </button>
                            ))}
                        </div>

                        {selectedParentCategory && (
                            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar max-w-2xl px-2">
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className={cn(
                                        "px-6 py-3 rounded-xl whitespace-nowrap text-[9px] font-black uppercase tracking-widest transition-all border-2",
                                        selectedCategory === 'All' ? "bg-primary/10 text-primary border-primary/20" : "bg-white text-slate-400 border-slate-100"
                                    )}
                                >
                                    Explore All
                                </button>
                                {activeParentData?.exams.map((exam) => (
                                    <button
                                        key={exam}
                                        onClick={() => setSelectedCategory(exam)}
                                        className={cn(
                                            "px-6 py-3 rounded-xl whitespace-nowrap text-[9px] font-black uppercase tracking-widest transition-all border-2",
                                            selectedCategory === exam ? "bg-primary text-white border-primary" : "bg-white text-slate-400 border-slate-100 hover:border-slate-200"
                                        )}
                                    >
                                        {exam}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Dynamic Course Grid */}
                    {filteredCourses.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
                            {filteredCourses.map((course) => (
                                <div key={course.id} className="animate-in fade-in slide-in-from-bottom-5 duration-700">
                                    <CourseCard course={course} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-40 bg-white rounded-[4rem] border border-slate-100 mt-20 shadow-sm">
                            <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-slate-300">
                                <Search size={40} />
                            </div>
                            <h3 className="text-3xl font-black text-primary font-outfit uppercase tracking-tighter">No Batches Found</h3>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-2">Try resetting filters to explore more programs</p>
                            <Button
                                variant="outline"
                                className="mt-8 rounded-xl border-slate-200 font-black uppercase text-[10px] tracking-widest"
                                onClick={() => { setSelectedFilter('All'); setSelectedParentCategory(null); setSelectedCategory('All'); setSearchQuery(''); }}
                            >
                                Reset All Filters
                            </Button>
                        </div>
                    )}
                </div>

                {/* Personalized Batch Request Section */}
                <div className="mt-40 relative rounded-[4rem] bg-slate-950 p-16 md:p-24 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full group-hover:bg-primary/30 transition-all duration-700" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-6 text-center md:text-left">
                            <h2 className="text-4xl md:text-6xl font-black font-outfit text-white uppercase tracking-tighter leading-[0.95]">
                                Can&apos;t find your <br />
                                <span className="text-accent italic">Target Exam?</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-medium italic max-w-lg">New specialized batches are launched every week based on student demand. Tell us what you need.</p>
                        </div>
                        <Button className="h-20 px-16 rounded-[2rem] bg-primary text-white font-black uppercase text-[12px] tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                            Submit Request <ArrowRight size={20} className="ml-2" />
                        </Button>
                    </div>
                </div>
            </Section>
        </div>
    )
}
