import logo from './logo.svg';

import React, { useState } from 'react';


function App() {
  return (
    <div className="App">
      <p>list of clubs</p>
      <ClubList/>
      <ClubInput/>
    </div>
  );
}

function ClubList() {
  const [clubs, setClubs] = useState([]);

  GET('/clubs').then(res => res.json()).then(data => setClubs(data));
  
  let clubsList = clubs.map((club) => <li>{club["name"]}</li>);

  return (
  <ul>
    {clubsList}
  </ul>
  )
}

function Club(clubName)
{
  return (
    <li>
      {clubName}
    </li>
  )
}

function ClubInput()
{
  const [club, setClub] = useState('');

  function addClub(club)
  {
    POST('/clubs', {clubName: club});
  }

  return(
    <div>
      <input value={club} onChange={e => setClub(e.target.value)}/>
      <button onClick={() => addClub(club)}>Add Club</button>
    </div>
  )
}

function GET(endpoint)
{
  return fetch(endpoint);

}

function POST(endpoint, body)
{
  return fetch(endpoint, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)});
}

export default App;