import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjdE2NW39KTyQ_oj22u0kUtTrdaGnci1Y",
  authDomain: "webiss-db42d.firebaseapp.com",
  projectId: "webiss-db42d",
  storageBucket: "webiss-db42d.firebasestorage.app",
  messagingSenderId: "881184817305",
  appId: "1:881184817305:web:a2023a5dd9b6671460f808",
  measurementId: "G-L6MCQJGBSG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
