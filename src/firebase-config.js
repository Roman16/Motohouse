// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiAEgkXEOF8Y8bjOWspRdn9KqMc7cmwiQ",
  authDomain: "krasitskogo-82157.firebaseapp.com",
  projectId: "krasitskogo-82157",
  storageBucket: "krasitskogo-82157.firebasestorage.app",
  messagingSenderId: "701374758222",
  appId: "1:701374758222:web:4ad9c20a7a4ab613a1721f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
