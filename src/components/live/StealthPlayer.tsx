"use client"

import * as React from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface StealthPlayerProps {
    videoId: string
    title?: string
    isLive?: boolean
}

declare global {
    interface Window {
        YT: any
        onYouTubeIframeAPIReady: () => void
    }
}

export function StealthPlayer({ videoId, title, isLive = false }: StealthPlayerProps) {
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [isMuted, setIsMuted] = React.useState(false)
    const [volume, setVolume] = React.useState(100)
    const [player, setPlayer] = React.useState<any>(null)
    const [showControls, setShowControls] = React.useState(true)
    const controlsTimeoutRef = React.useRef<NodeJS.Timeout>(null)
    const playerRef = React.useRef<HTMLDivElement>(null)

    // Load YouTube API
    React.useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script')
            tag.src = "https://www.youtube.com/iframe_api"
            const firstScriptTag = document.getElementsByTagName('script')[0]
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
        }

        window.onYouTubeIframeAPIReady = initializePlayer

        if (window.YT && window.YT.Player) {
            initializePlayer()
        }

        return () => {
            if (player) {
                player.destroy()
            }
        }
    }, [videoId])

    const initializePlayer = () => {
        if (player) return

        const newPlayer = new window.YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
                autoplay: 1,
                controls: 0, // Hide native controls
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                disablekb: 1,
                fs: 0,
                playsinline: 1
            },
            events: {
                onReady: (event: any) => {
                    setPlayer(event.target)
                    setIsPlaying(true)
                    event.target.playVideo()
                },
                onStateChange: (event: any) => {
                    setIsPlaying(event.data === window.YT.PlayerState.PLAYING)
                }
            }
        })
    }

    const togglePlay = () => {
        if (!player) return
        if (isPlaying) {
            player.pauseVideo()
        } else {
            player.playVideo()
        }
    }

    const toggleMute = () => {
        if (!player) return
        if (isMuted) {
            player.unMute()
            setVolume(player.getVolume())
        } else {
            player.mute()
        }
        setIsMuted(!isMuted)
    }

    const handleVolumeChange = (newVolume: number[]) => {
        if (!player) return
        const val = newVolume[0]
        setVolume(val)
        player.setVolume(val)
        if (val > 0 && isMuted) {
            player.unMute()
            setIsMuted(false)
        }
    }

    const toggleFullscreen = () => {
        if (!playerRef.current) return
        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            playerRef.current.requestFullscreen()
        }
    }

    const handleMouseMove = () => {
        setShowControls(true)
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) setShowControls(false)
        }, 3000)
    }

    return (
        <div
            ref={playerRef}
            className="relative w-full aspect-video bg-black group overflow-hidden rounded-xl shadow-2xl select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {/* The actual YouTube Player (Hidden behind overlay) */}
            <div id="youtube-player" className="pointer-events-none w-[120%] h-[120%] absolute top-[-10%] left-[-10%]" />

            {/* Interaction Shield (Prevents right click) */}
            <div
                className="absolute inset-0 z-10"
                onClick={togglePlay}
                onContextMenu={(e) => e.preventDefault()}
            />

            {/* Custom Overlay UI */}
            <div className={cn(
                "absolute inset-0 z-20 flex flex-col justify-between p-6 transition-opacity duration-300 pointer-events-none",
                showControls ? "opacity-100" : "opacity-0"
            )}>
                {/* Top Bar */}
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        {isLive && (
                            <div className="flex items-center gap-2 bg-red-600 w-fit px-3 py-1 rounded text-white font-bold text-[10px] uppercase tracking-widest animate-pulse shadow-lg">
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" /> Live
                            </div>
                        )}
                        {title && <h3 className="text-white font-bold text-lg drop-shadow-md">{title}</h3>}
                    </div>
                    <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                        <span className="text-white/80 text-xs font-bold font-outfit uppercase tracking-wider">EdTech<span className="text-primary">Player</span></span>
                    </div>
                </div>

                {/* Center Play Button (only when paused) */}
                {!isPlaying && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                        <button onClick={togglePlay} className="w-20 h-20 bg-primary/90 hover:bg-primary text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-2xl backdrop-blur-sm">
                            <Play size={32} fill="currentColor" className="ml-1" />
                        </button>
                    </div>
                )}

                {/* Bottom Controls */}
                <div className="bg-gradient-to-t from-black/80 to-transparent p-4 -mx-6 -mb-6 pointer-events-auto">
                    <div className="flex items-center gap-4">
                        <button onClick={togglePlay} className="text-white hover:text-primary transition-colors">
                            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                        </button>

                        <div className="group flex items-center gap-2">
                            <button onClick={toggleMute} className="text-white hover:text-primary transition-colors">
                                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                            {/* Simple Volume Slider Simulator */}
                            <div className="w-0 overflow-hidden group-hover:w-24 transition-all duration-300">
                                <div className="h-1 bg-white/30 rounded-full w-20 relative cursor-pointer" onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect()
                                    const x = e.clientX - rect.left
                                    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
                                    handleVolumeChange([pct])
                                }}>
                                    <div className="absolute top-0 left-0 h-full bg-primary rounded-full" style={{ width: `${volume}%` }} />
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar (Disabled for Live) */}
                        <div className="flex-1 h-1 bg-white/20 rounded-full relative">
                            {isLive ? (
                                <div className="absolute top-0 left-0 h-full w-full bg-red-600 rounded-full animate-pulse" />
                            ) : (
                                <div className="absolute top-0 left-0 h-full w-1/3 bg-primary rounded-full" />
                            )}
                        </div>

                        <button className="text-white hover:text-primary transition-colors">
                            <Settings size={20} />
                        </button>

                        <button onClick={toggleFullscreen} className="text-white hover:text-primary transition-colors">
                            <Maximize size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
