import axios from 'axios'

const personsUrl = 'http://localhost:3001/persons'

const getAll = () => {
	const request = axios.get(personsUrl)
	return request.then(response => response.data)
}

const deletePerson = id => {
	const request = axios.delete(`${personsUrl}/${id}`)
	return request.then(response => response.data)
}

const create = newPerson => {
	const request = axios.post(personsUrl, newPerson)
	return request.then(response => response.data)
}

const update = (id, newPerson) => {
	const request = axios.put(`${personsUrl}/${id}`, newPerson)
	return request.then(response => response.data)
}

export default {getAll, deletePerson, create, update}
