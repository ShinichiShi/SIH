import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDux3GWAaRKtMWukm-eyy7P7BShaKGbHQE",
    authDomain: "testform-42a6d.firebaseapp.com",
    projectId: "testform-42a6d",
    storageBucket: "testform-42a6d.appspot.com",
    messagingSenderId: "220733412459",
    appId: "1:220733412459:web:62894bbd505d7aa94ccd2e"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase
