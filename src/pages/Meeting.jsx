import React, { useEffect, useState } from 'react';
import { db, storage } from "../config/firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore"
import '../styles/Meeting.css';
import Swiper from 'swiper';

function Meeting() {
  const [nameArray, setNameArray] = useState([]);
  const [majorArray, setMajorArray] = useState([]);
  const [downloadURLs, setDownloadURLs] = useState([]);

  useEffect(() => {
    var swiper = new Swiper(".swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 350,
        modifier: 1,
        slideShadows: true
      },
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "user-F"));
      const names = [];
      const majors = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        names.push(data.name);
        majors.push(data.major);
      });

      setNameArray(names);
      setMajorArray(majors);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPhoto = async () => {
      const folderRef = ref(storage, "user-F/");
      const folders = await listAll(folderRef);
      const tempDownloadURLs = [];

      for (const folder of folders.prefixes) {
        const files = await listAll(folder);

        for (const file of files.items) {
          const downloadURL = await getDownloadURL(file);
          tempDownloadURLs.push(downloadURL);
        }
      }
      setDownloadURLs(tempDownloadURLs);
    };
    fetchPhoto();
  }, []);

  const [selectedSlide, setSelectedSlide] = useState('t-1');
  return (
    <>
      <header id="header2">
        <div className="Lhead">
          <li><img className="weblogo" src="../img/Daelim_logo.png" /></li>
        </div>
        <div className="Mhead">

          <p>마음에 드는 이성에게 메세지를 남겨보세요♥</p>
        </div>

        <div className="Rhead">


        </div>


      </header>

      <div id="content2">
        <div id="box">
          <div className="slider">
            <input type="radio" name="testimonial" id="t-1"
              checked={selectedSlide === 't-1'}
              onChange={() => setSelectedSlide('t-1')}
            />
            <input type="radio" name="testimonial" id="t-2"
              checked={selectedSlide === 't-2'}
              onChange={() => setSelectedSlide('t-2')}
            />
            <input type="radio" name="testimonial" id="t-3" checked={selectedSlide === 't-3'}
              onChange={() => setSelectedSlide('t-3')}
            />
            <input type="radio" name="testimonial" id="t-4" checked={selectedSlide === 't-4'}
              onChange={() => setSelectedSlide('t-4')}
            />
            <div className="testimonials">
              <label className="item" htmlFor="t-1">
                <img src={downloadURLs[0]} alt="picture" />
                <h1>{nameArray[0]}</h1>
                <p>{majorArray[0]}</p>
                <button className="w-btn w-btn-blue" type="button">
                  messages
                </button>
              </label>
              <label className="item" htmlFor="t-2">
                <img src={downloadURLs[1]} alt="picture" />
                <h1>{nameArray[1]}</h1>
                <p>{majorArray[1]}</p>
                <button className="w-btn w-btn-blue" type="button">
                  messages
                </button>
              </label>
              <label className="item" htmlFor="t-3">
                <img src={downloadURLs[2]} alt="picture" />
                <h1>{nameArray[2]}</h1>
                <p>{majorArray[2]}</p>
                <button className="w-btn w-btn-blue" type="button">
                  messages
                </button>
              </label>
              <label className="item" htmlFor="t-4">
                <img src={downloadURLs[3]} alt="picture" />
                <h1>{nameArray[3]}</h1>
                <p>{majorArray[3]}</p>
                <button className="w-btn w-btn-blue" type="button">
                  messages
                </button>
              </label>
            </div>
          </div>
        </div>
        <div className="dots">
          <label htmlFor="t-1"></label>
          <label htmlFor="t-2"></label>
          <label htmlFor="t-3"></label>
          <label htmlFor="t-4"></label>
        </div>

        <footer id="footer2">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            Github
          </a>
          {/* <nav>
            <p>
              <span>저자: 개발새발</span>
              <br />
              <span>이메일: xxxxxxx@gmail.com</span>
              <br />
              <span>Copyright 2023. daelim. All Rights Reserved.</span>
            </p>
          </nav> */}
        </footer>
      </div>
    </>
  );
}

export default Meeting;