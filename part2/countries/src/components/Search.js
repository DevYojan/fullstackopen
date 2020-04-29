import React from "react";

const Search = ({ label, handleSearch, searchValue }) => {
  return (
    <div>
      {label} <input onChange={handleSearch} value={searchValue} />
    </div>
  );
};

export default Search;
