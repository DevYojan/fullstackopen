import React from "react";
import Weather from "./Weather";

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
      <Weather capital={country.capital} weather={weather} />
    </div>
  );
};

export default CountryDetail;
