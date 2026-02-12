import * as admin from "firebase-admin";

const isInitialized = admin.apps.length > 0;

if (!isInitialized && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_PRIVATE_KEY !== "your-private-key-here") {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
    } catch (error) {
        console.error("Firebase Admin initialization failed:", error);
    }
}

// Export a robust auth object that won't crash even if uninitialized
export const auth = {
    createUser: async (args: any) => {
        if (admin.apps.length === 0) throw new Error("Firebase Admin not configured. Please add FIREBASE_PRIVATE_KEY and CLIENT_EMAIL.");
        return admin.auth().createUser(args);
    },
    setCustomUserClaims: async (uid: string, claims: any) => {
        if (admin.apps.length === 0) throw new Error("Firebase Admin not configured.");
        return admin.auth().setCustomUserClaims(uid, claims);
    },
    createSessionCookie: async (idToken: string, options: any) => {
        if (admin.apps.length === 0) throw new Error("Firebase Admin not configured.");
        return admin.auth().createSessionCookie(idToken, options);
    },
    verifySessionCookie: async (cookie: string, checkRevoked?: boolean) => {
        if (admin.apps.length === 0) {
            console.warn("Firebase Admin not initialized. Skipping verifySessionCookie.");
            return null;
        }
        return admin.auth().verifySessionCookie(cookie, checkRevoked);
    }
};
