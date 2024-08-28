import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const CurrentUser = () => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(deleteUser())
    window.localStorage.removeItem('loggedBlogsUser')
  }

  return (
    <div>
      <Link to='/users'>users</Link>
      <span> </span>
      <Link to ='/'>blogs</Link>
      <span> {JSON.parse(window.localStorage.getItem('loggedBlogsUser')).name} logged in </span>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default CurrentUser