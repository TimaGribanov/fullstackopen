import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  action: '',
  value: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    likedNotification(state, action) {
      return { action: 'LIKE', value: action.payload }
    },
    addedNotification(state, action) {
      return { action: 'ADD', value: action.payload }
    },
    deletedNotification(state, action) {
      return { action: 'DELETE', value: action.payload }
    },
    removeNotification(state, action) {
      return initialState
    }
  }
})

export const { likedNotification, addedNotification, deletedNotification, removeNotification } = notificationSlice.actions

export const notificationAdded = (content, timeout) => {
  return dispatch => {
    dispatch(addedNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout)
  }
}

export const notificationVoted = (id, timeout) => {
  return dispatch => {
    dispatch(likedNotification(id))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout)
  }
}

export const notificationDeleted = (id, timeout) => {
  return dispatch => {
    dispatch(deletedNotification(id))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout)
  }
}

export default notificationSlice.reducer