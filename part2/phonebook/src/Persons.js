import React from 'react'
import DeleteButton from './DeleteButton'

const Persons = ({persons, handleDeleteClick}) => {
	return persons.map(person => {
		return (
			<div key={person.id}>
				{person.name} {person.number}{' '}
				<DeleteButton
					id={person.id}
					name={person.name}
					handleDeleteClick={handleDeleteClick}
				/>
			</div>
		)
	})
}

export default Persons
