import { useState } from 'react'

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Feedback = ({handleGoodClick, handleNeutralClick, handleBadClick}) => {
  return (
    <div>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
    </div>
  )
}

const StatLine = ({ text, stats }) => {
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

const StatContent = props => {
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
        <StatLine text='good' stats={props.good} />
        <StatLine text='neutral' stats={props.neutral} />
        <StatLine text='bad' stats={props.bad} />
        <StatLine text='all' stats={props.allClicks} />
        <StatLine text='average' stats={props.avgCount} />
        <StatLine text='positive' stats={props.posCount} />
      </tbody>
    </table>
  )
}

const Content = props => {
  return (
    <div>
      <Header header='give feedback' />
      <Feedback
        handleGoodClick={props.handleGoodClick}
        handleNeutralClick={props.handleNeutralClick}
        handleBadClick={props.handleBadClick}
      />
      <Header header='statistics' />
      <StatContent
        good={props.good}
        neutral={props.neutral}
        bad={props.bad}
        allClicks={props.allClicks}
        avgCount={props.avgCount}
        posCount={props.posCount}
      />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllClicks] = useState(0)
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

  const setAllFunc = () => setAllClicks(allClicks + 1)
  const countAverage = (goodVal, badVal) => setAverage((goodVal - badVal) / 9)
  const countPositive = (goodVal, allVal) => setPositive((goodVal * 100) / allVal)

  return (
    <div>
      <Content
        handleGoodClick={handleGoodClick}
        handleNeutralClick={handleNeutralClick}
        handleBadClick={handleBadClick}
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

export default App
