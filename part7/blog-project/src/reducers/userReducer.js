import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  username: '',
  token: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      return action.payload
    },
    logoutUser() {
      return initialState
    }
  }
})

export const { loginUser, logoutUser } = userSlice.actions

export const setUser = (user) => {
  return async dispatch => {
    dispatch(loginUser(user))
  }
}

export const deleteUser = () => {
  return dispatch => {
    dispatch(logoutUser())
  }
}

export default userSlice.reducer