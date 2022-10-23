import { Outlet, Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

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
  return (
    <Link to={'account/' + props.user.uid} className="white-font">{props.user.email}</Link>
  )
}

export default Layout;