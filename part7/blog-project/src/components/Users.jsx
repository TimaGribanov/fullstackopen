import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import usersService from '../services/users'
import CurrentUser from './CurrentUser'

const Users = () => {
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    usersService.getAll().then(res => setAllUsers(res))
  }, [])

  return (
    <>
      <CurrentUser />

      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <td></td>
            <td><strong>blogs created</strong></td>
          </tr>
        </thead>
        <tbody>
          {allUsers.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )

}

export default Users