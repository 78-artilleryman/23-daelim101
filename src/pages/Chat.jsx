import React, { useState,useEffect } from 'react';
import '../styles/Chat.css';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth,createUserWithEmailAndPassword,
    onAuthStateChanged, // 코드 추가
    signInWithEmailAndPassword, // 코드 추가
    signOut, } from "firebase/auth";

import firebase from "firebase/compat/app";

import 'firebase/auth';
import 'firebase/database';

import { getDatabase, ref, set } from "firebase/database";
import { getDoc, doc ,setDoc} from 'firebase/firestore/lite'
import { getFirestore } from 'firebase/firestore/lite'

import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';


const Chat = () => {
    const [email, setEmail] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const navigate = useNavigate();

    const [name,setName] = useState('');
    const [phone, setPhone] = useState('');
    const [major, setMajor] = useState('');
    const auth = getAuth();
    const [password, setPassword] = useState('');
    const [class_of, setclass_of] = useState('');

      // 유저의 emailVerified 값이 바뀐게 확인되면 로그인 상태가 나오도록 함
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailVerified(user.emailVerified);
      }
    });

    // 1초마다 Firebase에서 현재 로그인한 사용자의 이메일 인증 상태를 가져와서 체크
    const intervalId = setInterval(() => {
      if (emailVerified) {
        setEmail(auth.currentUser.email);
      }
      const currentUser = auth.currentUser;
      if (currentUser) {
        currentUser.reload().then(() => {
          setEmailVerified(currentUser.emailVerified);
        });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, [emailVerified, navigate]);

   // 로그아웃 구현
   const Logout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.log("error");
    });
  }
  console.log(email);

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userName = await getUserName(user.uid);
          const userPhone = await getUserPhone(user.uid);
          const userEmail = await getUserName(user.uid);
          const userMajor = await getUserMajor(user.uid);
          const userClass_of = await getUserClass_of(user.uid);
          setName(userName);
          setPhone(userPhone);
          setMajor(userMajor);
          setclass_of(userClass_of);
          setEmail(userEmail);
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    const getUserName = async (uid) => {
      try {
        const firestore = getFirestore();
        const userRef = doc(firestore, 'users', uid);
        const userDoc = await getDoc(userRef);
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          return userData.name;
          
        } else {
          console.log('User document does not exist');
          return '';
        }
      } catch (error) {
        console.log(error);
        return '';
      }
    };
    const getUserMajor = async (uid) => {
        try {
          const firestore = getFirestore();
          const userRef = doc(firestore, 'users', uid);
          const userDoc = await getDoc(userRef);
    
          if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData.major;
            
          } else {
            console.log('User document does not exist');
            return '';
          }
        } catch (error) {
          console.log(error);
          return '';
        }
      };
      const getUserPhone = async (uid) => {
        try {
          const firestore = getFirestore();
          const userRef = doc(firestore, 'users', uid);
          const userDoc = await getDoc(userRef);
    
          if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData.phone;
            
          } else {
            console.log('User document does not exist');
            return '';
          }
        } catch (error) {
          console.log(error);
          return '';
        }
      };
      const getUserClass_of = async (uid) => {
        try {
          const firestore = getFirestore();
          const userRef = doc(firestore, 'users', uid);
          const userDoc = await getDoc(userRef);
    
          if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData.class_of;
            
          } else {
            console.log('User document does not exist');
            return '';
          }
        } catch (error) {
          console.log(error);
          return '';
        }
      };

      const getUserEmail = async (uid) => {
        try {
          const firestore = getFirestore();
          const userRef = doc(firestore, 'users', uid);
          const userDoc = await getDoc(userRef);
    
          if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData.email;
            
          } else {
            console.log('User document does not exist');
            return '';
          }
        } catch (error) {
          console.log(error);
          return '';
        }
      };


    return (
        <div>
            <div className="header_Chat">
                <div className="Lhead">
                    <li><img className="logo_allrank" src="img/daelimlogo.png" alt="Player 1" /></li>
                    <h1>Chat</h1>
                </div>

                <div className="Rhead">
                    <div className="navigation">
                        <Link to="/worldcup"><p>월드컵 가기</p></Link>
                        {emailVerified || <Link to="/login"><p>로그인</p></Link>}
                        {emailVerified || <Link to="/signup"><p>회원가입</p></Link>}
                        {emailVerified && <Link to="/mypage"><p>{name}님 안녕하세요 !</p></Link>}
                        {emailVerified && <button onClick={Logout}>Logout</button>}
                    </div>
                    <div className="masages">
                        <img src="img/masages.png" />
                        {emailVerified || <Link to="/mypage"><img src="img/my.png" /></Link>}
                    </div>
                </div>
            </div>


            <div className="body_Chat">
                <div className="container_Chat">
                    <section className="chat">
                        <div className="header-chat">
                            <i className="icon fa fa-user-o" aria-hidden="true"></i>
                            <p className="name">내 이름</p>
                            <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
                        </div>
                        <div className="messages-chat">
                            <div className="message">
                                <div className="photo" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)" }}>
                                    <div className="online"></div>
                                </div>
                                <p className="text">안녕낭연안연ㅇㄴㅇㅁㄹㄴ ?</p>
                            </div>
                            <div className="message text-only">
                                <p className="text">ㄷㅈㄹㅈㅁㄷㄹㅈㄷㄹㅈㄷㄹㅈㄹㅈㄷㄹㅈㄹㄷㄹㅈㄹㅈ ?</p>
                            </div>
                            <p className="time">14h58</p>
                            <div className="message text-only">
                                <div className="response">
                                    <p className="text">ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ 😃</p>
                                </div>
                            </div>
                            <div className="message text-only">
                                <div className="response">
                                    <p className="text">ㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷ ?</p>
                                </div>
                            </div>
                            <p className="response-time time">15h04</p>
                            <div className="message">
                                <div className="photo" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)" }}>
                                    <div className="online"></div>
                                </div>
                                <p className="text">ㅋㅋㅋㅋㅋㅋㅋㅋ 😳</p>
                            </div>
                            <p className="time">15h09</p>
                        </div>
                        <div className="footer-chat">
                            <i className="icon fa fa-smile-o clickable" style={{ fontSize: "25pt" }} aria-hidden="true"></i>
                            <input type="text" className="write-message" placeholder="Type your message here"></input>
                            <i className="icon send fa fa-paper-plane-o clickable" aria-hidden="true"></i>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
export default Chat