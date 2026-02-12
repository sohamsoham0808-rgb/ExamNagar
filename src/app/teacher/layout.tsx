import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function TeacherLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session || !session.user) {
        redirect("/login")
    }

    if ((session.user as any).role !== "teacher") {
        redirect("/")
    }

    return (
        <div className="flex min-h-screen bg-slate-950">
            {/* Future sidebar could go here */}
            <main className="flex-1 w-full">
                {children}
            </main>
        </div>
    )
}
