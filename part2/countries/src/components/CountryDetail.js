import React from "react";

const CountryDetail = ({ country, weather }) => {
  if (country === null) {
    return null;
  }

  return (
    <div>
      <h2>{country.name}</h2>
      Capital : {country.capital} <br />
      Population : {country.population}
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={country.name} width="150" height="150" />
      {weather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <h4>Temperature:{weather.temperature} celsius</h4>
          <img
            src={weather.weather_icons[0]}
            alt={weather.weather_descriptions[0]}
          />
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
