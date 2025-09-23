import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlh15YRxFzCJ2k493QFqvxVwAJdkwkxzQ",
  authDomain: "hmpi-ec0e8.firebaseapp.com",
  projectId: "hmpi-ec0e8",
  storageBucket: "hmpi-ec0e8.firebasestorage.app",
  messagingSenderId: "913817139624",
  appId: "1:913817139624:web:abc3ebf7d6ffe5e984459d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;