import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload
      }
    }
  }
})

export const { setUser, setIsLoggedIn } = authSlice.actions
export default authSlice.reducer
