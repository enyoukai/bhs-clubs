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
  useEffect(() => {GET('/clubs').then(res => res.json()).then(data => addClub(data))}, []);

  function postClub(club)
  {
    POST('/clubs', {clubName: club}).then(res => res.json()).then(data => addClub(data));
  }

  function deleteClub(clubId)
  {
    DELETE('/clubs/' + clubId);
  }

  function addClub(clubObj)
  {
    setClubs(clubs.concat(clubObj));
  }

  return (
    <div>
      <p>list of clubs</p>
      <ClubList clubs={clubs} deleteClub={deleteClub}/>
      <ClubInput onClubInput={postClub}/>
    </div>
  )
}

function ClubList(props) {
  let clubsList = props.clubs.map((club) => {
    return (
      <li key={club.clubId}>
        <Club clubObj={club} />
        <DeleteButton deleteClub={() => props.deleteClub(club.clubId)}/>
      </li>
    )
  });

  return (
  <ul>
    {clubsList}
  </ul>
  )
}

function Club(props)
{
  const club = props.clubObj;

  return (
    <div>
      {club.clubId}: {club.clubName}
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

function GET(endpoint)
{
  return fetch(endpoint);

}

function POST(endpoint, body)
{
  return fetch(endpoint, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)});
}

function DELETE(endpoint, body)
{
  return fetch(endpoint, {method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)});
}

export default App;