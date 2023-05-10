import { useState, useEffect } from 'react';
// 파이어베이서 파일에서 import 해온 db
import {db, auth, storage} from './firebaseCross'
// db에 데이터에 접근을 도와줄 친구들
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { async } from '@firebase/util';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./Join.css";

function Join() {
  // input으로 받을 state
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");
  const [newName, setNewName] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newMajor, setNewMajor] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newStudentNo, setNewStudentNo] = useState("");
  const [file, setFile] = useState("");
  
  const [percent, setPercent] = useState(0);


  // message를 담을 state
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [ageMessage, setAgeMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [studentNoMessage, setStudentNoMessage] = useState("");

  // error 상태를 담을 state
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isAge, setIsAge] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isStudentNo, setIsStudentNo] = useState(false);
  const [isFile, setIsFile] = useState(false);

  // error를 체크해줄 state
  const [hasError, setHasError] = useState(false);
  // changed를 true로 바꿔주면 되지않을까?
  const [changed, setChanged] = useState(false);

 // 이따가 users 추가하고 삭제하는거 진행을 도와줄 state
  const [users, setUsers] = useState([]);
  // db의 users 컬렉션을 가져옴
  const usersCollectionRef = collection(db, "user");

   // 시작될때 한번만 실행 // 읽어오기 
  useEffect(()=>{
  	// 비동기로 데이터 받을준비
    const getUsers = async () => {
     // getDocs로 컬렉션안에 데이터 가져오기
      const data = await getDocs(usersCollectionRef);
      // users에 data안의 자료 추가. 객체에 id 덮어씌움
      setUsers(data.docs.map((doc)=>({ ...doc.data(), id: doc.id})))
    }

    getUsers();
    // 뭐든 동작할때마다 changed가 true값으로 변경되니까 화면을 그리고 다시 false로 돌려줘야지 다시 써먹는다.
    setChanged(false)
  },[changed]) // 처음에 한번 그리고, changed가 불릴때마다 화면을 다시 그릴거다
  
  useEffect(() => {
    if (isName && isEmail && isPassword && isPasswordConfirm && isAge && isPhone && isStudentNo && isFile) {
      setHasError(false); 
    } else {
      setHasError(true);
    }
  }, [isName, isEmail, isPassword, isAge, isPasswordConfirm, isPhone, isStudentNo, isFile]); 

  
  // 유효성 검사 (email)
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setRegisterEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
 
    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다!");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일 입니다.");
      setIsEmail(true);
    }
  };
  // 유효성 검사 (password)
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setRegisterPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };
  // 유효성 검사 (passwordConfirm)
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setRegisterPasswordConfirm(currentPasswordConfirm);
    if (registerPassword !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 똑같지 않아요!");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
      setIsPasswordConfirm(true);
    }
  };
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
  // 유효성 검사 (Age)
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
    if (currentNumber.length == 3 || currentNumber.length == 8) {
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
    /[0-9]{9}/;
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

  const onChangeFile = (e) =>{
    const currentFile = e.target.files[0];
    setFile(currentFile);
    
    
      setIsFile(true);

  }

// 파일 가져오는 메서드

 // 스토리지 파일 업로드 메서드
  function handleUpload(user) {
    if (!file) {
      alert("Please upload an image first!");
      }
      
      const storageRef = ref(storage, `/user/${user}/${file.name}`);
      
      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
        const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        
        // update progress
        setPercent(percent);
        },
        (err) => console.log(err),
        () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url);
        });
        }
        );
      
  }

  // 회원가입 및 fireStroe 데이터 생성
  const createUsers = async (e) =>{
    e.preventDefault();
    // 회원가입(이메일, 비밀번호)
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
        );
        const user = userCredential.user;
        console.log(user);
        
        // Firebase Authentication에서 생성된 사용자 UID를 가져와 Firestore에 저장
        await setDoc(doc(db, "user", user.uid), {
            name: newName,
            gender: newGender,
            age: newAge,
            major: newMajor,
            phone: newPhone,
            studentNo: newStudentNo
        });
        
        handleUpload(user.uid);

        
        // 화면 업데이트를 위한 state 변경
        setChanged(true);
    } catch (error) {
        console.log(error.message);
    }
}
 
  return (
    // 회원가입 페이지 html
    <form onSubmit={createUsers}>
        <div id="header">
          <img src="img/Daelim_logo.png" id="logo" />
        </div>
        <div className="wrapper">
              <div id="content">
                  <div>
                      <h3 className="join_title">
                          <label htmlFor="email">이메일</label>
                      </h3>
                      <span className="box int_email">
                        <input type="text" id="email" className="int" maxLength="30" onChange={onChangeEmail}/>                       
                      </span>
                      <span className="message">{emailMessage}</span>
                      
                  </div>
                  <div>
                      <h3 className="join_title"><label htmlFor="pswd1">비밀번호</label></h3>
                      <span className="box int_pass">
                          <input type="text" id="pswd1" className="int" maxLength="20" onChange={onChangePassword}/>
                          <span id="alertTxt">사용불가</span>
                      </span>
                      <span className="message">{passwordMessage}</span>
                  </div>
                  <div>
                        <h3 className="join_title"><label htmlFor="pswd2">비밀번호 재확인</label></h3>
                        <span className="box int_pass_check">
                            <input type="text" id="pswd2" className="int" maxLength="20" onChange={onChangePasswordConfirm}/>
                        </span>
                        <span className="message">{passwordConfirmMessage}</span>
                </div>
                   <div>
                     <h3 className="join_title"><label htmlFor="name">이름</label></h3>
                      <span className="box int_name">
                          <input type="text" id="name" className="int" maxLength="4" onChange={onChangeName}/>
                      </span>
                      <span className="message">{nameMessage}</span>
                  </div>
                  <div>
                     <h3 className="join_title"><label htmlFor="age">나이</label></h3>
                      <span className="box int_age">
                          <input type="text" id="age" className="int" maxLength="2" onChange={onChangeAge}/>
                      </span>
                      <span className="message">{ageMessage}</span>
                  </div>
                  <div>
                      <h3 className="join_title"><label htmlFor="gender">성별</label></h3>
                      <span className="box gender_code">
                          <select id="gender" className="sel" onChange={(event)=> {setNewGender(event.target.value)}}>                              
                              <option>성별</option>
                              <option value="M">남자</option>
                              <option value="F">여자</option>
                          </select>
                      </span>                      
                  </div>
                  <div>
                      <h3 className="join_title"><label htmlFor="phoneNo">휴대전화</label></h3>
                      <span className="box int_phone">
                          <input type="tel" id="phone" className="int" maxLength="16" placeholder="하이픈(-) 형식으로 입력해주세요" onChange={addHyphen}/>
                      </span>
                      <span className="message">{phoneMessage}</span>
                  </div>
                  <div>
                      <h3 className="join_title"><label htmlFor="studentNo">학번</label></h3>
                      <span className="box int_studentNo">
                          <input type="text" id="studentNo" className="int" maxLength="9" onChange={onChangeStudentNo}/>
                      </span>
                      <span className="message">{studentNoMessage}</span>
                  </div>
                  <div>
                      <h3 className="join_title"><label htmlFor="major">전공</label></h3>
                      <span className="box major_code">
                          <select id="major" className="sel" onChange={(event)=> {setNewMajor(event.target.value)}}>
                              <option>전공 선택</option>
                              <option value="ai">AI시스템과</option>
                              <option value="robot">로봇자동화공학과</option>
                              <option value="architectural">건축과</option>
                              <option value="mechanic">기계공학과</option>
                              <option value="car">미래자동차공학부</option>
                              <option value="broadcast">방송음향영상학부</option>
                              <option value="industry">산업경영과</option>
                              <option value="fireSafety">소방안전설비과</option>
                              <option value="electronicCommunication">전자·통신과</option>
                              <option value="smartFactory">스마트팩토리학부</option>
                              <option value="design">실내디자인학부</option>
                              <option value="medical">의공융합과</option>
                              <option value="electronic">전기공학과</option>
                              <option value="computer">컴퓨터정보학부</option>
                              <option value="construction">건설환경공학과</option>
                              <option value="semiconductor">반도체학과</option>
                              <option value="business">경영학과</option>
                              <option value="media">도서관미디어정보과</option>
                              <option value="office">사무행정학과</option>
                              <option value="social">사회복지학과</option>
                              <option value="childEducation">유아교육과</option>
                              <option value="air">항공서비스과</option>
                              <option value="hotelLeisure">호텔레저학과</option>
                              <option value="childCare">아동보육과</option>
                              <option value="sport">스포츠학부</option>
                              <option value="hotelCook">호텔조리·제과학부</option>
                              <option value="healthSafety">보건안전학과</option>
                              <option value="biomedical">보건의료공학과</option>
                              <option value="medicalAdministration">보건의료행정과</option>
                              <option value="speech">언어치료학과</option>
                              <option value="navy">해군기술부사관과</option>
                          </select>
                      </span>                      
                  </div>
                  <div>
                      <h3 className="join_title"><label htmlFor="photo">본인 사진 첨부</label></h3>
                      <span className="box int_photo">
                          <input type="file" id="photo" multiple accept="image/*" onChange={onChangeFile} />
                      </span>                                                                             
                  </div>                                            
                  <div className="btn_area">                        
                      <button type="submit" id="btnJoin" disabled={hasError}>
                          <span>가 입 하 기</span>
                      </button>
                  </div>
              </div>
          </div>
    </form> 
  );
}

export default Join;