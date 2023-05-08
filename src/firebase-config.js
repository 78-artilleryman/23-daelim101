// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "@firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmD3y4jL54LiBr_zQP8WhNEkluEfN3rmM",
  authDomain: "testproject-13159.firebaseapp.com",
  projectId: "testproject-13159",
  storageBucket: "testproject-13159.appspot.com",
  messagingSenderId: "72473213711",
  appId: "1:72473213711:web:d30a062268d6c115ca1c7a",
  measurementId: "G-50Z23HNPGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);