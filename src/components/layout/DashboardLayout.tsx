"use client"

import * as React from "react"
import { DashboardSidebar } from "./DashboardSidebar"
import { DashboardHeader } from "./DashboardHeader"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
    children: React.ReactNode
    role: "teacher" | "admin" | "student"
    user?: {
        name: string
        role: string
        avatar: string
    }
}

export function DashboardLayout({ children, role, user }: DashboardLayoutProps) {
    const isTeacher = role === 'teacher'
    const isAdmin = role === 'admin'

    return (
        <div className={cn(
            "min-h-screen transition-colors duration-500",
            isAdmin ? "bg-slate-950" : "bg-slate-50"
        )}>
            {/* Sidebar */}
            <DashboardSidebar role={role} />

            {/* Main Content Area */}
            <div className={cn(
                "flex-1 transition-all duration-300 min-h-screen flex flex-col pt-20",
                "lg:ml-64" // Add spacing for desktop sidebar
            )}>
                {/* Unified Header */}
                <DashboardHeader
                    role={role}
                    user={user}
                    className={isAdmin ? "bg-slate-900 border-slate-800" : "bg-white/80 backdrop-blur-md border-slate-200"}
                />

                {/* Page Content */}
                <main className="p-4 md:p-8 flex-1">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
