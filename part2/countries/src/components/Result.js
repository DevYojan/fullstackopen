import React from "react";

const Result = ({ result, showDetail }) => {
  if (result.length > 10) {
    return "Too many matches. Specify another filter.";
  }

  return (
    <div>
      {result.map((country) => (
        <React.Fragment key={country.numericCode}>
          {country.name}
          <button
            name={country.numericCode}
            onClick={() => showDetail(country)}
          >
            show
          </button>
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Result;
