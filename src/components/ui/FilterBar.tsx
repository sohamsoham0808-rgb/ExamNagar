"use client"

import { cn } from "@/lib/utils"

interface FilterBarProps {
    categories: string[];
    selected: string;
    onSelect: (category: string) => void;
}

export function FilterBar({ categories, selected, onSelect }: FilterBarProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-8 items-center overflow-x-auto pb-2 scrollbar-hide">
            <button
                onClick={() => onSelect('All')}
                className={cn(
                    "px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border",
                    selected === 'All'
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white text-slate-600 border-slate-200 hover:border-primary/50"
                )}
            >
                All Courses
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={cn(
                        "px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border",
                        selected === category
                            ? "bg-primary text-white border-primary shadow-md"
                            : "bg-white text-slate-600 border-slate-200 hover:border-primary/50"
                    )}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}
