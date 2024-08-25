
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: xxx,
  authDomain: xxx,
  projectId: xxx,
  storageBucket: xxx,
  messagingSenderId: xxx,
  appId: xxx,
  measurementId: xxx
};

export const app = initializeApp(firebaseConfig);
