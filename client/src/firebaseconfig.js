// Import the functions you need from the SDKs you need
import './config.js';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDux3GWAaRKtMWukm-eyy7P7BShaKGbHQE",
  authDomain: "testform-42a6d.firebaseapp.com",
  projectId: "testform-42a6d",
  storageBucket: "testform-42a6d.appspot.com",
  messagingSenderId: "220733412459",
  appId: "1:220733412459:web:62894bbd505d7aa94ccd2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {app,db,auth,googleProvider}