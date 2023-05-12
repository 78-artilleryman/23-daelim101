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

const items = [
    {
        name : "남자",
        src : require("./img/1.jpg")
    },
    {
        name : "남자",
        src : require("./img/2.jpg")
    },
    {
        name : "남자",
        src : require("./img/3.jpg")
    },
    {
        name : "남자",
        src : require("./img/4.jpg")
    },
    {
        name : "남자",
        src : require("./img/5.jpg")
    },
    {
        name : "남자",
        src : require("./img/6.jpg")
    },
    {
        name : "남자",
        src : require("./img/7.jpg")
    },
    {
        name : "남자",
        src : require("./img/8.jpg")
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

function VsPage16(){
    
    const currentUrl = window.location.href;
    const [hodus, setHodu] = useState([]);

    useEffect(() => {
        items.sort(() => Math.random() - 0.5);
        setHodu(items);
        setDisplays([items[0], items[1]]);
    }, []);

    const [displays, setDisplays] = useState([]);
    const [winnerdisplay, setWinnerDisplay] = useState(false);
    const [winnerhodu, setWinners] = useState([]);
    const [roundCount, setRound] = useState(1);
    const [totalRound, setTotal] = useState(8);

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
                            최종
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
                                    <Button id="modal-modal-description" sx={{ mt: 2 }} onClick={handleKakaoButton}>
                                        <RiKakaoTalkLine/>
                                        &nbsp;카카오톡 공유하기
                                    </Button>
                                </Box>
                            </Modal>
                        </div>
                    </div>
                ) : (
                <div>
                    <h1 className={styles.title}>
                        이상형 월드컵 &nbsp;&nbsp;남성&nbsp;&nbsp;{roundCount}/{totalRound}
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

export default VsPage16;