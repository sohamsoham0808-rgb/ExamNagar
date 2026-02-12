import React from 'react'
import { GraduationCap } from 'lucide-react'

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    theme?: 'dark' | 'light';
}

export function Logo({ className, size = 'md', theme = 'dark' }: LogoProps) {
    const sizes = {
        sm: 'h-8 text-lg',
        md: 'h-10 text-2xl',
        lg: 'h-14 text-4xl'
    }

    const iconSizes = {
        sm: 18,
        md: 24,
        lg: 36
    }

    return (
        <div className={`flex items-center gap-3 select-none group ${className}`}>
            <div className={`
        relative flex items-center justify-center rounded-xl overflow-hidden
        ${size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-10 h-10' : 'w-14 h-14'}
        bg-gradient-to-br from-primary via-primary to-indigo-900
        shadow-lg shadow-primary/20 transition-all duration-500
        group-hover:shadow-primary/40 group-hover:-translate-y-0.5
      `}>
                {/* Abstract Geometric Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50" />
                <div className="absolute top-0 left-0 w-full h-full bg-white/5 group-hover:bg-white/10 transition-colors" />

                {/* Icon */}
                <GraduationCap
                    className="text-white relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    size={iconSizes[size]}
                    strokeWidth={2.5}
                />

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            <div className="flex flex-col leading-none">
                <span className={`
          font-black tracking-tight font-outfit uppercase
          ${sizes[size].split(' ')[1]}
          ${theme === 'dark' ? 'text-slate-900' : 'text-white'}
        `}>
                    Exam<span className="text-primary italic">Nagar</span>
                </span>
                <span className={`
          font-bold tracking-[0.2em] uppercase
          ${size === 'sm' ? 'text-[8px]' : size === 'md' ? 'text-[10px]' : 'text-[14px]'}
          ${theme === 'dark' ? 'text-slate-400' : 'text-white/60'}
        `}>
                    Future-Ready Learning
                </span>
            </div>
        </div>
    )
}
