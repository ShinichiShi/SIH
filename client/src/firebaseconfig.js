// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);