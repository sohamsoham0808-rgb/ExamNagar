"use client"

import { useState } from "react"
import { signup } from "@/actions/auth"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Logo } from "@/components/ui/Logo"
import { Loader2, ShieldCheck, Users, GraduationCap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const formData = new FormData(e.currentTarget)
            const result = await signup(undefined, formData)

            if (result?.error) {
                setError(result.error)
            } else if (result?.success) {
                router.push("/login")
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-slate-100 space-y-8">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                        <Logo className="h-8 w-auto" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
                        <p className="text-slate-500 text-sm mt-1">Join India's most trusted learning platform.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 ml-1">Full Name</label>
                            <Input name="name" type="text" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 ml-1">Email Address</label>
                            <Input name="email" type="email" placeholder="name@example.com" required />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 ml-1">Password</label>
                            <Input name="password" type="password" placeholder="••••••••" required />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 ml-1">I am a...</label>
                            <div className="grid grid-cols-3 gap-3">
                                <label className="cursor-pointer">
                                    <input type="radio" name="role" value="student" className="peer hidden" defaultChecked />
                                    <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 peer-checked:border-primary peer-checked:bg-primary/5 text-slate-600 peer-checked:text-primary transition-all">
                                        <Users size={20} className="mb-1" />
                                        <span className="text-[10px] font-bold uppercase">Student</span>
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input type="radio" name="role" value="teacher" className="peer hidden" />
                                    <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 peer-checked:border-primary peer-checked:bg-primary/5 text-slate-600 peer-checked:text-primary transition-all">
                                        <GraduationCap size={20} className="mb-1" />
                                        <span className="text-[10px] font-bold uppercase">Teacher</span>
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input type="radio" name="role" value="admin" className="peer hidden" />
                                    <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 peer-checked:border-primary peer-checked:bg-primary/5 text-slate-600 peer-checked:text-primary transition-all">
                                        <ShieldCheck size={20} className="mb-1" />
                                        <span className="text-[10px] font-bold uppercase">Admin</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-xs font-medium rounded-lg text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <Button className="w-full font-bold h-12" disabled={loading} type="submit">
                        {loading ? <Loader2 className="animate-spin" /> : "Create Free Account"}
                    </Button>
                </form>

                <div className="text-center pt-2">
                    <p className="text-slate-500 text-sm">
                        Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
