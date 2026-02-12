"use client"

import { useState } from "react"
import { login } from "@/actions/auth"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { LayoutGrid, Loader2 } from "lucide-react"
import Link from "next/link"
import { auth as clientAuth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            // 1. Sign in with Firebase on client
            const userCredential = await signInWithEmailAndPassword(clientAuth(), email, password)
            const idToken = await userCredential.user.getIdToken()

            // 2. Create session on server
            const finalFormData = new FormData()
            finalFormData.append("idToken", idToken)

            const actionResult = await login(undefined, finalFormData)

            if (actionResult?.error) {
                setError(actionResult.error)
            } else if (actionResult?.success) {
                router.push("/dashboard")
                router.refresh()
            }
        } catch (err: any) {
            console.error(err)
            // Firebase auth error messages are often cryptic, map them if needed
            let message = "Invalid credentials."
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                message = "The email or password you entered is incorrect."
            }
            setError(message)
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
                    <h1 className="text-2xl font-black font-outfit uppercase tracking-tight text-slate-900">Welcome Back</h1>
                    <p className="text-slate-400 text-sm font-medium">Enter your credentials to access your account.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                            <Input name="email" type="email" placeholder="john@example.com" className="h-12 rounded-xl bg-slate-50 border-slate-100" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
                            <Input name="password" type="password" placeholder="••••••••" className="h-12 rounded-xl bg-slate-50 border-slate-100" required />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-500 text-sm font-medium rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-xl" disabled={loading} type="submit">
                        {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-slate-400 text-sm">
                        Don't have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
