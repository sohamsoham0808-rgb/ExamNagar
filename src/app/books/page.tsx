"use client"

import React from 'react'
import { Section } from "@/components/layout/Section"
import { BookCard } from "@/components/ui/BookCard"
import { BOOKS, EBOOKS } from "@/lib/data/books"
import { EXAM_CATEGORIES } from "@/lib/constants/exams"
import { Search, BookOpen, ShoppingBag, Eye, Smartphone, BookMarked, Sparkles, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export default function BooksPage() {
    const [selectedCategory, setSelectedCategory] = React.useState('All')
    const [activeTab, setActiveTab] = React.useState('Physical') // Physical, Ebook
    const [searchQuery, setSearchQuery] = React.useState('')

    const filteredBooks = [...BOOKS, ...EBOOKS].filter(book => {
        const matchesType = activeTab === 'Physical' ? book.type === 'Physical' : book.type === 'Ebook';
        const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesCategory && matchesSearch;
    })

    return (
        <div className="bg-white min-h-screen">
            {/* Header Section */}
            <Section className="bg-white pb-40 pt-32 md:pt-48 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
                    <Badge className="bg-primary/10 text-primary border-none font-black px-6 py-2 uppercase tracking-[0.2em] text-[10px]">
                        Essential Study Library
                    </Badge>
                    <h1 className="text-6xl md:text-8xl font-black font-outfit text-primary tracking-tighter leading-[0.95] uppercase">
                        Fuel Your <br /><span className="text-accent italic">Learning.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Curated collection of <span className="text-slate-900 font-bold decoration-accent underline underline-offset-8">Standard Textbooks</span> and <span className="text-slate-900 font-bold">Smart E-books</span> designed for clarity and success.
                    </p>

                    <div className="relative max-w-3xl mx-auto group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
                        <div className="relative">
                            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
                            <Input
                                placeholder="Search by Exam, Author or Book Name..."
                                className="w-full h-20 pl-20 pr-8 rounded-[1.5rem] bg-white border-slate-100 text-slate-900 text-xl shadow-2xl transition-all focus-visible:ring-primary/20 placeholder:text-slate-400 font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Section>

            {/* Selection Tabs */}
            <Section className="-mt-16 pb-32">
                <div className="flex flex-col gap-12 mb-20">
                    <div className="flex flex-col md:flex-row justify-center gap-8 items-center">
                        <div className="bg-slate-50 p-3 rounded-[3rem] border border-slate-100 flex gap-3 shadow-xl shadow-slate-200/50 w-full md:w-auto">
                            <button
                                onClick={() => setActiveTab('Physical')}
                                className={`flex-1 md:flex-none px-12 py-5 rounded-[2.5rem] font-black text-xs uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-3 ${activeTab === 'Physical'
                                    ? 'bg-primary text-white shadow-2xl shadow-primary/30 scale-105'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                <ShoppingBag size={18} /> Physical Books
                            </button>
                            <button
                                onClick={() => setActiveTab('Ebook')}
                                className={`flex-1 md:flex-none px-12 py-5 rounded-[2.5rem] font-black text-xs uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-3 ${activeTab === 'Ebook'
                                    ? 'bg-slate-900 text-white shadow-2xl shadow-black/20 scale-105'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                <Smartphone size={18} /> Digital E-Books
                            </button>
                        </div>
                        <div className="hidden lg:flex items-center gap-3 text-slate-400 font-bold text-xs uppercase tracking-widest italic">
                            <Sparkles className="text-accent" size={16} /> Filtered Results: {filteredBooks.length}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar max-w-6xl mx-auto px-4">
                        <div className="flex items-center gap-3 text-slate-400 mr-6 shrink-0 font-black text-[10px] uppercase tracking-widest leading-none">
                            <SlidersHorizontal size={16} className="text-primary" />
                            Target
                        </div>
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`px-8 py-3 rounded-full whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all duration-500 border-2 shrink-0 ${selectedCategory === 'All'
                                ? "bg-primary text-white border-primary shadow-xl shadow-primary/20"
                                : "bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600"
                                }`}
                        >
                            All Exams
                        </button>
                        {EXAM_CATEGORIES.map((cat) => (
                            <div key={cat.label} className="flex gap-3 items-center">
                                <span className="w-px h-4 bg-slate-200 mx-2" />
                                {cat.exams.map((exam) => (
                                    <button
                                        key={exam}
                                        onClick={() => setSelectedCategory(exam)}
                                        className={`px-8 py-3 rounded-full whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all duration-500 border-2 shrink-0 ${selectedCategory === exam
                                            ? "bg-primary text-white border-primary shadow-xl shadow-primary/20"
                                            : "bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600"
                                            }`}
                                    >
                                        {exam}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {filteredBooks.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredBooks.map((book) => (
                            <div key={book.id} className="animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out">
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-slate-50 rounded-[5rem] border-2 border-dashed border-slate-200 divide-y divide-slate-100">
                        <div className="bg-white w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-primary shadow-2xl">
                            <BookOpen size={48} />
                        </div>
                        <h3 className="text-4xl font-black text-primary mb-4 font-outfit uppercase tracking-tighter pt-8">No Results</h3>
                        <p className="text-slate-400 font-medium italic">Try adjusting your search or explore other categories.</p>
                    </div>
                )}

                {/* Info Block */}
                <div className="mt-32 grid lg:grid-cols-2 gap-12">
                    <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-100 hover:border-accent/30 transition-colors group">
                        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-8 group-hover:scale-110 transition-transform">
                            <BookMarked size={32} className="text-accent" />
                        </div>
                        <h4 className="text-3xl font-black text-primary font-outfit uppercase tracking-tight mb-4">Deep Dives</h4>
                        <p className="text-slate-500 text-lg leading-relaxed font-medium mb-8">Access free demo chapters and curated summaries before starting your learning journey.</p>
                        <Button variant="link" className="text-accent p-0 font-black uppercase tracking-widest text-xs h-auto hover:translate-x-2 transition-transform">Explore Free Demos &rarr;</Button>
                    </div>
                    <div className="bg-primary p-12 rounded-[4rem] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 blur-[100px] translate-x-1/2" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center shadow-2xl mb-8 group-hover:scale-110 transition-transform backdrop-blur-xl">
                                <ShoppingBag size={32} className="text-accent" />
                            </div>
                            <h4 className="text-3xl font-black font-outfit uppercase tracking-tight mb-4 text-white">Fast Logistics</h4>
                            <p className="text-indigo-100 text-lg opacity-80 leading-relaxed font-medium mb-8">Reliable delivery to 20,000+ pincodes. We ensure your study material reaches you within 4-7 days.</p>
                            <Button variant="link" className="text-accent p-0 font-black uppercase tracking-widest text-xs h-auto hover:translate-x-2 transition-transform">Track Your Order &rarr;</Button>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}
