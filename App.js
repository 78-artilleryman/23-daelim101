import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
    <div className={styles.skin}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='/' element={<StartPage/>} />
          <Route path='/vs8' element={<VsPage/>} />
          <Route path='/vs16' element={<Vs16Page/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
