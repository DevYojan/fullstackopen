import React, { useState } from "react";
import CountryDetail from "./CountryDetail";

const Result = ({ result }) => {
  const [selectedCountry, setSelectedCountry] = useState([]);

  if (result.length === 0) {
    return null;
  }

  if (result.length > 10) {
    return "Too many matches. Specify another filter.";
  }

  const handleShowButton = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      {result.map((country) => (
        <React.Fragment key={country.numericCode}>
          {country.name}
          <button
            name={country.numericCode}
            onClick={() => handleShowButton(country)}
          >
            show
          </button>
          <br />
        </React.Fragment>
      ))}
      <CountryDetail country={selectedCountry} />
    </div>
  );
};

export default Result;
