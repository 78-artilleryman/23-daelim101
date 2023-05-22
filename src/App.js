import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Loading from './pages/Loading';
import InsertUserData from './pages/InsertUserData';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import MainPage from './pages/MainPage';
import { useScript } from "./hooks/hook";
import StartPage from "./worldcupPages/startpage";
import VsPage from "./worldcupPages/vspage";
import WorldCup from "./worldcupPages/vs16page";
import { LoadRandomPhotos } from "./worldcupPages/random";



function App() {

  const [downloadURLs, setDownloadURLs] = useState([]);
  

  useEffect(() => {
    // Load random photos when the component mounts
    LoadRandomPhotos().then((urls) => {
      setDownloadURLs(urls);
    });
  }, []);

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
          <Route path='/worldcup' element={<StartPage/>}></Route>
          <Route path='/worldcup/vs8' element={<VsPage/>}></Route>
          <Route path='/worldcup/vs16' element={<WorldCup downloadURLs={downloadURLs}/>}></Route>     
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
