// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
const analytics = getAnalytics(app);