import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Search from "./components/Search";
import Result from "./components/Result";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  let searchedCountries = [];

  if (searchTerm !== "") {
    searchedCountries = countries.filter((country) => {
      return country.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  return (
    <div>
      <Search
        label="Find a country"
        handleSearch={handleSearch}
        searchValue={searchTerm}
      />
      <Result result={searchedCountries} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
