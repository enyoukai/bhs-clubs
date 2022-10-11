import React, { useState, useEffect } from 'react';

import './App.css';
import Header from './components/Header.js';
import API from './api/API.js';

function App() {
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function updateClubs() {
      if (search !== '') setClubs(await API.searchClubs(search));
      else setClubs(await API.getClubs());
    }

    updateClubs();
  }, [search]);

  return (
    <div className="App">
      <Header/>
      <OptionsBar setSearch={setSearch}/>
      <table className="clubTable">
        <tbody>
          <ListHeader/>
          <ClubList clubs={clubs}/>
        </tbody>
      </table>
    </div>
  );
}

function OptionsBar(props) {
  return (
    <div className="optionsBar">
      <input className="searchBar" onChange={e => props.setSearch(e.target.value)} placeholder="Search"/>
    </div>
  )
}

function ClubList(props) {
  let clubsList = props.clubs.map((club) => {
    return (
      <Club key={club.id} clubObj={club} />
    )
  });

  return (
    <React.Fragment>
        {clubsList}
    </React.Fragment>
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

function Club(props)
{
  const [hover, setHover] = useState(false);

  const club = props.clubObj;

  const handleMouseOver = () => {
    setHover(true)
  }

  const handleMouseOut = () => {
    setHover(false)
  }

  return (
    <tr className="club" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
      <td>{club.name}</td>
      <td>{club.location}</td>
      <td>{club.date}</td>
      <td>{club.time}</td>
      <td>{club.advisor}</td>
    </tr>
  )
}

function HoverText(props) {
  const mousePosition = useMousePosition();
  
  return (
    <div className="hoverText" style={{left: mousePosition.x + 'px', top: mousePosition.y + 'px'}}>
      <div>{props.club.name}</div>
      <div>{props.club.description}</div>
    </div>
  )
}

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({x: -1, y: -1});

  useEffect(() => {
    const handleWindowMouseMove = event => {
      setMousePosition({
        x: event.pageX,
        y: event.pageY
      })
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  return mousePosition;
}

export default App;