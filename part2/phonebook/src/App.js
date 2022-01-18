import React, {useEffect, useState} from 'react'
// import axios from 'axios'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personsService from './services/persons'

const App = () => {
	const [filterName, setFilterName] = useState('')
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [persons, setPersons] = useState([])
	// const personsUrl = 'http://localhost:3001/persons'

	useEffect(() => {
		personsService
			.getAll()
			.then(initialPersons => setPersons(initialPersons))
	}, [])

	const PersonsToShow = filterName
		? persons.filter(person =>
				person.name.toLowerCase().includes(filterName.toLowerCase())
		  )
		: persons

	const handleFilterChange = event => {
		setFilterName(event.target.value)
	}

	const handleNameChange = event => {
		setNewName(event.target.value)
	}

	const handleNumberChange = event => {
		setNewNumber(event.target.value)
	}

	const handleDeleteClick = (id, name) => {
		if (window.confirm(`Delete ${name}?`)) {
			personsService
				.deletePerson(id)
				.then(setPersons(persons.filter(person => person.id !== id)))
		}
	}

	const handleAddClick = event => {
		event.preventDefault()

		const newPerson = {
			name: newName,
			number: newNumber,
			id: persons.at(-1).id + 1,
		}

		const sameName = name => persons.some(person => person.name === name)
		if (!sameName(newName)) {
			personsService.create(newPerson).then(returnedPerson => {
				setPersons(persons.concat(returnedPerson))
				setNewName('')
				setNewNumber('')
			})
		} else if (
			window.confirm(
				`'${newName}' is already in the phonebook, replace with new number?`
			)
		) {
			const idx = (name =>
				persons.findIndex(person => person.name === name))(newName)
			const id = persons[idx].id
			personsService.update(id, newPerson).then(returnedPerson => {
				setPersons(
					persons.map(person =>
						person.id !== id ? person : returnedPerson
					)
				)
			})
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter
				filterName={filterName}
				handleFilterChange={handleFilterChange}
			/>
			<h2>Add a new number</h2>
			<PersonForm
				handleAddClick={handleAddClick}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons
				persons={PersonsToShow}
				handleDeleteClick={handleDeleteClick}
			/>
			<br />
		</div>
	)
}

export default App
