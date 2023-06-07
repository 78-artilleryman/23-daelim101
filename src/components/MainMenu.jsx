import React from "react";
import { Link } from "react-router-dom";


const MainMenu = () => {

  
  return(
    <div className="mainmenu">
      <Link to="/" className="logo">
        <img src="img/logo.png" alt="" />
        <div className="icon">
          <Link to="/mypage">
          <img src="img/user.png" alt="" />
          </Link>
          <Link to="/home">
          <img src="img/chat.png" alt="" />
          </Link>
        </div>
      </Link>
    </div>
  );
}

export default MainMenu 