import React from 'react';
import { useState, useEffect } from "react";
import styles from "./vspage.module.css";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AiOutlineLink } from "react-icons/ai";
import { RiKakaoTalkLine } from "react-icons/ri";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { storage } from "../config/firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";


  const WorldCup = ({ downloadURLs }) => {
    const [currentRound, setCurrentRound] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
  
    const handleImageClick = (image) => {
      setSelectedImage(image);
      proceedToNextRound();
    };
  
    const proceedToNextRound = () => {
      if (currentRound < 15) {
        setCurrentRound(currentRound + 1);
        setSelectedImage(null);
      } else {
        // Display the winner or perform any final actions
        console.log('World Cup Winner:', selectedImage);
      }
    };
  
    const renderMatchup = (index) => {
      const imageA = downloadURLs[index * 2];
      const imageB = downloadURLs[index * 2 + 1];
  
      return (
        <div className="matchup">
          <img src={imageA} alt="Image A" onClick={() => handleImageClick(imageA)} />
          <span>VS</span>
          <img src={imageB} alt="Image B" onClick={() => handleImageClick(imageB)} />
        </div>
      );
    };
  
    return (
      <div className="world-cup">
        <h1>16 Rounds World Cup</h1>
        {currentRound < 16 ? (
          <>
            <h2>Round {currentRound + 1}</h2>
            {renderMatchup(currentRound)}
          </>
        ) : (
          <h2>World Cup Finished</h2>
        )}
      </div>
    );
  };
  
  export default WorldCup;