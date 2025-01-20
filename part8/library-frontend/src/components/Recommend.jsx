import {useQuery} from '@apollo/client'
import {BOOKS_BY_GENRE, GET_USER} from '../queries.js'
import {useEffect, useState} from 'react'

const Recommend = (props) => {
  if (!props.show) return null

  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('')
  const user = useQuery(GET_USER)
  const result = useQuery(BOOKS_BY_GENRE, {
    variables: {genre}
  })

  console.log(`genre: ${genre}`)
  console.log(books)

  console.log(user)

  useEffect(() => {
    if (user.data)
        setGenre(user.data.me.favourite)
  }, [user])

  useEffect(() => {
    if (result.data)
        setBooks(result.data.allBooks)
  }, [genre])

  if (result.loading) return <div>Loading...</div>

  return (
    <div>
      <h2>recommendations</h2>

      <p>books recommended for you in your favourite genre <strong>{genre}</strong></p>

      <table>
        <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend