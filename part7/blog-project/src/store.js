import { configureStore } from '@reduxjs/toolkit'
import errorReducer from './reducers/errorReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
  reducer: {
    error: errorReducer,
    notification: notificationReducer,
    user: userReducer,
    blogs: blogReducer
  }
})

export default store