import React, { useState, useEffect } from 'react';
import personsService from './services/personsService';
import Input from './Input';
import AddForm from './AddForm';
import Persons from './Persons';
import Notification from './Notification';

const App = () => {
	const [persons, setPersons] = useState([]);

	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		personsService.getAll().then((persons) => {
			setPersons(persons);
		});
	}, []);

	const handleSearch = (e) => setSearchValue(e.target.value);

	function handleSubmit(e) {
		e.preventDefault();

		if (!newName) return;

		let duplicate = null;
		persons.map((person) => {
			if (newName.toLowerCase() === person.name.toLowerCase()) {
				duplicate = person;
				return;
			}
		});

		if (duplicate !== null) {
			if (
				window.confirm(
					`${duplicate.name} already exists in the phonebook, replace the old phone number with a new one?`
				)
			) {
				const modifiedObj = {
					name: newName,
					number: newNumber,
				};

				personsService.update(duplicate.id, modifiedObj).then((data) => {
					setPersons(persons.filter((p) => p.id !== duplicate.id).concat(data));
				});

				setNewName('');
				setNewNumber('');
			}
			return;
		}

		const newPerson = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};

		personsService.create(newPerson).then((data) => {
			setPersons(persons.concat(data));
		});

		setNotification({
			message: `Added ${newPerson.name}.`,
			type: 'success',
		});
		setTimeout(() => setNotification(null), 5000);
		setNewName('');
		setNewNumber('');
	}

	function handleChange(e) {
		if (e.target.name === 'name') {
			setNewName(e.target.value);
		}

		if (e.target.name === 'number') {
			setNewNumber(e.target.value);
		}
	}

	function handleDelete(person) {
		if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
			personsService.remove(person.id);
			setPersons(persons.filter((p) => p.id !== person.id));
		}
	}

	let data = [...persons];

	if (searchValue !== '') {
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
			<Notification notification={notification} />
			<Input
				label={'search filter'}
				value={searchValue}
				handleInput={handleSearch}
			/>

			<h2>Add a new</h2>

			<AddForm
				handleSubmit={handleSubmit}
				handleChange={handleChange}
				name={newName}
				number={newNumber}
			/>

			<h2>Numbers</h2>

			<Persons persons={data} handleDelete={handleDelete} />
		</div>
	);
};

export default App;
