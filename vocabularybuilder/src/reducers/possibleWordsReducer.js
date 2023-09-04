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

export const updatePossibleWordsMatchedWords = (matchedWords) => {
  return { type: 'possibleWords/setMatchedWords', payload: matchedWords }
}

export const updatePossibleWordsIsLoading = (isLoading) => {
  return { type: 'possibleWords/setIsLoading', payload: isLoading }
}

export const updatePossibleWordsError = (error) => {
  return { type: 'possibleWords/setError', payload: error }
}

export default possibleWordsSlice.reducer
