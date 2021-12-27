import React from 'react'

const Header = ({name}) => {
	return <h2>{name}</h2>
}

const Total = ({course}) => {
	const sum = course.parts.reduce((total, part) => total + part.exercises, 0)

	return (
		<p>
			<strong>Total number of exercises {sum}</strong>
		</p>
	)
}

const Part = ({part}) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	)
}

const Content = ({course}) => {
	return course.parts.map(eachPart => (
		<div key={eachPart.id}>
			<Part part={eachPart} />
		</div>
	))
}

const Course = ({courses}) => {
	return courses.map(course => {
		return (
			<div key={course.id}>
				<Header name={course.name} />
				<Content course={course} />
				<Total course={course} />
			</div>
		)
	})
}

export default Course
