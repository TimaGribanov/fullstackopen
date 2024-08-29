import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTheBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap';

const BlogsForm = () => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const user = useSelector(state => {
    return state.user
  })

  const dispatch = useDispatch()

  const newBlog = async (event) => {
    event.preventDefault()

    const blog = {
      author: blogAuthor,
      title: blogTitle,
      url: blogUrl
    }
    dispatch(addTheBlog(blog, user.token))
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={newBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="blogTitle"
            type="text"
            value={blogTitle}
            name="Title"
            placeholder="Enter the title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="blogAuthor"
            type="text"
            value={blogAuthor}
            name="Author"
            placeholder="Enter the author name"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="blogUrl"
            type="text"
            value={blogUrl}
            name="URL"
            placeholder="Enter the URL"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </Form.Group>
        <Button id="createBlogBtn" type="submit">
          add
        </Button>
      </Form>
    </div>
  )
}

export default BlogsForm
