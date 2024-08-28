import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import usersService from '../services/users'
import CurrentUser from './CurrentUser'

const User = () => {
  const [shownUser, setShownUser] = useState()

  const id = useParams().id

  useEffect(() => {
    usersService.get(id).then(res => {
      setShownUser(res)
    })
  }, [])

  return (
    !!shownUser && (<>
    <CurrentUser />

    <h1>{shownUser[0].name}</h1>
      <h3>added blogs</h3>
      <ul>
        {shownUser[0].blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
      </>)
  )
}

export default User