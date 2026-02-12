"use client"

import * as React from "react"
import {
    Users,
    Activity,
    ShieldCheck,
    TrendingUp,
    Server,
    Globe,
    Lock,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Download,
    Filter,
    Layers,
    Clock,
    Zap,
    Trophy,
    MonitorPlay,
    Bell,
    Settings,
    ChevronRight,
    MoreHorizontal
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { cn } from "@/lib/utils"

export default function AdminOverviewPage() {
    return (
        <DashboardLayout
            role="admin"
            user={{
                name: "Arch Admin",
                role: "Platform Architect",
                avatar: "https://i.pravatar.cc/150?u=arch_admin"
            }}
        >
            <div className="space-y-12">
                {/* HUD Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-white/5">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse border-4 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Neural System Active</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black font-outfit text-white uppercase tracking-tighter leading-none">
                            Command <span className="text-primary italic">HUB</span>
                        </h1>
                        <p className="text-slate-500 text-sm font-medium italic">Global governance dashboard • Live telemetry from 4,200+ nodes</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden xl:flex items-center gap-8 px-8 py-3 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-md">
                            <div className="text-center">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Server Latency</p>
                                <p className="text-sm font-black text-emerald-400">12ms</p>
                            </div>
                            <div className="w-px h-6 bg-white/10" />
                            <div className="text-center">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Error Rate</p>
                                <p className="text-sm font-black text-white">0.02%</p>
                            </div>
                        </div>
                        <Button className="h-16 px-10 rounded-[1.5rem] bg-primary text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-[0_15px_40px_-10px_rgba(var(--primary),0.5)] hover:scale-105 transition-all">
                            Dispatch Audit <Zap size={16} className="ml-2 fill-white" />
                        </Button>
                    </div>
                </div>

                {/* Performance HUD Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Active Revenue", value: "₹4.8M", icon: TrendingUp, trend: "+24.2%", detail: "↑ Past 30 Days", color: "text-primary" },
                        { label: "User Acquisition", value: "12,420", icon: Users, trend: "+8.1%", detail: "↑ Organic Growth", color: "text-emerald-400" },
                        { label: "CDN Throughput", value: "8.4 TB", icon: Activity, trend: "OPTIMAL", detail: "Global Node Edge", color: "text-blue-400" },
                        { label: "Platform Health", value: "99.98%", icon: ShieldCheck, trend: "SECURE", detail: "SOC-2 Compliant", color: "text-accent" }
                    ].map((stat, i) => (
                        <Card key={i} className="bg-slate-900/50 backdrop-blur-xl border-white/5 p-8 rounded-[2.5rem] hover:bg-slate-900 hover:border-white/10 transition-all group cursor-pointer overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full translate-x-12 -translate-y-12" />
                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/5 transition-transform group-hover:scale-110", stat.color)}>
                                        <stat.icon size={28} />
                                    </div>
                                    <Badge className="bg-white/5 text-[9px] font-black tracking-widest uppercase border-white/5 text-slate-400 px-3 py-1.5">{stat.trend}</Badge>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-black text-white font-outfit tracking-tighter mb-1">{stat.value}</h4>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{stat.label}</p>
                                        <span className="text-[9px] font-bold text-slate-600">{stat.detail}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Primary Intelligence Section */}
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Growth Analytics (Vector-styled Chart) */}
                    <Card className="lg:col-span-2 border-white/5 shadow-2xl rounded-[3rem] bg-slate-900/40 backdrop-blur-xl overflow-hidden self-start">
                        <CardContent className="p-10 space-y-12">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black font-outfit text-white uppercase tracking-tighter">Strategic Traffic <span className="text-primary italic">Audit</span></h3>
                                    <p className="text-xs text-slate-500 font-medium italic">Aggregated session density vs engagement metrics</p>
                                </div>
                                <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
                                    {['QUARTZ', 'ION', 'NEO', 'ORBIT'].map((v, i) => (
                                        <button key={v} className={cn(
                                            "px-6 py-2.5 text-[9px] font-black rounded-xl transition-all tracking-widest",
                                            i === 1 ? "bg-primary text-white shadow-xl shadow-primary/20" : "text-slate-500 hover:text-slate-300"
                                        )}>{v}</button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Visualizer */}
                            <div className="h-80 flex items-end justify-between gap-3 pt-4">
                                {[40, 60, 45, 80, 50, 95, 70, 85, 60, 100, 75, 90].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                        <div className="w-full relative h-full flex items-end">
                                            {/* Bar Background */}
                                            <div className="absolute inset-x-0 bottom-0 top-0 bg-white/[0.02] rounded-2xl" />
                                            {/* Active Bar */}
                                            <div
                                                className={cn(
                                                    "w-full rounded-2xl transition-all duration-1000 relative group-hover:shadow-[0_0_25px_rgba(var(--primary),0.3)]",
                                                    i === 9 ? "bg-gradient-to-t from-primary to-accent" : "bg-white/5 group-hover:bg-white/10"
                                                )}
                                                style={{ height: `${h}%` }}
                                            >
                                                {i === 9 && (
                                                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-slate-950 p-3 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-500">
                                                        <div className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Peak Load</div>
                                                        <div className="text-lg font-black font-outfit leading-none mt-1">142k</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-black text-slate-700 uppercase tracking-tighter transition-colors group-hover:text-slate-400">
                                            {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][i]}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-12 pt-10 border-t border-white/5">
                                {[
                                    { label: "New Leads", val: "+2.4k", icon: "●", color: "text-primary" },
                                    { label: "Returning", val: "84%", icon: "●", color: "text-emerald-400" },
                                    { label: "Churn", val: "1.2%", icon: "●", color: "text-red-500" }
                                ].map(item => (
                                    <div key={item.label} className="flex items-center gap-3">
                                        <span className={cn("text-xs", item.color)}>{item.icon}</span>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">{item.label}</p>
                                            <p className="text-sm font-black text-white">{item.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Threat & Event HUD */}
                    <Card className="border-white/5 shadow-2xl rounded-[3rem] bg-slate-900 overflow-hidden self-start">
                        <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
                            <h3 className="font-black text-sm uppercase tracking-[0.2em] text-white">Event Stream</h3>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-black text-[8px] uppercase px-3 py-1">Streaming</Badge>
                        </div>
                        <CardContent className="p-0">
                            <div className="divide-y divide-white/5">
                                {[
                                    { title: "Firewall Breach Neutralized", hub: "US-EAST", status: "BLOCKED", time: "2m", color: "text-red-500" },
                                    { title: "Large Wallet Transaction", hub: "INTL-GW", status: "VERIFIED", time: "14m", color: "text-primary" },
                                    { title: "Infrastructure Cold Reboot", hub: "SYSTEM", status: "SUCCESS", time: "1h", color: "text-emerald-500" },
                                    { title: "Global Backup Instance", hub: "STORAGE", status: "SYNCED", time: "3h", color: "text-blue-500" },
                                    { title: "New Developer Access", hub: "SECURITY", status: "PENDING", time: "5h", color: "text-amber-500" }
                                ].map((log, i) => (
                                    <div key={i} className="p-6 flex items-center gap-5 hover:bg-white/5 transition-all cursor-pointer group">
                                        <div className={cn("w-1.5 h-10 rounded-full", log.color === 'text-red-500' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-white/10')} />
                                        <div className="flex-1 space-y-1">
                                            <div className="flex justify-between items-center text-slate-500 text-[9px] font-black tracking-widest uppercase">
                                                <span>{log.hub}</span>
                                                <span className="group-hover:text-white transition-colors">{log.time}</span>
                                            </div>
                                            <h5 className="text-[11px] font-black text-white uppercase tracking-tight">{log.title}</h5>
                                            <p className={cn("text-[9px] font-black uppercase tracking-[0.1em]", log.color)}>{log.status}</p>
                                        </div>
                                        <ChevronRight size={14} className="text-slate-800 group-hover:text-primary transition-colors" />
                                    </div>
                                ))}
                            </div>
                            <div className="p-8">
                                <Button className="w-full h-14 rounded-2xl bg-white/5 border border-white/5 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">Launch Full Audit Center</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Matrix Section */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 pb-20">
                    {/* Geography Density */}
                    <Card className="bg-slate-900 border-white/5 rounded-[3rem] p-10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1 space-y-8">
                                <div className="space-y-2">
                                    <Badge className="bg-accent/10 text-accent border-none font-black text-[9px] uppercase tracking-[0.2em] px-4 py-1.5 mb-2">Regional Dynamics</Badge>
                                    <h3 className="text-3xl font-black font-outfit text-white uppercase tracking-tighter">Engagement <span className="text-accent italic">Matrix</span></h3>
                                    <p className="text-slate-500 text-sm font-medium italic">Monitoring regional traffic density vs selection rates</p>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { l: "North India Hub", p: 72, c: "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" },
                                        { l: "Western Coast Belt", p: 58, c: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" },
                                        { l: "South Innovation Tier", p: 44, c: "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" }
                                    ].map(row => (
                                        <div key={row.l} className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                <span>{row.l}</span>
                                                <span className="text-white">{row.p}%</span>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className={cn("h-full rounded-full transition-all duration-[2000ms] ease-out", row.c)} style={{ width: `${row.p}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full md:w-64 aspect-square bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center p-8 group-hover:bg-white/10 transition-colors">
                                <Globe size={100} className="text-primary opacity-20 group-hover:opacity-60 transition-all group-hover:rotate-12" />
                            </div>
                        </div>
                    </Card>

                    {/* Quick Command Access */}
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { title: "Course Approvals", count: "14", desc: "Awaiting QA Check", icon: <Layers />, color: "bg-blue-500/10 text-blue-500", href: "/admin/courses" },
                            { title: "Doubt Resolution", count: "128", desc: "Avg time 14m", icon: <MonitorPlay />, color: "bg-primary/10 text-primary", href: "/admin/doubts" },
                            { title: "Support Tickets", count: "04", desc: "Urgent prioritization", icon: <Bell />, color: "bg-red-500/10 text-red-500", href: "/admin/support" },
                            { title: "System Settings", count: "PRO", desc: "Infrastructure v4.2", icon: <Settings />, color: "bg-slate-500/10 text-slate-500", href: "/admin/settings" }
                        ].map(box => (
                            <button key={box.title} className="bg-slate-900 border border-white/5 p-8 rounded-[2.5rem] text-left hover:border-primary/40 hover:scale-[1.02] active:scale-95 transition-all group relative overflow-hidden">
                                <div className="space-y-4 relative z-10">
                                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all", box.color)}>
                                        {box.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-baseline justify-between mb-1">
                                            <span className="text-2xl font-black font-outfit text-white uppercase">{box.count}</span>
                                            <ChevronRight size={14} className="text-slate-800 group-hover:text-primary transition-colors" />
                                        </div>
                                        <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">{box.title}</p>
                                        <p className="text-[9px] text-slate-500 font-bold italic">{box.desc}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
