"use client"

import * as React from "react"
import { PlayCircle, Radio, Clock, Video, ListFilter, Sparkles, Heart, Users as UsersIcon } from "lucide-react"
import { Section } from "@/components/layout/Section"
import { Button } from "@/components/ui/Button"
import { LIVE_SESSIONS } from "@/lib/data/live-tests"
import { LiveClassCard } from "@/components/live/LiveClassCard"
import { LiveStatusBar } from "@/components/live/LiveStatusBar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Badge } from "@/components/ui/Badge"

export default function LiveClassesPage() {
    const liveItems = LIVE_SESSIONS.filter(s => s.isLive)
    const upcomingItems = LIVE_SESSIONS.filter(s => !s.isLive && !s.isEnded)
    const recordedItems = LIVE_SESSIONS.filter(s => s.isEnded)

    return (
        <div className="bg-white min-h-screen">
            <LiveStatusBar />

            {/* Hero Section — Fresher Friendly */}
            <Section className="bg-gradient-to-br from-primary to-violet-800 text-white py-14 md:py-24 overflow-hidden relative rounded-b-[3rem] mx-2">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-accent/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="max-w-6xl mx-auto relative z-10 px-4 text-center md:text-left">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md mx-auto md:mx-0">
                                <Sparkles size={12} className="text-amber-300" />
                                Learn Together, Succeed Together
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold font-outfit leading-tight">
                                Live classes that <br />
                                <span className="text-amber-300 italic">feel like home.</span>
                            </h1>
                            <p className="text-violet-100 text-sm md:text-base max-w-lg leading-relaxed mx-auto md:mx-0">
                                Join our friendly live sessions where top teachers simplify every topic, solve your doubts instantly, and prepare you for your dream career.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
                                <Button size="lg" className="bg-white text-primary hover:bg-slate-50 font-bold px-8 h-12 rounded-xl shadow-xl shadow-black/10">
                                    View Live Schedule
                                </Button>
                                <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 text-white font-bold px-8 h-12 rounded-xl backdrop-blur-sm">
                                    Watch Intro Video
                                </Button>
                            </div>
                        </div>

                        <div className="hidden md:block relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-primary rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-700"></div>
                            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
                                    alt="Live Learning Preview"
                                    className="w-full aspect-[4/3] object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer group/play">
                                        <PlayCircle className="text-primary group-hover:text-violet-600 transition-colors" size={32} fill="currentColor" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-between text-white">
                                    <div>
                                        <p className="text-xs font-bold">Happening Now</p>
                                        <p className="text-[10px] text-violet-100">Maths for SSC/Railway Exams</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[10px]">
                                        <Radio size={12} className="animate-pulse" /> LIVE NOW
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            <Section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <Tabs defaultValue="all" className="space-y-12">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-4 border-b border-slate-50">
                            <TabsList className="bg-slate-50 p-1.5 rounded-2xl w-auto border border-slate-100">
                                <TabsTrigger value="all" className="rounded-xl px-6 py-2.5 text-xs font-bold">All Classes</TabsTrigger>
                                <TabsTrigger value="live" className="rounded-xl px-6 py-2.5 flex items-center gap-2 text-xs font-bold">
                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Live Now
                                </TabsTrigger>
                                <TabsTrigger value="upcoming" className="rounded-xl px-6 py-2.5 text-xs font-bold">Upcoming</TabsTrigger>
                                <TabsTrigger value="recorded" className="rounded-xl px-6 py-2.5 text-xs font-bold">Watch Recorded</TabsTrigger>
                            </TabsList>

                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="sm" className="gap-2 rounded-xl border-slate-200 h-10 px-4 text-xs font-bold">
                                    <ListFilter size={14} /> Filter Exams
                                </Button>
                                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                                    Total <span className="text-slate-900">{LIVE_SESSIONS.length}</span> sessions
                                </div>
                            </div>
                        </div>

                        <TabsContent value="all" className="mt-0">
                            <div className="space-y-16">
                                {liveItems.length > 0 && (
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                                                <Radio size={20} className="text-red-500" />
                                            </div>
                                            <h2 className="text-xl md:text-2xl font-bold font-outfit text-slate-900 tracking-tight">Streaming <span className="text-red-500">Live</span></h2>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                            {liveItems.map((session) => (
                                                <LiveClassCard key={session.id} session={session} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {upcomingItems.length > 0 && (
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                                                <Clock size={20} className="text-primary" />
                                            </div>
                                            <h2 className="text-xl md:text-2xl font-bold font-outfit text-slate-900 tracking-tight">Scheduled Classes</h2>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                            {upcomingItems.map((session) => (
                                                <LiveClassCard key={session.id} session={session} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {recordedItems.length > 0 && (
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                                                <Video size={20} className="text-slate-400" />
                                            </div>
                                            <h2 className="text-xl md:text-2xl font-bold font-outfit text-slate-900 tracking-tight">Watch Recordings</h2>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                            {recordedItems.map((session) => (
                                                <LiveClassCard key={session.id} session={session} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="live" className="mt-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {liveItems.map((session) => (
                                    <LiveClassCard key={session.id} session={session} />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="upcoming" className="mt-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {upcomingItems.map((session) => (
                                    <LiveClassCard key={session.id} session={session} />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="recorded" className="mt-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {recordedItems.map((session) => (
                                    <LiveClassCard key={session.id} session={session} />
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </Section>

            {/* Why Live Section — Friendly */}
            <Section className="bg-slate-50 py-20 border-t border-slate-100">
                <div className="max-w-5xl mx-auto px-4 text-center space-y-12">
                    <div className="space-y-3">
                        <Badge className="bg-primary/5 text-primary border-none px-4 py-1 text-[10px] font-bold tracking-widest uppercase">The Live Advantage</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-outfit text-slate-900">Why thousands choose live learning</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Ask Doudts Instantly", desc: "No need to wait. Type your question and our teachers will help you right away.", icon: <Heart className="text-rose-400" /> },
                            { title: "Fun & Interactive", desc: "Participate in live polls and see where you stand on the leaderboard.", icon: <Sparkles className="text-amber-400" /> },
                            { title: "Always with You", desc: "Missed a class? Every live session is saved forever for you to watch later.", icon: <Video className="text-blue-400" /> }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/5 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8">
                        <div className="inline-flex items-center gap-3 p-4 px-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                            <UsersIcon className="text-primary" size={20} />
                            <p className="text-sm font-bold text-slate-600">Join 12,000+ students currently learning live</p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}
