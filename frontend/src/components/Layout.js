import { Outlet, Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect } from 'react';

import './Layout.css'

function Layout()
{
  const { user } = useAuth();

  return (
    <>
      <div className="navbar">
        <div className="navbar__container">
          <Link to='/' className="navbar__logo">BHS Clubs</Link>
          <div className="navbar__tabs">
            <Link to='/' className="navbar__tab navbar__tab--selected">Home</Link>
            <Link to='feed' className="navbar__tab navbar__tab--unselected">Feed</Link>
            <Link to='calendar' className="navbar__tab navbar__tab--unselected">Calendar</Link>
          </div>
        </div>
        {user === null ? <RegisterBar/> : <Avatar user={user}/>}
      </div>
      <Outlet />
    </>
  )
}

function RegisterBar()
{
  return (
    <div className="navbar__login-bar">
      <Link to={'signin'} className="navbar__login-text">Sign In</Link>
      <Link to={'register'} className="navbar__login-text">Register</Link>
    </div>
  )
}

function Avatar(props)
{
  const [dropdown, setDropdown] = useState(false);

  function handleMouseEnter()
  {
    setDropdown(true);
  }

  function handleMouseLeave()
  {
    setDropdown(false);
  }

  return (
    <div className="navbar__account" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img className="navbar__avatar" src="https://cdn.discordapp.com/avatars/583895458838085642/893f2cc514e4186f115a31ef05810a7f.webp?size=80"/>
      {dropdown && <Dropdown/>}
    </div>
  )
}

function Dropdown(props)
{
  const { user } = useAuth();

  return (
    <div className="navbar__dropdown">
      <Link className="navbar__dropdown-text" to={'account/' + user.uid}>Profile</Link>
      <Link className="navbar__dropdown-text" to='settings'>Settings</Link>
      <Link className="navbar__dropdown-text" to='signout'>Sign Out</Link>
    </div>
  )
}

export default Layout;