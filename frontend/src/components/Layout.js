import { Outlet, Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect } from 'react';

import './Layout.css'

function Layout()
{
  const { user } = useAuth();

  return (
    <>
      <div className="header">
        <Link to={'/'} className="logo">
          BHS Clubs
        </Link>
        <div className="tabs">
          <div className="tab-selected">Home</div>
          <div className="tab-unselected">Feed</div>
          <div className="tab-unselected">Calendar</div>
        </div>

        {user === null ? <RegisterBar/> : <Profile user={user}/>}
      </div>
      <Outlet />
    </>
  )
}

function RegisterBar()
{
  return (
    <div className="sign-reg white-font">
      <Link to={'signin'} className="bubble">Sign In</Link>
      <Link to={'register'} className="bubble">Register</Link>
    </div>
  )
}

function Profile(props)
{
  const [dropdown, setDropdown] = useState(false);
  return (
    <div>
      <button onClick={() => setDropdown(!dropdown)}>account</button>
      {dropdown && <Dropdown/>}
      
    </div>
  )
}

function Dropdown(props)
{
  const { user } = useAuth();


  return (
    <div className="white-font">
      <Link to={'account/' + user.uid}>My Account</Link>
      <div>Clubs</div>
      <Link to='signout'>Sign Out</Link>
    </div>
  )
}

export default Layout;