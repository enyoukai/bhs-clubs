import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from "react-router-dom";

import './Home.scss';
import useApi from '../hooks/useApi';
import useDebounce from '../hooks/useDebounce';
import axios from 'axios';

import {arrayToDates} from 'utils/dateUtils';

function Home() {
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const [searchParams, setSearchParams] = useSearchParams();
  const [tags, setTags] = useState({service: false, academic: false, educational: false, misc: false});

  const submitted = searchParams.get('submitted');

  const getClubs = useApi('/clubs');

  let mousePosition = null;

  // useEffect(() => {
  //   const handleWindowMouseMove = event => {
  //     mousePosition = {
  //       x: event.pageX,
  //       y: event.pageY
  //     }
  //   };
  //   window.addEventListener('mousemove', handleWindowMouseMove);

  //   return () => {
  //     window.removeEventListener('mousemove', handleWindowMouseMove);
  //   };
  // }, []);

  useEffect(() => {
      if (debouncedSearch !== '') axios.get(`/clubs?name=${debouncedSearch}`).then(res => setClubs(res.data));
      else axios.get('/clubs').then(res => setClubs(res.data));

  }, [debouncedSearch]);

  function tagFilter(clubs) {
    if (Object.values(tags).every((tag) => tag === false)) return clubs;

    const requiredTags = [];
    Object.entries(tags).forEach(([tag, value]) => {
      if (value) requiredTags.push(tag);
    });

    return clubs.filter((club) => {
      const currentTags = [];
      Object.entries(club.tags).forEach(([tag, value]) => {
        if (value) currentTags.push(tag);
      });
      
      return requiredTags.every(tag => currentTags.includes(tag));
    });
  }

  return (
    <div>
      {submitted && <div>Club request has been submitted. It will be approved shortly</div>}
      <OptionsBar tags={tags} setTags={setTags} setSearch={setSearch}/>
      <table className="clubTable">
        <tbody>
          <ListHeader/>
          <ClubList mousePosition={mousePosition} clubs={tagFilter(clubs)}/>
        </tbody>
      </table>
    </div>
  );
}

function OptionsBar(props) {  
  function handleSelect(field) {
    props.setTags(prevTags => ({...prevTags, [field]: !prevTags[field]}));
  }

  return (
    <div className="options">
      <input className="options__search" onChange={e => props.setSearch(e.target.value)} placeholder="Search"/>
      <button onClick={() => handleSelect('service')} className={`${props.tags.service && 'bg-neutral-600 text-neutral-100'} text-xl border border-neutral-800 rounded-xl px-5`}>Service</button>
      <button onClick={() => handleSelect('academic')} className={`${props.tags.academic && 'bg-neutral-600 text-neutral-100'} text-xl border border-neutral-800 rounded-xl px-5`}>Academic</button>
      <button onClick={() => handleSelect('educational')} className={`${props.tags.educational && 'bg-neutral-600 text-neutral-100'} text-xl border border-neutral-800 rounded-xl px-5`}>Educational</button>
      <button onClick={() => handleSelect('misc')} className={`${props.tags.misc && 'bg-neutral-600 text-neutral-100'} text-xl border border-neutral-800 rounded-xl px-5`}>Misc</button>

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
      <td><Link className="clubTable__link" to={'club/' + club.id}>{arrayToDates(club.dates).join(', ')}</Link></td>
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