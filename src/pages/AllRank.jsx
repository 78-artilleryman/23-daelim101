import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from "../config/firebase-config";
import { getDoc, doc } from 'firebase/firestore'
import '../styles/AllRank.css';
import { signOut, onAuthStateChanged } from 'firebase/auth';

function AllRank() {

    //검색기능//
  const search = () => {
    const input = document.querySelector('input[type="text"]').value.toLowerCase();
    const rows = document.querySelectorAll('.rank-list tbody tr');
    for (let i = 0; i < rows.length; i++) {
      const name = rows[i].querySelector('td:nth-child(2)').textContent.toLowerCase();
      if (name.includes(input)) {
        rows[i].style.display = '';
      } else {
        rows[i].style.display = 'none';
      }
    }
  };

  //header 상단 월드컵가기, 로그인, 회원가입//
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
      const userRef = doc(db, 'user-F', uid);
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
    <header>

      <div className="Lhead">
        <li><img className="logo_allrank" src="img/daelimlogo.png" alt="Player 1" /></li>
        <h1>Support Ranklist</h1>
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

      <div className="image-container">
        <div className="two">
          <img src="img/my.png" />
          <div className="topscore">
            <p className="percent">74.3%</p>
          </div>
          <br />
          <div className="topname">
            <p>은하은</p>
            <p className="insta" >@jellyfish</p>
          </div>
        </div>

        <div className="own">
          <img src="img/my.png" />
          <div className="topscore">
            <p className="percent">80.27%</p>
          </div>
          <br />
          <div className="topname">
            <p>금민서</p>
            <p className="insta">@fantazi_030</p>
          </div>
        </div>

        <div className="three">
          <img src="img/my.png" />
          <div className="topscore">
            <p className="percent">71.01%</p>
          </div>
          <br />
          <div className="topname">
            <p>동윤서</p>
            <p className="insta">@son_0111</p>
          </div>
        </div>
      </div>

    </header>

    <main>
      <div className="search-container">
        <input type="text" placeholder="이름 또는 학번으로 검색해보세요!" id="search-input" />
        <button type="submit" onClick={search}>검색</button>
      </div>

      <div className="ranking-system">
        <div className="rank-list">
          <table>
            <tbody>

              <tr>
                <td>4</td>
                <td className="jb-th-1">
                  <span className="jb-th-1_img"><img src="img/my.png" alt="Player 1" /></span>
                  player1
                  <span className="nomber">
                    &nbsp;20202021
                  </span>
                </td>
                <td>62.85%<br />
                </td>
              </tr>

              <tr>
                <td>5</td>
                <td className="jb-th-1">
                  <span className="jb-th-1_img"><img src="img/my.png" alt="Player 1" /></span>
                  player2
                  <span className="nomber">
                    &nbsp;20202020
                  </span>
                </td>
                <td>60.25%<br />
                </td>
              </tr>

              <tr>
                <td>6</td>
                <td className="jb-th-1">
                  <span className="jb-th-1_img"><img src="img/my.png" alt="Player 1"  /></span>
                  player3
                  <span className="nomber">
                    &nbsp;20202020
                  </span>
                </td>
                <td>60.8%<br />
                </td>
              </tr>

              <tr>
                <td>7</td>
                <td className="jb-th-1">
                  <span className="jb-th-1_img"><img src="img/my.png" alt="Player 1" /></span>
                  player3
                  <span className="nomber">
                    &nbsp;20202020
                  </span>
                </td>
                <td>60.8%<br />
                </td>
              </tr>

              <tr>
                <td>8</td>
                <td className="jb-th-1">

                  <span className="jb-th-1_img"><img src="img/my.png" alt="Player 1" /></span>
                  player3
                  <span className="nomber">
                    &nbsp;20202020
                  </span>
                </td>
                <td>60.8%<br />
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </main>
</div> );
}
export default AllRank;