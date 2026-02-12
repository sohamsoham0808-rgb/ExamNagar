"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Search, ChevronDown, Bell, LayoutGrid, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Logo } from "@/components/ui/Logo"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth/AuthProvider"
import { logout } from "@/actions/auth"
import { useRouter } from "next/navigation"

export function Navbar() {
    const { user, loading } = useAuth()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLogout = async () => {
        await logout()
        router.refresh()
        setIsMenuOpen(false)
    }

    const navLinks = [
        { name: "Courses", href: "/courses" },
        { name: "Live Classes", href: "/live-classes" },
        { name: "Tests", href: "/tests" },
        { name: "Books", href: "/books" },
    ]

    return (
        <nav className={cn(
            "sticky top-0 z-50 transition-all duration-300",
            scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-white py-4"
        )}>
            <div className="container mx-auto px-4 flex items-center justify-between h-16">
                {/* Logo Section */}
                <div className="flex items-center gap-10">
                    <Link href="/">
                        <Logo className="h-10 w-auto" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                        <Search size={20} />
                    </button>

                    <button className="hidden sm:block p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    <div className="h-8 w-[1px] bg-slate-200 hidden sm:block mx-1"></div>

                    {loading ? (
                        <div className="w-10 h-10 bg-slate-100 animate-pulse rounded-full"></div>
                    ) : user ? (
                        <div className="group relative">
                            <button className="flex items-center gap-2 hover:bg-slate-50 p-1.5 rounded-full transition-all border border-transparent hover:border-slate-200">
                                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
                                    {user.displayName ? user.displayName[0].toUpperCase() : (user.email ? user.email[0].toUpperCase() : 'U')}
                                </div>
                                <ChevronDown size={14} className="text-slate-400 group-hover:rotate-180 transition-transform hidden sm:block" />
                            </button>

                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all py-2 scale-95 group-hover:scale-100 z-[60]">
                                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Signed in as</p>
                                    <p className="text-sm font-semibold text-slate-900 truncate">{user.email}</p>
                                </div>
                                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 font-medium">
                                    <LayoutGrid size={16} /> Dashboard
                                </Link>
                                <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 font-medium">
                                    <User size={16} /> Profile Settings
                                </Link>
                                <div className="h-[1px] bg-slate-50 my-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                                >
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="hidden sm:flex font-bold">Login</Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="sm" className="font-bold">Sign Up</Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-2xl p-6 space-y-4 animate-in slide-in-from-top duration-300 z-50">
                    <div className="space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    {!user && !loading && (
                        <div className="pt-4 border-t border-slate-50 flex flex-col gap-3">
                            <Link href="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="outline" className="w-full h-12 rounded-xl font-bold">Sign In</Button>
                            </Link>
                            <Link href="/signup" className="w-full" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full h-12 rounded-xl font-bold">Get Started Free</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}
