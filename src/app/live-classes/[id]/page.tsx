import { StealthPlayer } from "@/components/live/StealthPlayer"
import { MessageSquare, Heart, Share2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"
import { getLiveClass } from "@/actions/live"
import { notFound } from "next/navigation"

export default async function StudentLivePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const session = await getLiveClass(params.id)

    if (!session) {
        notFound()
    }

    const activeVideoId = session.videoId || "jfKfPfyJRdk"

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
            <div className="max-w-[1800px] mx-auto grid lg:grid-cols-4 gap-6 p-4 md:p-6 lg:h-screen lg:overflow-hidden">
                {/* Main Player Section */}
                <div className="lg:col-span-3 flex flex-col h-full space-y-4">
                    <div className="flex-1 min-h-[50vh] lg:min-h-0 bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/5 relative">
                        <StealthPlayer videoId={activeVideoId} title={session.title} isLive={true} />
                    </div>

                    {/* Session Info */}
                    <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <Badge className="bg-primary text-white border-none text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                                    {session.subject}
                                </Badge>
                                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                                    Live Now
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-black font-outfit leading-tight">
                                {session.title}
                            </h1>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border-2 border-primary/20 bg-slate-800 flex items-center justify-center font-bold text-slate-400">
                                    {session.instructor?.name?.[0] || "T"}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{session.instructor?.name || "Instructor"}</p>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Top Educator</p>
                                </div>
                                <Button variant="outline" size="sm" className="ml-4 h-8 text-[10px] uppercase font-bold tracking-widest border-white/10 hover:bg-white/10 text-white rounded-lg">
                                    Follow
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button size="icon" variant="secondary" className="bg-white/5 hover:bg-white/10 text-white rounded-xl h-12 w-12 border border-white/5">
                                <Heart size={20} className="text-rose-500" />
                            </Button>
                            <Button size="icon" variant="secondary" className="bg-white/5 hover:bg-white/10 text-white rounded-xl h-12 w-12 border border-white/5">
                                <Share2 size={20} />
                            </Button>
                            <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest rounded-xl shadow-xl shadow-primary/20">
                                Enroll Now
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Sidebar (Chat & Resources) */}
                <div className="lg:col-span-1 bg-slate-900 rounded-3xl border border-white/5 flex flex-col overflow-hidden h-full">
                    {/* Tabs */}
                    <div className="flex border-b border-white/5 bg-black/20">
                        <button className="flex-1 py-4 text-center text-xs font-bold uppercase tracking-widest border-b-2 border-primary text-white bg-white/5">
                            Live Chat
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                        <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm">
                            <MessageSquare className="mb-2 opacity-50" />
                            <p>Chat is connecting...</p>
                        </div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 bg-black/20 border-t border-white/5 space-y-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Type your doubt here..."
                                className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary text-white placeholder:text-slate-600 pr-12"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                                <MessageSquare size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
