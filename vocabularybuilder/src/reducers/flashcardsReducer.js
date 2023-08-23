import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: '',
  wordArray: [],
}

const flashcardsSlice = createSlice({
  name: 'flashcards',
  initialState,
  reducers: {
    setMode: (state, action) => {
      return {
        ...state,
        mode: action.payload,
      }
    },
    setWordArray: (state, action) => {
      return {
        ...state,
        wordArray: action.payload,
      }
    },
  },
})

export const updateFlashcardsMode = (mode) => {
  return { type: 'flashcards/setMode', payload: mode }
}

export const updateFlashcardsWordArray = (wordArray) => {
  return { type: 'flashcards/setWordArray', payload: wordArray }
}

export const { setMode, setWordArray } = flashcardsSlice.actions
export default flashcardsSlice.reducer
