"use server"

import prisma from "@/lib/prisma"
import { auth as adminAuth } from "@/lib/firebase-admin"
import { cookies } from "next/headers"

export async function login(prevState: any, formData: FormData) {
    const idToken = formData.get("idToken") as string

    if (!idToken) {
        return { error: "ID Token is required" }
    }

    try {
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

        (await cookies()).set("__session", sessionCookie, {
            maxAge: expiresIn / 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
        });

        return { success: true }
    } catch (error: any) {
        console.error("Login session error:", error);
        return { error: error.message || "Failed to create session." }
    }
}

export async function signup(prevState: any, formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const role = formData.get("role") as string || "student"

    if (!email || !password || !name) {
        return { error: "Missing required fields" }
    }

    try {
        // 1. Create user in Firebase
        const userRecord = await adminAuth.createUser({
            email,
            password,
            displayName: name,
        });

        // 2. Set custom claims for role
        await adminAuth.setCustomUserClaims(userRecord.uid, { role });

        // 3. Create in Prisma
        await prisma.user.create({
            data: {
                id: userRecord.uid,
                name,
                email,
                role,
            },
        })

        return { success: true }
    } catch (error: any) {
        console.error("Signup error:", error);
        // Map common Firebase errors to user friendly messages
        if (error.code === 'auth/email-already-exists') {
            return { error: "Email already exists." }
        }
        return { error: error.message || "Signup failed." }
    }
}

export async function logout() {
    (await cookies()).delete("__session");
}
