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

export const LoadRandomPhotos = async () => {
    const userFolderRef = ref(storage, "user-W/");
    const uidFolders = await listAll(userFolderRef);
    const randomUidFolder =
      uidFolders.prefixes[Math.floor(Math.random() * uidFolders.prefixes.length)];
    const files = await listAll(randomUidFolder);
  
    const downloadURLs = []; // URL을 저장할 빈 배열 초기화
  
    for (const file of files.items) {
      const downloadURL = await getDownloadURL(file);
      downloadURLs.push(downloadURL); // 각 URL을 배열에 추가
    }
  
    return downloadURLs;
  };
