import logo from './logo.svg';

import React, { useState, useEffect } from 'react';


function App() {
  return (
    <div className="App">
      <ClubView/>
    </div>
  );
}

function ClubView()
{
  const [clubs, setClubs] = useState([]);
  useEffect(() => {GET('/clubs').then(res => res.json()).then(data => setClubs(data))}, []);

  function handleClubInput(club)
  {
    setClubs(clubs.concat({clubName: club}));
    POST('/clubs', {clubName: club});
  }

  return (
    <div>
      <p>list of clubs</p>
      <ClubList clubs={clubs}/>
      <ClubInput onClubInput={handleClubInput}/>
    </div>
  )
}

function ClubList(props) {
  
  let clubsList = props.clubs.map((club) => <Club clubName={club['clubName']}/>);

  return (
  <ul>
    {clubsList}
  </ul>
  )
}

function Club(props)
{
  return (
    <li>
      {props.clubName}
    </li>
  )
}

function ClubInput(props)
{
  const [clubInput, setClubInput] = useState('');

  return(
    <div>
      <input value={clubInput} onChange={e => setClubInput(e.target.value)}/>
      <button onClick={() => props.onClubInput(clubInput)}>Add Club</button>
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