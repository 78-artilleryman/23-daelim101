// v9 compat packages are API compatible with v8 code
  // Import the functions you need from the SDKs you need
 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
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

// Initialize Cloud Firestore and get a reference to the service


// Add a second document with a generated ID.

const  db = firebase.firestore();
db.collection('user').doc('test').set({
  id: "ywy"
})
