"use client"

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
    Keyboard as KeyboardIcon,
    Timer,
    Zap,
    RefreshCw,
    Trophy,
    Settings,
    ShieldCheck,
    AlertCircle,
    Volume2,
    VolumeX,
    Maximize2,
    BarChart3,
    Clock,
    Layout,
    Sparkles,
    CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

// --- Constants & Data ---

const TESTBOOK_COLORS = {
    primary: '#17a2b8',
    secondary: '#007bff',
    bg: '#f4f7f9',
    text: '#333',
    border: '#dee2e6'
}

const CANDIDATE_INFO = {
    name: "SOHAM CHAKRABORTY",
    rollNo: "2201004567",
    exam: "SSC CGL 2024 Tier-II",
    subject: "English Typing Test"
}

const EXAM_MODES = [
    { id: 'ssc', name: 'SSC CGL', time: 900, chars: 2000, label: 'Official Tier-II' },
    { id: 'dsssb', name: 'DSSSB', time: 600, chars: 1500, label: 'LDC/Typist' },
    { id: 'banking', name: 'Banking', time: 300, chars: 1000, label: 'Standard Speed' },
    { id: 'pro', name: 'Pro Sprint', time: 60, chars: 500, label: '1 Min Warmup' }
]

const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'],
    ['SPACE']
]

const SAMPLE_TEXTS = [
    "The quick brown fox jumps over the lazy dog. Competitive examinations are a critical part of the recruitment process in India. Students spend years preparing for exams like SSC CGL, DSSSB, and various State Exams. Accuracy and speed in typing are essential for several posts in the government sector. Regular practice helps in achieving the required speed and minimizing errors. The SSC typing test usually lasts for 15 minutes and requires a speed of 35 words per minute. Consistent practice on simulated interfaces is the key to success.",
    "Data science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from noisy, structured and unstructured data. It is related to data mining, machine learning and big data. Data science is a concept to unify statistics, data analysis, informatics, and their related methods in order to understand and analyze actual phenomena with data.",
    "Education is the process of facilitating learning, or the acquisition of knowledge, skills, values, morals, beliefs, and habits. Educational methods include teaching, training, storytelling, discussion and directed research. Education frequently takes place under the guidance of educators, however learners can also educate themselves."
]

// --- Utils ---

const generateWpmHistory = (count: number) => Array.from({ length: count }, () => 0)

// --- Components ---

