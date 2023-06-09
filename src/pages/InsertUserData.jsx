import { useState, useEffect } from 'react';
// 파이어베이서 파일에서 import 해온 db
import {db, auth, storage} from '../config/firebase-config'
// db에 데이터에 접근을 도와줄 친구들
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "../styles/InsertUserData.css";
// 페이지를 이동할때 쓰는 메서드
import { useNavigate } from "react-router-dom"

//수진
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const InsertUserData = () => {
  // input으로 받을 state
  const [newName, setNewName] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newMajor, setNewMajor] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newStudentNo, setNewStudentNo] = useState("");
  const [file, setFile] = useState("");
  const [userGender, setUserGender] = useState("");
  
  // message를 담을 state
  const [nameMessage, setNameMessage] = useState("");
  const [genderMessage, setGenderMessage] = useState("");
  const [ageMessage, setAgeMessage] = useState("");
  const [majorMessage, setMajorMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [studentNoMessage, setStudentNoMessage] = useState("");
  const [fileMessage, setFileMessage] = useState("");

  // 유효성 검사 에러 상태를 담는 state
  const [isName, setIsName] = useState(false);
  const [isGender, setIsGender] = useState(false);
  const [isAge, setIsAge] = useState(false);
  const [isMajor, setIsMajor] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isStudentNo, setIsStudentNo] = useState(false);
  const [isFile, setIsFile] = useState(false);

  // navigate라는 변수에 저장 후 navigate의 인자로 설정한 path값을 넘겨주면 해당 경로로 이동
  const navigate = useNavigate();

  // error를 체크해줄 state
  const [hasError, setHasError] = useState(false);

  const [percent, setPercent] = useState(0);
    
  // 폼 데이터 값이 들어가지 않을 경우 버튼이 클릭되지 않도록 처리
  useEffect(() => {
    if (isName && isAge && isGender && isPhone && isMajor && isStudentNo && isFile) {
      setHasError(false); 
    } else {
      setHasError(true);
    }
  }, [isName, isAge, isGender, isPhone, isMajor, isStudentNo, isFile]); 

  // 유효성 검사 (name)
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setNewName(currentName);
    const NameRegExp =
    /[가-힣]/;
    if (currentName.length < 2 || currentName.length > 5 && !NameRegExp.text(currentName)) {
      setNameMessage("이름은 2글자 이상 5글자 이하로 입력해주세요!");
      setIsName(false);
    } else {
      setNameMessage("");
      setIsName(true);
    }
  };
  // 유효성 검사 (gender)
  const onChangeGender = (e) => {
    const currentGender = e.target.value;
    setNewGender(currentGender);
    if (currentGender === "") {
      setGenderMessage("성별을 선택해주세요!");
      setIsGender(false);
    } else {
      setGenderMessage("");
      setIsGender(true);
      
      if(currentGender === "M"){
        setUserGender("user-M")
      }
      else{
        setUserGender("user-F")
      }
    }
  };
  // 유효성 검사 (major)
  const onChangeMajor = (e) => {
    const currentMajor = e.target.value;
    setNewMajor(currentMajor);
    if (currentMajor === "") {
      setMajorMessage("전공을 선택해주세요!");
      setIsMajor(false);
    } else {
      setMajorMessage("");
      setIsMajor(true);
    }
  }
  // 유효성 검사 (age)
  const onChangeAge = (e) => {
    const currentAge = e.target.value;
    setNewAge(currentAge);
 
    const AgeRegExp =
    /[0-9]/;
    if (!AgeRegExp.test(currentAge)) {
        setAgeMessage(
        "나이를 올바르게 입력해주세요!"
        );
        setIsAge(false);
    } else {
        setAgeMessage("");
        setIsAge(true);
    }
  };
  // 유효성 검사 (phone)
  const onChangePhone = (getNumber) => {
    const currentPhone = getNumber;
    setNewPhone(currentPhone);
    const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
 
    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMessage("올바른 형식이 아닙니다!");
      setIsPhone(false);
    } else {
      setPhoneMessage("사용 가능한 번호입니다!");
      setIsPhone(true);
    }
  };
  // 유효성 검사 (phone의 하이픈 추가)
  const addHyphen = (e) => {
    const currentNumber = e.target.value;
    setNewPhone(currentNumber);
    if (currentNumber.length === 3 || currentNumber.length === 8) {
      setNewPhone(currentNumber + "-");
      onChangePhone(currentNumber + "-");
    } else {
      onChangePhone(currentNumber);
    }
  };
  // 유효성 검사 (studentNo)
  const onChangeStudentNo = (e) => {
    const currentStudentNo = e.target.value;
    setNewStudentNo(currentStudentNo); 
    const StudentNoRegExp =
    /[a-zA-Z0-9]{9}/;
    if (!StudentNoRegExp.test(currentStudentNo)) {
        setStudentNoMessage(
        "9자리의 학번을 입력해주세요!"
        );
        setIsStudentNo(false);
    } else {
        setStudentNoMessage("");
        setIsStudentNo(true);
    }
  };
  // 유효성 검사 (file)
  const onChangeFile = (e) =>{
    const currentFile = e.target.files[0];
    const currentFileName = e.target.files[0].name;

    setFile(currentFile);
    const fileRegExp = /(\.jpg|\.jpeg|\.png)$/i;
    
    if(!fileRegExp.test(currentFileName)){
      setFileMessage("JPG, JPEG, PNG 파일만 업로드해 주세요 !");
      setIsFile(false);
    }
    else{
      setFileMessage("");
      setIsFile(true);
    }

  }
  
  // 스토리지 파일 업로드 메서드
  function handleUpload(user) {
    if (!file) {
      alert("Please upload an image first!");
      }
      
      const storageRef = ref(storage, `/${userGender}/${user}/${file.name}`);
            
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
        const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                
        setPercent(percent);
        },
        (err) => console.log(err),
        () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url);
        });
        }
        );
      
  }

  // 회원가입 및 fireStroe 데이터 생성
  const insertData = async (e) =>{
    e.preventDefault();
    try {
        const date = new Date().getTime();
        const storageRef = ref(storage, `/user/${newName}/${newStudentNo}`);
        // Firebase Authentication에서 생성된 사용자 UID를 가져와 Firestore에 저장
        await setDoc(doc(db, userGender, auth.currentUser.uid), {
            name: newName,
            gender: newGender,
            age: newAge,
            major: newMajor,
            phone: newPhone,
            studentNo: newStudentNo            
        });                
        handleUpload(newName);
        console.log("파일 업로드 성공");
        alert("회원가입을 축하드립니다! 메인페이지로 이동합니다.");
        navigate('/');
    } catch (error) {
        console.log(error.message);
    }
}

