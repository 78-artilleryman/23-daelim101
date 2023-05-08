import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-analytics.js";
 
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

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

document.getElementById('btnJoin').addEventListener('click', (event) => { 
    event.preventDefault()
    const email = document.getElementById('id').value
    const password = document.getElementById('pswd1').value
    const passwordConfirm = document.getElementById('pswd2').value
    const auth = getAuth();
    if(password != passwordConfirm) {
        alert("비밀번호가 다릅니다.")
    } else {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            console.log('error')
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
    //writeUserData('user123', 'password123', 'user123@gmail.com');
}
})

 
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 
 
 // Initialize Cloud Firestore and get a reference to the service
 
       const db = firebase.firestore();
        
        const id = document.querySelector('#id');

        var pw1 = document.querySelector('#pswd1');

        var pw2 = document.querySelector('#pswd2');
        var userName = document.querySelector('#name');

        var yy = document.querySelector('#yy');
        var mm = document.querySelector('#mm');
        var dd = document.querySelector('#dd');

        var gender = document.querySelector('#gender');

        var email = document.querySelector('#email');

        var mobile = document.querySelector('#mobile');

        var studentNo = document.querySelector('#studentNo');

        var major = document.querySelector('#major');

        var photo = document.querySelector('#photo');

        var error = document.querySelectorAll('.error_next_box');

        const submitButton = document.querySelector("#btnJoin")
        
        submitButton.addEventListener("click",()=>{
          db.collection('user').add({
          id: id.value,
          pw: pw1.value,
          userName: userName.value,
          year: yy.value,
          month: mm.value,
          day: dd.value,
          gender: gender.value,
          email: email.value,
          mobile: mobile.value,
          studentNo: studentNo.value,
          major: major.value
          })
         })