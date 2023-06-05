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
import AllRank from "./pages/AllRank";
import Meeting from "./pages/Meeting";



function App() {
  

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
          <Route path="meeting" element={<Meeting />}/>
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
