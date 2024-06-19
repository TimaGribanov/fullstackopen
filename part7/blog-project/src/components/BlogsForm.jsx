import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTheBlog } from '../reducers/blogReducer'

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
      <form onSubmit={newBlog}>
        <div>
          title:
          <input
            id="blogTitle"
            type="text"
            value={blogTitle}
            name="Title"
            placeholder="Enter the title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="blogAuthor"
            type="text"
            value={blogAuthor}
            name="Author"
            placeholder="Enter the author name"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="blogUrl"
            type="text"
            value={blogUrl}
            name="URL"
            placeholder="Enter the URL"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button id="createBlogBtn" type="submit">
          add
        </button>
      </form>
    </div>
  );
};

export default BlogsForm;
