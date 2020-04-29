import React from "react";

const Result = ({ result }) => {
  if (result.length === 0) {
    return null;
  }

  if (result.length > 10) {
    return "Too many matches. Specify another filter.";
  }

  if (result.length === 1) {
    let country = result[0];

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
  }

  return (
    <div>
      {result.map((country) => (
        <React.Fragment key={country.numericCode}>
          {country.name} <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Result;
