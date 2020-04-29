import React from "react";

const CountryDetail = ({ country }) => {
  if (country.length === 0) {
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
      <img src={country.flag} alt={country.name} width="300" height="300" />
    </div>
  );
};

export default CountryDetail;
