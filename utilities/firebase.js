// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "hmb-marina.firebaseapp.com",
    projectId: "hmb-marina",
    storageBucket: "hmb-marina.appspot.com",
    messagingSenderId: "91848530196",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: "G-BGVLN882LC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const providers = {
    'Google': googleProvider,
    'Facebook': facebookProvider,
}