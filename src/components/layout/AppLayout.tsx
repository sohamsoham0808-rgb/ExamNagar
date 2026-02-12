"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    // Check if the current route is a dashboard route
    const isDashboard = pathname.startsWith('/teacher') ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/typing-test')

    if (isDashboard) {
        return (
            <main className="grow flex flex-col min-h-screen">
                {children}
            </main>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="grow pt-24 md:pt-28">
                {children}
            </main>
            <Footer />
        </div>
    )
}
