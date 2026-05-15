import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
      console.log('Firebase Admin Initialized successfully.');
    } else {
      console.warn('Firebase Admin environment variables missing. Skipping initialization (expected during build).');
    }
  } catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
  }
}

export const adminDb = admin.apps.length ? admin.firestore() : {} as FirebaseFirestore.Firestore;
export const adminAuth = admin.apps.length ? admin.auth() : {} as admin.auth.Auth;
