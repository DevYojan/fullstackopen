import React, { useState, useEffect } from "react";
import axios from 'axios';
import Input from "./Input";
import AddForm from './AddForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const handleSearch = (e) => setSearchValue(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();

    if (!newName) return;

    let duplicate = false;
    persons.map((person) => {
      if (newName.toLowerCase() === person.name.toLowerCase()) {
        alert(`${newName} already exists in the phonebook`);
        duplicate = true;
        return;
      }
    });

    if (duplicate) {
      return;
    }

    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
      })
    );
    setNewName("");
    setNewNumber("");
  }

  function handleChange(e) {
    if (e.target.name === "name") {
      setNewName(e.target.value);
    }

    if (e.target.name === "number") {
      setNewNumber(e.target.value);
    }
  }

  let data = [...persons];

  if (searchValue !== "") {
    data = [];

    persons.map((person) => {
      if (person.name.toLowerCase().includes(searchValue.toLowerCase())) {
        data.push(person);
      }
    });
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Input label={'search filter'} value={searchValue} handleInput={handleSearch} />

      <h2>Add a new</h2>

      <AddForm handleSubmit={handleSubmit}
        handleChange={handleChange} name={newName} number={newNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={data} />
    </div>
  );
};

export default App;
