import { useState } from 'react'

const Display = ({ anecdote, votes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>This anecdote has {votes} votes</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => (<button onClick={handleClick}>{text}</button>)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votesState, setVoted] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const anecdoteHandle = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const voteHandle = () => {
    const copyArr = [...votesState]
    copyArr[selected] += 1
    setVoted(copyArr)
    setMostVoted(copyArr.indexOf(Math.max(...copyArr)))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display anecdote={anecdotes[selected]} votes={votesState[selected]} />
      <Button handleClick={anecdoteHandle} text='new anecdote' />
      <Button handleClick={voteHandle} text='vote' />
      <hr />
      <h1>Anecdote with most votes</h1>
      <Display anecdote={anecdotes[mostVoted]} votes={votesState[mostVoted]} />
    </div>
  )
}

export default App