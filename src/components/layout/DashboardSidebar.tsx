"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    BookOpen,
    Users,
    MessageSquare,
    BarChart2,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    ShieldCheck,
    CreditCard,
    Activity,
    Video,
    Trophy
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Logo } from "@/components/ui/Logo"
import { cn } from "@/lib/utils"

interface NavItem {
    name: string
    href: string
    icon: React.ReactNode
    badge?: string
}

const TEACHER_NAV: NavItem[] = [
    { name: "Overview", href: "/teacher", icon: <LayoutDashboard size={20} /> },
    { name: "My Courses", href: "/teacher/courses", icon: <BookOpen size={20} /> },
    { name: "Student List", href: "/teacher/students", icon: <Users size={20} /> },
    { name: "Doubt Center", href: "/teacher/doubts", icon: <MessageSquare size={20} />, badge: "12" },
    { name: "Live Sessions", href: "/teacher/live", icon: <Video size={20} /> },
    { name: "Performance", href: "/teacher/analytics", icon: <BarChart2 size={20} /> },
    { name: "Settings", href: "/teacher/settings", icon: <Settings size={20} /> },
]

const ADMIN_NAV: NavItem[] = [
    { name: "Global Overview", href: "/admin", icon: <ShieldCheck size={20} /> },
    { name: "User Governance", href: "/admin/users", icon: <Users size={20} /> },
    { name: "Content Audit", href: "/admin/courses", icon: <BookOpen size={20} />, badge: "12" },
    { name: "Health Monitor", href: "/admin/health", icon: <Activity size={20} /> },
    { name: "Platform Logs", href: "/admin/logs", icon: <BarChart2 size={20} /> },
    { name: "System Config", href: "/admin/settings", icon: <Settings size={20} /> },
]

interface DashboardSidebarProps {
    role: "teacher" | "admin" | "student"
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = React.useState(false)

    const isAdmin = role === 'admin'
    const navItems = isAdmin ? ADMIN_NAV : TEACHER_NAV

    return (
        <aside className={cn(
            "fixed left-0 top-0 h-screen transition-all duration-300 z-50 flex flex-col border-r shadow-2xl overflow-hidden",
            isCollapsed ? "w-20" : "w-64",
            isAdmin
                ? "bg-slate-900 border-white/5 text-slate-400"
                : "bg-white border-slate-200 text-slate-500"
        )}>
            {/* Logo Section */}
            <div className={cn(
                "h-24 flex items-center px-6 mb-6 transition-colors",
                isAdmin ? "border-b border-white/5 bg-slate-950" : "bg-white"
            )}>
                <Link href="/" className="flex items-center gap-3">
                    <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg",
                        isAdmin ? "bg-primary shadow-primary/20" : "bg-primary shadow-primary/10"
                    )}>
                        <ShieldCheck size={24} className="text-white" />
                    </div>
                    {!isCollapsed && (
                        <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                            <p className={cn("text-sm font-black uppercase tracking-tighter leading-none", isAdmin ? "text-white" : "text-slate-950")}>
                                ExamNagar <span className="text-primary italic">.PRO</span>
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                {role} PANEL
                            </p>
                        </div>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 h-12 rounded-xl transition-all duration-300 group relative",
                                isActive
                                    ? isAdmin
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "bg-[#F3F4FF] text-primary"
                                    : isAdmin
                                        ? "hover:bg-white/5 hover:text-slate-200"
                                        : "hover:bg-slate-50 text-slate-500 hover:text-primary"
                            )}
                        >
                            <div className={cn(
                                "shrink-0 transition-transform duration-300 group-hover:scale-110",
                                isActive ? "scale-110 text-primary" : "opacity-70 group-hover:opacity-100"
                            )}>
                                {item.icon}
                            </div>
                            {!isCollapsed && (
                                <span className={cn(
                                    "text-sm font-bold truncate flex-1 animate-in fade-in duration-300",
                                    isActive ? "text-primary/80" : ""
                                )}>
                                    {item.name}
                                </span>
                            )}
                            {!isCollapsed && item.badge && (
                                <span className={cn(
                                    "px-2 py-0.5 rounded-full text-[10px] font-black min-w-[22px] text-center shadow-lg shadow-red-500/20",
                                    isAdmin ? "bg-white/10 text-white" : "bg-red-500 text-white"
                                )}>
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer Actions */}
            <div className={cn(
                "p-4 space-y-2 border-t",
                isAdmin ? "border-white/5" : "border-slate-100"
            )}>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={cn(
                        "w-full flex items-center justify-center h-10 rounded-xl transition-all",
                        isAdmin ? "bg-white/5 text-slate-400 hover:text-white" : "bg-slate-50 text-slate-500 hover:text-primary"
                    )}
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>
        </aside>
    )
}
