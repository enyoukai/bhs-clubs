import { Outlet, Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import React, { useState } from 'react';

import './Layout.scss'

function Layout()
{
  const { user } = useAuth();

  return (
    <React.Fragment>
      <nav className="nav">
        <div className="nav__container">
          <Link to='/' className="nav__logo">BHS Clubs</Link>
          <div className="nav__tabs">
            <Link to='/' className="nav__tab nav__tab--selected">Home</Link>
            <Link to='newclub' className="nav__tab nav__tab--unselected">Add Club</Link>
            <Link to='feed' className="nav__tab nav__tab--unselected">Feed</Link>
            <Link to='calendar' className="nav__tab nav__tab--unselected">Calendar</Link>
          </div>
        </div>
        {user === null ? <RegisterBar/> : <Avatar user={user}/>}
      </nav>
      <Outlet />
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