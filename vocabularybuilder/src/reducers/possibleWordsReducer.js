import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  matchedWords: [],
  isLoading: false,
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
  },
})

export const updateMatchedWords = (matchedWords) => {
  return { type: 'possibleWords/setMatchedWords', payload: matchedWords }
}

export const updateIsLoading = (isLoading) => {
  return { type: 'possibleWords/setIsLoading', payload: isLoading }
}

export default possibleWordsSlice.reducer
