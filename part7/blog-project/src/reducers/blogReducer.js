import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notificationDeleted, notificationAdded } from './notificationReducer'
import { errorHappened } from './errorReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    likeBlog(state, action) {
      const id = action.payload
      const blogToChange = state.find(b => b.id === id)
      const changedBlog = {
        ...blogToChange,
        upvotes: blogToChange.upvotes + 1
      }

      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )
    },
    addComment(state, action) {
      const id = action.payload.id
      const blogToChange = state.find(b => b.id === id)
      const changedBlog = {
        ...blogToChange,
        comments: [action.payload.text, ...blogToChange.comments]
      }

      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      const id = action.payload

      return state.filter(blog => blog.id !== id)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { likeBlog, addBlog, deleteBlog, setBlogs, addComment } = blogSlice.actions

export const initialiseBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const likeTheBlog = id => {
  return async dispatch => {
    await blogService.likeBlog(id)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addCommentToBlog = (id, text) => {
  return async dispatch => {
    await blogService.addComment(id, text)
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs))
  }
}

export const addTheBlog = (blog, token) => {
  return async dispatch => {
    try {
      await blogService.newBlog(blog, token)
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
      dispatch(notificationAdded(blog.title, 5000))
    } catch (error) {
      dispatch(errorHappened(error, 5000))
    }
  }
}

export const deleteTheBlog = (id, token) => {
  return async dispatch => {
    let blogTitle

    try {
      const blog = await blogService.get(id)
      blogTitle = blog[0].title
    } catch (error) {
      dispatch(errorHappened(error, 5000))
    }

    try {
      await blogService.deleteBlog(id, token)
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
      dispatch(notificationDeleted(blogTitle, 5000))
    } catch (error) {
      dispatch(errorHappened(error, 5000))
    }
  }
}

export default blogSlice.reducer