import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <p>list of clubs</p>
      <ul>
      <p>{fetch("/clubs").then(res => res.json()).then(data => console.log(data))}</p>
      </ul>
      <input placeholder="club name"></input>
      <button>add club</button>
    </div>
  );
}

export default App;
