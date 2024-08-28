import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteTheBlog, likeTheBlog } from '../reducers/blogReducer'
import { notificationVoted } from '../reducers/notificationReducer'

import CurrentUser from './CurrentUser'

const Blog = () => {
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
      <button onClick={deleteBlog}>remove</button>
    </p>
  )

  return (
    !!blog && (
      <>
        <h1>blogs</h1>

        <CurrentUser />

        <h1>{blog.title} {blog.author}</h1>

        <p>{blog.url}</p>
        <p>
          likes {blog.upvotes}{' '}
          <button className='likeBtn' onClick={like}>
            like
          </button>
        </p>
        <p>added by {blog.user.name}</p>
        {user.username === blog.user.username && deleteBtn()}
      </>
    ))
}

export default Blog
