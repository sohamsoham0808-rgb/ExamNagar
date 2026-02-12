import { auth as adminAuth } from "./firebase-admin";
import { cookies } from "next/headers";
import prisma from "./prisma";

export async function getSession() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("__session")?.value;

        if (!sessionCookie) return null;

        const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
        return decodedToken;
    } catch (error) {
        return null;
    }
}

export async function getCurrentUser() {
    const session = await getSession();
    if (!session) return null;

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.uid },
        });
        return user;
    } catch (error) {
        console.error("Error fetching user from database:", error);
        return null;
    }
}
