import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


// if (process.env.NODE_ENV !== "production") {
//     require('../secrets');
//   }

const firebaseConfig = {
    // apiKey: config["process.env.FIREBASE"],
    apiKey: process.env.FIREBASE,
    authDomain: "stackathon-d0ff0.firebaseapp.com",
    projectId: "stackathon-d0ff0",
    storageBucket: "stackathon-d0ff0.appspot.com",
    messagingSenderId: "1031537013057",
    appId: "1:1031537013057:web:27e4ad3cf3c8adf95a71c0",
    measurementId: "G-PJNHMNM0JM"
  };

const app = initializeApp(firebaseConfig)

export const db = getFirestore()