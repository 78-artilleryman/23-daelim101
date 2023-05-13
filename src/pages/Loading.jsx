import React, {useState, useEffect} from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Loading = () => {        
    const [emailVerified, setEmailVerified] = useState(false);
    const navigate = useNavigate();

  useEffect(() => {  
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailVerified(user.emailVerified);
      }
    });

    // 1초마다 Firebase에서 현재 로그인한 사용자의 이메일 인증 상태를 가져와서 체크
    const intervalId = setInterval(() => {
      if (emailVerified) {
        navigate('/userData');
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

  return (
    <div>
      {emailVerified ? (
        <span>이메일 인증 확인이 되었습니다. 잠시만 기다려주세요.</span>
      ) : (
        <span>이메일 인증 확인이 아직 안되었습니다…</span>
      )}
    </div>
  );
}
    
export default Loading;