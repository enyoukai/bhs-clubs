import { Outlet, Link } from "react-router-dom";

import './Layout.css'

function Layout()
{
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
        <div className="sign-reg white-font">
          <Link to={'signin'} className="bubble">Sign In</Link>
          <Link to={'register'} className="bubble">Register</Link>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Layout;