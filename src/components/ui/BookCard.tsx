import Link from "next/link"
import { BookOpen, BookText, ShoppingCart, Eye, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"

export interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    originalPrice: number;
    thumbnail: string;
    category: string;
    demoUrl: string;
    type: "Physical" | "Ebook";
}

export function BookCard({ book }: { book: Book }) {
    const isEbook = book.type === "Ebook";

    return (
        <Card className="group hover:shadow-[0_40px_80px_rgba(30,27,75,0.15)] transition-all duration-700 flex flex-col h-full border-slate-100 bg-white overflow-hidden rounded-[2.5rem]">
            <div className="relative aspect-[3/4.2] overflow-hidden bg-slate-50">
                <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="absolute top-4 left-4">
                    <Badge className={`${isEbook ? 'bg-indigo-600' : 'bg-primary'} text-white border-none shadow-2xl px-4 py-1.5 rounded-full font-black text-[8px] tracking-[0.1em] uppercase`}>
                        {book.type}
                    </Badge>
                </div>

                <div className="absolute inset-0 flex items-center justify-center gap-3 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-10">
                    <Link href={book.demoUrl}>
                        <Button size="icon" className="w-12 h-12 rounded-2xl bg-white text-primary hover:bg-slate-50 shadow-2xl transition-transform active:scale-90">
                            <Eye size={20} />
                        </Button>
                    </Link>
                </div>
            </div>

            <CardContent className="p-6 flex flex-col grow">
                <div className="mb-4">
                    <div className="flex items-center gap-1 text-accent mb-2">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                    </div>
                    <h3 className="font-black text-lg mb-2 leading-tight text-slate-900 group-hover:text-primary transition-colors cursor-pointer line-clamp-2 font-outfit uppercase tracking-tighter">
                        {book.title}
                    </h3>
                    <p className="text-slate-400 text-[10px] font-bold italic truncate">By {book.author}</p>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex flex-col">
                            <span className="text-xl font-black font-outfit text-primary tracking-tighter">₹{book.price}</span>
                            <span className="text-slate-300 text-[10px] line-through font-bold">₹{book.originalPrice}</span>
                        </div>
                        <div className="text-accent text-[9px] font-black bg-accent/10 px-3 py-1.5 rounded-lg uppercase tracking-widest">
                            -{Math.round((1 - book.price / book.originalPrice) * 100)}%
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Link href={book.demoUrl} className="w-full">
                            <Button variant="outline" className="w-full h-11 rounded-xl font-black uppercase tracking-widest text-[9px] border-slate-200 hover:bg-slate-50 group/btn transition-all px-0">
                                <BookOpen size={14} className="mr-1.5 text-primary group-hover/btn:scale-110 transition-transform" /> Demo
                            </Button>
                        </Link>
                        <Button className="w-full h-11 rounded-xl font-black uppercase tracking-widest text-[9px] bg-primary text-white hover:bg-indigo-900 shadow-xl shadow-primary/20 group/btn transition-all px-0">
                            <ShoppingCart size={14} className="mr-1.5 group-hover/btn:scale-110 transition-transform" /> Buy
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
