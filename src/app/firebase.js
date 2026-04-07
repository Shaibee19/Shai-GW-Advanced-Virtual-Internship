// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu4utZhJwdmuOz1PlnrM_EXh1larv6kAU",
  authDomain: "advanced-internship-42d5e.firebaseapp.com",
  projectId: "advanced-internship-42d5e",
  storageBucket: "advanced-internship-42d5e.firebasestorage.app",
  messagingSenderId: "535463439148",
  appId: "1:535463439148:web:f13510cd74a1beb1081a89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication instance
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();