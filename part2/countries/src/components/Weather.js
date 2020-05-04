import React from "react";

const Weather = ({ weather, capital }) => {
  if (weather === null) {
    return "Loading Weather ....";
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <h4>Temperature:{weather.temperature} celsius</h4>
      <img
        src={weather.weather_icons[0]}
        alt={weather.weather_descriptions[0]}
      />
    </div>
  );
};

export default Weather;
