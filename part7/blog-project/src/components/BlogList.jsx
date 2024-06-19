import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'
import BlogsForm from './BlogsForm'
import Togglable from './Togglable'

const BlogList = () => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  const dispatch = useDispatch()

  const blogsFormRef = useRef();

  return (
    <div>
      <h2>blogs</h2>
      <Togglable class='newBlockBlog' btnLabel='new blog' ref={blogsFormRef}>
        <BlogsForm />
      </Togglable>
      {blogs
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
    </div>
  )
}

export default BlogList