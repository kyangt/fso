import React from 'react'

const Filter = ({filterName, handleFilterChange}) => {
	return (
		<div>
			Filter the names:{' '}
			<input value={filterName} onChange={handleFilterChange} />
		</div>
	)
}

export default Filter
