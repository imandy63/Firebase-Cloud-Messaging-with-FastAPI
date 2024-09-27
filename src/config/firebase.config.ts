export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseConfig_sub = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_SEC,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_SEC,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_SEC,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_SEC,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_SEC,
};
