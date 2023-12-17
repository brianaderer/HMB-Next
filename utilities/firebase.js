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
    apiKey: "AIzaSyCsF3tdbU0l_ojmp_B32DIukcsHrRKxJXo",
    authDomain: "hmb-marina.firebaseapp.com",
    projectId: "hmb-marina",
    storageBucket: "hmb-marina.appspot.com",
    messagingSenderId: "91848530196",
    appId: "1:91848530196:web:ef68dbe2e735385f9bca01",
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