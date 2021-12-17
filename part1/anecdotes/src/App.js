import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>
}

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
	]

	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

	const rngSelector = num => Math.floor(Math.random() * num)

	const handleClickNext = () => {
		const anecdoteSelected = rngSelector(anecdotes.length)
		setSelected(anecdoteSelected)
	}

	const handleClickVote = () => {
		const tempVotes = [...votes]
		tempVotes[selected] += 1
		setVotes(tempVotes)
	}

	const findMaxSelected = () => {
		const tempVotes = [...votes]
		if (!Math.max(...tempVotes)) {
			return -1
		} else {
			var maxVote = tempVotes[0]
			var maxVoteIdx = 0

			for (let i = 1; i < tempVotes.length; i++) {
				if (tempVotes[i] > maxVote) {
					maxVote = tempVotes[i]
					maxVoteIdx = i
				}
			}
			return maxVoteIdx
		}
	}

	const maxSelected = findMaxSelected()

	if (maxSelected === -1) {
		return (
			<div>
				<strong>Anecdote of the day</strong>
				<br />
				<br />
				{anecdotes[selected]}
				<br />
				has {votes[selected]} votes
				<br />
				<Button handleClick={handleClickVote} text={'vote'} />
				<Button handleClick={handleClickNext} text={'next anecdote'} />
				<br />
				<br />
				<em>Vote on your favourite anecdotes!</em>
			</div>
		)
	} else {
		return (
			<div>
				<strong>Anecdote of the day</strong>
				<br />
				<br />
				{anecdotes[selected]}
				<br />
				has {votes[selected]} votes
				<br />
				<Button handleClick={handleClickVote} text={'vote'} />
				<Button handleClick={handleClickNext} text={'next anecdote'} />
				<br />
				<br />
				<strong>Anecdote with most votes</strong>
				<br />
				<br />
				{anecdotes[maxSelected]}
				<br />
				has {votes[maxSelected]} votes
				<br />
			</div>
		)
	}
}

export default App
