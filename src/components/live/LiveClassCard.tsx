"use client"

import * as React from "react"
import { PlayCircle, Users, Calendar, Radio, Clock, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"

interface LiveClassCardProps {
    session: {
        id: string
        title: string
        instructor: string
        instructorImage: string
        subject: string
        startTime: string
        attendees: string
        viewerCount: string
        thumbnail: string
        isLive: boolean
        isEnded?: boolean
        tags: string[]
        description: string
    }
}

export function LiveClassCard({ session }: LiveClassCardProps) {
    const isUpcoming = !session.isLive && !session.isEnded
    const isRecorded = session.isEnded

    return (
        <Card className="group overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-500 bg-white">
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={session.thumbnail}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt={session.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {session.isLive && (
                        <Badge className="bg-red-600 text-white border-none flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider animate-pulse shadow-lg">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                            LIVE
                        </Badge>
                    )}
                    {isUpcoming && (
                        <Badge className="bg-blue-600 text-white border-none flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                            <Calendar size={10} /> UPCOMING
                        </Badge>
                    )}
                    {isRecorded && (
                        <Badge className="bg-slate-700 text-white border-none flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                            <PlayCircle size={10} /> RECORDED
                        </Badge>
                    )}
                    {session.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-white/90 text-slate-900 border-none text-[10px] font-semibold">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <div className="absolute top-3 right-3">
                    <button className="bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full backdrop-blur-md transition-colors">
                        <Share2 size={14} />
                    </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    {session.isLive ? (
                        <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
                            <Users size={14} className="text-red-400" />
                            <span className="text-xs font-bold">{session.viewerCount} viewing</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
                            <Clock size={14} className="text-blue-400" />
                            <span className="text-xs font-bold">
                                {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <CardContent className="p-4 space-y-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">{session.subject}</span>
                    </div>
                    <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors line-clamp-2 h-10">
                        {session.title}
                    </h3>
                </div>

                <div className="flex items-center gap-3 py-1 border-y border-slate-50">
                    <img
                        src={session.instructorImage}
                        className="w-8 h-8 rounded-full border-2 border-primary/10 object-cover"
                        alt={session.instructor}
                    />
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800">{session.instructor}</span>
                        <span className="text-[10px] text-slate-500">Expert Faculty</span>
                    </div>
                </div>

                <div className="pt-1">
                    {session.isLive ? (
                        <Button
                            className="w-full gap-2 bg-red-600 hover:bg-red-700 h-9 text-xs font-bold shadow-md"
                            onClick={() => window.location.href = `/live-classes/${session.id}?videoId=${(session as any).videoId || 'jfKfPfyJRdk'}`}
                        >
                            <PlayCircle size={16} /> WATCH LIVE NOW
                        </Button>
                    ) : isUpcoming ? (
                        <Button variant="outline" className="w-full gap-2 border-blue-600 text-blue-600 hover:bg-blue-50 h-9 text-xs font-bold">
                            <Clock size={16} /> SET REMINDER
                        </Button>
                    ) : (
                        <Button variant="secondary" className="w-full gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 h-9 text-xs font-bold">
                            <PlayCircle size={16} /> WATCH RECORDING
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
