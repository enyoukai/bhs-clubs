import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './App.css';

const MouseContext = React.createContext({x:0, y:0});

function App() {
  // TODO: DON'T HAVE COMPONENT RERENDER EVERY TIME MOUSE CHANGES
  const [mouseCoords, setMouseCoords] = useState({x: 0, y: 0});

  useEffect(() => {
    const handleWindowMouseMove = event => {
      setMouseCoords({
        x: event.pageX,
        y: event.pageY
      })
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  return (
    <MouseContext.Provider value={mouseCoords}>
      <div className="App">
        <Header/>
        <ClubView/>
      </div>
    </MouseContext.Provider>
  );
}

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

function ClubView()
{
  console.log('rerender');
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search === '')
    {
      GET(`/clubs/`).then(data => setClubs(data));
    }
    else
    {
      GET(`/clubs/?name=${search}`).then(data => setClubs(data));
    }

  }, [search]);

  function postClub(club)
  {
    POST('/clubs', {name: club}).then(data => addClubState(data));
  }

  function deleteClub(clubId)
  {
    const filteredClubs = clubs.filter(club => club.id !== clubId);
    setClubs(filteredClubs);

    DELETE('/clubs/' + clubId);
  }

  function addClubState(clubObj)
  {
    setClubs((prevClubs, props) => prevClubs.concat(clubObj));
  }

  return (
    <div className="clubView">
      <OptionsBar setSearch={setSearch}/>
      <ClubList clubs={clubs} deleteClub={deleteClub}/>
    </div>
  )
}

function OptionsBar(props) {
  return (
    <div className="optionsBar">
      <Search setSearch={props.setSearch}/>
    </div>
  )
}

function Search(props)
{    
  return (
    <div>
      <input className="searchBar" onChange={e => props.setSearch(e.target.value)} placeholder="Search"/>
    </div>
  )
}

function ListHeader()
{
  return (
    <tr className="listHeader">
      <th>Name</th>
      <th>Location</th>
      <th>Day</th>
      <th>Time</th>
      <th>Advisor</th>
    </tr>
  )
}
function ClubList(props) {
  let clubsList = props.clubs.map((club) => {
    return (
      <Club key={club.id} clubObj={club} />
    )
  });

  return (
  <table className="clubList">
    <tbody>
      <ListHeader/>
      {clubsList}
    </tbody>
  </table>
  )
}

function Club(props)
{
  const [hover, setHover] = useState(false);

  const club = props.clubObj;

  return (
    <tr className="club" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <td>{club.name}</td>
      <td>{club.location}</td>
      <td>{club.date}</td>
      <td>{club.time}</td>
      <td>{club.advisor}</td>
      {hover && <HoverText name={club.name} description={club.description}/>}
    </tr>
  )
}

function HoverText(props) {
  const mouseCoords = useContext(MouseContext);

  return (
    <div className="hoverText" style={{left: mouseCoords.x + 'px', top: mouseCoords.y + 'px'}}>
      <div>{props.name}</div>
      <div>{props.description}</div>
    </div>
  )
}

// TODO: move this into a separate file
function GET(endpoint)
{
  return fetch(endpoint).then(res => res.json());

}

function POST(endpoint, body)
{
  return fetch(endpoint, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)}).then(res => res.json());
}

function DELETE(endpoint, body)
{
  return fetch(endpoint, {method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)});
}

export default App;