import Link from "next/link"
import { Star, Clock, Users, Play, Lock, CheckCircle2, ShieldCheck, Zap, ArrowRight, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export interface Course {
    id: string;
    title: string;
    instructor: string;
    rating: number;
    reviews: number;
    students: string;
    duration: string;
    price: number;
    originalPrice: number;
    thumbnail: string;
    category: string;
    isBestseller?: boolean;
    isFree?: boolean;
}

export function CourseCard({ course }: { course: Course }) {
    const isFree = course.price === 0 || course.isFree;

    return (
        <Card className="group relative bg-white border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 flex flex-col h-full rounded-[2.5rem] overflow-hidden">
            {/* Image Section with Glassmorphism Overlay */}
            <div className="relative aspect-[4/3] overflow-hidden m-4 rounded-[2rem]">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {course.isBestseller && (
                        <div className="flex items-center gap-1.5 bg-accent text-white px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest shadow-2xl animate-pulse">
                            <Sparkles size={10} fill="currentColor" />
                            Elite Batch
                        </div>
                    )}
                    {isFree && (
                        <div className="bg-white/90 backdrop-blur-md text-primary px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest shadow-xl">
                            Foundation
                        </div>
                    )}
                </div>

                {/* Floating "Play Preview" Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white shadow-2xl">
                        <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-[9px] uppercase tracking-widest px-3 py-1">
                        {course.duration}
                    </Badge>
                </div>
            </div>

            <CardContent className="px-8 pb-8 pt-4 flex flex-col grow">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">{course.category}</span>
                    <div className="flex items-center gap-1 text-accent text-[10px] font-black uppercase tracking-widest">
                        <Star size={12} fill="currentColor" /> {course.rating}
                    </div>
                </div>

                <h3 className="font-black text-xl mb-2 leading-tight text-slate-900 group-hover:text-primary transition-colors line-clamp-2 font-outfit uppercase tracking-tighter">
                    {course.title}
                </h3>

                <p className="text-slate-400 text-xs mb-6 font-bold flex items-center gap-2">
                    <img src="https://i.pravatar.cc/100?u=instructor" className="w-5 h-5 rounded-full border border-slate-100" />
                    {course.instructor}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50 flex flex-col items-center justify-center gap-1 transition-all group-hover:bg-primary/5">
                        <Users size={16} className="text-primary/40" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{course.students} Learners</span>
                    </div>
                    <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50 flex flex-col items-center justify-center gap-1 transition-all group-hover:bg-primary/5">
                        <ShieldCheck size={16} className="text-accent/40" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Verified Content</span>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black font-outfit text-slate-900 tracking-tighter">
                                {isFree ? "FREE" : `₹${course.price}`}
                            </span>
                            {!isFree && <span className="text-slate-300 text-xs line-through font-bold">₹{course.originalPrice}</span>}
                        </div>
                        <p className="text-[9px] font-black uppercase text-emerald-500 tracking-widest mt-1">
                            {isFree ? "Secure Seat Now" : "75% Scholarship Applied"}
                        </p>
                    </div>

                    <Link href={`/courses/${course.id}`}>
                        <Button className={cn(
                            "h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 p-0 shadow-2xl",
                            isFree
                                ? "bg-slate-900 text-white hover:bg-black"
                                : "bg-primary text-white shadow-primary/20 hover:shadow-primary/40"
                        )}>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </CardContent>

            {/* Premium Decorator */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Card>
    )
}
