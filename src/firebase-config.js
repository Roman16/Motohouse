// Your web app's Firebase configuration
import {initializeApp} from "firebase/app"
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDhAdaEtZf-zACkBTg3XR4ylSJqMCNWpp0",
    authDomain: "motohouse-b3498.firebaseapp.com",
    projectId: "motohouse-b3498",
    storageBucket: "motohouse-b3498.appspot.com",
    messagingSenderId: "341869378168",
    appId: "1:341869378168:web:12e383ffecfd20387b4b8d"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)