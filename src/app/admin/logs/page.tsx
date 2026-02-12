"use client"

import * as React from "react"
import {
    BarChart2,
    Search,
    Filter,
    Terminal,
    Clock,
    Shield,
    Activity,
    AlertTriangle,
    CheckCircle2,
    Info,
    ChevronLeft,
    ChevronRight,
    Download,
    Eye,
    Zap,
    Trash2,
    ExternalLink,
    MoreVertical
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { cn } from "@/lib/utils"

const MOCK_LOGS = [
    { id: "LOG-421", event: "User Authentication", status: "Success", user: "Rahul D.", ip: "192.168.1.42", timestamp: "2026-02-11 20:10:14", type: "auth", severity: "low" },
    { id: "LOG-422", event: "Course Upload Initiated", status: "Pending", user: "Sneha K.", ip: "102.10.45.12", timestamp: "2026-02-11 20:09:55", type: "system", severity: "low" },
    { id: "LOG-423", event: "SQL Injection Suspected", status: "Blocked", user: "Anonymous", ip: "45.122.10.8", timestamp: "2026-02-11 20:08:12", type: "threat", severity: "high" },
    { id: "LOG-424", event: "Wallet Transaction", status: "Verified", user: "Amit V.", ip: "172.16.0.4", timestamp: "2026-02-11 20:05:40", type: "wallet", severity: "medium" },
    { id: "LOG-425", event: "CDN Cache Clear", status: "Success", user: "Arch Admin", ip: "::1 (Local)", timestamp: "2026-02-11 20:00:00", type: "system", severity: "medium" },
    { id: "LOG-426", event: "MFA Setup Completed", status: "Success", user: "Dr. Rajesh", ip: "192.168.1.10", timestamp: "2026-02-11 19:58:12", type: "auth", severity: "low" },
    { id: "LOG-427", event: "Suspicious Login Attempt", status: "Flagged", user: "Anonymous", ip: "212.10.5.4", timestamp: "2026-02-11 19:55:10", type: "threat", severity: "high" },
]

export default function AdminLogsPage() {
    return (
        <DashboardLayout
            role="admin"
            user={{
                name: "Arch Admin",
                role: "Platform Architect",
                avatar: "https://i.pravatar.cc/150?u=arch_admin"
            }}
        >
            <div className="space-y-10 pb-20">
                {/* Log Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-4 border-b border-white/5">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Terminal className="text-primary" size={16} />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Platform Event Store</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black font-outfit text-white uppercase tracking-tighter leading-none">Platform <span className="text-primary italic">Logs</span></h1>
                        <p className="text-slate-500 text-sm font-medium italic">Immutable history of every primitive action across the ecosystem.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 hidden xl:block">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Hydrating Log Stream...</span>
                            </div>
                        </div>
                        <Button className="h-16 px-10 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
                            Export RAW Log <Download size={18} className="ml-2" />
                        </Button>
                    </div>
                </div>

                {/* Event Viewer Card */}
                <Card className="bg-slate-900 border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
                    <CardContent className="p-0">
                        {/* Control Console */}
                        <div className="p-8 border-b border-white/5 flex flex-col xl:flex-row xl:items-center justify-between gap-8 bg-white/[0.02]">
                            <div className="relative w-full xl:w-[500px]">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
                                <Input
                                    placeholder="Query by ID, IP, User or Event Fingerprint..."
                                    className="pl-14 bg-white/5 border-white/10 text-white placeholder:text-slate-700 rounded-2xl h-14 focus-visible:ring-primary/40 font-medium font-mono text-xs"
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex bg-white/5 p-1 rounded-[1.2rem] border border-white/10">
                                    {['All Events', 'Critical', 'System', 'Auth'].map((tab, i) => (
                                        <button key={tab} className={cn(
                                            "px-8 py-2.5 text-[10px] font-black rounded-xl transition-all",
                                            i === 0 ? "bg-white/10 text-white" : "text-slate-600 hover:text-slate-300"
                                        )}>{tab}</button>
                                    ))}
                                </div>
                                <div className="w-px h-8 bg-white/10 hidden md:block" />
                                <Button variant="outline" className="h-14 px-6 rounded-2xl border-white/10 bg-white/5 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all gap-2">
                                    <Filter size={16} /> Time Range
                                </Button>
                                <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-white/10 bg-white/5 text-slate-400 hover:text-red-500 transition-all"><Trash2 size={20} /></Button>
                            </div>
                        </div>

                        {/* Event Feed Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5">
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Event ID</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Directive Summary</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Identity Fingerprint</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Timestamp</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Severity</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 text-right">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10 font-mono">
                                    {MOCK_LOGS.map((log) => (
                                        <tr key={log.id} className="hover:bg-primary/[0.03] transition-colors group">
                                            <td className="px-10 py-6 text-[11px] font-black text-slate-500 group-hover:text-primary transition-colors">{log.id}</td>
                                            <td className="px-10 py-6">
                                                <div className="space-y-1">
                                                    <p className="text-xs font-black text-white group-hover:text-primary transition-colors">{log.event}</p>
                                                    <p className="text-[10px] text-slate-600 font-medium">Status: {log.status}</p>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className="space-y-1">
                                                    <p className="text-xs font-black text-slate-400">{log.user}</p>
                                                    <p className="text-[10px] text-slate-700 font-medium">{log.ip}</p>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-[10px] text-slate-500 font-bold">{log.timestamp}</td>
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn(
                                                        "w-1.5 h-1.5 rounded-full",
                                                        log.severity === 'high' ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                                                            log.severity === 'medium' ? "bg-amber-500" : "bg-emerald-500"
                                                    )} />
                                                    <span className={cn(
                                                        "text-[9px] font-black tracking-widest uppercase",
                                                        log.severity === 'high' ? "text-red-500" :
                                                            log.severity === 'medium' ? "text-amber-500" : "text-emerald-500"
                                                    )}>{log.severity}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <Button size="icon" variant="ghost" className="h-10 w-10 text-slate-700 hover:text-white transition-all"><Eye size={16} /></Button>
                                                <Button size="icon" variant="ghost" className="h-10 w-10 text-slate-700 hover:text-primary transition-all"><ExternalLink size={16} /></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Matrix Pagination */}
                        <div className="p-8 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
                            <div className="flex items-center gap-6">
                                <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Total Entries: 142,840</p>
                                <div className="h-4 w-px bg-white/5" />
                                <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest leading-none">Filtered: 7</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" className="h-12 px-6 rounded-2xl border-white/10 bg-white/5 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all"><ChevronLeft size={18} className="mr-2" /> Prior Page</Button>
                                <Button variant="outline" className="h-12 px-6 rounded-2xl border-white/10 bg-white/5 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all">Next Page <ChevronRight size={18} className="ml-2" /></Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Analytical Overlays */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <Card className="bg-slate-900 border-white/5 p-10 rounded-[3rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-all duration-1000" />
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                            <div className="space-y-4 flex-1">
                                <Badge className="bg-primary/10 text-primary border-none font-black text-[9px] uppercase tracking-widest px-4 py-1.5 mb-2">Event Density</Badge>
                                <h3 className="text-3xl font-black font-outfit text-white uppercase tracking-tighter leading-tight">Neural activity <span className="text-primary italic">heatmap</span></h3>
                                <p className="text-slate-500 text-sm font-medium italic">Peak frequency detected at 20:00 UTC during global backup sweep.</p>
                            </div>
                            <div className="w-full md:w-48 aspect-square bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center p-8 group-hover:bg-white/10 transition-all">
                                <Activity size={80} className="text-primary opacity-20 group-hover:opacity-100 transition-all group-hover:scale-110" />
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-slate-900 border-white/5 p-10 rounded-[3rem] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black font-outfit text-white uppercase tracking-tighter leading-tight">Threat <span className="text-red-500 italic">Mitigation</span></h3>
                                    <p className="text-xs text-slate-500 font-medium italic">Automated defense protocols vs manual intervention</p>
                                </div>
                                <Shield className="text-red-500" size={32} />
                            </div>
                            <div className="space-y-5">
                                {[
                                    { label: "AI Auto-Blocked", p: 98.4, c: "bg-emerald-500" },
                                    { label: "Manual Escalations", p: 1.6, c: "bg-red-500" }
                                ].map(row => (
                                    <div key={row.label} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            <span>{row.label}</span>
                                            <span className="text-white">{row.p}%</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div className={cn("h-full rounded-full", row.c)} style={{ width: `${row.p}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
