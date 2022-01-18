import React from 'react'

const DeleteButton = ({id, name, handleDeleteClick}) => {
	return <button onClick={() => handleDeleteClick(id, name)}>Delete</button>
}

export default DeleteButton
