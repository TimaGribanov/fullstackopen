import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticsLine = ({ text, stats }) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{stats} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{stats}</td>
    </tr>
  )
}

const Statistics = props => {
  if (props.allClicks === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text='good' stats={props.good} />
        <StatisticsLine text='neutral' stats={props.neutral} />
        <StatisticsLine text='bad' stats={props.bad} />
        <StatisticsLine text='all' stats={props.allClicks} />
        <StatisticsLine text='average' stats={props.avgCount} />
        <StatisticsLine text='positive' stats={props.posCount} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)
  const [avgCount, setAverage] = useState(0)
  const [posCount, setPositive] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAllFunc()
    countAverage(good + 1, bad)
    countPositive(good + 1, allClicks + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAllFunc()
    countPositive(good, allClicks + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAllFunc()
    countAverage(good, bad + 1)
    countPositive(good, allClicks + 1)
  }

  const setAllFunc = () => setAll(allClicks + 1)

  const countAverage = (goodVal, badVal) => setAverage((goodVal - badVal) / 9)

  const countPositive = (goodVal, allVal) => setPositive((goodVal * 100) / allVal)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allClicks={allClicks}
        avgCount={avgCount}
        posCount={posCount}
      />
    </div>
  )
}

export default App;
