import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import BlogsForm from './BlogsForm'
import Togglable from './Togglable'

const BlogList = () => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  const blogsFormRef = useRef();

  return (
    <div>
      <h2>blogs</h2>
      <Togglable class='newBlockBlog' btnLabel='new blog' ref={blogsFormRef}>
        <BlogsForm />
      </Togglable>
      <table>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default BlogList