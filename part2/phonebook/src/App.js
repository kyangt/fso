import React, {useState} from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
	const [filterName, setFilterName] = useState('')
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [persons, setPersons] = useState([
		{name: 'Arto Hellas', number: '040-123456', id: 1},
		{name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
		{name: 'Dan Abramov', number: '12-43-234345', id: 3},
		{name: 'Mary Poppendieck', number: '39-23-6423122', id: 4},
	])

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

	const addPerson = event => {
		event.preventDefault()
		const sameName = name => persons.some(person => person.name === name)
		if (!sameName(newName)) {
			const personObject = {
				name: newName,
				number: newNumber,
				id: persons.length + 1,
			}
			setPersons(persons.concat(personObject))
			setNewName('')
			setNewNumber('')
		} else {
			alert(`${newName} is already added to the phonebook`)
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
				addPerson={addPerson}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons persons={PersonsToShow} />
			<br />
		</div>
	)
}

export default App
