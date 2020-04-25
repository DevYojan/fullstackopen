import React from 'react';
import Person from './Person';

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => <Person person={person} />)}
    </ul>
  )
}

export default Persons;