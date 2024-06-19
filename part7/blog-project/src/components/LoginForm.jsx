import { errorHappened } from '../reducers/errorReducer'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import { useState } from 'react'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogsUser", JSON.stringify(user))
      dispatch(setUser(user))
    } catch (exception) {
      dispatch(errorHappened("Wrong credentials", 5000))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>log in to applications</h2>
      <div>
        username
        <input
          id='username'
          type='text'
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )
}

export default LoginForm
