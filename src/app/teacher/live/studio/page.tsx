"use client"

import * as React from "react"
import {
    Pencil,
    Highlighter,
    Eraser,
    MousePointer2,
    Square,
    Circle,
    Triangle,
    Hexagon,
    Undo2,
    Redo2,
    Mic,
    MicOff,
    Video,
    VideoOff,
    MonitorPlay,
    StopCircle,
    MoreVertical,
    ChevronDown,
    Palette,
    Minus,
    Type,
    Image,
    Box,
    Cylinder,
    Cone,
    Pyramid,
    Play,
    Share2
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { createLiveClass, endLiveClass } from "@/actions/live"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"

type Tool = 'pen' | 'highlighter' | 'eraser' | 'select' |
    'rect' | 'circle' | 'ellipse' | 'triangle' | 'right_triangle' |
    'line' | 'arrow' | 'rhombus' | 'trapezoid' | 'pentagon' | 'hexagon' |
    'kite' | 'parallelogram' |
    'cube' | 'cylinder' | 'cone' | 'pyramid' | 'prism' | 'sphere'

interface Point { x: number; y: number }

interface DrawPath {
    tool: Tool
    points: Point[]
    color: string
    size: number
    opacity: number
    filled?: boolean
}

export default function WhiteboardStudio() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const isDrawing = React.useRef(false)
    const [history, setHistory] = React.useState<DrawPath[]>([])
    const [historyStep, setHistoryStep] = React.useState(-1)

    // Tools State
    const [activeTool, setActiveTool] = React.useState<Tool>('pen')
    const [strokeColor, setStrokeColor] = React.useState('#ffffff')
    const [strokeSize, setStrokeSize] = React.useState(2)
    const [isLive, setIsLive] = React.useState(false)
    const [micOn, setMicOn] = React.useState(true)
    const [camOn, setCamOn] = React.useState(true)
    const [timer, setTimer] = React.useState(0)
    const [showLiveModal, setShowLiveModal] = React.useState(false)
    const [youtubeUrl, setYoutubeUrl] = React.useState('')
    const [sessionTitle, setSessionTitle] = React.useState('')
    const [liveClassId, setLiveClassId] = React.useState<string | null>(null)
    const [sessionSubject, setSessionSubject] = React.useState('General')
    const [videoId, setVideoId] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)

    // Server Action

    // Current Path Ref for performance
    const currentPath = React.useRef<DrawPath | null>(null)

    // Setup Canvas
    React.useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            redrawCanvas()
        }
        window.addEventListener('resize', resize)
        resize()

        return () => window.removeEventListener('resize', resize)
    }, [history, historyStep])

    // Live Timer
    React.useEffect(() => {
        let interval: NodeJS.Timeout
        if (isLive) {
            interval = setInterval(() => setTimer(t => t + 1), 1000)
        }
        return () => clearInterval(interval)
    }, [isLive])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    // Drawing Logic
    const startDrawing = (e: React.PointerEvent) => {
        const canvas = canvasRef.current
        if (!canvas) return

        isDrawing.current = true
        const rect = canvas.getBoundingClientRect()
        const point = { x: e.clientX - rect.left, y: e.clientY - rect.top }

        currentPath.current = {
            tool: activeTool,
            points: [point],
            color: activeTool === 'eraser' ? '#0f172a' : strokeColor,
            size: activeTool === 'highlighter' ? 20 : strokeSize,
            opacity: activeTool === 'highlighter' ? 0.4 : 1
        }
    }

    const draw = (e: React.PointerEvent) => {
        if (!isDrawing.current || !currentPath.current) return
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const point = { x: e.clientX - rect.left, y: e.clientY - rect.top }

        // Setup Context
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        if (['pen', 'highlighter', 'eraser'].includes(activeTool)) {
            currentPath.current.points.push(point)
            redrawCanvas()

            // Draw current stroke live
            ctx.beginPath()
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.strokeStyle = currentPath.current.color
            ctx.lineWidth = currentPath.current.size
            ctx.globalAlpha = currentPath.current.opacity

            if (currentPath.current.points.length > 2) {
                const points = currentPath.current.points
                ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y)
                ctx.lineTo(point.x, point.y)
                ctx.stroke()
            }
        } else {
            // Shape Preview
            currentPath.current.points[1] = point // Update end point
            redrawCanvas()
            drawShape(ctx, currentPath.current)
        }
    }

    const stopDrawing = () => {
        if (!isDrawing.current || !currentPath.current) return
        isDrawing.current = false

        const newHistory = history.slice(0, historyStep + 1)
        newHistory.push(currentPath.current)
        setHistory(newHistory)
        setHistoryStep(newHistory.length - 1)
        currentPath.current = null
    }

    const redrawCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw History
        const pathsToDraw = history.slice(0, historyStep + 1)
        pathsToDraw.forEach(path => drawShape(ctx, path))
    }

    const drawShape = (ctx: CanvasRenderingContext2D, path: DrawPath) => {
        ctx.beginPath()
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.strokeStyle = path.color
        ctx.lineWidth = path.size
        ctx.globalAlpha = path.opacity

        if (['pen', 'highlighter', 'eraser'].includes(path.tool)) {
            if (path.points.length < 2) return
            ctx.moveTo(path.points[0].x, path.points[0].y)
            path.points.forEach((p, i) => {
                if (i > 0) ctx.lineTo(p.x, p.y)
            })
            ctx.stroke()
        } else {
            const start = path.points[0]
            const end = path.points[1] || start
            const w = end.x - start.x
            const h = end.y - start.y

            if (path.tool === 'rect') {
                ctx.rect(start.x, start.y, w, h)
            } else if (path.tool === 'circle') {
                const r = Math.sqrt(w * w + h * h)
                ctx.arc(start.x, start.y, r, 0, 2 * Math.PI)
            } else if (path.tool === 'ellipse') {
                ctx.ellipse(start.x + w / 2, start.y + h / 2, Math.abs(w / 2), Math.abs(h / 2), 0, 0, 2 * Math.PI)
            } else if (path.tool === 'triangle') {
                ctx.moveTo(start.x + w / 2, start.y)
                ctx.lineTo(start.x, start.y + h)
                ctx.lineTo(start.x + w, start.y + h)
                ctx.closePath()
            } else if (path.tool === 'right_triangle') {
                ctx.moveTo(start.x, start.y)
                ctx.lineTo(start.x, start.y + h)
                ctx.lineTo(start.x + w, start.y + h)
                ctx.closePath()
            } else if (path.tool === 'rhombus') {
                ctx.moveTo(start.x + w / 2, start.y)
                ctx.lineTo(start.x + w, start.y + h / 2)
                ctx.lineTo(start.x + w / 2, start.y + h)
                ctx.lineTo(start.x, start.y + h / 2)
                ctx.closePath()
            } else if (path.tool === 'arrow') {
                // Simple arrow logic
                const headlen = 20
                const angle = Math.atan2(h, w)
                ctx.moveTo(start.x, start.y)
                ctx.lineTo(end.x, end.y)
                ctx.lineTo(end.x - headlen * Math.cos(angle - Math.PI / 6), end.y - headlen * Math.sin(angle - Math.PI / 6))
                ctx.moveTo(end.x, end.y)
                ctx.lineTo(end.x - headlen * Math.cos(angle + Math.PI / 6), end.y - headlen * Math.sin(angle + Math.PI / 6))
            } else if (path.tool === 'cube') {
                // 3D Wireframe Cube
                const d = Math.min(Math.abs(w), Math.abs(h)) / 4
                ctx.rect(start.x, start.y + d, w - d, h - d) // Front
                ctx.rect(start.x + d, start.y, w - d, h - d) // Back
                // Connectors
                ctx.moveTo(start.x, start.y + d); ctx.lineTo(start.x + d, start.y)
                ctx.moveTo(start.x + w - d, start.y + d); ctx.lineTo(start.x + w, start.y)
                ctx.moveTo(start.x, start.y + h); ctx.lineTo(start.x + d, start.y + h - d)
                ctx.moveTo(start.x + w - d, start.y + h); ctx.lineTo(start.x + w, start.y + h - d)
            } else if (path.tool === 'cylinder') {
                // 3D Cylinder
                const rx = w / 2
                const ry = w / 6
                ctx.ellipse(start.x + rx, start.y + ry, Math.abs(rx), Math.abs(ry), 0, 0, 2 * Math.PI) // Top
                ctx.ellipse(start.x + rx, start.y + h - ry, Math.abs(rx), Math.abs(ry), 0, 0, Math.PI) // Bottom half
                ctx.moveTo(start.x, start.y + ry)
                ctx.lineTo(start.x, start.y + h - ry)
                ctx.moveTo(start.x + w, start.y + ry)
                ctx.lineTo(start.x + w, start.y + h - ry)
            } else if (path.tool === 'cone') {
                // 3D Cone
                const rx = w / 2
                const ry = w / 6
                ctx.ellipse(start.x + rx, start.y + h - ry, Math.abs(rx), Math.abs(ry), 0, 0, 2 * Math.PI) // Base
                ctx.moveTo(start.x, start.y + h - ry)
                ctx.lineTo(start.x + rx, start.y) // Left side
                ctx.lineTo(start.x + w, start.y + h - ry) // Right side
            } else if (path.tool === 'pyramid') {
                // 3D Square Pyramid
                const cx = start.x + w / 2
                const cy = start.y + h / 2
                ctx.rect(start.x, start.y + h - h / 4, w, h / 4) // Base preview (flat rect for now)
                ctx.moveTo(start.x, start.y + h)
                ctx.lineTo(cx, start.y) // Front left edge
                ctx.lineTo(start.x + w, start.y + h) // Front right edge
                ctx.moveTo(start.x, start.y + h - h / 4)
                ctx.lineTo(cx, start.y) // Back left edge
                ctx.lineTo(start.x + w, start.y + h - h / 4) // Back right edge
            } else if (path.tool === 'prism') {
                // Triangular Prism
                const d = w / 4
                // Front triangle
                ctx.moveTo(start.x, start.y + h)
                ctx.lineTo(start.x + w - d, start.y + h)
                ctx.lineTo(start.x + (w - d) / 2, start.y + d)
                ctx.closePath()

                // Back triangle (offset)
                ctx.moveTo(start.x + d, start.y + h - d)
                ctx.lineTo(start.x + w, start.y + h - d)
                ctx.lineTo(start.x + d + (w - d) / 2, start.y)
                // ctx.closePath() // Don't close, just edges

                // Connecting edges
                ctx.moveTo(start.x, start.y + h); ctx.lineTo(start.x + d, start.y + h - d)
                ctx.moveTo(start.x + w - d, start.y + h); ctx.lineTo(start.x + w, start.y + h - d)
                ctx.moveTo(start.x + (w - d) / 2, start.y + d); ctx.lineTo(start.x + d + (w - d) / 2, start.y)
            } else if (path.tool === 'trapezoid') {
                const inset = w / 4
                ctx.moveTo(start.x + inset, start.y)
                ctx.lineTo(start.x + w - inset, start.y)
                ctx.lineTo(start.x + w, start.y + h)
                ctx.lineTo(start.x, start.y + h)
                ctx.closePath()
            } else if (path.tool === 'parallelogram') {
                const skew = w / 4
                ctx.moveTo(start.x + skew, start.y)
                ctx.lineTo(start.x + w, start.y)
                ctx.lineTo(start.x + w - skew, start.y + h)
                ctx.lineTo(start.x, start.y + h)
                ctx.closePath()
            } else if (path.tool === 'kite') {
                ctx.moveTo(start.x + w / 2, start.y)
                ctx.lineTo(start.x + w, start.y + h / 3)
                ctx.lineTo(start.x + w / 2, start.y + h)
                ctx.lineTo(start.x, start.y + h / 3)
                ctx.closePath()
            } else if (path.tool === 'pentagon') {
                // Regular Pentagon approximation
                const cx = start.x + w / 2
                const cy = start.y + h / 2
                const r = Math.min(w, h) / 2
                for (let i = 0; i < 5; i++) {
                    const angle = (i * 2 * Math.PI / 5) - Math.PI / 2
                    const x = cx + r * Math.cos(angle)
                    const y = cy + r * Math.sin(angle)
                    if (i === 0) ctx.moveTo(x, y)
                    else ctx.lineTo(x, y)
                }
                ctx.closePath()
            } else if (path.tool === 'hexagon') {
                const cx = start.x + w / 2
                const cy = start.y + h / 2
                const r = Math.min(w, h) / 2
                for (let i = 0; i < 6; i++) {
                    const angle = (i * 2 * Math.PI / 6) - Math.PI / 2
                    const x = cx + r * Math.cos(angle)
                    const y = cy + r * Math.sin(angle)
                    if (i === 0) ctx.moveTo(x, y)
                    else ctx.lineTo(x, y)
                }
                ctx.closePath()
            } else if (path.tool === 'sphere') {
                const r = Math.min(w, h) / 2
                const cx = start.x + w / 2
                const cy = start.y + h / 2
                // Main circle
                ctx.arc(cx, cy, r, 0, 2 * Math.PI)
                // Equator
                ctx.moveTo(cx + r, cy)
                ctx.ellipse(cx, cy, r, r / 3, 0, 0, 2 * Math.PI)
                // Meridian
                ctx.moveTo(cx, cy - r)
                ctx.ellipse(cx, cy, r / 3, r, 0, 0, 2 * Math.PI)
            }

            ctx.stroke()
        }
    }

    const undo = () => setHistoryStep(prev => Math.max(-1, prev - 1))
    const redo = () => setHistoryStep(prev => Math.min(history.length - 1, prev + 1))

    const handleGoLive = async () => {
        setIsLoading(true)
        // Simple regex to extract ID
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = youtubeUrl.match(regExp)
        const extractedId = (match && match[2].length === 11) ? match[2] : (youtubeUrl.length === 11 ? youtubeUrl : null)

        if (!extractedId) {
            alert("Invalid YouTube URL or ID")
            setIsLoading(false)
            return
        }

        if (!sessionTitle) {
            alert("Please enter a session title")
            setIsLoading(false)
            return
        }

        try {
            const liveClass = await createLiveClass({
                title: sessionTitle,
                description: "Live Session started from Studio",
                subject: "General",
                youtubeId: extractedId,
                tags: "Live,Studio"
            })

            setVideoId(extractedId)
            setLiveClassId(liveClass.id)
            setIsLive(true)
            setShowLiveModal(false)

            // Start timer
            const interval = setInterval(() => setTimer(t => t + 1), 1000)
        } catch (error) {
            console.error(error)
            alert("Failed to go live. Ensure you are logged in as a teacher.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleEndStream = async () => {
        if (confirm("Are you sure you want to end the stream?")) {
            if (liveClassId) {
                try {
                    await endLiveClass(liveClassId)
                } catch (e) {
                    console.error("Failed to end class in DB", e)
                }
            }
            setIsLive(false)
            setTimer(0)
            setVideoId('')
            setYoutubeUrl('')
            setLiveClassId(null)
        }
    }

    return (
        <div className="h-screen w-full bg-slate-950 text-white overflow-hidden flex flex-col relative font-sans">
            {/* Top Bar - Controls */}
            <div className="h-16 border-b border-white/10 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6 z-20">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <MonitorPlay className="text-primary" />
                        <span className="font-black font-outfit uppercase tracking-tighter text-lg">Studio <span className="text-primary">Pro</span></span>
                    </div>
                    <div className="h-6 w-px bg-white/10 mx-2" />
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
                        <Button variant="ghost" size="icon" onClick={undo} disabled={historyStep < 0} className="h-8 w-8 text-slate-400 hover:text-white"><Undo2 size={16} /></Button>
                        <Button variant="ghost" size="icon" onClick={redo} disabled={historyStep >= history.length - 1} className="h-8 w-8 text-slate-400 hover:text-white"><Redo2 size={16} /></Button>
                    </div>
                </div>

                {/* Center Toolbar */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900 border border-white/10 p-1.5 rounded-2xl shadow-2xl">
                    {[
                        { id: 'select', icon: MousePointer2 },
                        { id: 'pen', icon: Pencil },
                        { id: 'highlighter', icon: Highlighter },
                        { id: 'eraser', icon: Eraser },
                    ].map(tool => (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id as Tool)}
                            className={cn(
                                "h-10 w-10 flex items-center justify-center rounded-xl transition-all",
                                activeTool === tool.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <tool.icon size={20} />
                        </button>
                    ))}
                    <div className="w-px h-6 bg-white/10 mx-2" />
                    <div className="flex items-center gap-2">
                        <button onClick={() => setStrokeColor('#ffffff')} className={cn("w-6 h-6 rounded-full border-2", strokeColor === '#ffffff' ? "border-primary" : "border-transparent bg-white")} />
                        <button onClick={() => setStrokeColor('#f43f5e')} className={cn("w-6 h-6 rounded-full bg-rose-500 border-2", strokeColor === '#f43f5e' ? "border-white" : "border-transparent")} />
                        <button onClick={() => setStrokeColor('#3b82f6')} className={cn("w-6 h-6 rounded-full bg-blue-500 border-2", strokeColor === '#3b82f6' ? "border-white" : "border-transparent")} />
                        <button onClick={() => setStrokeColor('#eab308')} className={cn("w-6 h-6 rounded-full bg-yellow-500 border-2", strokeColor === '#eab308' ? "border-white" : "border-transparent")} />
                        <button onClick={() => setStrokeColor('#22c55e')} className={cn("w-6 h-6 rounded-full bg-green-500 border-2", strokeColor === '#22c55e' ? "border-white" : "border-transparent")} />
                    </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-3">
                    {isLive && (
                        <Badge className="bg-red-500 animate-pulse text-white border-none font-black px-3 py-1 uppercase tracking-widest text-[10px]">
                            REC {formatTime(timer)}
                        </Badge>
                    )}
                    <Button
                        onClick={() => isLive ? handleEndStream() : setShowLiveModal(true)}
                        className={cn(
                            "h-9 px-6 font-black uppercase tracking-widest text-[10px] rounded-lg transition-all",
                            isLive ? "bg-red-500 hover:bg-red-600 text-white" : "bg-emerald-500 hover:bg-emerald-600 text-white"
                        )}
                    >
                        {isLive ? "End Stream" : "Go Live"}
                    </Button>
                    <div className="flex gap-1">
                        {isLive && liveClassId && (
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-9 w-9 rounded-lg text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20"
                                onClick={() => window.open(`/live-classes/${liveClassId}`, '_blank')}
                                title="Open Student View"
                            >
                                <Share2 size={18} />
                            </Button>
                        )}
                        <Button size="icon" variant="ghost" className={cn("h-9 w-9 rounded-lg", !micOn && "text-red-500 bg-red-500/10")} onClick={() => setMicOn(!micOn)}>
                            {micOn ? <Mic size={18} /> : <MicOff size={18} />}
                        </Button>
                        <Button size="icon" variant="ghost" className={cn("h-9 w-9 rounded-lg", !camOn && "text-red-500 bg-red-500/10")} onClick={() => setCamOn(!camOn)}>
                            {camOn ? <Video size={18} /> : <VideoOff size={18} />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Canvas Area */}
            <div className="flex-1 relative bg-[#0f172a] cursor-crosshair touch-none">
                {/* Shapes Sidebar */}
                <div className="absolute left-4 top-4 bottom-4 w-16 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col items-center py-4 gap-4 z-10 overflow-y-auto no-scrollbar shadow-2xl">
                    <div className="text-[9px] font-black uppercase text-slate-500 tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>Shapes Library</div>
                    {[
                        { id: 'rect', icon: Square, label: "Rectangle" },
                        { id: 'circle', icon: Circle, label: "Circle" },
                        { id: 'triangle', icon: Triangle, label: "Triangle" },
                        { id: 'right_triangle', icon: Play, label: "Right Angle", className: "rotate-[-90deg]" },
                        { id: 'rhombus', icon: Hexagon, label: "Rhombus", className: "rotate-45 scale-y-110" },
                        { id: 'trapezoid', icon: Box, label: "Trapezoid", className: "rotate-180" }, // Using Box as placeholder, CSS rotate
                        { id: 'parallelogram', icon: Square, label: "Parallelogram", className: "skew-x-12" },
                        { id: 'kite', icon: Hexagon, label: "Kite", className: "scale-x-75 scale-y-125" },
                        { id: 'prism', icon: Cylinder, label: "Prism" },
                        { id: 'arrow', icon: Minus, label: "Arrow" },
                        { id: 'pentagon', icon: Hexagon, label: "Pentagon" },
                        { id: 'hexagon', icon: Hexagon, label: "Hexagon" },
                        { id: 'cube', icon: Box, label: "Cube" },
                        { id: 'cylinder', icon: Cylinder, label: "Cylinder" },
                        { id: 'cone', icon: Cone, label: "Cone" },
                        { id: 'pyramid', icon: Pyramid, label: "Pyramid" },
                    ].map(shape => (
                        <button
                            key={shape.id}
                            onClick={() => setActiveTool(shape.id as Tool)}
                            className={cn(
                                "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all group relative",
                                activeTool === shape.id ? "bg-primary text-white" : "text-slate-400 hover:text-white hover:bg-white/10"
                            )}
                        >
                            <shape.icon size={20} className={shape.className} />
                            <span className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                {shape.label}
                            </span>
                        </button>
                    ))}
                </div>

                <canvas
                    ref={canvasRef}
                    onPointerDown={startDrawing}
                    onPointerMove={draw}
                    onPointerUp={stopDrawing}
                    onPointerLeave={stopDrawing}
                    className="absolute inset-0 w-full h-full"
                />
            </div>

            {/* YouTube Live Configuration Modal */}
            {showLiveModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl space-y-6">
                        <div className="space-y-2 text-center">
                            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Video size={32} className="text-red-500" />
                            </div>
                            <h2 className="text-2xl font-black font-outfit uppercase tracking-tighter">Go Live on YouTube</h2>
                            <p className="text-slate-400 text-sm">Enter your Private Video URL or ID to start streaming.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Session Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Algebra Marathon"
                                    value={sessionTitle}
                                    onChange={(e) => setSessionTitle(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary transition-colors text-white placeholder:text-slate-600"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">YouTube URL / Video ID</label>
                                <input
                                    type="text"
                                    placeholder="https://youtu.be/..."
                                    value={youtubeUrl}
                                    onChange={(e) => setYoutubeUrl(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary transition-colors text-white placeholder:text-slate-600"
                                />
                            </div>
                            <Button
                                onClick={handleGoLive}
                                disabled={!youtubeUrl || isLoading}
                                className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest text-xs"
                            >
                                {isLoading ? "Verifying..." : "Start Broadcast"}
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => setShowLiveModal(false)}
                                className="w-full text-slate-500 hover:text-white"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
