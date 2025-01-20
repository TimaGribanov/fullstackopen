import {useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import {useApolloClient, useQuery} from '@apollo/client'
import {ALL_AUTHORS, ALL_BOOKS} from './queries.js'
import Recommend from './components/Recommend.jsx'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const result = useQuery(page === 'authors' ? ALL_AUTHORS : ALL_BOOKS)
  const client = useApolloClient()

  const logout = async () => {
    setToken(null)
    localStorage.clear()
    await client.resetStore()
  }

  if (result.loading) return <div>Loading...</div>

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token && <button onClick={() => setPage('recommendation')}>recommendations</button> }
        { token && <button onClick={() => setPage('add')}>add book</button> }
        { !token && <button onClick={() => setPage('loginForm')}>log in</button> }
        { token && <button onClick={logout}>log out</button> }
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} token={token}/>

      <Books show={page === 'books'} books={result.data.allBooks}/>

      <Recommend show={page === 'recommendation'} />

      <NewBook show={page === 'add'}/>

      <LoginForm show={page === 'loginForm'} setToken={setToken}/>
    </div>
  )
}

export default App
