"use client"

import * as React from "react"
import {
    Users,
    Search,
    Filter,
    MoreVertical,
    UserPlus,
    Mail,
    Phone,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Edit2,
    Trash2,
    Shield,
    MoreHorizontal,
    ArrowUpRight,
    Ban,
    UserCheck,
    MailWarning,
    Activity,
    Lock
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { cn } from "@/lib/utils"

const MOCK_USERS = [
    { id: "1", name: "Rahul Deshmukh", email: "rahul@example.com", phone: "+91 98765 43210", role: "Student", joined: "12 Feb 2026", status: "Active" },
    { id: "2", name: "Sneha Kapur", email: "sneha@example.com", phone: "+91 98765 43211", role: "Student", joined: "10 Feb 2026", status: "Active" },
    { id: "3", name: "Dr. Rajesh Sharma", email: "rajesh@example.com", phone: "+91 98765 43212", role: "Teacher", joined: "01 Jan 2026", status: "Active" },
    { id: "4", name: "Amit Verma", email: "amit@example.com", phone: "+91 98765 43213", role: "Student", joined: "05 Feb 2026", status: "Suspended" },
    { id: "5", name: "Priya Singh", email: "priya@example.com", phone: "+91 98765 43214", role: "Student", joined: "08 Feb 2026", status: "Active" },
    { id: "6", name: "Vikram Malhotra", email: "vikram@example.com", phone: "+91 98765 43215", role: "Teacher", joined: "15 Jan 2026", status: "Active" },
    { id: "7", name: "Ananya Iyer", email: "ananya@example.com", phone: "+91 98765 43216", role: "Student", joined: "20 Jan 2026", status: "Active" },
    { id: "8", name: "Karan Johar", email: "karan@example.com", phone: "+91 98765 43217", role: "Student", joined: "22 Jan 2026", status: "Active" },
]

export default function AdminUsersPage() {
    return (
        <DashboardLayout
            role="admin"
            user={{
                name: "Arch Admin",
                role: "Platform Architect",
                avatar: "https://i.pravatar.cc/150?u=arch_admin"
            }}
        >
            <div className="space-y-10">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="text-primary" size={16} />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Platform Governance</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black font-outfit text-white uppercase tracking-tighter">User <span className="text-primary italic">Governance</span></h1>
                        <p className="text-slate-500 text-sm font-medium">Manage permissions, analyze behavior and moderate the ExamNagar community.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button className="h-16 px-10 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest gap-3 hover:bg-white/10 transition-all">
                            <MailWarning size={18} /> Broadcast Message
                        </Button>
                        <Button className="h-16 px-10 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all">
                            <UserPlus size={18} /> Provision User
                        </Button>
                    </div>
                </div>

                {/* Audit Grid */}
                <Card className="bg-slate-900 border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
                    <CardContent className="p-0">
                        {/* Control Bar */}
                        <div className="p-8 border-b border-white/5 flex flex-col xl:flex-row xl:items-center justify-between gap-8 bg-white/[0.02]">
                            <div className="relative w-full xl:w-[450px]">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                <Input
                                    placeholder="Search identity by name, email or fingerprint..."
                                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-2xl h-14 focus-visible:ring-primary/40 font-medium"
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex bg-white/5 p-1 rounded-[1.2rem] border border-white/10">
                                    {['All Roles', 'Students', 'Teachers', 'Admins'].map((tab, i) => (
                                        <button key={tab} className={cn(
                                            "px-6 py-2.5 text-[10px] font-black rounded-xl transition-all",
                                            i === 0 ? "bg-white/10 text-white shadow-xl" : "text-slate-500 hover:text-slate-300"
                                        )}>{tab}</button>
                                    ))}
                                </div>
                                <div className="w-px h-8 bg-white/10 hidden md:block" />
                                <Button variant="outline" className="h-14 px-6 rounded-2xl border-white/10 bg-white/5 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all gap-2">
                                    <Filter size={16} /> Advanced Audit
                                </Button>
                            </div>
                        </div>

                        {/* Elite Data Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5">
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Identity Identifier</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Access Role</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Activation Date</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Security State</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Direct Directives</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {MOCK_USERS.map((user) => (
                                        <tr key={user.id} className="hover:bg-white/[0.03] transition-colors group">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 font-black text-xs uppercase group-hover:border-primary/40 group-hover:text-primary transition-all">
                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-black text-white group-hover:text-primary transition-colors">{user.name}</p>
                                                        <p className="text-[10px] text-slate-500 font-medium">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <Badge className={cn(
                                                    "text-[9px] font-black tracking-[0.1em] uppercase border-none px-4 py-1.5 rounded-lg",
                                                    user.role === 'Teacher' ? "bg-primary/10 text-primary" : "bg-white/5 text-slate-400"
                                                )}>
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td className="px-10 py-6 text-slate-400 font-bold text-xs">{user.joined}</td>
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "w-2 h-2 rounded-full",
                                                        user.status === 'Active' ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                                                    )} />
                                                    <span className={cn(
                                                        "text-[10px] font-black uppercase tracking-widest",
                                                        user.status === 'Active' ? "text-emerald-500" : "text-red-500"
                                                    )}>{user.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                                                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-primary hover:bg-white/10 transition-all"><Edit2 size={16} /></Button>
                                                    {user.status === 'Active' ? (
                                                        <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all"><Ban size={16} /></Button>
                                                    ) : (
                                                        <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all"><UserCheck size={16} /></Button>
                                                    )}
                                                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-white transition-all"><MoreVertical size={16} /></Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Command Center Pagination */}
                        <div className="p-8 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
                            <div className="flex items-center gap-6">
                                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Total Nodes Indexed: 4,230</p>
                                <div className="h-4 w-px bg-white/5" />
                                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                                    <Activity size={14} /> <span>Live Telemetry Active</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-white/10 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white"><ChevronLeft size={20} /></Button>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3].map(i => (
                                        <Button key={i} variant={i === 1 ? 'primary' : 'ghost'} className={cn(
                                            "h-12 w-12 rounded-2xl text-xs font-black uppercase transition-all",
                                            i === 1 ? "bg-primary text-white shadow-xl shadow-primary/20" : "text-slate-500 hover:text-white hover:bg-white/5"
                                        )}>{i}</Button>
                                    ))}
                                    <div className="w-12 h-12 flex items-center justify-center text-slate-600"><MoreHorizontal size={20} /></div>
                                    <Button variant="ghost" className="h-12 w-12 rounded-2xl text-xs font-black text-slate-500 hover:text-white hover:bg-white/5 uppercase">42</Button>
                                </div>
                                <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-white/10 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white"><ChevronRight size={20} /></Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Governance Analytics Widgets */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10">
                    <Card className="xl:col-span-2 bg-slate-900 border-white/5 p-10 rounded-[3rem] space-y-8 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-all duration-1000" />
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                            <div className="flex-1 space-y-3">
                                <h3 className="text-3xl font-black font-outfit text-white uppercase tracking-tighter">Retention <span className="text-emerald-500 italic">Core</span></h3>
                                <p className="text-slate-500 text-sm font-medium italic">Monthly recurring user engagement mapping</p>
                            </div>
                            <div className="flex items-end gap-3 h-24">
                                {[40, 65, 30, 85, 45, 90, 60, 75].map((h, i) => (
                                    <div key={i} className="w-4 bg-emerald-500/10 rounded-t-lg relative group/bar cursor-help">
                                        <div className="absolute inset-0 bg-emerald-500 rounded-t-lg transition-all duration-700" style={{ height: `${h}%` }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-slate-900 border-white/5 p-10 rounded-[3rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full" />
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                                    <Lock size={20} />
                                </div>
                                <h4 className="text-white font-black text-sm uppercase tracking-widest">Security Pulse</h4>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: "MFA Adoption", p: 82, c: "bg-emerald-500" },
                                    { label: "IP Whitelisting", p: 44, c: "bg-primary" }
                                ].map(row => (
                                    <div key={row.label} className="space-y-2">
                                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-500">
                                            <span>{row.label}</span>
                                            <span className="text-white">{row.p}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div className={cn("h-full rounded-full", row.c)} style={{ width: `${row.p}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full h-14 rounded-2xl bg-white/5 border border-white/5 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white">Security Console</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
