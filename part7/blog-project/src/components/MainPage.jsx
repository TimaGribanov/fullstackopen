import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialiseBlogs } from '../reducers/blogReducer'

import Message from './Message'
import Error from './Error'
import LoginForm from './LoginForm'
import BlogList from './BlogList'
import CurrentUser from './CurrentUser'

const MainPage = () => {
  const [loginVisible, setLoginVisible] = useState(false)

  const user = useSelector(state => {
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
    <>
      <Error />
      <Message />
      {user.username === '' && loginForm()}
      {user.username !== '' && blogsBlock()}
    </>
  )
  
}

export default MainPage