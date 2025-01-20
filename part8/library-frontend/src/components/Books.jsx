import {useEffect, useState} from 'react'
import {useQuery} from '@apollo/client'
import {BOOKS_BY_GENRE} from '../queries.js'

const Books = (props) => {
  if (!props.show) return null

  const [localBooks, setLocalBooks] = useState(props.books)
  const [allGenres, setAllGenres] = useState([])
  const [genre, setGenre] = useState('')
  const result = useQuery(BOOKS_BY_GENRE, {
    variables: { genre }
  })

  useEffect(() => {
    let genres = []

    localBooks.map(book => book.genres.map(genre => genres.push(genre)))

    setAllGenres([...new Set(genres.sort())])
  }, [])

  useEffect(() => {
    if (result.data) {
      console.log(result.data.allBooks)
      setLocalBooks(result.data.allBooks)
    }
  }, [genre])

  const changeGenre = async genre => {
    setGenre(genre)
  }

  return (
    <div>
      <h2>books</h2>

      {genre !== '' && <p>in genre <strong>{genre}</strong></p>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {localBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => changeGenre(genre)}>{genre}</button>
      ))}
      <button key={'all genres'} onClick={() => changeGenre('')}>all genres</button>
    </div>
  )
}

export default Books
