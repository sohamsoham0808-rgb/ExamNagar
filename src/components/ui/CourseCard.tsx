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
    const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

    return (
        <Card className="group bg-white border border-slate-200 hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full rounded-xl overflow-hidden">
            {/* Image Section - 16:9 Ratio */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 flex gap-2">
                    {course.isBestseller && (
                        <Badge className="bg-accent text-accent-foreground font-bold border-none px-2 py-0.5 text-[10px] uppercase tracking-wider">
                            Bestseller
                        </Badge>
                    )}
                    {isFree && (
                        <Badge className="bg-secondary text-secondary-foreground font-bold border-none px-2 py-0.5 text-[10px] uppercase tracking-wider">
                            Free
                        </Badge>
                    )}
                </div>

                <div className="absolute bottom-3 right-3">
                    <div className="bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded text-[10px] font-medium flex items-center gap-1">
                        <Clock size={12} /> {course.duration}
                    </div>
                </div>
            </div>

            <CardContent className="p-4 flex flex-col grow">
                <div className="mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{course.category}</span>
                </div>

                <h3 className="font-bold text-base mb-2 leading-snug text-slate-900 line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
                    {course.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                    <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=random`}
                        className="w-5 h-5 rounded-full"
                        alt={course.instructor}
                    />
                    <span className="text-xs text-slate-500 font-medium">{course.instructor}</span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-700 px-2 py-0.5 rounded font-bold text-[10px]">
                        <Star size={12} fill="currentColor" /> {course.rating}
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">({course.reviews.toLocaleString()} reviews)</span>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-bold text-slate-900">
                                {isFree ? "Free" : `₹${course.price}`}
                            </span>
                            {!isFree && (
                                <span className="text-slate-400 text-xs line-through font-medium">₹{course.originalPrice}</span>
                            )}
                        </div>
                        {!isFree && (
                            <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                                {discount}% Off
                            </span>
                        )}
                    </div>

                    <Link href={`/courses/${course.id}`}>
                        <Button size="sm" className="h-9 font-bold">
                            Enroll Now
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
