import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Lazy initialization to prevent crashes during SSR/static generation
let app: FirebaseApp | undefined;
let auth: Auth | undefined;

function getFirebaseApp(): FirebaseApp | null {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        if (typeof window !== "undefined") {
            console.warn("Firebase configuration is missing! Check your environment variables (must start with NEXT_PUBLIC_).");
        }
        return null;
    }

    if (!app) {
        try {
            app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
        } catch (error) {
            console.error("Failed to initialize Firebase:", error);
            return null;
        }
    }
    return app;
}

function getFirebaseAuth(): Auth | null {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) return null;

    if (!auth) {
        try {
            auth = getAuth(firebaseApp);
        } catch (error) {
            console.error("Failed to initialize Firebase Auth:", error);
            return null;
        }
    }
    return auth;
}

export { getFirebaseApp as app, getFirebaseAuth as auth };
