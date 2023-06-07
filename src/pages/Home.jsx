import React from 'react'
import MainMenu from "../components/MainMenu"
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import style from '../style.scss'

const Home = () => {
  return (
    <div className="mainmenu">
    <MainMenu />
    <div className='home'>
      <div className='container'>
        <Sidebar/>
        <Chat/>
      </div>
    </div>
    </div>
  )
}

export default Home