return (
    // 유저 정보 입력 페이지 html
    <form onSubmit={insertData}>
        <div id="header">
          <img src="img/daelimlogo.png" id="logo" alt="Daelim101 Logo"/>
        </div>
        <div className="wrapper">
              <div id="content">                                       
                   <div>
                     <h3><label htmlFor="name">이름</label></h3>
                      <span className="box int_name">
                          <input type="text" id="name" className="int" maxLength="4" onChange={onChangeName}/>
                      </span>
                      <span className="message">{nameMessage}</span>
                  </div>
                  <div>
                     <h3><label htmlFor="age">나이</label></h3>
                      <span className="box int_age">
                          <input type="text" id="age" className="int" maxLength="2" onChange={onChangeAge}/>
                      </span>
                      <span className="message">{ageMessage}</span>
                  </div>
                  <div>
                      <h3><label htmlFor="gender">성별</label></h3>
                      <span className="box gender_code">
                          <select id="gender" className="sel" onChange={onChangeGender}>                                                            
                              <option value="">성별 선택</option>
                              <option value="M">남자</option>
                              <option value="F">여자</option>
                          </select>
                      </span>                      
                      <span className="message">{genderMessage}</span>
                  </div>
                  <div>
                      <h3><label htmlFor="phoneNo">휴대전화</label></h3>
                      <span className="box int_phone">
                          <input type="tel" id="phone" className="int" maxLength="16" placeholder="하이픈(-) 형식으로 입력해주세요" onChange={addHyphen}/>
                      </span>
                      <span className="message">{phoneMessage}</span>
                  </div>
                  <div>
                      <h3><label htmlFor="studentNo">학번</label></h3>
                      <span className="box int_studentNo">
                          <input type="text" id="studentNo" className="int" maxLength="9" onChange={onChangeStudentNo}/>
                      </span>
                      <span className="message">{studentNoMessage}</span>
                  </div>
                  <div>
                      <h3><label htmlFor="major">전공</label></h3>
                      <span className="box major_code">
                          <select id="major" className="sel" onChange={onChangeMajor}>         
                              <option value="">전공 선택</option>                     
                              <option value="AI시스템과">AI시스템과</option>
                              <option value="로봇자동화공학과">로봇자동화공학과</option>
                              <option value="건축과">건축과</option>
                              <option value="기계공학과">기계공학과</option>
                              <option value="미래자동차공학부">미래자동차공학부</option>
                              <option value="방송음향영상학부">방송음향영상학부</option>
                              <option value="산업경영과">산업경영과</option>
                              <option value="소방안전설비과">소방안전설비과</option>
                              <option value="전자·통신과">전자·통신과</option>
                              <option value="스마트팩토리학부">스마트팩토리학부</option>
                              <option value="실내디자인학부">실내디자인학부</option>
                              <option value="의공융합과">의공융합과</option>
                              <option value="전기공학과">전기공학과</option>
                              <option value="컴퓨터정보학부">컴퓨터정보학부</option>
                              <option value="건설환경공학과">건설환경공학과</option>
                              <option value="반도체학과">반도체학과</option>
                              <option value="경영학과">경영학과</option>
                              <option value="도서관미디어정보과">도서관미디어정보과</option>
                              <option value="사무행정학과">사무행정학과</option>
                              <option value="사회복지학과">사회복지학과</option>
                              <option value="유아교육과">유아교육과</option>
                              <option value="항공서비스과">항공서비스과</option>
                              <option value="호텔레저학과">호텔레저학과</option>
                              <option value="아동보육과">아동보육과</option>
                              <option value="스포츠학부">스포츠학부</option>
                              <option value="호텔조리·제과학부">호텔조리·제과학부</option>
                              <option value="보건안전학과">보건안전학과</option>
                              <option value="보건의료공학과">보건의료공학과</option>
                              <option value="보건의료행정과">보건의료행정과</option>
                              <option value="언어치료학과">언어치료학과</option>
                              <option value="해군기술부사관과">해군기술부사관과</option>
                          </select>
                      </span>                      
                      <span className="message">{majorMessage}</span>
                  </div>
                  <div>
                      <h3><label htmlFor="photo">본인 사진 첨부</label></h3>
                      <span className="box int_photo">
                          <input type="file" id="photo" multiple accept="image/*" onChange={onChangeFile}/>
                      </span>       
                      <span className="message">{fileMessage}</span>                                                                                                                                                
                  </div>                                            
                  <div className="btn_area">                        
                      <button type="submit" id="btnInsert" disabled={hasError} >
                          <span>입 력 완 료</span>
                      </button>
                      {hasError && <span className="message">모든 정보가 정확히 입력되었는지 확인해주세요 !</span>}
                      {hasError || <span className="message">모든 정보가 정확히 입력되었습니다 ^^</span>}
                  </div>
              </div>
          </div>
    </form> 
  );


}

export default InsertUserData;

