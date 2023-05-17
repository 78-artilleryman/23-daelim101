import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Loading from './pages/Loading';
import InsertUserData from './pages/InsertUserData';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import MainPage from './pages/MainPage';
import { useScript } from "./hook";
import StartPage from "./startpage";
import VsPage from "./vspage";
import Vs16Page from "./vs16page";
import styles from"./app.module.css";


function App() {

  const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");

  useEffect(() => {
		if (status === "ready" && window.Kakao) {
			// 중복 initialization 방지
			if (!window.Kakao.isInitialized()) {
				// 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
				window.Kakao.init("185c4134df1cd7fb447ca3ee820e1b97");
			}
		}
	}, [status]);	

  return (
    <div className="daelim101">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/loading" element={<Loading />}></Route>
          <Route path="/userData" element={<InsertUserData />}></Route>    
          <Route path='/worldcup' element={<StartPage/>} />
          <Route path='/worldcup/vs8' element={<VsPage/>} />
          <Route path='/worldcup/vs16' element={<Vs16Page/>} />      
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
