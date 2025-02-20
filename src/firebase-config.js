// Your web app's Firebase configuration
import {initializeApp} from "firebase/app"
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDLMJMLCl221dzdTxKmjqmN_vmn7N8--wE",
    authDomain: "motohouse-eda1c.firebaseapp.com",
    projectId: "motohouse-eda1c",
    storageBucket: "motohouse-eda1c.firebasestorage.app",
    messagingSenderId: "542281712016",
    appId: "1:542281712016:web:1d2d7227f01d1e27653315"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)