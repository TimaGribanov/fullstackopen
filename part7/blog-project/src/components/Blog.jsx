import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addCommentToBlog, deleteTheBlog, likeTheBlog } from '../reducers/blogReducer'
import { notificationVoted } from '../reducers/notificationReducer'

import CurrentUser from './CurrentUser'
import Error from './Error'
import Message from './Message'
import { Button, Form } from 'react-bootstrap'

const Blog = () => {
  const [newComment, setNewComment] = useState('')

  const id = useParams().id
  const blog = useSelector(state => {
    return state.blogs.find(b => b.id === id)
  })

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

  const deleteBtn = () => (
    <p>
      <Button variant='dark' onClick={deleteBlog}>remove</Button>
    </p>
  )

  const addComment = async (event) => {
    event.preventDefault()

    dispatch(addCommentToBlog(blog.id, newComment))
  }

  return (
    !!blog && (
      <>
        <Error />
        <Message />

        <h1>blogs</h1>

        <CurrentUser />

        <h1>{blog.title} {blog.author}</h1>

        <p>{blog.url}</p>
        <p>
          likes {blog.upvotes}{' '}
          <Button className='likeBtn' onClick={like}>
            like
          </Button>
        </p>
        <p><em>added by {blog.user.name}</em></p>

        <div>
          <h3>comments</h3>
          <Form onSubmit={addComment}>
            <Form.Group>
              <Form.Label>Comment:</Form.Label>
              <Form.Control
                id='commentText'
                type='text'
                value={newComment}
                name='Comment'
                placeholder='Leave your thoughts'
                onChange={({ target }) => setNewComment(target.value)}
              />
            </Form.Group>
            <Button id='commentBtn' type='submit'>add</Button>
          </Form>
          <ul>
            {blog.comments.map(c => <li key={c._id}>{c.text}</li>)}
          </ul>
        </div>

        {user.username === blog.user.username && deleteBtn()}
      </>
    ))
}

export default Blog
