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
    setWordArrayByIndex: (state, action) => {
      const { index, word } = action.payload
      const newWordArray = [...state.wordArray]
      newWordArray[index] = word
      return {
        ...state,
        wordArray: newWordArray,
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

export const updateFlashcardsWordArrayByIndex = (index, word) => {
  return { type: 'flashcards/setWordArrayByIndex', payload: { index, word } }
}

export const updateFlashcardsNumber = (number) => {
  return { type: 'flashcards/setNumber', payload: number }
}

export default flashcardsSlice.reducer
