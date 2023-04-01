import React from "react";
import './App.css';
import { useEffect } from 'react';
import ChatGpt from  "./ChatGpt"
import Detailview from "./Detailview"
//import Detail from "./Detail";
import { router } from './Detail';
import Detail from "./Detail";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from "@chatscope/chat-ui-kit-react"

import {Routes,Route,Link, BrowserRouter} from "react-router-dom";

// import Kakao from "./kakao/Kakao";


// import Home from "./pages/Home";
// import About from "./pages/About";
// import Counter from "./pages/Counter";
// import Input from "./pages/Input";
// import Input2 from "./pages/Input2";
// import List from "./pages/List";
//<Link> a 태그 같은것 사용하려면 임포트 두개 해야함
function App() {  
  const new_script = src => { 
    return new Promise((resolve, reject) => { 
      const script = document.createElement('script'); 
      script.src = src; 
      script.addEventListener('load', () => { 
        resolve(); 
      }); 
      script.addEventListener('error', e => { 
        reject(e); 
      }); 
      document.head.appendChild(script); 
    }); 
  };
  
  

  useEffect(() => { 
    //카카오맵 스크립트 읽어오기
    const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=b6d8597b532512782b06bacbe71ad02f');
    
    //스크립트 읽기 완료 후 카카오맵 설정
    my_script.then(() => { 
      console.log('script loaded!!!');  
      var kakao = window['kakao']; 
      kakao.maps.load(() => {
        var mapContainer = document.getElementById('map');
        var options = { 
          center: new kakao.maps.LatLng(37.62452719218404  ,127.66474549315299), //좌표설정
          level: 13
          
        };
        
        
        var map = new kakao.maps.Map(mapContainer, options); //맵생성
        //마커설정

        
        var markerPosition = new kakao.maps.LatLng(37.56000302825312, 126.97540593203321); 
        var marker = new kakao.maps.Marker({ 
        position: markerPosition
        }); 
        marker.setMap(map); 

        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
          // 클릭한 위도, 경도 정보를 가져옵니다 
          var latlng = mouseEvent.latLng; 
          
          // 마커 위치를 클릭한 위치로 옮깁니다
          marker.setPosition(latlng);
          
          
           // 클릭 이벤트 관리
          
           var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
           iwRemoveable = true;
           var infowindow = new kakao.maps.InfoWindow({
             content : iwContent,
             removable : iwRemoveable
         })
           kakao.maps.event.addListener(marker, 'click', function() {
             // 마커 위에 인포윈도우를 표시합니다
             infowindow.open(map, marker);  
           })
          });
      
      });   
    }); 
  }, []);
  
  


  return (
    <div className="App">
      <div className="mom">   
           <button className="sbtn" >start</button>
           <div className="Start">
      </div>
      </div>
      <div id="map" className="map"/>
      <ChatGpt />
      <Link to="/detail"><Detailview/></Link>
    </div>
  );
}


export default App;
