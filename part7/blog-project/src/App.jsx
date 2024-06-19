import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialiseBlogs } from './reducers/blogReducer'

import Message from './components/Message'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import CurrentUser from './components/CurrentUser'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)

  const user = useSelector(state => {
    console.log(state.user)
    return state.user
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [])

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogsBlock = () => (
    <>
      <CurrentUser />
      <BlogList />
    </>
  )

  return (
    <div>
      <Error />
      <Message />
      {user.username === '' && loginForm()}
      {user.username !== '' && blogsBlock()}
    </div>
  )
}

export default App
