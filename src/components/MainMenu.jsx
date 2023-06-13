import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../config/firebase-config";
import { doc, getDoc } from "firebase/firestore";


const MainMenu = () => {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const [isActive , setIsActive] = useState(false);
  const dropdownRef = useRef();

  const onClick = () => setIsActive(!isActive);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user)=>{
      if(user){
        const userName = await getUserName(user.uid);
        setName(userName);
      }
    });

    return ()=>{
      unsubscribe();
    }
  },[]);

  const getUserName = async (uid) => {
    try {
      const userRef = doc(db, 'user-M', uid);
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

  const Logout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.log("error");
    });
  }
  
  
  return(
    <div className="mainmenu">
      <Link to="/" className="logo">
        <img src="img/logo.png" alt="" />
        </Link>
        <div className="menu-container">
          <button onClick={onClick} className="menu-trigger">
            <span>{name}</span>
            <img src={currentUser.photoURL} alt="User avatar" />
          </button>
          <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
            <ul>
              <li><Link to="/mypage">My Page</Link></li>
              <li><Link to="/worldcup">World Cup</Link></li>
              <li><Link to="/meeting">Meeting</Link></li>
              <li><button onClick={Logout}>logout</button></li>
            </ul>
          </nav>
        </div>
    </div>
  );
}

export default MainMenu