import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <div className='navbar'>
      <span className="logo">Daelim 101</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
      </div>
    </div>
  )
}

export default Navbar