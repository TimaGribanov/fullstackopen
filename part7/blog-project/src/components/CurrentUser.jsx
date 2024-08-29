import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'

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
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#' as='span'>
              <Link to='/users'>users</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link to ='/'>blogs</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              {user
                ? <em>{user.name} logged in <Button variant='primary' onClick={logout}>logout</Button></em>
                : <Link to='/login'>login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default CurrentUser