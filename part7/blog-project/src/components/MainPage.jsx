import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialiseBlogs } from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'

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
      <div className='container'>
        <div style={hideWhenVisible}>
          <Button variant='primary' onClick={() => setLoginVisible(true)}>log in</Button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm />
          <Button variant='danger' onClick={() => setLoginVisible(false)}>cancel</Button>
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