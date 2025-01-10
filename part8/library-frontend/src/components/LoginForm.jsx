import {useState, useEffect} from 'react'
import {useMutation} from '@apollo/client'
import {LOGIN} from '../queries'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    // onError: (error) => {
    //   setError(error.graphQLErrors[0].message)
    // }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    await login({variables: {username, password}})
  }

  if (!props.show) return null

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
          value={username}
          onChange={({target}) => setUsername(target.value)}
        />
        </div>
        <div>
          password <input
          type='password'
          value={password}
          onChange={({target}) => setPassword(target.value)}
        />
        </div>
        <button type='submit'>log in</button>
      </form>
    </div>
  )
}

export default LoginForm