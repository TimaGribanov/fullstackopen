import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import { deleteTheBlog, likeTheBlog } from '../reducers/blogReducer'
import { notificationVoted } from '../reducers/notificationReducer'

const Blog = ({blog}) => {
  const user = useSelector(state => {
    return state.user
  })

  const dispatch = useDispatch()

  const like = () => {
    dispatch(likeTheBlog(blog.id))
    dispatch(notificationVoted(blog.id, 5000))
  }

  const deleteBlog = () => {
    dispatch(deleteTheBlog(blog.id, user.token))
  }

  const [visible, setVisible] = useState(false)

  const handleVisibilityRef = useRef()

  const handleVisibilityClick = () => {
    handleVisibilityRef.current.toggleVisibility()
  }

  const deleteBtn = () => (
    <p>
      <button onClick={deleteBlog}>remove</button>
    </p>
  )

  return (
    <div className='blogBlock'>
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable
        class='infoBlock'
        btnLabel={visible ? 'hide': 'view'}
        ref={handleVisibilityRef}
      >
        <p>{blog.url}</p>
        <p>
          likes {blog.upvotes}{' '}
          <button className='likeBtn' onClick={like}>
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {user.username === blog.user.username && deleteBtn()}
      </Togglable>
    </div>
  )
}

export default Blog
