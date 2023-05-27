import React, { useState,useEffect } from 'react';
import '../styles/MyPage.css';
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


const MyPage = () =>{
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
    //   const getUserAge = async (uid) => {
    //     try {
    //       const firestore = getFirestore();
    //       const userRef = doc(firestore, 'users', uid);
    //       const userDoc = await getDoc(userRef);
    
    //       if (userDoc.exists()) {
    //         const userData = userDoc.data();
    //         return userData.age;
            
    //       } else {
    //         console.log('User document does not exist');
    //         return '';
    //       }
    //     } catch (error) {
    //       console.log(error);
    //       return '';
    //     }
    //   };

    return(
    <div>
      <div className="header_mypage">
        <div className="Lhead">
          <li><img className="logo_allrank" src="img/daelimlogo.png" alt="Player 1" /></li>
          <h1>MyPage</h1>
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

      <section className="about">
        <div className="card">
          <div className="profile">
            <img className="profile-image" src="img/symbol.png" id="profile-image" />
            <div className="modal">
              <div className="modal-content">
                <button className="close-btn">&times;</button>
                <form>
                  <div id="wrapper">
                    <div id="content">
                      <div>
                        <h3 className="join_title">
                          <label htmlFor="id">아이디</label>
                        </h3>
                        <span className="box int_id">
                          <input type="text" id="id" className="int" maxLength="20" />
                        </span>
                        <span className="error_next_box"></span>
                      </div>

                      <div>
                        <h3 className="join_title"><label for="name">이름</label></h3>
                        <span className="box int_name">
                          <input type="text" id="name" className="int" maxlength="20" />
                        </span>
                        <span className="error_next_box"></span>
                      </div>

                      <div>
                        <h3 className="join_title"><label for="yy">생년월일</label></h3>

                        <div id="bir_wrap">
                          <div id="bir_yy">
                            <span className="box">
                              <input type="text" id="yy" className="int" maxlength="4" placeholder="년(4자)" />
                            </span>
                          </div>

                          <div id="bir_mm">
                            <span className="box">
                              <select id="mm" className="sel">
                                <option>월</option>
                                <option value="01">1</option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="04">4</option>
                                <option value="05">5</option>
                                <option value="06">6</option>
                                <option value="07">7</option>
                                <option value="08">8</option>
                                <option value="09">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                              </select>
                            </span>
                          </div>

                          <div id="bir_dd">
                            <span className="box">
                              <input type="text" id="dd" className="int" maxlength="2" placeholder="일" />
                            </span>
                          </div>

                        </div>
                        <span className="error_next_box"></span>
                      </div>

                      <div>
                        <h3 className="join_title"><label for="gender">성별</label></h3>
                        <span className="box gender_code">
                          <select id="gender" className="sel">
                            <option>성별</option>
                            <option value="M">남자</option>
                            <option value="F">여자</option>
                          </select>
                        </span>
                        <span className="error_next_box">필수 정보입니다.</span>
                      </div>

                      <div>
                        <h3 className="join_title"><label for="email">본인확인 이메일<span className="optional">(선택)</span></label></h3>
                        <span className="box int_email">
                          <input type="text" id="email" className="int" maxlength="100" placeholder="선택입력" />
                        </span>
                        <span className="error_next_box">이메일 주소를 다시 확인해주세요.</span>
                      </div>

                      <div>
                        <h3 className="join_title"><label for="phoneNo">휴대전화</label></h3>
                        <span className="box int_mobile">
                          <input type="tel" id="mobile" className="int" maxlength="16" placeholder="전화번호 입력" />
                        </span>
                        <span className="error_next_box"></span>
                      </div>

                      <div>
                        <h3 className="join_title"><label for="studentNo">학번</label></h3>
                        <span className="box int_studentNo">
                          <input type="text" id="studentNo" className="int" maxlength="9" />
                        </span>
                        <span className="error_next_box"></span>
                      </div>

                      <div>
                        <h3 className="join_title"><label for="major">전공</label></h3>
                        <span className="box major_code">
                          <select id="major" className="sel">
                            <option>전공 선택</option>
                            <option value="ai">AI시스템과</option>
                            <option value="robot">로봇자동화공학과</option>
                            <option value="architectural">건축과</option>
                            <option value="mechanic">기계공학과</option>
                            <option value="car">미래자동차공학부</option>
                            <option value="broadcast">방송음향영상학부</option>
                            <option value="industry">산업경영과</option>
                            <option value="fireSafety">소방안전설비과</option>
                            <option value="electronicCommunication">전자·통신과</option>
                            <option value="smartFactory">스마트팩토리학부</option>
                            <option value="design">실내디자인학부</option>
                            <option value="medical">의공융합과</option>
                            <option value="electronic">전기공학과</option>
                            <option value="computer">컴퓨터정보학부</option>
                            <option value="construction">건설환경공학과</option>
                            <option value="semiconductor">반도체학과</option>
                            <option value="business">경영학과</option>
                            <option value="media">도서관미디어정보과</option>
                            <option value="office">사무행정학과</option>
                            <option value="social">사회복지학과</option>
                            <option value="childEducation">유아교육과</option>
                            <option value="air">항공서비스과</option>
                            <option value="hotelLeisure">호텔레저학과</option>
                            <option value="childCare">아동보육과</option>
                            <option value="sport">스포츠학부</option>
                            <option value="hotelCook">호텔조리·제과학부</option>
                            <option value="healthSafety">보건안전학과</option>
                            <option value="biomedical">보건의료공학과</option>
                            <option value="medicalAdministration">보건의료행정과</option>
                            <option value="speech">언어치료학과</option>
                            <option value="navy">해군기술부사관과</option>
                          </select>
                        </span>
                        <span className="error_next_box"></span>
                      </div>

                      <div>
                        <h3 className="join_title"><label for="photo">본인 사진 첨부</label></h3>
                        <span className="box int_photo">
                          <input type="file" id="photo" multiple />
                        </span>
                        <span className="error_next_box"></span>
                      </div>
                      <div className="btn_area">
                        <button type="button" id="btnJoin">
                          <span>저장하기</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="info">
            <div className="name">
              <p><span>JENNY</span>&nbsp;<span>YEJEE CHO</span></p>
            </div>

            <div className="student-id">
              <p>
                <span className="bu" >컴퓨터정보학부</span>
                &nbsp;<span className="student-id">20151515</span>
              </p>
            </div>

            <div className="contacts" >
              <p className="birth">🎂1995.09.21</p>
              <p className="phone">📞+(82)10-5120-6319</p>
              <p className="email">📧choyejee14@gmail.com</p>
            </div>

            <div className="ranking">
              <div className="rankingtext">
                <p>
                  내 랭킹</p>
              </div>
              <div className="rankingN">
                <p>
                  N 위</p>
              </div>
            </div>

          </div>
          <div className="daelim" >
            <img src="img/symbol.png" />
          </div>
        </div>

        <footer>
          <div id="bottomMenu">
            <ul>
              <li><a href="#">회사 소개</a></li>
              <li><a href="#">개인정보처리방침</a></li>
              <li><a href="#">약관</a></li>
              <li><a href="#">사이트맵</a></li>
            </ul>
          </div>
          <div id="company">
            <p>경기도 수원시 권선구  (대표전화) 123-456-7890</p>
          </div>
        </footer>
      </section>
    </div>

  );
}

function Footer() {
  // footer 내용
  return (
    <footer>
      <p>저작권 정보</p>
    </footer>
  );
}

export default MyPage