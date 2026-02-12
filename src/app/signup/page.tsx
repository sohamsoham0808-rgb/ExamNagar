"use client"

import { useState } from "react"
import { signup } from "@/actions/auth"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { LayoutGrid, Loader2 } from "lucide-react"
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
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-8">
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto text-primary">
                        <LayoutGrid size={24} />
                    </div>
                    <h1 className="text-2xl font-black font-outfit uppercase tracking-tight text-slate-900">Create Account</h1>
                    <p className="text-slate-400 text-sm font-medium">Join thousands of students learning daily.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                            <Input name="name" type="text" placeholder="John Doe" className="h-12 rounded-xl bg-slate-50 border-slate-100" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                            <Input name="email" type="email" placeholder="john@example.com" className="h-12 rounded-xl bg-slate-50 border-slate-100" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
                            <Input name="password" type="password" placeholder="••••••••" className="h-12 rounded-xl bg-slate-50 border-slate-100" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Role</label>
                            <select name="role" className="w-full h-12 rounded-xl bg-slate-50 border-slate-100 px-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20" defaultValue="student">
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-500 text-sm font-medium rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-xl" disabled={loading} type="submit">
                        {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-slate-400 text-sm">
                        Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
