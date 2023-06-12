import React, { useState, useEffect } from 'react';
import { auth, db } from "../config/firebase-config";
import { useNavigate, Link } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore'
import '../styles/MainPage.css';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const MainPage = () => {
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  
  // 유저의 emailVerified 값이 바뀐게 확인되면 로그인 상태가 나오도록 함
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {      
      if (user) {
        setEmailVerified(user.emailVerified);   
        const userName = await getUserName(user.uid);
        setName(userName);     
      }
    });
    
    // 1초마다 Firebase에서 현재 로그인한 사용자의 이메일 인증 상태를 가져와서 체크
    const intervalId = setInterval(() => {
      const currentUser = auth.currentUser;
      if (emailVerified) {
        setEmail(auth.currentUser.email);        
      }
      if (currentUser) {
        currentUser.reload().then(() => {
          setEmailVerified(currentUser.emailVerified);
        });
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, [emailVerified, navigate]);

  const getUserName = async (uid) => {
    try {
      const userRef = doc(db, 'user-M', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.name;

      } else {
        const userRef = doc(db, 'user-F', uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        return userData.name;        
      }
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  // 로그아웃 구현
  const Logout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.log("error");
    });
  }
  console.log(email);

  return (
    <div>
      <div className="header">
        <div className="Lhead">
          <li><img className="weblogo" src="img/daelimlogo.png" /></li>
        </div>
        <div className="Rhead">
          <div>            
            {emailVerified || <Link to="login"><p>로그인</p></Link>}
            {emailVerified || <Link to="signup"><p>회원가입</p></Link>}
            {emailVerified && <Link to="mypage"><p>{name}님 안녕하세요 !</p></Link>}
            {emailVerified && <button onClick={Logout}>Logout</button>}
          </div>
        </div>
      </div>
      <div className="Menu">
        <Link to="worldcup"><li><a href="#" target="_self"><img src="img/world.png" />World Cup</a></li></Link>
        <Link to="meeting"><li><a href="#" target="_self"><img src="img/date.png" />Blind Date</a></li></Link>
      </div>
      <div id="wrapper">
        <div className="Maincard" id="men">
          <header>
            <h3>Men</h3>
          </header>

        </div>
        <div className="Maincard" id="girl">
          <header>
            <h3>Girl</h3>
          </header>

        </div>
        <div className="Maincard" id="com">
          <header>
            <h3>Comming Soon</h3>
          </header>

        </div>
        <div className="Maincard" id="com">
          <header>
            <h3>Comming Soon</h3>
          </header>
        </div>
      </div>
      {/* <div id="Bwrapper">
        <div className="Bcard">
          <div className="Notice">
            <header>
              <h3>Notice</h3>
            </header>
            </div>
        </div>
        <div className="Bcard">
          <div className="Rank">
            <header>
              <h3>Rank</h3>
            </header>
           </div>
        </div>
      </div> */}
      <div className="footer">
        <div id="bottomMenu">
          <ul>
            <li><a href="#">회사 소개</a></li>
            <li><a href="#">개인정보처리방침</a></li>
            <li><a href="#">약관</a></li>
            <li><a href="#">사이트맵</a></li>
          </ul>

        </div>
      </div>
      {/* <div id="company">
        <p>경기도 수원시 권선구  (대표전화) 123-456-7890</p>
      </div> */}
    </div>

  )

}

export default MainPage