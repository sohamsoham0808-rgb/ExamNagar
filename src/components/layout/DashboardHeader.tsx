"use client"

import * as React from "react"
import { Search, Bell, Menu, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
    role: "teacher" | "admin" | "student"
    user?: {
        name: string
        role: string
        avatar: string
    }
    className?: string
}

export function DashboardHeader({ role, user, className }: DashboardHeaderProps) {
    const isAdmin = role === 'admin'

    return (
        <header className={cn(
            "fixed top-0 right-0 left-0 lg:left-64 h-20 border-b z-40 px-4 md:px-8 flex items-center justify-between transition-all duration-300",
            className
        )}>
            <div className="flex items-center gap-4 flex-1">
                {/* Mobile Menu Button - Shown on small screens */}
                <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu size={20} />
                </Button>

                {/* Search Bar - Hidden on very small mobile */}
                <div className="relative w-full max-w-md hidden sm:block">
                    <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2", isAdmin ? "text-slate-500" : "text-slate-400")} size={18} />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className={cn(
                            "w-full border-none rounded-xl py-2.5 pl-11 pr-4 text-sm transition-all font-medium focus:ring-2",
                            isAdmin
                                ? "bg-slate-800 text-white placeholder:text-slate-500 focus:ring-primary/40"
                                : "bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-primary/20"
                        )}
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-5">
                <Button variant="ghost" size="icon" className={cn("relative", isAdmin ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-500")}>
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-200"></span>
                </Button>

                <div className={cn("h-8 w-px mx-1", isAdmin ? "bg-slate-800" : "bg-slate-200")}></div>

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden md:block">
                        <p className={cn("text-xs font-bold", isAdmin ? "text-white" : "text-slate-900")}>{user?.name || "User"}</p>
                        <p className={cn("text-[9px] font-bold uppercase tracking-widest", isAdmin ? "text-gold-400" : "text-slate-500")}>{user?.role || role}</p>
                    </div>
                    <div className="group relative">
                        <img
                            src={user?.avatar || "https://i.pravatar.cc/150"}
                            className={cn(
                                "w-10 h-10 rounded-xl p-0.5 border-2 cursor-pointer transition-transform active:scale-95",
                                isAdmin ? "border-primary/40 bg-slate-800" : "border-primary/20 bg-slate-50"
                            )}
                            alt="Profile"
                        />

                        {/* Dropdown Menu */}
                        <div className={cn(
                            "absolute top-full right-0 mt-2 w-48 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 p-2 z-50 border",
                            isAdmin ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                        )}>
                            <button className={cn("w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-xs font-bold", isAdmin ? "text-slate-300 hover:bg-slate-800 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-primary")}>
                                <User size={16} /> Profile Settings
                            </button>
                            <button className={cn("w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-xs font-bold", isAdmin ? "text-slate-300 hover:bg-slate-800 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-primary")}>
                                <Settings size={16} /> Preferences
                            </button>
                            <div className={cn("h-px my-1", isAdmin ? "bg-slate-800" : "bg-slate-100")}></div>
                            <button className={cn("w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-xs font-bold text-red-500", isAdmin ? "hover:bg-red-500/10" : "hover:bg-red-50")}>
                                <LogOut size={16} /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
