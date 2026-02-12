import * as admin from "firebase-admin";

if (!admin.apps.length && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_PRIVATE_KEY !== "your-private-key-here") {
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

// Export a getter or a proxy to avoid "The default Firebase app does not exist" error on import
export const auth = {
    verifySessionCookie: async (...args: any[]) => {
        if (!admin.apps.length) {
            console.warn("Firebase Admin not initialized. Skipping verifySessionCookie.");
            return null;
        }
        return admin.auth().verifySessionCookie(args[0], args[1]);
    },
    // Add other methods if used, or just return the auth instance if it exists
    ...((admin.apps.length ? admin.auth() : {}) as any)
};
