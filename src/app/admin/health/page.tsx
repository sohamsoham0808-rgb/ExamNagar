"use client"

import * as React from "react"
import {
    Activity,
    Server,
    Database,
    Cpu,
    HardDrive,
    Network,
    ShieldAlert,
    Clock,
    Zap,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    RefreshCw,
    Download,
    BarChart3,
    Terminal,
    Globe
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { cn } from "@/lib/utils"

export default function AdminHealthPage() {
    return (
        <DashboardLayout
            role="admin"
            user={{
                name: "Arch Admin",
                role: "Platform Architect",
                avatar: "https://i.pravatar.cc/150?u=arch_admin"
            }}
        >
            <div className="space-y-12 pb-20">
                {/* Infrastructure Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-white/5">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <Activity className="text-primary animate-pulse" size={16} />
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Infrastructure Pulse: High Fidelity</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black font-outfit text-white uppercase tracking-tighter leading-none">
                            Health <span className="text-primary italic">Monitor</span>
                        </h1>
                        <p className="text-slate-500 text-sm font-medium italic">Global node status • Database throughput • CDN Latency</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="h-16 px-8 rounded-2xl border-white/10 bg-white/5 text-slate-400 font-black text-[10px] uppercase tracking-widest gap-2 hover:bg-white/10 hover:text-white transition-all">
                            <RefreshCw size={18} /> Forced Sync
                        </Button>
                        <Button className="h-16 px-10 rounded-2xl bg-primary text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
                            Download Dump <Download size={18} className="ml-2" />
                        </Button>
                    </div>
                </div>

                {/* Infrastructure Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Primary Server Status */}
                    <Card className="lg:col-span-2 bg-slate-900 border-white/5 rounded-[3rem] p-10 space-y-12 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full translate-x-32 -translate-y-32" />
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12">
                            <div className="space-y-8 flex-1">
                                <div className="space-y-2">
                                    <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-black text-[9px] uppercase tracking-[0.2em]">Operational</Badge>
                                    <h3 className="text-3xl font-black font-outfit text-white uppercase tracking-tighter">Core Cluster <span className="text-primary italic">v4.2</span></h3>
                                    <p className="text-slate-500 text-sm font-medium italic">Active across 14 zones • Auto-scaling enabled</p>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    {[
                                        { label: "CPU Usage", val: "24%", icon: Cpu, color: "text-primary" },
                                        { label: "Memory Pool", val: "4.8GB / 16GB", icon: Database, color: "text-emerald-400" },
                                        { label: "Disk I/O", val: "128MB/s", icon: HardDrive, color: "text-blue-400" },
                                        { label: "Network In", val: "1.2Gbps", icon: Network, color: "text-accent" }
                                    ].map(stat => (
                                        <div key={stat.label} className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center", stat.color)}>
                                                    <stat.icon size={20} />
                                                </div>
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                                            </div>
                                            <p className="text-xl font-black text-white">{stat.val}</p>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className={cn("h-full rounded-full bg-gradient-to-r from-primary to-accent")} style={{ width: '40%' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full md:w-72 aspect-video bg-white/5 border border-white/10 rounded-[2rem] flex flex-col items-center justify-center p-8 gap-4 group-hover:bg-white/10 transition-all">
                                <Terminal size={60} className="text-primary opacity-20" />
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time CLI Viz</p>
                            </div>
                        </div>
                    </Card>

                    {/* Regional Latency Heatmap */}
                    <Card className="bg-slate-900 border-white/5 rounded-[3rem] p-10 flex flex-col justify-between space-y-8 overflow-hidden relative group">
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 blur-[80px] rounded-full -translate-x-24 translate-y-24" />
                        <div className="relative z-10 space-y-2">
                            <h3 className="text-2xl font-black font-outfit text-white uppercase tracking-tighter">Global <span className="text-primary italic">Node Edge</span></h3>
                            <p className="text-slate-500 text-sm font-medium italic">Latency distribution across edge points</p>
                        </div>
                        <div className="space-y-6 relative z-10">
                            {[
                                { region: "Mumbai, India", ping: "8ms", color: "bg-emerald-500" },
                                { region: "Delhi, India", ping: "14ms", color: "bg-emerald-500" },
                                { region: "Singapore", ping: "42ms", color: "bg-amber-500" },
                                { region: "Frankfurt, EU", ping: "124ms", color: "bg-red-500" },
                                { region: "US-East-1", ping: "240ms", color: "bg-red-500" }
                            ].map(node => (
                                <div key={node.region} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group/node">
                                    <div className="flex items-center gap-3">
                                        <Globe size={16} className="text-slate-500 group-hover/node:text-primary transition-colors" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{node.region}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-slate-400">{node.ping}</span>
                                        <div className={cn("w-2 h-2 rounded-full", node.color, "shadow-[0_0_10px_currentColor]")}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full h-14 rounded-2xl bg-white/5 border border-white/5 text-slate-300 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 relative z-10">Configure Edge Priority</Button>
                    </Card>
                </div>

                {/* Database Telemetry */}
                <div className="grid lg:grid-cols-2 gap-10">
                    <Card className="bg-slate-900 border-white/5 rounded-[3rem] p-10 space-y-10">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black font-outfit text-white uppercase tracking-tighter">Database <span className="text-primary italic">Throughput</span></h3>
                                <p className="text-xs text-slate-500 font-medium italic">Aggregated Query Per Second (QPS) audit</p>
                            </div>
                            <Badge className="bg-primary/10 text-primary border-none font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-lg">Real-Time</Badge>
                        </div>

                        <div className="h-64 flex items-end gap-1.5">
                            {[20, 35, 25, 50, 45, 75, 55, 90, 85, 100, 70, 80, 60, 40, 50, 65, 80, 70, 60, 100].map((h, i) => (
                                <div key={i} className="flex-1 bg-white/5 rounded-t-lg relative group overflow-hidden">
                                    <div className={cn("absolute inset-0 bg-primary opacity-20 group-hover:opacity-60 transition-all")} style={{ height: `${h}%` }} />
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
                            <div>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Avg QPS</p>
                                <p className="text-xl font-black text-white">4.2k</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Peak QPS</p>
                                <p className="text-xl font-black text-white">12.8k</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Error Rate</p>
                                <p className="text-xl font-black text-emerald-500">0.00%</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-slate-900 border-white/5 rounded-[3rem] overflow-hidden">
                        <div className="p-8 border-b border-white/5 bg-white/0 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShieldAlert className="text-amber-500" size={20} />
                                <h3 className="font-black text-sm uppercase tracking-widest text-white">Recent Hardware Events</h3>
                            </div>
                            <Badge className="bg-white/5 text-slate-500 border-none font-black text-[9px]">Last Update: 2m ago</Badge>
                        </div>
                        <div className="divide-y divide-white/5">
                            {[
                                { title: "DBS-02 Scaling Event", desc: "Storage group expanded by 500GB", time: "14m ago", type: "system" },
                                { title: "Edge Node Recovery", desc: "SIN-01 zone back online after sync", time: "1h ago", type: "success" },
                                { title: "SSL Certificate Renewal", desc: "Wildcard cert renewed for 365 days", time: "4h ago", type: "system" },
                                { title: "API Throttling Active", desc: "Client 'Bot-420' limited on /v1/search", time: "6h ago", type: "warning" }
                            ].map((event, i) => (
                                <div key={i} className="p-8 flex items-start gap-6 hover:bg-white/5 transition-all">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full mt-1.5",
                                        event.type === 'warning' ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" :
                                            event.type === 'success' ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-primary"
                                    )} />
                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between items-center text-slate-500 text-[9px] font-black tracking-widest uppercase">
                                            <span>{event.time}</span>
                                        </div>
                                        <h5 className="text-[12px] font-black text-white uppercase tracking-tight">{event.title}</h5>
                                        <p className="text-[10px] text-slate-500 font-medium italic">{event.desc}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-slate-800 hover:text-white"><ArrowUpRight size={18} /></Button>
                                </div>
                            ))}
                        </div>
                        <div className="p-8">
                            <Button className="w-full h-14 rounded-2xl bg-white/5 border border-white/5 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">Launch Console v4.2</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
