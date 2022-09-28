import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';


function App() {
  const [clubs, setClubs] = useState([]);

  fetch("/clubs").then(res => res.json()).then(data => setClubs(data));
  
  let clubsList = clubs.map((club) => <li>{club["name"]}</li>);

  return (
    <div className="App">
      <p>list of clubs</p>
      <ul>
        {clubsList}
      </ul>
      <input placeholder="club name"></input>
      <button>add club</button>
    </div>
  );
}

async function getClubs()
{
  const res = await fetch("/clubs");
  return res.json();
}
export default App;