export default function TypingTestPage() {
    // Core State
    const [mode, setMode] = useState(EXAM_MODES[0])
    const [targetText, setTargetText] = useState(SAMPLE_TEXTS[0])
    const [inputValue, setInputValue] = useState('')
    const [startTime, setStartTime] = useState<number | null>(null)
    const [timeLeft, setTimeLeft] = useState(mode.time)
    const [isFinished, setIsFinished] = useState(false)
    const [isCounting, setIsCounting] = useState(false)
    const [lastChar, setLastChar] = useState<string | null>(null)

    // UI Settings
    const [showKeyboard, setShowKeyboard] = useState(true)
    const [soundEnabled, setSoundEnabled] = useState(true)
    const [uiLayout, setUiLayout] = useState<'modern' | 'exam'>('exam')

    // Stats
    const [wpm, setWpm] = useState(0)
    const [accuracy, setAccuracy] = useState(100)
    const [errors, setErrors] = useState(0)
    const [wpmHistory, setWpmHistory] = useState<number[]>(generateWpmHistory(30))

    const inputRef = useRef<HTMLTextAreaElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Reset Test
    const resetTest = useCallback(() => {
        const text = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]
        setTargetText(text)
        setInputValue('')
        setTimeLeft(mode.time)
        setIsFinished(false)
        setIsCounting(false)
        setStartTime(null)
        setWpm(0)
        setAccuracy(100)
        setErrors(0)
        setWpmHistory(generateWpmHistory(30))
        setLastChar(null)
        if (inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [mode])

    useEffect(() => {
        resetTest()
    }, [resetTest])

    // Audio Engine Handlers
    const playClick = useCallback(() => {
        if (!soundEnabled) return
        try {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)()
            const osc = context.createOscillator()
            const gain = context.createGain()
            osc.connect(gain)
            gain.connect(context.destination)
            osc.type = "sine"
            osc.frequency.setValueAtTime(150, context.currentTime)
            gain.gain.setValueAtTime(0.1, context.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1)
            osc.start()
            osc.stop(context.currentTime + 0.1)
        } catch (e) { }
    }, [soundEnabled])

    // Timer & Live Stats Logic
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isCounting && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    const next = prev - 1
                    if (next % 2 === 0) updateHistory()
                    return next
                })
                calculateStats()
            }, 1000)
        } else if (timeLeft === 0) {
            finishTest()
        }
        return () => clearInterval(interval)
    }, [isCounting, timeLeft])

    const startTest = () => {
        setStartTime(Date.now())
        setIsCounting(true)
    }

    const finishTest = () => {
        setIsCounting(false)
        setIsFinished(true)
        calculateStats()
    }

    const updateHistory = () => {
        setWpmHistory(prev => {
            const next = [...prev.slice(1), wpm]
            return next
        })
    }

    const calculateStats = () => {
        if (!startTime) return
        const elapsed = (Date.now() - startTime) / 1000 / 60
        const typedEntries = inputValue.trim().length / 5
        const currentWpm = Math.round(typedEntries / elapsed)

        let errs = 0
        const inputChars = inputValue.split('')
        const targetChars = targetText.split('')

        for (let i = 0; i < inputChars.length; i++) {
            if (inputChars[i] !== targetChars[i]) errs++
        }

        const acc = Math.max(0, Math.round(((inputValue.length - errs) / inputValue.length) * 100)) || 100
        setWpm(currentWpm || 0)
        setAccuracy(acc)
        setErrors(errs)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (isFinished) return
        if (!isCounting) startTest()

        const val = e.target.value
        if (val.length <= targetText.length) {
            const char = val[val.length - 1]?.toUpperCase() || null
            setLastChar(char)
            setInputValue(val)
            playClick()
        }
    }

    const progressPercent = (inputValue.length / targetText.length) * 100

    // Render Logic for Testbook Mode
    if (uiLayout === 'exam') {
        return (
            <div className="bg-[#f0f2f5] min-h-screen font-outfit text-slate-900 select-none">
                {/* --- Testbook Blue Header --- */}
                <header className="bg-[#17a2b8] text-white py-3 px-6 flex items-center justify-between shadow-md">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <KeyboardIcon size={24} />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold uppercase tracking-tight">{CANDIDATE_INFO.exam}</h1>
                            <p className="text-[10px] opacity-80 font-medium">Official Typing Assessment Module</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="bg-black/20 px-4 py-2 rounded-md flex items-center gap-3">
                            <span className="text-[10px] font-bold uppercase opacity-80">Time Left:</span>
                            <span className="text-xl font-mono font-bold w-20 text-center">
                                {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                            </span>
                        </div>
                        <Button
                            onClick={resetTest}
                            variant="ghost"
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-md text-[10px] font-bold uppercase px-4 h-9"
                        >
                            <RefreshCw size={14} className="mr-2" /> Reset
                        </Button>
                        <Button
                            onClick={() => setUiLayout('modern')}
                            className="bg-white text-[#17a2b8] hover:bg-white/90 rounded-md text-[10px] font-bold uppercase px-4 h-9 shadow-sm"
                        >
                            <Sparkles size={14} className="mr-2" /> Modern UI
                        </Button>
                    </div>
                </header>

                <main className="max-w-[1400px] mx-auto p-6 grid grid-cols-12 gap-6">
                    {/* Left Panel: Candidate Info (Testbook Style) */}
                    <div className="col-span-12 lg:col-span-3 space-y-6">
                        <Card className="bg-white border-none shadow-sm rounded-xl overflow-hidden">
                            <div className="bg-slate-50 p-6 flex flex-col items-center border-b border-slate-100">
                                <div className="w-32 h-32 bg-slate-200 rounded-lg border-4 border-white shadow-inner flex items-center justify-center overflow-hidden mb-4">
                                    <div className="text-slate-400 text-xs text-center px-4 font-bold uppercase">Candidate Photo</div>
                                </div>
                                <h2 className="text-sm font-black text-slate-800 uppercase text-center">{CANDIDATE_INFO.name}</h2>
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Roll No: {CANDIDATE_INFO.rollNo}</p>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Subject</p>
                                    <p className="text-xs font-bold text-slate-700">{CANDIDATE_INFO.subject}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                    <Badge className={cn("bg-emerald-100 text-emerald-700 border-none font-black text-[9px] px-3", isCounting ? "animate-pulse" : "")}>
                                        {isFinished ? "COMPLETED" : isCounting ? "IN PROGRESS" : "READY TO START"}
                                    </Badge>
                                </div>
                            </div>
                        </Card>

                        {/* Real-time Stats Widget */}
                        <Card className="bg-white border-none shadow-sm rounded-xl p-6 space-y-6">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-3">Performance Data</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase">Speed</p>
                                    <p className="text-3xl font-black text-[#17a2b8] font-mono leading-none">{wpm}</p>
                                    <p className="text-[9px] font-bold text-slate-400">WPM</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase">Accuracy</p>
                                    <p className="text-3xl font-black text-emerald-500 font-mono leading-none">{accuracy}%</p>
                                    <p className="text-[9px] font-bold text-slate-400">Precision</p>
                                </div>
                            </div>
                            <div className="pt-2">
                                <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Progress</p>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#17a2b8] transition-all" style={{ width: `${progressPercent}%` }} />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Panel: Typing Section */}
                    <div className="col-span-12 lg:col-span-9 space-y-6">
                        {/* Source Text Area */}
                        <Card className="bg-white border-none shadow-sm rounded-xl overflow-hidden flex flex-col min-h-[500px]">
                            <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-[#17a2b8]" />
                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest pt-0.5">Source Content Panel</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#17a2b8]" />
                                        <span className="text-[9px] font-bold text-slate-400 uppercase">Active Word</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-400" />
                                        <span className="text-[9px] font-bold text-slate-400 uppercase">Incorrect</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actual Text to Type */}
                            <div className="flex-1 p-8 overflow-y-auto bg-white">
                                <div className="text-2xl leading-[1.8] font-medium text-slate-800 font-serif select-none whitespace-pre-wrap">
                                    {targetText.split(' ').map((word, wordIdx) => {
                                        const currentWordStartIdx = targetText.split(' ').slice(0, wordIdx).join(' ').length + (wordIdx > 0 ? 1 : 0)
                                        const isCurrentWord = inputValue.length >= currentWordStartIdx && inputValue.length < currentWordStartIdx + word.length + 1

                                        return (
                                            <span
                                                key={wordIdx}
                                                className={cn(
                                                    "px-1 py-0.5 rounded transition-colors",
                                                    isCurrentWord ? "bg-[#17a2b8]/10 text-[#17a2b8] border-b-2 border-[#17a2b8]" : ""
                                                )}
                                            >
                                                {word.split('').map((char, charIdx) => {
                                                    const absoluteIdx = currentWordStartIdx + charIdx
                                                    let charColor = "text-slate-300"
                                                    if (absoluteIdx < inputValue.length) {
                                                        charColor = inputValue[absoluteIdx] === char ? "text-slate-800" : "text-red-500 bg-red-50"
                                                    }
                                                    return <span key={charIdx} className={charColor}>{char}</span>
                                                })}
                                                <span className="opacity-0"> </span>
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Input Field */}
                            <div className="p-8 bg-slate-50 border-t border-slate-100">
                                <div className="relative group">
                                    <textarea
                                        ref={inputRef}
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        className="w-full bg-white border-2 border-slate-200 rounded-xl p-6 text-2xl font-mono focus:outline-none focus:border-[#17a2b8] transition-all resize-none h-32 leading-relaxed"
                                        placeholder="Start typing the passage above..."
                                        spellCheck={false}
                                        autoFocus
                                    />
                                    {!isCounting && !isFinished && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-[2px] rounded-xl pointer-events-none transition-opacity group-hover:opacity-0">
                                            <div className="flex items-center gap-3 text-slate-400">
                                                <KeyboardIcon size={32} />
                                                <p className="text-sm font-black uppercase tracking-[0.2em]">Click to start session</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>

                        {/* Control Bar */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4 text-slate-500">
                                <AlertCircle size={14} />
                                <p className="text-[10px] font-bold uppercase tracking-tight italic">Do not refresh the page during the exam. All progress will be lost.</p>
                            </div>
                            <div className="flex gap-4">
                                <Button
                                    onClick={finishTest}
                                    className="bg-[#17a2b8] hover:bg-[#138496] text-white px-10 h-12 rounded-lg font-black uppercase text-xs tracking-widest shadow-lg shadow-[#17a2b8]/20"
                                >
                                    Submit Session
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>

                {/* --- Results Modal --- */}
                {isFinished && (
                    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
                        <Card className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border-none animate-in zoom-in-95 duration-300">
                            <div className="bg-[#17a2b8] p-8 text-center text-white">
                                <Trophy size={48} className="mx-auto mb-4" />
                                <h3 className="text-2xl font-black uppercase tracking-tight">Exam Submitted</h3>
                                <p className="text-xs opacity-80 mt-1 font-bold uppercase">Assessment ID: #SSC-T2-{Date.now().toString().slice(-6)}</p>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-xl text-center">
                                        <p className="text-2xl font-black text-[#17a2b8]">{wpm}</p>
                                        <p className="text-[9px] font-black text-slate-400 uppercase mt-1">Net WPM</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-xl text-center">
                                        <p className="text-2xl font-black text-emerald-500">{accuracy}%</p>
                                        <p className="text-[9px] font-black text-slate-400 uppercase mt-1">Accuracy</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Button onClick={resetTest} className="w-full bg-[#17a2b8] hover:bg-[#138496] text-white h-12 rounded-lg font-black uppercase text-[10px] tracking-widest">Re-attempt Exam</Button>
                                    <Button variant="outline" className="w-full border-slate-200 text-slate-600 h-12 rounded-lg font-black uppercase text-[10px] tracking-widest">Generate Scorecard</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="bg-[#f8f9fc] min-h-screen font-outfit text-slate-900 selection:bg-primary selection:text-white">
            {/* --- Premium Header & Quick Controls --- */}
            <header className="sticky top-0 z-[60] bg-white border-b border-slate-200 py-3 px-8 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
                            <KeyboardIcon size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black uppercase tracking-tighter leading-none">ExamNagar <span className="text-primary italic">ProTypist</span></h1>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Industrial Simulator v2.0</p>
                        </div>
                    </div>

                    {/* Live Stats Bridge */}
                    <div className="hidden lg:flex items-center bg-slate-50 px-6 py-2 rounded-2xl border border-slate-100 gap-10">
                        <div className="flex flex-col items-center">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">WPM Speed</p>
                            <span className="text-xl font-black text-primary leading-tight">{wpm}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Accuracy</p>
                            <span className="text-xl font-black text-emerald-500 leading-tight">{accuracy}%</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Time Left</p>
                            <span className="text-xl font-black text-slate-900 leading-tight flex items-center gap-1.5 focus-within:animate-pulse">
                                <Clock size={16} className="text-amber-500" />
                                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn("h-9 rounded-lg px-4 gap-2 text-[10px] font-black uppercase tracking-widest transition-all", uiLayout === 'modern' ? "bg-white shadow-sm" : "text-slate-500")}
                            onClick={() => setUiLayout('modern')}
                        >
                            <Sparkles size={14} /> Modern
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn("h-9 rounded-lg px-4 gap-2 text-[10px] font-black uppercase tracking-widest transition-all", (uiLayout as string) === 'exam' ? "bg-white shadow-sm" : "text-slate-500")}
                            onClick={() => setUiLayout('exam')}
                        >
                            <Layout size={14} /> Exam UI
                        </Button>
                    </div>

                    <div className="h-8 w-px bg-slate-200 mx-2" />

                    <div className="flex gap-2">
                        <Button onClick={() => setSoundEnabled(!soundEnabled)} variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100 h-10 w-10">
                            {soundEnabled ? <Volume2 size={20} className="text-slate-600" /> : <VolumeX size={20} className="text-slate-300" />}
                        </Button>
                        <Button onClick={resetTest} className="h-10 px-6 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-slate-200 transition-transform active:scale-95">
                            <RefreshCw size={14} className={isCounting ? "animate-spin" : ""} /> Restart
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-8 py-10 space-y-10">
                {/* --- Mode Selection --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-3xl w-fit shadow-sm">
                        {EXAM_MODES.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMode(m)}
                                className={cn(
                                    "px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                    mode.id === m.id ? "bg-primary text-white shadow-xl shadow-primary/30" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                                )}
                            >
                                {m.name}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="text-emerald-500" size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Exam Environment</span>
                        </div>
                        <Badge className="bg-amber-100 text-amber-700 border-none font-bold text-[10px] px-4 py-2 uppercase tracking-widest">{mode.label}</Badge>
                    </div>
                </div>

                {/* --- Typing Interface (Split Screen / Overlaid) --- */}
                <div className="grid grid-cols-1 gap-10 transition-all duration-700">
                    {/* Source Container */}
                    <Card className="relative border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white p-12 transition-all min-h-[300px]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-50">
                            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                        </div>

                        <div className="absolute top-6 right-10 flex items-center gap-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                                <Maximize2 size={12} /> Full Screen Mode
                            </div>
                        </div>

                        <div className="h-full overflow-y-auto no-scrollbar pt-6">
                            <div className="text-3xl leading-[1.8] font-bold text-slate-300 select-none whitespace-pre-wrap font-mono tracking-tight pb-8">
                                {targetText.split('').map((char, i) => {
                                    let color = "text-slate-300 transition-colors"
                                    let current = ""

                                    if (i < inputValue.length) {
                                        color = inputValue[i] === char ? "text-slate-900" : "text-red-500 bg-red-50"
                                    }

                                    if (i === inputValue.length) {
                                        current = "relative"
                                    }

                                    return (
                                        <span key={i} className={cn(color, current)}>
                                            {i === inputValue.length && (
                                                <span className="absolute -left-0 top-0 bottom-0 w-[3px] bg-primary animate-pulse rounded-full" />
                                            )}
                                            {char}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    </Card>

                    {/* Typing/Analysis Container */}
                    <div className="space-y-8">
                        {/* Analysis & Visualization (Modern Mode) */}
                        {!isFinished && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <Card className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm flex flex-col justify-between group h-48">
                                    <BarChart3 size={24} className="text-primary mb-4" />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Velocity</p>
                                        <p className="text-4xl font-black text-slate-900 font-outfit leading-none">{wpm} WPM</p>
                                    </div>
                                    <div className="flex gap-1 h-12 items-end pt-4">
                                        {wpmHistory.map((h, i) => (
                                            <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${Math.min(100, (h / 100) * 100)}%` }} />
                                        ))}
                                    </div>
                                </Card>

                                <Card className="p-8 rounded-[2.5rem] bg-slate-900 text-white border-none shadow-sm h-48 flex flex-col justify-center gap-2">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Live Progress</p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary shadow-lg shadow-primary/50 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                                        </div>
                                        <span className="text-xl font-black font-outfit">{Math.round(progressPercent)}%</span>
                                    </div>
                                </Card>

                                <Card className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm h-48 flex flex-col justify-center gap-2 group">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Accuracy Level</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-5xl font-black text-emerald-500 font-outfit leading-none">{accuracy}%</p>
                                        <AlertCircle size={32} className={cn("transition-colors", accuracy < 95 ? "text-amber-500" : "text-emerald-500")} />
                                    </div>
                                </Card>
                            </div>
                        )}

                        {/* --- Virtual Keyboard Section --- */}
                        {showKeyboard && !isFinished && (
                            <div className="bg-white border border-slate-200 p-8 rounded-[3rem] shadow-xl space-y-4 animate-in slide-in-from-bottom-10 fade-in duration-700">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interactive Key Mapping</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-slate-200 rounded-full" />)}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {KEYBOARD_ROWS.map((row, i) => (
                                        <div key={i} className="flex justify-center gap-2">
                                            {row.map((key) => {
                                                const isActive = lastChar === key || (key === 'SPACE' && lastChar === ' ')
                                                return (
                                                    <div
                                                        key={key}
                                                        className={cn(
                                                            "h-12 flex items-center justify-center rounded-xl border-2 font-black text-xs transition-all duration-100 uppercase tracking-tight shadow-sm",
                                                            key === 'SPACE' ? "w-48" : "w-12",
                                                            isActive
                                                                ? "bg-primary border-primary text-white scale-90 shadow-none translate-y-1"
                                                                : "bg-slate-50 border-slate-100 text-slate-400"
                                                        )}
                                                    >
                                                        {key === 'SPACE' ? '' : key}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Hidden Input for Modern UI (Overlayed) --- */}
                {uiLayout === 'modern' && !isFinished && (
                    <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={handleInputChange}
                        className="opacity-0 absolute -z-50"
                        autoFocus
                    />
                )}

                {/* --- Result Modal Overlay --- */}
                {isFinished && (
                    <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-500">
                        <Card className="max-w-xl w-full bg-white rounded-[3.5rem] shadow-2xl p-12 text-center space-y-10 animate-in zoom-in slide-in-from-bottom-10 duration-700">
                            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                                <Trophy size={48} />
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Session <span className="text-primary italic">Certified</span></h3>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Official result for {mode.name} Simulation</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-[#f8f9fc] p-8 rounded-[2.5rem] text-center border border-slate-100">
                                    <p className="text-5xl font-black text-primary font-outfit">{wpm}</p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Net WPM</p>
                                </div>
                                <div className="bg-[#f8f9fc] p-8 rounded-[2.5rem] text-center border border-slate-100">
                                    <p className="text-5xl font-black text-emerald-500 font-outfit">{accuracy}%</p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Precision</p>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button onClick={resetTest} className="flex-1 h-14 rounded-2xl bg-slate-900 text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-slate-200">Retake Simulation</Button>
                                <Button variant="outline" className="flex-1 h-14 rounded-2xl border-slate-200 font-black uppercase text-[10px] tracking-[0.2em]">Share Report</Button>
                            </div>
                        </Card>
                    </div>
                )}

                {/* --- Bottom Strategy Guides --- */}
                {!isFinished && (
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-none shadow-sm rounded-[2.5rem] bg-indigo-50/40 p-10 group hover:-translate-y-2 transition-all">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                                <ShieldCheck size={24} />
                            </div>
                            <h4 className="font-black uppercase tracking-widest text-[10px] text-indigo-400 mb-3">SSC Guidelines</h4>
                            <p className="font-bold text-indigo-900 mb-2 text-lg leading-tight uppercase tracking-tight">Focus on Accuracy</p>
                            <p className="text-xs text-indigo-600/70 font-medium leading-relaxed">SSC evaluation penalizes errors heavily. First maintain 98% accuracy for at least 10 sessions before going for speed.</p>
                        </Card>

                        <Card className="border-none shadow-sm rounded-[2.5rem] bg-emerald-50/40 p-10 group hover:-translate-y-2 transition-all">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                                <Zap size={24} />
                            </div>
                            <h4 className="font-black uppercase tracking-widest text-[10px] text-emerald-400 mb-3">Ergonomics Tip</h4>
                            <p className="font-bold text-emerald-900 mb-2 text-lg leading-tight uppercase tracking-tight">The 90-Degree Rule</p>
                            <p className="text-xs text-emerald-600/70 font-medium leading-relaxed">Keep your elbows at a 90-degree angle and wrists neutral to avoid fatigue during longer 15-minute SSC typing shifts.</p>
                        </Card>

                        <Card className="border-none shadow-sm rounded-[2.5rem] bg-slate-900 text-white p-10 group hover:-translate-y-2 transition-all">
                            <div className="w-12 h-12 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-6">
                                <Settings size={24} />
                            </div>
                            <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-500 mb-3">Customization</h4>
                            <p className="font-bold text-white mb-2 text-lg leading-tight uppercase tracking-tight">Sound & Layout</p>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">Switch to "Exam UI" to simulate the exact legacy interface used in TCS ION centers across India.</p>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    )
}
