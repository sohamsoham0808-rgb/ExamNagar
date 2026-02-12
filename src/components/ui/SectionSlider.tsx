"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface SectionSliderProps {
    children: React.ReactNode[]
    title?: string
    subtitle?: string
    className?: string
    itemClassName?: string
}

export function SectionSlider({
    children,
    title,
    subtitle,
    className,
    itemClassName
}: SectionSliderProps) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null)
    const [showLeftArrow, setShowLeftArrow] = React.useState(false)
    const [showRightArrow, setShowRightArrow] = React.useState(true)

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            setShowLeftArrow(scrollLeft > 0)
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    React.useEffect(() => {
        checkScroll()
        window.addEventListener('resize', checkScroll)
        return () => window.removeEventListener('resize', checkScroll)
    }, [])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            if (direction === 'right' && scrollLeft + clientWidth >= scrollWidth - 10) {
                scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
            } else {
                const scrollAmount = direction === 'left' ? -clientWidth : clientWidth
                scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
            }
        }
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
            scroll('right')
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className={cn("space-y-8 relative group", className)}>
            {(title || subtitle) && (
                <div className="flex items-end justify-between px-4">
                    <div className="space-y-2">
                        {title && <h2 className="text-3xl md:text-5xl font-black font-outfit text-slate-900 uppercase tracking-tighter leading-none">{title}</h2>}
                        {subtitle && <p className="text-slate-500 font-medium text-sm md:text-base">{subtitle}</p>}
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            className={cn(
                                "h-12 w-12 rounded-2xl border-slate-200 transition-all duration-300",
                                !showLeftArrow ? "opacity-30 cursor-not-allowed" : "hover:bg-primary hover:text-white hover:border-primary active:scale-90"
                            )}
                            onClick={() => scroll('left')}
                            disabled={!showLeftArrow}
                        >
                            <ChevronLeft size={24} />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className={cn(
                                "h-12 w-12 rounded-2xl border-slate-200 transition-all duration-300",
                                !showRightArrow ? "opacity-30 cursor-not-allowed" : "hover:bg-primary hover:text-white hover:border-primary active:scale-90"
                            )}
                            onClick={() => scroll('right')}
                            disabled={!showRightArrow}
                        >
                            <ChevronRight size={24} />
                        </Button>
                    </div>
                </div>
            )}

            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-4 py-8"
            >
                {React.Children.map(children, (child) => (
                    <div className={cn("shrink-0 w-[85%] sm:w-[45%] lg:w-[31%] transition-all", itemClassName)}>
                        {child}
                    </div>
                ))}
            </div>

            {/* Gradient Indicators for Desktop */}
            <div className={cn(
                "absolute left-0 top-20 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none transition-opacity duration-300",
                showLeftArrow ? "opacity-100" : "opacity-0"
            )} />
            <div className={cn(
                "absolute right-0 top-20 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none transition-opacity duration-300",
                showRightArrow ? "opacity-100" : "opacity-0"
            )} />
        </div>
    )
}
