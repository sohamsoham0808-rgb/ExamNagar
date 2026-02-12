"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Play, Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const SLIDES = [
    {
        title: "Learn from India's Best Teachers",
        subtitle: "Access 500+ premium courses for SSC, Banking, and Railway exams with personalized mentorship.",
        cta: "Explore Courses",
        href: "/courses",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200",
        badge: "Limited Time Offer: 50% OFF"
    },
    {
        title: "Daily Free Mock Tests & Analytics",
        subtitle: "India's smartest test series with real-time feedback and AI-powered performance tracking.",
        cta: "Try Free Mock",
        href: "/tests",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200",
        badge: "Join 50k+ Aspirants"
    },
    {
        title: "Doubt Clearing Sessions Every Hour",
        subtitle: "Never let a doubt stop your growth. Connect with experts instantly 24/7.",
        cta: "Join Live Class",
        href: "/live-classes",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
        badge: "Certified Educators"
    }
]

export function HomeHeroSlider() {
    const [current, setCurrent] = React.useState(0)
    const [isAnimating, setIsAnimating] = React.useState(false)

    const next = React.useCallback(() => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrent((prev) => (prev + 1) % SLIDES.length)
        setTimeout(() => setIsAnimating(false), 800)
    }, [isAnimating])

    const prev = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
        setTimeout(() => setIsAnimating(false), 800)
    }

    React.useEffect(() => {
        const timer = setInterval(next, 6000)
        return () => clearInterval(timer)
    }, [next])

    return (
        <section className="relative h-[650px] lg:h-[750px] overflow-hidden bg-slate-900">
            {SLIDES.map((slide, index) => (
                <div
                    key={index}
                    className={cn(
                        "absolute inset-0 transition-all duration-1000 ease-in-out",
                        index === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-110 pointer-events-none"
                    )}
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                        <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-20 container mx-auto h-full flex items-center px-4 md:px-8">
                        <div className="max-w-2xl space-y-8">
                            <div className={cn(
                                "inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase backdrop-blur-md transition-all duration-700 delay-300 transform",
                                index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            )}>
                                <Sparkles size={14} className="text-accent" />
                                {slide.badge}
                            </div>

                            <h1 className={cn(
                                "text-4xl md:text-6xl lg:text-7xl font-black font-outfit text-white leading-tight uppercase tracking-tighter transition-all duration-1000 delay-500 transform",
                                index === current ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                            )}>
                                {slide.title.split(' ').map((word, i) => (
                                    <span key={i} className={i % 2 === 1 ? "gradient-text" : ""}>{word} </span>
                                ))}
                            </h1>

                            <p className={cn(
                                "text-lg text-slate-300 leading-relaxed max-w-xl font-medium transition-all duration-700 delay-700 transform",
                                index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            )}>
                                {slide.subtitle}
                            </p>

                            <div className={cn(
                                "flex flex-wrap gap-4 transition-all duration-700 delay-1000 transform",
                                index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            )}>
                                <Link href={slide.href}>
                                    <Button size="lg" className="h-14 px-8 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/20 bg-primary group">
                                        {slide.cta} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                                    </Button>
                                </Link>
                                <Button variant="outline" className="h-14 px-8 rounded-2xl text-xs font-black uppercase tracking-widest border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                                    <Play className="mr-2" size={16} fill="white" /> Watch Demo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Controls */}
            <div className="absolute bottom-12 right-4 md:right-12 z-30 flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-primary hover:border-primary transition-all backdrop-blur-md"
                    onClick={prev}
                >
                    <ChevronLeft size={24} />
                </Button>
                <div className="flex gap-2">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-500",
                                i === current ? "w-12 bg-primary" : "w-3 bg-white/20 hover:bg-white/40"
                            )}
                        />
                    ))}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-primary hover:border-primary transition-all backdrop-blur-md"
                    onClick={next}
                >
                    <ChevronRight size={24} />
                </Button>
            </div>

            {/* Social Proof Overlay */}
            <div className="absolute top-36 right-12 z-30 hidden lg:block animate-in fade-in zoom-in duration-1000 delay-1000">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl">
                    <div className="flex -space-x-3 mb-4">
                        {[1, 2, 3, 4].map((i) => (
                            <img key={i} src={`https://i.pravatar.cc/100?u=v${i}`} className="w-10 h-10 rounded-full border-2 border-slate-900" alt="Student" />
                        ))}
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-[10px] font-black text-white border-2 border-slate-900">50K+</div>
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                    </div>
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Top Rated Platform</p>
                </div>
            </div>
        </section>
    )
}
