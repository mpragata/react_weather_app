import './App.scss';
import React from 'react';
import {useState} from 'react';

const api = {
  key: "01de0a6183981c5ec8e700041cdd5823",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  let date = new Date().toDateString();
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [forecast, setForecast] = useState('');

  const search = e =>{
    if(e.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          let postData = result;
          setQuery('');
          setWeather(result);
          console.log(result);
          return fetch(`${api.base}onecall?lat=${postData.coord.lat}&lon=${postData.coord.lon}&exclude=current,alert,hourly,monthly,minutely&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
              result.daily[0].temp.day = Math.round(result.daily[0].temp.day / 10);
              result.daily[1].temp.day = Math.round(result.daily[1].temp.day / 10);
              result.daily[2].temp.day = Math.round(result.daily[2].temp.day / 10);
              setForecast(result);
              console.log(result);
            });
        });
    }
  }

  return (
    <div className={
      (typeof weather.main != "undefined") 
        ? ((weather.main.temp  > 22) 
          ? 'app' : 'app cold') 
        : 'app'}>
      <div className="searchBox">
        <input 
          className="searchBar" 
          type="text" placeholder="Search City,Country..." 
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      {((typeof weather.main != "undefined") && (typeof forecast.daily !="undefined")) ? (
      <div>
        <div className="locationContainer">
          <div className="loc">
            {weather.name}, {weather.sys.country}
          </div>
          <div className="date">
              {date}
          </div>
        </div>
        <div className="weatherContainer">
          <div className="temperature">
            {Math.round(weather.main.temp)}°c
          </div>
          <div className="weather">
            {weather.weather[0].main}
          </div>
        </div>
        <div className="forecastContainer">
          <div className="forecastText">
            3 day Forecast
          </div>
          <div className="forecastTemp">
            <div className="forecastTextContainer">
              {forecast.daily[0].temp.day}°c
            </div>
            <div className="forecastTextContainer">
              {forecast.daily[1].temp.day}°c
            </div>
            <div className="forecastTextContainer">
              {forecast.daily[2].temp.day}°c
            </div>
          </div>
        </div>
      </div>
    ) : ('')}
    </div>
  );
}

export default App;
