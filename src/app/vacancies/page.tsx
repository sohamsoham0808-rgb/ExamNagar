"use client"

import React from 'react'
import { Section } from "@/components/layout/Section"
import { VACANCIES } from "@/lib/data/vacancies"
import { Bell, Search, ExternalLink, Calendar, MapPin, Briefcase, Info, ShieldCheck, Users } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import Link from 'next/link'

export default function VacanciesPage() {
    const [searchQuery, setSearchQuery] = React.useState('')

    const filteredVacancies = VACANCIES.filter(v =>
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.exam.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="bg-white min-h-screen">
            {/* Header Section */}
            <Section className="bg-white pb-32 pt-32 md:pt-48 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1/2 h-full pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-500/5 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
                    <Badge className="bg-red-100 text-red-700 border-none font-black px-6 py-2 uppercase tracking-[0.2em] text-[10px] animate-pulse">
                        Lateat Opportunity Pulse
                    </Badge>
                    <h1 className="text-6xl md:text-8xl font-black font-outfit text-primary tracking-tighter leading-[0.95] uppercase">
                        Career <br /><span className="text-red-500 italic">Alerts.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Never miss a recruitment opportunity. Verified vacancy updates, <span className="text-slate-900 font-bold decoration-red-500 underline underline-offset-8">Official Links</span>, and student guidance.
                    </p>

                    <div className="relative max-w-3xl mx-auto group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-red-500 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
                        <div className="relative">
                            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
                            <Input
                                placeholder="Find latest official notifications..."
                                className="w-full h-20 pl-20 pr-8 rounded-[1.5rem] bg-white border-slate-100 text-slate-900 text-xl shadow-2xl transition-all focus-visible:ring-primary/20 placeholder:text-slate-400 font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Section>

            <Section className="-mt-16 pb-32">
                <div className="grid gap-8">
                    {filteredVacancies.map((v) => (
                        <Card key={v.id} className="group hover:shadow-[0_40px_80px_rgba(239,68,68,0.1)] transition-all duration-700 rounded-[3rem] border-slate-100 overflow-hidden bg-white">
                            <CardContent className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                                <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
                                    <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-700 shrink-0 ${v.status === 'Apply Now' ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-red-500 shadow-red-500/20'}`}>
                                        <Briefcase size={48} />
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-4 mb-4">
                                            <Badge className={`${v.status === 'Apply Now' ? 'bg-emerald-500' : 'bg-red-600'} text-white border-none px-5 py-2 rounded-full uppercase text-[10px] font-black tracking-widest`}>
                                                {v.status}
                                            </Badge>
                                            <span className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                                <ShieldCheck size={16} className="text-primary" /> {v.exam} Verified
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-black text-primary font-outfit leading-tight mb-6 group-hover:text-red-500 transition-colors uppercase tracking-tight">
                                            {v.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-8 text-[11px] font-black uppercase tracking-[0.2em] bg-slate-50 p-4 px-8 rounded-2xl w-fit">
                                            <span className="flex items-center gap-2 text-red-500"><Calendar size={16} /> Ends: {v.lastDate}</span>
                                            <span className="flex items-center gap-2 text-slate-500"><MapPin size={16} /> All India</span>
                                            <span className="flex items-center gap-2 text-slate-500"><Users size={16} /> {v.posts} Posts</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex sm:flex-row flex-col gap-4 w-full md:w-auto">
                                    <Button variant="outline" className="flex-1 md:flex-none h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] border-slate-200 hover:bg-slate-50 transition-all">
                                        <Info size={18} className="mr-2" /> Deep Analysis
                                    </Button>
                                    <Link href={v.officialLink} target="_blank" className="flex-1 md:flex-none">
                                        <Button className="w-full h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-slate-900 text-white hover:bg-black shadow-2xl transition-all">
                                            Apply Official <ExternalLink size={18} className="ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-40 text-center space-y-8 p-16 rounded-[5rem] bg-red-50/50 border border-red-100">
                    <div className="w-20 h-20 bg-red-500 rounded-[2rem] flex items-center justify-center text-white mx-auto shadow-2xl mb-8">
                        <Bell size={40} className="animate-bounce" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-primary font-outfit uppercase tracking-tighter">Your Career Support</h2>
                    <p className="text-slate-500 text-lg font-medium italic max-w-2xl mx-auto leading-relaxed">Join our Opportunity Telegram channel for instant alerts before the news hits the papers.</p>
                    <Button className="bg-red-600 h-16 px-12 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-red-500/20 hover:bg-red-700 transition-all">Join Pulse Channel</Button>
                </div>
            </Section>
        </div>
    )
}
