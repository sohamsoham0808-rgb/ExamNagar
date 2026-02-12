import { auth as adminAuth } from "@/lib/firebase-admin"
import { cookies } from "next/headers"

export const auth = async () => {
    const sessionCookie = (await cookies()).get("__session")?.value

    if (!sessionCookie) return null

    try {
        const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true)
        return {
            user: {
                id: decodedToken.uid,
                email: decodedToken.email,
                name: decodedToken.name,
                role: (decodedToken as any).role,
            }
        }
    } catch (error) {
        return null
    }
}

export const signIn = async (provider: string, formData: FormData) => {
    // This is now handled in the login/signup actions or client side
}

export const signOut = async () => {
    (await cookies()).delete("__session")
}
