import { Outlet, Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'

import './Layout.scss'

function Layout()
{
  const { user } = useAuth();
  const path = useLocation().pathname;

  const selected = "nav__tab--selected";
  const unselected = "nav__tab--unselected";

  return (
    <React.Fragment>
      <nav className="nav">
        <Link to='/' className="nav__logo">BHS Clubs</Link>
        <div className="nav__tabs">
          <Link to='/' className={`nav__tab ${path == '/' ? selected : unselected}`}>Home</Link>
          <Link to='newclub' className={`nav__tab ${path == '/newclub' ? selected : unselected}`}>Add Club</Link>
          <Link to='feed' className={`nav__tab ${path == '/feed' ? selected : unselected}`}>Feed</Link>
          <Link to='calendar' className={`nav__tab ${path == '/calendar' ? selected : unselected}`}>Calendar</Link>
        </div>
        {user === null ? <RegisterBar/> : <Avatar user={user}/>}
      </nav>
      {/* <div className="outlet"> */}
        <Outlet />
      {/* </div> */}
    </React.Fragment>
  )
}

function RegisterBar()
{
  return (
    <div className="nav__login-bar">
      <Link to={'signin'} className="login-bar__text">Sign In</Link>
      <Link to={'register'} className="login-bar__text">Register</Link>
    </div>
  )
}

function Avatar(props)
{
  const [dropdown, setDropdown] = useState(false);
  const { user } = useAuth();

  function handleMouseEnter()
  {
    setDropdown(true);
  }

  function handleMouseLeave()
  {
    setDropdown(false);
  }

  return (
    <div className="nav__account" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link to={'account/' + user.uid}><img className="account__avatar" src="https://cdn.dribbble.com/users/1165288/screenshots/6008531/document-hierarchy.jpg" alt="profile"/></Link>
      {dropdown && <Dropdown/>}
    </div>
  )
}

function Dropdown(props)
{
  const { user } = useAuth();

  return (
    <div className="account__dropdown">
      <Link className="account__text" to={'account/' + user.uid}>Profile</Link>
      <Link className="account__text" to='settings'>Settings</Link>
      <Link className="account__text" to='signout'>Sign Out</Link>
    </div>
  )
}

export default Layout;