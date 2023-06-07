import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect, useMemo } from "react";
import { Link } from 'react-router-dom';
import king from './img/daelimlogo.png';
import styles from './startpage.module.css';

function StartPage(){
    const [vsChange, setVs] = useState();

    const handleChange = (event) => {
        setVs(event.target.value);
    };
    const options = useMemo(
        () => [
          
          { value: "8강", label: "8강" },
        ],
        []
      );

    return(
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>대림대학교 이상형 월드컵</h1>
                <div className={styles.basic}>
                    <img className={styles.king} src={king} title="메인"/>
                    <h4 className={styles.introduce}>
                    대림대학교에 재학중인 학생들 중 이상형을 뽑아보세요!
                    </h4>
                </div>
                <div className={styles.action}>
                    <FormControl className={styles.selection}>
                        <InputLabel id="demo-simple-select-label">성별</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={vsChange}
                            label="성별"
                            onChange={handleChange}
                        >
                            
                            <MenuItem value={16}>남성</MenuItem>
                            <MenuItem value={8}>여성</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className={styles.action}>
                {vsChange === 8 ? 
                    (
                    <Link to="vsWomen">
                        <button className={styles.button}>시작하기</button>
                    </Link>
                    )
                    :
                    vsChange === 16 ?
                    (
                        <Link to="vsMen">
                        <button className={styles.button}>시작하기</button>
                        </Link>
                    )
                    :
                    
                    (
                        <button className={styles.button}>시작하기</button>
                    )
                }
                </div>
                
            </div>
        </div>
    );
}

export default StartPage;