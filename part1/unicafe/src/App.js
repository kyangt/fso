import React, { useState } from 'react'

const Heading = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (good || neutral || bad) {
    return (
      <div>
        <Heading text='statistics' />
        <table>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} />
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <Heading text='statistics' />
        No feedback given
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  const calculateAll = () => good + neutral + bad  
  const calculateAverage = () => (good + bad * -1) / calculateAll()
  const calculatePositive = () => good / calculateAll() * 100 + '%'

  return (
    <div>
      <Heading text='give feedback' />
      <Button text='good' onClick={handleGoodClick} />
      <Button text='neutral' onClick={handleNeutralClick} />
      <Button text='bad' onClick={handleBadClick} />
      <Statistics good={good} neutral={neutral} bad={bad} 
        all={calculateAll()} average={calculateAverage()} positive={calculatePositive()} />
    </div>
  )
}

export default App