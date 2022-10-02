import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <ClubView/>
    </div>
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
  const [clubs, setClubs] = useState([]);
  useEffect(() => {GET('/clubs').then(data => addClubState(data))}, []);

  function postClub(club)
  {
    POST('/clubs', {clubName: club}).then(data => addClubState(data));
  }

  function deleteClub(clubId)
  {
    const filteredClubs = clubs.filter(club => club.clubId !== clubId);
    setClubs(filteredClubs);

    DELETE('/clubs/' + clubId);
  }

  function addClubState(clubObj)
  {
    setClubs(clubs.concat(clubObj));
  }

  return (
    <div>
      <ListHeader/>
      <ClubList clubs={clubs} deleteClub={deleteClub}/>
      <ClubInput onClubInput={postClub}/>
    </div>
  )
}

function ListHeader()
{
  return (
    <div className="listHeader">
      <div>Name</div>
      <div>Description</div>
      <div>Location</div>
      <div>Day</div>
      <div>Time</div>
      <div>Advisor</div>
    </div>
  )
}
function ClubList(props) {
  let clubsList = props.clubs.map((club) => {
    return (
      <li key={club.clubId} >
        <Club clubObj={club} />
        <DeleteButton deleteClub={() => props.deleteClub(club.clubId)}/>
      </li>
    )
  });

  return (
  <ul className="clubList">
    {clubsList}
  </ul>
  )
}

function Club(props)
{
  const club = props.clubObj;

  return (
    <div className="club">
      <div>{club.clubName}</div>
      <div>Some Description</div>
      <div>Some Location</div>
      <div>Some Day</div>
      <div>Some Time</div>
      <div>Some Advisor</div>

    </div>
  )
}

function DeleteButton(props)
{
  return (
    <button onClick={props.deleteClub}>Delete</button>
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