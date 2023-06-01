import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Loading from './pages/Loading';
import InsertUserData from './pages/InsertUserData';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import MainPage from './pages/MainPage';
import StartPage from "./worldcupPages/startpage";
import VsPage from "./worldcupPages/vspage";
import WorldCup from "./worldcupPages/vs16page";
import { LoadRandomPhotos } from "./worldcupPages/random";
import AllRank from "./pages/AllRank";



function App() {
  const [downloadURLs, setDownloadURLs] = useState([]);
  

  useEffect(() => {
    LoadRandomPhotos(5)
    .then((downloadURLs) => {
      console.log(downloadURLs); // 랜덤으로 선택된 5장의 사진의 다운로드 URL 출력
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  

  return (
    <div className="daelim101">      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/loading" element={<Loading />}/>
          <Route path="/userData" element={<InsertUserData />}/>
          <Route path='/random' element={<LoadRandomPhotos/>}/>
          <Route path='/worldcup' element={<StartPage/>}/>
          <Route path='/worldcup/vs8' element={<VsPage/>}/>
          <Route path='/worldcup/vs16' element={<WorldCup />}/>
          <Route path="/allRank" element={<AllRank />}></Route>       
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
