import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  action: '',
  value: ''
}


const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    error(state, action) {
      return { action: 'ERROR', value: action.payload }
    },
    removeError(state, action) {
      return initialState
    }
  }
})

export const { error, removeError } = errorSlice.actions

export const errorHappened = (content, timeout) => {
  return dispatch => {
    dispatch(error(content))
    setTimeout(() => {
      dispatch(removeError())
    }, timeout)
  }
}

export default errorSlice.reducer