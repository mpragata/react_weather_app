import './App.scss';

const api = {
  key: "01de0a6183981c5ec8e700041cdd5823",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  return (
    <div className="app">
      <div className="searchBox">
        <input className="searchBar" type="text" placeholder="Search..."/>
      </div>
    </div>
  );
}

export default App;
