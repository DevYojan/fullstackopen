import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Search from "./components/Search";
import Result from "./components/Result";
import CountryDetail from "./components/CountryDetail";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [result, setResult] = useState([]);
  const [country, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    let searchedCountries = [];
    searchedCountries = countries.filter((country) => {
      return country.name.toLowerCase().includes(e.target.value.toLowerCase());
    });

    if (searchedCountries.length === 1) {
      setSelectedCountry(searchedCountries[0]);
    }
    if (searchedCountries.length > 1) {
      setResult(searchedCountries);
      setSelectedCountry(null);
      setWeather(null);
    }
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    if (country !== null) {
      const API_KEY = process.env.REACT_APP_API_KEY;

      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`
        )
        .then((response) => setWeather(response.data.current));
    }
  }, [country]);

  const showDetail = (selectedCountry) => {
    if (country === selectedCountry) {
      return;
    }

    setSelectedCountry(selectedCountry);
  };

  return (
    <div>
      <Search
        label="Find a country"
        handleSearch={handleSearch}
        searchValue={searchTerm}
      />
      <Result result={result} showDetail={showDetail} />
      <CountryDetail country={country} weather={weather} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
