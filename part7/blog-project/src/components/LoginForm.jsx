import { errorHappened } from '../reducers/errorReducer'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

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
    <div>
      <h2>log in to applications</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id='username'
            type='text'
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            id='password'
            type='password'
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant='primary' id='login-button' type='submit'>
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
