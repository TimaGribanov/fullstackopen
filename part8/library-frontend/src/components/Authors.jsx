import {useState} from 'react'
import {useMutation} from '@apollo/client'
import {ALL_AUTHORS, CHANGE_AUTHOR} from '../queries.js'
import Select from 'react-select'

const BirthYear = ({authors, token}) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [born, setBorn] = useState('')

  const authorsSelect = []

  if (authors)
    authors.forEach(author => authorsSelect.push({value: author.name, label: author.name}))

  const [changeAuthor] = useMutation(CHANGE_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const submit = async (event) => {
    event.preventDefault()

    const name = selectedOption.value

    await changeAuthor({variables: {name, born}})

    setBorn('')
  }

  return (
    token &&
    <>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultInputValue={selectedOption}
            onChange={setSelectedOption}
            options={authorsSelect}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({target}) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}

const Authors = (props) => {
  const authors = props.authors

  if (!props.show) return null

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>born</th>
          <th>books</th>
        </tr>
        {authors.map((a) => (
          <tr key={a.name}>
            <td>{a.name}</td>
            <td>{a.born}</td>
            <td>{a.bookCount}</td>
          </tr>
        ))}
        </tbody>
      </table>

      <BirthYear authors={authors} token={props.token}/>
    </div>
  )
}

export default Authors
