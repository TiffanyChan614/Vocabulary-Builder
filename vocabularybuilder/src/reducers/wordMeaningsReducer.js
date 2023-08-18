import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wordData: [],
  isLoading: false,
  partOfSpeechFilter: '',
}

const wordMeaningsSlice = createSlice({
  name: 'wordMeanings',
  initialState,
  reducers: {
    setWordData: (state, action) => {
      state.wordData = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setPartOfSpeechFilter: (state, action) => {
      state.partOfSpeechFilter = action.payload
    },
  },
})

export const updateWordData = (wordData) => {
  return { type: 'wordMeanings/setWordData', payload: wordData }
}

export const updateIsLoading = (isLoading) => {
  return { type: 'wordMeanings/setIsLoading', payload: isLoading }
}

export const updateMeaningsPartOfSpeechFilter = (filter) => {
  return { type: 'wordMeanings/setPartOfSpeechFilter', payload: filter }
}

export const { setWordData, setIsLoading, setPartOfSpeechFilter } =
  wordMeaningsSlice.actions

export default wordMeaningsSlice.reducer
