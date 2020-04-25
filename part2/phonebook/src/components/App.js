import React, { useState } from "react";
import Input from "./Input";
import AddForm from './AddForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!newName) return;

    let duplicate = false;
    persons.map((person) => {
      if (newName.toLowerCase() === person.name.toLowerCase()) {
        alert(`${newName} already exists in the phonebook`);
        duplicate = true;
        return false;
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

  const handleSearch = (e) => setSearchValue(e.target.value);

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
      <h2>add a new</h2>
      <AddForm handleSubmit={handleSubmit}
        handleChange={handleChange} name={newName} number={newNumber}
      />
      <h2>Numbers</h2>
      <ul>
        {data.map((person) => (
          <li>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
