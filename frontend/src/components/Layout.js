import { Outlet, Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import './Layout.scss'

function Layout()
{

  // DEBUG
  // const MINUTE_MS = 1000;

  // useEffect(() => {
  //   console.log('hi');
  //   const interval = setInterval(() => {
  //     const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`;

  //     const memoryData = process.memoryUsage();
      
  //     const memoryUsage = {
  //       rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
  //       heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
  //       heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
  //       external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
  //     };
      
  //     console.log(memoryUsage);
  //   }, MINUTE_MS);

  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, [])

  // --------------------------------------------

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
        {!authLoading && (user === null ? <RegisterBar/> : <Avatar uid={user.uid}/>)}
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