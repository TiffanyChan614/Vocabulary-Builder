import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: '',
  wordArray: [],
  number: 0,
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
    setNumber: (state, action) => {
      return {
        ...state,
        number: action.payload,
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

export const updateFlashcardsNumber = (number) => {
  return { type: 'flashcards/setNumber', payload: number }
}

export default flashcardsSlice.reducer
