// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6yqCfcCwC6dX9FAxD0Hu34VNd4qszt1g",
    authDomain: "movcert-next.firebaseapp.com",
    projectId: "movcert-next",
    storageBucket: "movcert-next.appspot.com",
    messagingSenderId: "936498731572",
    appId: "1:936498731572:web:d39e32f6b0f035439f8861",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
