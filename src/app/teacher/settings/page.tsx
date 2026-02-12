"use client"

import * as React from "react"
import {
    User,
    Shield,
    Bell,
    Palette,
    Globe,
    Camera,
    Lock,
    Mail,
    Database,
    LogOut,
    CheckCircle2,
    Save,
    ChevronRight,
    Search
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
    const [selectedTab, setSelectedTab] = React.useState("Profile")

    const tabs = [
        { id: "Profile", icon: <User size={18} /> },
        { id: "Security", icon: <Shield size={18} /> },
        { id: "Notifications", icon: <Bell size={18} /> },
        { id: "Display", icon: <Palette size={18} /> },
    ]

    return (
        <DashboardLayout role="teacher">
            <div className="space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <Badge className="bg-slate-100 text-slate-900 border-none font-bold px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest">Settings</Badge>
                        <h1 className="text-4xl font-black font-outfit text-slate-900 uppercase tracking-tighter">
                            Portal <span className="text-primary italic">Configuration</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-sm">Manage your professional identity and personalize your workspace.</p>
                    </div>
                    <Button className="h-14 px-10 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200 font-black text-xs uppercase tracking-widest gap-3">
                        <Save size={18} /> Save All Changes
                    </Button>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Vertical Navigation */}
                    <aside className="lg:w-72 shrink-0 space-y-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={cn(
                                    "w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 group",
                                    selectedTab === tab.id
                                        ? "bg-primary border-primary text-white shadow-xl shadow-primary/20"
                                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                        selectedTab === tab.id ? "bg-white/20" : "bg-slate-50 text-slate-900"
                                    )}>
                                        {tab.icon}
                                    </div>
                                    <span className="font-black text-[10px] uppercase tracking-widest">{tab.id}</span>
                                </div>
                                <ChevronRight size={16} className={cn("transition-transform", selectedTab === tab.id ? "translate-x-1" : "opacity-0")} />
                            </button>
                        ))}
                        <div className="pt-10">
                            <button className="w-full flex items-center gap-4 p-5 rounded-2xl text-red-500 hover:bg-red-50 transition-colors font-black text-[10px] uppercase tracking-widest">
                                <LogOut size={18} />
                                Sign Out Account
                            </button>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1 space-y-8">
                        {selectedTab === "Profile" && (
                            <Card className="border-slate-100 rounded-[2.5rem] shadow-sm bg-white overflow-hidden p-10 space-y-10">
                                <div className="flex flex-col md:flex-row items-center gap-10 border-b border-slate-50 pb-10">
                                    <div className="relative group cursor-pointer">
                                        <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 border-4 border-white shadow-2xl overflow-hidden group-hover:scale-105 transition-transform">
                                            <img src="https://i.pravatar.cc/150?u=teacher" alt="Avatar" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="absolute inset-0 bg-slate-900/40 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera size={24} className="text-white" />
                                        </div>
                                    </div>
                                    <div className="space-y-3 text-center md:text-left">
                                        <h3 className="text-2xl font-black font-outfit text-slate-900 uppercase tracking-tighter">Dr. Rajesh Sharma</h3>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Senior Mathematics Expert</p>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                            <Badge className="bg-primary/5 text-primary border-none text-[8px] font-black uppercase px-2 py-1">IIT JEE</Badge>
                                            <Badge className="bg-accent/5 text-accent border-none text-[8px] font-black uppercase px-2 py-1">Calculus</Badge>
                                            <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] font-black uppercase px-2 py-1">12+ Yrs Exp</Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Display Name</label>
                                        <Input defaultValue="Dr. Rajesh Sharma" className="h-14 rounded-2xl bg-slate-50 border-transparent focus-visible:ring-primary/20 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Professional Email</label>
                                        <Input defaultValue="rajesh.sharma@examnagar.in" className="h-14 rounded-2xl bg-slate-50 border-transparent focus-visible:ring-primary/20 font-medium" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Professional Biography</label>
                                        <textarea className="w-full min-h-[120px] p-6 rounded-2xl bg-slate-50 border-transparent focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium text-slate-700 resize-none" defaultValue="Specializing in competitive mathematics for over a decade. Passionate about making complex calculus concepts accessible to every aspirant." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Official Website / Portfolio</label>
                                        <Input defaultValue="sharmamaths.com" className="h-14 rounded-2xl bg-slate-50 border-transparent focus-visible:ring-primary/20 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Time Zone</label>
                                        <Input defaultValue="(GMT+5:30) India Standard Time" className="h-14 rounded-2xl bg-slate-50 border-transparent focus-visible:ring-primary/20 font-medium" />
                                    </div>
                                </div>
                            </Card>
                        )}

                        {selectedTab === "Security" && (
                            <Card className="border-slate-100 rounded-[2.5rem] shadow-sm bg-white overflow-hidden p-10 space-y-10">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center">
                                            <Lock size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black font-outfit text-slate-900 uppercase tracking-tighter">Authentication Security</h3>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Update password and manage 2FA</p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8 pt-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Current Password</label>
                                            <Input type="password" value="********" readOnly className="h-14 rounded-2xl bg-slate-50 border-transparent focus-visible:ring-primary/20 font-medium" />
                                        </div>
                                        <div className="flex items-end">
                                            <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-100 font-black text-[10px] uppercase tracking-widest w-full">Change Password</Button>
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                                                <Shield size={28} />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 uppercase tracking-tight">Two-Factor Authentication</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Enhance account security via OTP</p>
                                            </div>
                                        </div>
                                        <Badge className="bg-emerald-500 text-white border-none py-1.5 px-4 rounded-lg font-black text-[9px] uppercase tracking-widest">Enabled</Badge>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {selectedTab === "Notifications" && (
                            <Card className="border-slate-100 rounded-[2.5rem] shadow-sm bg-white overflow-hidden p-10 space-y-10">
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                                            <Bell size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black font-outfit text-slate-900 uppercase tracking-tighter">Alert Preferences</h3>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">How should we notify you?</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4">
                                        {[
                                            { title: "New Enrollment Alerts", desc: "Get notified when a student joins your batch", active: true },
                                            { title: "Doubt Post Notifications", desc: "Instant alert when a student posts a query", active: true },
                                            { title: "Live Session Reminders", desc: "Alert 15 mins before your class starts", active: true },
                                            { title: "Weekly Portal Digest", desc: "A summary of batch performance and engagement", active: false },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-50 transition-all group">
                                                <div className="space-y-1">
                                                    <p className="font-black text-slate-900 uppercase tracking-tight text-sm">{item.title}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.desc}</p>
                                                </div>
                                                <div className={cn(
                                                    "w-14 h-8 rounded-full p-1 transition-all cursor-pointer relative",
                                                    item.active ? "bg-primary" : "bg-slate-200"
                                                )}>
                                                    <div className={cn(
                                                        "w-6 h-6 rounded-full bg-white shadow-sm transition-all",
                                                        item.active ? "translate-x-6" : "translate-x-0"
                                                    )} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
