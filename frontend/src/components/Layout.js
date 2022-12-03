import { Outlet, Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import './Layout.scss'
import axios from "axios";

function Layout()
{
  const { user, isAdmin, authLoading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const path = useLocation().pathname;

  const selected = "nav__tab--selected";
  const unselected = "nav__tab--unselected";

  useEffect(() => {
    if (user) {
      axios.get(`/account/${user.uid}/unreadPosts`).then(res => setNotifications(res.data));
    }
  }, [user]);

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
            <Notifications notifications={notifications}/>
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
  const [dropdown, setDropdown] = useState(false);

  return (
    <div onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
      <img className="w-12 h-12 rounded-full" src="https://freeiconshop.com/wp-content/uploads/edd/notification-outline.png" alt="notifications"/>
      {dropdown && <NotificationsDropdown notifications={props.notifications}/>}
    </div>
  )
}

// dropdown component?
function NotificationsDropdown(props)
{
  return (
    <div className="absolute bg-neutral-800 flex flex-col text-neutral-200 text-xl p-5 right-0">
      {props.notifications.length > 0 ? 
      <ul>
        {props.notifications.map((notif, idx) => 
        <li key={idx}>
          <Link>{notif.title} - {notif.body}</Link>
        </li>)}
      </ul> : <div>Nothing to show</div>}
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
    <div className="nav__account" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link to={'account/' + props.uid}><img className="account__avatar" src="https://cdn.dribbble.com/users/1165288/screenshots/6008531/document-hierarchy.jpg" alt="profile"/></Link>
      {dropdown && <AccountDropdown uid={props.uid}/>}
    </div>
  )
}

function AccountDropdown(props)
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

export default Layout;