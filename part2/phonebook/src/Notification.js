import React from 'react'
import './index.css'

const Notification = ({confirmMessage, errorMessage}) => {
	if (confirmMessage === null && errorMessage === null) {
		return null
	} else if (confirmMessage) {
		return <div className='confirm'>{confirmMessage}</div>
	} else if (errorMessage) {
		return <div className='error'>{errorMessage}</div>
	} else {
		return null
	}
}

export default Notification
