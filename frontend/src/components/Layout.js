import { Outlet, Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import './Layout.scss'

function Layout()
{
  const { user, isAdmin, authLoading } = useAuth();
  const path = useLocation().pathname;

  const selected = "nav__tab--selected";
  const unselected = "nav__tab--unselected";

  return (
    <React.Fragment>
      <nav className="nav">
        <Link to='/' className="nav__logo">BHS Clubs</Link>
        <div className="nav__tabs">
          <Link to='/' className={`nav__tab ${path === '/' || path.startsWith('/club') ? selected : unselected}`}>Home</Link>
          <Link to='newclub' className={`nav__tab ${path.startsWith('/newclub') ? selected : unselected}`}>Add Club</Link>
          <Link to='feed' className={`nav__tab ${path.startsWith('/feed') ? selected : unselected}`}>Feed</Link>
          <Link to='calendar' className={`nav__tab ${path.startsWith('/calendar') ? selected : unselected}`}>Calendar</Link>
          {isAdmin && <Link to='admin' className={`nav__tab ${path.startsWith('/admin') ? selected : unselected}`}>Admin</Link>}
        </div>
        {!authLoading && 
          (user === null ? <RegisterBar/> : 
          <div className="flex flex-row gap-10">
            <Notifications/>
            <Avatar uid={user.uid}/>
          </div>)}
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

function Notifications(props)
{
  return (
    <button>
      <img className="w-12 h-12 rounded-full" src="https://freeiconshop.com/wp-content/uploads/edd/notification-outline.png" alt="notifications"/>
    </button>
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
    <div className="nav__account" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link to={'account/' + props.uid}><img className="account__avatar" src="https://cdn.dribbble.com/users/1165288/screenshots/6008531/document-hierarchy.jpg" alt="profile"/></Link>
      {dropdown && <Dropdown uid={props.uid}/>}
    </div>
  )
}

function Dropdown(props)
{
  return (
    <div className="account__dropdown">
      <Link className="account__text" to={'account/' + props.uid}>Profile</Link>
      <Link className="account__text" to={'notifications'}>Unread</Link>
      <Link className="account__text" to='settings'>Settings</Link>
      <Link className="account__text" to='signout'>Sign Out</Link>
    </div>
  )
}

function useUnreadCount()
{
  
}
export default Layout;