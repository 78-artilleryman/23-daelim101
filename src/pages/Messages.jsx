import React, { useState,useEffect } from 'react';
import '../styles/Messages.css';
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


const Messages = () => {
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
            <div className="header_messages">
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

            {/* 메세지 목록 */}
            <div className="body_messages">
                <div className="container_messages">
                    {/* 왼쪽 푸른색 줄 */}
                    <nav className="menu">
                    </nav>

                    <section className="discussions">
                        {/* 내역 검색 */}
                        <div className="discussion search">
                            <div className="searchbar">
                                <i className="fa fa-search" aria-hidden="true"></i>
                                <input type="text" placeholder="Search..." />
                            </div>
                        </div>

                        {/* 채팅 리스트 시작 */}
                        <div className="discussion message-active">
                            <div
                                className="photo"
                                style={{
                                    backgroundImage:
                                        "url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)",
                                }}
                            >
                                {/* 초록색 공은 오프라인엔 사라지게 온라인엔 나타나게 만들면 됨. 오프라인 표시기능 안만들거면 빼삼 */}
                                <div className="online"></div>
                            </div>
                            <div className="desc-contact">
                                <p className="name">이진아</p>
                                <p className="message">9시에 운동하러 가자 😳</p>
                            </div>
                            <div className="timer">12 sec</div>
                        </div>

                        <div className="discussion">
                            <div
                                className="photo"
                                style={{
                                    backgroundImage:
                                        "url(https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg)",
                                }}
                            >
                                <div className="online"></div>
                            </div>
                            <div className="desc-contact">
                                <p className="name">하린</p>
                                <p className="message">내일 만날까 ?</p>
                            </div>
                            <div className="timer">3 min</div>
                        </div>

                        <div className="discussion">
                            <div
                                className="photo"
                                style={{
                                    backgroundImage:
                                        "url(https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80)",
                                }}
                            ></div>
                            <div className="desc-contact">
                                <p className="name">지우</p>
                                <p className="message">카페 탐방가구 싶당</p>
                            </div>
                            <div className="timer">42 min</div>
                        </div>
                        <div className="discussion">
                            <div
                                className="photo"
                                style={{
                                    backgroundImage:
                                        "url(https://card.thomasdaubenton.com/img/photo.jpg)",
                                }}
                            >
                                <div className="online"></div>
                            </div>
                            <div className="desc-contact">
                                <p className="name">서윤</p>
                                <p className="message">비 조심해 ! 🙂</p>
                            </div>
                            <div className="timer">2 hour</div>
                        </div>
                        <div className="discussion">
                            <div
                                className="photo"
                                style={{
                                    backgroundImage:
                                        "url(https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80)",
                                }}
                            ></div>
                            <div className="desc-contact">
                                <p className="name">소율</p>
                                <p className="message">아하하 재미있지 않아 ?</p>
                            </div>
                            <div className="timer">1 day</div>
                        </div>
                        <div className="discussion">
                            <div
                                className="photo"
                                style={{
                                    backgroundImage:
                                        "url(https://images.unsplash.com/photo-1541747157478-3222166cf342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80)",
                                }}
                            ></div>
                            <div className="desc-contact">
                                <p className="name">지유</p>
                                <p className="message">어이없게도 웃겨 😂</p>
                            </div>
                            <div className="timer">4 days</div>
                        </div>
                        <div className="discussion">
                            <div
                                className="photo"
                                style={{
                                    backgroundImage:
                                        "url(https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80)",
                                }}
                            >
                                <div className="online"></div>
                            </div>
                            <div className="desc-contact">
                                <p className="name">아윤</p>
                                <p className="message">난 여행갈거야</p>
                            </div>
                            <div className="timer">1 week</div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
export default Messages