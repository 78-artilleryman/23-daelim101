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
import { flexbox } from '@mui/system';
import { storage } from "../config/firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";




const items = [
    {
        name : "이름",
        src : ""
    },
    {
        name : "이름",
        src : ""
    },
    {
        name : "이름",
        src : ""
    },
    {
        name : "이름",
        src : ""
    },
    {
        name : "이름",
        src : ""
    },
    {
        name : "이름",
        src : ""
    },
    {
        name : "이름",
        src : ""
    },
    {
        name : "이름",
        src : ""
    },
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius : 5,
};

function VsPage(){
    const [hodus, setHodu] = useState([]);
    const [displays, setDisplays] = useState([]);
    const [winnerhodu, setWinners] = useState([]);
    const [roundCount, setRound] = useState(1);
    const [totalRound, setTotal] = useState(4);
    const [winnerdisplay, setWinnerDisplay] = useState(false);
    const currentUrl = window.location.href;


    
    useEffect(() => {
        const getRandomPhotoAndAssignToItem = async (index) => {
            const folderRef = ref(storage, "user-W/"); // 파이어베이스 Storage 폴더 경로 설정

        // 해당 폴더의 모든 폴더 목록 가져오기
        const folders = await listAll(folderRef);

        // 랜덤한 폴더 선택
        const randomFolderIndex = Math.floor(Math.random() * folders.prefixes.length);
        const randomFolder = folders.prefixes[randomFolderIndex];

        // 선택한 폴더의 모든 파일 목록 가져오기
        const files = await listAll(randomFolder);

        // 랜덤한 인덱스 선택
        const randomFileIndex = Math.floor(Math.random() * files.items.length);

        // 랜덤한 인덱스의 파일 다운로드 URL 가져오기
        const randomFile = files.items[randomFileIndex];
        const downloadURL = await getDownloadURL(randomFile);

        items[index].src = downloadURL;
        };

   
    items.forEach((item, index) => {
        getRandomPhotoAndAssignToItem(index);
    });

        items.sort(() => Math.random() - 0.5);
        setHodu(items);
        setDisplays([items[0], items[1]]);

    }, []);

    const clickEvent = hodu => () => {
        if (hodus.length <= 2) {
            if (winnerhodu.length === 0) {
              setDisplays([hodu]);
              setWinnerDisplay(true);
            } else {
              let updatedHodu = [...winnerhodu, hodu];
              setHodu(updatedHodu);
              setDisplays([updatedHodu[0], updatedHodu[1]]);
              setWinners([]);
              setRound(1);
              setTotal(totalRound / 2);
            }
        } 
        else if (hodus.length > 2) {
            setWinners([...winnerhodu, hodu]);
            setDisplays([hodus[2], hodus[3]]);
            setHodu(hodus.slice(2));
            setRound(roundCount + 1);
        }
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleKakaoButton = () => {
        window.Kakao.Link.sendScrap({
            requestUrl: currentUrl, 
    })};

    return(
        <div className={styles.page}>
            <div className={styles.card}>
                {winnerdisplay ? (
                    <div>
                        <h1 className={styles.title}>
                            최종<br/>
                            
                        </h1>
                        <div className={styles.title}>
                            <img className={styles.winnerhodu} src={displays[0].src}/>
                        </div>
                        <div className={styles.title}>
                            <label>{displays[0].name}</label>
                        </div>
                        <div className={styles.action}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Button>다시하기</Button>
                            </Link>
                            <Button onClick={handleOpen}>공유하기</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        공유하기
                                    </Typography>
                                    <CopyToClipboard text={currentUrl}>
                                        <Button id="modal-modal-description" sx={{ mt: 2 }}>
                                            <AiOutlineLink/>
                                            &nbsp;링크 복사하기
                                        </Button>
                                    </CopyToClipboard>
                                    <br/>
                                    
                                </Box>
                            </Modal>
                            
                        </div>
                    </div>
                ) : (
                <div>
                    <h1 className={styles.title}>
                        이상형 월드컵&nbsp;&nbsp;(여성)&nbsp;&nbsp;{roundCount}/{totalRound}
                    </h1>
                    <div className={styles.basic}>
                    {
                        displays.map(d => {
                            return (
                                <div className={styles.vsImg} key={d.name} onClick={clickEvent(d)}>
                                    <img className={styles.kinghodu} src={d.src} />
                                    <div>{d.name}</div>
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
                )
            }
            </div>
        </div>
    );
}

export default VsPage;