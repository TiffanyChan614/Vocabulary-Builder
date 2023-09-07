import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: '',
  wordArray: [],
  number: 0,
  showNotFinished: false,
  showQuit: false,
  inSession: false,
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
    setShowNotFinished: (state, action) => {
      return {
        ...state,
        showNotFinished: action.payload,
      }
    },
    setShowQuit: (state, action) => {
      return {
        ...state,
        showQuit: action.payload,
      }
    },
    setInSession: (state, action) => {
      return {
        ...state,
        inSession: action.payload,
      }
    },
    resetFlashcards: () => {
      return {
        ...initialState,
      }
    },
  },
})

export const {
  setMode,
  setWordArray,
  setNumber,
  setWordArrayByIndex,
  setShowNotFinished,
  setShowQuit,
  setInSession,
  resetFlashcards,
} = flashcardsSlice.actions
export default flashcardsSlice.reducer
