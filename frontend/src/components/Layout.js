import { Outlet, Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import React, { useState } from 'react';

import CSSModules from 'react-css-modules';
import styles from './Layout.module.css'

function Layout()
{
  const { user } = useAuth();

  return (
    <React.Fragment>
      <nav styleName="nav">
        <div styleName="nav__container">
          <Link to='/' styleName="nav__logo">BHS Clubs</Link>
          <div styleName="nav__tabs">
            <Link to='/' styleName="nav__tab nav__tab--selected">Home</Link>
            <Link to='newclub' styleName="nav__tab nav__tab--unselected">Add Club</Link>
            <Link to='feed' styleName="nav__tab nav__tab--unselected">Feed</Link>
            <Link to='calendar' styleName="nav__tab nav__tab--unselected">Calendar</Link>
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
    <div styleName="nav__login-bar">
      <Link to={'signin'} styleName="login-bar__text">Sign In</Link>
      <Link to={'register'} styleName="login-bar__text">Register</Link>
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
    <div styleName="nav__account" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link to={'account/' + user.uid}><img styleName="account__avatar" src="https://cdn.dribbble.com/users/1165288/screenshots/6008531/document-hierarchy.jpg" alt="profile"/></Link>
      {dropdown && <Dropdown/>}
    </div>
  )
}

function Dropdown(props)
{
  const { user } = useAuth();

  return (
    <div styleName="account__dropdown">
      <Link styleName="account__text" to={'account/' + user.uid}>Profile</Link>
      <Link styleName="account__text" to='settings'>Settings</Link>
      <Link styleName="account__text" to='signout'>Sign Out</Link>
    </div>
  )
}

export default CSSModules(Layout, styles, {allowMultiple: true});