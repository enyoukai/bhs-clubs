import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

import './Home.scss';
import API from '../api/API.js';

function Home() {
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState('');

  let mousePosition = null;

  useEffect(() => {
    const handleWindowMouseMove = event => {
      mousePosition = {
        x: event.pageX,
        y: event.pageY
      }
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  useEffect(() => {
    async function updateClubs() {
      if (search !== '') setClubs(await API.searchClubs(search));
      else setClubs(await API.getClubs());
    }

    updateClubs();
  }, [search]);

  return (
    <div>
      <OptionsBar setSearch={setSearch}/>
      <table className="clubTable">
        <tbody>
          <ListHeader/>
          <ClubList mousePosition={mousePosition} clubs={clubs}/>
        </tbody>
      </table>
    </div>
  );
}

function OptionsBar(props) {
  return (
    <div className="options">
      <input className="options__search" onChange={e => props.setSearch(e.target.value)} placeholder="Search"/>
      <Link className="options__addClub" to={'newclub'}>Add Club +</Link>
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
    <tr className="clubTable__header">
      <th className="header__text">Name</th>
      <th className="header__text">Location</th>
      <th className="header__text">Day</th>
      <th className="header__text">Time</th>
      <th className="header__text">Advisor</th>
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
    <tr className="clubTable__club" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
      <td><Link className="clubTable__link" to={'club/' + club.id}>{club.name}</Link></td>
      <td><Link className="clubTable__link" to={'club/' + club.id}>{club.location}</Link></td>
      <td><Link className="clubTable__link" to={'club/' + club.id}>{club.date}</Link></td>
      <td><Link className="clubTable__link" to={'club/' + club.id}>{club.time}</Link></td>
      <td><Link className="clubTable__link" to={'club/' + club.id}>{club.advisor}</Link></td>
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

export default Home;