// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "@firebase/firestore"
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_2wWtpqS7RK2Syi-TpRf6Nvwgzy4pgyk",
  authDomain: "capston-23.firebaseapp.com",
  databaseURL: "https://capston-23-default-rtdb.firebaseio.com",
  projectId: "capston-23",
  storageBucket: "capston-23.appspot.com",
  messagingSenderId: "838183596523",
  appId: "1:838183596523:web:a4766e64177014acd069ae",
  measurementId: "G-GJ34C4QJLQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);