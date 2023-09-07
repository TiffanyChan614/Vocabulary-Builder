import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  matchedWords: [],
  isLoading: false,
  error: null,
}

const possibleWordsSlice = createSlice({
  name: 'possibleWords',
  initialState,
  reducers: {
    setMatchedWords: (state, action) => {
      state.matchedWords = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setMatchedWords, setIsLoading, setError } =
  possibleWordsSlice.actions
export default possibleWordsSlice.reducer
