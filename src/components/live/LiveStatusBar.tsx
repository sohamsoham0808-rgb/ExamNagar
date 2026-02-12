"use client"

import * as React from "react"
import { Radio, Users, ChevronRight } from "lucide-react"

export function LiveStatusBar() {
    return (
        <div className="bg-slate-900 text-white overflow-hidden py-2 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-hidden">
                <div className="flex items-center gap-3 shrink-0 mr-8">
                    <div className="flex items-center gap-1.5 bg-red-600/20 px-2 py-0.5 rounded border border-red-600/30">
                        <Radio size={12} className="text-red-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-red-500">LIVE NOW</span>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
                        {[1, 2, 3].map((i) => (
                            <React.Fragment key={i}>
                                <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
                                    <span className="w-1 h-1 bg-red-500 rounded-full" />
                                    SSC CGL 2026: Maths Marathon starts in 15 mins!
                                    <span className="w-1 h-1 bg-blue-500 rounded-full" />
                                    UPSC CSAT 2026: Foundation Batch enrolling now.
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                                    Join 50k+ students learning live right now.
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-4 shrink-0 ml-8 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400">
                        <Users size={12} />
                        <span>12,450 Learning</span>
                    </div>
                    <button className="flex items-center gap-1 font-bold text-primary hover:text-primary/80 transition-colors">
                        Explore All <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </div>
    )
}
