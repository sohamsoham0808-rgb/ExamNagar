"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Search, ChevronDown, Bell, User, BookOpen, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Logo } from "@/components/ui/Logo"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth/AuthProvider"
import { logout } from "@/actions/auth"
import { useRouter } from "next/navigation"

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const { user, loading } = useAuth()
    const router = useRouter()

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLogout = async () => {
        await logout()
        router.refresh()
    }

    const navLinks = [
        { name: "Courses", href: "/courses" },
        { name: "Tests", href: "/tests" },
        { name: "Books", href: "/books" },
        { name: "Typing", href: "/typing-test" },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 pt-4 pb-2",
            scrolled ? "pt-2" : "pt-6"
        )}>
            <nav className={cn(
                "container mx-auto max-w-7xl rounded-[2rem] border transition-all duration-500",
                scrolled
                    ? "bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] h-20"
                    : "bg-white border-transparent h-24 shadow-none"
            )}>
                <div className="h-full px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="transition-transform active:scale-95">
                        <Logo size={scrolled ? 'sm' : 'md'} />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-slate-50 transition-all active:scale-95"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="w-[1px] h-6 bg-slate-200 mx-4" />
                        <Link href="/vacancies" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all active:scale-95">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            Jobs
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-3 mr-2">
                            <button className="p-3 rounded-full text-slate-400 hover:text-primary hover:bg-slate-100 transition-all active:scale-90">
                                <Search size={20} />
                            </button>
                            <button className="p-3 rounded-full text-slate-400 hover:text-primary hover:bg-slate-100 transition-all active:scale-90 relative">
                                <Bell size={20} />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                        </div>

                        {/* User Menu / Dashboards */}
                        <div className="hidden sm:flex items-center gap-3">
                            {!loading && (
                                user ? (
                                    <div className="group relative">
                                        <button className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 p-1.5 pr-4 rounded-2xl border border-slate-200 transition-all cursor-pointer">
                                            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-black text-[10px]">
                                                {user.displayName ? user.displayName.split(' ').map(n => n[0]).join('') : (user.email ? user.email[0].toUpperCase() : 'U')}
                                            </div>
                                            <span className="text-xs font-bold text-slate-600">My Panels</span>
                                            <ChevronDown size={14} className="text-slate-400 group-hover:rotate-180 transition-transform" />
                                        </button>

                                        {/* Dropdown */}
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-[1.5rem] shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 p-2 z-[60]">
                                            <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-primary transition-colors">
                                                <User size={16} /> <span className="text-xs font-bold">Student Hub</span>
                                            </Link>
                                            <Link href="/teacher" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-primary transition-colors">
                                                <BookOpen size={16} /> <span className="text-xs font-bold">Teacher Panel</span>
                                            </Link>
                                            <Link href="/admin" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-primary transition-colors">
                                                <Settings size={16} /> <span className="text-xs font-bold">Admin Center</span>
                                            </Link>
                                            <div className="h-[1px] bg-slate-100 my-1 mx-2" />
                                            <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors">
                                                <LogOut size={16} /> <span className="text-xs font-bold">Sign Out</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Link href="/login">
                                            <Button variant="outline" className="h-10 px-6 rounded-xl font-bold text-slate-600 border-slate-200 hover:bg-slate-50">Sign In</Button>
                                        </Link>
                                        <Link href="/signup">
                                            <Button className="h-10 px-6 rounded-xl font-bold bg-primary text-white hover:bg-primary/90">Sign Up</Button>
                                        </Link>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-3 rounded-2xl bg-slate-50 text-slate-900 border border-slate-200 ml-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={cn(
                    "lg:hidden absolute top-[calc(100%+12px)] left-0 right-0 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl p-8 space-y-6 transition-all duration-500 origin-top",
                    isMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
                )}>
                    <div className="grid grid-cols-2 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex flex-col p-4 rounded-2xl bg-slate-50 border border-slate-100 active:bg-slate-100 transition-colors"
                            >
                                <span className="text-sm font-black text-slate-900">{link.name}</span>
                                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight mt-1">Explore Section</span>
                            </Link>
                        ))}
                    </div>
                    <Link
                        href="/vacancies"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between p-5 rounded-2xl bg-red-50 border border-red-100"
                    >
                        <div className="flex items-center gap-3">
                            <Bell className="text-red-500" size={20} />
                            <span className="font-bold text-red-700 uppercase tracking-widest text-xs">Vacancy Alerts</span>
                        </div>
                        <ChevronDown className="-rotate-90 text-red-400" size={16} />
                    </Link>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        {!loading && (
                            user ? (
                                <Button onClick={handleLogout} variant="outline" className="col-span-2 h-14 rounded-2xl font-bold border-red-200 text-red-600 hover:bg-red-50 uppercase tracking-widest text-xs">Sign Out</Button>
                            ) : (
                                <>
                                    <Link href="/login" className="w-full">
                                        <Button variant="outline" className="w-full h-14 rounded-2xl font-bold border-slate-200">Login</Button>
                                    </Link>
                                    <Link href="/signup" className="w-full">
                                        <Button className="w-full h-14 rounded-2xl font-bold bg-primary uppercase tracking-widest text-xs">Get Started</Button>
                                    </Link>
                                </>
                            )
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}
