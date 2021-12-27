import React from 'react'

const Filter = ({filterName, handleFilterChange}) => {
	return (
		<div>
			filter the results:{' '}
			<input value={filterName} onChange={handleFilterChange} />
		</div>
	)
}

export default Filter
