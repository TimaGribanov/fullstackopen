import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../reducers/userReducer'

const CurrentUser = () => {
  const user = useSelector(state => {
    return state.user
  })

  const dispatch = useDispatch()

  const logout = () => {
    dispatch(deleteUser())
    window.localStorage.removeItem('loggedBlogsUser')
  }

  return (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default CurrentUser