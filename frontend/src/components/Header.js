function Header()
{
  return (
    <div className="header">
      <div className="logo">
        BHS Clubs
      </div>
      <div className="tabs">
        <div className="tab-selected">Home</div>
        <div className="tab-unselected">Feed</div>
        <div className="tab-unselected">Calendar</div>
      </div>
      <div className="sign-reg white-font">
        <div className="bubble">Sign In</div>
        <div className="bubble">Register</div>
      </div>
    </div>
  )
}

export default Header;